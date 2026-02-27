import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './recomendeditems.css';

import p1 from '../../assets/products/p1.jpg';
import p2 from '../../assets/products/p2.jpg';
import p3 from '../../assets/products/p3.jpg';
import p4 from '../../assets/products/p4.jpg';
import p5 from '../../assets/products/p5.jpg';
import p6 from '../../assets/products/p6.jpg';
import p7 from '../../assets/products/p7.jpg';
import p8 from '../../assets/products/p8.jpg';

const categories = ['All', 'Women', 'Men', 'Accessories'];

const allProducts = [
  { id: 1, image: p1, name: 'Elegant Women Top', price: '₹799', category: 'Women' },
  { id: 2, image: p2, name: 'Designer Hand Bag', price: '₹1,499', category: 'Accessories' },
  { id: 3, image: p3, name: 'Premium Cosmetics', price: '₹999', category: 'Women' },
  { id: 4, image: p4, name: 'Classic Men Shirt', price: '₹1,199', category: 'Men' },
  { id: 5, image: p5, name: 'Stylish Jeans', price: '₹1,299', category: 'Men' },
  { id: 6, image: p6, name: 'Trendy Footwear', price: '₹1,699', category: 'Accessories' },
  { id: 7, image: p7, name: 'Fashion Accessories', price: '₹649', category: 'Accessories' },
  { id: 8, image: p8, name: 'Luxury Watch', price: '₹2,499', category: 'Accessories' },
];

const RecommendedItems = () => {
  // Tab state for category filtering
  const [activeTab, setActiveTab] = useState('All');
  
  // Image zoom modal state
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Track which product was just added (for button feedback)
  const [justAdded, setJustAdded] = useState(null);

  // Get cart context
  const { toggleWishlist, isInWishlist, addToCart } = useCart();

  // Filter products by selected category
  const filteredProducts = activeTab === 'All' 
    ? allProducts 
    : allProducts.filter(product => product.category === activeTab);

  // Open image zoom modal
  const openZoom = (product) => {
    setSelectedImage(product);
  };

  // Close image zoom modal
  const closeZoom = () => {
    setSelectedImage(null);
  };

  // Handle wishlist toggle
  const handleWishlist = (e, product) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Handle add to cart
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1500);
  };

  return (
    <section className="recommended-items">
      <div className="recommended-header">
        <h2>Recommended Items</h2>
        <p>Discover our handpicked selection just for you</p>
      </div>

      <div className="tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={activeTab === category ? 'active' : ''}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="recommended-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            {/* Wishlist Heart Icon - Top Right */}
            <button 
              className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={(e) => handleWishlist(e, product)}
              aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
            
            {/* Product Image */}
            <div className="product-img" onClick={() => openZoom(product)}>
              <img src={product.image} alt={product.name} />
            </div>
            
            {/* Product Info */}
            <h4>{product.name}</h4>
            <span className="price">{product.price}</span>
            
            {/* Add to Cart Button */}
            <button 
              className={`add-to-cart-btn ${justAdded === product.id ? 'added' : ''}`}
              onClick={(e) => handleAddToCart(e, product)}
              disabled={justAdded === product.id}
            >
              {justAdded === product.id ? 'Added â\u009c\u0093' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div className="zoom-modal" onClick={closeZoom}>
          <div className="zoom-content" onClick={(e) => e.stopPropagation()}>
            <button className="zoom-close" onClick={closeZoom}>&times;</button>
            <img src={selectedImage.image} alt={selectedImage.name} />
            <div className="zoom-details">
              <h3>{selectedImage.name}</h3>
              <p className="price">{selectedImage.price}</p>
              <button 
                className="add-to-cart-btn modal-cart-btn"
                onClick={(e) => handleAddToCart(e, selectedImage)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecommendedItems;
