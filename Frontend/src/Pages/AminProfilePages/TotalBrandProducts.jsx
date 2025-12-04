const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;
export default function TotalBrands(){

    async function totalProducts(){

        try{

            const responce = await fetch(`${BASE_URL}/totalCountBrandsAndProducts`)
            const result = responce.json();
            console.log(result)

        }catch(error){
            console.log("Getting error while fetching the total product data ")
        }
        
    }
    return(
        <>
        
        

        </>
    )
}