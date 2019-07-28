import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container, Profile, FormList, FormRow } from "./styles";

import Nav from "../Nav";

import Photo from "../../assets/images/photo.jpg";

class User extends Component {

    toSecondaryColor = hex => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);

        var max = Math.max(r, g, b),
            min = Math.min(r, g, b);

        var h = (max + min) / 2;

        if (max === min) {
            h = 0; // achromatic
        } else {
            var d = max - min;
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
                default:
                    return false;
            }
            h /= 6;
        }

        h = Math.round(360 * h);

        var colorInHSL = "hsl(" + h + ", 20%, 20%)";

        return colorInHSL;
    };

    handleColorConfig = e => {
        e.preventDefault();

        this.props.changePrimary(e.target.value);
        this.props.changeSecondary(this.toSecondaryColor(e.target.value));

        let primary = e.target.value;

        document.getElementById("colorWrapper").style.backgroundColor = primary;
    };

    handleSessionConfig = e => {
        e.preventDefault();

        this.props.changeSession(e.target.value);
    };

    handleOrientationConfig = e => {
        e.preventDefault();

        this.props.changeOrientation(e.target.value);
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
                    <h4>Gmantiqueira</h4>
                    <p>gmantiqueira@gmail.com</p>
                </Profile>

                <FormList>
                    <FormRow primaryColor={this.props.timer.primaryColor}>
                        <label>Team highlight color</label>
                        <div className="wrapper" id="colorWrapper">
                            <input
                                id="color"
                                type="color"
                                value={this.props.timer.primaryColor}
                                onChange={this.handleColorConfig}
                            />
                        </div>
                    </FormRow>

                    <FormRow>
                        <label>in.time/</label>

                        <input
                            type="text"
                            value={this.props.timer.sessionName}
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
