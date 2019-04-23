import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'CircularStd';
        src: url('../assets/fonts/CircularStd-Book.eot');
        src: url('../assets/fonts/CircularStd-Book.eot?#iefix') format('embedded-opentype'), url('../assets/fonts/CircularStd-Book.woff') format('woff'), url('../assets/fonts/CircularStd-Book.ttf') format('truetype'), url('../assets/fonts/CircularStd-Book.svg#bcc26993292869431e54c666aafa8fcd') format('svg');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'CircularStd';
        src: url('../assets/fonts/CircularStd-Bold.eot');
        src: url('../assets/fonts/CircularStd-Bold.eot?#iefix') format('embedded-opentype'), url('../assets/fonts/CircularStd-Bold.woff') format('woff'), url('../assets/fonts/CircularStd-Bold.ttf') format('truetype'), url('../assets/fonts/CircularStd-Bold.svg#bcc26993292869431e54c666aafa8fcd') format('svg');
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: 'CircularStd';
        src: url('../assets/fonts/CircularStd-Black.eot');
        src: url('../assets/fonts/CircularStd-Black.eot?#iefix') format('embedded-opentype'), url('../assets/fonts/CircularStd-Black.woff') format('woff'), url('../assets/fonts/CircularStd-Black.ttf') format('truetype'), url('../assets/fonts/CircularStd-Black.svg#bcc26993292869431e54c666aafa8fcd') format('svg');
        font-weight: 800;
        font-style: normal;
    }

    * {
        font-family: 'CircularStd', sans-serif;
        color: #ffffff;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        text-rendering: optimizeLegibility !important;
        -webkit-font-smoothing: antialiased !important;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyle;
