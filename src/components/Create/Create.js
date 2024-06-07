import React, { useEffect, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { storage,db } from '../../firebase/config';
import { collection,addDoc } from "firebase/firestore";
import {ref,getDownloadURL,uploadBytes} from "firebase/storage"
import { useNavigate } from 'react-router-dom'; 
import { auth } from '../../firebase/config';
import {onAuthStateChanged} from 'firebase/auth'

const Create = () => {
  const [image,setImage]=useState(null)
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price ,setPrice]=useState(0)
  const [location,setLocation] = useState('')
  const [userid,setUserId]=useState('')
  const navigate = useNavigate()
useEffect(()=>{
  onAuthStateChanged(auth,async (user)=>{
    setUserId(user.uid)
    
  })
})
  const productUpload= async ()=>{
    try {
      if(name.trim().length<4){
        return alert('pls enter the name atlest 4 char')
      }
      if(category.trim().length<4){
        return alert('pls enter the category atlest 4 char')
      }
      if(price===0){
        return alert('pls enter the price atlest 1')
      }
      if(location.trim().length===4){
        return alert('pls enter the location atlest 1')
      }
      if(!image){
        return alert('pls add image')
      }
      const storageref = ref(storage,"image/" + image.name)
   
      await uploadBytes(storageref,image)
      const url = await getDownloadURL(storageref)
      const date = new Date()
      await addDoc(collection(db,'products'),{
        name,
        category,
        price,
        location,
        imageurl:url,
        createdAt:date.toString(),
        userid
    })
            setName('')
            setCategory('')
            setPrice(0)
            setLocation('')
            navigate('/');
      
    } catch (error) {
      console.log(error.message)
      alert(error.message)
      
    }
  }
  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e)=>setName(e.target.value)}
          
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
             
            />
            <br/>
            <label htmlFor='location'>location</label>
            <br />
            <input type="text" className='input'  id='location' name='location' onChange={(e)=>setLocation(e.target.value)} />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
            onChange={(e)=>setPrice(e.target.value)}
            type="number" id="fname" name="Price" />
            <br />
          </form>
          <br />
       { image?  <img alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)}></img>:<></>}
          <form>
            <br />
            <input type="file" onChange={(event)=>setImage(event.target.files[0])} accept='image/*' />
            <br />
            <button className="uploadBtn" onClick={(e)=>{e.preventDefault();productUpload()}}>upload and Submit</button>
          </form>
        </div>
      </card>
    </>
  );
};

export default Create;
