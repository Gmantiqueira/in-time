import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserIcon from "../../assets/images/user.png";
import StopwatchIcon from "../../assets/images/stopwatch.png";

import { NavWrapper } from "./styles";

class Nav extends Component {
    render() {
        return (
            <NavWrapper>
                <Link to={"/" + this.props.sessionName + "/user"}>
                    <img src={UserIcon} alt="User" />
                </Link>

                <Link to={"/" + this.props.sessionName}>
                    <img src={StopwatchIcon} alt="Stopwatch" />
                </Link>

                <Link to={"/" + this.props.sessionName + "/user"}>
                    <img src={UserIcon} alt="User" />
                </Link>
            </NavWrapper>
        );
    }
}

export default Nav;
