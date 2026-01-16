import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove } from "../Redux/Slice/Slice";
import { addToWishlist } from "../Redux/Slice/WishListSlice";
import LoadingScreen from "../Components/Loading";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
// css is in page.css
export default function ProductDetails() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  console.log(token)
  const Cart = useSelector((state) => state.Cart || []);

  const initialProduct = location.state || null;
  const [productDetails, setProductDetails] = useState(initialProduct);
  const [count, setCount] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  // NEW: fromUrl (filter page ka URL)
  const fromUrl = location.state?.from || "/FilterProductByCategoryes?type=guitar";

  // taking the user for login 

  // ✅ ProductDetails.jsx me ye useEffect add karo (line 20 ke baad)
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  useEffect(() => {
    // Agar token nahi hai to /me call karo
    if (!token && !user) {
      async function fetchCurrentUser() {
        try {
          const res = await fetch(`${BASE_URL}/me`, {
            method: "GET",
            credentials: "include",
          });
          const data = await res.json();
          if (data.success && data.user) {
            dispatch(setUser(data.user));
          }
        } catch (error) {
          console.log("No user session in ProductDetails");
        }
      }
      fetchCurrentUser();
    }
  }, []); // Empty dependency - sirf component mount pe

  // 🔹 Fetch product details if not present
  useEffect(() => {
    if (!productDetails && productId) {
      fetchProductById(productId);
    }
  }, [productId, productDetails]);

  async function fetchProductById(id) {
    try {
      const res = await fetch(`https://api.musicandmore.co.in/api/v1/product/${id}`);
      const data = await res.json();
      if (data.success) {
        setProductDetails(data.product);
      } else {
        toast.error("Product not found");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to fetch product details");
      console.error(error);
      navigate("/");
    }
  }

  // 🔹 Fix: update details when location.state changes (click from recommendations)
  useEffect(() => {
    if (location.state) {
      setProductDetails(location.state);
      const imgs = [
        location.state.image_01,
        location.state.image_02,
        location.state.image_03,
        location.state.image_04,
        location.state.image_05,
      ].filter(
        (img) =>
          img &&
          img.toLowerCase() !== "none" &&
          (img.startsWith("http://") || img.startsWith("https://"))
      );
      setMainImage(imgs[0]);
      setCount(1);
    }
  }, [location.state]);

  // 🔹 Fetch recommendations when product changes
  useEffect(() => {
    if (productDetails?.Product_Category) {
      fetchRecommendations(productDetails.Product_Category);
    }
  }, [productDetails]);

  async function fetchRecommendations(category) {
    setLoadingRecommendations(true);
    try {
      const res = await fetch(
        `https://api.musicandmore.co.in/api/v1/alsoView?category=${encodeURIComponent(category)}`
      );
      const data = await res.json();
      // 🔹 Added artificial delay of 4 seconds
      setTimeout(() => {
        if (data.success) {
          setRecommendations(data.message.slice(0, 10));
        } else {
          setRecommendations([]);
        }
        setLoadingRecommendations(false);
      }, 1000);
    } catch (error) {
      console.error("Failed fetching recommendations", error);
      setTimeout(() => {
        setRecommendations([]);
        setLoadingRecommendations(false);
      }, 4000);
    }
  }

  if (!productDetails) return <p>Loading product details...</p>;

  // 🔹 Prepare images
  const images = [
    productDetails.image_01,
    productDetails.image_02,
    productDetails.image_03,
    productDetails.image_04,
    productDetails.image_05,
  ].filter(
    (img) =>
      img && img.toLowerCase() !== "none" && (img.startsWith("http://") || img.startsWith("https://"))
  );

  const [mainImage, setMainImage] = useState(images[0]);

  const isOutOfStock = productDetails.Product_Quantity === 0;
  const isLimitExceeded = count > productDetails.Product_Quantity;
  const disableIncrement = isOutOfStock || isLimitExceeded;

  const limitToastShown = useRef(false);
  const outOfStockToastShown = useRef(false);

  useEffect(() => {
    if (isLimitExceeded && !limitToastShown.current) {
      toast.error(
        `Opp's! Product limit has been reached. You can only order up to ${productDetails.Product_Quantity} products.`
      );
      limitToastShown.current = true;
    }
    if (!isLimitExceeded) limitToastShown.current = false;
  }, [isLimitExceeded, productDetails.Product_Quantity]);

  useEffect(() => {
    if (isOutOfStock && !outOfStockToastShown.current) {
      toast.error("Sorry, this product is currently out of stock.");
      outOfStockToastShown.current = true;
    }
    if (!isOutOfStock) outOfStockToastShown.current = false;
  }, [isOutOfStock]);

  function decrement() {
    if (count > 1) setCount(count - 1);
  }

  function increment() {
    if (!disableIncrement) setCount(count + 1);
  }


  // ✅ STATE (top of component)
  const [isAdding, setIsAdding] = useState(false);

  // ✅ BUTTON
  <div className="cart-btn">
    <button
      onClick={addToCart}
      disabled={isAdding || isOutOfStock || isLimitExceeded}
      style={{
        backgroundColor: isAdding || isOutOfStock || isLimitExceeded ? "#ccc" : undefined,
        cursor: isAdding || isOutOfStock || isLimitExceeded ? "not-allowed" : "pointer",
      }}
    >
      {isAdding ? "Adding..." : "Add to Cart"}
    </button>
  </div>

  // ✅ FUNCTION
  function addToCart() {
    setIsAdding(true);

    setTimeout(() => {
      if (isOutOfStock || isLimitExceeded) {
        toast.error("Out of stock!");
        setIsAdding(false);
        return;
      }

      if (!user) {
        toast.error("Please login first");
        setIsAdding(false);
        return;
      }

      dispatch(add({ ...productDetails, cartImage: mainImage, quantity: count }));
      toast.success("✅ Added to Cart!");
      setIsAdding(false);
    }, 1000);
  }


  function removeToCart() {
    dispatch(remove(productDetails._id));
    toast.success("Deleted");
  }

  return (
    <div className="padding">
      <div className="black-border">
        <marquee>
          Prices are subject to change without prior notice. Please confirm pricing with your designated Sales Manager before placing orders.
        </marquee>
      </div>


      <div className="path">


        <p>HOME / {productDetails.Product_Name?.toUpperCase()}</p>
        <hr />
      </div>

      <div className="product-deatils-main-section">
        <div className="left-section-our-products-section">
          <div className="main-images-products">
            <img src={mainImage} alt="Selected product" loading="lazy" />
          </div>
          <div className="product-image-mid">
            {images.map((img, idx) => (
              <div
                className="mid-image"
                key={idx}
                onClick={() => setMainImage(img)}
                style={{ cursor: "pointer" }}
              >
                <img src={img} alt={`Product ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="right-product-section">
          <div className="product-details-contsnt">
            <p className="product-name">{productDetails.Product_Name}</p>
            <p className="product-brand">{productDetails.Brand_Name}</p>
            <p className="model-number">{productDetails.Model_number}</p>
             <p className="model-number">{productDetails.Product_Category}</p>
          </div>
          <hr />
          <div className="price">
            <p>
               MRP <FaIndianRupeeSign /> {(productDetails.Product_price * count).toLocaleString("en-IN")}
            </p>
            <p>Price incl. of all Taxes</p>
          </div>
          <hr />
          <div className="quantity">
            <div className="wrapper-main-counter">
              <div className="main-quantity">
                <p>Quantity</p>
              </div>
              <div className="decrement-button">
                <button onClick={decrement} disabled={count <= 1 || isOutOfStock}>
                  < FiMinusCircle />
                </button>
              </div>
              <div className="value">
                <p>{count}</p>
              </div>
              <div className="increment-button">
                <button onClick={increment} disabled={disableIncrement}>
                  <FiPlusCircle />
                </button>
              </div>
            </div>
          </div>

          {isOutOfStock && (
            <p style={{ color: "red", fontWeight: 600, margin: "1rem 0" }}>
              Sorry, this product is currently out of stock will be restored soon .
            </p>
          )}

          {!isOutOfStock && isLimitExceeded && (
            <p style={{ color: "red", fontWeight: 600, margin: "1rem 0" }}>
              Opp's! Product limit has been reached. You can only order up to{" "}
              {productDetails.Product_Quantity} products.
            </p>
          )}
          <hr />

          <div className="carts-buttons">
            <div className="cart-btn">
              <button
                onClick={addToCart}
                disabled={isAdding || isOutOfStock || isLimitExceeded}
                style={{
                  backgroundColor: isAdding || isOutOfStock || isLimitExceeded ? "#ccc" : undefined,
                  cursor: isAdding || isOutOfStock || isLimitExceeded ? "not-allowed" : "pointer",
                }}
              >
                {isAdding ? (<div className="loading-on-add-to-cart">
                 <p>Loading ... </p>
                </div>) : "Add to Cart"}
              </button>
            </div>

            <div className="cart-btn">
              <button
                onClick={() => {
                  dispatch(addToWishlist(productDetails));
                  toast.success(`${productDetails.Product_Name} is added to the WishList`);
                }}
              >
                <FaHeart /> Wishlist
              </button>
            </div>
          </div>
          <hr className="none" />
          <div className="cart-discripction">
            <h1 className="product-name">Description</h1>
            <p>{productDetails.Product_Discripction}</p>
          </div>
        </div>

        <div className="carts-buttons sticky">
          <div className="cart-btn">
            {Cart.some((product) => product.id === productDetails._id) ? (
              <button onClick={removeToCart}>Remove from Cart</button>
            ) : (
              <button
                onClick={addToCart}
                disabled={isOutOfStock || isLimitExceeded}
                style={{
                  backgroundColor: isOutOfStock || isLimitExceeded ? "#ccc" : undefined,
                  cursor: isOutOfStock || isLimitExceeded ? "not-allowed" : "pointer",
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
          <div className="cart-btn">
            <button
              onClick={() => {
                dispatch(addToWishlist(productDetails));
                toast.success(`${productDetails.Product_Name} is added to the WishList`);
              }}
            >
              <FaHeart /> Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Recommended Products Section */}
      <div className="recommendations-section" style={{ marginTop: "2rem" }}>
        <div className="line-with-text">
          <div className="left-line">
            <hr></hr>
          </div>

          <div className="text-heading">
            <h2 className="main-heading-recom">Recommended Products</h2>
          </div>

          <div className="right-line">
            <hr></hr>
          </div>
        </div>

        {loadingRecommendations ? (
          <LoadingScreen />
        ) : recommendations.length === 0 ? (
          <p>No recommendations found.</p>
        ) : (
          <div className="main-category-products_2">
            {recommendations.map((item) => (
              <div
                key={item._id || item.product_id}
                className="product-Categories-inside-category-folder"
                onClick={() => {
                  navigate("/productDetails", {
                    state: {
                      ...item,
                      from: location.state?.from || fromUrl,
                    },
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" }); // 🔹 Scroll to top on click
                }}
              >
                <div className="filter-product-image">
                  <img src={item.image_01} alt={item.Product_Name} />

                  <div className="overlay-products">
                    <div className="overlay-buttons">
                      <div className="wishlist-overlay">
                        <button
                          onClick={(event) => {
                            dispatch(addToWishlist(item));
                            event.stopPropagation();
                            toast.success(`${item.Product_Name} added to the wishlist`);
                          }}
                        >
                          <IoMdHeartEmpty />
                        </button>
                      </div>

                      <div className="btn2 liquid  overlay-view-details ">
                        <button>View Deatils </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filter-product-para-text">
                  <div className="brand-name-p dotted-border">
                    <p>{item.Brand_Name.toUpperCase()}</p>
                  </div>

                  <div className="model-name">
                    <p>{item.Product_Name?.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
