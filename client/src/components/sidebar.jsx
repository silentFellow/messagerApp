import React, { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Chatcards } from './index'
import { db } from '../firebase'
import { getDocs, collection } from '@firebase/firestore'
import { authContext } from '../contexts/users'

const Sidebar = ({ toggle, setToggle, active, setActive, setTransmissionId }) => {
  const [users, setusers] = useState([])
  const userCollection = collection(db, 'users')
  const { userName } = authContext()

  useEffect(() => {
    const users = async () => {
      try {
        const userData = await getDocs(userCollection)
        setusers(userData.docs.map((doc) => ({userName: doc.userName, uid: doc.uid, photoURL: doc.photoURL, ...doc.data()})))
      }
      catch(error) {
        console.log(error)
      }
    }

    users()
  }, [userCollection])

  return (  
      <div className="h-[90%] flex flex-col w-full">
        <div className="h-[4%] search w-full flex justify-between bg-smoke">
          <input 
            type="search"
            className='bg-white w-full p-4 border-y-[1px] border-char'
            placeholder='LOOK FOR...'
          />
          <div className="bg-white flex justify-center items-center p-4 border-y-[1px] border-l-[1px] border-char cursor-pointer">
            <AiOutlineSearch />
          </div>
        </div>

        {/* chatcards */}

        <div className="flex flex-col mt-7 gap-2">
          {users.map((user) => <div onClick={() => {
            setActive(user.uid)
            if(user.uid > userName.uid) {
              setTransmissionId(user.uid + userName.uid)
            }
            else {
              setTransmissionId(userName.uid + user.uid)
            }
          }}><Chatcards username={user.userName} photoURL={user.photoURL} uid={user.uid} toggle={toggle} setToggle={setToggle} active={active} /></div> )}
        </div>
      </div>
  )
}

export default Sidebar