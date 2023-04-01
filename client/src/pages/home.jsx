import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { logoDark } from '../assets/index'

const Home = () => {
  const navigate = useNavigate()
  setTimeout(() => {
    navigate('/chats')
  }, 3000)
  return (
    <div className="h-screen w-screen md:flex flex-col justify-center items-center bg-smoke">
      <div className="hidden md:flex flex-col justify-center items-center h-[90%] w-[90%]">
        <motion.div 
          initial={{ y:0 }}
          animate={{ y:-54 }}
          transition={{ duration:0.9 }}
          className="font-cursive flex justify-center items-center text-[63px] font-black text-ascent"
        >
          Welcome To The Future
        </motion.div>
        <motion.div
          initial={{ x:150, y:-90, opacity:0 }}
          animate={{ type:'opacity', x:0, opacity:1 }}
          transition={{ delay:0.9, duration:1 }}
          className='flex justify-center items-center'
        >
          <img src={logoDark} alt="LOGO" className='h-[57%] w-[57%]' />
        </motion.div>
      </div>
      <div className="md:hidden flex flex-col justify-center items-center h-screen w-screen">
        <motion.div 
          initial={{ y:0 }}
          animate={{ y:-54 }}
          transition={{ duration:0.9 }}
          className="font-cursive flex justify-center items-center text-[30px] font-black text-ascent"
        >
          Welcome To The Future
        </motion.div>
        <motion.div
          initial={{ x:90, y:-60, opacity:0 }}
          animate={{ type:'opacity', x:0, opacity:1 }}
          transition={{ delay:0.9, duration:1 }}
          className='flex justify-center items-center'
        >
          <img src={logoDark} alt="LOGO" className='h-[72%] w-[72%]' />
        </motion.div>
      </div>
    </div>
  )
}

export default Home