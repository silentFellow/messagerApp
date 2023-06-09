import React, { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Chatcards } from './index'
import { db } from '../firebase'
import { getDocs, collection } from '@firebase/firestore'
import { authContext } from '../contexts/users'

const Sidebar = ({ toggle, setToggle, active, setActive, setTransmissionId, setActiveUser, profUrl, setProfIcon, setProfUrl }) => {
  const [users, setusers] = useState([])
  const [rooms, setRooms] = useState([])
  const [search, setSearch] = useState('');
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
  }, [users, rooms])

  return (  
      <div className="h-[90%] flex flex-col w-full relative">

        <div className="h-[4%] search w-full flex justify-between bg-smoke">
          <input 
            type="search"
            className='bg-white w-full p-4 border-y-[1px] border-char'
            placeholder='LOOK FOR...' 
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="bg-white flex justify-center items-center p-4 border-y-[1px] border-l-[1px] border-char cursor-pointer">
            <AiOutlineSearch />
          </div>
        </div>

        {/* chatcards */}

        <div className="flex flex-col mt-7 gap-2">
          <h2 className='font-black'>USERS: </h2>
          {
            search == '' || search == null ? 
            users.map((user) => <div key={user.uid} onClick={() => {
              setActive(user.uid)
              setActiveUser(user.userName)
              if(user.uid > userName.uid) {
                setTransmissionId(user.uid + userName.uid)
              }
              else {
                setTransmissionId(userName.uid + user.uid)
              }
            }}><Chatcards username={user.userName} photoURL={user.photoURL} uid={user.uid} toggle={toggle} setToggle={setToggle} active={active} setProfIcon={setProfIcon} setProfUrl={setProfUrl} /></div> )
            :
            users.filter(user => user.userName?.toLowerCase().includes(search?.toLowerCase()))?.map((user) => <div key={user.uid} onClick={() => {
              setActive(user.uid)
              setActiveUser(user.userName)
              if(user.uid > userName.uid) {
                setTransmissionId(user.uid + userName.uid)
              }
              else {
                setTransmissionId(userName.uid + user.uid)
              }
            }}><Chatcards username={user.userName} photoURL={user.photoURL} uid={user.uid} toggle={toggle} setToggle={setToggle} active={active} setProfIcon={setProfIcon} setProfUrl={setProfUrl} /></div> )
          }

          <h2 className="font-black mt-2 pt-2 border-t-2 border-dark">ROOMS: </h2>
          {search == '' || search == null ? 
            rooms.map((user) => <div key={user.transmissionId} onClick={() => {
              setActive(user.transmissionId)
              setActiveUser(user.name)
              setTransmissionId(user.transmissionId)
            }}><Chatcards username={user.name} photoURL={user.photoURL} uid={user.transmissionId} toggle={toggle} setToggle={setToggle} active={active} setProfIcon={setProfIcon} setProfUrl={setProfUrl} /></div> )
            :
            rooms.filter(room => room.name?.toLowerCase().includes(search?.toLowerCase()))?.map((user) => <div key={user.transmissionId} onClick={() => {
              setActive(user.transmissionId)
              setActiveUser(user.name)
              setTransmissionId(user.transmissionId)
            }}><Chatcards username={user.name} photoURL={user.photoURL} uid={user.transmissionId} toggle={toggle} setToggle={setToggle} active={active} setProfIcon={setProfIcon} setProfUrl={setProfUrl} /></div> )
          }
        </div>
      </div>
  )
}

export default Sidebar