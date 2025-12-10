import React from 'react'
import  { useState } from "react";
import axios from "axios"
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';

const EditProfile = ({user}) => {
 console.log(user.userData);

  const [firstName, setfirstName] = useState(user.userData?.firstName||"");
  const [lastName, setlastName] = useState(user.userData?.lastName||"");
  const [age, setage] = useState(user?.userData?.age||"");
  const [gender, setgender] = useState(user?.userData?.gender||"");
  const [image, setimage] = useState(user?.userData?.image||"");
  const [about , setabout] = useState(user?.userData?.about||"");
  const [error, setError]=useState("");
  const dispatch =useDispatch();
  const [toast, settoast]=useState("");
 

  const saveProfile=async ()=>{
    //clear errors
    setError(" ");
   try {
      const res = await axios.patch(BASE_URL+ "/profile/edit", {
         firstName,
         lastName,
         age,
         gender,
         image,
         about,

      },
      {withCredentials:true},
    );
     dispatch(addUser(res?.data?.data));
     settoast(true);
     setTimeout(()=>{
        settoast(false);
     } ,1000);
    console.log(res.data);
    
  
    }
    catch (err){
      setError(err?.response?.data);
      
    }
  }
  return (
    <>
     <div className='flex justify-center my-10'>
     <div className="min-h-screen flex justify-center   ">
        <div className="card bg-base-300 w-80 spt-6 pb-24 hadow-md ">
  <div className="card-body ">
    <h2 className="card-title justify-center">Profile</h2>
    <div>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">firstName:</legend>
  <input type="text" value={firstName} className="input" onChange={(e)=> setfirstName (e.target.value)}  />
  </fieldset>
  <fieldset className="fieldset">
  <legend className="fieldset-legend">lastName:</legend>
  <input type="text" value={lastName} className="input" onChange={(e)=> setlastName (e.target.value)}  />
  </fieldset>
  <fieldset className="fieldset">
  <legend className="fieldset-legend  text-xs">age:</legend>
  <input type="text" value={age} className="input" onChange={(e)=> setage (e.target.value)}  />
  </fieldset>
   <fieldset className="fieldset">
  <legend className="fieldset-legend">gender:</legend>
  <input type="text" value={gender} className="input" onChange={(e)=> setgender (e.target.value)}  />
  </fieldset>

 <fieldset className="fieldset">
  <legend className="fieldset-legend">photo url:</legend>
  <input type="text" value={image} className="input" onChange={(e)=> setimage (e.target.value)}  />
  </fieldset>
   <fieldset className="fieldset">
  <legend className="fieldset-legend">about:</legend>
  <input type="text" value={about} className="input" onChange={(e)=> setabout (e.target.value)}  />
  </fieldset>
  
    </div>
    <p className="text-red-700">{error} </p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={saveProfile}>Save profile</button>
    </div>
  </div>
</div>
    </div>

    <UserCard  user={{firstName, lastName,  age,  gender ,image,  about,}}/>
    </div>  
   {toast&&
   (<div className="toast toast-top toast-center">
 
  <div className="alert alert-success">
    <span>Profile saved Succesfully!!</span>
  </div>
</div>
)}
     </>
  )
}

export default EditProfile