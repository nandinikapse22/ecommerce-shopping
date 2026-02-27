import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <h1 className="page-title">My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-icon">â¤ï¸</div>
            <h2>Your wishlist is empty</h2>
            <p>Save items you love by clicking the heart icon on products</p>
            <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <p className="wishlist-count">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist</p>
            
            <div className="wishlist-grid">
              {wishlist.map((item) => (
                <div className="wishlist-card" key={item.id}>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                    aria-label="Remove from wishlist"
                  >
                    Ã
                  </button>
                  
                  <div className="wishlist-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="wishlist-info">
                    <h3>{item.name}</h3>
                    <p className="wishlist-price">{item.price}</p>
                  </div>
                  
                  <button 
                    className="move-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Move to Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;