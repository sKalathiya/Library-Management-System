import { useState } from "react";


const Navbar = () => {

    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

  return (
 
  <div className="bg-base-300 shadow-xl rounded-box m-4 p-4 flex items-center relative">

        <div className="flex-auto flex justify-start text-xl font-bold">Library Management System</div>
       
          
                <div className=" p-2 flex justify-end items-center font-semibold transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer rounded-box border" onClick={toggleMenu} >
                    < i className="fas fa-user p-1 "/> 
                    <p className=" p-1">Sahil</p> 
                    </div>
                    {isMenuOpen && (
            <div className="absolute right-0 top-full flex-col bg-base-300 rounded-box p-4 shadow-md items-center animate-fade-in">
                <div className="flex-auto flex justify-center m-2 p-4 cursor-pointer rounded-box hover:bg-base-100 ">View Profile</div>
                <div className="flex justify-center m-2 p-4 cursor-pointer rounded-box hover:bg-base-100">Update Password</div>
                <div className="flex justify-center items-center m-2 p-4 rounded-box  cursor-pointer hover:border">Logout</div>
            </div> 
        )}
               
      
  </div>


 
  )
}

export default Navbar
