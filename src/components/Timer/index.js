import React, { Component } from "react";

import { Container } from "./styles";

class Timer extends Component {
    render() {
        return (
            <Container
                circleSection={this.props.circleSection}
                barProgress={this.props.barProgress}
                aboveHalfTime={this.props.aboveHalfTime}
                currentTime={this.props.currentTime}
                totalTime={this.props.totalTime}
                orientation={this.props.orientation}
            >
                <span>{this.props.currentTime}</span>
                <div class={this.props.orientation} />
            </Container>
        );
    }
}

export default Timer;
