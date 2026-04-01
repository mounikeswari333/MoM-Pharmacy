import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import medicines from "../../data/medicines.json";
import brands from "../../data/brands.json";
import "./PremiumListing.css";

function PremiumListing() {
  const { type, slug } = useParams();
  const [searchText, setSearchText] = useState("");
  const medicineList = useMemo(
    () => (Array.isArray(medicines) ? medicines : medicines.products || []),
    [],
  );
  const healthNeeds = Array.isArray(medicines) ? [] : medicines.healthNeeds || [];
  const brandList = Array.isArray(brands) ? [] : brands.brands || [];

  const baseProducts = useMemo(() => {
    if (type === "health") {
      return medicineList.filter((item) => (item.category || "").toLowerCase() === (slug || "").toLowerCase());
    }

    if (type === "brand") {
      const selectedBrand = (slug || "").toLowerCase();
      return medicineList.filter((item) => (item.brand || "").toLowerCase() === selectedBrand);
    }

    return [];
  }, [medicineList, slug, type]);

  const filteredProducts = baseProducts.filter((item) => {
    const text = searchText.toLowerCase();
    return (
      item.name.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text) ||
      (item.brand || "").toLowerCase().includes(text)
    );
  });

  const pageTitle =
    type === "health"
      ? `${healthNeeds.find((item) => item.id === slug)?.name || "Health Need"} Products`
      : `${brandList.find((item) => item.id === slug)?.name || "Brand"} Products`;

  const healthMeta = healthNeeds.find((item) => item.id === slug);
  const brandMeta = brandList.find((item) => item.id === slug);
  const bannerImage =
    type === "health"
      ? healthMeta?.image || "https://via.placeholder.com/1200x260"
      : "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80";
  const isBrandPage = type === "brand";

  return (
    <div className="premium-listing-page">
      <div
        className="premium-listing-banner"
        style={{ backgroundImage: `linear-gradient(rgba(6, 36, 35, 0.62), rgba(6, 36, 35, 0.62)), url(${bannerImage})` }}
      >
        {isBrandPage && brandMeta?.logo && (
          <div className="premium-listing-brand-logo-wrap">
            <img
              src={brandMeta.logo}
              alt={brandMeta.name}
              className="premium-listing-brand-logo"
            />
          </div>
        )}
        <h2>{pageTitle}</h2>
        <p>
          {type === "health"
            ? `Products curated for ${healthMeta?.name || "your selected health need"}`
            : `Products from ${brandMeta?.name || "your selected brand"}`}
        </p>
      </div>

      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search in this page"
        className="premium-listing-search"
      />

      {filteredProducts.length === 0 && (
        <p className="premium-listing-empty">No products found for this selection.</p>
      )}

      <div className="premium-listing-grid">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default PremiumListing;
