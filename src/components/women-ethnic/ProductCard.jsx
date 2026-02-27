import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return Array.from({ length: 5 }).map((_, index) => {
    if (index < fullStars) return '★';
    if (index === fullStars && hasHalf) return '☆';
    return '✩';
  });
};

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const ProductCard = ({
  product,
  selectedSize,
  onSizeSelect,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  isWishlisted,
}) => {
  const navigate = useNavigate();
  const stars = renderStars(product.rating);

  return (
    <article className="ethnic-product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <button
        className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onToggleWishlist(product);
        }}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isWishlisted ? '♥' : '♡'}
      </button>

      <div className="ethnic-product-image-wrap">
        <img src={product.images[0]} alt={product.name} className="product-image primary" loading="lazy" />

        {onQuickView && (
          <button
            className="quick-view-btn"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
          >
            Quick View
          </button>
        )}

        <button
          className="card-add-to-cart-btn"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onAddToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>

      <div className="ethnic-product-info">
        <p className="product-brand">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating" aria-label={`Rated ${product.rating} out of 5`}>
          <span className="stars">{stars.join(' ')}</span>
          <span className="rating-value">{product.rating}</span>
        </div>

        <div className="price-row">
          <span className="selling-price">{formatCurrency(product.price)}</span>
          <span className="mrp">{formatCurrency(product.mrp)}</span>
          <span className="discount">({product.discount}% OFF)</span>
        </div>

        <div className="size-row">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`size-chip ${selectedSize === size ? 'selected' : ''}`}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSizeSelect(product.id, size);
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

