import React from 'react'
import "./styles.scss"

function MainFooter() {
  return (
    <div className='footer'>
      Copyright © by Nok Nok {new Date().getFullYear()}
    </div>
  )
}

export default MainFooter