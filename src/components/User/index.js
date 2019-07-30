import React, { Component } from "react";
import api from "../../services/api";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container, Profile, FormList, FormRow } from "./styles";

import Photo from "../../assets/images/photo.jpg";

class User extends Component {

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

        this.props.changeSession(e.target.value);
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
                        <img src={Photo} alt="Profile" />
                    </div>
                    <input id="username" value={"Gmantiqueira"/* this.props.user.email */} type="text"/>
                    <input id="usermail" value={"gmantiqueira@gmail.com"/* this.props.user.email */} type="text"/>
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
    timer: state.timer
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(TimerActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);
