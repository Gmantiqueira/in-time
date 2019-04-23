import React, { Component } from "react";

import { Wrapper, TimerBtn } from "./styles";

class TimerList extends Component {
    render() {
        return (
            <Wrapper>
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

export default TimerList;
