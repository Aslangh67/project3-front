// NPM packages
import React, { useState, useEffect } from "react";
// Components
import Section from "../Components/Section";
import API from "../Util/API/API";
import InventoryTable from "../Components/InventoryTable";
import AccountHistory from "../Components/AccountHistory"
import AccountOverview from "../Components/AccountOverview";
import EditProfile from "../Components/EditProfile";
import PickupSchedule from "../Components/PickupSchedule";
import Navbar from '../Components/Navbar';
import logo from '../style/images/green-earth.svg';
import '../style/css/useraccountpage.min.css';
import SupplierDrawer from "../Components/SupplierDrawer"

export default function SupplierAccountPage() {

  // State variables
  
  const [activePage, setActivePage] = useState("Account Overview")


  // Check login status and redirect if not logged in
  useEffect(() => {
    API.verifyLogin().then(res => {
      if (!res.data.email) {
        window.location.href = "/login";

      }
      
    }).catch(err => {
      console.log(err);
      alert(err);
      window.location.href = "/login";
    })
  }, [])


  function renderComponent() {
    if (activePage === "Account Overview") {
      return <AccountOverview />
    } else if (activePage === "Edit Profile") {
      return <EditProfile />
    } else if (activePage === "Set Pickup Schedule") {
      return <PickupSchedule />
    } else if (activePage === "Inventory") {
      return <InventoryTable />
    } else if(activePage==="Account History"){
      return <AccountHistory />
    } else if (activePage === "Home") {
      window.location.href = "/";
    } else if (activePage === "Logout") {
      API.logOut().then(res => {
        window.location.href = "/";
      }).catch(err => {
        console.log(err);
      })
    }
  }


  return (
    <div className='main'>
      <div className='container row'>
        <Navbar>
          <img onClick={() => { setActivePage("Home") }} className='logo' src={logo} alt='logo'></img>
          <SupplierDrawer setActivePage={setActivePage} />

        </Navbar>
        <div className='row'>
          <Section>
            {renderComponent()}
          </Section>
        </div>
      </div>
    </div>
  )
}