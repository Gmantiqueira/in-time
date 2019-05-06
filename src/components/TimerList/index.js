import React, { Component } from "react";
import PropTypes from "prop-types";

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

        this.props.removeTimer(Number(e.target.value));
    };

    render() {
        return (
            <Wrapper>
                {this.props.timerList.data.map(timer => (
                    <div className="relative">
                        <TimerBtn onClick={this.props.startTimer} value={timer}>
                            {timer}
                        </TimerBtn>

                        <RemoveTimer onClick={this.removeTimer} value={timer}>
                            DELETE
                        </RemoveTimer>
                    </div>
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
