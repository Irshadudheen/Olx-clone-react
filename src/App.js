import React,{useEffect} from 'react'

import Home from './Pages/Home/Home'
import { Routes,Route ,useNavigate,useLocation} from 'react-router-dom'
import Login from './Pages/Login/Login'
import Create from './Pages/Create/Create'
import {auth} from './firebase/config'
import {onAuthStateChanged} from 'firebase/auth'
import View from './components/view/View'
import { Postcontextprovider } from './Context/PostContext';

const App = () => {
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      if(!user){
        console.log('Logged Out');
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
      else {
        if (location.pathname === '/login') {
          navigate('/');
        }
        
      }
    })
  })

  return (
    <div>



<Postcontextprovider>
      <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/product/:id' element={<View/>}/>
      </Routes>
      </Postcontextprovider>
    </div>
  )
}

export default App
