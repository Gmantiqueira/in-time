import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container, Profile, FormList, FormRow } from "./styles";

import Nav from "../../components/Nav";

import Photo from "../../assets/images/photo.jpg";

class User extends Component {
    static propTypes = {
        timer: PropTypes.shape({
            primaryColor: PropTypes.string,
            secondaryColor: PropTypes.string
        }).isRequired,
        changePrimary: PropTypes.func.isRequired,
        changeSecondary: PropTypes.func.isRequired,
        changeSession: PropTypes.func.isRequired,
        changeOrientation: PropTypes.func.isRequired
    };

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

    state = {
        primaryColor: "#f71963",
        secondaryColor: "hsl(340, 20%, 20%)",
        orientation: "vertical",
        sessionName: ""
    };

    handleColorConfig = e => {
        e.preventDefault();

        console.log(this);

        this.setState({
            primaryColor: e.target.value
        });
        this.setState({
            secondaryColor: this.toSecondaryColor(this.state.primaryColor)
        });

        this.props.changePrimary(this.state.primaryColor);
        this.props.changeSecondary(this.state.secondaryColor);
    };

    handleSessionConfig = e => {
        e.preventDefault();

        this.props.changeSession(this.state.sessionName);

        this.setState({
            sessionName: e.target.value
        });
    };

    handleOrientationConfig = e => {
        e.preventDefault();

        this.setState({
            orientation: e.target.value
        });

        this.props.changeOrientation(this.state.orientation);
    };

    render() {
        return (
            <Container>
                <Profile>
                    <div>
                        <img src={Photo} alt="Profile" />
                    </div>
                    <h4>Gmantiqueira</h4>
                    <p>gmantiqueira@gmail.com</p>
                </Profile>

                <FormList>
                    <FormRow>
                        <label>Team highlight color</label>
                        <input
                            id="color"
                            type="color"
                            value="#fdffff"
                            onChange={this.handleColorConfig}
                        />
                    </FormRow>

                    <FormRow>
                        <label>in.time/</label>

                        <input
                            type="text"
                            value={this.state.sessionName}
                            onChange={this.handleSessionConfig}
                        />
                    </FormRow>

                    <FormRow>
                        <label>Visual timer</label>

                        <div>
                            <button
                                value="vertical"
                                onClick={this.handleOrientationConfig}
                            >
                                vertical
                            </button>

                            <button
                                value="horizontal"
                                onClick={this.handleOrientationConfig}
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

                <Nav />
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
