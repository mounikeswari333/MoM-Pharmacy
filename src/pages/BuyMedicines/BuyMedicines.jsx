import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import medicines from "../../data/medicines.json";
import "./BuyMedicines.css";

function BuyMedicines() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const medicineList = Array.isArray(medicines) ? medicines : medicines.products || [];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, [searchText]);

  const filteredMedicines = medicineList.filter((item) => {
    const text = searchText.toLowerCase();
    return (
      item.name.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text)
    );
  });

  return (
    <div className="buy-page">
      <section className="quick-cards">
        <div className="quick-card card-one">
          <h3>Get 20% off on Medicines</h3>
          <p>UPLOAD NOW</p>
        </div>
        <div className="quick-card card-two">
          <h3>Doctor Appointment</h3>
          <p>BOOK NOW</p>
        </div>
        <div className="quick-card card-three">
          <h3>Health Insurance</h3>
          <p>EXPLORE PLANS</p>
        </div>
        <div className="quick-card card-four">
          <h3>Lab Tests</h3>
          <p>AT HOME</p>
        </div>
      </section>

      <section className="offers-section">
        <div className="promo-banner promo-card">
          <div className="promo-content">
            <h3>Save Up to 25% on Your Medicine Spends</h3>
            <p>with Mom Pharmacy Membership</p>
          </div>
        </div>
        <div className="offer-banner offer-card">
          <h4>Fastest Delivery</h4>
          <p>In 10 Minutes</p>
        </div>
      </section>

      <h2>Search & Browse Medicines</h2>
      <input
        type="text"
        placeholder="Search medicines by name or category"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="buy-search"
      />

      {loading && <p className="loading">Loading medicines...</p>}

      {!loading && filteredMedicines.length === 0 && (
        <p className="no-results">No results found</p>
      )}

      <div className="buy-grid">
        {!loading &&
          filteredMedicines.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
      </div>

      <section className="middle-banner">
        <div className="banner-box banner-one">
          <h3>Premium Health Products</h3>
          <p>Curated collection for you</p>
          <button onClick={() => navigate("/premium")}>Shop Now</button>
        </div>
        <div className="banner-box banner-two">
          <h3>Expert Health Advice</h3>
          <p>Talk to our doctors anytime</p>
          <button onClick={() => navigate("/doctors")}>Consult Now</button>
        </div>
      </section>

      {/* <section className="consult-banner">
        <div>
          <h3>Talk to a Doctor for an Instant advice</h3>
          <p>Get 5% Off | Use Code CC50</p>
          <button onClick={() => navigate("/doctors")}>Consult Now</button>
        </div>
      </section> */}
    </div>
  );
}

export default BuyMedicines;
