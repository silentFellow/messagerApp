import React, { useEffect, useRef, useState } from 'react'
import { logoDark } from '../assets/'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../contexts/users'
import { db } from '../firebase';
import { doc, setDoc } from '@firebase/firestore'

const Login = () => {

  const [message, setMessage] = useState('')

  const username = useRef();
  const pass = useRef();

  const { signInGoogle } = authContext();
  const { signInEmail } = authContext();
  const { userName } = authContext();
  const { updateName } = authContext();
  const navigate = useNavigate()

  const reset = () => {
    username.current.value = ''
    PassThrough.current.value = ''
  }

  const gooleSignIn = async () => {
    try {
      setMessage('')
      setTimeout(async () => await signInGoogle(), 333)
      await setDoc(doc(db, 'users', userName?.uid), {
        userName: userName?.displayName,
        uid: userName?.uid,
        photoURL: userName?.photoURL
      })
      navigate('/chats')
    }
    catch(error) {
      setMessage('Something Went Wrong')
      console.log(error)
    }
  }

  const login = async () => {
    try {
      setMessage('')
      setTimeout(async () => await signInEmail(`${username.current.value}@gmail.com`, pass.current.value), 333)
      if(userName?.displayName == null) {
        await updateName(username.current.value)
      }
      await setDoc(doc(db, 'users', userName?.uid), {
        userName: userName?.displayName,
        uid: userName?.uid,
        photoURL: userName?.photoURL
      })
      setMessage("login Successful")

      navigate('/chats')
    }
    catch(error) {
      setMessage('Invalid ID')
      console.log(error)
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-smoke">
      <div className='flex flex-col justify-center items-center h-screen w-screen mb-0 sm:h-[90%] sm:w-[90%] xl:h-[80%] xl:w-[80%] bg-light shadow-sm sm:shadow-char'>
        
        <img src={logoDark} alt="logo" className='h-[6%] w-[33%] md:h-[9%] md:w-[24%] xl:h-[12%] xl:w-[15%]' />
        
        <div className={`${message == '' ? 'hidden' : "h-[5%] w-1/2 md:w-1/3 xl:h-[6%] xl:w-1/4 flex justify-center items-center bg-ascent text-white mb-2 rounded-xl"}`}>
          {message}
        </div>
        
        <div className="h-[5%] w-[54%] mt-1.5 md:h-[7%] md:w-1/3 md:mt-[-3px] xl:h-[8%] xl:w-1/4">
          <input 
            type="text" 
            className='w-full p-1 px-3 rounded-xl bg-smoke border-ascent focus:border-[2px]' 
            placeholder='Enter your id' 
            ref={username}
          />
        </div>
        <div className="h-[5%] w-[54%] mt-3 md:h-[7%] md:w-1/3 xl:mt-0 xl:h-[9%] xl:w-1/4">
          <input 
            type="password" 
            className='w-full p-1 px-3 rounded-xl bg-smoke border-ascent focus:border-[2px]' 
            placeholder='Enter id password' 
            ref={pass}
          />
        </div>

        <div className="mt-[2%] sm:mt-0 flex flex-row justify-evenly items-center w-[54%] md:w-1/3 xl:w-1/4">
          <button type='button' className='bg-dark text-light p-1.5 rounded-xl transition-all duration-500 mt-2 xl:mt-0 hover:opacity-75'
            onClick={() => login()}
          >
            SUBMIT
          </button>
          <button type='button' className='bg-dark text-light p-1.5 rounded-xl transition-all duration-500 mt-2 md:mt-1 xl:mt-0 hover:opacity-75'
            onClick={() => reset()}
          >
            RESET
          </button>
        </div>

        <div className="flex justify-center items-center w-[54%] mt-3 font-extrabold text-[12px] md:w-1/3 sm:text-[14px] xl:w-1/4 xl:text-[16px]">
          Don't have an account ?<Link to='/signUp' className='text-ascent cursor-pointer'>&nbsp;Sign Up!</Link>
        </div>

        <div className="h-[9%} w-[54%] mt-3 md:w-1/3 xl:w-1/4">
          <button className="w-full flex justify-center items-center bg-dark text-light rounded-xl p-1 transition-all duration-500 hover:bg-smoke hover:text-char"
            onClick={() => gooleSignIn()}
          >
            <FcGoogle className='mr-3' />
            SIGN IN WITH GOOGLE
          </button>
        </div>

      </div>
    </div>
  )
}

export default Login