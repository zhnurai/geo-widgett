import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook'


export const Sidebar = ({ setCoor }) => {
    const { loading, request } = useHttp()
    const [city, setCity] = useState('')
    const [locs, setLocs] = useState([])

    const changeHandler = ( event) => {
        setCity(event.target.value)
    } 


    const getLocations = (event) => {
        event.preventDefault()

        request(`https://nominatim.openstreetmap.org/search/?format=json&q=${ city }`)
        .then((response) =>{
            setLocs(response)

        })
        
    }

    console.log(locs);

  return (
      <div className='sidebar'>
          <form className='sidebar_form'>
              <input type="text" placeholder='Enter a location...' onChange={changeHandler} /> 

              <button onClick={ getLocations }>Search</button>
          </form>

          {
              loading === true ?
              <div className='loading_block'>
                  <span className='loading'></span>
              </div> : 
              <ul className='sidebar_result'>
                {
                    locs.map(({ display_name, type, lat, lon  }, i) =>{
                        return (
                            <li key={ i } className='sidebar_item' onClick={ () =>setCoor([lat,lon])}>
                                <h2>{ display_name }</h2>
                                <p>{ type.replace( /_/g, ' ') }</p>
                            </li>
                        )
                    })
                }


            </ul>
        } 
      </div>

  )
}
