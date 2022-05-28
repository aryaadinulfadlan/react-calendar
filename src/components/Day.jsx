import dayjs from 'dayjs'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import { CalendarContext } from '../Context'
import { SmallFontSize, TextFontSize } from '../GlobalStyles'

const DayWrap = styled.div`
  border: 1px solid #b1afaf;
  padding: 5px;
  ${({events}) => events ? css`
    display: grid;
    grid-template-rows: auto 1fr;
  ` : css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`
const DayDate = styled.p`
  ${({currentDay}) => currentDay && css`
    background-color: green;
    color: white;
    font-weight: 600;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  `}
  ${({events}) => events && css`
    display: flex;
    justify-content: flex-end;
  `}
  cursor: pointer;
  font-size: ${TextFontSize};
  opacity: ${({currentMonth}) => currentMonth ? '1' : '0.5'};
  margin-bottom: 10px;
`
const DayEvents = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  gap: 5px;
`
const DayEventItem = styled.p`
  background-color: ${({bg}) => bg};
  padding: 0 3px;
  cursor: pointer;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${SmallFontSize};
`

function Day({day, patokan}) {
  const { setDaySelected, modalToggle, filteredEvents, event, setSelectedEvent, modalWarningToggle, modalEventFullToggle } = useContext(CalendarContext)
  const [ thisDayEvents, setThisDayEvents ] = useState([])
  
  const dayHandleClick = d => {
    if (eventOnOneMonth.length === 15) {
      modalEventFullToggle()
    } else if (eventOnOneDay.length === 2) {
      modalWarningToggle()
    } else {
      setDaySelected(d)
      setSelectedEvent(null)
      modalToggle()
    }
  }
  const eventHandleClick = e => {
    setSelectedEvent(e)
    modalToggle()
  }
  const eventOnOneDay = useMemo(() => {
    return event.filter(e => dayjs(e.day).format('DD-MMMM-YYYY') === day.format('DD-MMMM-YYYY'))
  }, [event, day])

  const eventOnOneMonth = useMemo(() => {
    return event.filter(e => dayjs(e.day).format('MMMM YYYY') === day.format('MMMM YYYY'))
  }, [event, day])

  useEffect(() => {
    const events = filteredEvents.filter(e => dayjs(e.day).format('DD-MMMM-YYYY') === day.format('DD-MMMM-YYYY'))
    setThisDayEvents(events)
  }, [filteredEvents, day])
  // dayjs(new Date(dayjs().year(), monthIndex))
  return (
    <DayWrap events={thisDayEvents.length > 0 ? true : false}>
      <DayDate 
        onClick={() => dayHandleClick(day)}
        currentDay={day.format('DD-MMMM-YYYY') === dayjs().format('DD-MMMM-YYYY') ? true : false}
        currentMonth={patokan === day.month() ? true : false}
        events={thisDayEvents.length > 0 ? true : false}>
          {day.format('DD')}
      </DayDate>
      {
        thisDayEvents.length > 0 && <DayEvents>
          {
            thisDayEvents.map(evt => (
              <DayEventItem onClick={() => eventHandleClick(evt)} bg={evt.label} key={evt.id}>{evt.title}</DayEventItem>
            ))
          }
        </DayEvents>
      }
    </DayWrap>
  )
}

export default Day