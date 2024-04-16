import React,{useState} from 'react'
import { BsThreeDots } from "react-icons/bs";

const FavouriteSongs = ({value,songid,boolean,playSong,addToQueue}) => {

    let [threeDotsBoolean, setthreeDotsBoolean] = useState(false)
    const fun = () => {
        threeDotsBoolean? setthreeDotsBoolean(false):setthreeDotsBoolean(true)
    }

    const Update = (id) => {
        console.log("hahaha")
        for(let i=0;i<value.length;i++){
            if(value[i].id === id){
                value[i].isActive = value[i].isActive?false:true;
            }
        }
        fun()
      }
    const Songs = []

    if(value.length===0){
        Songs.push(
            <div key = {0} className='emptyBox'>
                <div className='emptytext'>
                    So sad, You still didn't added Favourites
                </div>
            </div>
        )
    }

    else
    for(let i=0;i<value.length;i++){
        localStorage.setItem('favSongs',JSON.stringify(value));
        Songs.push(
            <div key = {value[i].id} className="songitem favSong">
                <div className='songbox'>
                <img className={`songimage  favSongimage ${value[i].id === songid && boolean ? "animation" : ""}`} onClick={()=>{playSong(value[i].id)}} src={value[i].imageUrl} alt="song" />
                <div className='positionThreeDots'>
                    <BsThreeDots onClick={()=>{Update(value[i].id)}} className='hover' size={18}/>
                    <div className={`buttonPosition ${value[i].isActive?"show":"hide"}`} onClick={()=>{addToQueue(value[i]); Update(value[i].id);}}>
                    + Add to Queue
                    </div>
                </div>
                </div>
                <div className="text">
                    <div className='songNameSize'>
                        <strong>{value[i].name}</strong>
                    </div>
                    <p>
                        {value[i].artistName}
                    </p>
                </div>
            </div>
        )
    }
  return (
    <div className='common'style={{paddingBottom:"90px"}}> 
        <div className="heading" style={{margin : "15px 0px"}}>
            <h4 style={{fontWeight: "bold"}}>
                My Favourites 😊
            </h4>
        </div>
        <div style={{display:"flex", flexWrap:'wrap'}}>
        {Songs} 
        </div>
    </div>
  )
}

export default FavouriteSongs
