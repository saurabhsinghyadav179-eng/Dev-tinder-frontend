import  { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [isLoginForm, setisLoginForm]=useState(true);
  const [error, setError]=useState("");
  const dispatch= useDispatch();
  const navigate= useNavigate();

  const handleLogin=async ()=>{
   try {
      const res = await axios.post(BASE_URL+ "/login", {
         emailId,
         password,
      },
      {withCredentials:true},
    );

    
    dispatch(addUser(res.data));
    return navigate("/");
    }
    catch (err){
      setError(err?.response?.data||" somethig went wrong");
      
    }
  }


  const handleSignup=async ()=>{
    try{
       const res=await axios.post(BASE_URL+"/signUp", {firstName, lastName, emailId, password}, {withCredentials:true}
       );
       
       dispatch(addUser(res.data.data));
       return navigate("/profile");
    }
    catch(err){
       setError(err?.response?.data||" somethig went wrong");
    }
  }
  return (

    <div className="flex justify-center mt-10">
        <div className="card card-border bg-base-300 w-96 ">
  <div className="card-body ">
    <h2 className="card-title justify-center">{isLoginForm ? "Login":"Sign Up"}</h2>
    <div>
      
     { !isLoginForm && (
      <>
      <fieldset className="fieldset">
  <legend className="fieldset-legend">First Name</legend>
  <input type="text" value={firstName} className="input" onChange={(e)=> setfirstName (e.target.value)}  />
 
  </fieldset>

  <fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name</legend>
  <input type="text" value={lastName} className="input" onChange={(e)=> setlastName (e.target.value)}  />
 
  </fieldset>
      </>
     )}
      
  <fieldset className="fieldset">
  <legend className="fieldset-legend">Email-Id</legend>
  <input type="text" value={emailId} className="input" onChange={(e)=> setEmailId (e.target.value)}  />
 
  </fieldset>

  <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="text" value={password} className="input" onChange={(e)=> setPassword (e.target.value)}  />
 
  </fieldset>
    </div>
    <p className="text-red-700">{error} </p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "Login":"Sign Up"}</button>
    </div>
     <p className= "flex justify-center py-2" onClick={()=>setisLoginForm(value =>!value)}>{isLoginForm? "New user ? Signup here": "Existing User? Login here"} </p>
  </div>
</div>
    </div>
   
  )
}

export default Login