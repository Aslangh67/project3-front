import React from "react";

export default function PickupSchedule(props) {
  return (
    <div>
      <h1 className="pickupH1"> Set Pickup Schedule </h1>
      <form>
        <div className="formInput">
          <label for="pickupDate">Pickup Date:</label>
          <input type="date" id="pickupDate" name="pickupDate" />
        </div>
        <div className="formInput">
          <label for="pickupDate">Pickup Time:</label>
          <input type="time" id="pickupTime" name="pickupTime" />
        </div>
        <button className="btn-main" type="submit">Submit</button>
      </form>
    </div>
  )
}