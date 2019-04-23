import styled from "styled-components";
import * as palette from "../../styles/colors";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow-y: scroll;

    max-height: 240px;
    padding: 32px 0;

    position: relative;

    &:after,
    &:before {
        content: "";
        width: 100%;
        height: 32px;
        position: absolute;
        left: 0;
    }

    &:after {
        background: linear-gradient(
            0deg,
            ${palette.secondaryColor} 0%,
            rgba(47, 55, 69, 0) 100%
        );

        bottom: 0;
    }

    &:before {
        background: linear-gradient(
            180deg,
            ${palette.secondaryColor} 0%,
            rgba(47, 55, 69, 0) 100%
        );

        top: 0;
    }
`;

export const TimerBtn = styled.button`
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    border: 0;

    height: 48px;
    width: 300px;

    margin-bottom: 16px;

    &:last-of-type {
        margin-bottom: 0;
    }

    font-weight: 500;
    font-size: 32px;
    line-height: 45px;
    text-align: center;
    letter-spacing: -0.02em;
    text-shadow: 0px 5px 24px rgba(84, 98, 124, 0.15);
`;
