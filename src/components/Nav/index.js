import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserIcon from "../../assets/images/user.png";
import StopwatchIcon from "../../assets/images/stopwatch.png";

import { NavWrapper } from "./styles";

class Nav extends Component {
    state = {
        baseURL: ""
    };
    componentDidMount() {
        console.log(this.props.location.pathname.split("/")[1]);
        this.setState({ baseURL: this.props.location.pathname.split("/")[1] });
    }
    render() {
        return (
            <NavWrapper>
                <Link to={"/" + this.state.baseURL + "/user"}>
                    <img src={UserIcon} alt="User" />
                </Link>

                <Link to={"/" + this.state.baseURL}>
                    <img src={StopwatchIcon} alt="Stopwatch" />
                </Link>

                <Link to={"/" + this.state.baseURL + "/user"}>
                    <img src={UserIcon} alt="User" />
                </Link>
            </NavWrapper>
        );
    }
}

export default Nav;
