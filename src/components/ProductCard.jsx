import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./ProductCard.css";
import { useCart } from "../context/CartContext";

function ProductCard({ item, onOpen }) {
  const navigate = useNavigate();
  const { addToCart, cartItems, updateQuantity } = useCart();
  const hasOriginalPrice =
    typeof item.originalPrice === "number" && item.originalPrice > item.price;
  const cartItem = cartItems.find((cartEntry) => cartEntry.id === item.id);
  const quantity = cartItem?.quantityInCart || 0;

  const openDetails = () => {
    if (onOpen) {
      onOpen(item);
    }
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
        {item.discount && (
          <span className="discount-badge">{item.discount} OFF</span>
        )}
      </div>

      {item.quantity && <p className="product-qty">Qty: {item.quantity}</p>}
      {quantity === 0 ? (
        <button
          className="add-button"
          onClick={(event) => {
            event.stopPropagation();
            addToCart(item);
          }}
        >
          ADD
        </button>
      ) : (
        <div
          className="product-qty-controls"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            className="add-button-icon"
            onClick={() => updateQuantity(item.id, quantity - 1)}
            aria-label="Decrease quantity"
          >
            <FaMinus />
          </button>
          <span className="add-button-value">{quantity}</span>
          <button
            className="add-button-icon"
            onClick={() => updateQuantity(item.id, quantity + 1)}
            aria-label="Increase quantity"
          >
            <FaPlus />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
