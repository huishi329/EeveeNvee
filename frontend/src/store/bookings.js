import { csrfFetch } from "./crsf";

const GET_CURRENT_BOOKINGS = 'bookings/GET_CURRENT_BOOKINGS';

export const getCurrentBookings = (bookings) => async dispatch => {
    const response = await csrfFetch('/api/bookings/current', {
        method: 'GET',
    });
    const bookings = await response.json();
    const currentDate = new Date();
    currentDate.setHours(23, 59, 59, 59);
    const upcomingTrips = bookings.filter(booking => new Date(booking.endDate) >= currentDate);
    upcomingTrips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    const pastTrips = bookings.filter(booking => new Date(booking.endDate) < currentDate);
    pastTrips.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    dispatch({ type: GET_CURRENT_BOOKINGS, upcomingTrips, pastTrips });
};


const initialState = {
    trips: null,
    hosting: null,
};

const bookingReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case GET_CURRENT_BOOKINGS:
            const { upcomingTrips, pastTrips } = action;
            newState.trips = { upcomingTrips, pastTrips };
            return newState;
        default:
            return state;
    }
}

export default bookingReducer;
