import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5"

export default function ChildOne() {
    const navigt = useNavigate()
    const naviget =useNavigate()
  return (
    <div className='page-shell position-relative'>
      <p className='eyebrow'>A little further</p><p className='h1'>The next chapter.</p>
      <p className='content-copy'>A smaller branch of the Noura experience, made for following a thought wherever it leads.</p>
      <button onClick={()=>navigt("Childtwo")} className='primary-action'>Continue to the next chapter</button>
        <button onClick={()=>naviget(-1)} className='btn btn-info position-absolute ' style={{top:"30px ",left:"20px",color:"#fff", padding:"3px 16px", fontSize:"22px"}} ><IoArrowBack/></button>
        
        
    </div>
    
  )
}
