import React, { Component } from "react";
import api from "../../services/api";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";
import { Creators as UserActions } from "../../store/ducks/user";

import { Container, Profile, FormList, FormRow } from "./styles";

import Photo from "../../assets/images/photo.jpg";

class User extends Component {

    state = {
        name: 'Guest',
        email: 'Insira seu e-mail aqui!',
        gravatar: 'https://www.pinclipart.com/picdir/middle/181-1814767_person-svg-png-icon-free-download-profile-icon.png'
    }

    handleEmailInput = e => {
        this.setState({email: e.target.value})
    }

    handleNameInput = e => {
        this.setState({name: e.target.value})
    }

    handleColorConfig = e => {
        e.preventDefault();

        api.put(
            "/session/" + this.props.timer.session._id + "/color", {
                "baseColor": e.target.value
            }
        )

        document.getElementById("colorWrapper").style.backgroundColor = e.target.value;
    };

    handleSessionConfig = e => {
        e.preventDefault();
    };

    handleOrientationConfig = e => {
        e.preventDefault();

        api.put(
            "/session/" + this.props.timer.session._id + "/orientation", {
                "orientation": e.target.value
            }
        )
    };

    componentWillUnmount() {
        this.props.updateStyle();
    }

    render() {
        return (
            <Container
                isOpen={this.props.open}
                primaryColor={this.props.timer.primaryColor}
                secondaryColor={this.props.timer.secondaryColor}
            >
                <Profile>
                    <div>
                        <img src={this.state.gravatar} alt="Profile" />
                    </div>
                    <form onSubmit={() => this.saveUsername}>
                        <input placeholder="Nome" onClick={() => {this.setState({name: ''})}} onChange={this.handleNameInput} id="username" value={this.state.name/* this.props.user.name */} type="text"/>
                    </form>

                    <form onSubmit={() => this.saveEmail}>
                        <input placeholder="Email" onClick={() => {this.setState({email: ''})}} onChange={this.handleEmailInput} id="usermail" value={this.state.email/* this.props.user.email */} type="text"/>
                    </form>
                </Profile>

                <FormList>
                    <FormRow primaryColor={this.props.timer.primaryColor}>
                        <label>Team highlight color</label>
                        <div className="wrapper" id="colorWrapper">
                            <input
                                id="color"
                                type="color"
                                value=''
                                onChange={this.handleColorConfig}
                            />
                        </div>
                    </FormRow>

                    <FormRow>
                        <label>{window.location.host}/</label>

                        <input
                            type="text"
                            value={this.props.timer.session.sessionName}
                            onChange={this.handleSessionConfig}
                        />
                    </FormRow>

                    <FormRow>
                        <label>Visual timer</label>

                        <div>
                            <button
                                value="vertical"
                                onClick={this.handleOrientationConfig}
                                className={
                                    this.props.timer.orientation === "vertical"
                                        ? "active"
                                        : ""
                                }
                            >
                                vertical
                            </button>

                            <button
                                value="circular"
                                onClick={this.handleOrientationConfig}
                                className={
                                    this.props.timer.orientation === "circular"
                                        ? "active"
                                        : ""
                                }
                            >
                                circular
                            </button>
                        </div>
                    </FormRow>

                    <FormRow>
                        <label>Password required</label>

                        <input type="checkbox" />
                    </FormRow>
                </FormList>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    timer: state.timer,
    user: state.user
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(UserActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);
