import { Outlet } from "react-router"
import SideBar from "./SideBar"


const BookKeeper = () => {
   
  return (
    <div className=" flex ">
    <SideBar />
    <Outlet/>
    </div>
    
  )
}

export default BookKeeper
