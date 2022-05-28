import React, { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import Plus from '../assets/plus.svg'
import { CalendarContext } from '../Context'
import dayjs from 'dayjs'
import { Content, OkButton } from './EventModal/ModalWarning'
import { Modal, CloseButton, Container, TopBanner } from './EventModal/EventModalStyle'

const Button = styled.button`
    background-color: transparent;
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
    border: 1px solid #7e65c2;
    outline: none;
    padding: 3px 10px;
    border-radius: 1rem;
    box-shadow: 0 1px 3px 0 #ededf0bf; //horizontal vertical blur spread color
    img {
        width: 30px;
    }
    span {
        margin-left: 10px;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 600;
    }
`
function CreateEventButton() {
  const { modalToggle, setSelectedEvent, modalWarningToggle, modalEventFullToggle, daySelected, event } = useContext(CalendarContext)
  const [show, setShow] = useState(false)

  const eventOnOneMonth = useMemo(() => {
    return event.filter(e => dayjs(e.day).format('MMMM YYYY') === daySelected?.format('MMMM YYYY'))
  }, [event, daySelected])

  const handleClick = () => {
    if (!daySelected) {
      setShow(true)
    } else if (eventOnOneMonth.length === 15) {
      modalEventFullToggle()
    } else if (filteredEvents && filteredEvents.length === 2) {
      modalWarningToggle()
    } else {
      setSelectedEvent(null)
      modalToggle()
    }
  }
  const filteredEvents = useMemo(() => {
    if (daySelected) {
      return event.filter(evt => dayjs(evt.day).format('DD-MMMM-YYYY') === daySelected.format('DD-MMMM-YYYY'))
    }
  }, [event, daySelected])
  // dayjs(new Date(dayjs().year(), monthIndex))
  return (
    <>
      <Modal modal={show}>
        <Container>
          <TopBanner>
            <p>Can't create new event</p>
            <CloseButton onClick={() => setShow(false)}/>
          </TopBanner>
          <Content>
            <h3>Please choose the day before</h3>
            <OkButton onClick={() => setShow(false)}>ok</OkButton>
          </Content>
        </Container>
      </Modal>
      <Button onClick={handleClick}>
          <img src={Plus} alt="add" />
          <span>new event</span>
      </Button>
    </>
  )
}

export default CreateEventButton

// CASE PADA USE MEMO DI ATAS BISA DISELESAIKAN DENGAN USE EFFECT JUGA
// const [eventOnThisDay, setEventOnThisDay] = useState([])
// useEffect(() => {
//   if (daySelected) {
//     const events = event.filter(evt => dayjs(evt.day).format('DD-MMMM-YYYY') === daySelected.format('DD-MMMM-YYYY'))
//     setEventOnThisDay(events)
//   }
// }, [daySelected, event])
// console.log(eventOnThisDay)
// width: 90%;
// white-space: nowrap;
// overflow: hidden;
// text-overflow: ellipsis;