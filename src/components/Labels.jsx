import React, { useContext } from 'react'
import styled from 'styled-components'
import { CalendarContext } from '../Context'
import { SmallFontSize } from '../GlobalStyles'

const LabelContainer = styled.div`
    margin-top: 2rem;
`
const LabelTitle = styled.p`
    font-size: ${SmallFontSize};
    font-weight: bold;
`
const LabelWrap = styled.div`
    display: grid;
    column-gap: 3rem;
    row-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    margin-top: 1rem;
    width: fit-content;
    p {
        font-size: ${SmallFontSize};
    }
`
const Label = styled.label`
    display: flex;
    align-items: center;
`
const Input = styled.input`
    border: none;
    outline: none;
    margin-right: 9px;
    width: 17px;
    height: 17px;
    cursor: pointer;
`
const Span = styled.span`
    background-color: ${({warna}) => warna};
    width: 50px;
    height: 20px;
`
function Labels() {
  const { labels, updateLabel } = useContext(CalendarContext)
  return (
    <LabelContainer>
        <LabelTitle>Label List</LabelTitle>
        <LabelWrap>
            {
                labels.length ? labels.map((lbl, idx) => (
                    <Label key={idx}>
                        <Input type="checkbox" checked={lbl.checked} onChange={() => updateLabel({label: lbl.label, checked: !lbl.checked})}/>
                        <Span warna={lbl.label}/>
                    </Label>
                )) : <p>No label available</p>
            }
        </LabelWrap>
    </LabelContainer>
  )
}

export default Labels