import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import FilterSidebar from '../components/women-ethnic/FilterSidebar';
import SortBar from '../components/women-ethnic/SortBar';
import ProductCard from '../components/women-ethnic/ProductCard';
import { menData, menFilterMeta } from '../data/menData';
import './MenPage.css';

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

const categorySlugMap = {
  'top-wear': 'Top Wear',
  'bottom-wear': 'Bottom Wear',
  footwear: 'Footwear',
  accessories: 'Accessories',
  'ethnic-wear': 'Ethnic Wear',
};

const MenPage = () => {
  const { category } = useParams();
  const maxPrice = useMemo(() => Math.max(...menData.map((item) => item.price)), []);

  const [filters, setFilters] = useState(getInitialFilters(maxPrice));
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedSizes, setSelectedSizes] = useState({});
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 520);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!feedbackMessage) return undefined;
    const timer = setTimeout(() => setFeedbackMessage(''), 1800);
    return () => clearTimeout(timer);
  }, [feedbackMessage]);

  const normalizedRouteCategory = useMemo(() => {
    if (!category) return null;
    return categorySlugMap[category.toLowerCase()] || null;
  }, [category]);

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

  const filteredProducts = useMemo(() => {
    return menData.filter((product) => {
      const matchesRouteCategory = !normalizedRouteCategory || product.category === normalizedRouteCategory;
      const matchesCategory = normalizedRouteCategory
        ? true
        : filters.categories.length === 0 || filters.categories.includes(product.subCategory);
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
      case 'popularity':
        return copy.sort((a, b) => b.popularity - a.popularity);
      case 'newest':
        return copy.sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival) || b.popularity - a.popularity);
      case 'priceLowToHigh':
        return copy.sort((a, b) => a.price - b.price);
      case 'priceHighToLow':
        return copy.sort((a, b) => b.price - a.price);
      case 'rating':
        return copy.sort((a, b) => b.rating - a.rating);
      default:
        return copy;
    }
  }, [filteredProducts, sortBy]);

  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const canLoadMore = visibleCount < sortedProducts.length;

  const setSelectedSize = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleSortChange = (value) => {
    setVisibleCount(INITIAL_VISIBLE);
    setSortBy(value);
  };

  const handleAddToCart = (product) => {
    const chosenSize = selectedSizes[product.id];
    if (!chosenSize) {
      setFeedbackMessage(`Please select a size for ${product.name}`);
      return;
    }

    addToCart({
      id: `${product.id}-${chosenSize}`,
      parentId: product.id,
      name: `${product.name} (${chosenSize})`,
      brand: product.brand,
      image: product.images[0],
      price: formatCurrency(product.price),
      mrp: formatCurrency(product.mrp),
      category: product.category,
      size: chosenSize,
    });

    setFeedbackMessage(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (product) => {
    const added = toggleWishlist({
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: formatCurrency(product.price),
      brand: product.brand,
    });
    setFeedbackMessage(added ? 'Added to wishlist' : 'Removed from wishlist');
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_STEP);
    setTimeout(() => {
      window.scrollBy({ top: 180, behavior: 'smooth' });
    }, 80);
  };

  const pageTitle = normalizedRouteCategory ? `Men ${normalizedRouteCategory}` : 'Men Fashion';

  return (
    <section className="men-page">
      <div className="men-banner">
        <div className="container men-banner-content">
          <div>
            <p className="banner-breadcrumb">Men / Fashion</p>
            <h1>{pageTitle}</h1>
            <p className="banner-subtitle">Top Wear, Bottom Wear, Footwear, Accessories &amp; Ethnic Wear</p>
          </div>
          <span className="offer-badge">Up to 60% Off</span>
        </div>
      </div>

      <div className="container men-content-wrap">
        <FilterSidebar
          filters={filters}
          filterMeta={menFilterMeta}
          maxPrice={maxPrice}
          onToggleFilter={handleToggleFilter}
          onPriceChange={handlePriceChange}
          onClearAll={clearAllFilters}
          isMobileDrawerOpen={isMobileDrawerOpen}
          onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
        />

        <div className="men-main-content">
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
          ) : sortedProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No products matched your filters</h3>
              <p>Try clearing filters or selecting a different category.</p>
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
                    onQuickView={() => {}}
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
        </div>
      </div>

      {feedbackMessage && <div className="floating-feedback">{feedbackMessage}</div>}
    </section>
  );
};

export default MenPage;

