import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container } from "./styles";

class Timer extends Component {
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

    state = {
        delay: 0
    };

    componentDidMount() {
        this.props.resumeTimer();
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.props.timer.timer);
    }

    startTimer = () => {
        let timer = setInterval(() => {
            if (this.props.timer.isPaused === true) {
                clearInterval(timer);
            } else {
                this.props.checkNow();
                this.props.update();
                this.props.updateStyle();
                this.props.is_Running();
                this.props.format();
            }
        }, 1000);
    };

    pauseResumeTimer = e => {
        e.preventDefault();

        if (this.props.timer.isPaused === false) {
            this.props.pauseTimer();

            timer[0].classList.add("paused");
            var pausedNow = new Date();

            let pauseDelay = setInterval(() => {
                if (this.props.timer.isPaused === false) {
                    clearInterval(pauseDelay);
                } else {
                    var delay = Date.now();
                    delay = delay - pausedNow;

                    this.setState({ delay: delay });
                }
            }, 1);
        } else if (this.props.timer.isPaused === true) {
            let endline = this.props.timer.endline;
            timer[0].classList.remove("paused");

            endline.setMilliseconds(
                endline.getMilliseconds() + this.state.delay
            );
            this.props.setEndline(endline);

            this.props.resumeTimer();
            this.startTimer();
            this.setState({ delay: 0 });
        }

    };

    stopTimer = e => {
        e.preventDefault();

        this.props.setTotalTime(0);
        this.props.setEndline(Date.now);

        this.props.is_Running();
        this.props.checkNow();
        this.props.update();
        this.props.updateStyle();
        this.props.is_Running();
        clearInterval(this.props.timer.timer);
    };

    render() {
        return (
            <Container className = "timer"
            onClick = { this.pauseResumeTimer }
            circleSection = { this.props.timer.circleSection }
            barProgress = { this.props.timer.barProgress }
            aboveHalfTime = { this.props.timer.aboveHalfTime }
            orientation = { this.props.timer.orientation }
            primaryColor = { this.props.timer.primaryColor }
            secondaryColor = { this.props.timer.secondaryColor } >
                <div>
                    <span> { this.props.timer.timeFormated } </span>
                    <div>
                        <button onClick = { this.pauseResumeTimer } > RESUME </button>
                        <button onClick = { this.stopTimer } > STOP </button>
                    </div>
                </div>
            <div className = { this.props.timer.orientation }/>
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
)(Timer);
