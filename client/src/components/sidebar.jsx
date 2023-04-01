import React, { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Chatcards } from './index'
import { db } from '../firebase'
import { getDocs, collection } from '@firebase/firestore'
import { authContext } from '../contexts/users'

const Sidebar = ({ toggle, setToggle, active, setActive, setTransmissionId, setActiveUser }) => {
  const [users, setusers] = useState([])
  const [rooms, setRooms] = useState([])
  const userCollection = collection(db, 'users')
  const roomCollection = collection(db, 'rooms')
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
    const rooms = async () => {
      try {
        const roomData = await getDocs(roomCollection)
        setRooms(roomData.docs.map((doc) => ({userName: doc.name, uid: doc.transmissionId, photoURL: doc.photoURL, ...doc.data()})))
      }
      catch(error) {
        console.log(error)
      }
    }

    users()
    rooms()
  }, [userCollection, roomCollection])

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
          <h2 className='font-black'>USERS: </h2>
          {users.map((user) => <div onClick={() => {
            setActive(user.uid)
            setActiveUser(user.userName)
            if(user.uid > userName.uid) {
              setTransmissionId(user.uid + userName.uid)
            }
            else {
              setTransmissionId(userName.uid + user.uid)
            }
          }}><Chatcards username={user.userName} photoURL={user.photoURL} uid={user.uid} toggle={toggle} setToggle={setToggle} active={active} /></div> )}

          <h2 className="font-black mt-2 pt-2 border-t-2 border-dark">ROOMS: </h2>
          {rooms.map((user) => <div onClick={() => {
            setActive(user.transmissionId)
            setActiveUser(user.name)
            setTransmissionId(user.transmissionId)
            console.log(user)
          }}><Chatcards username={user.name} photoURL={user.photoURL} uid={user.transmissionId} toggle={toggle} setToggle={setToggle} active={active} /></div> )}
        </div>
      </div>
  )
}

export default Sidebar