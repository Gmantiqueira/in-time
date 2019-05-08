import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow-y: visible;

    max-height: 240px;
    padding: 32px 0;

    position: relative;

    div {
        margin-bottom: 16px;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 2px;
    }
    ::-webkit-scrollbar-track {
        background: ${props => props.secondaryColor};
    }
    ::-webkit-scrollbar-thumb {
        background: ${props => props.primaryryColor};
        transition: 0.3s ease all;
        &:hover {
            opacity: 0.7;
            transition: 0.3s ease all;
        }
    }

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
            ${props => props.secondaryColor} 0%,
            rgba(47, 55, 69, 0) 100%
        );

        bottom: 0;

        display: none;
    }

    &:before {
        background: linear-gradient(
            180deg,
            ${props => props.secondaryColor} 0%,
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
    position: relative;

    font-weight: 500;
    font-size: 32px;
    line-height: 45px;
    text-align: center;
    letter-spacing: -0.02em;
    text-shadow: 0px 5px 24px rgba(84, 98, 124, 0.15);

    transition: 0.3s ease background-color;

    &:hover {
        background-color: ${props => props.primaryColor};
    }
`;

export const AddTimer = styled.input`
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    border: 0;

    height: 48px;
    width: 300px;

    font-weight: 500;
    font-size: 32px;
    line-height: 45px;
    text-align: center;
    letter-spacing: -0.02em;
    text-shadow: 0px 5px 24px rgba(84, 98, 124, 0.15);

    transition: 0.3s ease background-color;

    &:hover {
        background-color: ${props => props.primaryColor};
    }

    &::placeholder {
        font-weight: 500;
        font-size: 32px;
        line-height: 45px;
        text-align: center;
        letter-spacing: -0.02em;
        text-shadow: 0px 5px 24px rgba(84, 98, 124, 0.15);
    }
`;

export const RemoveTimer = styled.button`
    display: flex;
    position: absolute;

    height: 100%;
    align-items: center;

    background: none;
    border: none;
    outline: none;

    left: calc(100% + 48px);
    top: 0;

    font-size: 16px;
    line-height: 23px;
    text-align: center;
    letter-spacing: 0.3em;

    color: #ffffff;
    opacity: 0.4;
`;
