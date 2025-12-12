import axios from 'axios'
import  { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from "../utils/feedSlice";
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error("error", err);
    }
  };

  useEffect(() => {
    if (feed === null) {
      getFeed();
    }
  }, [feed]);

  if (feed === null) return null;

  if (feed.length <= 0) {
    return <p>No new users found</p>;
  }

  return (
    <div className="flex justify-center my-7">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
