
export default function Dynamec({page ,children}) {
  return (
    <>
        <p className='h2'> This Is {page} Page</p> 
        <p className='m-0 h3'>Session About Routing </p>
        <p className='fs-5'>Lorem ipsum dolor sit amet, consectetur</p>
        {children}
    </>
  )
}
