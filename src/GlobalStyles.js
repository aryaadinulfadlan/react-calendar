import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body, #root {
        height: 100%;
    }
    html {
        scroll-behavior: smooth;
    }
    body {
        font-family: 'Poppins', sans-serif;
        line-height: 1.5;
        letter-spacing: 2px;
        color: white;
    }
    img, svg {
        display: block;
        max-width: 100%;
        height: auto;
    }
    input, textarea, button, select {
        font: inherit;
    }
    p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    ul {
        list-style: none;
    }
`
// 360px sd 1400px
export const SmallFontSize = 'clamp(0.8rem, 0.7308rem + 0.3077vw, 1rem)'
export const TextFontSize = 'clamp(0.8rem, 0.6615rem + 0.6154vw, 1.2rem)'
export const NormalFontSize = 'clamp(0.8rem, 0.5923rem + 0.9231vw, 1.4rem)'
export const LogoFontSize = 'clamp(1rem, 0.8615rem + 0.6154vw, 1.4rem)'
export const MediumFontSize = 'clamp(1rem, 0.7231rem + 1.2308vw, 1.8rem)'
export const BigFontSize = 'clamp(1.1rem, 0.7885rem + 1.3846vw, 2rem)'
// export const IconFontSize = 'clamp(1.2rem, 1.0269rem + 0.7692vw, 1.7rem)'
export const IconFontSize = 'clamp(1.2rem, 1.0615rem + 0.6154vw, 1.6rem)'
export const ExtraBigFontSize = 'clamp(1.3rem, 0.9538rem + 1.5385vw, 2.3rem)'
export const BiggerFontSize = 'clamp(1.8rem, 1.3846rem + 1.8462vw, 3rem)'