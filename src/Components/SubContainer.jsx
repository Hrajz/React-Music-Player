import React, {useState} from 'react'
import './SubContainer.css'
import { BsThreeDots } from "react-icons/bs";

const SubContainer = ({heading,navi,dataFiles,playSong,addToQueue,songid,boolean}) => {
    const array = [];
    const [index,SetIndex] = useState(0);
    if(index > navi.length){
        SetIndex(0)
    }
    for(let i=0;i<navi.length;i++){
        if(i===index){
            array.push(
                <li key={i} style={{color: 'rgb(255, 255, 255)', backgroundColor: 'rgba(0, 0, 0, 0.597)', borderBottom: '5px solid rgba(250, 250, 250, 0.323)',
                borderRight: '3px solid rgba(250, 250, 250, 0.323)'}} onClick={()=>{SetIndex(i)}}><strong>{navi[i].name}</strong></li>
            )
        }
        else
        array.push(
            <li key={i} onClick={()=>{SetIndex(i)}}><strong>{navi[i].name}</strong></li>
        )
    }

    let [threeDotsBoolean, setthreeDotsBoolean] = useState(false)
    const fun = () => {
      threeDotsBoolean? setthreeDotsBoolean(false) :setthreeDotsBoolean(true)
    }
    const Update = (id) => {
        let value;
        const list = dataFiles[index];
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
    const list = dataFiles[index];
    let value;
    for (let key in list) {
        if (list.hasOwnProperty(key)) {
            value = list[key];
        }
        const param = value;
        const id = value.id;
        songs.push(
            <div key={param.id} className={`songitem margin`}>
                <div className={`songbox`} >
                    <img className={`songimage ${param.id === songid && boolean ? "animation" : ""}`} src={param.imageUrl} onClick={()=>{playSong(id)}} alt="song" />
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
    <div className='common'>
        <div className='subNavigation'>
            {array}
        </div>
        <div className="updatedCss">
            {songs}
        </div>
    </div>
  )
}

export default SubContainer
