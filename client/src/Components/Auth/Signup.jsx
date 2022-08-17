import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'


import OTPModel from './OTP';


import { useDispatch, useSelector } from "react-redux";

import { signUp } from "../../Redux/Reducer/Auth/auth.action";
import { mailSend } from '../../Redux/Reducer/Mail/mail.action';


export default function SignUp({isOpen,setIsOpen}) {
  const [openOTP, setOpenOTP] = useState(false);
  const openOTPmodal = () => setOpenOTP(true);

    const reduxState = useSelector((global) => global.user.user);
    const [userData,setUserData] = useState({
      fullname:'',
      email:'',
      password:'',
    });

    const handleChange = (e) =>{
        setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false)
  }

  const [errorField,setErrorFields] = useState({
    fullnameErr : "",
    passwordErr : "",
    emailErr : ""
  });

  // const sendMailToUser = () =>{
  //   setMailData({
  //     from : "",
  //     to : userData.email,
  //     subject : "",
  //     text : ""
  //   })
  // }

  

  const [mailData,setMailData] = useState({
    from : "Mailgun Sandbox <postmaster@sandbox9634ec1a25de49da8c5c028a23cba404.mailgun.org>",
    to : reduxState?.user?.email ? reduxState.user.email : userData.email,
    subject : "OTP",
    text : "54623"
  })
  
  const submit = () => {
    
    setErrorFields({
      fullnameErr : "",
      passwordErr : "",
      emailErr : ""
    })
    setMailData(
      (prev) => ({
        ...prev,
      to : userData.email
    }));
    console.log(userData);
    
    if(validationData()){
      setUserData({
        email: "",
        password: "",
        fullname: "",
      });

      // Mailgun Sandbox <postmaster@sandbox9634ec1a25de49da8c5c028a23cba404.mailgun.org>
      

      dispatch(signUp(userData));
      console.log(mailData);
      // setMailData({
      //   from : "Mailgun Sandbox <postmaster@sandbox9634ec1a25de49da8c5c028a23cba404.mailgun.org>",
      //   to : "2020pceittara61@poornima.org",
      //   subject : "OPT",
      //   text : "4213"
      // });
      // sendMailToUser();
      // dispatch(mailSend(mailData));
      // console.log(mailData);
      closeModal();
      openOTPmodal();
    }
    else{
      alert("Please fill all the details");
    }
  };

  const validationData = ()=>{

    let formIsValid = true;
        if(userData.fullname === ''){
            formIsValid = false;
            setErrorFields(prevState=>({
                ...prevState,fullnameErr:"please enter your name",
            }));
        }
        if(userData.email === ''){
            formIsValid = false;
            setErrorFields(prevState=>({
                ...prevState,emailErr:"please enter your mail",
            }));
        }
        if(userData.password === '' ){
            formIsValid = false;
            setErrorFields(prevState=>({
                ...prevState,passwordErr:"please enter your password",
            }));
        }
        if(userData.password !== '' && userData.password.length < 5 ){
            formIsValid = false;
            setErrorFields(prevState=>({
                ...prevState,passwordErr:"please enter your password at least 5",
            }));
        }
        return formIsValid;
  }


  return (
    <>

      <OTPModel isOpen={openOTP} setIsOpen={setOpenOTP}/>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    SignUp 
                  </Dialog.Title>
                  <diV className="mt-2 flex flex-col gap-3 w-full">
                    {/* <button onClick={googlesignin} className="py-2 justify-center rounded-lg flex items-center gap-2 w-full border border-gray-400 bg-white text-gray-700 hover:bg-gray-100">
                        SignUp With Google <FcGoogle />
                    </button> */}
                    <form className="flex flex-col gap-3">
                        <div className=" w-full flex flex-col gap-2">
                            <label htmlFor="fullname">Email</label>
                            <input type="text" name="fullname" 
                            id="fullname"
                            value={userData.fullname}
                            onChange={handleChange}
                            placeholder="Tara Chand Kumawat"
                            className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-red-500"
                            />
                            {
                          errorField.fullnameErr.length > 0 && <span>{errorField.fullnameErr}</span>
                        }

                        </div>
                              
                        <div className=" w-full flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email"
                            id="email" 
                            value={userData.email}
                            onChange={handleChange}
                            placeholder="tara@emai.com"
                            className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-red-500"
                            />
                            {
                          errorField.emailErr.length > 0 && <span>{errorField.emailErr}</span>
                          }
                        </div>
                        
                        <div className="w-full flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="*********"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-red-500"
                            />
                            {
                          errorField.passwordErr.length > 0 && <span>{errorField.passwordErr}</span>
                          }
                        </div>
                        
                        <div className="w-full  text-center bg-red-500 text-white py-2 rounded-lg cursor-pointer" onClick={submit}>
                            Sign Up
                        </div>
                    </form>
                  </diV>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
