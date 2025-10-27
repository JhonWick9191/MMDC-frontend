import { useLocation, useNavigate, useParams } from "react-router-dom"
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove } from "../Redux/Slice/Slice";
import { addToWishlist } from "../Redux/Slice/WishListSlice";

export default function SearchProductDetails() {
    const location = useLocation();
    const navigate = useNavigate();


    const productDetailsFromState = location.state;

    const [productDetails, setProductDetails] = useState(productDetailsFromState);
    const [count, setCount] = useState(1);

    const Cart = useSelector((state) => state.Cart || []);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);



    function decrement() { if (count > 1) setCount(count - 1); }
    function increment() { setCount(count + 1); }

    function addToCart() {
        if (!token) {
            toast.error("For Add to Cart you Have to login first");
        } else {
            dispatch(add({ ...productDetails, cartImage: mainImage }));
            toast.success("Added To the Cart ");
        }
    }

    function removeToCart() {
        dispatch(remove(productDetails._id));
        toast.success("Deleted");
    }

    const images = [
        productDetails?.image_01,
        productDetails?.image_02,
        productDetails?.image_03,
        productDetails?.image_04,
        productDetails?.image_05
    ].filter(img => !!img && img.toLowerCase() !== "none" && (img.startsWith("http://") || img.startsWith("https://")));

    const [mainImage, setMainImage] = useState(images[0]);

    if (!productDetails) return null; // loading ya fallback

    return (
        <div className="padding">
            <div className="path">
                <p>HOME / {productDetails.Product_Name.toUpperCase()}</p>
                <hr />
            </div>

            <div className="product-deatils-main-section">
                {/* Left images */}
                <div className="left-section-our-products-section">
                    <div className="main-images-products">
                        <img src={mainImage} alt="Selected product" />
                    </div>
                    <div className="product-image-mid">
                        {images.map((img, idx) => (
                            <div className="mid-image" key={idx} onClick={() => setMainImage(img)}>
                                <img src={img} alt={`Product ${idx + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right details */}
                <div className="right-product-section">
                    <div className="product-details-contsnt">
                        <p className="product-name">{productDetails.Product_Name}</p>
                        <p className="product-brand">{productDetails.Brand_Name}</p>
                        <p className="model-number">{productDetails.Model_number}</p>
                    </div>
                    <hr />
                    <div className="price">
                        <p><span><FaIndianRupeeSign /></span>Price {productDetails.Product_price * count}</p>
                        <p>Price incl. of all Taxes</p>
                    </div>
                    <hr />
                    <div className="quantity">
                        <div className="wrapper-main-counter">
                            <div className="main-quantity"><p>Quantity</p></div>
                            <div className="decrement-button"><button onClick={decrement}>-</button></div>
                            <div className="value"><p>{count}</p></div>
                            <div className="increment-button"><button onClick={increment}>+</button></div>
                        </div>
                    </div>
                    <hr />
                    <div className="carts-buttons">
                        <div className="cart-btn">
                            {Cart.some(product => product.id === productDetails._id)
                                ? <button onClick={removeToCart}>Remove to Cart</button>
                                : <button onClick={addToCart}>Add to cart</button>}
                        </div>
                        <div className="cart-btn">
                            <button onClick={() => dispatch(addToWishlist(productDetails), toast.success(`${productDetails.Product_Name} is added to the WishList`))}>
                                <span><FaHeart /></span> Wishlist
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="cart-discripction">
                        <h1 className="product-name">Description</h1>
                        <p>{productDetails.Product_Discripction}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
