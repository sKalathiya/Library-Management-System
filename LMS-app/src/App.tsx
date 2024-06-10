

import { Outlet } from 'react-router';
import Navbar from './Navbar/Navbar';



function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
