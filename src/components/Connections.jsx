import axios from 'axios'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addConnections } from "../utils/connectionSlice";
import { useSelector } from 'react-redux';


const Connections = () => {
    const connections = useSelector(
  (store) => store.connections
);
    const dispatch=useDispatch();
    const fetchConnection= async ()=>{
try {
      const res = await axios.get(
         `${BASE_URL}/user/connections`,
        { withCredentials: true }
      );
      dispatch(addConnections(res.data.data));
    
    
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };
  useEffect(() => {
    fetchConnection();
  }, []);

    if(!connections){
        return;
    }
    if (connections.length === 0) {
  return <p className="text-center">Connections not found</p>;
}

     
  return (
  <div className="flex flex-col items-center text-center mt-6">
    <h1 className="text-3xl font-bold mb-6 tracking-wide">
      Connections
    </h1>

    {connections.map((connection) => {
      const { _id, firstName, lastName, age, gender, image, about } = connection;
      return (
        <div
          key={_id}
          className="flex items-center w-full max-w-2xl p-6 bg-base-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 m-4 gap-4"
        >
          <div className="text-left">
            <img
              alt="photo"
              className="w-24 h-24 rounded-full border-2 border-primary object-cover"
              src={image}
            />
          </div>

          <div className="text-left flex-1">
            <h2 className="font-bold text-xl leading-tight">
              {firstName + " " + lastName}
            </h2>
            <p className="text-sm mt-1 text-white-500">
              {age + " " + gender}
            </p>
            <p className="mt-3 text-sm text-white-600 line-clamp-2">
              {about}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);


}
export default Connections


