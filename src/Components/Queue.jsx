import React from 'react'
import './Queue.css'

const Queue = ({favouriteSongs,playSong,expand,currentImage,songid,currentSong,currentArtist,setsongsQueue}) => {


  const update = () => {
    setsongsQueue([{
      'imageUrl': currentImage,
        'id': songid,
        'name': currentSong,
        'artistName': currentArtist
    }])
  }

  const container = [];
  if(!!favouriteSongs){
  
    for(let i=0;i<favouriteSongs.length;i++){
      const id = favouriteSongs[i].id;
      // console.log(playSong(favouriteSongs[i].id))
        container.push(
            <div key = {favouriteSongs[i].id} className='songBox2' onClick={()=>{playSong(id)}}>
                <img className='queueImage2' src={favouriteSongs[i].imageUrl} alt="" />
                <div className='Queuetext2'>
                    <p><strong>{favouriteSongs[i].name}</strong></p>
                    <p>{favouriteSongs[i].artistName}</p>
                </div>
            </div>
        )
    }
  }


  
  return (
    
    <div>
      <div className={`queue ${expand? "hide" : "show"}`}>
        <div className="nav">
          <p>
            Queue
          </p>
          <button className="qb2" onClick={update}> 
            <p>Clear</p>
          </button>
        </div>  
        <div>
        {container}
        </div>
      </div> 
    </div>
  )
}

export default Queue
