
const Register = () => {
    const[ user, setUser] = useState({
        firstName:"",
        lastName:"",
        

    })

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex-col bg-base-300 p-4 rounded-box shadow-xl ">
        <div className="justify-self-center m-2 p-4">
            <label className="block text-sm font-semibold mb-2">
                First Name
            </label>
            <input className="shadow border border-gray-600  rounded  bg-base-300 p-2 
                                focus: outline-none focus:border-gray-400 hover:border-gray-400 
                                w-full transition duration-300 ease-in-out" placeholder="First Name"/>
        </div>
        <div className="justify-self-center m-2 p-4">
            <label className="block text-sm font-semibold mb-2">
                First Name
            </label>
            <input className="shadow border border-gray-600  rounded  bg-base-300 p-2 
                                focus: outline-none focus:border-gray-400 hover:border-gray-400 
                                w-full transition duration-300 ease-in-out" placeholder="First Name"/>
        </div>
        <div className="justify-self-center m-2 p-4">
            <label className="block text-sm font-semibold mb-2">
                First Name
            </label>
            <input className="shadow border border-gray-600  rounded  bg-base-300 p-2 
                                focus: outline-none focus:border-gray-400 hover:border-gray-400 
                                w-full transition duration-300 ease-in-out" placeholder="First Name"/>
        </div>
      
      </form>

    </div>
  )
}

export default Register
