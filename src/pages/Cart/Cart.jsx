import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cartItems, subtotal, removeFromCart, updateQuantity } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("online");

  const deliveryFee = subtotal >= 1250 ? 0 : subtotal >= 500 ? 49 : 99;
  const handlingFee = 9;
  const totalAmount = subtotal + deliveryFee + handlingFee;

  const deliveryTiers = [
    { amount: 250, save: 50, free: false },
    { amount: 500, save: 49, free: false },
    { amount: 1250, save: 100, free: true },
  ];

  const nextTier = deliveryTiers.find((tier) => subtotal < tier.amount);
  const amountNeeded = nextTier ? nextTier.amount - subtotal : 0;

  return (
    <div className="cart-page">
      {/* Delivery Tier Banner */}
      {cartItems.length > 0 && amountNeeded > 0 && (
        <div className="delivery-banner">
          <p className="banner-text">
            🚚 Add ₹<span className="amount-bold">{amountNeeded}</span> to save
            ₹<span className="save-bold">{nextTier.save}</span> on delivery
          </p>
          <div className="tier-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(subtotal / nextTier.amount) * 100}%` }}
              ></div>
            </div>
            <p className="progress-text">
              Shop for ₹{nextTier.amount}{" "}
              {nextTier.free ? "(FREE delivery)" : ""}
            </p>
          </div>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="cart-empty-container">
          <div className="empty-icon">🛒</div>
          <p className="cart-empty">Your cart is empty</p>
          <p className="empty-subtext">Add medicines to get started</p>
        </div>
      ) : (
        <div className="cart-container">
          {/* Products Section */}
          <div className="cart-products">
            <h2 className="section-title">Your Items ({cartItems.length})</h2>
            <div className="product-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-content">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-brand">Brand: {item.brand || "N/A"}</p>
                    <div className="item-footer">
                      <p className="item-price">₹{item.price}</p>
                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantityInCart - 1)
                          }
                        >
                          −
                        </button>
                        <span className="qty-value">{item.quantityInCart}</span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantityInCart + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove from cart"
                  >
                    DELETE
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-breakdown">
              <div className="summary-row">
                <span className="summary-label">Items Total (MRP)</span>
                <span className="summary-value">₹{subtotal}</span>
              </div>

              {subtotal > 0 && (
                <div className="summary-row discount-row">
                  <span className="summary-label discount-label">
                    Discount on MRP
                  </span>
                  <span className="summary-value discount-value">
                    −₹{Math.round(subtotal * 0.05)}
                  </span>
                </div>
              )}

              <div className="summary-row">
                <span className="summary-label">Delivery Fee</span>
                <span className="summary-value">
                  {deliveryFee === 0 ? (
                    <span className="free-delivery">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Handling & Packaging Fee</span>
                <span className="summary-value">₹{handlingFee}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span className="summary-label total-label">Total Payable</span>
                <span className="summary-value total-value">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="payment-section">
              <h4 className="payment-title">Payment Options</h4>

              <div className="payment-offer">
                <div className="offer-icon">🎁</div>
                <div className="offer-text">
                  <p className="offer-main">Add item worth ₹438.62 and get</p>
                  <p className="offer-highlight">Free Delivery</p>
                </div>
              </div>

              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={selectedPayment === "online"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <div className="option-content">
                    <span className="option-icon">💳</span>
                    <div className="option-text">
                      <p className="option-name">Online Payment</p>
                      <p className="option-price">
                        ₹{totalAmount}{" "}
                        <span className="price-strikethrough">
                          ₹{totalAmount + 3.4}
                        </span>
                      </p>
                    </div>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={selectedPayment === "cod"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  />
                  <div className="option-content">
                    <span className="option-icon">💰</span>
                    <div className="option-text">
                      <p className="option-name">Cash on Delivery (COD)</p>
                      <p className="option-note">No COD on orders below ₹99</p>
                    </div>
                  </div>
                </label>
              </div>

              {selectedPayment === "cod" && subtotal < 99 && (
                <p className="cod-warning">⚠️ No COD on orders below ₹99</p>
              )}
            </div>

            {/* Action Button */}
            <button className="add-address-btn">+ Add Address</button>
            <button className="continue-btn">Continue to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
