import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import img from "../assets/IMG_20240410_170600_564.jpg"
import { FiArrowUpRight, FiBookOpen, FiCheck, FiCompass, FiHeart, FiLayers, FiSmile, FiStar } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../components/context/UserContext'
import { useShopStore } from '../zustand/shopStore'

export default function Home() {
  const {userData} =useContext(userContext)
  const displayName = userData?.name || 'curious mind'
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('noura-focus')) || []
    } catch {
      return []
    }
  })
  const focusSteps = ['Explore one new find', 'Read a journal note', 'Write down one idea']
  const toggleStep = (step) => {
    const nextSteps = completedSteps.includes(step)
      ? completedSteps.filter((item) => item !== step)
      : [...completedSteps, step]
    setCompletedSteps(nextSteps)
    localStorage.setItem('noura-focus', JSON.stringify(nextSteps))
  }
  const progress = Math.round((completedSteps.length / focusSteps.length) * 100)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const { wishlist, toggleWishlist, addToCart } = useShopStore()
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=8').then(({ data }) => setFeaturedProducts(data.products))
  }, [])

  return (
    <div className="page-shell">
      <section className="hero">
        <div className="reveal">
          <p className="eyebrow">Good to see you, {displayName}</p>
          <h1>A little more <em>room</em> to think.</h1>
          <p className="hero-copy">Noura brings your daily discoveries into one calm, considered space. Browse something new, keep learning, and follow your curiosity.</p>
          <div className="hero-actions"><Link className="primary-action" to="/products">Explore collection <FiArrowUpRight /></Link><Link className="secondary-action" to="/about">Our approach</Link></div>
          <div className="stats-row"><div className="stat"><strong>240+</strong><span>curated finds</span></div><div className="stat"><strong>12 min</strong><span>average read</span></div><div className="stat"><strong>1 place</strong><span>for your ideas</span></div></div>
        </div>
        <div className="hero-visual reveal-side"><img src={img} alt="A calm workspace" /><div className="hero-badge">Small discoveries can change the shape of a day.</div></div>
      </section>
      <div className="feature-grid stagger-grid">
        <article className="surface feature-card"><span className="feature-icon"><FiCompass /></span><h3>Find your next thing</h3><p>A focused collection that makes browsing feel intentional again.</p></article>
        <article className="surface feature-card"><span className="feature-icon"><FiLayers /></span><h3>Keep it together</h3><p>Follow details, save context, and return whenever you have a minute.</p></article>
        <article className="surface feature-card"><span className="feature-icon"><FiSmile /></span><h3>Make it yours</h3><p>Choose light or dark mode and shape your space around your rhythm.</p></article>
      </div>
      <section className="overview-focus surface reveal">
        <div className="focus-intro"><div className="focus-icon"><FiBookOpen /></div><p className="eyebrow">A small intention</p><h2>Today’s focus</h2><p>Three simple steps to make your visit count. No pressure, just momentum.</p><div className="focus-progress"><span style={{width: `${progress}%`}} /></div><strong>{progress}% complete</strong></div>
        <div className="focus-steps">{focusSteps.map((step) => <button className={`focus-step ${completedSteps.includes(step) ? 'completed' : ''}`} key={step} onClick={() => toggleStep(step)}><span className="step-check">{completedSteps.includes(step) && <FiCheck />}</span><span>{step}</span><FiArrowUpRight /></button>)}</div>
      </section>
      <section className="overview-products showcase-stage reveal">
        <div className="showcase-background" aria-hidden="true"><div className="showcase-track">{[...featuredProducts, ...featuredProducts].map((product, index) => <div className="showcase-tile" key={`${product.id}-${index}`}><img src={product.thumbnail} alt="" /></div>)}</div></div>
        <div className="section-heading"><div><p className="eyebrow">Picked for you</p><h2>More good places to start.</h2></div><Link className="secondary-action" to="/products">View all <FiArrowUpRight /></Link></div>
        <div className="overview-product-grid">{featuredProducts.map((product) => <article className="overview-product surface" key={product.id}><div className="overview-product-image"><img src={product.thumbnail} alt={product.title} /><button className={`product-heart ${wishlist.some((item) => item.id === product.id) ? 'saved' : ''}`} onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist"><FiHeart /></button></div><div className="overview-product-body"><div><span>{product.category}</span><span><FiStar /> {product.rating}</span></div><h3>{product.title}</h3><strong>${product.price}</strong><div className="overview-product-actions"><button className="product-link" onClick={() => addToCart(product)}>Add to cart <FiArrowUpRight /></button><button className="product-link" onClick={() => navigate(`/products/${product.id}`)}>View details <FiArrowUpRight /></button></div></div></article>)}</div>
      </section>
    </div>
  )
}
