import styled from "styled-components";
import { lighten } from "polished";

export const Container = styled.div`
    background: ${props => props.secondaryColor};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    z-index: 0;

    div {
        overflow: hidden;
        &.circular {
            background-color: ${props => props.secondaryColor};
            background-image: ${props =>
                props.aboveHalfTime
                    ? `
                linear-gradient(${props.circleSection}deg, transparent 50%, ${
                          props.primaryColor
                      } 50%),
                linear-gradient(90deg, ${
                    props.primaryColor
                } 50%, transparent 50%);
            `
                    : `
                linear-gradient(${props.circleSection}deg, transparent 50%, ${
                          props.secondaryColor
                      } 50%),
                linear-gradient(90deg, ${
                    props.primaryColor
                } 50%, transparent 50%);
            `};
            height: 200%;
            width: 200%;
            position: absolute;
            left: -50%;
            top: -50%;
            z-index: -1;
        }

        &.vertical {
            background-color: ${props => props.primaryColor};
            bottom: 0;
            height: ${props => props.barProgress};
            width: 100%;
            position: absolute;
            z-index: -1;
        }
    }

    &.paused {
        .vertical {
            background-color: rgba(255, 255, 255, 0.1);
        }
        .circular {
            background-color: rgba(255, 255, 255, 0.1);
            background-image: ${props =>
                props.aboveHalfTime
                    ? `
                linear-gradient(${
                    props.circleSection
                }deg, transparent 50%, ${lighten(
                          0.5,
                          props.secondaryColor
                      )} 50%),
                linear-gradient(90deg, ${lighten(
                    0.5,
                    props.secondaryColor
                )} 50%, transparent 50%);
            `
                    : `
                linear-gradient(${props.circleSection}deg, transparent 50%, ${
                          props.secondaryColor
                      } 50%),
                linear-gradient(90deg, ${lighten(
                    0.5,
                    props.secondaryColor
                )} 50%, transparent 50%);
            `};
        }
        > div {
            span {
                font-size: 288px;
                opacity: 0.2;
                transition: 0.2s ease all;
                @media screen and (max-width: 992px){
                    font-size: 96px;
                }
            }
            div {
                button {
                    opacity: 0.4;
                    pointer-events: auto;
                    &:hover {
                        opacity: 1;
                        transition: 0.2s ease all;
                    }
                }
            }
        }
    }

    > div {
        display: flex;
        flex-direction: column;
        position: relative;
        span {
            font-weight: 500;
            font-size: 384px;
            line-height: 340px;
            text-align: center;
            letter-spacing: -0.02em;

            color: #ffffff;
            transition: 0.2s ease all;
            @media screen and (max-width: 992px) {
                font-size: 128px;
            }
        }
        div {
            display: flex;
            justify-content: center;
            width: 100%;
            z-index: 2;
            button {
                background-color: transparent;
                border: none;
                color: #ffffff;
                display: block;
                font-size: 20px;
                line-height: 29px;
                letter-spacing: 0.3em;
                margin: 0 48px;
                opacity: 0;
                pointer-events: none;
                text-align: center;
                transition: 0.2s ease all;
            }
        }
    }
`;
