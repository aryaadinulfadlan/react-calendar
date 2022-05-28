import React from 'react'
import Day from './Day'
import styled from 'styled-components'
import { SmallFontSize } from '../GlobalStyles'

const MonthComponent = styled.div`
  display: grid;
  overflow-x: auto;
  ::-webkit-scrollbar { /* Hide scrollbar for Chrome, Safari and Opera */
    display: none; 
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  `
const MonthContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 600px;
`
const DayNameWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  text-transform: uppercase;
  font-size: ${SmallFontSize};
  margin-bottom: 5px;
  font-weight: bold;
`
const MonthWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
`
function Month({daysMatrix}) {
  return (
    <MonthComponent>
      <MonthContainer>
        <DayNameWrapper>
          <p>sun</p>
          <p>mon</p>
          <p>tue</p>
          <p>wed</p>
          <p>thu</p>
          <p>fri</p>
          <p>sat</p>
        </DayNameWrapper>
        <MonthWrapper>
          {
            daysMatrix.map((row, rowIdx) => (
              <React.Fragment key={rowIdx}>
                {
                  row.map((day, dayIdx) => (
                    <Day day={day} key={dayIdx} patokan={daysMatrix[3][0].month()}/>
                  ))
                }
              </React.Fragment>
            ))
          }
        </MonthWrapper>
      </MonthContainer>
    </MonthComponent>
  )
}

export default Month