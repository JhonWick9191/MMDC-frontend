import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import "./Components/Component.css";
import "./Pages/Page.css";
import LoadingScreen from "./Components/Loading";
import {useLocation}  from "react-router-dom";
import { useState ,useEffect } from "react";


// components 

import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer"

// importing pages 
import Login from "./Pages/Login";
import ProductDeatils from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";
import WishList from "./Pages/WishListPage";
import FilterProductByCategoryes from "./Pages/ProductCategory";
import AdminProfile from "./Pages/AdminProfile";

//importing UserProfile pages 
import Profile from "./Pages/UserPorfilePages/ProfilePage";
import VendorProfile from "./Pages/UserPorfilePages/ProfilePage";
import BuyProduct from "./Pages/UserPorfilePages/BuyProducts";

// toast container

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

   useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, [location.pathname])

  // for scroll to top function
  return (
    <>
    <div>

   <ScrollToTop />
    <NavBar/>
          <ToastContainer />
       {loading && <LoadingScreen/>}   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>  
        <Route path="/productDetails" element={<ProductDeatils/>} />
        <Route path="/cartDeatils" element={<CartPage/>} />
        <Route path="/wishlistProduct" element={<WishList/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/isadminProfile" element={<AdminProfile/>} />
        <Route path="/isVendorProfile" element={<VendorProfile/>}/> 
        <Route path="/yourProducts" element={<BuyProduct/>}  /> 
        <Route path="/products" element={<FilterProductByCategoryes/>} />
      </Routes>
      <Footer/>

        </div>

        <div>
      
        </div>


    
</>  );
}

export default App;
