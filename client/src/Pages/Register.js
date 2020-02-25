import React, { useState, useEffect } from "react";
import Form from "../Components/Form";
import Navbar from '../Components/Navbar';
import logo from '../style/images/green-earth.svg';
import '../style/css/registerpage.min.css';
import RegisterDrawer from "../Components/RegisterDrawer"

export default function Register() {

  const [activePage, setActivePage] = useState("Account Overview")

  useEffect(() => {
    switch (activePage) {
      case "Login":
        window.location.href = "/login";
        break;
      case "Home":
        window.location.href = "/"
        break;
        default:
    }
  }, [activePage]);


  return (
    <div className='main'>
      <div className='container'>
        <div className='row'>
          <Navbar>
            <img onClick={()=>{setActivePage("Home")}} className='logo' src={logo} alt='logo'></img>
            <RegisterDrawer setActivePage={setActivePage} />
          </Navbar>
        </div>
      </div>
      <Form />
    </div>
  )
}