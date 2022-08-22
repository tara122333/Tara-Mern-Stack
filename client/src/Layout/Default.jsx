import React from 'react'
import Navbar from '../Components/Navbar/Navbar';

 const DefaultLayout = (props) => {
  return (
    <>
        <Navbar />
        {
                props.children
        }
    </>
  )
}

export default DefaultLayout;