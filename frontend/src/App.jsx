import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import First from './Pages/First';
import SendMessage from './Pages/SendMessage';
import Admin from './Pages/Admin';
import AllMessages from './Pages/AllMessages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <First/>,
    children: [
      {
        index:true,
        element:<SendMessage/>
      },
      {
        path:'/SendMessage',
        element:<SendMessage/>
      },
      {
        path:'/Admin',
        element:<Admin/>
      },
      {
        path:'/AllMessages',
        element:<AllMessages/>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
