import React from 'react' 
import SongContainer from './SongContainer'
import NewRelease from './NewRelease.json'
import TopChart from './TopCharts.json'
import Remixes from './Lofi.json'
import Bhakti from './Bhakti.json'
import Classic from './Classic.json'
import Bhojpuri from './Bhojpuri.json'
import English from './English.json'
import Romantics from './Romantics.json'
import Footer from './Footer'
// import Controls from './Controls'

const SongBox = ({playSong,addToQueue,songid,boolean}) => {
  return (
    <div>
        <SongContainer heading = "2024 Hits" list = {NewRelease} playSong = {playSong} addToQueue = {addToQueue} val={2} songid = {songid} boolean={boolean}/>
        <SongContainer heading = "Top Charts" list = {TopChart} playSong = {playSong} addToQueue = {addToQueue} val={2} songid = {songid} boolean={boolean}/>
        <SongContainer heading = "Remixes" list = {Remixes} playSong = {playSong} addToQueue = {addToQueue} val={1} songid = {songid} boolean={boolean}/>
        <SongContainer heading = "Bhakti" list = {Bhakti} playSong = {playSong} addToQueue = {addToQueue} val={1} songid = {songid} boolean={boolean}/>
        <SongContainer heading = "Classic Hits" list = {Classic} playSong = {playSong} addToQueue = {addToQueue} val={2} songid = {songid} boolean={boolean}/>
        <SongContainer heading = "Bhojpuri" list = {Bhojpuri} playSong = {playSong} addToQueue = {addToQueue} val={1} songid = {songid} boolean={boolean}/>
        <SongContainer heading = "English Hits" list = {English} playSong = {playSong} addToQueue = {addToQueue} val={2} songid = {songid} boolean={boolean}/>
        <SongContainer heading = "Romantics" list = {Romantics} playSong = {playSong} addToQueue = {addToQueue} val={2} songid = {songid} boolean={boolean}/>
        {/* <Controls/> */}
      < Footer/>
    </div>
  )
}

export default SongBox

