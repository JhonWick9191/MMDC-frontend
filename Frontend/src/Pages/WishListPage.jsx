import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { FaCirclePlus } from "react-icons/fa6";
import { add } from "../Redux/Slice/Slice";
import { removeFromWishlist } from "../Redux/Slice/WishListSlice";
import { toast } from "react-toastify";
import { setUser } from "../Redux/Slice/AuthSlice";
import { useNavigate } from "react-router-dom";
export default function WishList() {

  const WishList = useSelector((state) => state.Wishlist)
  console.log("the products in wishlist ", WishList)
  const dispatch = useDispatch()
  const Nevigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  

  console.log(user)


  return (
    <>

      {

        WishList.length > 0 ? (

          <div className="wrapper-wishlist-items">
            {WishList.map(items => (
              <div className="wishlist-items" key={items.product_id}>
                <div className="wishlist-product">
                  <div className="image-product">
                    <img src={items.image_01} loading="lazy" />


                    <div className="cross-on-image">
                      <button onClick={() => dispatch(removeFromWishlist(items), toast.success(`${items.Product_Name} is removed form your wishlist`))}> <FaCirclePlus /> </button>
                    </div>
                  </div>


                  <div className="product-details-on-wishlist">
                    <div className="product-name-in-wishlist">
                      <p>{items.Brand_Name}</p>
                    </div>
                    <hr></hr>
                    <div className="company-name-product">
                      <p>{items.Model_number}</p>
                    </div>

                    <p>{items.Product_Name}</p>
                    <hr></hr>

                    <div className="company-name-product">
                      <p>{items.price}</p>
                    </div>



                  </div>
                  <div className="add-to-cart-wishlist">
                    <button onClick={() => {
                      if (user === null) {
                        toast.error("For Add to Cart you Have to login first")

                      } else {
                        toast.success("Item is Added to your cart ")
                        dispatch(add({
                          ...items,
                          cartImage: items.image_01

                        }))
                      }
                    }}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) :
          (
            <div className="margin-and-padding">
              <div className="main-empty-cart-container">
                <div className="gif-and-content">
                  <div className="image-gif">
                    <img src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1758284448/GIFF_ayxqti.gif" alt="empty-cart" />
                  </div>
                  <div className="content-add-to-cart">
                    <h1>Your wishlist is empty.</h1>

                  </div>
                  <div className="btn btn-add-to-cart" onClick={() => Nevigate("/")}>
                    <button >Shop Now</button>
                  </div>
                </div>
              </div>
            </div>

          )
      }


    </>
  )
}