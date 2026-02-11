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
import AdminProfile from "./Pages/AminProfilePages/AdminProfile"
import SearchProducts from "./Pages/SearchProductPage";
import SearchProductDetails from "./Pages/SearchProductsDetails";
import ContactUs from "./Pages/ContactUs";
// User Profile Pages
import Profile from "./Pages/UserPorfilePages/ProfilePage";
import VendorProfile from "./Pages/UserPorfilePages/ProfilePage";

import { useDispatch } from "react-redux";
import { setUser } from "./Redux/Slice/AuthSlice";

import { useSelector } from "react-redux";

// Toast
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;
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
  const User = useSelector((state) => state.auth.user);

  const dispatch = useDispatch()
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { isSearching, searchResults } = useSearch(); // ✅ Get data from context

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // 

  // ✅ Replace your existing useEffect with this ONLY
  const [meDebug, setMeDebug] = useState(null);



  useEffect(() => {
    let cancelled = false;

    async function fetchMe() {
      try {
        const res = await fetch(`${BASE_URL}/me`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (cancelled) return;

        setMeDebug(data);

        if (data.success && data.user) {
          dispatch(setUser(data.user));  // reload ke baad yahi Redux fill karega
        }
      } catch (error) {
        if (cancelled) return;
        setMeDebug({ success: false, error: String(error) });
      }
    }

    fetchMe();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);







  return (
    <>
      <div>

        <ScrollToTop />
        <NavBar />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
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
              <Route path="/ContactUs" element={<ContactUs />} />

            </Routes>
          </>
        )}

        <Footer />
      </div>

    </>
  );
}

export default App;
