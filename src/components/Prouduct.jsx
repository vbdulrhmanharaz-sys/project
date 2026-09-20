import  { useEffect, useState } from 'react'
// import Dynamec from './Dynamec'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FiArrowUpRight, FiHeart, FiSearch, FiStar } from 'react-icons/fi'
import { useShopStore } from '../zustand/shopStore'
// import { data } from 'react-router-dom'
import loder from "../assets/icegif-1260.gif"



export default function Prouduct() {
  const endPoint ='https://dummyjson.com/products'
  const naviget =useNavigate()
  const [isPending ,setIsPending] = useState(true)
  const [products ,setProducts] = useState( [] )
    const [proDetails] =useState({})
  const [catogries ,setCatogries] =useState([''])
  const [activeBtn , setActiveBtn] =useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { wishlist, toggleWishlist, addToCart } = useShopStore()


  useEffect(()=>{

    const getProduct =  async ()=>{
      // fetch(endPoint)
      // .then(res=>res.json())
      // .then(data=>console.log(data.products))
      // const res= await fetch(endPoint)
      // const data = await res.json()
      // console.log(data);
  
      const {data} = await axios.get(`${endPoint}?limit=0`);
     
      setProducts(data.products);
      setIsPending(false)
      
    };
  

    const getCatogre = async()=>{
      const {data} = await axios.get(`${endPoint}/categories`)
      setCatogries([...data,{name:"all"}])
      

    }
    getProduct(); 
    getCatogre()


      
  },[] )


  const filtercat = async( cat)=>{
    const categoryName = cat.name || cat
    setActiveBtn(categoryName)
    const url = categoryName==="all" ? `${endPoint}?limit=0` : `${cat.url}?limit=0`
    const {data} = await axios.get(url)
    setProducts(data.products )
  }

  const visibleProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

      
  
  
  
  





  return (
    <>
    <section className='page-shell'>
      <div className='page-heading reveal'><div><p className='eyebrow'>The collection</p><h1>Things to<br />be curious about.</h1></div><p className='content-copy'>Browse a rotating selection of useful, beautiful things. Open any item for the full story.</p></div>
      <div className='discover-toolbar'>
        <div className='product-search'><FiSearch /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder='Search the collection...' aria-label='Search products' /></div>
        <span className='product-count'>{visibleProducts.length} finds</span>
      </div>
      <div className='category-scroller'>
        {
          !catogries.length?(
            <div className='text-center text-muted fw-bold'>
              loding catogre
            </div>
          ):(
            catogries.map((cat,index)=>(
                <div key={index}>
                  <button
                  onClick={()=>filtercat(cat)}
                   className={`category-chip ${activeBtn === (cat.name || cat) ? 'active' : ''}`}>
                     {cat.name || cat}
                  </button>
                </div>
             ) ))
        }

      </div>
      {
        isPending?(
          <div className='d-flex justify-content-center'>
            <img src={loder} style={{width:"100%",height:"100%"} } alt="" />

          </div>
        ):(

          <div className="product-grid stagger-grid" >
            { 
              visibleProducts.map((val)=>(
                <article key={val.id} className='product-card surface'>
                  <div className='product-image-wrap'><img src={val.thumbnail} className='product-image' alt={val.title} /><span className='product-discount'>-{Math.round(val.discountPercentage)}%</span><button className={`product-heart ${wishlist.some((item) => item.id === val.id) ? 'saved' : ''}`} onClick={() => toggleWishlist(val)} aria-label="Toggle wishlist"><FiHeart /></button></div>
                  <div className='product-card-body'><div className='product-meta'><span>{val.category}</span><span><FiStar /> {val.rating}</span></div><h2>{val.title}</h2><p className='product-description'>{val.description}</p><div className='product-footer'><strong>${val.price}</strong><div className='product-actions'><button className='product-link muted-link' onClick={() => addToCart(val)}>Add to cart</button><button className='product-link' onClick={()=>naviget(`${val.id}`)}>View details <FiArrowUpRight /></button></div></div></div>
                </article>
              ))
              }
          </div>)
          }
          {!isPending && !visibleProducts.length && <div className='empty-products surface'>No products match “{searchTerm}”.</div>}
        
    </section>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Title : {proDetails.title}</p>
        <p>Price : {proDetails.price}</p>
        <p>Category: {proDetails.category}</p>
        <p>Description: {proDetails.description}</p>
        
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
      </div>
    </div>
  </div>
</div>

    </>
  )
}
