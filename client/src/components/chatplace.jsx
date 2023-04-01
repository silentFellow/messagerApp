import React, { useState } from 'react'
import { authContext } from '../contexts/users'

const Chatplace = ({ mess }) => {

  const userName = authContext();
  const uname = userName.userName.displayName
  const Uname = uname?.normalize()
  const username = mess.username
  const Username = username?.normalize()
  
  return (
    <div className={`${Uname == Username ? "flex justify-end w-full" : "flex justify-start w-full"}`}>
      <div className="flex flex-col min-w-[25%] max-w-[60%] m-1">
        <div className='flex justify-start p-1 px-3 text-dark tracking-wide text-[95%] font-cursive font-bold' >
          {Username}
        </div>
        <div className="flex justify-start bg-smoke rounded-tl-2xl rounded-br-2xl py-[9px] px-[10px] border-2 border-ascent">
          <div className="w-full text-justify break-all text-dark font-[500]">
            {mess.message}
            <span className="flex justify-end font-black text-[70%] text-ascent mt-1">
              {mess.date} {mess.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatplace