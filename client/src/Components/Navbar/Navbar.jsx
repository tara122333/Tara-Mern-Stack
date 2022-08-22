import React from 'react'
import { useState } from 'react'
import SignUp from '../Auth/Signup'
import SignIn from '../Auth/Signin'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../Redux/Reducer/Auth/auth.action'
const NavbarSM = () =>{
    return(
        <>
            <h1>This is Small Navbar</h1>
        </>
    )
}
const NavbarLg = ({SignIn,SignUp}) =>{
    const reduxState = useSelector((global) => global.user.user);
    console.log(reduxState);

    const dispatch = useDispatch();
    const SignOUT = () =>{
        dispatch(signOut());
    }

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

                        {
                            reduxState?.user?.varified ? (
                                <>
                                    <div className='flex items-center gap-10'>
                                    {
                                        reduxState?.user?.profilePic ? (
                                            <>
                                                <div className='w-14 h-14 flex justify-center items-center p-1 bg-red-400 rounded-full'>
                                                    {/* <img src={reduxState.user.profilePic} alt="avatar"  className='w-full h-full'/> */}
                                                    {/* <img src="https://lh3.googleusercontent.com/a-/AFdZucoodRTxUPxdQxOKgBwsWWrcJNRBJM69kNtvkwC3nQ=s96-c" alt='new' className='w-full h-full'/> */}
                                                    <img src={reduxState.user.profilePic} alt="" className='w-full h-full rounded-full' referrerpolicy="no-referrer"/>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className='font-bold rounded-full bg-red-500 text-white flex justify-center items-center h-14 w-14'>
                                                        <h1 className='px-3 text-3xl'>
                                                        {
                                                            reduxState.user.fullname.charAt(0)
                                                        }
                                                        </h1>
                                                </div>
                                            </>
                                        )
                                    }
                                    <div>
                                        <button onClick={SignOUT} className='px-10 py-1 font-semibold text-xl text-white bg-black rounded-lg hover:bg-red-500'>Sign Out</button>
                                    </div>
                                    </div>

                                </>
                            ) :
                            (
                                <>
                                <div className='flex items-center gap-4'>
                                    <button className='px-10 py-1 font-semibold text-xl text-white bg-black rounded-lg hover:bg-red-500' onClick={SignIn}>Sign In</button>
                                    <button onClick={SignUp} className='px-10 py-1 font-semibold text-xl text-white bg-black rounded-lg hover:bg-red-500'>Sign Up</button>
                                </div> 
                                </>
                            ) 
                        }
                        
                </div>
            </div>
        </>
    )
}

const Navbar = () => {
    const [openSignup, setOpenSignup] = useState(false);
    const [openSignin, setOpenSignin] = useState(false);

    const openSignUpmodal = () => setOpenSignup(true); 
    const openSignInmodal = () => setOpenSignin(true);
  return (
    <>
        <SignUp isOpen={openSignup} setIsOpen={setOpenSignup}/>
        <SignIn isOpen={openSignin} setIsOpen={setOpenSignin}/>
        <div className='flex lg:hidden'>
        <NavbarLg SignUp={openSignUpmodal} SignIn={openSignInmodal} />
        </div>
        <div className='hidden lg:flex'>
            <NavbarLg SignUp={openSignUpmodal} SignIn={openSignInmodal} />
        </div>
    </>
  )
}

export default Navbar;
