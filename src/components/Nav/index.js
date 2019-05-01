import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserIcon from "../../assets/images/user.png";
import StopwatchIcon from "../../assets/images/stopwatch.png";

import { NavWrapper } from "./styles";

class Nav extends Component {
    render() {
        return (
            <NavWrapper>
                <Link to="/user">
                    <img src={UserIcon} alt="User" />
                </Link>

                <Link to="/session">
                    <img src={StopwatchIcon} alt="Stopwatch" />
                </Link>

                <Link to="/user">
                    <img src={UserIcon} alt="User" />
                </Link>
            </NavWrapper>
        );
    }
}

export default Nav;
