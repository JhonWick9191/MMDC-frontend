import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosColorFilter } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { RiArrowDownSLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../Redux/Slice/WishListSlice";
import { toast } from "react-toastify";

function FilterProductByCategoryes() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");

    const [selectedFilter, setSelectedFilter] = useState(null);

    // Category count
    const categoryCount = products.reduce((acc, item) => {
        acc[item.Product_Category] = (acc[item.Product_Category] || 0) + 1;
        return acc;
    }, {});

    // Brand count
    const brandCount = products.reduce((acc, item) => {
        acc[item.Brand_Name] = (acc[item.Brand_Name] || 0) + 1;
        return acc;
    }, {});

    // Price Ranges
    const priceRanges = [
        { label: "1000 - 5000", min: 1000, max: 5000 },
        { label: "5000 - 10000", min: 5000, max: 10000 },
        { label: "10000 - 12000", min: 10000, max: 12000 },
        { label: "12000 - 15000", min: 12000, max: 15000 },
        { label: "15000 - 20000", min: 15000, max: 20000 },
        { label: "20000 - 25000", min: 20000, max: 25000 },
        { label: "25000 - 50000", min: 25000, max: 50000 },
        { label: "50000 - 55000", min: 50000, max: 55000 },
        { label: "55000 - 60000", min: 55000, max: 60000 },
        { label: "60000 - 65000", min: 60000, max: 65000 },
        { label: "65000 - 70000", min: 65000, max: 70000 },
        { label: "More than 70000", min: 70000, max: Infinity },
    ];

    // NEW: helper – filter state + URL update
    function applyFilter(filter) {
        setSelectedFilter(filter);
        setSideBar(false);
        document.body.style.overflow = "auto";

        const params = new URLSearchParams(location.search);

        if (filter.type === "brand") {
            params.set("brand", filter.value);
            params.delete("priceMin");
            params.delete("priceMax");
            params.delete("subCategory");
        } else if (filter.type === "category") {
            params.set("subCategory", filter.value);
            params.delete("brand");
            params.delete("priceMin");
            params.delete("priceMax");
        } else if (filter.type === "price") {
            params.set("priceMin", filter.min);
            params.set("priceMax", filter.max);
        }

        Navigate(`${location.pathname}?${params.toString()}`, { replace: false });
    }

    // handel cross butoon
    function handleCross() {
        setSideBar(false);
        console.log("cross is clicked");
        document.body.style.overflow = "auto";
    }

    // Filtered products
    const filteredProducts = selectedFilter
        ? products.filter((item) => {
              if (selectedFilter.type === "category") {
                  return item.Product_Category === selectedFilter.value;
              } else if (selectedFilter.type === "brand") {
                  return item.Brand_Name === selectedFilter.value;
              } else if (selectedFilter.type === "price") {
                  const price = parseInt(
                      String(item.Product_price || "0").replace(/,/g, "")
                  );
                  return price >= selectedFilter.min && price <= selectedFilter.max;
              }
              return true;
          })
        : products;

    const [showSideBar, setSideBar] = useState(false); // show side bar section
    function productTypeDisplay() {
        setSideBar(true);
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if (type) {
            fetchProducts();
        }
    }, [type]);

    const fetchProducts = async () => {
        try {
            const res = await fetch(
                `http://localhost:4100/api/v1/categoryProduct?type=${type}`
            );
            const data = await res.json();
            console.log("Product Category data ");
            console.log(data);
            setProducts(data.message || []);
        } catch (error) {
            console.error("Error while fetching products", error);
        } finally {
            setLoading(false);
        }
    };

    // NEW: URL se filter read karna
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const brand = params.get("brand");
        const subCategory = params.get("subCategory");
        const priceMin = params.get("priceMin");
        const priceMax = params.get("priceMax");

        if (brand) {
            setSelectedFilter({ type: "brand", value: brand });
        } else if (subCategory) {
            setSelectedFilter({ type: "category", value: subCategory });
        } else if (priceMin && priceMax) {
            setSelectedFilter({
                type: "price",
                min: +priceMin,
                max: +priceMax,
            });
        } else {
            setSelectedFilter(null);
        }
    }, [location.search]);

    // for geting location of the page
    const searchParams = new URLSearchParams(location.search);
    let types = searchParams.get("type");

    return (
        <>
            <div className="path-page">
                <ul>
                    <li>
                        <GoHome /> /{" "}
                    </li>
                    <li>{location.pathname.toUpperCase().replace("/", " ")} / </li>
                    <li></li>
                    <li>{type.toUpperCase()}</li>
                </ul>
                <p className="path-heading">{type.toUpperCase()}</p>
            </div>

            <hr className="color_2"></hr>
            <div className="filter-and-type-section">
                <div className="filter btn2 liquid">
                    <button onClick={productTypeDisplay}>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="16"
                                fill="none"
                            >
                                <rect
                                    width="18"
                                    height="1.5"
                                    y="2.5"
                                    fill="#191A1F"
                                    rx=".75"
                                ></rect>
                                <circle
                                    cx="10.5"
                                    cy="3"
                                    r="1.75"
                                    fill="#fff"
                                    stroke="#191A1F"
                                    strokeWidth="1.5"
                                ></circle>
                                <rect
                                    width="18"
                                    height="1.5"
                                    y="7.5"
                                    fill="#191A1F"
                                    rx=".75"
                                ></rect>
                                <circle
                                    cx="5.5"
                                    cy="8"
                                    r="1.75"
                                    fill="#fff"
                                    stroke="#191A1F"
                                    strokeWidth="1.5"
                                ></circle>
                                <rect
                                    width="18"
                                    height="1.5"
                                    y="12.5"
                                    fill="#191A1F"
                                    rx=".75"
                                ></rect>
                                <circle
                                    cx="11.5"
                                    cy="13"
                                    r="1.75"
                                    fill="#fff"
                                    stroke="#191A1F"
                                    strokeWidth="1.5"
                                ></circle>
                            </svg>
                        </span>
                        Fiter
                    </button>
                </div>

                <div className="left-side-buttons-filter ">
                    <div className="cate">
                        <p>
                            {products.length} <span> Results</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="side-bar-on-product-category-page">
                {showSideBar && (
                    <div className="listing-on-categoryes">
                        <div className="listing-product-category">
                            <div className="main-heading-product-categoryes">
                                <div className="text">
                                    <p>FILTER</p>
                                </div>

                                <div className="cross-section-categoryes">
                                    <button onClick={handleCross}>
                                        <RxCross1 />
                                    </button>
                                </div>
                            </div>
                            <hr className="border-1 border-red-500"></hr>

                            {/* Product Categories */}
                            <div className="main-class-listing-list">
                                <div className="main-heading-product-categoryes-out-border">
                                    <div className="text">
                                        <p>PRODUCT CATEGORIES</p>
                                    </div>
                                </div>
                                <ul className="lsiting-felx-class">
                                    {Object.entries(categoryCount).map(
                                        ([category, count], index) => (
                                            <li
                                                className="cate-list-highlight"
                                                key={index}
                                                onClick={() =>
                                                    applyFilter({
                                                        type: "category",
                                                        value: category,
                                                    })
                                                }
                                            >
                                                {category} ({count})
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            <hr className="border-1 border-red-500"></hr>

                            {/* Brands */}
                            <div className="main-brands-category">
                                <div className="main-heading-product-categoryes-out-border">
                                    <div className="text">
                                        <p>BRANDS </p>
                                    </div>
                                </div>
                                <ul>
                                    {Object.entries(brandCount).map(
                                        ([brand, count], index) => (
                                            <li
                                                key={index}
                                                onClick={() =>
                                                    applyFilter({
                                                        type: "brand",
                                                        value: brand,
                                                    })
                                                }
                                            >
                                                {brand} ({count})
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            <hr className="border-1 border-red-500"></hr>

                            {/* Price Filter */}
                            <div className="main-brands-category">
                                <div className="main-heading-product-categoryes-out-border">
                                    <div className="text">
                                        <p>PRICE</p>
                                    </div>
                                </div>
                                <ul className="pricing-listing">
                                    {priceRanges.map((range, index) => (
                                        <li
                                            className="listing-products-price"
                                            key={index}
                                            onClick={() =>
                                                applyFilter({
                                                    type: "price",
                                                    min: range.min,
                                                    max: range.max,
                                                })
                                            }
                                        >
                                            {range.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Clear Filter Button */}
            {selectedFilter && (
                <div className="clear-filer-section filter">
                    <button onClick={() => setSelectedFilter(null)}>
                        Clear Filter
                    </button>
                </div>
            )}

            <div className="main-category-products">
                <div className="filter-with-products">
                    <div className="listing-on-categoryes">
                        <div className="listing-product-category">
                            <div className="main-heading-product-categoryes">
                                <div className="text">
                                    <p>FILTER</p>
                                </div>

                                <div className="cross-section-categoryes">
                                    <button onClick={handleCross}>
                                        <RxCross1 />
                                    </button>
                                </div>
                            </div>
                            <hr className="border-1 border-red-500"></hr>

                            {/* Product Categories */}
                            <div className="main-class-listing-list">
                                <div className="main-heading-product-categoryes-out-border">
                                    <div className="text">
                                        <p>PRODUCT CATEGORYES</p>
                                    </div>
                                </div>
                                <ul className="lsiting-felx-class">
                                    {Object.entries(categoryCount).map(
                                        ([category, count], index) => (
                                            <li
                                                
                                                className="cate-list-highlight"
                                                key={index}
                                                onClick={() =>
                                                    applyFilter({
                                                        type: "category",
                                                        value: category,
                                                    })
                                                }
                                            >
                                                {category} ({count})
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            <hr className="border-1 border-red-500"></hr>

                            {/* Brands */}
                            <div className="main-brands-category">
                                <div className="main-heading-product-categoryes-out-border">
                                    <div className="text">
                                        <p>BRANDS </p>
                                    </div>
                                </div>
                                <ul className="brand-listing">
                                    {Object.entries(brandCount).map(
                                        ([brand, count], index) => (
                                            <li
                                                key={index}
                                                onClick={() =>
                                                    applyFilter({
                                                        type: "brand",
                                                        value: brand,
                                                    })
                                                }
                                            >
                                                {brand} ({count})
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            <hr className="border-1 border-red-500"></hr>

                            {/* Price Filter */}
                            <div className="main-brands-category">
                                <div className="main-heading-product-categoryes-out-border">
                                    <div className="text">
                                        <p>PRICE</p>
                                    </div>
                                </div>
                                <ul className="pricing-listing">
                                    {priceRanges.map((range, index) => (
                                        <li
                                            className="listing-products-price"
                                            key={index}
                                            onClick={() =>
                                                applyFilter({
                                                    type: "price",
                                                    min: range.min,
                                                    max: range.max,
                                                })
                                            }
                                        >
                                            {range.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="products-cato">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            <div
                                className="product-Categories-inside-category-folder"
                                key={item.product_id || item._id}
                                onClick={() =>
                                    Navigate("/productDetails", {
                                        state: {
                                            ...item,
                                            from:
                                                location.pathname +
                                                location.search,
                                        },
                                    })
                                }
                            >
                                <div className="filter-product-image">
                                    <img
                                        src={item.image_01}
                                        alt={item.name}
                                        loading="lazy"
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.src =
                                                item.image_02)
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.src =
                                                item.image_01)
                                        }
                                    />

                                    <div className="overlay-products">
                                        <div className="overlay-buttons">
                                            <div className="wishlist-overlay">
                                                <buttons
                                                    onClick={(event) => {
                                                        dispatch(
                                                            addToWishlist(item)
                                                        );
                                                        event.stopPropagation();
                                                        toast.success(
                                                            ` Added to the wishlist`
                                                        );
                                                    }}
                                                >
                                                    <IoMdHeartEmpty />
                                                </buttons>
                                            </div>

                                            <div className="btn2 liquid  overlay-view-details ">
                                                <button>View Deatils </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="filter-product-para-text">
                                    <div className="brand-name-p dotted-border">
                                        <p>{item.Brand_Name}</p>
                                    </div>

                                    <div className="model-name">
                                        <p>
                                            {item.Product_Name?.toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default FilterProductByCategoryes;
