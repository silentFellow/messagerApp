import { React, useRef, useState } from 'react'
import { logoDark } from '../assets'
import { authContext } from '../contexts/users';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const username = useRef();
  const pass = useRef();
  const cPass = useRef();

  const { signUpEmail } = authContext()
  const { signout } = authContext()

  const reset = () => {
    username.current.value = '';
    pass.current.value = '';
    cPass.current.value = '';
    setMessage('')
  }
  

  const create = async () => {
    if(pass.current.value != cPass.current.value) { 
      setMessage('PASSWORDS DOES NOT MATCH') 
    }
    else if(pass.current.value.length < 6) {
      setMessage('Passwords should be atleat 6 characters')
    }
    else {
      try {
        setLoading(true)
        setMessage('')
        await signUpEmail(`${username.current.value}@gmail.com`, pass.current.value)
        await signout()
        navigate('/login')
      }
      catch(error) {
        setMessage('Something went wrong...')
      }
      finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-smoke">
      <div className='flex flex-col justify-center items-center h-screen w-screen mb-0 md:h-[90%] md:w-[90%] xl:h-[80%] xl:w-[80%] bg-light shadow-sm sm:shadow-char'>
        
        <img src={logoDark} alt="logo" className='h-[6%] w-[33%] sm:h-[9%] sm:w-[24%] xl:h-[12%] xl:w-[15%]' />
        
        <div className={`${message == '' ? 'hidden' : "h-[5%] w-1/2 md:w-1/3 xl:h-[6%] xl:w-1/4 flex justify-center items-center bg-ascent text-white mb-2 rounded-xl"}`}>
          {message}
        </div>
        
        <div className="h-[5%] w-[54%] mt-1.5 md:h-[7%] md:w-1/3 md:mt-2 xl:h-[9%] xl:w-1/4 xl:mt-3">
          <input 
            type="text" 
            className='w-full p-1 px-3 rounded-xl bg-smoke border-ascent focus:border-[2px]' 
            placeholder='Enter your ID' 
            ref={username}
          />
        </div>
        <div className="h-[5%] w-[54%] mt-3 md:h-[7%] md:w-1/3 xl:mt-0 xl:h-[9%] xl:w-1/4">
          <input 
            type="password" 
            className='w-full p-1 px-3 rounded-xl bg-smoke border-ascent focus:border-[2px]' 
            placeholder='ENTER YOUR PASSWORD' 
            ref={pass}
          />
        </div>
        <div className="h-[5%] w-[54%] mt-3 md:h-[7%] md:w-1/3 xl:mt-0 xl:h-[9%] xl:w-1/4">
          <input 
            type="password" 
            className='w-full p-1 px-3 rounded-xl bg-smoke border-ascent focus:border-[2px]' 
            placeholder='ENTER CONFIRM PASSWORD' 
            ref={cPass}
          />
        </div>

        <div className="flex flex-row justify-evenly items-center w-[54%] md:w-1/3 xl:w-1/4">
          <button type='button' className='bg-dark text-light p-1.5 rounded-xl transition-all duration-500 mt-2 xl:mt-0 hover:opacity-75'
            onClick={() => create()}
            disabled={loading}
          >
            SUBMIT
          </button>
          <button type='button' className='bg-dark text-light p-1.5 rounded-xl transition-all duration-500 mt-2 md:mt-1 xl:mt-0 hover:opacity-75'
            onClick={() => reset()}
            disabled={loading}
          >
            RESET
          </button>
        </div>

        <div className="flex justify-center items-center w-[54%] mt-3 font-extrabold text-[12px] md:w-1/3 sm:text-[14px] xl:w-1/4 xl:text-[16px]">
          Don't have an account ?<Link to='/login' className='text-ascent cursor-pointer'>&nbsp;login</Link>
        </div>

      </div>
    </div>
  )
}

export default SignUp