import './FilterSidebar.css';

const colorLabelMap = {
  black: 'Black',
  white: 'White',
  red: 'Red',
  blue: 'Blue',
  green: 'Green',
  pink: 'Pink',
  purple: 'Purple',
  yellow: 'Yellow',
  orange: 'Orange',
  maroon: 'Maroon',
  beige: 'Beige',
  brown: 'Brown',
  gold: 'Gold',
};

const FilterSidebar = ({
  filters,
  filterMeta,
  maxPrice,
  onToggleFilter,
  onPriceChange,
  onClearAll,
  isMobileDrawerOpen,
  onCloseMobileDrawer,
}) => {
  return (
    <>
      <aside className="filter-sidebar desktop-only" aria-label="Filters">
        <div className="filter-header-row">
          <h2>Filters</h2>
          <button type="button" className="clear-all-btn" onClick={onClearAll}>
            Clear All
          </button>
        </div>

        <div className="filter-group">
          <h3>Category</h3>
          {filterMeta.categories.map((item) => (
            <label key={item} className="filter-option">
              <input
                type="checkbox"
                checked={filters.categories.includes(item)}
                onChange={() => onToggleFilter('categories', item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h3>Price Range</h3>
          <input
            type="range"
            min="500"
            max={maxPrice}
            value={filters.maxPrice}
            onChange={(event) => onPriceChange(Number(event.target.value))}
            className="price-slider"
          />
          <p className="price-value">Up to ₹{filters.maxPrice.toLocaleString('en-IN')}</p>
        </div>

        <div className="filter-group">
          <h3>Size</h3>
          <div className="chip-wrap">
            {filterMeta.sizes.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-chip ${filters.sizes.includes(item) ? 'active' : ''}`}
                onClick={() => onToggleFilter('sizes', item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3>Color</h3>
          <div className="color-grid">
            {filterMeta.colors.map((item) => (
              <button
                key={item}
                type="button"
                className={`color-dot ${filters.colors.includes(item) ? 'active' : ''}`}
                onClick={() => onToggleFilter('colors', item)}
                aria-label={colorLabelMap[item] || item}
                title={colorLabelMap[item] || item}
                data-color={item}
              />
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3>Fabric</h3>
          {filterMeta.fabrics.map((item) => (
            <label key={item} className="filter-option">
              <input
                type="checkbox"
                checked={filters.fabrics.includes(item)}
                onChange={() => onToggleFilter('fabrics', item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h3>Occasion</h3>
          {filterMeta.occasions.map((item) => (
            <label key={item} className="filter-option">
              <input
                type="checkbox"
                checked={filters.occasions.includes(item)}
                onChange={() => onToggleFilter('occasions', item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h3>Discount</h3>
          {filterMeta.discounts.map((item) => (
            <label key={item} className="filter-option">
              <input
                type="checkbox"
                checked={filters.discounts.includes(item)}
                onChange={() => onToggleFilter('discounts', item)}
              />
              <span>{item}% and above</span>
            </label>
          ))}
        </div>
      </aside>

      <div className={`mobile-filter-drawer ${isMobileDrawerOpen ? 'open' : ''}`}>
        <div className="mobile-filter-overlay" onClick={onCloseMobileDrawer} role="button" tabIndex={0} />
        <aside className="mobile-filter-panel" aria-label="Mobile Filters">
          <div className="filter-header-row">
            <h2>Filters</h2>
            <button type="button" className="close-mobile-filter" onClick={onCloseMobileDrawer}>
              ✕
            </button>
          </div>
          <div className="mobile-filter-scroll">
            <div className="filter-group">
              <h3>Category</h3>
              {filterMeta.categories.map((item) => (
                <label key={item} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(item)}
                    onChange={() => onToggleFilter('categories', item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h3>Price Range</h3>
              <input
                type="range"
                min="500"
                max={maxPrice}
                value={filters.maxPrice}
                onChange={(event) => onPriceChange(Number(event.target.value))}
                className="price-slider"
              />
              <p className="price-value">Up to ₹{filters.maxPrice.toLocaleString('en-IN')}</p>
            </div>

            <div className="filter-group">
              <h3>Size</h3>
              <div className="chip-wrap">
                {filterMeta.sizes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`filter-chip ${filters.sizes.includes(item) ? 'active' : ''}`}
                    onClick={() => onToggleFilter('sizes', item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Color</h3>
              <div className="color-grid">
                {filterMeta.colors.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`color-dot ${filters.colors.includes(item) ? 'active' : ''}`}
                    onClick={() => onToggleFilter('colors', item)}
                    aria-label={colorLabelMap[item] || item}
                    data-color={item}
                  />
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Fabric</h3>
              {filterMeta.fabrics.map((item) => (
                <label key={item} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.fabrics.includes(item)}
                    onChange={() => onToggleFilter('fabrics', item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h3>Occasion</h3>
              {filterMeta.occasions.map((item) => (
                <label key={item} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.occasions.includes(item)}
                    onChange={() => onToggleFilter('occasions', item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h3>Discount</h3>
              {filterMeta.discounts.map((item) => (
                <label key={item} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.discounts.includes(item)}
                    onChange={() => onToggleFilter('discounts', item)}
                  />
                  <span>{item}% and above</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mobile-filter-actions">
            <button type="button" className="clear-all-btn" onClick={onClearAll}>
              Clear All
            </button>
            <button type="button" className="apply-filter-btn" onClick={onCloseMobileDrawer}>
              Apply Filters
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default FilterSidebar;

