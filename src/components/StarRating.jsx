export default function StarRating({ rating, reviews }) {
  const full = Math.round(rating);
  return (
    <span className="star-rating" title={`${rating} out of 5`}>
      <span aria-hidden="true" className="stars">
        {"★".repeat(full)}
        <span className="stars-empty">{"★".repeat(5 - full)}</span>
      </span>
      <span className="visually-hidden">{rating} out of 5 stars</span>{" "}
      <strong>{rating}</strong>
      {reviews !== undefined && <span className="text-muted"> ({reviews} reviews)</span>}
    </span>
  );
}
