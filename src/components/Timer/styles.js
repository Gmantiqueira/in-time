import styled from "styled-components";
import * as palette from "../../styles/colors";

export const Container = styled.div`
    background: ${palette.secondaryColor};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;

    div {
        &.circular {
            background-color: ${palette.primaryColor};
            background-image: ${props =>
                props.aboveHalfTime
                    ? `
                linear-gradient(${props.circleSection}deg, transparent 50%, ${
                          palette.secondaryColor
                      } 50%),
                linear-gradient(90deg, ${
                    palette.secondaryColor
                }50%, transparent 50%);
            `
                    : `
                linear-gradient(${props.circleSection}deg, transparent 50%, ${
                          palette.primaryColor
                      } 50%),
                linear-gradient(90deg, ${
                    palette.secondaryColor
                }50%, transparent 50%);
            `};
            height: 200%;
            width: 200%;
            position: absolute;
            left: -50%;
            top: -50%;
        }

        &.vertical {
            background-color: ${palette.primaryColor};
            bottom: 0;
            height: ${props => props.barProgress};
            width: 100%;
            position: absolute;
        }
    }

    span {
        font-family: Circular Std;
        font-weight: 500;
        font-size: 384px;
        line-height: 340px;
        text-align: center;
        letter-spacing: -0.02em;

        color: #ffffff;

        z-index: 2;
    }
`;
