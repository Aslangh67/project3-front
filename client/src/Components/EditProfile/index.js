import React from "react";

export default function EditProfile(props) {
  return (
    <div className='edit-container'>
      <h1 className="sectionH1"> Edit Profile </h1>
      <p>Company Name</p>
      <input placeholder=""></input>
      <p>Admin Name</p>
      <input placeholder=""></input>
      <p>Street Address</p>
      <input placeholder=""></input>
      <p>City</p>
      <input placeholder=""></input>
      <p>State</p>
      <input type='number' placeholder=""></input>
      <p>Zipcode</p>
      <input type='number' placeholder=""></input>
      <p>EIN</p>
      <input type='number' placeholder=""></input>
      <p>Email</p>
      <input placeholder=""></input>
      <p>Password</p>
      <input placeholder=""></input>
      {/* Add confirm password? Also add API calls to change this info in DB */}
      <br/>
      <button className="btn-main">Submit</button>
    </div>
  )
}