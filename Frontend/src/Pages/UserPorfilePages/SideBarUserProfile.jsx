import { useNavigate } from "react-router-dom"
export default function SideBadr(){
    const Nevigate = useNavigate()
    return(
        <>

        <div>
           <nav>
            <ul>
                <li onClick={()=>Nevigate("/")}>Profile</li>
                <li onClick={()=> Nevigate("/yourProducts")}>Products</li>
                <li >Log out </li>
            </ul>
           </nav>
        </div>
        
        </>
    )
}