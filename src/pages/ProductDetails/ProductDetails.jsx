import { useMemo } from "react";
import { useParams } from "react-router-dom";
import medicines from "../../data/medicines.json";
import brands from "../../data/brands.json";
import { useCart } from "../../context/CartContext";
import "./ProductDetails.css";

const highlightsByCategory = {
  diabetes: [
    "Helps support blood sugar management",
    "Designed for daily nutrition support",
    "Suitable for long-term wellness routines",
  ],
  heart: [
    "Supports cardiovascular health",
    "Helps maintain daily vitality",
    "Complements a heart-friendly lifestyle",
  ],
  skin: [
    "Supports healthy skin maintenance",
    "Helps with antioxidant care",
    "Useful as part of a skin care routine",
  ],
  kidney: [
    "Supports kidney wellness goals",
    "Designed for nutritional balance",
    "Can be used in guided care plans",
  ],
  liver: [
    "Supports liver wellness goals",
    "Helps daily detox support routines",
    "Useful for long-term preventive care",
  ],
};

function getVariantData(product) {
  if (product.type === "powder") {
    return {
      label: "Flavour",
      options: ["Chocolate", "Vanilla"],
      selected: "Vanilla",
      packLabel: "Pack Size",
      packs: [
        { name: "200 gm Powder", price: Math.max(product.price - 120, 99), active: false },
        { name: "400 gm Powder", price: product.price, active: true },
      ],
    };
  }

  if (product.type === "tonic") {
    return {
      label: "Flavour",
      options: ["Classic", "Orange"],
      selected: "Classic",
      packLabel: "Bottle Size",
      packs: [
        { name: "200 ml Bottle", price: Math.max(product.price - 70, 99), active: false },
        { name: "400 ml Bottle", price: product.price, active: true },
      ],
    };
  }

  return {
    label: "Strength",
    options: ["Regular", "Advanced"],
    selected: "Advanced",
    packLabel: "Pack Size",
    packs: [
      { name: "Strip of 10", price: Math.max(product.price - 50, 49), active: false },
      { name: "Strip of 15", price: product.price, active: true },
    ],
  };
}

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const medicineList = useMemo(
    () => (Array.isArray(medicines) ? medicines : medicines.products || []),
    [],
  );
  const brandList = useMemo(() => (Array.isArray(brands) ? [] : brands.brands || []), []);

  const product = useMemo(
    () => medicineList.find((item) => String(item.id) === String(id)),
    [id, medicineList],
  );

  if (!product) {
    return (
      <section className="product-details-page">
        <div className="product-details-missing">
          <h2>Product not found</h2>
          <p>This product detail page is not available right now.</p>
        </div>
      </section>
    );
  }

  const brandName = brandList.find((item) => item.id === product.brand)?.name || product.brand;
  const rating = (4.2 + (Number(product.id) % 4) * 0.1).toFixed(1);
  const reviewCount = 120 + Number(product.id) * 3;
  const ratingCount = 180 + Number(product.id) * 2;
  const variantData = getVariantData(product);
  const highlights = highlightsByCategory[product.category] || [
    "Quality checked product",
    "Supports everyday wellness",
    "Recommended as per health need",
  ];

  return (
    <section className="product-details-page">
      <article className="product-details-card">
        <div className="product-details-left">
          <img src={product.image} alt={product.name} className="product-details-image" />
        </div>

        <div className="product-details-right">
          <h1>{product.name}</h1>
          <p className="product-details-brand">{brandName}</p>

          <div className="product-details-rating-row">
            <span className="rating-pill">{rating} ★</span>
            <span className="rating-text">{ratingCount} Ratings &amp; {reviewCount} Reviews</span>
          </div>

          <div className="variant-section">
            <h3>
              {variantData.label} ({variantData.options.length})
            </h3>
            <div className="variant-chips">
              {variantData.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={option === variantData.selected ? "variant-chip active" : "variant-chip"}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="variant-section">
            <h3>
              {variantData.packLabel} ({variantData.packs.length})
            </h3>
            <div className="pack-grid">
              {variantData.packs.map((pack) => (
                <button
                  key={pack.name}
                  type="button"
                  className={pack.active ? "pack-card active" : "pack-card"}
                >
                  <span>{pack.name}</span>
                  <strong>Rs{pack.price}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="product-highlights">
            <h3>Product highlights</h3>
            <ul>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="product-details-footer">
            <div className="details-price">Rs {product.price}</div>
            <button type="button" className="details-add-button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ProductDetails;
