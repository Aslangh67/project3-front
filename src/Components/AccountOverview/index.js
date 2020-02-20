import React, { useState,useEffect } from "react";
import {Redirect,useHistory} from "react-router-dom"

import API from "../../Util/API/API"

export default function AccountOverview(props) {
  const history = useHistory();
  // Session data stored here 
  let sessionData = {};
  // Check login status and redirect if not logged in
    useEffect(()=>{
      API.verifyLogin().then(res=>{
        if (res.data.email) {
          sessionData = res.data;
          API.getUserById(sessionData.CompanyProfileId).then(data=>{
            setUserState(data.data.User_profiles[0])
            setLocationState(data.data.Locations[0])
            setcompanyState(data.data)
            console.log(data.data);
            
          })
          console.log(sessionData);
        } else {
          history.push("/login");
        }  
      }).catch(err=>{
        console.log(err);
          history.push("/login");
      })
  },[])
  const [companyState, setcompanyState] = useState([])
  const [locationState, setLocationState] = useState([])
  const [userState, setUserState] = useState([])
<<<<<<< HEAD
//   useEffect(()=>{
//     console.log(props.sessionData);
    
//     API.getUserById(1).then(data=>{
//       setUserState(data.data.User_profiles[0])
//       setLocationState(data.data.Locations[0])
//       setcompanyState(data.data)
//       console.log(data.data);
=======
  useEffect(()=>{
    API.getUserById(1).then(data=>{
      setUserState(data.data.User_profiles[0])
      setLocationState(data.data.Locations[0])
      setcompanyState(data.data)
      console.log(data.data);
>>>>>>> 82977096d4ebc56415e495432194ac55e3095667
      
//     })
// },[])

  return (
    <div>
      <h1>Account Overview</h1>
      <h2>Profile</h2>
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