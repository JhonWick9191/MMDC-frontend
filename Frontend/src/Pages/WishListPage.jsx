import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { FaCirclePlus} from "react-icons/fa6";
import { add  } from "../Redux/Slice/Slice";

import { removeFromWishlist } from "../Redux/Slice/WishListSlice";
import { toast } from "react-toastify";

export default function WishList(){
     const WishList = useSelector((state)=>state.Wishlist)
     const dispatch = useDispatch()

     function removeToWistlist(){
        
     }
     
    return(
        <>

       {

        WishList.length > 0 ?(

              <div className="wrapper-wishlist-items">
                   {WishList.map(items =>(
            <div className="wishlist-items" key={items.id}>
               <div className="wishlist-product">
                <div className="image-product">
                    <img src={items.image}/>

                    
                <div className="cross-on-image">
                    <button onClick={()=> dispatch(removeFromWishlist(items.id) , toast.success(`${items.name} is removed form your wishlist`) ) }> <FaCirclePlus /> </button>
                 </div>
                </div>


                <div className="product-details-on-wishlist">
                    <div className="product-name-in-wishlist">
                        <p>{items.name}</p>

                    </div>
                    <hr></hr>
                    <div className="company-name-product">
                        <p>{items.model}</p>
                    </div>
                    <hr></hr>

                     <div className="company-name-product">
                        <p>{items.price}</p>
                    </div>

                  

                </div>
                  <div className="add-to-cart-wishlist">
                        <button onClick={()=>dispatch(add(items))}>Add to Cart</button>
                    </div>
               </div>
            </div>
        ))}
            </div>
        ):
        (
            <div className="margin-and-padding">
          <div className="main-empty-cart-container">
            <div className="gif-and-content">
              <div className="image-gif">
                <img src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1758284448/GIFF_ayxqti.gif" alt="empty-cart" />
              </div>
              <div className="content-add-to-cart">
                <h1>Your shopping cart is empty.</h1>
                <p>Please add something soon, carts have feelings too.</p>
              </div>
              <div className="btn btn-add-to-cart">
                <button onClick={() => Navigate("/")}>Shop Now</button>
              </div>
            </div>
          </div>
        </div>
            
        )
       }
     

        </>
    )
}