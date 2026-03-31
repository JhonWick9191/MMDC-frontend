import { useState , useEffect} from "react"
import { useSelector } from "react-redux"

export default function UserQuery() {
      const token = useSelector((state)=> state.auth.token)
      console.log(token)
    const [userQueryData, setUserQueryData] = useState([])
    // api call 

    async function gettingallUserData() {
        try {

            const responce = await fetch("https://musicandmore.co.in/api/v1/user-query", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await responce.json()
            console.log(data)
            setUserQueryData(data.data)
            console.log(userQueryData)            

        } catch (error) {

            console.error(error)
            console.log("getting error while getting all contect details of user ")

        }
    }

    useEffect(()=>{
        gettingallUserData();
    }, [])

    

    return (
        <>
            
              <div className="mmdc-admin-header">
                <h1>User Query</h1>
                
            </div>

            <div className="main-card-for-user-query">

            {
                userQueryData.map((data)=>(
                    <div className="user-query-card">

                        <p>Name : {data.firstName}</p>
                        <p>email : {data.email}</p>
                        <p>Mobile No : {data.phone}</p>
                        <p>Reason : {data.reason}</p>
                        <p>Message : {data.message}</p>

                    </div>

                ))
            }

            </div>
        </>
    )
}