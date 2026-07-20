import React from 'react'
import logo from '../assets/super_aip_logo.png';

function Loader() {

  return (
    <div>
        
        <div className='ring' >
          <img src={logo}/>
          <span className='span1'></span>
        </div>
       
        
    </div>
  )
}

export default Loader


