import { FaCheck, FaTimesCircle } from 'react-icons/fa'
import styled from 'styled-components'
import { SmallFontSize, TextFontSize } from '../../GlobalStyles'

export const Modal = styled.div`
    background-color: rgba(0,0,0,0.4);
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transform: ${({modal}) => modal ? 'scale(1)' : 'scale(0)'};
    transition: transform 0.3s;
`
export const Container = styled.div`
    background-color: #363655;
    width: 330px;
    border-radius: 10px;
    overflow: hidden;
    display: grid;
    grid-template-rows: 45px 1fr;
    position: relative;
    @media (min-width: 450px){
        width: 380px;
    }
    @media (min-width: 550px){
        width: 400px;
    }
    @media (min-width: 750px){
        width: 430px;
    }
`
export const TopBanner = styled.div`
    background-color: #314168;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    p {
        font-weight: 600;
        font-size: ${SmallFontSize};
    }
`
export const CloseButton = styled(FaTimesCircle)`
    font-size: 1.4rem;
    cursor: pointer;
`
export const Form = styled.form`
    padding: 7px;
    display: flex;
    flex-direction: column;
    @media (min-width: 450px){
        padding: 1rem;
    }
`
export const FormControl = styled.div`
    display: grid;
    align-items: center;
    margin-bottom: 5px;
    margin-top: 1.5rem;
    grid-template-columns: 30px 1fr;
    @media (min-width: 450px){
        grid-template-columns: 50px 1fr;
    }
    svg {
        font-size: ${TextFontSize};
    }
`
export const ErrorWrap = styled.div`
    display: grid;
    margin-bottom: 1rem;
    grid-template-columns: 30px 1fr;
    @media (min-width: 450px){
        grid-template-columns: 50px 1fr;
    }
`
export const ErrorMessage = styled.p`
    color: #ffdddd;
    font-size: ${SmallFontSize};
    display: grid;
    grid-template-columns: 20px 1fr;
    align-items: center;
    grid-column: 2 / -1;
`
export const Input = styled.input`
    outline: none;
    grid-column: 2 / -1;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid white;
    color: white;
    padding: 5px;
    font-size: ${TextFontSize};
    width: 100%;
`
export const Date = styled.p`
    grid-column: 2 / -1;
    font-size: ${SmallFontSize};
`
export const ColorOptions = styled.div`
    width: fit-content;
    display: grid;
    align-items: center;
    grid-column: 2 / -1;
    gap: 10px;
    grid-auto-flow: column;
`
export const Color = styled.span`
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background-color: ${({bgColor}) => bgColor};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @media (min-width: 600px){
        width: 20px;
        height: 20px;
    }
    @media (min-width: 1000px){
        width: 22px;
        height: 22px;
    }
`
export const FaCheckStyled = styled(FaCheck)`
    font-size: 12px;
    color: white;
`
export const DeleteButton = styled.button`
    cursor: pointer;
    background-color: #e43d3d;
    color: white;
    font-size: ${SmallFontSize};
    font-weight: 600;
    padding: 5px 12px;
    border: none;
    outline: none;
    border-radius: 6px;
    text-transform: uppercase;
    position: absolute;
    bottom: 7px;
    left: 7px;
    @media (min-width: 450px){
        bottom: 1rem;
        left: 1rem;
    }
`
export const SubmitButton = styled.button`
    outline: none;
    border: none;
    font-size: ${SmallFontSize};
    background-color: blue;
    padding: 5px 1.5rem;
    text-transform: uppercase;
    color: white;
    border-radius: 10px;
    margin-top: 1.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.5s;
    align-self: flex-end;
    :hover {
        background-color: #0000af;
    }
`