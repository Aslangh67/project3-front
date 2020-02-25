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

  const [lastTargetState, setLastTargetState] = useState({ target: "", value: "" });

  const handleInputChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    setUserState({
      ...userState,
      [name]: value
    });
    if (name !== lastTargetState.target && lastTargetState.target) {
      console.log(`validate ${lastTargetState.target}: ${lastTargetState.value}`);
      verifyInput(lastTargetState.target, lastTargetState.value)
      setLastTargetState({ target: name, value: value });
    } else {
      setLastTargetState({ target: name, value: value });
    }
  };

  ///////////////// form validation ///////////////////////
  // Verify input values
  const [inputValidated, setInputValidated] = useState(
    {
      ein: false,
      accountType: false,
      company: false,
      adminFirstName: false,
      adminLastName: false,
      street: false,
      city: false,
      state: false,
      zipCode: false,
      email: false,
      password: false,
      confirmPassword: false
    })

  const [warningText, setWarningText] = useState(
    {
      ein: true,
      accountType: true,
      company: true,
      adminFirstName: true,
      adminLastName: true,
      street: true,
      city: true,
      state: true,
      zipCode: true,
      email: true,
      password: true,
      confirmPassword: true
    })

  const inputFields = ["ein", "accountType", "company", "adminFirstName", "adminLastName", "street", "city", "state", "zipCode", "email", "password", "confirmPassword"]

  // Verify Inputs
  function verifyInput(target, value) {
    const stateAbrive = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
    const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,128}$/;

    if (target === "accountType") {
      if (value) {
        setInputValidated({ ...inputValidated, accountType: true })
        setWarningText({ ...warningText, accountType: true })
      } else {
        setInputValidated({ ...inputValidated, accountType: false });
        setWarningText({ ...warningText, accountType: false });
      };
    };
    if (target === "ein") {
      if (value.toString().length === 9) {
        setInputValidated({ ...inputValidated, ein: true })
        setWarningText({ ...warningText, ein: true })
        API.einChecker(
          value
        ).then(res => {
          console.log(res)
          alert(`The EIN matches: ${res.data.name} located at ${res.data.address}, ${res.data.city}, ${res.data.state}. Is this your company?`)
          setUserState({
            ...userState,
            ein: res.data.ein,
            company: res.data.name,
            street: res.data.address,
            city: res.data.city,
            state: res.data.state
          })
        }).catch(res => {
          console.log('This EIN does not match the charity EIN database' + res)
        })
      } else {
        setInputValidated({ ...inputValidated, ein: false });
        setWarningText({ ...warningText, ein: false });
      };
    };
    if (target === "company") {
      if (value) {
        setInputValidated({ ...inputValidated, company: true })
        setWarningText({ ...warningText, company: true })
      } else {
        setInputValidated({ ...inputValidated, company: false });
        setWarningText({ ...warningText, company: false });
      };
    };
    if (target === "adminFirstName") {
      if (value) {
        setInputValidated({ ...inputValidated, adminFirstName: true })
        setWarningText({ ...warningText, adminFirstName: true })
      } else {
        setInputValidated({ ...inputValidated, adminFirstName: false });
        setWarningText({ ...warningText, adminFirstName: false });
      };
    };
    if (target === "adminLastName") {
      if (value) {
        setInputValidated({ ...inputValidated, adminLastName: true })
        setWarningText({ ...warningText, adminLastName: true })
      } else {
        setInputValidated({ ...inputValidated, adminLastName: false });
        setWarningText({ ...warningText, adminLastName: false });
      };
    };
    if (target === "street") {
      if (value) {
        setInputValidated({ ...inputValidated, street: true })
        setWarningText({ ...warningText, street: true })
      } else {
        setInputValidated({ ...inputValidated, street: false });
        setWarningText({ ...warningText, street: false });
      };
    };
    if (target === "city") {
      if (value) {
        setInputValidated({ ...inputValidated, city: true })
        setWarningText({ ...warningText, city: true })
      } else {
        setInputValidated({ ...inputValidated, city: false });
        setWarningText({ ...warningText, city: false });
      };
    };
    if (target === "state") {
      if (value && stateAbrive.includes(value.toUpperCase())) {
        setInputValidated({ ...inputValidated, state: true })
        setWarningText({ ...warningText, state: true })
      } else {
        setInputValidated({ ...inputValidated, state: false });
        setWarningText({ ...warningText, state: false });
      };
    };
    if (target === "zipCode") {
      if (value.toString().length === 5) {
        setInputValidated({ ...inputValidated, zipCode: true });
        setWarningText({ ...warningText, zipCode: true });
      } else {
        setInputValidated({ ...inputValidated, zipCode: false });
        setWarningText({ ...warningText, zipCode: false });
      };
    };
    if (target === "email") {
      // Check email format
      if (emailCheck.test(String(value).toLowerCase())) {
        console.log("email character test passed");
        console.log(userState.email);
        // Check if it exists in the database
        API.checkUserEmail(userState.email.trim()).then(res => {
          setInputValidated({ ...inputValidated, email: false });
          setWarningText({ ...warningText, email: false });
          console.log(res)
        }).catch(err => {
          console.log(err);
          console.log(target + "is available");
          setInputValidated({ ...inputValidated, email: true })
          setWarningText({ ...warningText, email: true })
        })
      } else {
        console.log("email character check failed");
        setInputValidated({ ...inputValidated, email: false });
        setWarningText({ ...warningText, email: false });
      };

    };
    if (target === "password") {
      // development password check
      if (value) {
        // production password check
        // if (value && value.match(passwordCheck)) {
        setInputValidated({ ...inputValidated, password: true });
        setWarningText({ ...warningText, password: true });
      } else {
        setInputValidated({ ...inputValidated, password: false });
        setWarningText({ ...warningText, password: false });
      };
    };
    if (target === "confirmPassword") {
      if (value === userState.password) {
        setInputValidated({ ...inputValidated, confirmPassword: true });
        setWarningText({ ...warningText, confirmPassword: true });
      } else {
        setInputValidated({ ...inputValidated, confirmPassword: false });
        setWarningText({ ...warningText, confirmPassword: false });
      };
    };
  }

  ////////////////// submit form ////////////////////////
  const submitRegistration = (event) => {
    event.preventDefault();
    // Validate all values    
    if (Object.values(inputValidated).indexOf(false) !== -1) {
      inputFields.forEach((element, index) => {
        if (Object.values(inputValidated)[index] === false) {
          verifyInput(element, Object.values(userState)[index]);
          console.log(element + " not validated")
        } else {
          console.log(element + " validated")
        }
      });
    };
    // if (Object.values(inputValidated).indexOf(false) !== -1) {
    //   inputFields.forEach((element, index) => {
    //     if (Object.values(inputValidated)[index] === false) {
    //       verifyInput(element, Object.values(userState)[index]);
    //       console.log(element + " not validated")
    //     } else {
    //       console.log(element + " validated")
    //     }
    //   });
    // };

    if (Object.values(inputValidated).indexOf(false) !== -1 ) {
      alert("validation failed")
    };

    // API calls to create user profile
    if (Object.values(inputValidated).indexOf(false) === -1) {
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
              name='accountType' />
            Supplier
            </label>
        </div>
        {warningText.accountType === false ? <p style={{ color: "red" }}>* An account type must be selected</p> : <div></div>}
        <h6>Business Info</h6>
        <input className='text-input'
          value={userState.ein}
          onChange={handleInputChange}
          type='number'
          name='ein'
          placeholder='EIN'
          maxLength="9"
        />
        {warningText.ein === false ? <p style={{ color: "red" }}>* enter 9 digit EIN with no dash</p> : <div></div>}
        <input className='text-input'
          value={userState.company}
          onChange={handleInputChange}
          type='text'
          name='company'
          placeholder='COMPANY NAME'
        />
        {warningText.company === false ? <p style={{ color: "red" }}>* company required</p> : <div></div>}
        <input className='text-input'
          value={userState.street}
          onChange={handleInputChange}
          type='text'
          name='street'
          placeholder='ADDRESS'
        />
        {warningText.street === false ? <p style={{ color: "red" }}>* address required</p> : <div></div>}
        <input className='text-input'
          value={userState.city}
          onChange={handleInputChange}
          type='text'
          name='city'
          placeholder='CITY'
        />
        {warningText.city === false ? <p style={{ color: "red" }}>* city required</p> : <div></div>}
        <input className='text-input'
          value={userState.state}
          onChange={handleInputChange}
          type='text'
          name='state'
          placeholder='STATE'
          maxLength="2"
        />
        {warningText.state === false ? <p style={{ color: "red" }}>* enter 2 letter state abbreviation</p> : <div></div>}
        <input className='text-input'
          value={userState.zipcode}
          onChange={handleInputChange}
          type='number'
          name='zipCode'
          placeholder='ZIPCODE'
          maxLength="5"
        />
        {warningText.company === false ? <p style={{ color: "red" }}>* enter 5 digit zip</p> : <div></div>}
        <br />
        <hr />
        <br />
        <h6>User Info</h6>
        <input className='text-input'
          value={userState.adminFirstName}
          onChange={handleInputChange}
          type='text'
          name='adminFirstName'
          placeholder='ADMIN FIRST NAME'
        />
        {warningText.company === false ? <p style={{ color: "red" }}>* first name required</p> : <div></div>}
        <input className='text-input'
          value={userState.adminLastName}
          onChange={handleInputChange}
          type='text'
          name='adminLastName'
          placeholder='ADMIN LAST NAME'
        />
        {warningText.zipCode === false ? <p style={{ color: "red" }}>* last name required</p> : <div></div>}
        <input className='text-input'
          value={userState.email}
          onChange={handleInputChange}
          type='email'
          name='email'
          placeholder='EMAIL'
        />
        {warningText.email === false ? <p style={{ color: "red" }}>* is not valid format (name@company.com) or it is already in use</p> : <div></div>}
        <input className='text-input'
          value={userState.password}
          onChange={handleInputChange}
          type='password'
          name='password'
          placeholder='PASSWORD'
        />
        {warningText.password === false ? <p style={{ color: "red" }}>* password must be 8 characters containing at least one lowercase letter, uppercase letter, number, and special character </p> : <div></div>}
        <input className='text-input'
          value={userState.confirmPassword}
          onChange={handleInputChange}
          type='password'
          name='confirmPassword'
          placeholder='CONFIRM PASSWORD'
        />
        {warningText.confirmPassword === false ? <p style={{ color: "red" }}>* passwords do not match</p> : <div></div>}
        <button className='btn-main' type='submit' value='submit' onClick={submitRegistration}>SUBMIT</button>
    </form>
      </div>
  )
};