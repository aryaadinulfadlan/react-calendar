import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import { FaBookmark, FaClock, FaPencilAlt, FaUsb } from 'react-icons/fa'
import { AiFillWarning } from 'react-icons/ai'
import { CalendarContext } from '../../Context'
import { addEventAction, removeEventAction, updateEventAction } from '../../Reducer'
import { CloseButton, Color, ColorOptions, Container, Date, DeleteButton, ErrorMessage, ErrorWrap, FaCheckStyled, Form, FormControl, Input, Modal, SubmitButton, TopBanner } from './EventModalStyle'
import { useForm } from "react-hook-form";

const labels = ['fuchsia', 'orange', 'green', 'blue', 'red', 'palevioletred']
function EventModal() {
  const { modal, modalToggle, setModal, daySelected, setDaySelected, eventDispatch, selectedEvent, setSelectedEvent } = useContext(CalendarContext)
  const [selectedLabel, setSelectedLabel] = useState(labels[0])
  const {handleSubmit, register, setValue, formState: {errors}, setError} = useForm()
  const handleDelete = item => {
    eventDispatch(removeEventAction(item))
    modalToggle()
  }
  const rules = {
    title: {
        required: {value:true, message: 'This is required'},
        minLength: {value:5, message: 'Minimum 5 characters'},
        maxLength: {value:12, message: 'Maximum 12 characters'}
    },
    description: {
        required: {value:true, message: 'This is required'},
        minLength: {value:15, message: 'Minimum 15 characters'},
        maxLength: {value:30, message: 'Maximum 30 characters'}
    }
  }
  const onSubmit = formData => {
      const {title, description} = formData
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
      setValue('title', '')
      setValue('description', '')
      setSelectedLabel(labels[0])
      modalToggle()
  }
  const closeModal = () => {
      modalToggle()
      setSelectedEvent(null)
      setValue('title', '')
      setValue('description', '')
      setSelectedLabel(labels[0])
  }
  
  // EFFECT HARUS PASTI, JELAS DAN TIDAK BERPOTENSI BUG
  // EFFECT UNTUK MENGISI OTOMATIS FORM KETIKA UPDATE EVENT
  useEffect(() => {
    if (selectedEvent) {
        const { description, label, title, day } = selectedEvent
        setValue('title', title)
        setValue('description', description)
        setSelectedLabel(label)
        setDaySelected(dayjs(day))
    } 
  }, [selectedEvent, setDaySelected, setValue])

  // EFFECT UNTUK CLOSE MODAL DAN MEMBERSIHKAN BERBAGAI NILAI PADA FORM ISIAN
  useEffect(() => {
    window.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        setModal(false)
        setSelectedEvent(null)
        setValue('title', '')
        setValue('description', '')
        setSelectedLabel(labels[0])
      }
    })
  }, [setModal, setSelectedEvent, setValue, setError])
  
  return (
    <Modal modal={modal}>
        <Container>
            <TopBanner>
                <p>
                    {
                        selectedEvent ? 'Update Event' : 'Create New Event'
                    }
                </p>
                <CloseButton onClick={closeModal}/>
            </TopBanner>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FaUsb/>
                    <Input type='text' placeholder='Title here..' {...register('title', rules.title)}/>
                </FormControl>
                {errors.title && (
                    <ErrorWrap>
                        <ErrorMessage><AiFillWarning/> {errors.title?.message} </ErrorMessage>
                    </ErrorWrap>
                )}
                <FormControl>
                    <FaClock/>
                    <Date>{daySelected ? daySelected.format('dddd, MMMM DD YYYY') : 'No Day Selected'}</Date>
                </FormControl>
                <FormControl>
                    <FaPencilAlt/>
                    <Input type='text' placeholder='Short description..' {...register('description', rules.description)}/>
                </FormControl>
                {errors.description && (
                    <ErrorWrap>
                        <ErrorMessage><AiFillWarning/> {errors.description?.message} </ErrorMessage>
                    </ErrorWrap>
                )}
                <FormControl>
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
                </FormControl>
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