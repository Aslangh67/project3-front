import React, { useState,useEffect } from "react";

import API from "../../Util/API/API"

export default function AccountOverview(props) {
  // All state data here
  const [companyState, setCompanyState] = useState([])
  const [locationState, setLocationState] = useState([])
  const [userState, setUserState] = useState([])

// Use login state to get user data
  useEffect(()=>{
    API.verifyLogin().then(res=>{
        // setAuthState(res.data);
      API.getUserById(res.data.id).then(res2=>{
        setUserState(res2.data.User_profiles[0])
        setLocationState(res2.data.Locations[0])
        setCompanyState(res2.data)
       }).catch(err=>{
        console.log(err);
      })
    }).catch(err=>{
      console.log(err);
      window.location.href = "/login";
    })
},[])


  return (
    <div>
      <h1 className="accountH1">Account Overview</h1>
      <table>
        <tbody>
          <tr>
            <td>Company Name: </td>
            <td>{companyState.company_name}</td>
            {/* <td>{props.company}</td> */}
            {/* correct props call? */}
          </tr>
          <tr>
            <td>Admin Name: </td>
            <td>{userState.first_name} {userState.last_name}</td>
            {/* <td>{props.admin}</td> */}
          </tr>
          <tr>
            <td>Street Address: </td>
            <td>{locationState.address}</td>
            {/* <td>{props.street}</td> */}
          </tr>
          <tr>
            <td>City: </td>
            <td>{locationState.city}</td>
            {/* <td>{props.city}</td> */}
          </tr>
          <tr>
            <td>Zipcode: </td>
            <td>{locationState.zip}</td>
            {/* <td>{props.zipcode}</td> */}
          </tr>
          <tr>
            <td>EIN: </td>
            <td>{companyState.ein}</td>
            {/* <td>{props.ein}</td> */}
          </tr>
          <tr>
            <td>Email: </td>
            <td>{userState.email}</td>
            {/* <td>{props.email}</td> */}
          </tr>
        </tbody>
      </table>
    </div>
  )
}