import { useQueries, useQuery } from "@tanstack/react-query"
import { getBooks } from "../API"
import ListTemplate from "../../Helpers/ListTemplate";


const BookTab = () => {

   const { data: books, isLoading, isError, error} = useQuery({
    queryFn: getBooks,
    queryKey: ["books"]
   })

   
  return (
    <div className="bg-base-300 p-4 rounded-box shadow-xl w-full mx-4">

       {isLoading ? <span className="loader loading-dots"></span> : <ListTemplate items={books} titles={["Title", "Author", "Total Copies", "Available Copies"]} properties={["title","author","Total_copies","Available_copies"]}/> }

                
              
    </div>
  )
}

export default BookTab
