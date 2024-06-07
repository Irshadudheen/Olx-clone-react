import React, { useEffect,useState ,useContext} from 'react';
import { db } from '../../firebase/config';
import {collection,getDocs} from 'firebase/firestore'
import { PostContext } from '../../Context/PostContext';
import './Posts.css';

import Heart from '../../assets/Heart';
import { useNavigate } from 'react-router-dom';
function Posts() {
  const [products,setProducts] = useState([]);
  const { setProductdetails } = useContext(PostContext);
  const navigate =useNavigate();
 const handleClick = (product)=>{
  try {
    setProductdetails(product);
    navigate(`/product/${product.id}`);
    
  } catch (error) {
    
  }
 }
  useEffect(()=>{
    const addProduct = async ()=>{
      try {
        const querySnapshot = await getDocs(collection(db,"products"))
        const productData = querySnapshot.docs.map(doc=>({
          id:doc.id,
          ...doc.data()
      }))
     

      setProducts(productData);
      } catch (error) {
        alert(error.message)
        
      }
    }
    addProduct()

  })
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {products.map(product=>(
       <div className='card'  onClick={() => handleClick(product)}>
       <div className="favorite">
               <Heart></Heart>
             </div>
             <div className="image">
               <img src={product.imageurl} alt={product.name} />
             </div>
             <div className="content">
               <p className="rate">{product.price}</p>
               <span className="kilometer">{product.category}</span>
               <p className="name">{product.name}</p>
             </div>
             <div className="date">
               <span>{new Date(product.createdAt).toLocaleDateString()}</span>
             </div>
     </div>
      ))}
        
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.map(product=>(
       <div className='card' onClick={() => handleClick(product)}>
       <div className="favorite">
               <Heart></Heart>
             </div>
             <div className="image">
               <img src={product.imageurl} alt={product.name} />
             </div>
             <div className="content">
               <p className="rate">{product.price}</p>
               <span className="kilometer">{product.category}</span>
               <p className="name"> {product.name}</p>
             </div>
             <div className="date">
               <span>Tue May 04 2021</span>
             </div>
     </div>
      ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
