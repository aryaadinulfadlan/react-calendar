import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import React, { useContext, useEffect, useState } from 'react'
import { FaBookmark, FaCheck, FaClock, FaPencilAlt, FaTimesCircle, FaUsb } from 'react-icons/fa'
import styled from 'styled-components'
import { CalendarContext } from '../src/Context'
import { addEventAction, removeEventAction, updateEventAction } from '../src/Reducer'

const Modal = styled.div`
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
const Container = styled.div`
    background-color: #363655;
    width: 400px;
    border-radius: 10px;
    overflow: hidden;
    display: grid;
    grid-template-rows: 45px 1fr;
    position: relative;
`
const TopBanner = styled.div`
    background-color: #314168;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    p {
        font-weight: 600;
    }
`
const CloseButton = styled(FaTimesCircle)`
    font-size: 1.4rem;
    cursor: pointer;
`
const Form = styled.form`
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
    row-gap: 1.5rem;
    align-items: center;
`
const Input = styled.input`
    outline: none;
    grid-column: 2 / -1;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid white;
    color: white;
    padding: 5px;
`
const Date = styled.p`
    grid-column: 2 / -1;
`
const ColorOptions = styled.div`
    width: fit-content;
    display: grid;
    align-items: center;
    grid-column: 2 / -1;
    gap: 10px;
    grid-auto-flow: column;
`
const Color = styled.span`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: ${({bgColor}) => bgColor};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const FaCheckStyled = styled(FaCheck)`
    font-size: 12px;
    color: white;
`
const DeleteButton = styled.button`
    position: absolute;
    bottom: 1.1rem;
    left: 1.3rem;
    cursor: pointer;
    background-color: #e43d3d;
    color: white;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 12px;
    border: none;
    outline: none;
    border-radius: 6px;
    text-transform: uppercase;
`
const SubmitButton = styled.button`
    outline: none;
    border: none;
    background-color: blue;
    padding: 5px 1.5rem;
    text-transform: uppercase;
    color: white;
    border-radius: 10px;
    grid-column: -2 / -1;
    margin-top: 1.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.5s;
    :hover {
        background-color: #0000af;
    }
`
const labels = ['fuchsia', 'gray', 'green', 'blue', 'red', 'palevioletred']
function EventModal() {
  const { modal, modalToggle, setModal, daySelected, setDaySelected, eventDispatch, selectedEvent } = useContext(CalendarContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedLabel, setSelectedLabel] = useState(labels[0])
  
  const handleSubmit = e => {
      e.preventDefault()
      const newEvent = {
          id: selectedEvent ? selectedEvent.id : nanoid(),
          title: title,
          description: description,
          label: selectedLabel,
          day: daySelected.valueOf()
      }
      if (selectedEvent) {
          eventDispatch(updateEventAction(newEvent))
      } else {
          eventDispatch(addEventAction(newEvent))
      }
      setTitle('')
      setDescription('')
      setSelectedLabel(labels[0])
      modalToggle()
  }
  const handleDelete = item => {
      eventDispatch(removeEventAction(item))
      modalToggle()
  }

  useEffect(() => {
    if (selectedEvent) {
        const { description, label, title, day } = selectedEvent
        setTitle(title)
        setDescription(description)
        setSelectedLabel(label)
        setDaySelected(dayjs(day))
    } else {
        setTitle('')
        setDescription('')
        setSelectedLabel(labels[0])
    }
  }, [selectedEvent, setDaySelected])

  useEffect(() => {
    window.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        setModal(false)
      }
    })
  }, [setModal])

  return (
    <Modal modal={modal}>
        <Container>
            <TopBanner>
                <p>
                    {
                        selectedEvent ? 'Update Event' : 'Create New Event'
                    }
                </p>
                <CloseButton onClick={modalToggle}/>
            </TopBanner>
            <Form onSubmit={handleSubmit}>
                <FaUsb/>
                <Input type='text' placeholder='Title here..' value={title} onChange={e => setTitle(e.target.value)} required/>
                <FaClock/>
                <Date>{daySelected ? daySelected.format('dddd, MMMM DD YYYY') : 'No Day Selected'}</Date>
                <FaPencilAlt/>
                <Input type='text' placeholder='Short description..' value={description} onChange={e => setDescription(e.target.value)} required/>
                <FaBookmark/>
                <ColorOptions>
                    {
                        labels.map((label, idx) => (
                            <Color key={idx} bgColor={label} onClick={() => setSelectedLabel(label)}>
                                {label === selectedLabel && <FaCheckStyled/>}
                            </Color>
                        ))
                    }
                </ColorOptions>
                <SubmitButton>save</SubmitButton>
            </Form>
            {
                selectedEvent ? <DeleteButton onClick={() => handleDelete(selectedEvent)}>delete</DeleteButton> : null
            }
        </Container>
    </Modal>
  )
}

export default EventModal

// TAMBAHKAN VALIDASI