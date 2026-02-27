import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../services/adminService';
import { useAdminAuth } from '../hooks/useAdminAuth';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const statusOptions = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
const paymentOptions = ['Paid', 'COD', 'Failed'];

const OrdersPage = () => {
  const { token } = useAdminAuth();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setOrders(await adminService.getOrders(token));
    setLoading(false);
  };

  useEffect(() => {
    const run = async () => {
      await load();
    };
    run();
  }, [token]);

  const filtered = useMemo(
    () => orders.filter((item) => statusFilter === 'All' || item.status === statusFilter),
    [orders, statusFilter]
  );

  const onStatusChange = async (id, status) => {
    await adminService.updateOrderStatus(token, id, status);
    load();
  };

  const onPaymentChange = async (id, status) => {
    await adminService.updatePaymentStatus(token, id, status);
    load();
  };

  if (loading) return <LoadingSpinner label="Loading orders" />;

  return (
    <section className="admin-card">
      <div className="admin-row-between">
        <h3>Orders</h3>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Update</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.customerName}</td>
                <td>₹{item.total.toLocaleString('en-IN')}</td>
                <td><StatusBadge value={item.status} /></td>
                <td><StatusBadge value={item.paymentStatus} /></td>
                <td>
                  <select value={item.status} onChange={(e) => onStatusChange(item.id, e.target.value)}>
                    {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                  <select value={item.paymentStatus} onChange={(e) => onPaymentChange(item.id, e.target.value)}>
                    {paymentOptions.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </td>
                <td><Link to={`/admin/orders/${item.id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersPage;

