import styled from "styled-components";

export const Container = styled.div`
    max-height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    background: ${props => props.secondaryColor};
`;

export const Title = styled.div`
    display: flex;
    flex-direction: column;

    border-radius: 8px;
    padding: 16px 8px;
    margin-bottom: 32px;

    h3 {
        font-weight: 500;
        font-size: 64px;
        line-height: 356px;
        text-align: center;
        letter-spacing: -0.02em;
        text-shadow: 0px 5px 24px rgba(84, 98, 124, 0.15);
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    background: ${props => props.primaryColor};
    border-radius: 8px;
    padding: 16px 8px;

    label {
        margin-bottom: 16px;
    }

    input {
        color: ${props => props.primaryColor};
    }
`;
