import { useEffect, useMemo, useState } from 'react';
import { adminService } from '../services/adminService';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useToast } from '../hooks/useToast';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CustomersPage = () => {
  const { token } = useAdminAuth();
  const { pushToast } = useToast();
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [customersData, ordersData] = await Promise.all([
      adminService.getCustomers(token),
      adminService.getOrders(token),
    ]);
    setCustomers(customersData);
    setOrders(ordersData);
    setLoading(false);
  };

  useEffect(() => {
    const run = async () => {
      await load();
    };
    run();
  }, [token]);

  const orderCountMap = useMemo(() => {
    const map = {};
    orders.forEach((order) => {
      map[order.customerId] = (map[order.customerId] || 0) + 1;
    });
    return map;
  }, [orders]);

  const toggleBlock = async (id) => {
    await adminService.toggleCustomerBlock(token, id);
    pushToast({ type: 'success', title: 'Customer status updated', message: id });
    load();
  };

  if (loading) return <LoadingSpinner label="Loading customers" />;

  return (
    <section className="admin-card">
      <h3>Customers</h3>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Orders</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.city}</td>
                <td>{orderCountMap[customer.id] || 0}</td>
                <td><StatusBadge value={customer.status} /></td>
                <td>
                  <button type="button" onClick={() => toggleBlock(customer.id)}>
                    {customer.status === 'blocked' ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CustomersPage;

