import React, {useContext} from 'react'
import './SongQueue.css'
import { MusicDataContext } from './NewRelease.jsx';

const SongsQueue = (props) => {

    const {playSong} = useContext(MusicDataContext);

    const container = [];
    for(let i=0;i<props.songs.length;i++){
        container.push(
            <div key = {props.songs[i].id} className='songBox' onClick={()=>{playSong(props.songs[i].id)}}>
                <img className='queueImage' src={props.songs[i].imageUrl} alt="" />
                <div className='Queuetext'>
                    <p><strong>{props.songs[i].name}</strong></p>
                    <p>{props.songs[i].artistName}</p>
                </div>
            </div>
        )
    }
    // console.log(container)
  return (
    <div className='mainContainer'>
        < div style = {{marginBottom:"10px"}}>
            Queue
            {container}
        </div>
                
    </div>
  )
}

export default SongsQueue
