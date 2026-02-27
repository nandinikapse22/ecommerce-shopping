import { useEffect, useMemo, useState } from 'react';
import { adminService } from '../services/adminService';
import { useAdminAuth } from '../hooks/useAdminAuth';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const InventoryPage = () => {
  const { token } = useAdminAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setRows(await adminService.getInventory(token));
    setLoading(false);
  };

  useEffect(() => {
    const run = async () => {
      await load();
    };
    run();
  }, [token]);

  const lowStock = useMemo(() => rows.filter((row) => row.stock < 10), [rows]);

  const updateStock = async (id, value) => {
    await adminService.updateStock(token, id, value);
    load();
  };

  if (loading) return <LoadingSpinner label="Loading inventory" />;

  return (
    <section className="admin-grid two-col">
      <article className="admin-card">
        <h3>Low Stock Alerts</h3>
        <ul className="simple-list">
          {lowStock.length === 0 ? <li>No low-stock products</li> : lowStock.map((item) => (
            <li key={item.id}>{item.name} - {item.stock} left</li>
          ))}
        </ul>
      </article>

      <article className="admin-card">
        <h3>Stock Tracking</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Status</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 40).map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.sku}</td>
                  <td><StatusBadge value={item.status} /></td>
                  <td>
                    <input
                      type="number"
                      value={item.stock}
                      min={0}
                      onChange={(event) => updateStock(item.id, Number(event.target.value))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
};

export default InventoryPage;

