import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styled, { css } from 'styled-components'
import { CalendarContext } from '../Context'
import { getMonth } from '../util'

const Container = styled.div`
    margin-top: 2rem;
    display: grid;
    gap: 10px;
`
const ButtonWrap = styled.div`
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 2rem;
    width: fit-content;
    svg {
        cursor: pointer;
    }
`
const DayNameWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    gap: 1rem;
    font-weight: 500;
`
const DaysMatrix = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    justify-items: center;
    gap: 1rem;
`
const DayItem = styled.span`
    font-size: 14px;
    cursor: pointer;
    opacity: ${({currentMonth}) => currentMonth ? '1' : '0.5'};
    ${({currentDay}) => currentDay && css`
        background-color: blue;
        border-radius: 1rem;
        font-weight: 600;
    `}
    ${({selectedDay}) => selectedDay && css`
        background-color: #085e36;
        border-radius: 10px;
    `}
`
function SmallCalendar() {
  const [daysMatrix, setDaysMatrix] = useState(getMonth())
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month())
  const prevMonth = () => setCurrentMonthIndex(prev => prev - 1)
  const nextMonth = () => setCurrentMonthIndex(prev => prev + 1)
  const { setSmallCalendarMonth, daySelected, setDaySelected, } = useContext(CalendarContext)

  const handleClick = d => {
    setSmallCalendarMonth(currentMonthIndex)
    setDaySelected(d)
  }
  useEffect(() => {
    setDaysMatrix(getMonth(currentMonthIndex))
  }, [currentMonthIndex])
  return (
    <Container>
        <ButtonWrap>
            <FaChevronLeft onClick={prevMonth}/>
            <p>{dayjs(new Date(dayjs().year(), currentMonthIndex)).format('MMMM YYYY')}</p>
            <FaChevronRight onClick={nextMonth}/>
        </ButtonWrap>
        <DayNameWrap>
            {
                daysMatrix[0].map((day, i) => (
                    <span key={i}>
                        {day.format('dd').charAt(0)}
                    </span>
                )) 
            }
        </DayNameWrap>
        <DaysMatrix>
            {
                daysMatrix.map((row, rowIdx) => (
                    <React.Fragment key={rowIdx}>
                        {
                            row.map((day, dayIdx) => (
                                <DayItem key={dayIdx} 
                                    onClick={() => handleClick(day)}
                                    selectedDay={daySelected && daySelected.format('DD MMMM YYYY') === day.format('DD MMMM YYYY') ? true : false}
                                    currentDay={dayjs().format('DD MMMM YYYY') === day.format('DD MMMM YYYY') ? true : false}
                                    currentMonth={day.month() === daysMatrix[3][0].month() ? true : false}>
                                    {day.format('D')}
                                </DayItem>
                            ))
                        }
                    </React.Fragment>
                ))
            }
        </DaysMatrix>
    </Container>
  )
}

export default SmallCalendar

// daySelected && daySelected.format('DD MMMM YYYY') === day.format('DD MMMM YYYY') ? true : false