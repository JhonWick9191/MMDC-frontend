import { useDispatch } from "react-redux";
import { setToken ,setUser } from "../Redux/Slice/AuthSlice";
import { useNavigate } from "react-router-dom";
export default function AdminProfile(){
    const Navigate = useNavigate()
     const dispatch = useDispatch()
    function logoutHandler(){
        console.log("Lougout hander call at admin profile page")    
        
        // remove the user form local storage 

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        //dispatch the new value to the redux

       

        dispatch(setToken(null))
        dispatch(setUser(null))

        Navigate("/login")        
    }
    return(
        <>
        <h1> This is admin Profile page </h1>
        <button onClick={logoutHandler}>Lougout </button>
        </>
    )
}