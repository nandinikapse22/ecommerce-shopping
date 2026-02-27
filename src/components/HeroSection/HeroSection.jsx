import { Link } from 'react-router-dom';
import './HeroSection.css';
import heroImage from '../../assets/hero-fashion.png';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-subtitle">New Collection 2026</span>
          <h1 className="hero-title">Discover Your Fashion</h1>
          <p className="hero-description">
            Explore our curated collection of premium fashion pieces designed to elevate your style. 
            From timeless classics to trending styles, find your perfect look.
          </p>
          <div className="hero-buttons">
            <Link to="/women/ethnic-wear" className="btn btn-primary">Shop Now</Link>
            <Link to="/collections" className="btn btn-secondary">View Collections</Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">300+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Brands</span>
            </div>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img src={heroImage} alt="Fashion Model" className="hero-image" />
          <div className="hero-badge">
            <span className="badge-text">Trending</span>
          </div>
        </div>
      </div>
    </section>
  );
}



export default HeroSection;




