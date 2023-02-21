import { csrfFetch } from "./crsf";

const GET_CURRENT_BOOKINGS = 'bookings/GET_CURRENT_BOOKINGS';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING';
const GET_SPOT_BOOKINGS = 'bookings/GET_SPOT_BOOKINGS';

export const getCurrentBookings = () => async dispatch => {
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

export const getSpotBookings = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'GET',
    });
    const data = await response.json();
    const bookings = data.reduce((acc, booking) => {
        acc[booking.id] = booking;
        return acc;
    }, {});
    dispatch({ type: GET_SPOT_BOOKINGS, bookings });
};

export const createBooking = (spotId, booking) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify(booking)
    });

    const newBooking = await response.json();
    return newBooking;
};

export const updateBooking = (bookingId, spot, booking) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        body: JSON.stringify(booking)
    });
    const updatedBooking = await response.json();
    updatedBooking.Spot = spot;
    dispatch({ type: UPDATE_BOOKING, updatedBooking });
};


export const deleteBooking = (bookingId) => async dispatch => {
    await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
    });
    dispatch({ type: DELETE_BOOKING, bookingId });
};



const initialState = {
    trips: null,
    hosting: null,
    spot: null
};

const bookingReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case GET_CURRENT_BOOKINGS:
            const { upcomingTrips, pastTrips } = action;
            newState.trips = { upcomingTrips, pastTrips };
            return newState;
        case GET_SPOT_BOOKINGS:
            newState.spot = { ...action.bookings };
            return newState;
        case UPDATE_BOOKING:
            newState.trips = { ...newState.trips };
            newState.trips.upcomingTrips = [...newState.trips.upcomingTrips];
            const updatedUpcomingTrips = newState.trips.upcomingTrips.filter(booking => booking.id !== action.updatedBooking.id);
            updatedUpcomingTrips.push(action.updatedBooking);
            updatedUpcomingTrips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            newState.trips.upcomingTrips = updatedUpcomingTrips;
            return newState;
        case DELETE_BOOKING:
            newState.trips = { ...newState.trips };
            newState.trips.upcomingTrips = [...newState.trips.upcomingTrips];
            newState.trips.upcomingTrips = newState.trips.upcomingTrips.filter(booking => booking.id !== action.bookingId);
            return newState;
        default:
            return state;
    }
}

export default bookingReducer;
