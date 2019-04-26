import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerConfigActions } from "../../store/ducks/timerConfig";

import { Container, Profile, FormList, FormRow } from "./styles";

import Nav from "../../components/Nav";

import Photo from "../../assets/images/photo.jpg";

class User extends Component {
    static propTypes = {
        config: PropTypes.func.isRequired,
        timerConfig: PropTypes.shape({
            color: PropTypes.string,
            sessionName: PropTypes.string,
            orientation: PropTypes.string
        }).isRequired
    };

    state = {
        color: "",
        orientation: "",
        sessionName: ""
    };

    handleColorConfig = e => {
        this.setState({
            color: e.target.value
        });

        this.props.config(this.state.color);
    };

    handleSessionConfig = e => {
        this.setState({
            sessionName: e.target.value
        });

        this.props.config(this.state.sessionName);
    };

    handleOrientationConfig = e => {
        this.setState({
            orientation: e.target.value
        });

        this.props.config(this.state.orientation);
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
                    <span id="time" style={{ color: "#fff" }} />
                    <FormRow>
                        <label>Team highlight color</label>

                        <input
                            type="color"
                            value={this.state.color}
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
                            <p>vertical</p>
                            <p>circular</p>
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
    currentTime: state.currentTime,
    color: state.color,
    orientation: state.orientation
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(TimerConfigActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);
