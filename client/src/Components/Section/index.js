import React from "react";

export default function Section(props) {
  return (
    // <div className="container">
      <div className="Section span-2-of-3">
        {props.children}
      </div>
    // </div>

  )
};