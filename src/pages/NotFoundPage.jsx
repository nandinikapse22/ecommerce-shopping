import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <section className="not-found-page">
      <div className="container not-found-container">
        <p className="not-found-code">404</p>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist or may have been moved.</p>
        <Link to="/" className="not-found-home-link">Back to Home</Link>
      </div>
    </section>
  );
};

export default NotFoundPage;

