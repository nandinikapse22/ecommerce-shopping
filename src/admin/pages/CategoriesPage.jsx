import { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useToast } from '../hooks/useToast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const empty = { name: '', image: '', subcategories: '' };

const CategoriesPage = () => {
  const { token } = useAdminAuth();
  const { pushToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const list = await adminService.getCategories(token);
    setCategories(list);
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
      name: form.name,
      image: form.image,
      subcategories: form.subcategories.split(',').map((item) => item.trim()).filter(Boolean),
    };

    if (editing) {
      await adminService.updateCategory(token, editing, payload);
      pushToast({ type: 'success', title: 'Category updated', message: payload.name });
    } else {
      await adminService.createCategory(token, payload);
      pushToast({ type: 'success', title: 'Category created', message: payload.name });
    }
    setEditing('');
    setForm(empty);
    load();
  };

  const onEdit = (item) => {
    setEditing(item.id);
    setForm({
      name: item.name,
      image: item.image || '',
      subcategories: item.subcategories.join(', '),
    });
  };

  const onDelete = async (id) => {
    await adminService.deleteCategory(token, id);
    pushToast({ type: 'success', title: 'Category removed', message: id });
    load();
  };

  if (loading) return <LoadingSpinner label="Loading categories" />;

  return (
    <section className="admin-grid two-col">
      <article className="admin-card">
        <h3>{editing ? 'Edit Category' : 'Create Category'}</h3>
        <form className="admin-form" onSubmit={save}>
          <input placeholder="Category name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          <input placeholder="Category image URL" value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} />
          <textarea placeholder="Subcategories (comma separated)" value={form.subcategories} onChange={(e) => setForm((p) => ({ ...p, subcategories: e.target.value }))} rows={5} />
          <div className="admin-form-actions">
            <button type="submit">{editing ? 'Update' : 'Create'}</button>
            {editing && <button type="button" onClick={() => { setEditing(''); setForm(empty); }}>Cancel</button>}
          </div>
        </form>
      </article>

      <article className="admin-card">
        <h3>Category List</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subcategories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.subcategories.join(', ')}</td>
                  <td>
                    <button type="button" onClick={() => onEdit(item)}>Edit</button>
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

export default CategoriesPage;

