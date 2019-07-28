import styled from "styled-components";

export const Container = styled.div`
    background: ${props => props.secondaryColor};

    max-height: 100%;
    width: 100%;
    position: relative;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

    opacity: ${props => props.isOpen ? "1" : "0"};
    pointer-events: ${props => props.isOpen ? "auto" : "none"};
    z-index: 5;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    transition: .2s ease opacity;
`;

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
        overflow: hidden;

        border: 5px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;

        height: 80px;
        width: 80px;
        margin-bottom: 32px;
    }

    img {
        height: auto;
        width: 100%;
    }

    h4,
    p {
        font-weight: 450;
        font-size: 20px;
        line-height: 29px;
        text-align: center;
        text-shadow: 0px 5px 24px rgba(84, 98, 124, 0.15);
    }

    p {
        font-size: 14px;

        margin-top: 8px;
    }
`;

export const FormList = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    margin-top: 64px;
`;

export const FormRow = styled.form`
    display: flex;
    flex-wrap: wrap;

    align-items: center;
    justify-content: space-between;

    height: 56px;
    min-width: 320px;

    label {
        font-weight: 450;
        font-size: 14px;
        line-height: 20px;
        text-shadow: 0px 5px 24px rgba(84, 98, 124, 0.15);
    }

    input {
        max-width: 92px;

        background: transparent;
        border: 0;
        text-align: right;
    }

    div {
        display: flex;
        justify-content: space-between;
        button {
            background: none;
            outline: none;
            border: none;

            margin-left: 24px;
            font-weight: 450;
            font-size: 14px;
            line-height: 20px;
            text-align: right;
            opacity: .5;
            text-shadow: 0px 5px 24px rgba(84, 98, 124, 0.15);

            &.active{
                opacity: 1;
            }
        }
    }

    input[type=color] {
        cursor: pointer;
        opacity: 0;
        height: 100%;
        max-width: 100%;
        width: 100%;
    }

    .wrapper{
        background-color: ${props => props.primaryColor};
        height: 24px;
        width: 96px;
        border-radius: 4px;
    }
`;
