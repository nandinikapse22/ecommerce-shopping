import { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import { useAdminAuth } from '../hooks/useAdminAuth';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ReviewsPage = () => {
  const { token } = useAdminAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setReviews(await adminService.getReviews(token));
    setLoading(false);
  };

  useEffect(() => {
    const run = async () => {
      await load();
    };
    run();
  }, [token]);

  const moderate = async (id, status) => {
    await adminService.moderateReview(token, id, status);
    load();
  };

  const remove = async (id) => {
    await adminService.deleteReview(token, id);
    load();
  };

  if (loading) return <LoadingSpinner label="Loading reviews" />;

  return (
    <section className="admin-card">
      <h3>Reviews & Ratings</h3>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((item) => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{item.customerName}</td>
                <td>{item.rating} / 5</td>
                <td>{item.comment}</td>
                <td><StatusBadge value={item.status} /></td>
                <td>
                  <button type="button" onClick={() => moderate(item.id, 'approved')}>Approve</button>
                  <button type="button" onClick={() => moderate(item.id, 'rejected')}>Reject</button>
                  <button type="button" onClick={() => remove(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ReviewsPage;

