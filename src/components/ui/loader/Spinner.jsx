import React from 'react'
import { ScaleLoader } from 'react-spinners'

// Spinner component to display a loading animation
const Spinner = () => {
  return (
    <div 
      className="absolute flex justify-center items-center z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-full" 
      style={{backdropFilter:"blur(5px)"}} // Apply blur effect on the background
    >
      {/* ScaleLoader is used to show a loading spinner with a specific color */}
      <ScaleLoader color="#1c398e" />
    </div>
  )
}

export default Spinner
