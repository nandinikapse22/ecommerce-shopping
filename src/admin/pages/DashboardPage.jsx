import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  AreaChart,   // ✅ ADD
  Area,        // ✅ ADD
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { adminService } from '../services/adminService';
import { useAdminAuth } from '../hooks/useAdminAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

const COLORS = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="admin-tooltip">
        <p className="admin-tooltip-label">{`${label}`}</p>
        <p className="admin-tooltip-value">
          {payload[0].dataKey === 'sales' ? `₹${payload[0].value.toLocaleString('en-IN')}` : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const DashboardPage = () => {
  const { token } = useAdminAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [salesPeriod, setSalesPeriod] = useState('monthly');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await adminService.getDashboardSummary(token);
      setSummary(data);
      setLoading(false);
    };
    load();
  }, [token]);

  if (loading || !summary) return <LoadingSpinner label="Loading dashboard" />;

  const cards = [
    { label: 'Total Orders', value: summary.totalOrders },
    { label: 'Total Revenue', value: `₹${summary.totalRevenue.toLocaleString('en-IN')}` },
    { label: 'Total Products', value: summary.totalProducts },
    { label: 'Total Customers', value: summary.totalCustomers },
    { label: 'Pending Orders', value: summary.pendingOrders },
    { label: 'Out of Stock Products', value: summary.outOfStockProducts },
  ];

  const getSalesData = () => {
    switch (salesPeriod) {
      case 'daily':
        return summary.dailySales.slice(-7); // Last 7 days
      case 'weekly':
        return summary.weeklySales.slice(-4); // Last 4 weeks
      case 'monthly':
      default:
        return summary.monthlySales;
    }
  };

  const getSalesDataKey = () => {
    switch (salesPeriod) {
      case 'daily':
        return 'date';
      case 'weekly':
        return 'week';
      case 'monthly':
      default:
        return 'month';
    }
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard-header-banner admin-card">
        <div>
          <p className="dashboard-overline">Performance Overview</p>
          <h2>Business Intelligence</h2>
          <span>Track revenue, orders and customer growth in real-time</span>
        </div>
      </div>

      <div className="admin-grid cards-grid">
        {cards.map((item, index) => (
          <article key={item.label} className={`admin-card stat-card stat-card-${index + 1}`}>
            <p>{item.label}</p>
            <h3>{item.value}</h3>
          </article>
        ))}
      </div>

      <div className="admin-grid charts-grid">
<article
  className="admin-card chart-card chart-sales"
  style={{
    minHeight: '420px',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    background: '#ffffff',
  }}
>
  {/* HEADER */}
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px',
    }}
  >
    <div>
      <h3
        style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: 600,
          color: '#222',
        }}
      >
        Total Sales
      </h3>

      <p
        style={{
          margin: '6px 0',
          fontSize: '28px',
          fontWeight: 700,
          color: '#2c2c2c',
        }}
      >
        ₹
        {getSalesData()
          .reduce((sum, item) => sum + item.sales, 0)
          .toLocaleString()}
      </p>

      <span
        style={{
          fontSize: '12px',
          color: '#777',
        }}
      >
        Based on selected period
      </span>
    </div>

    {/* FILTERS */}
    <div style={{ display: 'flex', gap: '8px' }}>
      {[
        { key: 'daily', label: 'Today' },
        { key: 'weekly', label: '7 Days' },
        { key: 'monthly', label: '30 Days' },
      ].map((item) => (
        <button
          key={item.key}
          onClick={() => setSalesPeriod(item.key)}
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            borderRadius: '6px',
            border:
              salesPeriod === item.key
                ? '1px solid #C8A07A'
                : '1px solid #ddd',
            background:
              salesPeriod === item.key ? '#C8A07A' : '#fff',
            color:
              salesPeriod === item.key ? '#fff' : '#444',
            cursor: 'pointer',
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>

  {/* CHART */}
  <div style={{ flex: 1, width: '100%' }}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={getSalesData()}
        margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={getSalesDataKey()}
          fontSize={12}
          stroke="#666"
        />
        <YAxis
          fontSize={12}
          stroke="#666"
          tickFormatter={(v) => `₹${v / 1000}k`}
        />
        <Tooltip
          formatter={(value) => [
            `₹${value.toLocaleString()}`,
            'Sales',
          ]}
        />
        <Bar
          dataKey="sales"
          fill="#C8A07A"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</article>
       <article
  className="admin-card notification-card"
  style={{
    padding: '16px',
    minHeight: '420px',
    display: 'flex',
    flexDirection: 'column',
    background: '#ffffff',
  }}
>
  {/* HEADER */}
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    }}
  >
    <h3
      style={{
        margin: 0,
        fontSize: '16px',
        fontWeight: 600,
        color: '#222',
      }}
    >
      🔔 Notifications
    </h3>

    <span
      style={{
        fontSize: '12px',
        color: '#888',
      }}
    >
      Last 24 hours
    </span>
  </div>

  {/* NOTIFICATION LIST */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      overflowY: 'auto',
    }}
  >
    {/* Notification Item */}
    {[
      {
        icon: '🛒',
        text: 'New order placed – Order #1245',
        time: '2 mins ago',
      },
      {
        icon: '⚠️',
        text: 'Low stock alert – Saree (Red)',
        time: '15 mins ago',
      },
      {
        icon: '❌',
        text: 'Order #1238 was cancelled',
        time: '1 hour ago',
      },
      {
        icon: '💬',
        text: 'New customer message received',
        time: '3 hours ago',
      },
    ].map((item, index) => (
      <div
        key={index}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px',
          borderRadius: '8px',
          background: '#fafafa',
          border: '1px solid #eee',
        }}
      >
        <span style={{ fontSize: '18px' }}>{item.icon}</span>

        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              color: '#333',
            }}
          >
            {item.text}
          </p>
          <span
            style={{
              fontSize: '11px',
              color: '#999',
            }}
          >
            {item.time}
          </span>
        </div>
      </div>
    ))}
  </div>
</article>
      </div>

      <div className="admin-grid charts-grid">
        <article className="admin-card chart-card chart-payment">
          <h3>💳 Payment Method Split</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={summary.paymentMethodBreakdown}
                dataKey="count"
                nameKey="method"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={40}
                animationDuration={1000}
                animationEasing="ease-in-out"
              >
                {summary.paymentMethodBreakdown.map((entry, index) => (
                  <Cell key={entry.method} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            {summary.paymentMethodBreakdown.map((entry, index) => (
              <div key={entry.method} className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="legend-text">{entry.method}: {entry.count}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-card chart-card chart-placeholder">
          <h3>Quick Stats</h3>
          <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-label">Avg Order Value</span>
              <span className="stat-value">
                ₹{summary.totalOrders > 0 ? (summary.totalRevenue / summary.totalOrders).toFixed(0) : 0}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Conversion Rate</span>
              <span className="stat-value">
                {summary.totalCustomers > 0 ? ((summary.totalOrders / summary.totalCustomers) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Top Category</span>
              <span className="stat-value">
                {summary.ordersByCategory[0]?.category || 'N/A'}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default DashboardPage;

