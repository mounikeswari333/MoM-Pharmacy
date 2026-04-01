import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import medicines from "../../data/medicines.json";
import brands from "../../data/brands.json";
import "./PremiumMedicines.css";

function PremiumMedicines() {
  const navigate = useNavigate();
  const medicineList = Array.isArray(medicines) ? medicines : medicines.products || [];
  const healthNeeds = Array.isArray(medicines) ? [] : medicines.healthNeeds || [];
  const brandLogos = Array.isArray(brands) ? [] : brands.brands || [];

  const slides = [
    {
      id: 1,
      title: "Save Up to 25% on Your Medicine Spends",
      subtitle: "with Mom Select Card",
      buttonText: "Apply Now",
    },
    {
      id: 2,
      title: "Premium Wellness Week",
      subtitle: "Extra care at better prices",
      buttonText: "Explore",
    },
    {
      id: 3,
      title: "Fastest Delivery in Minutes",
      subtitle: "Trusted premium brands only",
      buttonText: "Shop Now",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = medicineList.slice(0, 6);

  const skinCareProducts = medicineList
    .filter((item) => (item.category || "").toLowerCase() === "skin")
    .slice(0, 5);

  const goPrev = () => {
    const nextIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(nextIndex);
  };

  const goNext = () => {
    const nextIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(nextIndex);
  };

  return (
    <div className="premium-page">
      <section className="premium-slider">
        <button className="slide-nav" onClick={goPrev}>◀</button>
        <div className="slide-content">
          <h2>{slides[currentSlide].title}</h2>
          <p>{slides[currentSlide].subtitle}</p>
          <button className="slide-cta">{slides[currentSlide].buttonText}</button>
        </div>
        <button className="slide-nav" onClick={goNext}>▶</button>
      </section>

      <section>
        <h3>Shop By Health Needs</h3>
        <div className="health-needs-row">
          {healthNeeds.map((need) => (
            <div
              key={need.id}
              onClick={() => navigate(`/premium/health/${need.id}`)}
              className="need-card"
            >
              <img src={need.image || "https://via.placeholder.com/220"} alt={need.name} />
              <p>{need.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Premium Brands</h3>
        <div className="brand-logo-row">
          {brandLogos.map((brand) => (
            <button
              key={brand.id}
              className="brand-logo-card"
              onClick={() => navigate(`/premium/brand/${brand.id}`)}
            >
              <img src={brand.logo} alt={brand.name} />
              <p>{brand.name}</p>
            </button>
          ))}
        </div>
      </section>

      {loading && <p className="loading">Loading premium products...</p>}
      {!loading && filteredProducts.length === 0 && (
        <p className="no-results">No results found</p>
      )}

      <section className="premium-section-box">
        <h3>Premium Picks</h3>
        <div className="premium-grid">
          {!loading && filteredProducts.map((item) => <ProductCard key={item.id} item={item} />)}
        </div>
      </section>

      <section className="premium-section-box">
        <h3>Most Popular Skin Care</h3>
        {!loading && (
          <div className="premium-grid">
            {skinCareProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default PremiumMedicines;
