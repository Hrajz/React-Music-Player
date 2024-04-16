import React, { useContext,useState,useEffect} from 'react';
import { MusicDataContext } from './NewRelease.jsx';
import { FaVolumeHigh, FaHeart } from "react-icons/fa6";
import { FaStepForward, FaStepBackward, FaPlay, FaExpandAlt, FaPause } from "react-icons/fa";
import { PiRepeatOnceBold , PiRepeatBold, PiShuffleBold } from "react-icons/pi";
import './Controls.css';
import { json } from 'react-router-dom';

const Controls = (props) => {
    const {handleChange,data,boolean,playSong,songid,currentAudio,favouriteSongs,setFavouriteSongs,favourite,setFavourite,musiclength} = useContext(MusicDataContext);
    let [volumeBoolean, setvolumeBoolean] = useState(false)
    let [threeDotsBoolean, setthreeDotsBoolean] = useState(false)
    const [volume, setVolume]= useState(50);
    let [expand, setexpand] = useState(false);
    const [repeatOption,setRepeatOption]= useState(0);

    const volUpdate = () => {
        volumeBoolean? setvolumeBoolean(false) :setvolumeBoolean(true)
    }
    
    const updatethreeDotsBoolean = () => {
        threeDotsBoolean? setthreeDotsBoolean(false) :setthreeDotsBoolean(true)
    }
    // Call the callback function to send data to parent component
    const sendUpdate = props.sendDataToParent;
    useEffect(() => {
        sendUpdate([expand,repeatOption]);
    }, [expand, sendUpdate,repeatOption]);
    

    const incr = (num) => {
        if(!!props.songsQueue[num] && props.songsQueue.length>1){
          props.setIndex(num);
          playSong(props.songsQueue[num].id)
        }
        else if(num<0 && props.songsQueue.length>1){
            playSong(props.songsQueue[props.songsQueue.length-1].id)
        }
        else if(props.songsQueue.length>1){
            playSong(props.songsQueue[0].id)
        }
    }

    const updateVol = (e) => {
        setVolume(e.target.value)
        currentAudio.current.volunme = volume/100;
    }
    useEffect(() => {
        if (!!currentAudio.current) {
          currentAudio.current.volume = volume/100;
        }
      }, [currentAudio, volume])


      const UpdateExpand = () => {
        expand?setexpand(false):setexpand(true)
      }

      const favouritesFunction = () => {
        favourite ? setFavourite(false) : setFavourite(true);
      }

      const addToFavourite = (param) => {
        if(param === true){
           const fav = favouriteSongs.filter((item) => item.id !== songid);
           setFavouriteSongs(fav)
           localStorage.setItem('favSongs',JSON.stringify(favouriteSongs));
        }
        else
        setFavouriteSongs([...favouriteSongs,
          {
            'imageUrl': props.imageUrl,
            'id': songid,
            'name': props.name,
            'artistName': props.artistName,
            'isActive': false
          }
      ]);
            localStorage.setItem('favSongs',JSON.stringify(favouriteSongs));
      }

      useEffect(()=>{
        // console.log(favourite)
        for(let i = 0; i < favouriteSongs.length; i++) {
            if(songid === favouriteSongs[i].id){
                setFavourite(true)
            }
        }
        console.log(favouriteSongs)
      },[songid,favouriteSongs,setFavourite])

    return (
        <div>
            <div className="ctrl" >
                <input type="range" step={0.001} name="range" id="progressbar" min="0" value={data} max="100" onChange={handleChange} />
                <div className="currplay">
                    <div className="currentPlaying">
                        <img className="currimg" src={props.imageUrl} alt="img" />
                        <div className="currtext">
                            <p className='timedisplay' style={{fontSize:'11.6px', marginBottom:'2px',marginLeft:'5px'}}>
                              {
                                    !!currentAudio.current ? `${parseInt(currentAudio.current.currentTime/60)<10?"0":""}${parseInt(currentAudio.current.currentTime/60)} : ${parseInt(currentAudio.current.currentTime%60)<10?"0":""}${parseInt(currentAudio.current.currentTime%60)}  /  ${parseInt(musiclength/60)<10?"0":""}${parseInt(musiclength/60)} : ${parseInt(musiclength%60)<10?"0":""}${parseInt(musiclength%60)}` : " "

                              }
                            </p>
                            <p className="currtext1">
                                {props.name}
                            </p>
                            <p className="currtext2">
                                {props.artistName}
                            </p>
                        </div>
                    </div>

                    <div className="icon">
                        {
                        repeatOption === 2 ? <PiShuffleBold className="hover" size={25} onClick={()=>{setRepeatOption(0)}}/> :
                        repeatOption === 1 ? <PiRepeatOnceBold className="hover" size={25} onClick={()=>{setRepeatOption(2)}}/> :
                        <PiRepeatBold className="hover" size={25} onClick={()=>{setRepeatOption(1)}}/>}
                        <FaStepBackward className="hover" onClick={()=>{incr(props.index-1)}} size={20} />
                        <div className={`bg ${boolean === false ? "conditional": "" }`}>
                        {boolean === false ? <FaPlay onClick={()=>{playSong(songid)}} className="bg-color play" size={window.innerWidth<500?29:20} /> :
                            <FaPause onClick={()=>{playSong(songid)}} className="bg-color" size={window.innerWidth<500?29:20} />
                        }
                        </div>
                        <FaStepForward className="hover" onClick={()=>{incr(props.index+1)}} size={20} />
                        <div className='textShow'>
                            <FaHeart className={`${favourite===true ? "heart" : ""}`} size={20} onClick={()=>{favouritesFunction();addToFavourite(favourite);}}/>
                            <div className='handle-fav-text'>{favourite===false ? "Add to favourite" : "Remove from favourite"}
                            </div>
                        </div>
                    </div>
                    <div className="icon2">
                        <FaVolumeHigh className="hover vol" size={20}
                        onClick={volUpdate}
                        />
                        <div id="vol" className={volumeBoolean?"show":"hide"}>
                            <input type="range" onChange={updateVol} name="range" value={volume} id="volume" min="0" max="100" />
                        </div>
                        <FaExpandAlt className="hover" onClick={UpdateExpand} size={20} />
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;
