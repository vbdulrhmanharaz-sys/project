// import React from 'react'
import Navbar from "../common/Navbar"
import Footer from "../common/Footer"
import { Outlet, useLocation } from 'react-router-dom'
import QuickNote from './QuickNote'

export default function Layout() {
  const location = useLocation()
  const showQuickNote = !location.pathname.startsWith('/products')

  return (
    <>
    <Navbar />
        <main className="page-main"><Outlet/></main>
        {showQuickNote && <QuickNote />}
    <Footer/>
    </>
  )
}
