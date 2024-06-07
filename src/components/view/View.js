import React,{useContext} from 'react';
import './View.css';
import Header from '../Header/Header';
import { PostContext } from '../../Context/PostContext';



function View() {
    const { productdetails } = useContext(PostContext);

  

  return (
    <>
    <Header/>
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={productdetails.imageurl}
          alt="Yamaha R15V3"
          />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {productdetails.price}</p>
          <span>{productdetails.name}</span>
          <p>{productdetails.category}</p>
          <span>{new Date(productdetails.createdAt).toLocaleDateString()}</span>
        </div>
        {/* <div className="contactDetails">
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div> */}
      </div>
    </div>
          </>
  );
}

export default View;
