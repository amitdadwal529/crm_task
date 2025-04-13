import React from 'react'
import { ScaleLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <div className="absolute flex justify-center items-center z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-full" style={{backdropFilter:"blur(5px)"}}>

      <ScaleLoader color="#1c398e" />
    </div>
  )
}

export default Spinner
