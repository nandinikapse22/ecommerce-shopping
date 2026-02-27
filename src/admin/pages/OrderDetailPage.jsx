import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { adminService } from '../services/adminService';
import { useAdminAuth } from '../hooks/useAdminAuth';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const OrderDetailPage = () => {
  const { id } = useParams();
  const { token } = useAdminAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setOrder(await adminService.getOrderById(token, id));
      setLoading(false);
    };
    load();
  }, [token, id]);

  if (loading) return <LoadingSpinner label="Loading order" />;
  if (!order) return <div className="admin-card">Order not found</div>;

  return (
    <section className="admin-grid two-col">
      <article className="admin-card">
        <h3>{order.id}</h3>
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Email:</strong> {order.customerEmail}</p>
        <p><strong>Address:</strong> {order.shippingAddress}</p>
        <p><strong>Total:</strong> ₹{order.total.toLocaleString('en-IN')}</p>
        <p><strong>Status:</strong> <StatusBadge value={order.status} /></p>
        <p><strong>Payment:</strong> <StatusBadge value={order.paymentStatus} /></p>
      </article>

      <article className="admin-card">
        <h3>Order Timeline</h3>
        <ul className="timeline-list">
          {order.timeline.map((event, index) => (
            <li key={`${event.status}-${index}`}>
              <strong>{event.status}</strong>
              <span>{new Date(event.at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="admin-card" style={{ gridColumn: '1 / -1' }}>
        <h3>Items</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₹{item.price.toLocaleString('en-IN')}</td>
                  <td>{item.quantity}</td>
                  <td>₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
};

export default OrderDetailPage;

