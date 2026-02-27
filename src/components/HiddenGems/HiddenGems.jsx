import './HiddenGems.css';

import p9 from '../../assets/products/p9.jpg';
import p10 from '../../assets/products/p10.jpg';
import p11 from '../../assets/products/p11.jpg';
import p12 from '../../assets/products/p12.jpg';
import p13 from '../../assets/products/p13.jpg';

const gemItems = [
  { id: 1, image: p10, label: 'Chanderi Shine' },
  { id: 2, image: p11, label: 'Insta Loved' },
  { id: 3, image: p12, label: 'Party Ready' },
  { id: 4, image: p13, label: 'Daily Coords' },
];

const HiddenGems = () => {
  return (
    <section className="hidden-gems">
      <div className="hidden-gems-container">
        {/* Left Side - Large Featured Image */}
        <div className="gems-hero">
          <div className="gems-hero-image">
            <img src={p9} alt="Hidden Gems Collection" />
            <div className="gems-hero-overlay">
              <div className="gems-hero-content">
                <h2 className="gems-title">Hidden Gems</h2>
                <p className="gems-subtitle">Niche, homegrown labels handpicked by us</p>
                <button className="gems-cta">
                  Explore Hidden Gems <span className="arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - 4 Cards Grid */}
        <div className="gems-cards">
          {gemItems.map((item) => (
            <div className="gem-card" key={item.id}>
              <div className="gem-card-image">
                <img src={item.image} alt={item.label} />
                <div className="gem-card-overlay">
                  <span className="gem-card-label">{item.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HiddenGems;
