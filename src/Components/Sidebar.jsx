import React, {useState} from 'react'
import Header from './Header';
import music from "./music.json"
import { Link} from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NewRelease from './NewRelease.jsx';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHeart, FaHistory } from "react-icons/fa";
import { IoIosAlbums } from "react-icons/io";
import { PiGlobeStandFill } from "react-icons/pi";
import { MdOutlineManageAccounts } from "react-icons/md";
import './Sidebar.css'


const Sidebar = () => {

    const [SidebarDisplay,setSidebarDisplay] = useState(false);
    const [searchedInput,setSearchedInput] = useState('')
    const [searchBoolean,SetSearchBoolean] = useState(false);
    const [searchbar,setSearchBar] = useState(false);
    const updateSearchBoolean = () => {
        SetSearchBoolean(true)
    }

  const handleSearchInput = (e) => {
    setSearchedInput(e.target.value)
  }

    let searchlist = []
    let data;
    for (let key in music) {
        if (music.hasOwnProperty(key)) {
            data = music[key];
        }
        const param = data
        if((param.name.toLowerCase().includes(searchedInput.toLowerCase()) || param.artistName.toLowerCase().includes(searchedInput.toLowerCase())) && searchedInput !==''){
        searchlist.push(param)
        }
    }
    
    const updateSidebarDisplay = () =>{
      if(window.innerWidth<800){
        SidebarDisplay ? setSidebarDisplay(false) : setSidebarDisplay(true);
      }
    }

  return (
    <>
      <Router>
        <Header searchedInput={searchedInput} handleSearchInput={handleSearchInput} updateSearchBoolean={updateSearchBoolean}
        searchbar = {searchbar}
        setSearchBar = {setSearchBar}/>
        
        <div className='Hamburgericon' onClick={updateSidebarDisplay}>
          <GiHamburgerMenu size={20}/>
        </div>
        <div onClick={() => {
        SetSearchBoolean(false);setSearchedInput('');setSearchBar(false);
        }}>
        <div className={`sidebar-js ${SidebarDisplay? "displayed" : ""}`}>        
              <div className={`sideshow ${SidebarDisplay ? "sideshow" : "hide"}`} onClick={updateSidebarDisplay}>
                <p>BROWSE</p>
                <Link to={'/new-release'} style={{ textDecoration: 'none' }}><li className="browse">New Release</li></Link>
                <Link to="top-charts" style={{ textDecoration: 'none' }}><li className="browse">Top Chart</li></Link>
                <Link to="top-playlist" style={{ textDecoration: 'none' }}><li className="browse">Top Playlist</li></Link>
                <Link to="artist" style={{ textDecoration: 'none' }}><li className="browse">Top Artists</li></Link>
                <Link to="albums" style={{ textDecoration: 'none' }}><li className="browse">English Hits</li></Link>
                <Link to="top-playlist" style={{ textDecoration: 'none' }}><li className="browse">Remixes</li></Link>
                

                <p>LIBRARY</p>
                <Link to={'favourites'} style={{ textDecoration: 'none' }}><li className="library">
                    <FaHeart className='icons-margin' />
                    My favourites</li></Link>
                <Link to={'history'} style={{ textDecoration: 'none' }}><li className="library">
                    <FaHistory  className='icons-margin' />
                    History</li></Link>
                <Link to={'albums'} style={{ textDecoration: 'none' }}><li className="library">
                    <IoIosAlbums className='icons-margin' />
                    Albums</li></Link>
                <Link to={'top-playlist'} style={{ textDecoration: 'none' }}><li className="library">
                    <PiGlobeStandFill className='icons-margin' />
                    Bhakti</li></Link>
                <Link to={'artist'} style={{ textDecoration: 'none' }}><li className="library">
                    <MdOutlineManageAccounts className='icons-margin' />
                    Artists</li></Link>

              </div>
        </div>
        
            <Routes>
                <Route path='/' element={< NewRelease name="New Release" searchlist = {searchlist} searchBoolean = {searchBoolean} SetSearchBoolean = {SetSearchBoolean} searchedInput = {searchedInput}/>}/>
                <Route path='/new-release' element={< NewRelease name="New Release" searchlist = {searchlist} searchBoolean = {searchBoolean} SetSearchBoolean = {SetSearchBoolean} searchedInput = {searchedInput}/>}/>
                <Route path='/top-charts' element={< NewRelease name="Top Charts" searchlist = {searchlist} searchBoolean = {searchBoolean} SetSearchBoolean = {SetSearchBoolean} searchedInput = {searchedInput}/>}/>
                <Route path='/top-playlist' element={< NewRelease name="Top Playlists" searchlist = {searchlist} searchBoolean = {searchBoolean} SetSearchBoolean = {SetSearchBoolean} searchedInput = {searchedInput}/>}/>
                <Route path='/podcast' element={< NewRelease name="Podcast" searchlist = {searchlist} searchBoolean = {searchBoolean} SetSearchBoolean = {SetSearchBoolean} searchedInput = {searchedInput}/>}/>
                <Route path='/artist' element={< NewRelease name="Artist" searchlist = {searchlist} searchBoolean = {searchBoolean} SetSearchBoolean = {SetSearchBoolean} searchedInput = {searchedInput}/>}/>
                <Route path='/favourites' element={< NewRelease name="favourites" searchlist = {searchlist} searchBoolean = {searchBoolean} SetSearchBoolean = {SetSearchBoolean} searchedInput = {searchedInput}/>}/>
                <Route path='/history' element={< NewRelease name="history" searchlist = {searchlist} searchBoolean = {searchBoolean} SetSearchBoolean = {SetSearchBoolean} searchedInput = {searchedInput}/>}/>
                <Route path='/albums' element={< NewRelease name="history" searchlist = {searchlist} searchBoolean = {searchBoolean} SetSearchBoolean = {SetSearchBoolean} searchedInput = {searchedInput}/>}/>
            </Routes>
     </div>
        </Router>
    </>
  )
}

export default Sidebar
