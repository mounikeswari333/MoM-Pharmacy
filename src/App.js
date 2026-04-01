import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import BuyMedicines from "./pages/BuyMedicines/BuyMedicines";
import Cart from "./pages/Cart/Cart";
import FindDoctors from "./pages/FindDoctors/FindDoctors";
import Home from "./pages/Home/Home";
import PremiumListing from "./pages/PremiumListing/PremiumListing";
import PremiumMedicines from "./pages/PremiumMedicines/PremiumMedicines";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<BuyMedicines />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/doctors" element={<FindDoctors />} />
            <Route path="/premium" element={<PremiumMedicines />} />
            <Route path="/premium/:type/:slug" element={<PremiumListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
