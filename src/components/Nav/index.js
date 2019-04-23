import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserIcon from "../../assets/images/user.png";
import StopwatchIcon from "../../assets/images/stopwatch.png";
import RefreshIcon from "../../assets/images/refresh.png";

import { NavWrapper } from "./styles";

class Nav extends Component {
    render() {
        return (
            <NavWrapper>
                <Link to="/user">
                    <img src={UserIcon} alt="User" />
                </Link>

                <Link>
                    <img src={StopwatchIcon} alt="Stopwatch" />
                </Link>

                <Link>
                    <img src={RefreshIcon} alt="Refresh" />
                </Link>
            </NavWrapper>
        );
    }
}

export default Nav;
