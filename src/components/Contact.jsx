import { useState } from "react"
import img from "../assets/IMG_20231122_215149_476.jpg"
import { FiArrowUpRight, FiCheck, FiClock, FiMail, FiMessageCircle } from 'react-icons/fi'


export default function Contact() {
  const [isSent, setIsSent] = useState(false)

  const submitMessage = (event) => {
    event.preventDefault()
    setIsSent(true)
    event.currentTarget.reset()
  }

  return (
    <div className="page-shell"><div className="page-heading reveal"><div><p className="eyebrow">Let’s talk</p><h1>Good questions<br />welcome here.</h1></div><p className="content-copy">Tell us what you are building, learning, or looking for. We read every message and usually reply within a day.</p></div><div className="contact-grid stagger-grid"><article className="surface contact-card"><img src={img} alt="Noura team" /><h3>Start a conversation</h3><p>hello@noura.studio</p></article><article className="surface contact-card"><span className="feature-icon"><FiMessageCircle /></span><h3>Share an idea</h3><p>We are always open to thoughtful collaboration.</p></article><article className="surface contact-card"><span className="feature-icon"><FiMail /></span><h3>Send a note</h3><p>Our inbox is a quiet place. No bots, no maze.</p></article><article className="surface contact-card contact-status"><span className="status-dot" /><div><h3>We are online</h3><p><FiClock /> Usually reply within 24 hours</p></div></article></div><section className="contact-form-section surface reveal"><div className="form-intro"><p className="eyebrow">Your turn</p><h2>Tell us what’s on your mind.</h2><p>Choose a topic and send a short note. We’ll take it from there.</p><a className="secondary-action" href="mailto:hello@noura.studio">Email directly <FiArrowUpRight /></a></div><form className="contact-form" onSubmit={submitMessage}><div className="form-row"><label>Name<input name="name" type="text" placeholder="Your name" required /></label><label>Email<input name="email" type="email" placeholder="you@example.com" required /></label></div><label>What can we help with?<select name="topic" defaultValue=""><option value="" disabled>Select a topic</option><option>General hello</option><option>Collaboration</option><option>Product question</option><option>Feedback</option></select></label><label>Message<textarea name="message" placeholder="Write your message..." minLength={10} required /></label>{isSent && <p className="form-success"><FiCheck /> Message saved. We’ll get back to you soon.</p>}<button className="primary-action" type="submit">Send message <FiArrowUpRight /></button></form></section></div>
  )
}
  