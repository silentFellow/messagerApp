import { React, createContext, useContext, useState, useEffect } from 'react'
import { auth, google } from '../firebase.js'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, updateProfile, signOut  } from 'firebase/auth'

export const userContext = createContext();
export const authContext = () => useContext(userContext)

const UserProvider = ({ children }) => {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUserName(user)
    })

    return unsubscribe
  }, [])

  const signUpEmail = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);

  const signInEmail = (email, pass) => signInWithEmailAndPassword(auth, email, pass)

  const signInGoogle = () => signInWithPopup(auth, google);
  
  const updateName = (dname) =>  updateProfile(userName, {displayName : dname})
  
  const updatePhoto = (url) => updateProfile(userName, {photoURL: url})

  const signout = () => signOut(auth);

  const Value = {
    userName, 
    signUpEmail, 
    signInEmail, 
    signInGoogle,
    updateName,
    signout,
    updatePhoto
  }

  return (
    <userContext.Provider value={Value}>
      { children }
    </userContext.Provider>
  )
}

export default UserProvider