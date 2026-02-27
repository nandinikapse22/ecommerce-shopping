import { Link } from 'react-router-dom';
import './CosmeticsPage.css';

const cosmeticsCategories = [
  {
    key: 'makeup',
    title: 'Makeup',
    description: 'Foundations, lipsticks, eyeliners, mascaras and everyday essentials.',
    route: '/cosmetics/makeup',
  },
  {
    key: 'skincare',
    title: 'Skincare',
    description: 'Face wash, serums, moisturizers and SPF routines for all skin types.',
    route: '/cosmetics/skincare',
  },
  {
    key: 'haircare',
    title: 'Haircare',
    description: 'Shampoo, oil, masks and repair solutions for healthy hair.',
    route: '/cosmetics/haircare',
  },
  {
    key: 'fragrances',
    title: 'Fragrances',
    description: 'Daily mists and premium perfumes for every occasion.',
    route: '/cosmetics/fragrances',
  },
];

const CosmeticsPage = () => {
  return (
    <section className="cosmetics-page">
      <div className="container cosmetics-container">
        <header className="cosmetics-header">
          <p className="cosmetics-breadcrumb">Home / Cosmetics</p>
          <h1>Cosmetics Categories</h1>
          <p>Browse all beauty categories with complete product listings and product detail pages.</p>
        </header>

        <div className="cosmetics-grid">
          {cosmeticsCategories.map((item) => (
            <article key={item.key} className="cosmetics-card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <Link to={item.route} className="cosmetics-link">Shop {item.title}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CosmeticsPage;

