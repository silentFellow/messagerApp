import React, { useState, useEffect, useRef } from 'react'
import { Navbar, Sidebar, Chatplace } from '../components/'
import { AiOutlineSend } from 'react-icons/ai'
import { authContext } from '../contexts/users'
import axios from '../api/useAxios'
import Pusher from 'pusher-js'

const Chats = () => {

  const { userName } = authContext()
  const [message, setMessage] = useState("")
  const [active, setActive] = useState(userName?.uid)
  const [transmissionId, setTransmissionId] = useState(userName?.uid)
  const [mess, setMess] = useState([])
  const username = userName?.displayName
  const lastMessage = useRef();
  const [activeUser, setActiveUser] = useState(userName?.displayName)

  const currentTime = () => {
    let date = new Date().getDate()
    let month = new Date().getMonth()
    let year = new Date().getFullYear()
    let hour = new Date().getHours()
    let minute = new Date().getMinutes()
    let med = 'am';

    if(hour > 12) {
      hour -= 12
      med = 'pm'
    }
    if(hour < 10) {
      hour = `0${hour}`
    }
    if(minute < 10) {
      minute = `0${minute}`
    }
    if(month < 10) {
      month = `0${month}`
    }
    if(date < 10) {
      date = `0${date}`
    }

    return {
      currentDate: `${date}/${month}/${year}`, 
      currentTiming: `- ${hour}:${minute} ${med}`
    }
  }

  const msgSend = async () => {
    if(message == '') {
      return
    }
    try {
      await axios.post('/msg/send', {
        'username': username,
        'message': message,
        'date': currentTime().currentDate,
        'time': currentTime().currentTiming,
        'transmissionId': transmissionId
      })
      setMessage('')
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const receiveMsg = async () => {
      try {
        const res = await axios.get('/msg/receive', {
          params: {
            'transmissionId': transmissionId
          }
        })
        setMess(res.data)
        lastMessage.current?.scrollIntoView()
      }
      catch(error) {
        console.log(error)
      }
    }
    receiveMsg()
  }, [transmissionId])

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMess([...mess, newMessage])
      lastMessage.current?.scrollIntoView()
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
    
  }, [mess])

  const [toggle, setToggle] = useState(false);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-smoke">
      
      <div className="h-full w-[96%] md:h-[90%] md:w-[90%] flex flex-col bg-light sm:shadow-xl sm:shadow-ascent">
        <div className="h-[8%] md:h-[9%] w-full">
          <Navbar className='sticky top-0' username={mess} toggle={toggle} setToggle={setToggle} activeUser={activeUser} />
        </div>
        <div className="h-[91%] w-full flex">
          <div className={`${!toggle ? "h-full w-screen md:w-[30%] flex flex-col justify-center items-center bg-smoke overflow-scroll px-3" : "hidden h-full w-[30%] md:flex flex-col justify-center items-center bg-smoke overflow-scroll px-3"}`}>
            <Sidebar toggle={toggle} setToggle={setToggle} active={active} setActive={setActive} setTransmissionId={setTransmissionId} setActiveUser={setActiveUser} />
          </div>
          <div className={`${toggle ? "flex flex-col w-screen md:w-[70%] border-l-2" : "hidden md:flex flex-col w-[70%] border-l-2"}`}>
            <div className="h-[93%] overflow-scroll m-2 mx-3">
              {mess.map((mess) => <Chatplace mess={mess} />)}
              <div className="lastMessage" ref={lastMessage}></div>
            </div>

            <div className="sticky bottom-0 flex justify-between items-center bg-smoke h-[16%] sm:h-[14%] text-char w-full pl-1 tracking-wider mt-1">
              <textarea type="text" 
                className='h-[78%] text-ascent py-1 pl-3 w-[96%] font-bold outline-none overflow-scroll rounded-xl placeholder:text-ascent'
                placeholder='Enter the message here' 
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <div className="h-full w-[7%] sm:w-[4%] flex justify-center items-center cursor-pointer">
                <AiOutlineSend 
                  className='h-[60%] w-[60%] text-dark' 
                  onClick={() => msgSend()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Chats