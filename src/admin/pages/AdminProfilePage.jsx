import { useAdminAuth } from '../hooks/useAdminAuth';

const AdminProfilePage = () => {
  const { adminUser } = useAdminAuth();

  return (
    <section className="admin-card">
      <h3>Admin Profile</h3>
      <div className="profile-grid">
        <p><strong>Name:</strong> {adminUser?.name}</p>
        <p><strong>Email:</strong> {adminUser?.email}</p>
        <p><strong>Role:</strong> {adminUser?.role}</p>
        <p><strong>Access:</strong> Full Admin</p>
      </div>
    </section>
  );
};

export default AdminProfilePage;

