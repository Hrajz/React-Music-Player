import React, { useEffect , useCallback} from 'react'
import "./NewRelease.css"
import './Header.css';
import music from "./music.json"
import Controls from './Controls'
import Footer from './Footer'
import { createContext,useState,useRef} from 'react'
import { BsThreeDots } from "react-icons/bs";
import SongsQueue from './SongsQueue'
import FavouriteSongs from './FavouriteSongs'
import Queue from './Queue'
import Playlist from './Playlist'
import SongBox from './SongBox';
import SongContainer from './SongContainer'
import SubContainer from './SubContainer';
import List from './NewRelease.json'
import TopChart from './TopCharts.json'
import Remixes from './Lofi.json'
import Bhakti from './Bhakti.json'
import Classic from './Classic.json'
import Bhojpuri from './Bhojpuri.json'
import English from './English.json'
import Romantics from './Romantics.json'
import Kk from './Kk.json'
import Arijit from './ArijitSIngh.json'
import Jubin from './JubinNautial.json'
import Shreya from './ShreyaGhosal.json'
import Zack from './ZackKnight.json'

export const MusicDataContext = createContext();
const NewRelease = (props) => {

const [expand, setExpand] = useState(false);
const [option,setOption] = useState(0);

  // Callback function to receive data from child component
  const handleDataFromChild = useCallback((data) => {
    setExpand(data[0]);
    setOption(data[1])

  },[]);

    let [musicSrc, setmusicSrc] = useState("");
    const [data, setData] = useState(0);
    let [songid, setSongid] = useState(54)
    let [boolean, setBoolean] = useState(false);
    let [playing, setPlaying] = useState(false);
    let [duration, setDuratiion] = useState(0);
    const currentAudio = useRef();
    const [currentImage, setcurrentImage] = useState("image/images (39).jpeg")
    const [currentSong, setcurrentSong] = useState("Ram Siya Ram")
    const [currentArtist, setcurrentArtist] = useState("Adipurush")
    let [favourite, setFavourite] = useState(false);
    let [favouriteSongs,setFavouriteSongs] = useState([]);
    let [history,setHistory] = useState([]);
    const [index,setIndex] = useState(0);
    const [musiclength,setMusicLength] = useState(0);
    
    const [path,SetPath] = useState(window.location.href.split('/')[3]);
    const [songsQueue,setsongsQueue] = useState([
      {
        'imageUrl': currentImage,
        'id': songid,
        'name': currentSong,
        'artistName': currentArtist
      }
    ])

    useEffect(()=>{
      const fav = JSON.parse(localStorage.getItem('favSongs'));
      if(!!fav){
        setFavouriteSongs(fav)
      }
    },[]);

    useEffect(()=>{
      SetPath(window.location.href.split('/')[3]);
      setExpand(false);
    },[window.location.href.split('/')[3]])
    
    const playSong = useCallback((id) => {
       
      setPlaying(true);
      let value;
      for (let key in music) {
        if (music.hasOwnProperty(key)) {
          value = music[key];
        }
        if (value.id === id ) {
          musicSrc = value.url;
          setcurrentImage(value.imageUrl)
          setcurrentSong(value.name)
          setcurrentArtist(value.artistName)
          play(id)
          let a=0;
          for(let i=0;i<songsQueue.length;i++){
            if(id === songsQueue[i].id){
              setIndex(i);
              a++;
            }
          }
          if(a===0){
            setIndex(-1);
          }

        }  
      }
    });
    const play = useCallback((id) => {
        currentAudio.current.src = (musicSrc) ? musicSrc : music.song1.url;
        
        if(id === songid){
          currentAudio.current.currentTime = duration;
          if (!boolean) {
            currentAudio.current.play()
            setDuratiion(currentAudio.current.currentTime)
            setBoolean(true)
          } else {
            currentAudio.current.pause();
            setBoolean(false)
          }
        }
        else{
          currentAudio.current.play();
          setBoolean(true);
          setSongid(id)
          setDuratiion(0);
          setFavourite(false)
          updateHistory(songid)
        }
      });

      const updateHistory = (id) => {

        if(!!history && playing){
          let a=0;
          for(let i=0;i<history.length;i++){
            if(id === history[i].id){
              a+=1;
            }
          }
          if(a===0){
            setHistory([...history,{
              "name": currentSong,
              "imageUrl": currentImage,
              "artistName": currentArtist,
              "id": id
            }])
          }
        }
      }

    const handleChange = (event) => {
        setData(event.target.value);
        if(!!currentAudio.current.duration){
          currentAudio.current.currentTime = event.target.value * currentAudio.current.duration / 100;
        }
        setDuratiion(currentAudio.current.currentTime);
    };
    const HandleUpdate = () =>{
      setDuratiion(currentAudio.current.currentTime);
      const progress = ((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
      setData(isNaN(progress)? data : progress);

    }

    useEffect(()=>{
      setMusicLength(currentAudio.current.duration)
    },[duration])
    // console.log(musiclength)

const incr = (i) => {
  if(option===0){
    if(!!songsQueue[i]){
      setIndex(i);
      playSong(songsQueue[i].id)
    }
    else{
      setBoolean(false)
    }
  }
  else if(option===1){
    currentAudio.current.play()
  }
  else if(option === 2){
    if(songsQueue.length>1){
      let randomIndex;
      const size = songsQueue.length;
      do{
        randomIndex = Math.floor(Math.random()*size)
        } while (randomIndex===index);
        setIndex(randomIndex);
        playSong(songsQueue[randomIndex].id)
    }
    else{
      setBoolean(false)
    }
  }
}

const addToQueue = (param) =>{
  let val = 0;
  for(let i=0;i<songsQueue.length;i++){
    if(param.id===songsQueue[i].id){
      val+=1;
    }
  }
  if(val===0){
    setsongsQueue([...songsQueue ,{
      'imageUrl': param.imageUrl,
      'id': param.id,
      'name': param.name,
      'artistName': param.artistName
    }])
  }
}

// just for re render----------------------------------


let [threeDotsBoolean, setthreeDotsBoolean] = useState(false)
const fun = () => {
  threeDotsBoolean? setthreeDotsBoolean(false) :setthreeDotsBoolean(true)
}

  const container = [];

  if(props.searchlist.length===0){
    if(props.searchedInput !== ''){
      container.push(
        <div key = {0} className={`emptyBox ${props.searchBoolean? "show" : "hide"}`}>
            <div className='emptytext' style={{borderBottomColor:'rgb(0,0,0,0.15)', borderBottomWidth:'2px', borderBottomStyle:'solid', paddingBottom:"10px", padding:'0px 10px 10px 10px'}}>
                No results ! 🔍
            </div>
        </div>
    )
    }
    else
    container.push(
        <div key = {0} className={`emptyBox ${props.searchBoolean? "show" : "hide"}`}>
            <div className='emptytext' style={{borderBottomColor:'rgb(0,0,0,0.15)', borderBottomWidth:'2px', borderBottomStyle:'solid', paddingBottom:"10px", padding:'0px 10px 10px 10px'}}>
                Start searching 🔍
            </div>
        </div>
    )
  }
  if(!!props.searchlist){
  
    for(let i=0;i<props.searchlist.length;i++){
      const id = props.searchlist[i].id;
        container.push(
            <div key = {props.searchlist[i].id} className='songBox3'>
                <img className='queueImage3' src={props.searchlist[i].imageUrl} alt=""  onClick={()=>{playSong(id)}}/>
                <div className='Queuetext3'  onClick={()=>{playSong(id)}}>
                    <p><strong>{props.searchlist[i].name}</strong></p>
                    <p>{props.searchlist[i].artistName}</p>
                </div>
                <div className='btn' onClick={()=>{addToQueue(props.searchlist[i])}}>
                  <p>
                  Add to Queue
                  </p>
                </div>
            </div>
        )
    }
  }

//  --------------------- for sub container ------------------------------

const arrayPlaylist = [{"name":'Remixes' ,"active":true},{"name":'Bhakti' ,"active":false},{"name":'Classic Hits' ,"active":false},{"name":'Bhojpuri' ,"active":false}];
const arrayPlaylistList = [Remixes,Bhakti,Classic,Bhojpuri];

const arrayArtist = [{"name":'Kk' ,"active":true},{"name":'Arijit Singh' ,"active":false},{"name":'Jubin Nautiyal' ,"active":false},{"name":'Shreya Ghosal' ,"active":false},{"name":'Zack Knight' ,"active":false}];
const arrayArtisttList = [Kk,Arijit,Jubin,Shreya,Zack];

const arrayAlbums = [{"name":'English Hits' ,"active":true},{"name":'Lofi Remixes' ,"active":false},{"name":'Romantics' ,"active":false}];
const arrayAlbumtList = [English,Remixes,Romantics];

  return (
    <MusicDataContext.Provider value={{handleChange,data,boolean,playSong,songid,currentAudio,favouriteSongs,setFavouriteSongs,favourite,setFavourite,musiclength}}>
       <audio ref={currentAudio} onEnded={()=>{incr(index+1)}} onTimeUpdate={HandleUpdate}></audio>
       <div className={`test ${props.searchBoolean? "block" : "none"}`}>
        {
          props.searchlist.length!==0 && props.searchBoolean ? <div className={`${props.searchBoolean? "show" : "hide"}`}> Results </div> : <div className="hide"></div>
        }
          {container} {
            props.searchlist.length!==0?
              <div key = {0} className={`emptyBox ${props.searchBoolean? "show" : "hide"}`} style={{textAlign:'center'}}>
                  <div className='emptytext' style={{color:'rgb(0,0,0,0.9)', fontSize:"15px", display:'inline', backgroundImage:'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)', padding:'10px', borderRadius:'4px'}}>
                      Oops, End of results (●'◡'●)
                  </div>
              </div> : <></>
          } 
      </div>
       <Queue 
        favouriteSongs={songsQueue}
        playSong = {playSong}
        expand = {expand}
        currentImage = {currentImage}
        songid = {songid}
        currentSong = {currentSong}
        currentArtist = {currentArtist}
        setsongsQueue = {setsongsQueue}
        />
      {
      path === "" && expand === false ?

      <SongBox playSong = {playSong} addToQueue = {addToQueue} songid = {songid} boolean={boolean}/> :

      path === "new-release" && expand === false ?

      <>
          <SongContainer heading = "New Release" list = {List} playSong = {playSong} addToQueue = {addToQueue} val={3} songid = {songid} boolean={boolean}/>
        <Footer/>
      </> :
      
      path === "top-charts" && expand === false ?

      <>
          <SongContainer heading = "Top Charts" list = {TopChart} playSong = {playSong} addToQueue = {addToQueue} val={3} songid = {songid} boolean={boolean}/>
        <Footer/>
      </> :

path === "top-playlist" && expand === false ?

<>
    <SubContainer heading = "Top Playlists" navi = {arrayPlaylist} dataFiles = {arrayPlaylistList} playSong = {playSong} addToQueue = {addToQueue} songid = {songid} boolean={boolean}/>
    <Footer/>
</> :

path === "artist" && expand === false ?

<>
    <SubContainer heading = "Top Artists" navi = {arrayArtist} dataFiles = {arrayArtisttList} playSong = {playSong} addToQueue = {addToQueue} songid = {songid} boolean={boolean}/>
    <Footer/>
</> :

path === "albums" && expand === false ?

<>
    <SubContainer heading = "Top Albums" navi = {arrayAlbums} dataFiles = {arrayAlbumtList} playSong = {playSong} addToQueue = {addToQueue} songid = {songid} boolean={boolean}/>
    <Footer/>
</> :

      path === "history" && expand === false ? 
      <><Playlist list = {history} playSong = {playSong} addToQueue = {addToQueue}/></> :
      expand === false && path !== "favourites"?
      <>
        <SongContainer heading = "New Release" list = {music} playSong = {playSong} addToQueue = {addToQueue} val={3} />
        <Footer/>
      </> : 
        path === "favourites" && expand === false? <FavouriteSongs
          value = {favouriteSongs}
          songid = {songid}
          boolean = {boolean}
          playSong = {playSong}
          addToQueue = {addToQueue}
        /> :
        expand === true? 
        <div>
        
          <div className='common2'> 
            <div className='currentsong'>
                <div className='ani'>
                <span/>
                <span/>
                <span/>
                <span/>
                <span/>
                <img className={`currentimage ${boolean? "animation" : ""}`} src={currentImage} alt="song" />
                <span/>
                <span/>
                <span/>
                <span/>
                <span/>
                </div>
              <div className='currenttext'>
                <p>
                    <strong>{currentSong}</strong>
                </p>
                <p>
                    {currentArtist}
                </p>
              </div>

            </div>
          </div>
          <SongsQueue songs={songsQueue}/>
          <Footer/>
        </div> : <></>
        }
      
      <Controls
        imageUrl = {currentImage}
        name = {currentSong}
        artistName = {currentArtist}
        sendDataToParent={handleDataFromChild}
        index = {index}
        songsQueue = {songsQueue}
        setIndex = {setIndex}
        setBoolean = {setBoolean}

      />
    </MusicDataContext.Provider>
  )
}

export default NewRelease
