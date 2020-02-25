import React from "react";

export default function Aside(props) {

  return (
    <aside className="aside span-1-of-5">
      <div>
        {props.children}
      </div>
    </aside>
  )
}