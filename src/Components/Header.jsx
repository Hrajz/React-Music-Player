import React, { useState } from 'react';
import { RiSearch2Line } from "react-icons/ri";
import { Link} from 'react-router-dom';
import './Header.css';

const Header = ({searchedInput,handleSearchInput,updateSearchBoolean,searchbar,setSearchBar}) => {

  const updateSeachFunction = () =>{
    searchbar ? setSearchBar(false) : setSearchBar(true);
  }

  return (
    <div >
      <div className='navi' >

        <Link to={'/'} style={{ textDecoration: 'none', color:'black', display:'flex'}}><img className="image" src="image/Picsart_24-04-12_23-15-39-290.png" alt="logo" />
        <p>ₖᵤcₕᵢ ₖₒₒ</p>
        </Link>
        <ol className="left">
        <Link to={'/'} style={{ textDecoration: 'none'}}><li className="item">Music</li></Link>
        <Link to={'/artist'} style={{ textDecoration: 'none'}}><li className="item">Artists</li></Link>
        </ol>
        <div className={`searchButton ${searchbar ? "searchButtonUpdate" : ""}`}>
          <input id='search' type="search" value={searchedInput || ''} onChange={handleSearchInput} onFocus={updateSearchBoolean} placeholder="Search" />
        </div>
        <ol className="right">
            <li className="item">Music Language</li>
        </ol>
        <div className='searchicon' onClick={updateSeachFunction}>
          <RiSearch2Line size={23}/>
        </div>
      </div>
    </div>
  )
}

export default Header;
