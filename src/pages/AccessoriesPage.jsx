import { Link } from 'react-router-dom';
import './AccessoriesPage.css';

const accessoriesCategories = [
  {
    key: 'bags',
    title: 'Bags',
    description: 'Handbags, totes and functional styles for everyday carry.',
    route: '/accessories/bags',
  },
  {
    key: 'jewellery',
    title: 'Jewellery',
    description: 'Earrings, necklaces and statement pieces for every look.',
    route: '/accessories/jewellery',
  },
  {
    key: 'footwear',
    title: 'Footwear',
    description: 'Heels, sandals and occasion-ready picks.',
    route: '/accessories/footwear',
  },
  {
    key: 'sunglasses',
    title: 'Sunglasses',
    description: 'UV-protected styles from classic to modern frames.',
    route: '/accessories/sunglasses',
  },
  {
    key: 'watches',
    title: 'Watches',
    description: 'Daily and premium watches with elegant detailing.',
    route: '/accessories/watches',
  },
  {
    key: 'belts',
    title: 'Belts',
    description: 'Minimal and statement belts for versatile styling.',
    route: '/accessories/belts',
  },
];

const AccessoriesPage = () => {
  return (
    <section className="accessories-hub-page">
      <div className="container accessories-hub-container">
        <header className="accessories-hub-header">
          <p className="accessories-breadcrumb">Home / Accessories</p>
          <h1>Accessories Categories</h1>
          <p>Explore all accessories categories with complete listing and PDP flow.</p>
        </header>

        <div className="accessories-hub-grid">
          {accessoriesCategories.map((item) => (
            <article key={item.key} className="accessories-hub-card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <Link to={item.route} className="accessories-hub-link">Shop {item.title}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccessoriesPage;

