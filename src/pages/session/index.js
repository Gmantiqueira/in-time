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
    static propTypes = {
        timer: PropTypes.shape({
            currentTime: PropTypes.number,
            currentTimeFormated: PropTypes.string,
            isRunning: PropTypes.bool,
            totalTime: PropTypes.number,
            aboveHalfTime: PropTypes.bool,
            circleSection: PropTypes.number,
            barProgress: PropTypes.string
        }).isRequired
    };

    handleStartTimer = e => {
        let now = new Date();
        let end = new Date();
        end = end.setMinutes(end.getMinutes() + Number(e.target.value))

        let distance = (end - now) / 1000;

        this.props.is_Running(true);
        this.props.setTotalTime(distance);
        this.props.setCurrentTime(distance);

        let timer = setInterval(() => {
            let time = this.props.timer.currentTime;
            let totalTime = this.props.timer.totalTime;

            let aboveHalfTime;

            if (this.props.timer.orientation === "circular") {
                let circleSection;
                if (time >= totalTime / 2) {
                    aboveHalfTime = true;
                    circleSection = 90 - (180 / (totalTime / 2)) * time;
                } else {
                    aboveHalfTime = false;
                    circleSection =
                        90 - (180 / (totalTime / 2)) * time - 180;
                }

                this.props.isAboveHalf(aboveHalfTime);
                this.props.setCircleStyle(circleSection);
            }

            if (this.props.timer.orientation === "vertical") {
                let barProgress = (100 * time) / totalTime + "%";
                this.props.setBarStyle(barProgress);
            }

            let minutes = Math.floor((time % (60 * 60)) / 60);
            let seconds = Math.floor(time % 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            let format = minutes + ":" + seconds;

            this.props.setCurrentTimeFormated(format);

            if (time === 0) {
                clearInterval(this.props.timer.timer);
                this.props.is_Running(false);
            }

            this.props.decreaseTimer();
            console.log(this.props)
        }, 1000);

        this.props.setTimer(timer);
    };

    render() {
        return this.props.timer.isRunning === false ? (
            <Container secondaryColor={this.props.timer.secondaryColor}>
                <TimerList startTimer={this.handleStartTimer} />
                <Nav />
            </Container>
        ) : (
            <Container>
                <Timer />
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
)(Session);
