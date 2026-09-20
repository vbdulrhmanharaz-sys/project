import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'

export default function ChildTwo() {
    const naviget =useNavigate()
  return (
    
    <div className='page-shell position-relative'>
       <p className='eyebrow'>You made it</p><p className='h1'>A thought, completed.</p>
      <p className='content-copy'>Some paths do not need to be long to be worth taking.</p>
        <button onClick={()=>naviget(-1)} className='btn btn-info position-absolute ' style={{top:"30px ",left:"20px",color:"#fff", padding:"3px 16px", fontSize:"22px"}} ><IoArrowBack/></button>
    </div>
  )
}
