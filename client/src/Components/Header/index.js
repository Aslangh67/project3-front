import React from "react";

export default function Header(props) {
    return (
        <header className="header">
            {props.children}
        </header>
    )
};

