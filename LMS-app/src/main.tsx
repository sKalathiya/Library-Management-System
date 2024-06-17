import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from './state/state'
const queryClient  = new QueryClient({
  defaultOptions: {
    queries: {
      
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionProvider>
    <QueryClientProvider client={queryClient}>
     <RouterProvider router={router} />
    </QueryClientProvider>
    </SessionProvider>
  </React.StrictMode>,
)
