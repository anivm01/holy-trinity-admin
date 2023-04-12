import React from 'react'
import "./NoData.scss"
import noData from '../../assets/no-data.svg'

function NoData() {
  return (
    <div className='no-data'>
        <img className='no-data__image' src={noData} alt="no data was found"/>
    </div>
  )
}

export default NoData