import { FiArrowRight, FiHeart, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useShopStore } from "../zustand/shopStore";

function ProductRow({ product, action }) {
  return <article className="shop-product-row"><img src={product.thumbnail} alt={product.title} /><div className="shop-product-info"><span>{product.category}</span><h2>{product.title}</h2><strong>${product.price}</strong></div>{action}</article>;
}

export function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useShopStore();
  return <div className="page-shell shop-page"><div className="page-heading reveal"><div><p className="eyebrow">Saved for later</p><h1>Your wishlist.</h1></div><p className="content-copy">Keep the things that caught your eye in one quiet place.</p></div>{wishlist.length ? <div className="shop-list stagger-grid">{wishlist.map((product) => <ProductRow key={product.id} product={product} action={<div className="shop-row-actions"><button className="secondary-action" onClick={() => addToCart(product)}>Add to cart</button><button className="icon-button" onClick={() => toggleWishlist(product)} aria-label={`Remove ${product.title} from wishlist`}><FiTrash2 /></button></div>} />)}</div> : <EmptyState icon={<FiHeart />} title="Your wishlist is empty" text="Save a product from Discover and it will appear here." link="/products" label="Explore products" />}</div>;
}

export function Cart() {
  const { cart, updateQuantity, removeFromCart } = useShopStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <div className="page-shell shop-page"><div className="page-heading reveal"><div><p className="eyebrow">Ready when you are</p><h1>Your cart.</h1></div><p className="content-copy">A simple list of what you want to bring into your world.</p></div>{cart.length ? <div className="cart-layout"><div className="shop-list stagger-grid">{cart.map((product) => <ProductRow key={product.id} product={product} action={<div className="cart-actions"><div className="quantity-control"><button onClick={() => updateQuantity(product.id, product.quantity - 1)} aria-label="Decrease quantity"><FiMinus /></button><span>{product.quantity}</span><button onClick={() => updateQuantity(product.id, product.quantity + 1)} aria-label="Increase quantity"><FiPlus /></button></div><button className="icon-button" onClick={() => removeFromCart(product.id)} aria-label={`Remove ${product.title} from cart`}><FiTrash2 /></button></div>} />)}</div><aside className="cart-summary surface"><p className="eyebrow">Summary</p><h2>Almost yours.</h2><div><span>Items</span><strong>{cart.reduce((sum, item) => sum + item.quantity, 0)}</strong></div><div><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div><button className="primary-action" type="button">Continue <FiArrowRight /></button></aside></div> : <EmptyState icon={<FiShoppingBag />} title="Your cart is empty" text="Find something useful and bring it here." link="/products" label="Start exploring" />}</div>;
}

function EmptyState({ icon, title, text, link, label }) {
  return <div className="empty-shop surface"><span className="feature-icon">{icon}</span><h2>{title}</h2><p>{text}</p><Link to={link} className="primary-action">{label} <FiArrowRight /></Link></div>;
}
