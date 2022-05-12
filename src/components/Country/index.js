import React from 'react';
import './styles.scss'

function Country({ src, place, flag }) {
    return (
        <div className='country'>
            
            <img src={src} alt="" />
            <div className="country__info">
                <h3>{place}</h3>
                <div className='flag'>{flag}</div>
            </div>
        </div>
    )
}

export default Country