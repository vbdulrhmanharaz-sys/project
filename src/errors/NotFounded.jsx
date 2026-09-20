import { Link } from 'react-router-dom'

export default function NotFounded() {
  return (
    <div className='page-shell'><p className='eyebrow'>A wrong turn</p>
      <p className='h1 mb-3'>404</p>
      <p className='content-copy'>This page wandered somewhere else. Let’s get you back to something useful.</p>
      <Link to="/home" className='primary-action'>Back to overview</Link>
      
    </div>
  )
}
