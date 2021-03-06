import styled from "styled-components";

export const NavWrapper = styled.div`
    display: flex;

    position: absolute;
    bottom: 16px;
    left: calc(50% - 72px);

    a {
        margin-left: 24px;

        &:first-of-type {
            margin-left: 0;
        }
    }
`;
