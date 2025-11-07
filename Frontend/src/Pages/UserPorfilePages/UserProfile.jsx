import { useDispatch } from "react-redux"
import { setToken ,setUser } from "../../Redux/Slice/AuthSlice"
import { useNavigate } from "react-router-dom"
import SideBadr from "./SideBarUserProfile"

import "./UserProfile.css"
export default function VendorProfile(){

    const dispatch = useDispatch()
    const Neviagte = useNavigate()
    // const user = useSelector((state) => state.auth.user)
    // const token = useSelector((state)=> state.auth.token)

    function logoutHandler(){
        console.log("This is loug out handler ")      

        //dispatch the empty redux

        dispatch(setToken(null));
        dispatch(setUser(null))

        // use nevigate after lougout 
        Neviagte("/")          
    }
    return(
        <>
        <div className="main-dashboard-page">

            <div className="side-bar-for-user-profile">
                <SideBadr/>
            </div>          

        </div>
        
      
        </>
    )
}