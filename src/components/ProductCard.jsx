import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { useCart } from "../context/CartContext";

function ProductCard({ item }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const hasOriginalPrice =
    typeof item.originalPrice === "number" && item.originalPrice > item.price;

  const openDetails = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <div
      className="product-card"
      onClick={openDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDetails();
        }
      }}
    >
      <img src={item.image} alt={item.name} className="product-image" />
      <h4>{item.name}</h4>
      <p className="product-meta">
        {item.category} • {item.brand}
      </p>

      <div className="price-row">
        <p className="product-price">Rs. {item.price}</p>
        {hasOriginalPrice && (
          <p className="original-price">Rs. {item.originalPrice}</p>
        )}
        {item.discount && <span className="discount-badge">{item.discount} OFF</span>}
      </div>

      {item.quantity && <p className="product-qty">Qty: {item.quantity}</p>}
      <button
        className="add-button"
        onClick={(event) => {
          event.stopPropagation();
          addToCart(item);
        }}
      >
        ADD
      </button>
    </div>
  );
}

export default ProductCard;
