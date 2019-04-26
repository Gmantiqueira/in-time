import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container } from "./styles";
import Timer from "../../components/Timer";
import TimerList from "../../components/TimerList";
import Nav from "../../components/Nav";

class Session extends Component {
    state = {
        currentTime: "",
        totalTime: "",
        aboveHalfTime: true,
        isRunning: false,
        circleSection: null,
        barProgress: 100,
        orientation: "vertical"
    };

    handleStartTimer = e => {
        let time = e.target.value * 60;
        let totalTime = e.target.value * 60;
        this.setState({ totalTime: totalTime });

        if (this.state.isRunning === false) {
            var interval = setInterval(() => {
                time--;
                var aboveHalfTime;

                if (this.state.orientation === "circular") {
                    var circleSection;
                    if (time >= totalTime / 2) {
                        aboveHalfTime = true;
                        circleSection = 90 - (180 / (totalTime / 2)) * time;
                    } else {
                        aboveHalfTime = false;
                        circleSection =
                            90 - (180 / (totalTime / 2)) * time - 180;
                    }
                    this.setState({
                        circleSection: circleSection,
                        aboveHalfTime: aboveHalfTime
                    });
                }

                if (this.state.orientation === "vertical") {
                    var barProgress;
                    barProgress = (100 * time) / totalTime + "%";
                    this.setState({
                        barProgress: barProgress
                    });
                }

                var minutes = Math.floor((time % (60 * 60)) / 60);
                var seconds = Math.floor(time % 60);

                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                var format = minutes + ":" + seconds;

                this.setState({
                    isRunning: true,
                    currentTime: format
                });

                if (time === 0) {
                    format = "0:00";
                    clearInterval(interval);
                    this.setState({ isRunning: false });
                }
            }, 1000);
        }

        if (this.state.isRunning === true) {
            clearInterval(interval);
        }
    };

    render() {
        return this.state.isRunning === false ? (
            <Container>
                <TimerList startTimer={this.handleStartTimer} />
                <Nav />
            </Container>
        ) : (
            <Container>
                <Timer
                    orientation={this.state.orientation}
                    circleSection={this.state.circleSection}
                    barProgress={this.state.barProgress}
                    aboveHalfTime={this.state.aboveHalfTime}
                    currentTime={this.state.currentTime}
                    totalTime={this.state.totalTime}
                />
                <Nav />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    currentTime: state.currentTime,
    isRunning: state.isRunning,
    totalTime: state.totalTime,
    aboveHalfTime: state.aboveHalfTime,
    circleSection: state.circleSection,
    barProgress: state.barProgress,
    orientation: state.orientation
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(TimerActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Session);
