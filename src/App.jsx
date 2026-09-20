// import React from 'react'
import Home from "./components/Home"
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Layout from "./components/Layout"
import About from './components/About'
import Prouduct from './components/Prouduct'
import Contact from './components/Contact'
import Blogs from './components/Blogs'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import NotFounded from './errors/NotFounded'
import ChildOne from './components/ChiledPath/ChildOne'
import ChildTwo from './components/ChiledPath/ChildTwo'
import ProductDetails from './components/productDetalils/ProductDetails'
import { useContext } from "react"
import { changeContext } from "./components/context/Them"
import { userContext } from "./components/context/UserContext"
import { Navigate } from "react-router-dom"
import Auth from "./components/Auth"
import { Cart, Wishlist } from "./components/ShopPages"

function ProtectedShopPage({ children }) {
  const { userData } = useContext(userContext)
  return userData ? children : <Navigate to="/login" replace />
}

export default function App() {
  const {isDark} =useContext(changeContext)
  const { userData } = useContext(userContext)



  const routing = createBrowserRouter([
    { path: "/login", element: userData ? <Navigate to="/home" replace /> : <Auth mode="login" /> },
    { path: "/register", element: userData ? <Navigate to="/home" replace /> : <Auth mode="register" /> },
    {
      path:"/", 
    element:<Layout />,
      children:[   
          {index: true, element:<Navigate to="/home" replace />},
          {path:'home' , element:<Home/>},
          {path:'about',element:<About/>},
          {path:'blogs',element:<Blogs/>},
          {path:'*',element:<NotFounded/>},
          {path:'contact',element:<Contact/>},
          {path:'contact/childone',element:<ChildOne/>},
          {path:'contact/childone/Childtwo',element:<ChildTwo/>},
          {path:'products',element:<Prouduct/>},
          {path:'products/:id',element:<ProductDetails/>},
          {path:'wishlist',element:<ProtectedShopPage><Wishlist/></ProtectedShopPage>},
          {path:'cart',element:<ProtectedShopPage><Cart/></ProtectedShopPage>},



     ]
    }
  ], {
    basename: import.meta.env.PROD ? "/project" : "/",
  })



  return (
   <div className={`${isDark? "dark":''} `}>
     <RouterProvider router={routing}/>
   </div>
    
  )
}
