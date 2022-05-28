import React, { useContext } from 'react'
import styled from 'styled-components'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { CalendarContext } from '../Context'
import dayjs from 'dayjs'
import { MediumFontSize, SmallFontSize, TextFontSize } from '../GlobalStyles'
import { SiGooglecalendar } from "react-icons/si";

const Header = styled.header`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 0.5rem;
  row-gap: 1rem;
  align-items: center;
  width: fit-content;
  @media (min-width: 430px){
    grid-template-columns: auto auto auto;
    column-gap: 2rem;
  }
`
const LogoWrap = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 12px;
  width: fit-content;
  svg {
    font-size: ${MediumFontSize};
  }
  p {
    font-size: ${TextFontSize};
    font-weight: 500;
  }
`
const MonthToogle = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 12px;
  align-items: center;
  svg {
    font-size: ${TextFontSize};
    cursor: pointer;
  }
`
const TodayButton = styled.button`
  background-color: transparent;
  padding: 3px 1rem;
  border: 1px solid #c4cbdb;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: ${SmallFontSize};
  
`
const MonthName = styled.p`
  font-size: ${SmallFontSize};
`
function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(CalendarContext)
  const prevMonth = () => setMonthIndex(prev => prev - 1)
  const nextMonth = () => setMonthIndex(prev => prev + 1)
  const getToday = () => setMonthIndex(dayjs().month())
  return (
    <Header>
      <LogoWrap>
        <SiGooglecalendar/>
        <p>Calendar</p>
      </LogoWrap>
      <TodayButton onClick={getToday}>Today</TodayButton>
      <MonthToogle>
        <FaChevronLeft onClick={prevMonth}/>
        <MonthName>
          {
            dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')
          }
        </MonthName>
        <FaChevronRight onClick={nextMonth}/>
      </MonthToogle>
    </Header>    
  )
}

export default CalendarHeader