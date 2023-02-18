import { csrfFetch } from "./crsf";

const GET_CURRENT_BOOKINGS = 'bookings/GET_CURRENT_BOOKINGS';

const getCurrentBookings = (bookings) => async dispatch => {
    dispatch({ type: GET_CURRENT_BOOKINGS, bookings });
};


const initialState = {
    trips: null,
    hosting: null,
};

const bookingReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case GET_CURRENT_BOOKINGS:
            newState.trips = action.bookings.trips;
            return newState;
        default:
            return state;
    }
}

export default bookingReducer;