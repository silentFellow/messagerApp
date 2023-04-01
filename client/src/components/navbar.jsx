import React, { useRef, useState } from 'react'
import { logoDark } from '../assets/'
import { authContext } from '../contexts/users'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { storage } from '../firebase'
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { db } from '../firebase'
import { doc, updateDoc, setDoc } from '@firebase/firestore'
import { uid } from 'uid'

const Navbar = ({ toggle, setToggle, activeUser }) => {

  const { userName } = authContext()
  const { updateName } = authContext()
  const { updatePhoto } = authContext()
  const { signout } = authContext()

  const navigate = useNavigate()

  const [uname, setUname] = useState(userName?.displayName);
  const [profileIcon, setProfileIcon] = useState('');
  const changeName = useRef()
  const newRoomRef = useRef()
  const first = uname?.charAt(0).toUpperCase()
  const [menu,setMenu] = useState(false)
  const [nameuser, setNameuser] = useState(false)
  const [newRoom, setNewRoom] = useState(false)
  const [newIcon, setNewIcon] = useState(false)
  const menuShow = "menu_gradient flex-col text-light p-3 absolute right-[6%] top-[81%] rounded-xl font-black tracking-tight selection:bg-none"

  const updatename = async (e) => {
    if(e.code != 'Enter') {
      return
    }
    if(e.code == 'Enter') {
      if(changeName.current.value == '') {
        changeName.current.value = uname;
      }
      const new_name = changeName.current.value
      await updateName(new_name)
      setUname(new_name)
      const updated = doc(db, 'users', userName.uid)
      await updateDoc(updated, {
        userName: new_name
      })
      changeName.current.value = ''
      setNameuser(false)
      setMenu(false)
    }
    changeName.current.value = ''
  }

  const updateIcon = async () => {
    if(profileIcon == '') {
      return
    }
    else {
      const imageRef = ref(storage, `profileIcons/${userName.uid}`)
      try {
        await uploadBytes(imageRef, profileIcon)
        const logo = await getDownloadURL(imageRef)
        await updatePhoto(logo)
        const updated = doc(db, 'users', userName.uid)
        await updateDoc(updated, {
          photoURL: logo
        })
        setProfileIcon('')
        setNewIcon(false)
        setMenu(false)
        setNameuser(false)
      }
      catch(error) {
        console.log(error)
      }
    }
  }

  const createRoom = async (e) => {
    if(e.code != 'Enter') {
      return
    }
    if(e.code == 'Enter') {
      if(newRoomRef.current.value == '') {
        return
      }
      try {
        const uidRoom = uid(45)
        const room = doc(db, 'rooms', uidRoom)
        await setDoc(room, {
          name: newRoomRef.current.value,
          photoURL: '',
          transmissionId: uidRoom
        })
        newRoomRef.current.value = ''
        setNewRoom(false)
        setMenu(false)
      }
      catch(error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="h-full w-full flex flex-row items-center justify-between">
        <div className={`${!toggle ? "flex w-screen md:w-[30%] bg-ascent justify-between h-full items-center p-3 px-4 relative" : "hidden md:flex w-[30%] bg-ascent justify-between h-full items-center p-3 px-4 relative"}`}>
          <img src={logoDark} alt="misisng" 
            className='h-[35%] lg:h-[60%]'
          />
          <span className="h-[36px] w-[36px] bg-light text-dark font-black rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setMenu(!menu)}
          >
            {userName?.photoURL == null || '' ? first : 
              <img src={userName.photoURL} alt='missing' className='h-full w-full rounded-full' />
            }
          </span>
          <div className={`${menu ? `flex ${menuShow}` : 'hidden ${menuShow'}`}>
            <p className='mt-2 mb-3 cursor-pointer'
              onClick={() => setNewRoom(!newRoom)}
            >Create Room</p>

            <div className={`${newRoom ? 'flex flex-col' : 'hidden'}`}>
              <input 
                type='text'
                placeholder='Enter Room Name'
                className='w-full px-2 rounded-md bg-light text-dark placeholder:text-[14px] mb-2'
                ref={newRoomRef}
                onKeyDown={createRoom}
              />
            </div>

            <p className='mb-3 cursor-pointer'
              onClick={() => {
                setNewIcon(false)
                setNameuser(!nameuser)
              }}
            >Update Name</p>

            <div className={`${nameuser ? 'flex flex-col' : 'hidden'}`}>
              <input 
                type='text'
                placeholder='Enter new display Name'
                className='w-full px-2 rounded-md mb-1 bg-light text-dark placeholder:text-[14px]'
                ref={changeName}
                onKeyDown={updatename}
              />
              <p className="text-ascent mb-2">NOTE: This not change your ID name</p>
            </div>

            <p className='mb-3 cursor-pointer'
              onClick={() => {
                setNameuser(false)
                setNewIcon(!newIcon)
              }}
            >Update Icon</p>

            <div className={`${newIcon ? 'flex flex-row justify-between items-center bg-transparent mt-[-12%]' : 'hidden'}`}>
              <input 
                type='file'
                accept='images/*'
                className='hidden'
                onChange={(e) => setProfileIcon(e.target.files[0])} 
                id='buttonForSubmit'
              />
              <div className="h-[30px] w-full flex flex-row justify-between items-center bg-smoke text-ascent rounded-[5px] my-2">
                <label htmlFor="buttonForSubmit" className='cursor-pointer w-[75%] flex justify-center'>Select</label>
                <button className='text-ascent w-[25%] border-l-2 border-black flex justify-center' onClick={() => updateIcon()}>&#10004;</button>
              </div>
            </div>

            <p className='mb-2 cursor-pointer'
              onClick={() => {
                signout()
                navigate('/')
              }}
            >Sign Out</p>
          </div>
        </div>
        <div className={`${toggle ? "flex w-screen md:w-[70%] nav_gradient text-light jsutify-start gap-6 h-full items-center p-4 pr-2" : "hidden md:flex w-[70%] nav_gradient text-light jsutify-start gap-6 h-full items-center p-4 pr-2"}`}>
            <BiArrowBack 
              className='flex md:hidden cursor-pointer'
             onClick={() => setToggle(!toggle)}
            />
            <h2>
              Chat with <span className="text-ascent font-cursive">{activeUser}</span> ..........
            </h2>
        </div>
    </div>
  )
}

export default Navbar