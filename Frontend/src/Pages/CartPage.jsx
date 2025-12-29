import { useSelector, useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { incrementQuantity, decrementQuantity, remove } from "../Redux/Slice/Slice";
import { addToWishlist } from "../Redux/Slice/WishListSlice";
import { toast } from "react-toastify";
import { BsExclamationOctagon } from "react-icons/bs";

import { FaShippingFast } from "react-icons/fa";
import { AiFillInsurance } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.Cart);

  // FIXED — Prevent crash if values undefined
  const cartTotal = Cart.reduce(
    (total, item) =>
      total + (item.Vendor_price || 0) * (item.quantity || 1),
    0
  );

  const orderData = {
    products: Cart,
    totalAmount: cartTotal,
  };

  const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

  async function placeOrderHandler() {
    try {
      const response = await fetch(`${BASE_URL}/orderPlaces`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Order Placed Successfully!");
        console.log("ORDER RESPONSE:", data);
      } else {
        toast.error(data.message || "Order Failed");
        console.log("ORDER ERROR:", data);
      }
    } catch (error) {
      console.log(error);
      console.log("Getting error while sending order details");
    }
  }

  const scrollToBilling = (e) => {
    e.preventDefault();
    document.getElementById("billing-details").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {Cart.length > 0 ? (
        <div className="main-wrapper-cart-patent">

          <div className="main-wrapper-cart-items">

            {Cart.map((item) => (
              <div className="top-class-for-add-to-cart" key={item._id}>
                <div className="main-cart-section-image">
                  <div className="main-wrapper-class-cart-image">
                  <div className="product-image">
                    <img src={item.cartImage} alt={item.Product_Name} loading="lazy" />
                  </div>

                  </div>
               

                  <div className="product-details">
                    <div className="product-details-with-heading-price">
                      <div className="d-p">
                        <div className="on-mobile-active">
                        <div className="product-heading">
                          <p>{item.Brand_Name}</p>
                        </div>
                        <div className="product-model-number">
                          <p>{item.Model_number}</p>
                        </div>
                        </div>
                        <div className="product-model-number">
                          <p>{item.Product_Category}</p>
                        </div>
                        <div className="product-model-number not-shown">
                          <p>{item.Product_Name}</p>
                        </div>
                      </div>

                      <div className="pricing">
                        <div className="product-price">

                          <div className="terms-and-conditions">
                            <span><BsExclamationOctagon /></span>
                            <p>Terms And Conditions</p>

                            <div className="hide-without-hover">
                              <ul className="hover-list-hover">
                                <li><strong>Prices :</strong>Prices are Ex - Godown, Packing & Forwarding extra on actuals.</li>
                                <li><strong>Taxes:</strong> GST extra on Dealer Price and Included on MRP</li>
                                <li><strong>Shipping:</strong> Extra in dealer's account</li>
                                <li><strong>Shipping Insurance:</strong> If required please confirm while placing the orders. We are not responsible for any transit damage/loss</li>
                                <li><strong>Warranty:</strong> At our agreed service center only and shipping charges will be to your account. Subject to Noida jurisdiction</li>
                                <li>Prices are subject to change without notice.</li>
                              </ul>
                            </div>
                          </div>

                          {/* FIXED — fallback value */}
                          <div className="main-pricing">

                          <p>
                            <span><FaIndianRupeeSign /></span>
                            MRP - {(item.Product_price || 0).toLocaleString("en-IN")}
                          </p>
                       

                      
                          <p>
                            <span><FaIndianRupeeSign /></span>
                            DP - {(item.Vendor_price || 0).toLocaleString("en-IN")}
                          </p>
                      </div>
                      </div>
                      </div>
                    </div>

                    <hr />

                    {/* Quantity FIXED — fallback & disabled logic safe */}
                    <div className="quantity">
                      <div className="wrapper-main-counter">
                        <div className="main-quantity">
                          <p>Quantity</p>
                        </div>

                        <div className="decrement-button">
                          <button
                            onClick={() => dispatch(decrementQuantity(item._id))}
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <FaCircleMinus />
                          </button>
                        </div>

                        <div className="value">
                          <p>{item.quantity || 1}</p>
                        </div>

                        <div className="increment-button">
                          <button
                            onClick={() => dispatch(incrementQuantity(item._id))}
                            disabled={(item.quantity || 1) >= (item.Product_Quantity || 1)}
                            style={{
                              cursor:
                                (item.quantity || 1) >= (item.Product_Quantity || 1)
                                  ? "not-allowed"
                                  : "pointer",
                              opacity:
                                (item.quantity || 1) >= (item.Product_Quantity || 1)
                                  ? 0.5
                                  : 1,
                            }}
                          >
                            <FaCirclePlus />
                          </button>
                        </div>
                      </div>
                    </div>

                    <hr />

                    <div className="buttons-cart-page">
                      <div className="remove-itme">
                        <button
                          onClick={() => {
                            dispatch(remove(item._id));
                            toast.warn(`${item.Product_Name} deleted from cart`);
                          }}
                        >
                          <MdDeleteForever />
                        </button>
                      </div>

                      <div className="cart-btn">
                        <button
                          onClick={() => {
                            dispatch(addToWishlist(item));
                            toast.success(`${item.Product_Name} added to the wishlist`);
                          }}
                        >
                          <FaHeart /> Wishlist
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}

            <div className="button-oh-mobile-at-cart">
              <div className="cart-total">
                <p className="prize-text">
                  <span><FaIndianRupeeSign /></span> 
                  {(cartTotal).toLocaleString("en-IN")}
                </p>

                <p className="blue" onClick={scrollToBilling}>Show Details</p>
              </div>

              <div className="widht-for-cart-button-place-order btn liquid">
                <button className="red-500" onClick={placeOrderHandler}>
                  Place Order
                </button>
              </div>
            </div>

          </div>

          {/* BILLING SECTION */}
          <div className="right-side-section" id="billing-details">
            <h1>BILLING DETAILS</h1>
            <div className="billing-deatils-css">
              <div className="total-money">
                <p>Cart Total (Excl. of all taxes)</p>
                <p>{(cartTotal).toLocaleString("en-IN")}</p>
              </div>

              <div className="total-money">
                <p>GST</p>
                <p>18% per Product</p>
              </div>

              <div className="total-money">
                <p>Shipping Charge</p>
                <p>Free</p>
              </div>

              <div className="total-money">
                <p>Total Amount for Pay</p>
                <p>{(cartTotal).toLocaleString("en-IN")}</p>
              </div>

              <div className="button-add-to-cart btn liquid">
                <button onClick={placeOrderHandler}>Place Order</button>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="margin-and-padding">
          <div className="main-empty-cart-container">
            <div className="gif-and-content">
              <div className="image-gif">
                <img
                  src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1758193272/cart_akasit.gif"
                  alt="empty-cart"
                />
              </div>

              <div className="content-add-to-cart">
                <h1>Your shopping cart is empty.</h1>
                <p>Please add something soon, carts have feelings too.</p>
              </div>

              <div className="btn btn-add-to-cart">
                <button onClick={() => navigate("/")}>Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
