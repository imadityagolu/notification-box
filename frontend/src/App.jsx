import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import First from './Pages/First';
import SendMessage from './Pages/SendMessage';
import Admin from './Pages/Admin';
import AllMessages from './Pages/AllMessages';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <First/>,
    children: [
      {
        index:true,
        element:<Login/>
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
      },
      {
        path:'/Login',
        element:<Login/>
      },
      {
        path:'/Signup',
        element:<Signup/>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
