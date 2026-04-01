import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Toast from "./components/Toast";
import { CartProvider } from "./context/CartContext";
import BuyMedicines from "./pages/BuyMedicines/BuyMedicines";
import Cart from "./pages/Cart/Cart";
import FindDoctors from "./pages/FindDoctors/FindDoctors";
import HealthRecords from "./pages/HealthRecords/HealthRecords";
import Home from "./pages/Home/Home";
import LabTests from "./pages/LabTests/LabTests";
import PremiumListing from "./pages/PremiumListing/PremiumListing";
import PremiumMedicines from "./pages/PremiumMedicines/PremiumMedicines";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<BuyMedicines />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/doctors" element={<FindDoctors />} />
            <Route path="/lab-tests" element={<LabTests />} />
            <Route path="/health-records" element={<HealthRecords />} />
            <Route path="/premium" element={<PremiumMedicines />} />
            <Route path="/premium/:type/:slug" element={<PremiumListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Chatbot />
        <Toast />
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
