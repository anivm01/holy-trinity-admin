import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL, obituarySlug } from '../../utilities/api'
import { createMarkup } from '../../utilities/createMarkup'
import { sortNewestToOldest } from '../../utilities/sort'
import cross from '../../assets/cross.svg'
import './SavedObituaries.scss'
import { ThreeDots } from 'react-loader-spinner'
import SingleObituary from '../SingleObituary/SingleObituary'
import NoData from '../NoData/NoData'
import useFetch from '../../utilities/useFetch'

function SavedObituaries({url}) {
    const { data, error, loading } = useFetch(
        url
      );
     
      if (loading) {
        return (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#6F0B20"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ justifyContent: "center" }}
            wrapperClassName=""
            visible={true}
          />
        );
      }
      if (error) {
        return <NoData/>;
      }
      if (data) {
        return (
            <div className='saved-obituaries'>
            {data.map((single, index)=> {
                return (
                    <SingleObituary key={index} obituary={single} />
                )
            })}
        </div>
        );
      }
      return (
        <NoData/>
      )
   
}

export default SavedObituaries