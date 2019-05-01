import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Wrapper, TimerBtn } from "./styles";

class TimerList extends Component {
    static propTypes = {
        timer: PropTypes.shape({
            currentTime: PropTypes.string,
            isRunning: PropTypes.bool,
            totalTime: PropTypes.number,
            aboveHalfTime: PropTypes.bool,
            circleSection: PropTypes.number,
            barProgress: PropTypes.string
        }).isRequired
    };

    render() {
        return (
            <Wrapper
                isRunning={this.props.timer.isRunning}
                currentTime={this.props.timer.currentTime}
            >
                <TimerBtn onClick={this.props.startTimer} value=".3">
                    1
                </TimerBtn>
                <TimerBtn onClick={this.props.startTimer} value="3">
                    3
                </TimerBtn>
                <TimerBtn onClick={this.props.startTimer} value="5">
                    5
                </TimerBtn>
                <TimerBtn onClick={this.props.startTimer} value="10">
                    10
                </TimerBtn>
                <TimerBtn onClick={this.props.startTimer} value="20">
                    20
                </TimerBtn>
            </Wrapper>
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
)(TimerList);
