import styled from "styled-components";
import store from "../../store";

var palette = {
    primaryColor: store.getState().timer.primaryColor,
    secondaryColor: store.getState().timer.secondaryColor
};

export const Container = styled.div`
    background: ${palette.primaryColor};

    max-height: 100%;
    width: 100%;
    position: relative;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
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

            &:first-of-type{
                opacity: ${props =>
                    props.orientation === "vertical" ? 1 : 0.5};
            }
            &:last-of-type{
                opacity: ${props =>
                    props.orientation === "circular" ? 1 : 0.5};
            }
        }
    }

    input[type=color] {
        background: ${palette.primaryColor};
        border: 0;
        border-radius: 3px;
        outline: 0;
        padding: 4px 16px;

        &:after{
            content: '${palette.primaryColor}';
            display: block;
            height: 100%;
            width: 100%;
            font-family: Circular Std;
            font-weight: 450;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            color: #ffffff;
        }
    }
`;
