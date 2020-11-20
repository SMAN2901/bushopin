import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar-container">
                <div className="navbar-inner">
                    <Link className="navbar-logo" to="/">
                        BUS HOPIN
                    </Link>
                </div>
            </div>
        );
    }
}

export default Navbar;
