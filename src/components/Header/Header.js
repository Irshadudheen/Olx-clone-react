import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { logOut } from '../../firebase/config';
function Header() {

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage" onClick={logOut} >
          <span>Log out</span>
          <hr />
        </div>

        <Link to={`/create`} className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent" >
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
