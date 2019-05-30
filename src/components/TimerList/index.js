import React, { Component } from "react";
import PropTypes from "prop-types";
// import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerListActions } from "../../store/ducks/timerList";

import { Wrapper, TimerBtn, AddTimer, RemoveTimer } from "./styles";

class TimerList extends Component {
    static propTypes = {
        timer: PropTypes.shape({
            currentTime: PropTypes.string,
            isRunning: PropTypes.bool,
            totalTime: PropTypes.number,
            aboveHalfTime: PropTypes.bool,
            circleSection: PropTypes.number,
            barProgress: PropTypes.string
        }).isRequired,
        addTimer: PropTypes.func.isRequired,
        timerList: PropTypes.shape({
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.number
                })
            )
        }).isRequired
    };

    state = {
        timerInput: ""
    };

    createTimer = e => {
        e.preventDefault();

        this.props.addTimer(Number(this.state.timerInput));

        this.setState({ timerInput: "" });
    };

    removeTimer = e => {
        e.preventDefault();

        let value = e.target.value;

        let timers = document.getElementsByClassName("timer-btn");

        for (let i = 0; i < timers.length; i++) {
            if (value === timers[i].value) {
                timers[i].closest("div").classList.add("deleted");
            }
        }

        setTimeout(() => {
            this.props.removeTimer(Number(value));
        }, 600);
    };

    render() {
        return (
            <Wrapper
                primaryColor={this.props.timer.primaryColor}
                secondaryColor={this.props.timer.secondaryColor}
            >
                {this.props.timerList.data.map(timer => (
                    <div key={timer}>
                        <div key={timer} className="relative">
                            <TimerBtn
                                className="timer-btn"
                                primaryColor={this.props.timer.primaryColor}
                                onClick={this.props.startTimer}
                                value={timer}
                            >
                                {timer}
                            </TimerBtn>

                            <RemoveTimer
                                className="remove-btn"
                                primaryColor={this.props.timer.primaryColor}
                                onClick={this.removeTimer}
                                value={timer}
                            >
                                DELETE
                            </RemoveTimer>
                        </div>
                    </div>
                ))}
                <form onSubmit={this.createTimer}>
                    <AddTimer
                        placeholder="+"
                        value={this.state.timerInput}
                        onChange={e =>
                            this.setState({ timerInput: e.target.value })
                        }
                        primaryColor={this.props.timer.primaryColor}
                    />
                </form>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => ({
    timerList: state.timerList,
    timer: state.timer
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(TimerListActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerList);
