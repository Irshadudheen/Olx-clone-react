import React from 'react'
import Header from '../../components/Header/Header'
import './Home.css'
import Banner from '../../components/Banner/Banner'
import Posts from '../../components/Posts/Posts'
import Footer from '../../components/Footer/Footer'
const Home = () => {
  return (
    <div className='homeParentDiv'>
    <Header/>
    <Banner/>
    <Posts/>
    <Footer/>
    </div>

  )
}

export default Home
