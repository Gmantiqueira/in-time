import styled from "styled-components";
import * as palette from "../../styles/colors";

export const Container = styled.div`
    background: ${palette.secondaryColor};

    max-height: 100%;
    width: 100%;
    position: relative;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
`;
