import React, { useEffect } from 'react'
import NavBar from "./NavBar"
import Footer from "./Footer"
import { BASE_URL } from '../utils/constants'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { addUser } from '../utils/userSlice'

const Body = () => {
   const dispatch=useDispatch();
   const navigate=useNavigate();
  const fetchUser= async ()=>{
    try{
      const res = await axios.get(BASE_URL+ "/profile",{
         withCredentials:true,
    });
    dispatch(addUser(res.data));
    }
    catch(err){
      if (err.response?.status === 401){
         navigate("/login")
      }
      console.error(err);
     
    }
  }

  useEffect(() => {
  fetchUser();
}, []);

  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    
    </>
  )
}

export default Body