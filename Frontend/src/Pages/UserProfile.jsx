import { useSelector ,useDispatch } from "react-redux"
import { setToken ,setUser } from "../Redux/Slice/AuthSlice"
import { useNavigate } from "react-router-dom"
export default function VendorProfile(){
    const dispatch = useDispatch()
    const Neviagte = useNavigate()
    // const user = useSelector((state) => state.auth.user)
    // const token = useSelector((state)=> state.auth.token)

    function logoutHandler(){
        console.log("This is loug out handler ")
        localStorage.removeItem("token");
        localStorage.removeItem("user")

        //dispatch the empty redux

        dispatch(setToken(null));
        dispatch(setUser(null))

        // use nevigate after lougout 

        Neviagte("/")
        


        
    }
    return(
        <>
        <h1>This is Vendor Profile </h1>
        <button onClick={logoutHandler}>Log out </button>
        </>
    )
}