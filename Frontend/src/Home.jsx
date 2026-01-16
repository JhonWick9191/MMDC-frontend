
import MainPoster from "./Components/MainPoster"
import TopProducts from "./Components/TopProduct"
import OurProducts from "./Components/OurTraindingProducts"
import RotatingLogo from "./Components/RoatingLogo"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
export default function Home(){
    function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;

}


    return(
        <>

        {/* <ScrollToTop/> */}
        <MainPoster/>       
        <TopProducts/>   
        <OurProducts/>  
        <RotatingLogo/> 
       
           
        
    
        </>
    )
}