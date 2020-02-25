import React, { useState, useEffect } from "react";
import LoginForm from "../Components/LoginForm";
import Navbar from '../Components/Navbar';
import logo from '../style/images/green-earth.svg';
import '../style/css/loginform.min.css';
import LoginDrawer from "../Components/LoginDrawer";

export default function Login() {

  const [activePage, setActivePage] = useState("Account Overview")

  useEffect(() => {
    switch (activePage) {
      case "Register":
        window.location.href = "/register";
        break;
        case "Home":
          window.location.href = "/"
        break;
      default:
        break;
    }
  }, [activePage]);

  return (
    <div className='container main'>
      <div className='row'>
        <Navbar>
          <img onClick={()=>{setActivePage("Home")}}  className='logo' src={logo} alt='logo'></img>
          <LoginDrawer setActivePage={setActivePage} />
        </Navbar>
      </div>
      <div className='row'>
        <LoginForm/>
      </div>
    </div>
  )
}