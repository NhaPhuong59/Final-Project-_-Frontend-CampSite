import React, { useState } from 'react'
import './styles.scss'
import Search from '../Search';

function Banner({setQuery, executeScroll, queryParams}) {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className='banner'>
            <div className='banner__search'>
                {showSearch && <Search setQuery={setQuery} queryParams={queryParams} executeScroll={executeScroll}/>}

                <button onClick={() => setShowSearch(!showSearch)} className='banner__searchButton' variant='outlined'>
                    {showSearch ? "Hide" : "Search Dates"}
                </button>
            </div>
        </div>
    )
}

export default Banner