import { useSelector, useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { incrementQuantity, decrementQuantity, remove } from "../Redux/Slice/Slice";
import { addToWishlist } from "../Redux/Slice/WishListSlice";
import { toast } from "react-toastify";

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.Cart);

  // Calculate cart total
  const cartTotal = Cart.reduce(
    (total, item) => total + item.Product_price * (item.quantity || 1),
    0
  );

  // Prepare order data to send to backend
  const orderData = {
    products: Cart,
    totalAmount: cartTotal,
  };

  const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

  async function placeOrderHandler() {
    try {
      const response = await fetch(`${BASE_URL}/orderPlaces`, {
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

  return (
    <>
      {Cart.length > 0 ? (
        <div className="main-wrapper-cart-items">
          {/* List of Cart Items */}
          {Cart.map((item) => (
            <div className="top-class-for-add-to-cart" key={item._id}>
              <div className="main-cart-section-image">
                <div className="product-image">
                  <img src={item.cartImage} alt={item.Product_Name} />
                </div>
                <div className="product-details">
                  <div className="product-details-with-heading-price">
                    <div className="d-p">
                      <div className="product-heading">
                        <p>{item.Brand_Name}</p>
                      </div>
                      <div className="product-model-number">
                        <p>{item.Model_number}</p>
                      </div>
                      <div className="product-model-number">
                        <p>{item.Product_Category}</p>
                      </div>
                      <div className="product-model-number">
                        <p>{item.Product_Name}</p>
                      </div>
                    </div>
                    <div className="pricing">
                      <div className="product-price">
                        <p>
                          <span>
                            <FaIndianRupeeSign />
                          </span>{" "}
                          Price - {item.Product_price * (item.quantity || 1)}
                        </p>
                      </div>
                      <div className="product-price">
                        <p>
                          <span>
                            <FaIndianRupeeSign />
                          </span>{" "}
                          DP - {item.Vendor_price * (item.quantity || 1)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="quantity">
                    <div className="wrapper-main-counter">
                      <div className="main-quantity">
                        <p>Quantity</p>
                      </div>
                      <div className="decrement-button">
                        <button
                          onClick={() => dispatch(decrementQuantity(item._id))}
                          disabled={item.quantity <= 1}
                        >
                          <FaCircleMinus />
                        </button>
                      </div>
                      <div className="value">
                        <p>{item.quantity}</p>
                      </div>
                      <div className="increment-button">
                        <button
                          onClick={() => dispatch(incrementQuantity(item._id))}
                          disabled={item.quantity >= item.Product_Quantity}
                          style={{
                            cursor:
                              item.quantity >= item.Product_Quantity
                                ? "not-allowed"
                                : "pointer",
                            opacity:
                              item.quantity >= item.Product_Quantity ? 0.5 : 1,
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
                          toast.success(
                            `${item.Product_Name} added to the wishlist`
                          );
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

          {/* Billing Section */}
          <div className="right-side-section">
            <h1>BILLING DETAILS</h1>
            <div className="billing-deatils-css">
              <div className="total-money">
                <p>Cart Total (Excl. of all taxes)</p>
                <p>{cartTotal}</p>
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
                <p>{cartTotal}</p>
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
