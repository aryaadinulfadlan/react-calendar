import React, { useContext, useEffect, useState } from 'react'
import { getMonth } from './util'
import styled from 'styled-components'
import CalendarHeader from './components/CalendarHeader'
import Sidebar from './components/Sidebar'
import Month from './components/Month'
import { CalendarContext } from './Context'
import EventModal from './components/EventModal'
import ModalWarning from './components/EventModal/ModalWarning'
import Labels from './components/Labels'
import ModalEventFull from './components/EventModal/ModalEventFull'

const Container = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    background-image: linear-gradient(45deg, #0d0c13, #4759cc);
    gap: 2rem;
    padding: 1rem;
    overflow-y: hidden;
`
/* background-color: #2b253b; */
const Wrapper = styled.div`
    display: grid;
    column-gap: 1rem;
    grid-template-rows: 1fr 1fr;
    /* @media(min-width: 600px){
        grid-template-rows: 1fr 0.8fr;
    }
    @media(min-width: 700px){
        grid-template-rows: 1fr 0.6fr;
    }
    @media(min-width: 900px){
        grid-template-rows: 1fr 0.4fr;
    }
    @media(min-width: 1100px){
        grid-template-rows: 1fr 0.25fr;
    }
    */
    @media(min-width: 1200px){
        grid-template-columns: auto 1fr;
        grid-template-rows: unset;
    } 
`
const LabelWrap = styled.div`
    display: block;
    @media(min-width: 1200px){
        display: none;
    }
`
function App() {
    const [daysMatrix, setDaysMatrix] = useState(getMonth())
    const { monthIndex } = useContext(CalendarContext)
    useEffect(() => {
        setDaysMatrix(getMonth(monthIndex))
    }, [monthIndex])
    return (
        <React.Fragment>
            <EventModal/>
            <ModalWarning/>
            <ModalEventFull/>
            <Container>
                <CalendarHeader/>
                <Wrapper>
                    <Sidebar/>
                    <Month daysMatrix={daysMatrix}/>
                    <LabelWrap>
                        <Labels/>
                    </LabelWrap>
                </Wrapper>
            </Container>
        </React.Fragment>
    )
}

export default App

// bugs abadi  :   form isian otomatis terisi saat baru saja menghapus event tertentu
// solutions   :   akan ada banyak bugs-bugs lain yg akan terjadi dan sulit untuk diprediksi ataupun di atasi
//                 tetapi bugs2 ini tidaklah krusial, artinya bisa diabaikan saja
//                 karena jika selalu berputar2 di bugs maka tidak akan ada ujungnya, aplikasi tidak jadi2. bugs selalu ada
//                 kita tidak bisa melangkah ke aplikasi yg lain. maka tinggalkan bugs2 ini, dan mulailah aplikasi baru.
// perbaiki bugs add new event when label uncheck                   DONE
// maksimal jumlah seluruh event yang bisa ditambahkan perbulan     DONE    
    // bugs: jangan compare dengan nilai monthIndex
    // solutions: compare dengan nilai month pada daySelected
// modal font-size using clamp                                      DONE
// manage label list display                                        DONE