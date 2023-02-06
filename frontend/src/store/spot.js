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

export const createSpotImage = (spotId, imgFile) => async dispatch => {
    console.log(spotId, imgFile);
    const formData = new FormData();
    formData.append('spotId', spotId);
    formData.append('preview', true);

    if (imgFile) formData.append("image", imgFile);

    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData
    });

    return response.json();
}

export const createSpot = (spotData, imgFile, history) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spotData)
    });

    const spot = await response.json();
    await dispatch(createSpotImage(spot.id, imgFile))
    await dispatch(getAllSpots());
    history.push(`/spots/${spot.id}`);
    return spot;
};

export const updateSpot = (spotId, spotData) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(spotData)
    });
    await dispatch(getSpotDetail(spotId));
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
    await dispatch(loadSingleSpot(spot))
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
