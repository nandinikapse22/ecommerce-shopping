import { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import { useAdminAuth } from '../hooks/useAdminAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

const defaultForm = {
  code: '',
  type: 'percentage',
  value: 10,
  expiryDate: '',
  usageLimit: 100,
  enabled: true,
};

const CouponsPage = () => {
  const { token } = useAdminAuth();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(defaultForm);
  const [editing, setEditing] = useState('');

  const load = async () => {
    setLoading(true);
    setCoupons(await adminService.getCoupons(token));
    setLoading(false);
  };

  useEffect(() => {
    const run = async () => {
      await load();
    };
    run();
  }, [token]);

  const save = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      value: Number(form.value),
      usageLimit: Number(form.usageLimit),
      enabled: Boolean(form.enabled),
    };

    if (editing) {
      await adminService.updateCoupon(token, editing, payload);
    } else {
      await adminService.createCoupon(token, payload);
    }
    setEditing('');
    setForm(defaultForm);
    load();
  };

  const onEdit = (item) => {
    setEditing(item.id);
    setForm(item);
  };

  const toggleEnable = async (item) => {
    await adminService.updateCoupon(token, item.id, { enabled: !item.enabled });
    load();
  };

  const onDelete = async (id) => {
    await adminService.deleteCoupon(token, id);
    load();
  };

  if (loading) return <LoadingSpinner label="Loading coupons" />;

  return (
    <section className="admin-grid two-col">
      <article className="admin-card">
        <h3>{editing ? 'Edit Coupon' : 'Create Coupon'}</h3>
        <form className="admin-form" onSubmit={save}>
          <input value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))} placeholder="Code" required />
          <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
            <option value="percentage">Percentage</option>
            <option value="flat">Flat</option>
          </select>
          <input type="number" value={form.value} onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))} placeholder="Value" required />
          <input type="date" value={form.expiryDate} onChange={(e) => setForm((p) => ({ ...p, expiryDate: e.target.value }))} required />
          <input type="number" value={form.usageLimit} onChange={(e) => setForm((p) => ({ ...p, usageLimit: e.target.value }))} placeholder="Usage limit" />
          <label className="inline-check">
            <input type="checkbox" checked={form.enabled} onChange={(e) => setForm((p) => ({ ...p, enabled: e.target.checked }))} /> Enable coupon
          </label>
          <button type="submit">{editing ? 'Update' : 'Create'}</button>
        </form>
      </article>

      <article className="admin-card">
        <h3>Coupons</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Type</th>
                <th>Value</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((item) => (
                <tr key={item.id}>
                  <td>{item.code}</td>
                  <td>{item.type}</td>
                  <td>{item.type === 'percentage' ? `${item.value}%` : `₹${item.value}`}</td>
                  <td>{item.expiryDate}</td>
                  <td>{item.enabled ? 'Enabled' : 'Disabled'}</td>
                  <td>
                    <button type="button" onClick={() => onEdit(item)}>Edit</button>
                    <button type="button" onClick={() => toggleEnable(item)}>{item.enabled ? 'Disable' : 'Enable'}</button>
                    <button type="button" onClick={() => onDelete(item.id)}>Delete</button>
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

export default CouponsPage;

