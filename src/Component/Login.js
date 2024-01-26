import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import {useDispatch} from "react-redux"
import { addUser } from '../utils/userSlice';

const Login = () => {

  const[isSignInForm,setIsSignForm]=useState(true);
  const[errorMessage,setErrorMessage]=useState(null);
  const toggleSignInForm = () =>{
    setIsSignForm(!isSignInForm);
  }
  const dispatch=useDispatch();

  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);

  const handleButtonClick = () =>{
    const message=checkValidData(email.current.value,password.current.value)
    setErrorMessage(message);

    //if message is a string then there is a error
    if(message) return;
    // otherwise create a user or login
    if(!isSignInForm){
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
       })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage)
      });
    }
    else{
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
          // Profile updated!
          // ...
          const {uid, email,displayName} = auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayName:displayName}))
        }).catch((error) => {
          // An error occurred
          // ...
        });
        // ...
      })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage("Something went wrong !")
        // ..
      });
    }

  }

  return (
    <div className="overflow-hidden">
        <Header/>
        <div className="absolute">
        <img
            src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
            alt='background'
        />
        </div>
        <form onSubmit={(e)=>{e.preventDefault()}} className="absolute w-3/12 p-12 mx-auto my-28 right-0 left-0 text-white bg-black opacity-90">
            <h1 className="font-bold text-3xl py-4">
              {isSignInForm ? "Sign Up" : "Login"}
            </h1>
            {isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-3 my-4 w-full bg-gray-800"/>}
            <input ref={email} type="text" placeholder="Email Address" className="p-3 my-4 w-full bg-gray-800"/>
            <input ref={password} type="password" placeholder="Password" className="p-3 my-4 w-full bg-gray-800"/>
            <p className="text-red-500 font-bold text-lg py-2 overflow-hidden">{errorMessage}</p>
            <button className="p-4 my-6 bg-red-700 w-full" onClick={handleButtonClick}>
              {isSignInForm ? "Sign Up" : "Login"}
            </button>
            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm ? "Already a user? Login" : "New to Netflix? Sign Up Now" }
              </p>
        </form>
    </div>
  )
}

export default Login