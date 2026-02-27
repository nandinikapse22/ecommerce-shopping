import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { womenEthnicData, womenEthnicFilterMeta } from '../data/womenEthnicData';
import FilterSidebar from '../components/women-ethnic/FilterSidebar';
import SortBar from '../components/women-ethnic/SortBar';
import ProductCard from '../components/women-ethnic/ProductCard';
import './WomenEthnicWear.css';

const INITIAL_VISIBLE = 8;
const LOAD_STEP = 8;

const getInitialFilters = (maxPrice) => ({
  categories: [],
  sizes: [],
  colors: [],
  fabrics: [],
  occasions: [],
  discounts: [],
  maxPrice,
});

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const WomenEthnicWear = () => {
  const { category } = useParams();
  const maxPrice = useMemo(() => Math.max(...womenEthnicData.map((item) => item.price)), []);

  const [filters, setFilters] = useState(getInitialFilters(maxPrice));
  const [sortBy, setSortBy] = useState('newest');
  const [selectedSizes, setSelectedSizes] = useState({});
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewSize, setQuickViewSize] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!feedbackMessage) return undefined;
    const timer = setTimeout(() => setFeedbackMessage(''), 1800);
    return () => clearTimeout(timer);
  }, [feedbackMessage]);

  const handleToggleFilter = (key, value) => {
    setVisibleCount(INITIAL_VISIBLE);
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((item) => item !== value) : [...prev[key], value],
      };
    });
  };

  const handlePriceChange = (value) => {
    setVisibleCount(INITIAL_VISIBLE);
    setFilters((prev) => ({ ...prev, maxPrice: value }));
  };

  const clearAllFilters = () => {
    setVisibleCount(INITIAL_VISIBLE);
    setFilters(getInitialFilters(maxPrice));
  };

  const handleSortChange = (value) => {
    setVisibleCount(INITIAL_VISIBLE);
    setSortBy(value);
  };

  const normalizedRouteCategory = useMemo(() => {
    if (!category) return null;
    const map = {
      saree: 'Saree',
      kurti: 'Kurti',
      lehenga: 'Lehenga',
    };
    return map[category.toLowerCase()] || null;
  }, [category]);

  const filteredProducts = useMemo(() => {
    return womenEthnicData.filter((product) => {
      const matchesRouteCategory = !normalizedRouteCategory || product.category === normalizedRouteCategory;
      const matchesCategory = normalizedRouteCategory
        ? true
        : filters.categories.length === 0 || filters.categories.includes(product.category);
      const matchesPrice = product.price <= filters.maxPrice;
      const matchesSize = filters.sizes.length === 0 || filters.sizes.some((size) => product.sizes.includes(size));
      const matchesColor = filters.colors.length === 0 || filters.colors.some((color) => product.colors.includes(color));
      const matchesFabric = filters.fabrics.length === 0 || filters.fabrics.includes(product.fabric);
      const matchesOccasion = filters.occasions.length === 0 || filters.occasions.includes(product.occasion);
      const matchesDiscount = filters.discounts.length === 0 || filters.discounts.some((discount) => product.discount >= discount);

      return (
        matchesRouteCategory
        && matchesCategory
        && matchesPrice
        && matchesSize
        && matchesColor
        && matchesFabric
        && matchesOccasion
        && matchesDiscount
      );
    });
  }, [filters, normalizedRouteCategory]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    switch (sortBy) {
      case 'newest':
        return copy.sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival) || b.popularity - a.popularity);
      case 'priceLowToHigh':
        return copy.sort((a, b) => a.price - b.price);
      case 'priceHighToLow':
        return copy.sort((a, b) => b.price - a.price);
      default:
        return copy.sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival) || b.popularity - a.popularity);
    }
  }, [filteredProducts, sortBy]);

  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const canLoadMore = visibleCount < sortedProducts.length;

  const setSelectedSize = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const toCartPayload = (product, size) => ({
    id: `${product.id}-${size}`,
    parentId: product.id,
    name: `${product.name} (${size})`,
    brand: product.brand,
    image: product.images[0],
    price: formatCurrency(product.price),
    mrp: formatCurrency(product.mrp),
    category: product.category,
    size,
  });

  const handleAddToCart = (product, modalSize) => {
    const chosenSize = modalSize || selectedSizes[product.id];

    if (!chosenSize) {
      setFeedbackMessage(`Please select a size for ${product.name}`);
      return;
    }

    addToCart(toCartPayload(product, chosenSize));
    setFeedbackMessage(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (product) => {
    const payload = {
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: formatCurrency(product.price),
      brand: product.brand,
    };

    const added = toggleWishlist(payload);
    setFeedbackMessage(added ? 'Added to wishlist' : 'Removed from wishlist');
  };

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewSize(selectedSizes[product.id] || '');
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
    setQuickViewSize('');
  };

  const handleQuickViewAddToCart = () => {
    if (!quickViewProduct) return;
    if (!quickViewSize) {
      setFeedbackMessage('Please select a size to continue');
      return;
    }
    setSelectedSize(quickViewProduct.id, quickViewSize);
    handleAddToCart(quickViewProduct, quickViewSize);
    closeQuickView();
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_STEP);
    setTimeout(() => {
      window.scrollBy({ top: 220, behavior: 'smooth' });
    }, 80);
  };

  return (
    <section className="women-ethnic-page">
      <div className="ethnic-banner">
        <div className="container ethnic-banner-content">
          <div>
            <p className="banner-breadcrumb">Women / Ethnic Wear</p>
            <h1>Women Ethnic Wear</h1>
            <p className="banner-subtitle">Sarees, Kurtis, Lehengas &amp; More</p>
          </div>
          <span className="offer-badge">Up to 60% Off</span>
        </div>
      </div>

      <div className="container ethnic-content-wrap">
        <FilterSidebar
          filters={filters}
          filterMeta={womenEthnicFilterMeta}
          maxPrice={maxPrice}
          onToggleFilter={handleToggleFilter}
          onPriceChange={handlePriceChange}
          onClearAll={clearAllFilters}
          isMobileDrawerOpen={isMobileDrawerOpen}
          onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
        />

        <div className="ethnic-main-content">
          <div className="mobile-sticky-sort">
            <SortBar
              sortBy={sortBy}
              onSortChange={handleSortChange}
              resultCount={sortedProducts.length}
              onOpenMobileFilters={() => setIsMobileDrawerOpen(true)}
            />
          </div>

          {loading ? (
            <div className="product-grid">
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="product-skeleton" key={`skeleton-${index}`}>
                  <div className="skeleton-image" />
                  <div className="skeleton-line short" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line mid" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {sortedProducts.length === 0 ? (
                <div className="empty-state">
                  <h3>No styles matched your filters</h3>
                  <p>Try adjusting your filters or clearing them to discover more products.</p>
                  <button type="button" onClick={clearAllFilters}>Clear Filters</button>
                </div>
              ) : (
                <>
                  <div className="product-grid">
                    {visibleProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        selectedSize={selectedSizes[product.id] || ''}
                        onSizeSelect={setSelectedSize}
                        onToggleWishlist={handleToggleWishlist}
                        onQuickView={handleOpenQuickView}
                        onAddToCart={handleAddToCart}
                        isWishlisted={isInWishlist(product.id)}
                      />
                    ))}
                  </div>

                  {canLoadMore && (
                    <div className="load-more-wrap">
                      <button type="button" className="load-more-btn" onClick={handleLoadMore}>
                        Load More
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {quickViewProduct && (
        <div className="quick-view-modal-wrap" role="dialog" aria-modal="true" aria-label="Quick view">
          <div className="quick-view-overlay" onClick={closeQuickView} role="button" tabIndex={0} />
          <div className="quick-view-modal">
            <button type="button" className="modal-close" onClick={closeQuickView}>✕</button>
            <div className="quick-view-grid">
              <img src={quickViewProduct.images[0]} alt={quickViewProduct.name} />
              <div>
                <p className="quick-brand">{quickViewProduct.brand}</p>
                <h3>{quickViewProduct.name}</h3>
                <p className="quick-price">
                  {formatCurrency(quickViewProduct.price)}
                  <span>{formatCurrency(quickViewProduct.mrp)}</span>
                </p>
                <p className="quick-discount">{quickViewProduct.discount}% OFF</p>
                <label htmlFor="quick-size-select" className="quick-size-label">Select size</label>
                <select
                  id="quick-size-select"
                  value={quickViewSize}
                  onChange={(event) => setQuickViewSize(event.target.value)}
                  className="quick-size-select"
                >
                  <option value="">Choose size</option>
                  {quickViewProduct.sizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                <button type="button" className="quick-add-btn" onClick={handleQuickViewAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {feedbackMessage && <div className="floating-feedback">{feedbackMessage}</div>}
    </section>
  );
};

export default WomenEthnicWear;

