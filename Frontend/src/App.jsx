import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import "./Components/Component.css";
import "./Pages/Page.css";
import LoadingScreen from "./Components/Loading";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import TurstedByBrands from "./Components/TurstedByBrsnds";

// Pages
import Login from "./Pages/Login";
import ProductDeatils from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";
import WishList from "./Pages/WishListPage";
import FilterProductByCategoryes from "./Pages/ProductCategory";
import AdminProfile from "../src/Pages/AminProfilePages/AdminProfile"
import SearchProducts from "./Pages/SearchProductPage";
import SearchProductDetails from "./Pages/SearchProductsDetails";

// User Profile Pages
import Profile from "./Pages/UserPorfilePages/ProfilePage";
import VendorProfile from "./Pages/UserPorfilePages/ProfilePage";


// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Import Context
import { useSearch } from "./Context/SearchContaxt"

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { isSearching, searchResults } = useSearch(); // ✅ Get data from context

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <div>
        <ScrollToTop />
        <NavBar />
        <ToastContainer />
        {loading && <LoadingScreen />}

        {/* ✅ When searching, show only Search results */}
        {isSearching ? (
          <SearchProducts products={searchResults} />
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="SearchproductDetails" element={<SearchProductDetails />} />
              <Route path="/productDetails" element={<ProductDeatils />} />
              <Route path="/cartDeatils" element={<CartPage />} />
              <Route path="/wishlistProduct" element={<WishList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/isadminProfile" element={<AdminProfile />} />
              <Route path="/isVendorProfile" element={<VendorProfile />} />        
              <Route path="/products" element={<FilterProductByCategoryes />} />
              <Route path="/searchProducts" element={<SearchProducts />} />
            </Routes>
          </>
        )}
        <TurstedByBrands />
        <Footer />
      </div>
       
    </>
  );
}

export default App;
