import { csrfFetch } from "./crsf";

const LOAD_ALL_SPOTS = 'spot/LOAD_ALL_SPOTS';
const LOAD_HOSTING_SPOTS = 'spot/LOAD_HOSTING_SPOTS';
const LOAD_SINGLE_SPOT = 'spot/LOAD_SINGLE_SPOT';

const loadAllSpots = (spots) => {
    return {
        type: LOAD_ALL_SPOTS,
        spots
    };
};

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots', {
    });

    const data = await response.json();
    const spots = data.Spots.reduce((spotsObj, spot) => {
        spotsObj[spot.id] = spot
        return spotsObj;
    }, {});
    dispatch(loadAllSpots(spots));
    return spots;
};


const loadHostingSpots = (spots) => {
    return {
        type: LOAD_HOSTING_SPOTS,
        spots
    };
};

export const getHostingSpots = (spotData) => async dispatch => {
    const response = await csrfFetch('/api/spots/current', {
    });

    const data = await response.json();
    const spots = data.Spots.reduce((spotsObj, spot) => {
        spotsObj[spot.id] = spot
        return spotsObj;
    }, {});
    dispatch(loadHostingSpots(spots));
    return spots;
};


export const createSpot = (spotData) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spotData)
    });

    dispatch(getAllSpots());
    return response.json();
};

export const updateSpot = (spotData) => async dispatch => {
    const { id, address, city, state, country, lat, lng, name, description, price } = spotData;
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ address, city, state, country, lat, lng, name, description, price })
    });
    dispatch(getSpotDetail(id));
    return response.json();
};

const loadSingleSpot = (spot) => {
    return {
        type: LOAD_SINGLE_SPOT,
        spot
    };
};

export const getSpotDetail = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    const spot = await response.json();
    dispatch(loadSingleSpot(spot))
    return spot;
};



export const deleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    await dispatch(getAllSpots());
    await dispatch(getHostingSpots());
    return response.json();
};

const initialState = {
    allSpots: null,
    hostSpots: null,
    singleSpot: null
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_SPOTS:
            return {
                hostSpots: state.hostSpots,
                allSpots: action.spots
            }
        case LOAD_HOSTING_SPOTS:
            return {
                allSpots: state.allSpots,
                hostSpots: action.spots
            }
        case LOAD_SINGLE_SPOT:
            return {
                ...state,
                singleSpot: action.spot
            }
        default:
            return state;
    }
};

export default spotReducer;
