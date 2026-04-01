import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../../components/Chatbot";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselItems = [
    {
      title: "Blood Pressure Monitor for Heart Health",
      buttonText: "Order Now",
      backgroundColor: "#e8f0f8",
      badgeColor: "#003366",
    },
    {
      title: "Vitamins and Minerals - For healthy life",
      buttonText: "Order Now",
      backgroundColor: "#fef5e8",
      badgeColor: "orange",
    },
    {
      title: "Cetaphil Gentle Skin Cleanser",
      buttonText: "At 18% OFF",
      backgroundColor: "#e8f5f0",
      badgeColor: "#0066cc",
    },
  ];

  const nextSlide = () => {
    setCarouselIndex((carouselIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCarouselIndex((carouselIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="home-page">
      <section className="home-search-section">
        <div className="hero-side hero-left">+</div>
        <div className="hero-side hero-right">+</div>
        <h2>Buy Medicines and Essentials</h2>
        <button 
          className="home-search-button" 
          onClick={() => navigate("/buy")}
        >
          <span className="search-icon">🔎</span> Search Medicines
        </button>
      </section>

      <section className="carousel-section">
        <button className="carousel-btn carousel-prev" onClick={prevSlide}>
          ‹
        </button>
        <div className="carousel-item" style={{ backgroundColor: carouselItems[carouselIndex].backgroundColor }}>
          <div className="carousel-content">
            <h2>{carouselItems[carouselIndex].title}</h2>
            <button className="carousel-order-btn">{carouselItems[carouselIndex].buttonText}</button>
          </div>
          <div className="carousel-image-placeholder">
            [{carouselItems[carouselIndex].title}]
          </div>
        </div>
        <button className="carousel-btn carousel-next" onClick={nextSlide}>
          ›
        </button>
      </section>

      <div className="carousel-dots">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === carouselIndex ? "active" : ""}`}
            onClick={() => setCarouselIndex(index)}
          />
        ))}
      </div>

      <section className="home-cta">
        <h3>Browse All Products</h3>
        <button onClick={() => navigate("/buy")} className="browse-btn">
          Go to Shop
        </button>
      </section>

      <Chatbot />
    </div>
  );
}

export default Home;
