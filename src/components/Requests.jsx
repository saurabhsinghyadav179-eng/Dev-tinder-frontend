import { useDispatch } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useEffect } from "react";
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useSelector } from 'react-redux';


const Requests = () => {
const requests = useSelector(
  (store) => store.requests
);
 const dispatch=useDispatch();

 const reviewRequests=async (status, _id)=>{
    try {
        const res =await axios.post(BASE_URL+"/request/review/" + status +"/"+ _id,{}, 
           { withCredentials:true},
           
        );
        dispatch(removeRequest(_id));
        console.log(res.data.data);
    
    }catch(err){
        console.log(err.message);
    }
 }
const fetchRequests =async ()=>{
    
    try{
    const res = await axios.get(
         `${BASE_URL}/user/request/recieve`,
        { withCredentials: true }
      );
      dispatch(addRequests(res.data.data));
      console.log(res.data.data);

    }catch(err){
        console.log(err.message);
    }
} 
 useEffect(() => {
    fetchRequests();
  }, []);


   if(!requests){
        return;
    }
    if (requests.length === 0) {
  return <p className="text-center">Requests not found</p>;
}

     
  return (
   
    <div className="justify-center text-center mt-6 "> 
    <h1 className='text-3xl font-bold mb-6 tracking-wide'>Requests</h1>

    {requests.map((request) => {
        const {_id,firstName, lastName,age , gender, image, about}=request.fromUserid;
  return (
    <div    key={_id} className="flex justify-between items-center p-6 bg-base-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300  m-4" >
        <div className='text-left mx-4'>
             <img alt="photo" className=" w-24 h-24 rounded-full  border-2 border-primary"src={image}></img>
        </div>
        <div className='text-left'>
          <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2> 
            <p className='text-sm  mt-1'>{age + " " + gender}</p>
            <p className='mt-3 line-clamp-2'>{about}</p>
        </div>
       <div className="flex flex-col gap-3 items-end">
    <button className="btn btn-primary w-24" onClick={()=>reviewRequests("accepted",request._id)}>Accept</button>
    <button className="btn btn-secondary w-24" onClick={()=>reviewRequests("rejected",request._id)}>Reject</button>
  </div>
    </div>
  );
})}


    </div>

  )

}

export default Requests