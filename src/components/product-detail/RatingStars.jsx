import './RatingStars.css';

const RatingStars = ({ rating, reviewCount = null, size = 'md' }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  const stars = Array.from({ length: 5 }).map((_, idx) => {
    if (idx < full) return '★';
    if (idx === full && half) return '☆';
    return '✩';
  });

  return (
    <div className={`pdp-rating ${size}`}>
      <span className="pdp-stars" aria-hidden="true">{stars.join(' ')}</span>
      <span className="pdp-rating-value">{rating.toFixed(1)}</span>
      {typeof reviewCount === 'number' && <span className="pdp-review-count">({reviewCount} reviews)</span>}
    </div>
  );
};

export default RatingStars;

