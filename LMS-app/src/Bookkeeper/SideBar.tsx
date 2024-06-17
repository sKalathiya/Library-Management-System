import { useNavigate } from "react-router"



const SideBar = () => {

  const navigate = useNavigate();
  return (
    <div className="bg-base-300 shadow-xl rounded-box ml-4 p-4 flex-col flex font-semibold sticky top-0">

        <div className="p-4 m-2 rounded-box hover:bg-base-100 cursor-pointer self-center w-full text-center">Dashboard</div>

        <div className=" text-l p-4 m-2 rounded-box hover:bg-base-100 cursor-pointer self-center w-full text-center" onClick={()=> navigate("booktab")}>Books</div>
  </div>
  )
}

export default SideBar
