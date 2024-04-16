import React, {useState} from 'react'
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import './NewRelease.css'

import './SongContainer.css'

const SongContainer = ({heading,list,playSong,addToQueue,val,songid,boolean}) => {

    const navigate = useNavigate();

  const navigateToRoute = (route) => {
    navigate(route);
  };

  let [threeDotsBoolean, setthreeDotsBoolean] = useState(false)
const fun = () => {
  threeDotsBoolean? setthreeDotsBoolean(false) :setthreeDotsBoolean(true)
}
const Update = (id) => {
    let value;
  for (let key in list) {
    if (list.hasOwnProperty(key)) {
        value = list[key];
    }
    if(id === value.id){
       value.isActive =  value.isActive?false:true
    }
    else{
      value.isActive = false;
    }
  }
  fun()
}


  const songs = [] ;
  let value;
  for (let key in list) {
    if (list.hasOwnProperty(key)) {
        value = list[key];
    }
    const param = value;
    const id = value.id;
    songs.push(
        <div key={param.id} className={`songitem ${val===3? "increaseSize margin":""}`}>
            <div className={`songbox ${val===3? "increaseSize":""}`} >
                <img className={`songimage ${val===3? "increaseSize border":""} ${param.id === songid && boolean ? "animation" : ""} ${val===1?"round":""}`} src={param.imageUrl} onClick={()=>{playSong(id)}} alt="song" />
                <div className='positionThreeDots'>
                    <BsThreeDots onClick={()=>{Update(id)}} className='hover' size={18}/>
                    <div className={`buttonPosition ${param.isActive?"show":"hide"}`} onClick={()=>{addToQueue(param); Update(id);}}>
                    + Add to Queue
                    </div>
                </div>
            </div>
            <div className="text">
                <p>
                    <strong>{param.name}</strong>
                </p>
                <p>
                    {param.artistName}
                </p>
            </div>
        
        </div>
    )

  }


  return (
    <div className="container">
        <div className="heading">
            <h4>
                <strong>{heading}</strong>
            </h4>
        </div>
        
        <div id = "scroll" className={`${val===1 ?"songs sizeFix": val===2? "songs" : "updatedCss" }`}>
            {songs}
        </div>

    </div>
  )
}

export default SongContainer
