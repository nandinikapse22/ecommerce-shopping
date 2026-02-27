import './SizeSelector.css';

const SizeSelector = ({ sizes, selectedSize, onSelect, error }) => {
  return (
    <div className="pdp-size-block">
      <div className="pdp-label-row">
        <p>Select Size</p>
        {error && <span className="pdp-error">{error}</span>}
      </div>

      <div className="pdp-size-list">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            className={`pdp-size-btn ${selectedSize === size ? 'selected' : ''}`}
            onClick={() => onSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;

