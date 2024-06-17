import { FormEvent, useContext, useEffect, useState } from "react";
import { SessionContext } from "../state/state";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../Authentication/API/api";
import { useNavigate } from "react-router";


const Navbar = () => {

    const {session ,setSession} = useContext(SessionContext);

    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const { mutate: logout, data, isPending } = useMutation({
        mutationFn: logoutUser
    })

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setSession({firstName: '',
                _id: '',role: ""})
            navigate("/auth/login");
        }
      }, [data, navigate])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        logout();
    }
  return (
 
  <div className="bg-base-300 shadow-xl rounded-box m-4 p-4 flex items-center relative ">

        <div className="flex-auto flex justify-start text-xl font-bold">Library Management System</div>
       

            {session.firstName?
                <button className="btn bg-transparent border-gray-600 hover:border-gray-600 border-2 font-semibold " onClick={toggleMenu} >
                    < i className="fas fa-user p-1 "/> 
                     <p className=" p-1">{session.firstName}</p>     
                </button> :
                <button className="btn bg-transparent border-gray-600 hover:border-gray-600 border-2 font-semibold " onClick={() => {navigate("auth/login")}} >
                < i className="fas fa-user p-1 "/> 
                <p className=" p-1">Login</p> 
                </button> 
            }

                
                    {isMenuOpen && (
            <div className="absolute right-0 top-full flex-col bg-base-300 rounded-box p-4 m-4 shadow-md items-center animate-fade-in">
                <div className="flex-auto flex justify-center m-2 p-4 cursor-pointer rounded-box hover:bg-base-100 ">View Profile</div>
                <div className="flex justify-center m-2 p-4 cursor-pointer rounded-box hover:bg-base-100">Update Password</div>
                {isPending ? 
                    <>
                        <button className="btn w-full bg-blue-600 text-gray-100 font-semibold hover:bg-blue-500 cursor-not-allowed" onClick={handleSubmit}><span className="loading loading-dots loading-md"></span></button>
                    </> : 
                    <>
                        <button className="btn w-full bg-blue-600 text-gray-100 font-semibold hover:bg-blue-500 " onClick={handleSubmit}>Logout</button>
                    </>
                }
            </div> 
        )}
               
      
  </div>


 
  )
}

export default Navbar
