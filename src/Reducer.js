const ADD_EVENT = 'ADD EVENT'
const UPDATE_EVENT = 'UPDATE EVENT'
const REMOVE_EVENT = 'REMOVE EVENT'

export const addEventAction = payload => {
    return {
        type: ADD_EVENT,
        payload: payload
    }
}
export const updateEventAction = payload => {
    return {
        type: UPDATE_EVENT,
        payload: payload
    }
}
export const removeEventAction = payload => {
    return {
        type: REMOVE_EVENT,
        payload: payload
    }
}
export const EventReducer = (state, {type, payload}) => {
    switch (type) {
        case ADD_EVENT:
            return [...state, payload]
        case UPDATE_EVENT:
            return state.map(event => event.id === payload.id ? payload : event)
        case REMOVE_EVENT: 
            return state.filter(event => event.id !== payload.id)
        default:
            return state
    }
}
export const EventInit = () => {
    const localEvent = window.localStorage.getItem('savedEvent')
    const parsedEvent = localEvent ? JSON.parse(localEvent) : []
    return parsedEvent
}
// coba modif nilai localstorage malalui browser
// modif dengan nilai yang tidak valid
// lalu lihat bagaimana consume nya pada application