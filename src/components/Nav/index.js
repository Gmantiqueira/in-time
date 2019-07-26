import React, { Component } from "react";

import { connect } from "react-redux";

import UserIcon from "../../assets/images/user.png";
import StopwatchIcon from "../../assets/images/stopwatch.png";

import { NavWrapper } from "./styles";

class Nav extends Component {
    openProfile = this.props.openProfile;
    closeProfile = this.props.closeProfile;

    render() {
        return (
            <NavWrapper>
                <div onClick={this.openProfile}>
                    <img src={UserIcon} alt="User" />
                </div>
                <div onClick={this.closeProfile}>
                    <img src={StopwatchIcon} alt="Stopwatch" />
                </div>
                <div onClick={this.openProfile}>
                    <img src={UserIcon} alt="User" />
                </div>
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
