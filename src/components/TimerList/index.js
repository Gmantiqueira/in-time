import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerListActions } from "../../store/ducks/timerList";

import { Wrapper, TimerBtn, AddTimer } from "./styles";

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
        addTimerRequest: PropTypes.func.isRequired,
        timerList: PropTypes.shape({
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.number
                })
            )
        }).isRequired
    };

    state = {
        timers: ""
    };

    render() {
        return (
            <Wrapper>
                {this.props.timerList.data.map(timer => (
                    <TimerBtn
                        onClick={this.props.startTimer}
                        value={timer.value}
                    >
                        {timer.value}
                    </TimerBtn>
                ))}
                <AddTimer placeholder="+" />
            </Wrapper>
        );
    }
}

const mapStateToProps = state => ({
    timerList: state.timerList
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(TimerListActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerList);
