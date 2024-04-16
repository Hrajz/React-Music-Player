import React from 'react'
import "./NewRelease.css"
import "./Queue.css"


const Playlist = ({list,playSong,addToQueue}) => {
  // console.log(list)
  const container = [];

  if(list.length===0){
    container.push(
        <div key = {0} className='emptyBox'>
            <div className='emptytext'>
                No History Found 🫠
            </div>
        </div>
    )
  }
  if(!!list){
  
    for(let i=0;i<list.length;i++){
      const id = list[i].id;
      // console.log(playSong(favouriteSongs[i].id))
        container.push(
            <div key = {list[i].id} className='songBox2'>
                <img className='queueImage2' src={list[i].imageUrl} alt="" onClick={()=>{playSong(id)}}/>
                <div className='Queuetext2' onClick={()=>{playSong(id)}}>
                    <p><strong>{list[i].name}</strong></p>
                    <p>{list[i].artistName}</p>
                </div>
                <div className='btn' onClick={()=>{addToQueue(list[i])}}>
                  <p>
                  Add to Queue
                  </p>
                </div>
            </div>
        )
    }
  }

  return (

    <div className='common'style={{paddingBottom:"90px"}}> 
      <div className="heading" style={{margin : "15px 0px"}}>
         <h4 style={{fontWeight: "bold"}}>
            My History  
         </h4>
      </div>
      {container}
    </div>
  )
}

export default Playlist

