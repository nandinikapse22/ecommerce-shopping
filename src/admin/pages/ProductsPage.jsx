import { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useToast } from '../hooks/useToast';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const blankForm = {
  name: '',
  brand: '',
  category: 'Women',
  subCategory: '',
  price: 0,
  mrp: 0,
  discount: 0,
  stock: 0,
  sku: '',
  visibility: 'active',
  sizes: ['M'],
  colors: ['black'],
  fabric: 'Cotton',
  occasion: 'Casual',
  rating: 4,
  popularity: 50,
  images: [''],
};

const ProductsPage = () => {
  const { token } = useAdminAuth();
  const { pushToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blankForm);

  const loadProducts = async () => {
    setLoading(true);
    const data = await adminService.getProducts(token);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    const run = async () => {
      await loadProducts();
    };
    run();
  }, [token]);

  const onSave = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      mrp: Number(form.mrp),
      discount: Number(form.discount),
      stock: Number(form.stock),
      images: form.images.filter(Boolean),
    };

    if (editing) {
      await adminService.updateProduct(token, editing, payload);
      pushToast({ type: 'success', title: 'Product updated', message: payload.name });
    } else {
      await adminService.createProduct(token, payload);
      pushToast({ type: 'success', title: 'Product created', message: payload.name });
    }

    setEditing(null);
    setForm(blankForm);
    loadProducts();
  };

  const onEdit = (item) => {
    setEditing(item.id);
    setForm({
      ...blankForm,
      ...item,
      images: item.images?.length ? item.images : [''],
    });
  };

  const onDelete = async (id) => {
    await adminService.deleteProduct(token, id);
    pushToast({ type: 'success', title: 'Product deleted', message: `ID ${id}` });
    loadProducts();
  };

  if (loading) return <LoadingSpinner label="Loading products" />;

  return (
    <section className="admin-grid two-col">
      <article className="admin-card product-form-card">
        <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
        <form className="admin-form" onSubmit={onSave}>
          <input placeholder="Product Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          <input placeholder="Brand" value={form.brand} onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))} required />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} required />
          <input placeholder="Subcategory" value={form.subCategory} onChange={(e) => setForm((p) => ({ ...p, subCategory: e.target.value }))} />
          <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} required />
          <input type="number" placeholder="MRP" value={form.mrp} onChange={(e) => setForm((p) => ({ ...p, mrp: e.target.value }))} required />
          <input type="number" placeholder="Discount %" value={form.discount} onChange={(e) => setForm((p) => ({ ...p, discount: e.target.value }))} />
          <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))} />
          <input placeholder="SKU" value={form.sku} onChange={(e) => setForm((p) => ({ ...p, sku: e.target.value }))} />
          <input placeholder="Image URL" value={form.images[0] || ''} onChange={(e) => setForm((p) => ({ ...p, images: [e.target.value] }))} />
          <select value={form.visibility} onChange={(e) => setForm((p) => ({ ...p, visibility: e.target.value }))}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="admin-form-actions">
            <button type="submit">{editing ? 'Update' : 'Create'}</button>
            {editing && <button type="button" onClick={() => { setEditing(null); setForm(blankForm); }}>Cancel</button>}
          </div>
        </form>
      </article>

      <article className="admin-card product-list-card">
        <h3>Product List</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Visibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 30).map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>₹{item.price}</td>
                  <td>{item.stock}</td>
                  <td><StatusBadge value={item.visibility} /></td>
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

export default ProductsPage;

