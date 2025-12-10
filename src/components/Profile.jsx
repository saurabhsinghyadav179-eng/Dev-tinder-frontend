import React from 'react'
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile'

const Profile = () => {

 const user=useSelector(store=>(store.user));
 
  return (
    <>
   {user.userData &&(
    
      <EditProfile  user= {user}/>
    
   )  }
   </>
  );
};
export default Profile