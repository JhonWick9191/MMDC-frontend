import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken } from "../Redux/Slice/AuthSlice";
import { setUser } from "../Redux/Slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import AdminProfile from "./AdminProfile";
import VendorProfile from "./UserProfile";

function Profile(){
    const Navigate = useNavigate()
    const user = useSelector((state)=> state.auth.user)
    
    const dispatch = useDispatch()    
    console.log(user)
    console.log("this user is print from profile.jsx")


    function lougoutHander(){

    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    dispatch(setToken(null));
    dispatch(setUser(null));
    
    Navigate("/login")
    console.log("Button is Clicked")

    }

    
    if (!user) {
        // Agar user null hai, koi bhi profile component render na karo
        return null;
    }
    return(

        <>
   
    {
        user.role === "Admin" ? (
            <AdminProfile data={user}/>

        ):(
            <VendorProfile  data={user}/>
        )
    }

        </>
            
    )
}

export default  Profile;