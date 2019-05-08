import styled from "styled-components";

export const Container = styled.div`
    background: ${props => props.secondaryColor};

    max-height: 100%;
    width: 100%;
    position: relative;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`;
