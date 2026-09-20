import axios from "axios";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiCheck, FiStar, FiTruck } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import loader from "../../assets/icegif-1260.gif";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const getProductDetails = async () => {
      const { data } = await axios.get(`https://dummyjson.com/product/${id}`);
      setProduct(data);
      setIsPending(false);
    };
    getProductDetails();
  }, [id]);

  if (isPending) {
    return <div className="page-shell detail-loading"><img src={loader} alt="Loading product" /></div>;
  }

  const selectedImage = activeImage || product.thumbnail;

  return (
    <div className="page-shell product-detail-page">
      <Link className="back-link" to="/products"><FiArrowLeft /> Back to collection</Link>
      <div className="detail-layout">
        <div className="detail-gallery surface">
          <div className="detail-main-image"><img src={selectedImage} className="detail-image" alt={product.title} /></div>
          <div className="detail-thumbnails">
            {product.images?.map((image, index) => (
              <button className={`thumbnail-button ${image === selectedImage ? "selected" : ""}`} key={index} onClick={() => setActiveImage(image)} aria-label={`Show product image ${index + 1}`}>
                <img src={image} className="thumbnail-image" alt={`${product.title} view ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-info surface">
          <div className="detail-category">{product.category}</div>
          <h1>{product.title}</h1>
          <div className="detail-rating"><span><FiStar /> {product.rating}</span><span>{product.reviews?.length || 0} reviews</span></div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-price-row"><strong>${product.price}</strong><span>Save {product.discountPercentage}%</span></div>
          <div className="detail-benefits"><span><FiCheck /> In stock: {product.stock}</span><span><FiTruck /> Ready to ship</span></div>
          <div className="detail-divider" />
          <div className="detail-specs"><div><span>Tags</span><strong>{product.tags?.join(" · ")}</strong></div><div><span>Product ID</span><strong>#{product.id}</strong></div></div>
          <div className="reviews-block"><h2>Customer notes</h2>{product.reviews?.map((review, index) => <div className="review-row" key={index}><div className="review-avatar">{review.reviewerName.charAt(0)}</div><div><strong>{review.reviewerName}</strong><p>{review.comment}</p></div></div>)}</div>
        </div>
      </div>
    </div>
  );
}
