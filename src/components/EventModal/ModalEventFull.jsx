import React, { useContext } from 'react'
import { CalendarContext } from "../../Context";
import { CloseButton, Container, Modal, TopBanner } from './EventModalStyle';
import { Content, OkButton } from './ModalWarning';

function ModalEventFull() {
  const { modalEventFull, modalEventFullToggle } = useContext(CalendarContext)
  return (
    <Modal modal={modalEventFull}>
        <Container>
          <TopBanner>
            <p>Warning</p>
            <CloseButton onClick={modalEventFullToggle}/>
          </TopBanner>
          <Content>
            <h3>Can't create new event</h3>
            <h3>Event on this month is full</h3>
            <h3>Please delete at least one event</h3>
            <OkButton onClick={modalEventFullToggle}>ok</OkButton>
          </Content>
        </Container>
    </Modal>
  )
}

export default ModalEventFull