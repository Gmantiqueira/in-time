import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import UserIcon from "../../assets/images/user.png";
import StopwatchIcon from "../../assets/images/stopwatch.png";

import { NavWrapper } from "./styles";

class Nav extends Component {
    render() {
        return (
            <NavWrapper>
                <Link to={"/" + this.props.timer.sessionName + "/user"}>
                    <img src={UserIcon} alt="User" />
                </Link>

                <Link to={"/" + this.props.timer.sessionName}>
                    <img src={StopwatchIcon} alt="Stopwatch" />
                </Link>

                <Link to={"/" + this.props.timer.sessionName + "/user"}>
                    <img src={UserIcon} alt="User" />
                </Link>
            </NavWrapper>
        );
    }
}

const mapStateToProps = state => ({
    timer: state.timer
});

export default connect(
    mapStateToProps
)(Nav);
