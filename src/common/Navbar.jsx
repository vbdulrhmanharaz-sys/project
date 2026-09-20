import { useContext } from 'react'
import { FiHeart, FiLogOut, FiMoon, FiShoppingBag, FiSun } from "react-icons/fi";
import { NavLink } from 'react-router-dom'
import { userContext } from '../components/context/UserContext';
import { changeContext } from '../components/context/Them';
import { useShopStore } from '../zustand/shopStore';




export default function Navbar() {
  const { userData, logout } = useContext(userContext)
  const { isDark, changeDark } = useContext(changeContext)
  const { wishlist, cart } = useShopStore()

  return (
    <nav className="navbar navbar-expand-lg sticky-top app-nav">
  <div className="container-fluid navbar-inner">
    <NavLink to="/home" className="brand"><span className="brand-mark">N</span>Noura</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto nav-links">
        <li className="nav-item">
          <NavLink to="/home" className="nav-link">Overview</NavLink>
        </li>
         <li className="nav-item">
          <NavLink to="/about" className="nav-link">About</NavLink>
        </li>
         <li className="nav-item">
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
        </li> 
        <li className="nav-item">
          <NavLink to="/products" className="nav-link">Discover</NavLink>
        </li>
         <li className="nav-item">
          <NavLink to="/blogs" className="nav-link">Journal</NavLink>
        </li> 
    
       </ul>
<div className='nav-user'>
  {userData ? <span className="user-chip"><span className="avatar">{userData.name.charAt(0).toUpperCase()}</span>{userData.name}</span> : <div className="guest-actions"><NavLink className="nav-login-link" to="/login">Log in</NavLink><NavLink className="primary-action nav-register-link" to="/register">Create account</NavLink></div>}
<button className="icon-button" onClick={changeDark} aria-label="Toggle theme">{isDark?<FiSun/>:<FiMoon/>}</button>
<NavLink className="nav-counter" to="/wishlist" aria-label="Wishlist"><FiHeart /><span>{wishlist.length}</span></NavLink>
<NavLink className="nav-counter" to="/cart" aria-label="Cart"><FiShoppingBag /><span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span></NavLink>
<button className="icon-button" onClick={logout} aria-label="Sign out"><FiLogOut/></button>
     
</div>
</div>
  </div>
</nav>
  )
}
