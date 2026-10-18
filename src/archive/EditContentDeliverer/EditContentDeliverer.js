import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import useFetch from '../../utilities/useFetch'

function EditContentDeliverer({url, setData, children}) {
    const {data, loading, error } = useFetch(url)
    if(loading) {
        return <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#6F0B20"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: "center" }}
        wrapperClassName=""
        visible={true}
      />
    }
    if(error) {
        <p>Something went wrong. Try reloading the page</p>
    }
    if(data) {
        setData(data)
        return children
    }
  return (
    <p>Something went wrong. Try reloading the page</p>
  )
}

export default EditContentDeliverer