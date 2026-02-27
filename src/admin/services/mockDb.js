import { womenEthnicData } from '../../data/womenEthnicData';
import { womenWesternData } from '../../data/womenWesternData';
import { womenAccessoriesData } from '../../data/womenAccessoriesData';
import { womenBeautyData } from '../../data/womenBeautyData';
import { menData } from '../../data/menData';
import { adminConfig } from '../config/adminConfig';

const nowIso = () => new Date().toISOString();

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const sourceProducts = [
  ...womenEthnicData.map((p) => ({ ...p, rootCategory: 'Women' })),
  ...womenWesternData.map((p) => ({ ...p, rootCategory: 'Women' })),
  ...womenAccessoriesData.map((p) => ({ ...p, rootCategory: 'Accessories' })),
  ...womenBeautyData.map((p) => ({ ...p, rootCategory: 'Cosmetics' })),
  ...menData.map((p) => ({ ...p, rootCategory: 'Men' })),
];

const seedProducts = sourceProducts.map((p, idx) => ({
  ...p,
  sku: `SKU-${p.id}-${String(idx + 1).padStart(3, '0')}`,
  stock: 5 + (idx % 70),
  isActive: true,
  visibility: 'active',
  createdAt: nowIso(),
  updatedAt: nowIso(),
}));

const seedCategories = [
  {
    id: 'cat-1',
    name: 'Women',
    image: '',
    subcategories: ['Saree', 'Kurti', 'Lehenga', 'Suit', 'Jeans', 'Top', 'Skirt', 'Dress'],
  },
  {
    id: 'cat-2',
    name: 'Men',
    image: '',
    subcategories: ['Top Wear', 'Bottom Wear', 'Footwear', 'Accessories', 'Ethnic Wear'],
  },
  {
    id: 'cat-3',
    name: 'Cosmetics',
    image: '',
    subcategories: ['Makeup', 'Skincare', 'Haircare', 'Fragrances'],
  },
  {
    id: 'cat-4',
    name: 'Accessories',
    image: '',
    subcategories: ['Bag', 'Jewellery', 'Footwear', 'Sunglasses', 'Watch', 'Belt', 'Hair Accessory'],
  },
];

const names = ['Aanya', 'Riya', 'Neha', 'Saanvi', 'Arjun', 'Rahul', 'Vikram', 'Ishaan', 'Meera', 'Karan'];
const cities = ['Mumbai', 'Pune', 'Delhi', 'Bengaluru', 'Chennai', 'Jaipur'];

const seedCustomers = Array.from({ length: 20 }).map((_, i) => ({
  id: `cust-${i + 1}`,
  name: `${randomFrom(names)} ${String.fromCharCode(65 + (i % 26))}.`,
  email: `customer${i + 1}@mail.com`,
  phone: `98${String(10000000 + i).slice(0, 8)}`,
  city: randomFrom(cities),
  status: i % 7 === 0 ? 'blocked' : 'active',
  createdAt: nowIso(),
}));

const orderStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
const paymentStatuses = ['Paid', 'COD', 'Failed'];

const seedOrders = Array.from({ length: 18 }).map((_, i) => {
  const customer = seedCustomers[i % seedCustomers.length];
  const itemCount = 1 + (i % 3);
  const items = Array.from({ length: itemCount }).map((__, j) => {
    const product = seedProducts[(i * 3 + j) % seedProducts.length];
    const quantity = 1 + (j % 2);
    return {
      id: `${product.id}-${j}`,
      productId: product.id,
      name: product.name,
      image: product.images?.[0] || '',
      price: product.price,
      quantity,
    };
  });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const status = orderStatuses[i % orderStatuses.length];

  // Spread orders across 4 months (current month and 3 previous months)
  const monthsBack = i % 4; // 0 = current month, 1 = 1 month ago, etc.
  const orderDate = new Date();
  orderDate.setMonth(orderDate.getMonth() - monthsBack);
  const createdAt = orderDate.toISOString();

  return {
    id: `ORD-${1000 + i}`,
    customerId: customer.id,
    customerName: customer.name,
    customerEmail: customer.email,
    shippingAddress: `${12 + i}, Street ${i + 1}, ${customer.city}`,
    items,
    total,
    status,
    paymentStatus: paymentStatuses[i % paymentStatuses.length],
    createdAt,
    timeline: [
      { status: 'Pending', at: createdAt },
      ...(status !== 'Pending' ? [{ status, at: createdAt }] : []),
    ],
  };
});

const seedCoupons = [
  { id: 'cp-1', code: 'WELCOME10', type: 'percentage', value: 10, expiryDate: '2027-01-31', usageLimit: 1000, enabled: true },
  { id: 'cp-2', code: 'FLAT200', type: 'flat', value: 200, expiryDate: '2027-03-31', usageLimit: 700, enabled: true },
];

const seedReviews = seedProducts.slice(0, 25).map((p, i) => ({
  id: `rv-${i + 1}`,
  productId: p.id,
  productName: p.name,
  customerName: seedCustomers[i % seedCustomers.length].name,
  rating: 3 + (i % 3),
  comment: 'Quality is good and delivery was fast.',
  status: i % 4 === 0 ? 'rejected' : 'approved',
  createdAt: nowIso(),
}));

const seedPayments = seedOrders.map((o, i) => ({
  id: `pay-${i + 1}`,
  orderId: o.id,
  amount: o.total,
  method: i % 3 === 0 ? 'Card' : i % 3 === 1 ? 'UPI' : 'COD',
  status: o.paymentStatus,
  createdAt: o.createdAt,
}));

const seedSettings = {
  storeName: 'LUXE FASHION',
  logoUrl: '',
  taxPercent: 5,
  shippingCharge: 49,
  currency: 'INR',
};

const initialDb = {
  products: seedProducts,
  categories: seedCategories,
  customers: seedCustomers,
  orders: seedOrders,
  coupons: seedCoupons,
  reviews: seedReviews,
  payments: seedPayments,
  settings: seedSettings,
};

const readDb = () => {
  const raw = localStorage.getItem(adminConfig.dbKey);
  if (!raw) {
    localStorage.setItem(adminConfig.dbKey, JSON.stringify(initialDb));
    return structuredClone(initialDb);
  }
  return JSON.parse(raw);
};

const writeDb = (db) => {
  localStorage.setItem(adminConfig.dbKey, JSON.stringify(db));
  return db;
};

export const mockDb = {
  read: readDb,
  write: writeDb,
};

