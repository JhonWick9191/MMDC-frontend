import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../Context/SearchContaxt";
import { IoIosColorFilter } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";

export default function SearchProducts() {
    const { searchResults, searchQuery } = useSearch();
    const Navigate = useNavigate();

    const [showSideBar, setSideBar] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(true);


   
    // Sidebar handlers
    const handleCross = () => {
        setSideBar(false);
        document.body.style.overflow = "auto";
    };

    const openSidebar = () => {
        setSideBar(true);
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
    };

    // Category & Brand count
    const categoryCount = searchResults?.reduce((acc, item) => {
        acc[item.Product_Category] = (acc[item.Product_Category] || 0) + 1;
        return acc;
    }, {}) || {};

    const brandCount = searchResults?.reduce((acc, item) => {
        acc[item.Brand_Name] = (acc[item.Brand_Name] || 0) + 1;
        return acc;
    }, {}) || {};

    // loading icon while loading 
 

    // Price Ranges
    // const priceRanges = [
    //     { label: "1000 - 5000", min: 1000, max: 5000 },
    //     { label: "5000 - 10000", min: 5000, max: 10000 },
    //     { label: "10000 - 12000", min: 10000, max: 12000 },
    //     { label: "12000 - 15000", min: 12000, max: 15000 },
    //     { label: "15000 - 20000", min: 15000, max: 20000 },
    //     { label: "20000 - 25000", min: 20000, max: 25000 },
    //     { label: "25000 - 50000", min: 25000, max: 50000 },
    //     { label: "More than 50000", min: 50000, max: Infinity },
    // ];

    // Filter products
    const filteredProducts = selectedFilter
        ? searchResults.filter((item) => {
            if (selectedFilter.type === "category") return item.Product_Category === selectedFilter.value;
            if (selectedFilter.type === "brand") return item.Brand_Name === selectedFilter.value;
            if (selectedFilter.type === "price") {
                const price = parseInt(String(item.Product_price || "0").replace(/,/g, ""));
                return price >= selectedFilter.min && price <= selectedFilter.max;
            }
            return true;
        })
        : searchResults;

        console.log(filteredProducts)

    // Remove auto-redirect, just handle empty searchResults
    if (loading && searchResults) setLoading(false);

    if (loading) return <p style={{ padding: "20px" }}>Loading search results...</p>;

    if (!loading && (!searchResults || searchResults.length === 0)) {
        return (
            <div className="no-product-found">
                <div className="image-in-not-found">
                    <img src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1760685581/Neutral_Aesthetic_Simple_Quote_Instagram_Post_byfeti.gif" alt="No Products" />
                </div>
                <div className="text-image-not-found">
                    <p>No products found for "{searchQuery}"</p>
                </div>
                <div className="go-back-buttons">
                    <button onClick={() => Navigate("/")}>HOME</button>
                </div>
            </div>
        );
    }

    // for sending the product to product details 

    const searchParams = new URLSearchParams(location.search)
    let types = searchParams.get("type")

    function productTypeDisplay() {
        setSideBar(true)
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
    }

    return (
        <>
            {/* Poster / Banner */}
            <div className="path-page">
                <ul>
                    <li><GoHome /> /  </li>
                    <li>{location.pathname.toUpperCase().replace("/", " ")} /  </li>
                    <li></li>
                    <li>{types}</li>
                </ul>
                <p className="path-heading">
                    {types}
                </p>
            </div>

            <hr className="color_2"></hr>
            <div className="filter-and-type-section">
                <div className="filter btn2 liquid">
                    <button onClick={productTypeDisplay}><span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="none"><rect width="18" height="1.5" y="2.5" fill="#191A1F" rx=".75"></rect><circle cx="10.5" cy="3" r="1.75" fill="#fff" stroke="#191A1F" stroke-width="1.5"></circle><rect width="18" height="1.5" y="7.5" fill="#191A1F" rx=".75"></rect><circle cx="5.5" cy="8" r="1.75" fill="#fff" stroke="#191A1F" stroke-width="1.5"></circle><rect width="18" height="1.5" y="12.5" fill="#191A1F" rx=".75"></rect><circle cx="11.5" cy="13" r="1.75" fill="#fff" stroke="#191A1F" stroke-width="1.5"></circle></svg></span>Fiter</button>
                </div>

                <div className="left-side-buttons-filter ">

                    <div className="cate">
                        <p>{filteredProducts.length} <span>  Results</span></p>
                    </div>

                </div>

            </div>

            {/* Filter and Total */}
           

            {/* Sidebar */}
            <div className="side-bar-on-product-category-page">
                {showSideBar && (
                    <div className="listing-on-categoryes">
                        <div className="listing-product-category">
                            <div className="main-heading-product-categoryes">
                                <div className="text"><p>FILTER</p></div>
                                <div className="cross-section-categoryes">
                                    <button onClick={handleCross}><RxCross1 /></button>
                                </div>
                            </div>
                            <hr className="border-1 border-red-500" />

                            {/* Categories */}
                            <div className="main-class-listing-list">
                                <div className="main-heading-product-categoryes-out-border">
                                    <div className="text"><p>PRODUCT CATEGORYES</p></div>
                                </div>
                                <ul className="lsiting-felx-class">
                                    {Object.entries(categoryCount).map(([category, count], index) => (
                                        <li
                                            key={index}
                                            className="cate-list-highlight"
                                            onClick={() => {
                                                setSelectedFilter({ type: "category", value: category });
                                                handleCross();
                                            }}
                                        >
                                            {category} ({count})
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <hr className="border-1 border-red-500" />

                            {/* Brands */}
                            <div className="main-brands-category">
                                <div className="main-heading-product-categoryes-out-border">
                                    <div className="text"><p>BRANDS</p></div>
                                </div>
                                <ul>
                                    {Object.entries(brandCount).map(([brand, count], index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                setSelectedFilter({ type: "brand", value: brand });
                                                handleCross();
                                            }}
                                        >
                                            {brand} ({count})
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <hr className="border-1 border-red-500" />

                            {/* Price */}
                            <div className="main-brands-category">
                                <div className="main-heading-product-categoryes-out-border">
                                    <div className="text"><p>PRICE</p></div>
                                </div>
                                <ul className="pricing-listing">
                                    {priceRanges.map((range, index) => (
                                        <li
                                            className="listing-products-price"
                                            key={index}
                                            onClick={() => {
                                                setSelectedFilter({ type: "price", min: range.min, max: range.max });
                                                handleCross();
                                            }}
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

            {/* Clear Filter */}
            {selectedFilter && (
                <div className="clear-filer-section filter btn liquid">
                    <button onClick={() => setSelectedFilter(null)}>Clear Filter</button>
                </div>
            )}

            {/* Products */}

            <div className="main-category-products">
                <div className="filter-with-products">
                    <div className="listing-on-categoryes">

                        <div className="listing-product-category">
                            <div className="main-heading-product-categoryes">
                                <div className="text">
                                    <p>FILTER</p>
                                </div>

                                <div className="cross-section-categoryes">
                                    <button onClick={handleCross}><RxCross1 /></button>
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
                                    {Object.entries(categoryCount).map(([category, count], index) => (
                                        <li className="cate-list-highlight"
                                            key={index}
                                            onClick={() => {
                                                setSelectedFilter({ type: "category", value: category });
                                                setSideBar(false); // sidebar close
                                                document.body.style.overflow = "auto"; // scroll wapas enable
                                            }}
                                        >
                                            {category} ({count})
                                        </li>
                                    ))}
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
                                    {Object.entries(brandCount).map(([brand, count], index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                setSelectedFilter({ type: "brand", value: brand });
                                                setSideBar(false);
                                                document.body.style.overflow = "auto";
                                            }}
                                        >
                                            {brand} ({count})
                                        </li>
                                    ))}
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
                                            onClick={() => {
                                                setSelectedFilter({ type: "price", min: range.min, max: range.max });
                                                setSideBar(false); // sidebar close
                                                document.body.style.overflow = "auto"; // page scroll enable
                                            }}
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
                            <div className="product-Categories-inside-category-folder"
                                key={item.product_id || item._id}
                                onClick={() => Navigate("/productDetails", { state: item })}>



                                <div className="filter-product-image">
                                    <img
                                        src={item.image_01}
                                        alt={item.name}
                                        onMouseEnter={(e) => (e.currentTarget.src = item.image_02)}
                                        onMouseLeave={(e) => (e.currentTarget.src = item.image_01)}
                                    />

                                    <div className="overlay-products">

                                        <div className="overlay-buttons">

                                            <div className="wishlist-overlay">
                                                <buttons onClick={(event) => { dispatch(addToWishlist(item)); event.stopPropagation(); toast.success(` Added to the wishlist`); }}><IoMdHeartEmpty /></buttons>
                                            </div>

                                            <div className="btn2 liquid  overlay-view-details ">
                                                <button >View Deatils </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className="filter-product-para-text">

                                    <div className="brand-name-p dotted-border">
                                        <p>{item.Brand_Name}</p>
                                    </div>

                                    <div className="model-name">
                                        <p>{item.Product_Name}</p>
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
