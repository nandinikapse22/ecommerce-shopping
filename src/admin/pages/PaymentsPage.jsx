import { useEffect, useMemo, useState } from 'react';
import { adminService } from '../services/adminService';
import { useAdminAuth } from '../hooks/useAdminAuth';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PaymentsPage = () => {
  const { token } = useAdminAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('All');
  const [fromDate, setFromDate] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setPayments(await adminService.getPayments(token));
      setLoading(false);
    };
    load();
  }, [token]);

  const filtered = useMemo(() => {
    return payments.filter((item) => {
      const statusOk = status === 'All' || item.status === status;
      const dateOk = !fromDate || new Date(item.createdAt) >= new Date(fromDate);
      return statusOk && dateOk;
    });
  }, [payments, status, fromDate]);

  if (loading) return <LoadingSpinner label="Loading payments" />;

  return (
    <section className="admin-card">
      <div className="admin-row-between">
        <h3>Payments</h3>
        <div className="inline-filters">
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="COD">COD</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Txn ID</th>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.orderId}</td>
                <td>₹{item.amount.toLocaleString('en-IN')}</td>
                <td>{item.method}</td>
                <td><StatusBadge value={item.status} /></td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PaymentsPage;

