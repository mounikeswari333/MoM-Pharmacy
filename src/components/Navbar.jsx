import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const [searchText, setSearchText] = useState("");

  const categories = [
    "Nutrition Drinks",
    "Personal Care",
    "Ayurveda",
    "Healthcare Devices",
    "Home Essentials",
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchText(params.get("q") || "");
  }, [location.search]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchText.trim();
    navigate(query ? `/buy?q=${encodeURIComponent(query)}` : "/buy");
  };

  return (
    <header className="navbar-wrapper">
      <div className="top-navbar">
        <div className="brand-area">
          <NavLink to="/" className="brand-link" aria-label="Go to home page">
            <img
              src="https://landing-page-images10.s3.ap-south-1.amazonaws.com/public/Home/appicon.png"
              alt="Mom Pharmacy"
              className="brand-logo"
            />
            <div>
              <h1 className="brand-title">Mom Pharmacy</h1>
              <p className="brand-tagline">Medicine on Minutes</p>
            </div>
          </NavLink>
        </div>

        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            placeholder="Search products by name"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </form>

        <div className="top-right-nav">
          <div className="location-selector">Delivery Address: Hyderabad</div>
          <NavLink to="/cart" className="cart-button cart-link">
            🛒 Cart <span className="cart-count">{totalItems}</span>
          </NavLink>
        </div>
      </div>

      <nav className="menu-navbar">
        <NavLink to="/buy" className="menu-link">
          Buy Medicines
        </NavLink>
        <NavLink to="/doctors" className="menu-link">
          Find Doctors
        </NavLink>
        <NavLink to="/lab-tests" className="menu-link">
          Lab Tests
        </NavLink>
        <NavLink to="/health-records" className="menu-link">
          Health Records
        </NavLink>
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
