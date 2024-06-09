import {QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './state';
import { Outlet } from 'react-router';
import Navbar from './Navbar/Navbar';

const queryClient  = new QueryClient({
  defaultOptions: {
    queries: {
      
    }
  }
});


// async function fetchUserData() {
//   const response = await fetch('/api/user');
//   const data = await response.json();
//   return data;
// }
function App() {
 
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar/>
        <Outlet/>
      </QueryClientProvider>
    </UserProvider>
    
  )
}

export default App
