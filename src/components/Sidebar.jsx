import React from 'react'
import styled from 'styled-components'
import CreateEventButton from './CreateEventButton'
import Labels from './Labels'
import SmallCalendar from './SmallCalendar'

const Aside = styled.aside`
  display: none;
  @media(min-width: 1200px){
    display: block;
  }
`
function Sidebar() {
  return (
    <Aside>
      <CreateEventButton/>
      <SmallCalendar/>
      <Labels/>
    </Aside>
  )
}

export default Sidebar