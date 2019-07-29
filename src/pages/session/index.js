import React, { Component } from "react";
import api from "../../services/api";
import io from "socket.io-client";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container } from "./styles";
import Timer from "../../components/Timer";
import User from "../../components/User";
import TimerList from "../../components/TimerList";
import Nav from "../../components/Nav";

class Session extends Component {
    state = {
        timerList: [],
        timer: [],
        paused: '',
        profileOpen: false,
        canExec: false
    };

    intervalID = 0

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

    infoGet = async e => {
        await api.get(
            "/session/" + this.props.location.pathname.split("/")[1]
        ).then(response => {
            this.props.setSession(response.data);

            this.props.changePrimary(response.data.baseColor);
            this.props.changeSecondary(this.toSecondaryColor(response.data.baseColor));
            this.props.changeOrientation(response.data.orientation);

            this.setState({canExec: true})
            if(response.data.isPaused){
                this.setState({paused: 'paused'});
            } else {
                this.setState({paused: ''});
            }
        });

    };

    openProfile = () => {
        this.setState({profileOpen: true})
    }

    closeProfile = () => {
        this.setState({profileOpen: false})
    }

    registerToSocket = () => {
        var apiUrl;

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // apiUrl = 'http://localhost:3000'
            apiUrl = 'https://in-time-api.herokuapp.com'
        } else {
            apiUrl = 'https://in-time-api.herokuapp.com'
        }

        const socket = io(apiUrl);

        socket.on("setTimer" , async (timer) => {
            this.setState({ timer: timer });
            this.infoGet();
        });

        socket.on("pauseTimer" , async (timer) => {
            var elem = document.getElementsByClassName('timer')

            this.setState({paused: 'paused'});

            if(elem[0]){
                elem[0].classList.add("paused");
            }

            await this.props.setSession(timer);
        });

        socket.on("resumeTimer" , async (timer) => {
            var elem = document.getElementsByClassName('timer')

            this.setState({paused: ''});

            if(elem[0]){
                elem[0].classList.remove("paused");
            }

            await this.props.setSession(timer);
        });

        socket.on("updateTimer" , async (timer) => {
            await this.props.setSession(timer);
        });

        socket.on("stopTimer" , async (timer) => {
            await this.props.setSession(timer);
        });

        socket.on("updateColor" , async (timer) => {
            await this.props.setSession(timer);

            this.props.changePrimary(timer.baseColor);
            this.props.changeSecondary(this.toSecondaryColor(timer.baseColor));
        });

        socket.on('updateOrientation', async (timer) => {
            await this.props.setSession(timer);

            this.props.changeOrientation(timer.orientation);
        })
    };

    componentWillMount() {
        this.infoGet();
        this.registerToSocket()
    }

    handleStartTimer = async e => {
        e.persist()

        api.put(
            "/session/" + this.props.timer.session._id + "/set", {
                "totalTime": e.target.value
            }
        )

        this.infoGet()
    };

    render() {
        return this.props.timer.session.isRunning === false ? (
            <Container secondaryColor={this.props.timer.secondaryColor}>
                <TimerList
                    location={this.props.location}
                    startTimer={this.handleStartTimer}
                    timerList={this.props.timer.session}
                />
                <Nav openProfile={this.openProfile} closeProfile={this.closeProfile} location={this.props.location} />
                <User open={this.state.profileOpen}/>
            </Container>
        ) : (
            <Container>
                <Timer canExec={this.state.canExec} paused={this.state.paused} location={this.props.location} />
                <Nav openProfile={this.openProfile} closeProfile={this.closeProfile} location={this.props.location} />
                <User open={this.state.profileOpen}/>
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
)(Session);
