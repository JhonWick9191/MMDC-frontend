import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function OurTandingProducts() {
  const Navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(false);

  const BASE_URL =
    import.meta.env.VITE_MAIN_API_ROUTE || "http://localhost:4100/api/v1";

  const buttons = [
    "Acoustic Guitar",
    "Electric Guitar",
    "Bass Guitar",
    "Drums",
    "Mixers",
    "More Products",
  ];

  async function fetchProductsByType(type) {
    try {
      setFade(true); // 🔹 Start fade-out animation
      setLoading(true);

      const res = await fetch(`${BASE_URL}/searchProducts?q=${encodeURIComponent(type)}`);
      const data = await res.json();

      // Small delay for smooth transition
      setTimeout(() => {
        if (res.ok && data.success) {
          setFilteredProducts(data.data.slice(0, 12)); // Only 12 products
        } else {
          setFilteredProducts([]);
        }
        setLoading(false);
        setFade(false); // 🔹 Trigger fade-in
      }, 400);
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
  }

  useEffect(() => {
    if (buttons.length > 0) {
      fetchProductsByType(buttons[0]);
      setActiveIndex(0);
    }
  }, []);

  return (
    <section>
      <div className="margin-and-padding-main">
        <div className="our-tranding-products">
          <div className="main-sectionHeading">
            <h1>OUR TRENDING PRODUCTS</h1>
          </div>

          {/* CATEGORY BUTTONS */}
          <div className="items-buttons-for-chaging-the-screen">
            {buttons.map((label, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(label, idx)}
                className={activeIndex === idx ? "active-btn" : ""}
              >
                {label}
              </button>
            ))}
          </div>

          {/* PRODUCTS SECTION */}
          {loading && (
            <p className="text-center text-gray-500 py-6"></p>
          )}

          {!loading && (
            <div className={`main-category-products fade-container ${fade ? "fade-out" : "fade-in"}`}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <div
                    className="product-Categories-inside-category-folder product-card"
                    key={item._id || item.product_id}
                    onClick={() => Navigate("/productDetails", { state: item })}
                  >
                    <div className="filter-product-image">
                      <img
                        src={
                          item.image_01 ||
                          item.Image_URL ||
                          "https://via.placeholder.com/200?text=No+Image"
                        }
                        alt={item.Product_Name || "Product"}
                      />
                    </div>

                    <div className="filter-product-para-text">
                      {item.Brand_Name && (
                        <div className="brand-name-p dotted-border">
                          <p>{item.Brand_Name.toUpperCase()}</p>
                        </div>
                      )}
                      {item.Product_Name && (
                        <div className="model-name">
                          <p>{item.Product_Name.toUpperCase()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
