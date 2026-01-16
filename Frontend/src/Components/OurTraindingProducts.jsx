import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { addToWishlist } from "../Redux/Slice/WishListSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaIndianRupeeSign } from "react-icons/fa6";

export default function OurTandingProducts() {
  const Navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(false);
  const dispatch = useDispatch();

  

  const buttons = [
    "Acoustic Guitars",
    "Electric Guitars",
    "Bass Guitars",
    "MPC",
    "Controller",
    "Keyboard",
  ];

  async function fetchProductsByType(type) {
    try {
      setFade(true);
      setLoading(true);

      const res = await fetch(`https://api.musicandmore.co.in/api/v1searchProducts?q=${encodeURIComponent(type)}`);
      const data = await res.json();

      // Small delay for smooth transition
      setTimeout(() => {
        console.log(data)
        if (res.ok && data.success) {
          setFilteredProducts(data.data.slice(0, 15)); // Only 15 products
        } else {
          setFilteredProducts([]);
        }
        setLoading(false);
        setFade(false);
      }, 1000);
    } catch (err) {
      console.error("Error fetching products:", err);
      setFilteredProducts([]);
      setLoading(false);
      setFade(false);
    }
  }

  function handleCategoryClick(type, index) {
    setActiveIndex(index);
    fetchProductsByType(type);
    console.log(type)

  }


  useEffect(() => {
    if (buttons.length > 0) {
      fetchProductsByType(buttons[0]);
      setActiveIndex(0);
    }
  }, []);
  function handleButton() {
    console.log("Add to wishlist button is clicked")
  }
  // wishlist 
  return (
    <section>
      <div className="margin-and-padding-main">
        <div className="our-tranding-products">
          <div className="line-with-text width-80-for-line">
            <div className="left-line w-20">
              <hr></hr>
            </div>

            <div className="text-heading">
              <h2 className="main-heading-recom">TRENDING PRODUCTS</h2>
            </div>

            <div className="right-line">
              <hr></hr>
            </div>
          </div>

          {/* CATEGORY BUTTONS */}

          <div className="items-buttons-for-chaging-the-screen">
            {buttons.map((label, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(label, idx)}
                className="blob-btn"
              >
                {label}
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
              </button>
            ))}

            {/* SVG Filter — keep only one copy in your app */}
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: "none" }}>
              <defs>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 21 -7"
                    result="goo"
                  ></feColorMatrix>
                  <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                </filter>
              </defs>
            </svg>
          </div>

          {/* PRODUCTS SECTION */}
          {loading && (
            <p className="loading-gif-on-product-change">
              <img src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1763116242/transition_dpgnur.gif" loading="lazy" />
            </p>
          )}

          {!loading && (
            <div className={`main-category-products_2 fade-container ${fade ? "fade-out" : "fade-in"}`}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <div className="product-Categories-inside-category-folder"
                    key={item.product_id || item._id}
                    onClick={() => Navigate("/productDetails", { state: item })}>



                    <div className="filter-product-image">
                      <img
                        src={item.image_01}
                        alt={item.name}
                        loading="lazy"
                        onMouseEnter={(e) => (e.currentTarget.src = item.image_02)}
                        onMouseLeave={(e) => (e.currentTarget.src = item.image_01)}
                      />

                      <div className="overlay-products">

                        <div className="overlay-buttons">

                          <div className="wishlist-overlay">
                            <button onClick={(event) => { dispatch(addToWishlist(item)); event.stopPropagation(); toast.success(`${item.Product_Name} added to the wishlist`); }}><IoMdHeartEmpty /></button>
                          </div>

                          <div className="btn2 liquid  overlay-view-details ">
                            <button onClick={handleButton}>View Details </button>
                          </div>
                        </div>

                      </div>



                    </div>

                    <div className="filter-product-para-text">
                      <div className="brand-name-p dotted-border">

                        <p>
                          Model - {item.Model_number}
                        </p>
                      </div>
                      <div className="brand-name-p dotted-border">
                        <p>{item.Brand_Name.toUpperCase()}</p>
                      </div>



                      <div className="model-name dotted-border">
                        <p>
                          {item.Product_Category
                          }
                        </p>
                      </div>
                      <div className="model-name model-price-cards dotted-border">
                        <p>
                          MRP <FaIndianRupeeSign />  {Number(item.Product_price).toLocaleString("en-IN")}

                        </p>
                      </div>

                    </div>

                  </div>
                ))
              ) : (
                <p>Sorry </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
