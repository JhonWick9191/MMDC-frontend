import { useLocation } from "react-router-dom"
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { toast } from 'react-toastify';

// importing the useSelector and usedispatch hook 

import { useSelector, useDispatch } from 'react-redux';

// if the item is already added in the cart then it will shows the remove itme and if item is not added to the cart the it will show add to cart button 

import { add, remove } from "../Redux/Slice/Slice";
import { addToWishlist } from "../Redux/Slice/WishListSlice";

export default function ProductDeatils() {


    const loaction = useLocation();
    const productDetails = loaction.state
    const pathName = loaction.pathname;
    // console.log(pathName)
    // console.log(productDetails)

    //  count for quentity 

    const [count, setCount] = useState(1);

    function decrement() {

        if (count <= 1) {
            setCount(1)
        } else {
            setCount(count - 1)
        }
    }

    function increment() {
        setCount(count + 1)
    }

    // function for add to cart and remove to cart 
        const Cart = useSelector((state) => state.Cart || []);
        const WishList =  useSelector((state) => state.WishList )
        const dispatch = useDispatch()

    function addToCart(){
        dispatch(add(productDetails))
        toast.success("Ade")
     
    }

    function removeToCart(){
        console.log("Remove to cart is clicked")
        dispatch(remove(productDetails.id))
        toast.success("Deleted")
       
    }


    const [mainImage, setMainImage] = useState(productDetails.insideImages[0].one);
    return (
        <>
            <div className="padding">
                <div className="path">
                    <p>HOME /{`${productDetails.name.toUpperCase()}  ${pathName.toUpperCase()}`}</p>
                    <hr></hr>
                </div>

                <div className="product-deatils-main-section">
                    <div className="left-section-our-products-section">
                        <div className="main-images-products" onClick={() => setMainImage(productDetails.insideImages[0].two)}>
                            <img src={mainImage} alt="Selected product" />
                        </div>

                        <div className="product-image-mid" onClick={() => setMainImage(productDetails.insideImages[0].two)}>
                            <div className="mid-image">
                                <img src={productDetails.insideImages[0].two} />
                            </div>

                            <div className="mid-image" onClick={() => setMainImage(productDetails.insideImages[0].two)}>
                                <img src={productDetails.insideImages[0].three} />
                            </div>

                            <div className="mid-image" onClick={() => setMainImage(productDetails.insideImages[0].two)}>

                                <img src={productDetails.insideImages[0].three} />

                            </div>

                            <div className="mid-image" onClick={() => setMainImage(productDetails.insideImages[0].two)}>

                                <img src={productDetails.insideImages[0].three} />

                            </div>
                        </div>



                    </div>

                    <div className="right-product-section">

                        <div className="product-details-contsnt">
                            <p className="product-name">{productDetails.name}</p>
                            <p className="product-brand">{productDetails.discripction}</p>
                            <p className="model-number">{productDetails.model}</p>
                        </div>

                        <hr></hr>



                        <div className="price">
                            <p><span>< FaIndianRupeeSign /></span>Price {productDetails.price*count}</p>
                            <p><span>< FaIndianRupeeSign /></span>DP {productDetails.price*count}</p>

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

                            <div className="colors">

                                <ul>
                                    <li className="red"></li>
                                    <li className="yellow"></li>
                                    <li className="orange"></li>
                                    <li className="brown"></li>
                                </ul>
                            </div>


                        </div>

                        <hr></hr>




                        <div className="carts-buttons">
                            <div className="cart-btn">
                              {

                                // if cart have some product which have same id contain with the clicked product define some condition 
                                Cart.some((product) => product.id == productDetails.id) ? (<button onClick={removeToCart}>Remove to Cart </button>) : (<button onClick= {addToCart}>Add to cart </button>)
                              }
                            </div>

                            <div className="cart-btn">
                                <button onClick={()=> dispatch(addToWishlist(productDetails) , toast.success(`${productDetails.name} is added to the WishList `)  )}> <span><FaHeart /></span> Wishlist</button>
                            </div>
                        </div>



                    </div>
                </div>


            </div>
        </>
    )
}