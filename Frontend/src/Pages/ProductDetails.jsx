import { useLocation } from "react-router-dom"
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';

import { add, remove } from "../Redux/Slice/Slice";
import { addToWishlist } from "../Redux/Slice/WishListSlice";

export default function ProductDeatils() {

    const loaction = useLocation();
    const productDetails = loaction.state
    const pathName = loaction.pathname;

    const [count, setCount] = useState(1);

    function decrement() {
        if (count <= 1) setCount(1)
        else setCount(count - 1)
    }

    function increment() {
        setCount(count + 1)
    }

    const Cart = useSelector((state) => state.Cart || []);
    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.token);
    console.log(token)

    console.log(productDetails)

    function addToCart() {
        if (!token) {
            toast.error("For Add to Cart you Have to login first")
        } else {
             dispatch(add({ ...productDetails, cartImage: mainImage  }))
            toast.success("Added To the Cart ")
        }
    }

    function removeToCart() {
        dispatch(remove(productDetails._id))
        toast.success("Deleted")
    }

    // ✅ Fix: Correct image state + click handler
    const [mainImage, setMainImage] = useState(productDetails.image_01);

    return (
        <>
            <div className="padding">
                <div className="path">
                    <p>HOME /{`${productDetails.Product_Name.toUpperCase()}  ${pathName.toUpperCase()}`}</p>
                    <hr></hr>
                </div>

                <div className="product-deatils-main-section">
                    <div className="left-section-our-products-section">

                        <div className="main-images-products">
                            <img src={mainImage} alt="Selected product" />
                        </div>

                        <div className="product-image-mid">
                            <div className="mid-image" onClick={() => setMainImage(productDetails.image_02)}>
                                <img src={productDetails.image_02} />
                            </div>

                            <div className="mid-image" onClick={() => setMainImage(productDetails.image_03)}>
                                <img src={productDetails.image_03} />
                            </div>

                            <div className="mid-image" onClick={() => setMainImage(productDetails.image_04)}>
                                <img src={productDetails.image_04} />
                            </div>

                            <div className="mid-image" onClick={() => setMainImage(productDetails.image_05)}>
                                <img src={productDetails.image_05} />
                            </div>
                        </div>
                    </div>


                    <div className="right-product-section">

                        <div className="product-details-contsnt">
                            <p className="product-name">{productDetails.Product_Name}</p>
                            <p className="product-brand">{productDetails.Brand_Name}</p>
                            <p className="model-number">{productDetails.Model_number}</p>
                        </div>

                        <hr></hr>

                        <div className="price">
                            <p><span>< FaIndianRupeeSign /></span>Price {productDetails.Product_price * count}</p>
                            <p>Price incl. of all Taxes</p>
                        </div>

                        <hr></hr>

                        <div className="quantity">

                            <div className="wrapper-main-counter">
                                <div className="main-quantity">
                                    <p>Quantity</p>
                                </div>

                                <div className="decrement-button">
                                    <button onClick={decrement}>-</button>
                                </div>

                                <div className="value">
                                    <p>{count}</p>
                                </div>

                                <div className="increment-button">
                                    <button onClick={increment}>+</button>
                                </div>
                            </div>

                           
                        </div>

                        <hr></hr>

                        <div className="carts-buttons">
                            <div className="cart-btn">
                                {
                                    Cart.some((product) => product.id == productDetails._id)
                                        ? (<button onClick={removeToCart}>Remove to Cart</button>)
                                        : (<button onClick={addToCart}>Add to cart</button>)
                                }
                            </div>

                            <div className="cart-btn">
                                <button onClick={() => dispatch(addToWishlist(productDetails), toast.success(`${productDetails.Product_Name} is added to the WishList`))}>
                                    <span><FaHeart /></span> Wishlist
                                </button>
                            </div>

                            
                        </div>

                        <hr></hr>

                        <div className="cart-discripction">
                                <h1 className="product-name">Discripction</h1>
                                <p>{productDetails.Product_Discripction}</p>
                            </div>

                    </div>
                </div>
            </div>
        </>
    )
}
