import dayjs from "dayjs";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { EventInit, EventReducer } from "./Reducer";

// NILAI DEFAULT AKAN TERPAKAI JIKA 
// DESCENDANT COMPONENT TIDAK DI BUNGKUS OLEH PROVIDER
export const CalendarContext = React.createContext()

export const CalendarContextProvider = ({children}) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month())           // CURRENT MONTH DALAM BENTUK ANGKA INDEX (0 - 11)
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)      // FOR SMALL CALENDAR
    const [daySelected, setDaySelected] = useState(null)
    const [selectedEvent, setSelectedEvent] = useState(null)                // FOR SELECTED EVENT
    const [labels, setLabels] = useState([])
    const [modal, setModal] = useState(false)                               // FOR MODAL
    const [event, eventDispatch] = useReducer(EventReducer, [], EventInit)
    const [modalWarning, setModalWarning] = useState(false)
    const [modalEventFull, setModalEventFull] = useState(false)

    const modalWarningToggle = () => setModalWarning(prev => !prev)
    const modalEventFullToggle = () => setModalEventFull(prev => !prev)

    const modalToggle = () => setModal(prev => !prev)
    const updateLabel = label => {
        setLabels(labels.map(lbl => lbl.label === label.label ? label : lbl))
    }
    const filteredEvents = useMemo(() => {
        return event.filter(evt => labels.filter(lbl => lbl.checked).map(lbl => lbl.label).includes(evt.label))
    }, [event, labels])
    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth)    
        }
    }, [smallCalendarMonth])
    useEffect(() => {
        window.localStorage.setItem('savedEvent', JSON.stringify(event))
    }, [event])
    useEffect(() => {
        setLabels(prevLabel => {
            const uniqueLabel = Array.from(new Set(event.map(evt => evt.label))).map(label => {
                const currentLabel = prevLabel.find(lbl => lbl.label === label)
                return {
                    label: label, 
                    checked: currentLabel ? currentLabel.checked : true
                }
            })
            return uniqueLabel
        })
    }, [event])
    return (
        <CalendarContext.Provider 
            value={{
                monthIndex, 
                setMonthIndex, 
                smallCalendarMonth, 
                setSmallCalendarMonth,
                daySelected, 
                setDaySelected,
                modal,
                modalToggle,
                setModal,
                event, 
                eventDispatch,
                selectedEvent,
                setSelectedEvent,
                labels,
                setLabels,
                updateLabel,
                filteredEvents,
                modalWarning,
                setModalWarning,
                modalWarningToggle,
                modalEventFull,
                setModalEventFull,
                modalEventFullToggle
            }}
        >
            {children}
        </CalendarContext.Provider>
    )
}
