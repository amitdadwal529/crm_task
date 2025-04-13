import React from 'react'
import notFoundImage from "../../../src/assets/images/not_found.jpg"
const NotFound = () => {
  return (
    <div className="absolute flex justify-center items-center z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-full" >
  <img src={notFoundImage} alt='not-found' className='max-w-full max-h-full object-contain' />
</div>
  )
}

export default NotFound
