import React from "react";


function Navbar(props) {
    return (
        <nav className="navbar">
            {props.children}
        </nav>
    )
};

export default Navbar;