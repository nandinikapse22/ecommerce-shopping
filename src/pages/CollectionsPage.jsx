import { Link } from 'react-router-dom';
import { womenEthnicData } from '../data/womenEthnicData';
import { womenWesternData } from '../data/womenWesternData';
import { menData } from '../data/menData';
import './CollectionsPage.css';

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`;

const CollectionsPage = () => {
  const ethnicPreview = womenEthnicData.slice(0, 6);
  const westernPreview = womenWesternData.slice(0, 6);
  const menPreview = menData.slice(0, 6);

  return (
    <section className="collections-page">
      <div className="container collections-container">
        <header className="collections-header">
          <p className="collections-breadcrumb">Home / Collections</p>
          <h1>Explore Our Collections</h1>
          <p>
            Discover curated edits across Ethnic and Western wear. Shop trending styles from premium labels.
          </p>
        </header>

        <div className="collection-cta-grid">
          <article className="collection-cta-card ethnic">
            <h2>Women Ethnic Wear</h2>
            <p>Sarees, Kurtis, Lehengas and festive-ready styles.</p>
            <Link to="/women/ethnic-wear" className="collection-link">Shop Ethnic</Link>
          </article>

          <article className="collection-cta-card western">
            <h2>Women Western Wear</h2>
            <p>Jeans, Tops, Skirts, Dresses and modern essentials.</p>
            <Link to="/women/western-wear" className="collection-link">Shop Western</Link>
          </article>

          <article className="collection-cta-card men">
            <h2>Men Fashion</h2>
            <p>Top wear, bottom wear, footwear, accessories and ethnic styles.</p>
            <Link to="/men" className="collection-link">Shop Men</Link>
          </article>
        </div>

        <section className="preview-section">
          <div className="section-title-row">
            <h3>Ethnic Collection Highlights</h3>
            <Link to="/women/ethnic-wear">View all</Link>
          </div>
          <div className="preview-grid">
            {ethnicPreview.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="preview-card">
                <img src={item.images[0]} alt={item.name} />
                <p className="brand">{item.brand}</p>
                <h4>{item.name}</h4>
                <p className="price">{formatCurrency(item.price)}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="preview-section">
          <div className="section-title-row">
            <h3>Western Collection Highlights</h3>
            <Link to="/women/western-wear">View all</Link>
          </div>
          <div className="preview-grid">
            {westernPreview.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="preview-card">
                <img src={item.images[0]} alt={item.name} />
                <p className="brand">{item.brand}</p>
                <h4>{item.name}</h4>
                <p className="price">{formatCurrency(item.price)}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="preview-section">
          <div className="section-title-row">
            <h3>Men Collection Highlights</h3>
            <Link to="/men">View all</Link>
          </div>
          <div className="preview-grid">
            {menPreview.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="preview-card">
                <img src={item.images[0]} alt={item.name} />
                <p className="brand">{item.brand}</p>
                <h4>{item.name}</h4>
                <p className="price">{formatCurrency(item.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default CollectionsPage;

