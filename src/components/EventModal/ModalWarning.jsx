import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { CalendarContext } from '../../Context'
import { TextFontSize } from '../../GlobalStyles'
import { CloseButton, Container, Modal, TopBanner } from './EventModalStyle'

export const Content = styled.div`
  padding: 2rem 1rem;
  display: grid;
  h3 {
    font-size: ${TextFontSize};
  }
`
export const OkButton = styled.button`
  border: none;
  outline: none;
  font-size: ${TextFontSize};
  padding: 10px 0;
  background-color: blue;
  color: white;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 2rem;
  cursor: pointer;
  transition: background-color 0.5s;
  :hover {
    background-color: #0d0dbb;
  }
`

function ModalWarning() {
  const { modalWarning, setModalWarning, modalWarningToggle } = useContext(CalendarContext)
  useEffect(() => {
     window.addEventListener('keyup', e => {
        if (e.key === 'Escape') {
            setModalWarning(false)
        }
     })
  }, [setModalWarning])
  return (
      <Modal modal={modalWarning}>
        <Container>
          <TopBanner>
            <p>Warning</p>
            <CloseButton onClick={modalWarningToggle}/>
          </TopBanner>
          <Content>
            <h3>Can't create new event</h3>
            <h3>Event on this day is full</h3>
            <OkButton onClick={modalWarningToggle}>ok</OkButton>
          </Content>
        </Container>
      </Modal>
  )
}

export default ModalWarning