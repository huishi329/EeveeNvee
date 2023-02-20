import { csrfFetch } from "./crsf";

const GET_CURRENT_BOOKINGS = 'bookings/GET_CURRENT_BOOKINGS';
const CREATE_BOOKING = 'bookings/CREATE_BOOKING';

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

export const createBooking = (spotId, booking) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify(booking)
    });

    const newBooking = await response.json();
    dispatch({ type: CREATE_BOOKING, newBooking });
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
        case CREATE_BOOKING:
            newState.trips = { ...newState.trips };
            newState.trips.upcomingTrips = [...newState.trips.upcomingTrips, action.newBooking];
            newState.trips.upcomingTrips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            return newState;
        default:
            return state;
    }
}

export default bookingReducer;
