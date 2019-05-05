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

        this.props.addTimer(this.state.timerInput);

        this.setState({ timerInput: "" });
    };

    render() {
        return (
            <Wrapper>
                {this.props.timerList.data.map(timer => (
                    <TimerBtn onClick={this.props.startTimer} value={timer}>
                        {timer}
                    </TimerBtn>
                ))}
                <form onSubmit={this.createTimer}>
                    <AddTimer
                        placeholder="+"
                        value={this.state.timerInput}
                        onChange={e =>
                            this.setState({ timerInput: e.target.value })
                        }
                    />
                </form>
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
