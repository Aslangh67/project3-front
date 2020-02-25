import React, { useState } from "react";
import API from "../../Util/API/API";

export default function Form() {
  //////////////// State Variables ////////////////////
  const [userState, setUserState] = useState({
    ein: "",
    accountType: "",
    company: "",
    adminFirstName: "",
    adminLastName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    setUserState({
      ...userState,
      [name]: value
    });
  };

  ////////////////// submit form ////////////////////////
  const submitRegistration = (event) => {
    event.preventDefault();
    console.log("submit pressed");

    const stateAbrive = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
    const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,128}$/;

    // check form input exists
    if (!userState.accountType && !userState.company && !userState.adminFirstName && !userState.adminLastName && !userState.street && !userState.city) {
      alert("all fields must be filled")
      // Check ein length
    } else if (userState.ein.toString().length !== 9) {
      alert("ein")
      // check state abbreviation
    } else if (!stateAbrive.includes(userState.state.toUpperCase())) {
      alert("state")
      // check zip code length
    } else if (userState.zipCode.toString().length !== 5) {
      alert("zip")
      // Check email format
    } else if (!emailCheck.test(String(userState.email).toLowerCase())) {
      alert("email")
      // Check email
    } else if (!userState.password.match(passwordCheck)) {
      alert("password")
      // check password match
    } else if (userState.confirmPassword !== userState.password) {
      alert("password match")
    } else {

      API.checkUserEmail(userState.email.trim()).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err);
        console.log(userState.email + "is available");

        // API calls to create user profile

        console.log("api call triggered");
        ///// Create Company /////
        API.createCompany({
          company_name: userState.company.trim(),
          ein: userState.ein.trim(),
          account_type: userState.accountType
        }).then(res => {
          console.log(res);
          ///// Create user /////
          API.createUser({
            password: userState.password.trim(),
            first_name: userState.adminFirstName.trim(),
            last_name: userState.adminLastName.trim(),
            email: userState.email.toLowerCase().trim(),
            username: userState.email.toLowerCase().trim(),
            admin: 1, // maybe replace with user input
            CompanyProfileId: res.data.id
          }).then(res2 => {
            ///// Create location /////
            API.createLocation({
              address: userState.street.trim(),
              city: userState.city.trim(),
              state: userState.state.trim().toUpperCase(),
              zip: userState.zipCode.trim(),
              CompanyProfileId: res.data.id
            }).then((res3) => {
              console.log(res3);
              ///// Login after data is added /////
              API.logIn({
                email: userState.email.trim(),
                password: userState.password.trim()
              }).then(res => {
                ///// Route to profile page /////
                if (res.data.companyType === "charity") {
                  window.location.href = "/charity";
                } else if (res.data.companyType === "supplier") {
                  window.location.href = "/supplier";
                } else {
                  alert("Account type not specified")
                  window.location.href = "/";
                }
              }).catch(err => {
                console.log(err);
              })
            }).catch(err => {
              console.log(err);
            })
          }).catch(err => {
            console.log(err);
          })
        }).catch(err => {
          console.log(err);
        })
      })
    }
  }

  //////////////////// JSX /////////////////////////
  return (
    <div className='register-container'>
      <form className="register-form row">

        <h3>Account Setup</h3>
        <div className='radios'>
          <label>
            Charity
            <input
              className='radio-button'
              value='charity'
              onChange={handleInputChange}
              type="radio"
              name='accountType'
            />
          </label>
          <label>
            <input
              className='radio-button'
              value='supplier'
              onChange={handleInputChange}
              type="radio"
              name='accountType'
            />
            Supplier
            </label>
        </div>
        <h6>Business Info</h6>
        {/* EIN */}
        <input className='text-input'
          value={userState.ein}
          onChange={handleInputChange}
          type='number'
          name='ein'
          placeholder='EIN'
          maxLength="9"
        />
        {/* company */}
        <input className='text-input'
          value={userState.company}
          onChange={handleInputChange}
          type='text'
          name='company'
          placeholder='COMPANY NAME'
        />
        {/* address */}
        <input className='text-input'
          value={userState.street}
          onChange={handleInputChange}
          type='text'
          name='street'
          placeholder='ADDRESS'
        />
        {/* city */}
        <input className='text-input'
          value={userState.city}
          onChange={handleInputChange}
          type='text'
          name='city'
          placeholder='CITY'
        />
        {/* state */}
        <input className='text-input'
          value={userState.state}
          onChange={handleInputChange}
          type='text'
          name='state'
          placeholder='STATE'
          maxLength="2"
        />
        {/* zip */}
        <input className='text-input'
          value={userState.zipcode}
          onChange={handleInputChange}
          type='number'
          name='zipCode'
          placeholder='ZIPCODE'
          maxLength="5"
        />
        <br />
        <hr />
        <br />
        <h6>User Info</h6>
        {/* first name */}
        <input className='text-input'
          value={userState.adminFirstName}
          onChange={handleInputChange}
          type='text'
          name='adminFirstName'
          placeholder='ADMIN FIRST NAME'
        />
        {/* last name */}
        <input className='text-input'
          value={userState.adminLastName}
          onChange={handleInputChange}
          type='text'
          name='adminLastName'
          placeholder='ADMIN LAST NAME'
        />
        {/* email */}
        <input className='text-input'
          value={userState.email}
          onChange={handleInputChange}
          type='email'
          name='email'
          placeholder='EMAIL'
        />
        {/* password */}
        <input className='text-input'
          value={userState.password}
          onChange={handleInputChange}
          type='password'
          name='password'
          placeholder='PASSWORD'
        />
        {/* confirm password */}
        <input className='text-input'
          value={userState.confirmPassword}
          onChange={handleInputChange}
          type='password'
          name='confirmPassword'
          placeholder='CONFIRM PASSWORD'
        />
        <button className='btn-main' type='submit' value='submit' onClick={submitRegistration}>SUBMIT</button>
      </form>
    </div>
  )
};