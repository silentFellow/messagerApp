import React from 'react'
import { authContext } from '../contexts/users'

const Chatcards = ({ username, uid, photoURL, setToggle, toggle, active }) => {
  const wrap ="h-full p-2 px-5 w-full flex justify-start items-center text-dark space-x-2 cursor-pointer hover:p-3"
  const { userName } = authContext();
  return (
    <div className={`${uid == active ? `menu_gradient ${wrap}` : `bg-light ${wrap}`}`}
      onClick={() => setToggle(!toggle)}
    >
      <span className="h-[45px] w-[45px] bg-char text-smoke font-black rounded-full flex justify-center items-center">
        {
          photoURL != null && photoURL != '' ? <img src={photoURL} alt="missing" className='bg-cover h-full w-full rounded-full' />
          : username?.charAt(0).toUpperCase()
        }
      </span>

      <div className="flex flex-col justify-start">
        <span className={`${uid == active ? "text-light font-cursive tracking-wider font-extrabold text-[15px]" : "text-dark font-extrabold text-[14px]"}`}>
          <span className={`${userName?.uid == uid ? 'text-[17px] font-cursive font-black' : 'text-[15px] '}`}>{userName?.uid == uid ? 'For Me From Past' : username}</span>
        </span>
        {/* <span className="text-ascent text-[12px] overflow-hidden">
          Last Message.........
        </span> */}
      </div>
    </div>
  )
}

export default Chatcards