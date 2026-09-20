import img from "../assets/3e968a8cc7d284ce5dcead320705f023.png"

export default function Landing() {
  return (
    <section>
    <p className='m-0 h1'> wellcom to the Landing Page</p>
    <img src= {img} className='rounded-circle shadow-lg ' width={70} height={70} style={{objectFit:"cover"}} alt="" />
</section>
  )
}
