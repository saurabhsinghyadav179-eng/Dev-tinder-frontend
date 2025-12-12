import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeOneCard } from '../utils/feedSlice';


const UserCard = ({ user }) => {
    const {_id,firstName ,lastName, age ,gender, about, image }=user;
    const dispatch=useDispatch();

    const handleUserRequest=async(status,toUserid)=>{
        try{
          const res=await axios.post(BASE_URL+"/request/send/" + status +"/"+ toUserid, {},
            {withCredentials:true});
            dispatch(removeOneCard(toUserid));
            // console.log(res.data.data);
        }catch(err){
            console.log(err.message);
        }
    }
    
return (
  <div>
    <div className="card bg-base-300 w-96 my-6 mx-10 shadow-lg rounded-xl">
      <figure className="px-4 pt-4">
        <img src={image}
            alt="user"
            className="rounded-xl object-cover w-full h-56"
          />
        
      </figure>

      <div className="card-body p-5 text-center">
        <h2 className="card-title justify-center text-xl font-semibold">
          {firstName + " " + lastName}
        </h2>

        {age && gender}
        <p className="text-sm opacity-70">
          {gender + " • " + age}
        </p>

        <p className="text-sm mt-3 opacity-80">
          {about}
        </p>

        <div className="card-actions flex justify-center gap-6 mt-4">
          <button className="btn  btn-primary w-24" onClick={()=>handleUserRequest("ignored", _id)}>
            Ignore
          </button>
          <button className="btn btn-secondary w-24" onClick={()=>handleUserRequest("interested", _id)}>
            Interested
          </button>
        </div>
      </div>
    </div>
  </div>
);


}

export default UserCard