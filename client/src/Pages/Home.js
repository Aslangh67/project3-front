import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import logo from '../style/images/green-earth.svg';
import '../style/css/homepage.min.css';
import HomeDrawer from "../Components/HomeDrawer";
import API from "../Util/API/API";

function Home() {

  // State variables
  const [activePage, setActivePage] = useState("Account Overview")
  const [isMobile, setIsMobile] = useState(false);
  const [authState, setAuthState] = useState({
    loggedIn: false,
    userData: {}
  })

  // Check login status and redirect if not logged in
    useEffect(()=>{
      API.verifyLogin().then(res=>{
        if (res.data.email) {
          setAuthState({
            loggedIn: true,
            userData: res.data
          });
        } 
      }).catch(err=>{
        setAuthState({
          loggedIn: false
        });
        console.log(err);
      })
  },[])

// route navigation
  useEffect(() => {
    switch (activePage) {
      case "login":
        window.location.href = "/login";
        break;
      case "register":
        window.location.href = "/register";
        break;
      case "logout":
        API.logOut().then(res=>{
          setAuthState({
            loggedIn: false
          });
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })
        break;
      case "charity":
        window.location.href = "/charity";
        break;
      case "supplier":
        window.location.href = "/supplier";
        break;
      default:
        break;
    }
  }, [activePage]);


  useEffect(() => {
    if (window.screen.availWidth < 824) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [window.screen.availWidth]);

  

  return (
    <>
      <div className='container main'>
        <div className='row'>
          <Navbar>
            <img className='logo' src={logo} alt='logo'/>
            <HomeDrawer setActivePage={setActivePage} isMobile={isMobile} authState={authState}/>
            {isMobile ? (<div />) : (
              <div>
                {/* display routes if logged out */}
                {authState.loggedIn === false ? <a onClick={()=>{setActivePage("register")}}>Register</a> : <div/>}
                {authState.loggedIn === false ? <a onClick={()=>{setActivePage("login")}}>Login</a> : <div/>}
                {/* display routes if logged in */}
                {authState.loggedIn === true ? <a onClick={()=>{setActivePage("logout")}} >Logout</a> : <div/>}
                {authState.loggedIn === true && authState.userData.companyType === "charity" ? <a onClick={()=>{setActivePage("charity")}}>Charity Profile</a> : <></>} 
                {authState.loggedIn === true && authState.userData.companyType === "supplier" ? <a onClick={()=>{setActivePage("supplier")}}>Supplier Profile</a> : <></>} 
              </div>
            )}
          </Navbar>
        </div>
        <div className='main-text'>
          <h1 id='main-name'>leftōvers</h1>

        </div>
      </div>

      <div className='container home-page-data'>
        <div className='row'>
          <div className='main-info' id='main-info'>
            <div className='col span-1-of-3 box'>
              <p className='icon'><i className="far fa-trash-alt fa-2x"></i></p>
              <p>In the United States alone, 40 percent of food goes uneaten every year. This amounts to $162 billion in waste annually, according to the Natural Resources Defense Council. This level of waste has far-reaching impacts on society. Food that could have helped feed families in need is sent to landfills, and resources involved in producing this food, such as land, water, labor, and energy, are wasted.</p>
            </div>
            <div className='col span-1-of-3 box'>
              <p className='icon'><i className="far fa-handshake fa-2x"></i></p>
              <p>In 2018, an estimated 1 in 9 Americans were food insecure, equating to over 37 million people. Food insecurity does not have one main cause, as low-income families are often affected by multiple, overlapping issues, such as lack of affordable housing, chronic health problems, high medical costs, and low wages. Making sure food banks and hunger-relief organizations have enough provisions is a huge piece in solving this puzzle.</p>
            </div>
            <div className='col span-1-of-3 box'>
              <p className='icon'><i className="fas fa-globe-americas fa-2x"></i></p>
              <p>Getting food from farm to fork takes up 10% of the total U.S. energy budget, 50% of U.S. land, and 80% of all freshwater consumed in the United States. Increasing the efficiency of our food system is a necessity that requires collaborative efforts between businesses, governments and consumers. Here at Leftovers, we would like to facilitate and establish these relationships and begin working towards a less wasteful world.</p>
            </div>
          </div>
        </div>
      </div>

    </>
  )

}

export default Home;

