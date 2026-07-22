import React from 'react'
import logo from '../assets/super_aip_logo.png';

function Loader() {

  return (
    <div>
        
        <div className='ring' >
          <img src={logo} alt="Super AI Polaris" width={96} height={96} />
          <span className='span1'></span>
        </div>
       
        
    </div>
  )
}

export default Loader


