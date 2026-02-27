import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <section className="profile-page">
      <div className="container profile-container">
        <header className="profile-header">
          <p className="profile-breadcrumb">Home / Profile</p>
          <h1>My Account</h1>
          <p>Manage your profile, saved addresses, orders and preferences from one place.</p>
        </header>

        <div className="profile-grid">
          <article className="profile-card">
            <h2>Profile Details</h2>
            <p>Name: Fashion Shopper</p>
            <p>Email: shopper@example.com</p>
            <p>Phone: +91 98765 43210</p>
          </article>

          <article className="profile-card">
            <h2>Saved Addresses</h2>
            <p>Home: 21, Park Street, Pune, Maharashtra</p>
            <p>Office: 14, MG Road, Bengaluru, Karnataka</p>
          </article>

          <article className="profile-card">
            <h2>Recent Orders</h2>
            <p>2 active deliveries</p>
            <p>6 completed orders</p>
            <p>1 return in progress</p>
          </article>

          <article className="profile-card">
            <h2>Preferences</h2>
            <p>Price alerts: Enabled</p>
            <p>Offers newsletter: Subscribed</p>
            <p>Language: English</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;

