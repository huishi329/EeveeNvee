import { csrfFetch } from "./crsf";

const LOAD_ALL_SPOTS = 'spot/LOAD_ALL_SPOTS';
const LOAD_HOSTING_SPOTS = 'spot/LOAD_HOSTING_SPOTS';
const LOAD_SINGLE_SPOT = 'spot/LOAD_SINGLE_SPOT';
const ADD_SPOT = 'spot/ADD_SPOT';
// const REMOVE_SPOT = 'spot/REMOVE_SPOT';

const loadAllSpots = (spots) => {
    return {
        type: LOAD_ALL_SPOTS,
        spots
    };
};

export const getAllSpots = (spotData) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
    });

    if (response.ok) {
        const data = await response.json();
        const spots = data.Spots.reduce((spotsObj, spot) => {
            spotsObj[spot.id] = spot
            return spotsObj;
        }, {});
        dispatch(loadAllSpots(spots));
        // return data.Spots;
    }
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

    if (response.ok) {
        const data = await response.json();
        const spots = data.Spots.reduce((spotsObj, spot) => {
            spotsObj[spot.id] = spot
            return spotsObj;
        }, {});
        dispatch(loadHostingSpots(spots));
        return spots;
    }
};

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    };
};

export const createSpot = (spotData) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spotData)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(addSpot(spot));
        return spot;
    }
};

const loadSingleSpot = (spot) => {
    return {
        type: LOAD_SINGLE_SPOT,
        spot
    };
};

export const getSpotDetail = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const spot = await response.json();
        dispatch(loadSingleSpot(spot))
        return spot;
    }

};

// const removeSpot = (spot) => {
//     return {
//         type: REMOVE_SPOT,
//         spot
//     }
// };


// export const deleteSpot = () => async dispatch => {
//     const response = await csrfFetch('/api/spots', {
//         method: 'DELETE'
//     });

//     if(response.ok) {
//         dispatch(removeSpot());
//         return response;
//     }
// };

const initialState = {
    allSpots: null,
    hostSpots: null,
    singleSpot: null
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_SPOTS:
            return {
                ...state,
                allSpots: action.spots
            }
        case LOAD_HOSTING_SPOTS:
            return {
                ...state,
                hostSpots: action.spots
            }
        case LOAD_SINGLE_SPOT:
            return {
                ...state,
                singleSpot: action.spot
            }
        case ADD_SPOT:
            return {
                ...state,
                hostSpots: { ...state.hostSpots, [action.spot.id]: action.spot },
                allSpots: { ...state.allSpots, [action.spot.id]: action.spot }
            };
        default:
            return state;
    }
};

export default spotReducer;
