import React from 'react'
import { useState } from 'react'
import SignUp from '../Auth/Signup'

const NavbarSM = () =>{
    return(
        <>
            <h1>This is Small Navbar</h1>
        </>
    )
}
const NavbarLg = ({SignIn,SignUp}) =>{
    return(
        <>
            <div className='flex justify-between items-center bg-purple-500 w-full px-10 py-2'>
                <div className='px-3 py-1'>
                    <h2 className='text-xl'>LOGO</h2>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-24 py-1'>
                        {/* <div className='flex items-center gap-5'>
                            <a href="https://www.google.com" className="bg-red-600 px-5 py-1 cursor-pointer hover:bg-blue-700">
                                <h3 className='text-white font-semibold text-xl'>
                                        Home
                                </h3>
                            </a>
                            <a href="https://www.google.com" className="bg-red-600 px-5 py-1 cursor-pointer hover:bg-blue-700">
                                <h3 className='text-white font-semibold text-xl'>
                                        Home
                                </h3>
                            </a>
                            <a href="https://www.google.com" className="bg-red-600 px-5 py-1 cursor-pointer hover:bg-blue-700">
                                <h3 className='text-white font-semibold text-xl'>
                                        Home
                                </h3>
                            </a>
                        </div>   */}
                         
                    </div>
                        <div className='flex items-center gap-4'>
                            <button className='px-10 py-1 font-semibold text-xl text-white bg-black rounded-lg hover:bg-red-500'>Sign In</button>
                            <button onClick={SignUp} className='px-10 py-1 font-semibold text-xl text-white bg-black rounded-lg hover:bg-red-500'>Sign Up</button>
                        </div> 
                </div>
            </div>
        </>
    )
}

const Navbar = () => {
    const [openSignup, setOpenSignup] = useState(false);

    const openSignUpmodal = () => setOpenSignup(true); 
  return (
    <>
        <SignUp isOpen={openSignup} setIsOpen={setOpenSignup}/>
        <div className='flex lg:hidden'>
            <NavbarSM />
        </div>
        <div className='hidden lg:flex'>
            <NavbarLg SignUp={openSignUpmodal} />
        </div>
    </>
  )
}

export default Navbar;
