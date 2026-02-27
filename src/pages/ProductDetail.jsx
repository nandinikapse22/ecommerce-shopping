import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { womenEthnicData } from '../data/womenEthnicData';
import { womenWesternData } from '../data/womenWesternData';
import { womenAccessoriesData } from '../data/womenAccessoriesData';
import { womenBeautyData } from '../data/womenBeautyData';
import { menData } from '../data/menData';
import ImageGallery from '../components/product-detail/ImageGallery';
import SizeSelector from '../components/product-detail/SizeSelector';
import RatingStars from '../components/product-detail/RatingStars';
import './ProductDetail.css';

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const pdpTabs = ['Description', 'Fabric & Care', 'Size Guide', 'Shipping & Returns'];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const allProducts = useMemo(
    () => [...womenEthnicData, ...womenWesternData, ...womenAccessoriesData, ...womenBeautyData, ...menData],
    []
  );

  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sizeError, setSizeError] = useState('');
  const [deliveryPin, setDeliveryPin] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [activeTab, setActiveTab] = useState('Description');

  const numericId = Number(id);
  const product = allProducts.find((item) => item.id === numericId);

  const reviewCount = useMemo(() => 140 + (numericId % 90), [numericId]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!product) return;
    const timer = setTimeout(() => {
      setSelectedColor(product.colors?.[0] || '');
      setSelectedSize('');
      setSizeError('');
      setDeliveryPin('');
      setDeliveryMessage('');
      setActiveTab('Description');
    }, 0);
    return () => clearTimeout(timer);
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 6);
  }, [allProducts, product]);

  const addToCartPayload = (item) => ({
    id: `${item.id}-${selectedSize}-${selectedColor}`,
    parentId: item.id,
    name: `${item.name} (${selectedSize})`,
    brand: item.brand,
    image: item.images[0],
    price: formatCurrency(item.price),
    mrp: formatCurrency(item.mrp),
    category: item.category,
    size: selectedSize,
    color: selectedColor,
  });

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      setSizeError('Please select a size');
      return;
    }

    setSizeError('');
    addToCart(addToCartPayload(product));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    if (selectedSize) navigate('/cart');
  };

  const handleDeliveryCheck = () => {
    if (!deliveryPin || deliveryPin.length < 6) {
      setDeliveryMessage('Enter a valid 6-digit pincode');
      return;
    }

    const fastDelivery = Number(deliveryPin[deliveryPin.length - 1]) % 2 === 0;
    setDeliveryMessage(
      fastDelivery
        ? 'Delivery by Tomorrow • Cash on Delivery Available'
        : 'Delivery in 3-5 days • Easy 7-day returns'
    );
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    toggleWishlist({
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: formatCurrency(product.price),
      brand: product.brand,
    });
  };

  if (loading) {
    return (
      <section className="pdp-page container">
        <div className="pdp-skeleton-grid">
          <div className="skeleton large" />
          <div className="skeleton side" />
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="pdp-page container">
        <div className="pdp-not-found">
          <h2>Product Not Found</h2>
          <p>The product you are looking for is unavailable.</p>
          <Link to="/" className="back-home-btn">Back to Home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pdp-page">
      <div className="container">
        <div className="pdp-top-grid">
          <ImageGallery images={product.images} name={product.name} />

          <div className="pdp-info-sticky">
            <p className="pdp-brand">{product.brand}</p>
            <h1 className="pdp-title">{product.name}</h1>
            <RatingStars rating={product.rating} reviewCount={reviewCount} size="lg" />

            <div className="pdp-price-row">
              <span className="pdp-price">{formatCurrency(product.price)}</span>
              <span className="pdp-mrp">{formatCurrency(product.mrp)}</span>
              <span className="pdp-discount">{product.discount}% OFF</span>
            </div>
            <p className="pdp-tax-note">Inclusive of all taxes</p>

            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelect={(size) => {
                setSelectedSize(size);
                setSizeError('');
              }}
              error={sizeError}
            />

            <div className="pdp-color-block">
              <p>Select Color</p>
              <div className="pdp-color-list">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`pdp-color-dot ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                    data-color={color}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>

            <div className="pdp-actions">
              <button type="button" className="pdp-add-cart" onClick={handleAddToCart} disabled={!selectedSize}>
                Add to Cart
              </button>
              <button type="button" className="pdp-buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button type="button" className={`pdp-wishlist ${isInWishlist(product.id) ? 'active' : ''}`} onClick={handleWishlistToggle}>
                {isInWishlist(product.id) ? '♥ Wishlisted' : '♡ Wishlist'}
              </button>
            </div>

            <div className="pdp-delivery-box">
              <p>Delivery Options</p>
              <div className="delivery-row">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={deliveryPin}
                  onChange={(event) => setDeliveryPin(event.target.value.replace(/\D/g, '').slice(0, 6))}
                />
                <button type="button" onClick={handleDeliveryCheck}>Check</button>
              </div>
              {deliveryMessage && <p className="delivery-msg">{deliveryMessage}</p>}
            </div>

            <div className="pdp-offers-box">
              <h3>Available Offers</h3>
              <ul>
                <li>10% Instant Discount on select bank cards.</li>
                <li>Flat ₹300 off on orders above ₹2999.</li>
                <li>Extra 5% off during festival sale.</li>
              </ul>
            </div>

            <div className="pdp-highlights">
              <h3>Highlights</h3>
              <ul>
                <li>Fabric: {product.fabric}</li>
                <li>Fit: Premium Regular Fit</li>
                <li>Occasion: {product.occasion}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pdp-tabs-wrap">
          <div className="pdp-tabs">
            {pdpTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="pdp-tab-content">
            {activeTab === 'Description' && (
              <p>
                Elevate your wardrobe with this premium {product.name.toLowerCase()} from {product.brand}. Designed for
                comfort and style, perfect for modern everyday wear and special occasions.
              </p>
            )}
            {activeTab === 'Fabric & Care' && (
              <ul>
                <li>Fabric: {product.fabric}</li>
                <li>Wash Care: Machine wash cold, gentle cycle</li>
                <li>Do not bleach, tumble dry low</li>
              </ul>
            )}
            {activeTab === 'Size Guide' && (
              <p>Model is wearing size M. Refer to your usual size; choose one size up for a relaxed fit.</p>
            )}
            {activeTab === 'Shipping & Returns' && (
              <p>Free shipping on orders above ₹999. Easy 7-day return and exchange policy.</p>
            )}
          </div>
        </div>

        <div className="pdp-reviews-block">
          <h2>Ratings & Reviews</h2>
          <div className="pdp-review-summary">
            <RatingStars rating={product.rating} reviewCount={reviewCount} />
          </div>

          <div className="review-card">
            <RatingStars rating={5} size="sm" />
            <p>Loved the quality and fit. Exactly as shown in the images.</p>
            <span>- Priya S.</span>
          </div>
          <div className="review-card">
            <RatingStars rating={4} size="sm" />
            <p>Fabric feels premium and delivery was quick. Great value for price.</p>
            <span>- Neha R.</span>
          </div>
        </div>

        <div className="pdp-related-block">
          <h2>Similar Products</h2>
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <article key={item.id} className="related-card" onClick={() => navigate(`/product/${item.id}`)}>
                <img src={item.images[0]} alt={item.name} />
                <p className="brand">{item.brand}</p>
                <h4>{item.name}</h4>
                <p className="price">{formatCurrency(item.price)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

