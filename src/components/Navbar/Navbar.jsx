import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { womenEthnicData } from '../../data/womenEthnicData';
import { womenWesternData } from '../../data/womenWesternData';
import { womenAccessoriesData } from '../../data/womenAccessoriesData';
import { womenBeautyData } from '../../data/womenBeautyData';
import { menData } from '../../data/menData';
import MegaMenu from './MegaMenu';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { getCartCount, getWishlistCount } = useCart();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState('Women');
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const allProducts = useMemo(
    () => [...womenEthnicData, ...womenWesternData, ...womenAccessoriesData, ...womenBeautyData, ...menData],
    []
  );

  const searchResults = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];

    return allProducts
      .filter((item) => {
        return (
          item.name.toLowerCase().includes(term)
          || item.brand.toLowerCase().includes(term)
          || item.category.toLowerCase().includes(term)
        );
      })
      .slice(0, 6);
  }, [allProducts, query]);

  // Categories that have mega menus
  const megaMenuCategories = ['Women', 'Men', 'Cosmetics', 'Accessories'];

  const handleMouseEnter = (category) => {
    if (megaMenuCategories.includes(category)) {
      setActiveMenu(category);
    }
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!searchResults.length) return;

    navigate(`/product/${searchResults[0].id}`);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (id) => {
    navigate(`/product/${id}`);
    setQuery('');
    setShowSuggestions(false);
  };

  const toggleMobileCategory = (category) => {
    setMobileExpandedCategory((prev) => (prev === category ? '' : category));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">LUXE<span>FASHION</span></Link>
        </div>

        {/* Navigation Menu */}
        <ul className="navbar-menu">
          <li className="navbar-menu-item">
            <Link to="/" className="active">Home</Link>
          </li>
          <li 
            className="navbar-menu-item has-mega-menu"
            onMouseEnter={() => handleMouseEnter('Women')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/women/ethnic-wear">Women</Link>
          </li>
          <li 
            className="navbar-menu-item has-mega-menu"
            onMouseEnter={() => handleMouseEnter('Men')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/men">Men</Link>
          </li>
          <li 
            className="navbar-menu-item has-mega-menu"
            onMouseEnter={() => handleMouseEnter('Cosmetics')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/cosmetics">Cosmetics</Link>
          </li>
          <li 
            className="navbar-menu-item has-mega-menu"
            onMouseEnter={() => handleMouseEnter('Accessories')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/accessories">Accessories</Link>
          </li>
        </ul>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="search-input"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 150);
            }}
          />
          <button className="search-btn" type="submit" aria-label="Search">
            <i className="fas fa-search"></i>
          </button>

          {showSuggestions && query.trim() && (
            <div className="search-suggestions">
              {searchResults.length ? (
                searchResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(item.id)}
                  >
                    <img src={item.images[0]} alt={item.name} />
                    <span>{item.name}</span>
                  </button>
                ))
              ) : (
                <p className="no-suggestions">No products found</p>
              )}
            </div>
          )}
        </form>

        {/* Icons */}
        <div className="navbar-icons">
          <Link to="/profile" className="icon-link">
            <i className="fas fa-user"></i>
            <span className="icon-label">Profile</span>
          </Link>
          <Link to="/wishlist" className="icon-link">
            <i className="fas fa-heart"></i>
            <span className="wishlist-count">{getWishlistCount()}</span>
            <span className="icon-label">Wishlist</span>
          </Link>
          <Link to="/cart" className="icon-link">
            <i className="fas fa-shopping-bag"></i>
            <span className="cart-count">{getCartCount()}</span>
            <span className="icon-label">Cart</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-btn"
          type="button"
          aria-label="Toggle mobile navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mega Menu - Rendered outside container for full width */}
      {megaMenuCategories.map((category) => (
        <div 
          key={category}
          className="mega-menu-wrapper"
          onMouseEnter={() => handleMouseEnter(category)}
          onMouseLeave={handleMouseLeave}
        >
          <MegaMenu 
            category={category} 
            isActive={activeMenu === category} 
          />
        </div>
      ))}

      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        role="button"
        tabIndex={0}
      />

      <aside className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-label="Mobile menu">
        <div className="mobile-nav-header">
          <strong>Menu</strong>
          <button type="button" className="mobile-nav-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
        </div>

        <ul className="mobile-main-links">
          <li>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          </li>

          {megaMenuCategories.map((category) => (
            <li key={`mobile-${category}`} className="mobile-category-item">
              <button
                type="button"
                className="mobile-category-toggle"
                onClick={() => toggleMobileCategory(category)}
              >
                <span>{category}</span>
                <span>{mobileExpandedCategory === category ? '−' : '+'}</span>
              </button>

              {mobileExpandedCategory === category && (
                <div className="mobile-inline-mega" onClick={() => setMobileMenuOpen(false)}>
                  <MegaMenu category={category} isActive />
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </nav>
  );
}

export default Navbar;
