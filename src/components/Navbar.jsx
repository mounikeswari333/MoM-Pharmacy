import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const { totalItems } = useCart();
  const categories = [
    "Nutritional Drinks",
    "Personal Care",
    "Ayurveda",
    "Health Devices",
    "Home Essentials",
  ];

  return (
    <header className="navbar-wrapper">
      <div className="top-navbar">
        <div className="brand-area">
          <img
            src="https://landing-page-images10.s3.ap-south-1.amazonaws.com/public/Home/appicon.png"
            alt="Mom Pharmacy"
            className="brand-logo"
          />
          <div>
            <h1 className="brand-title">Mom Pharmacy</h1>
            <p className="brand-tagline">Medicine on Minutes</p>
          </div>
        </div>
        <div className="top-right-nav">
          <div className="location-selector">
            📍 Delivery Address: Hyderabad
          </div>
          <NavLink to="/cart" className="cart-button cart-link">
            🛒 Cart <span className="cart-count">{totalItems}</span>
          </NavLink>
          <button className="login-button">Login</button>
        </div>
      </div>

      <nav className="menu-navbar">
        <NavLink to="/buy" className="menu-link">
          Buy Medicines
        </NavLink>
        <NavLink to="/doctors" className="menu-link">
          Find Doctors
        </NavLink>
        <button className="menu-link-btn">Lab Tests</button>
        <button className="menu-link-btn">Health Records</button>
        <NavLink to="/premium" className="menu-link premium-link">
          Premium Medicines
        </NavLink>
      </nav>

      <nav className="category-navbar">
        {categories.map((cat) => (
          <button key={cat} className="category-link">
            {cat}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
