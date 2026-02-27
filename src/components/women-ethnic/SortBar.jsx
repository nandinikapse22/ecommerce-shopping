import './SortBar.css';

const SortBar = ({ sortBy, onSortChange, resultCount, onOpenMobileFilters }) => {
  return (
    <div className="sort-bar-wrap">
      <div className="sort-result-count">{resultCount} styles found</div>

      <div className="sort-controls">
        <button type="button" className="mobile-filter-trigger" onClick={onOpenMobileFilters}>
          Filters
        </button>

        <label htmlFor="sort-select" className="sort-label">
          Sort by:
        </label>
        <select
          id="sort-select"
          className="sort-select"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="newest">Newest</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
        </select>
      </div>
    </div>
  );
};

export default SortBar;

