import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import UserIcon from "../../assets/images/user.png";
import StopwatchIcon from "../../assets/images/stopwatch.png";

import { NavWrapper } from "./styles";

class Nav extends Component {
    render() {
        return (
            <NavWrapper
                openProfile={this.props.openProfile}
                closeProfile={this.props.closeProfile}
            >
                <div onClick={() => this.props.openProfile}>
                    <img src={UserIcon} alt="User" />
                </div>
                <div onClick={() => this.props.closeProfile}>
                    <img src={StopwatchIcon} alt="Stopwatch" />
                </div>
                <div onClick={() => this.props.openProfile}>
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
