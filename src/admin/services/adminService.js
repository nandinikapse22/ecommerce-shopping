import { apiClient } from './apiClient';
import { mockDb } from './mockDb';

const withWrite = (token, mutator) => apiClient.request({
  token,
  action: () => {
    const db = mockDb.read();
    const updated = mutator(db);
    return mockDb.write(updated);
  },
});

const withRead = (token, selector) => apiClient.request({
  token,
  action: () => selector(mockDb.read()),
});

const idGen = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export const adminService = {
  getDashboardSummary: (token) => withRead(token, (db) => {
    const totalOrders = db.orders.length;
    const totalRevenue = db.orders.reduce((sum, order) => sum + order.total, 0);
    const totalProducts = db.products.length;
    const totalCustomers = db.customers.length;
    const pendingOrders = db.orders.filter((o) => o.status === 'Pending').length;
    const outOfStockProducts = db.products.filter((p) => p.stock <= 0).length;

    // Sales data for different time periods
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Daily sales for last 30 days
    const dailySales = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dayOrders = db.orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.toDateString() === date.toDateString();
      });
      const sales = dayOrders.reduce((sum, order) => sum + order.total, 0);
      dailySales.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        sales
      });
    }

    // Weekly sales for last 12 weeks
    const weeklySales = [];
    for (let i = 11; i >= 0; i--) {
      const weekStart = new Date(today.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000);
      const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
      const weekOrders = db.orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= weekStart && orderDate <= weekEnd;
      });
      const sales = weekOrders.reduce((sum, order) => sum + order.total, 0);
      weeklySales.push({
        week: `Week ${12 - i}`,
        sales
      });
    }

    // Monthly sales (existing logic)
    const monthMap = {};
    db.orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString('en-US', { month: 'short', year: '2-digit' });
      monthMap[month] = (monthMap[month] || 0) + order.total;
    });
    const monthlySales = Object.entries(monthMap)
      .sort(([a], [b]) => new Date(`01 ${a}`) - new Date(`01 ${b}`))
      .map(([month, sales]) => ({ month, sales }));

    // Orders by category
    const categoryMap = {};
    db.orders.forEach((order) => {
      order.items.forEach((item) => {
        const product = db.products.find(p => p.id === item.productId);
        if (product) {
          const category = product.rootCategory || 'Other';
          categoryMap[category] = (categoryMap[category] || 0) + item.quantity;
        }
      });
    });
    const ordersByCategory = Object.entries(categoryMap)
      .map(([category, orders]) => ({ category, orders }))
      .sort((a, b) => b.orders - a.orders);

    // Payment method breakdown
    const paymentMap = {};
    db.payments.forEach((payment) => {
      paymentMap[payment.method] = (paymentMap[payment.method] || 0) + 1;
    });
    const paymentMethodBreakdown = Object.entries(paymentMap).map(([method, count]) => ({ method, count }));

    return {
      totalOrders,
      totalRevenue,
      totalProducts,
      totalCustomers,
      pendingOrders,
      outOfStockProducts,
      dailySales,
      weeklySales,
      monthlySales,
      ordersByCategory,
      paymentMethodBreakdown,
    };
  }),

  getProducts: (token) => withRead(token, (db) => db.products),
  createProduct: (token, payload) => withWrite(token, (db) => {
    db.products.unshift({
      id: Number(String(Date.now()).slice(-7)),
      sku: payload.sku || `SKU-${Date.now()}`,
      isActive: true,
      visibility: payload.visibility || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...payload,
    });
    return db;
  }),
  updateProduct: (token, productId, payload) => withWrite(token, (db) => {
    db.products = db.products.map((item) => (
      item.id === productId ? { ...item, ...payload, updatedAt: new Date().toISOString() } : item
    ));
    return db;
  }),
  deleteProduct: (token, productId) => withWrite(token, (db) => {
    db.products = db.products.filter((item) => item.id !== productId);
    return db;
  }),

  getCategories: (token) => withRead(token, (db) => db.categories),
  createCategory: (token, payload) => withWrite(token, (db) => {
    db.categories.push({ id: idGen('cat'), ...payload });
    return db;
  }),
  updateCategory: (token, id, payload) => withWrite(token, (db) => {
    db.categories = db.categories.map((item) => (item.id === id ? { ...item, ...payload } : item));
    return db;
  }),
  deleteCategory: (token, id) => withWrite(token, (db) => {
    db.categories = db.categories.filter((item) => item.id !== id);
    return db;
  }),

  getOrders: (token) => withRead(token, (db) => db.orders),
  getOrderById: (token, id) => withRead(token, (db) => db.orders.find((order) => order.id === id) || null),
  updateOrderStatus: (token, id, status) => withWrite(token, (db) => {
    db.orders = db.orders.map((order) => {
      if (order.id !== id) return order;
      return {
        ...order,
        status,
        timeline: [...order.timeline, { status, at: new Date().toISOString() }],
      };
    });
    return db;
  }),
  updatePaymentStatus: (token, id, paymentStatus) => withWrite(token, (db) => {
    db.orders = db.orders.map((order) => (order.id === id ? { ...order, paymentStatus } : order));
    db.payments = db.payments.map((payment) => (payment.orderId === id ? { ...payment, status: paymentStatus } : payment));
    return db;
  }),

  getCustomers: (token) => withRead(token, (db) => db.customers),
  toggleCustomerBlock: (token, id) => withWrite(token, (db) => {
    db.customers = db.customers.map((customer) => {
      if (customer.id !== id) return customer;
      return {
        ...customer,
        status: customer.status === 'blocked' ? 'active' : 'blocked',
      };
    });
    return db;
  }),

  getInventory: (token) => withRead(token, (db) => db.products.map((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    stock: product.stock,
    status: product.stock <= 0 ? 'Out of stock' : product.stock < 10 ? 'Low stock' : 'In stock',
    visibility: product.visibility,
  }))),
  updateStock: (token, id, stock) => withWrite(token, (db) => {
    db.products = db.products.map((product) => {
      if (product.id !== id) return product;
      const safeStock = Number(stock);
      return {
        ...product,
        stock: safeStock,
        visibility: safeStock <= 0 ? 'inactive' : product.visibility,
        isActive: safeStock > 0,
        updatedAt: new Date().toISOString(),
      };
    });
    return db;
  }),

  getCoupons: (token) => withRead(token, (db) => db.coupons),
  createCoupon: (token, payload) => withWrite(token, (db) => {
    db.coupons.push({ id: idGen('cp'), ...payload });
    return db;
  }),
  updateCoupon: (token, id, payload) => withWrite(token, (db) => {
    db.coupons = db.coupons.map((item) => (item.id === id ? { ...item, ...payload } : item));
    return db;
  }),
  deleteCoupon: (token, id) => withWrite(token, (db) => {
    db.coupons = db.coupons.filter((item) => item.id !== id);
    return db;
  }),

  getReviews: (token) => withRead(token, (db) => db.reviews),
  moderateReview: (token, id, status) => withWrite(token, (db) => {
    db.reviews = db.reviews.map((item) => (item.id === id ? { ...item, status } : item));
    return db;
  }),
  deleteReview: (token, id) => withWrite(token, (db) => {
    db.reviews = db.reviews.filter((item) => item.id !== id);
    return db;
  }),

  getPayments: (token) => withRead(token, (db) => db.payments),

  getSettings: (token) => withRead(token, (db) => db.settings),
  updateSettings: (token, payload) => withWrite(token, (db) => {
    db.settings = { ...db.settings, ...payload };
    return db;
  }),
};

