import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../Redux/Slice/WishListSlice";
import { toast } from "react-toastify";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
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
    const [categoryCount, setCategoryCount] = useState({}); // category => count from backend
    const [allBrands, setAllBrands] = useState([]); // array of brand names
    const [brandCount, setBrandCount] = useState({}); // brand => count from backend


    // toal products count 
    const [totalProducts, setTotalProducts] = useState(0);
    const [allCategories, setAllCategories] = useState([]); // all categories from backend


    console.log(allCategories)
    // Brand count

    // pagination add
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const [productFilterLoading, setProductFilterLoading] = useState(false)
    // NEW: helper – filter state + URL update
    function applyFilter(filter) {
        setProductFilterLoading(true)
        setTimeout(() => {

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
            setProductFilterLoading(false)
        }, 2000)

    }



    // handel cross butoon
    function handleCross() {
        setSideBar(false);
        console.log("cross is clicked");
        document.body.style.overflow = "auto";
    }

    // Filtered products


    const [showSideBar, setSideBar] = useState(false); // show side bar section
    function productTypeDisplay() {
        setSideBar(true);
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if (type) {
            fetchProducts(1);
        }
    }, [location.search]);

    const [isFilterMetaLoaded, setIsFilterMetaLoaded] = useState(false);


    const fetchProducts = async (page = 1, sort = "asc") => {  // 🔹 sort param add kiya
        setLoading(true);
        const params = new URLSearchParams(location.search);
        if (type) params.set("type", type);
        params.set("page", page);
        params.set("sort", sort); // 🔹 backend ko sort bhej rahe hain

        // ✅ Send current filter to backend
        if (selectedFilter) {
            if (selectedFilter.type === "brand") {
                params.set("brand", selectedFilter.value);
            } else if (selectedFilter.type === "category") {
                params.set("subCategory", selectedFilter.value);
            } else if (selectedFilter.type === "price") {
                params.set("priceMin", selectedFilter.min);
                params.set("priceMax", selectedFilter.max);
            }
        }

        try {
            const res = await fetch(`https://api.musicandmore.co.in/api/v1/categoryProduct?${params.toString()}`);
            const data = await res.json();

            setProducts(data.message || []);
            setTotalProducts(data.totalProducts || 0);
            if (!isFilterMetaLoaded) {
                setAllCategories(data.totalCategories || []);
                setCategoryCount(data.categoryCount || {});
                setAllBrands(Object.keys(data.brandCount || {}));
                setBrandCount(data.brandCount || {});
                setIsFilterMetaLoaded(true);
            }

            setTotalPages(data.totalPages || 1);
            setCurrentPage(page);
        } catch (err) {
            console.error(err);
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

    // functions for adding A-z And price high to low 
    // Price heigh to low sorting function 

    // function for handleside filer section A-Z
    const [SideFilterSection, setSideFilterSection] = useState(false)
    function handleSideFilterSection() {
        setSideFilterSection(pre => !pre)
        console.log("The side Filter button is clicked")

    }

    const [isPriceHighTolow, setisPriceHighTolow] = useState(true)

    // filter product with sorting 

    let sortedFilterProducts = [...products];

    if (isPriceHighTolow) {
        sortedFilterProducts.sort((a, b) => {
            const priceA = parseInt(String(a.Product_price || "0").replace(/,/g, ""));
            const priceB = parseInt(String(b.Product_price || "0").replace(/,/g, ""));
            return priceB - priceA; // High to Low
        })
    }


    // function for filter price low to high 
    const [isPriceLowToHigh, setisPriceLowToHigh] = useState(true)
    // function handlefunction 
    if (isPriceLowToHigh && products.length > 0) {  // products loaded check
        sortedFilterProducts.sort((a, b) => {
            const priceA = parseInt(String(a.Product_price || "0").replace(/,/g, ""));
            const priceB = parseInt(String(b.Product_price || "0").replace(/,/g, ""));
            return priceA - priceB; // Low to High
        })
    }

    function handlePriceHighToLow() {
        setisPriceLowToHigh(false);   // Low OFF  
        setisPriceHighTolow(true);    // High ON
        setSideFilterSection(false);
        fetchProducts(1, "desc");     // 🔹 backend se fetch karo High → Low
    }

    function handlePriceLowTohigh() {
        setisPriceHighTolow(false);   // High OFF
        setisPriceLowToHigh(true);    // Low ON  
        setSideFilterSection(false);
        fetchProducts(1, "asc");      // 🔹 backend se fetch karo Low → High
    }



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
                {/* <p className="path-heading">{type.toUpperCase()}</p> */}
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
                {/* top section after poster section that is basically contain total length of products ad A-Z and price filter section */}

                <div className="left-side-buttons-filter">
                    <div className="filter-by-product-price-and-a-z count-number">
                        <p>
                            {type} -  {totalProducts}
                        </p>
                    </div>

                    <div className="filter-by-product-price-and-a-z">
                        <div className="main-wrapper-for-filter-a-z liquid_2" onClick={handleSideFilterSection}>
                            <div className="main-text-and-button-for-text-button">
                                <div className="text-A-Z">
                                    <p>

                                        {isPriceLowToHigh
                                            ? 'Price - Low to High'
                                            : isPriceHighTolow
                                                ? 'Price - High to Low'
                                                : 'Select Sorting Options'
                                        }
                                    </p>
                                </div>
                                <div className="button-A-Z">
                                    {
                                        SideFilterSection ? (<IoChevronUp />) : (<IoChevronDown />)
                                    }
                                </div>
                            </div>

                        </div>

                        {/* Buttons same rahenge - perfect hai */}
                        <div className="main-wrapper-for-listing-A-Z">
                            {SideFilterSection ? (
                                <div className="listing-total-buttons-for-filtering">
                                    <ul>
                                        <li
                                            className="dotted-border"
                                            onClick={handlePriceLowTohigh}
                                        >
                                            Price - Low to High
                                        </li>
                                        <li

                                            onClick={handlePriceHighToLow}
                                        >
                                            Price - High to Low
                                        </li>
                                    </ul>
                                </div>
                            ) : null}
                        </div>
                    </div>


                </div>
            </div>
            {/*  mobile side view filter section  */}
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
                                    <ul className="lsiting-felx-class">
                                        {allCategories.map((category, index) => {
                                            const count = categoryCount[category] || 0; // current page me count ya 0
                                            return (
                                                <li
                                                    className="cate-list-highlight"
                                                    key={index}
                                                    onClick={() =>
                                                        applyFilter({ type: "category", value: category })
                                                    }
                                                >
                                                    {category} ({count})
                                                </li>
                                            );
                                        })}
                                    </ul>

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


                        </div>
                    </div>
                )}
            </div>
            {/* mobile side view filer section ends  */}
            {/* Clear Filter Button */}
            {selectedFilter && (
                <div className="clear-filer-section filter">
                    <button onClick={() => setSelectedFilter(null)}>
                        Clear Filter
                    </button>
                </div>
            )}

            <div className="main-category-products">

                {/*---------------------------------------------------------------------------------------------------------------------------------------------------------------  */}
                {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                {/* ==========================================================Left side fiter  for laptop section ================================================================================== */}
                {/*---------------------------------------------------------------------------------------------------------------------------------------------------------------  */}
                {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
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
                                        <p>PRODUCT CATEGORIES</p>
                                    </div>
                                </div>
                                <ul className="lsiting-felx-class">
                                    {allCategories.map((category, index) => {
                                        const count = categoryCount[category] || 0; // current page me count ya 0
                                        return (
                                            <li
                                                className="cate-list-highlight"
                                                key={index}
                                                onClick={() =>
                                                    applyFilter({ type: "category", value: category })
                                                }
                                            >
                                                {category} ({count})
                                            </li>
                                        );
                                    })}
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


                        </div>
                    </div>
                </div>



                {/*---------------------------------------------------------------------------------------------------------------------------------------------------------------  */}
                {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                {/* ==========================================================Left side fiter ends================================================================================== */}
                {/*---------------------------------------------------------------------------------------------------------------------------------------------------------------  */}
                {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                {/*  Right side prodcuts starts   */}
                <div className="products-cato">
                    {
                        productFilterLoading ? (<div className="loading-product-filter">
                            <img src="https://pub-b88455fc17c04e63a0f32324fc1620df.r2.dev/animations/31b197a973fec89feda429d7ae5c1b07.gif" />
                        </div>) :
                            sortedFilterProducts.length > 0 ? (
                                sortedFilterProducts.map((item) => (
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

                                                <p>
                                                    Model - {item.Model_number}
                                                </p>
                                            </div>

                                            <div className="brand-name-p dotted-border">

                                                <p>
                                                    Model - {item.Product_Name
                                                    }
                                                </p>
                                            </div>
                                            <div className="model-name dotted-border">
                                                <p>
                                                    <p>{item.Brand_Name}</p>
                                                </p>
                                            </div>

                                            <div className="model-name dotted-border">
                                                <p>
                                                    {item.Product_Category
                                                    }
                                                </p>
                                            </div>
                                            {/* <div className="model-name model-price-cards dotted-border">
                                                <p>
                                                    MRP <FaIndianRupeeSign />  {Number(item.Product_price).toLocaleString("en-IN")}

                                                </p>
                                            </div> */}



                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No products found.</p>
                            )}


                    <div className="main-pagination-wrapper">


                        <div className="pagination">

                            <div className="left-page-down-button">


                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => fetchProducts(currentPage - 1)}
                                >
                                    <GrFormPrevious /> Pre
                                </button>
                            </div>

                            <div className="page-number">



                                <span className="current-page">{currentPage}</span>

                            </div>

                            <div className="right-page-up-button">


                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => fetchProducts(currentPage + 1)}
                                >

                                    Next <MdOutlineNavigateNext />

                                </button>
                            </div>
                        </div>


                    </div>


                </div>


            </div>

        </>
    );
}

export default FilterProductByCategoryes;
