import React from 'react'

const UserCard = ({ user }) => {
    const {firstName ,lastName, age ,gender, about, image ,skills }=user;
    console.log(user);
  return (
    <div>
        <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={user?.image}
      alt="user photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName +" "+ lastName} </h2>
      {age  && gender}  <p className='gender'>  {gender + age } </p>
        <p>{about}</p>
        <div className="card-actions flex justify-center gap-8">
      <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard