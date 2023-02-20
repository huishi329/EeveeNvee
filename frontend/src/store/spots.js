import { csrfFetch } from "./crsf";

const LOAD_ALL_SPOTS = 'spots/LOAD_ALL_SPOTS';
const LOAD_HOSTING_SPOTS = 'spots/LOAD_HOSTING_SPOTS';
const LOAD_SINGLE_SPOT = 'spots/LOAD_SINGLE_SPOT';
const CLEAR_SINGLE_SPOT = 'spots/CLEAR_SINGLE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const CREATE_SPOT_IMAGE = 'spots/CREATE_SPOT_IMAGE';
const DELETE_SPOT_IMAGE = 'spots/DELETE_SPOT_IMAGE';


const loadAllSpots = (spots) => {
    return { type: LOAD_ALL_SPOTS, spots };
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
    return { type: LOAD_HOSTING_SPOTS, spots };
};

export const getHostingSpots = () => async dispatch => {
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

export const createSpot = spotData => async () => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spotData)
    });

    const spot = await response.json();
    return spot.id;
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
    return { type: LOAD_SINGLE_SPOT, spot };
};

export const getSpotDetail = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    const spot = await response.json();
    const imagesNormalized = {}
    spot.SpotImages.forEach(image => {
        imagesNormalized[image.position] = image;
    });
    spot.SpotImages = imagesNormalized;
    dispatch(loadSingleSpot(spot));
};

export const clearSingleSpot = () => {
    return { type: CLEAR_SINGLE_SPOT };
}

export const deleteSpot = (spotId) => async dispatch => {
    await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    dispatch({ type: DELETE_SPOT, spotId });
};

export const createSpotImage = (spotId, imgFile, position) => async dispatch => {
    const formData = new FormData();
    formData.append('spotId', spotId);
    formData.append('position', position);
    formData.append("image", imgFile);

    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData
    });
    const image = await response.json();
    dispatch({ type: CREATE_SPOT_IMAGE, image });
    return image;
}

export const deleteSpotImage = (imageId, position) => async dispatch => {
    await csrfFetch(`/api/spot-images/${imageId}`, {
        method: 'DELETE'
    });
    dispatch({ type: DELETE_SPOT_IMAGE, position });
}

export const shuffleSpotImages = (image1, image2) => async dispatch => {
    const response1 = await csrfFetch(`/api/spot-images/${image1.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ position: image2.position })
    });
    const response2 = await csrfFetch(`/api/spot-images/${image2.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ position: image1.position })
    });
    const image1Updated = await response1.json();
    const image2Updated = await response2.json();
    dispatch({ type: CREATE_SPOT_IMAGE, image: image1Updated });
    dispatch({ type: CREATE_SPOT_IMAGE, image: image2Updated });
}


const initialState = {
    allSpots: null,
    hostingSpots: null,
    singleSpot: null
};

const spotReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_ALL_SPOTS:
            newState.allSpots = action.spots;
            return newState;
        case LOAD_HOSTING_SPOTS:
            newState.hostingSpots = action.spots;
            return newState;
        case LOAD_SINGLE_SPOT:
            newState.singleSpot = action.spot;
            return newState;
        case CLEAR_SINGLE_SPOT:
            newState.singleSpot = null;
            return newState;
        case DELETE_SPOT:
            newState.hostingSpots = { ...newState.hostingSpots };
            delete newState.hostingSpots[action.spotId];
            return newState;
        case CREATE_SPOT_IMAGE:
            newState.singleSpot = { ...newState.singleSpot };
            newState.singleSpot.SpotImages = { ...newState.singleSpot.SpotImages };
            if (newState.singleSpot.SpotImages[action.image.position])
                newState.singleSpot.SpotImages[action.image.position] = { ...newState.singleSpot.SpotImages[action.image.position] };
            newState.singleSpot.SpotImages[action.image.position] = action.image;
            return newState;
        case DELETE_SPOT_IMAGE:
            newState.singleSpot = { ...newState.singleSpot };
            newState.singleSpot.SpotImages = { ...newState.singleSpot.SpotImages };
            delete newState.singleSpot.SpotImages[action.position];
            for (let i = action.position; i < Object.keys(newState.singleSpot.SpotImages).length; i++) {
                if (newState.singleSpot.SpotImages[i + 1]) {
                    newState.singleSpot.SpotImages[i + 1].position = i;
                    newState.singleSpot.SpotImages[i] = newState.singleSpot.SpotImages[i + 1];
                    delete newState.singleSpot.SpotImages[i + 1];
                }
            }
            return newState;
        default:
            return state;
    }
};

export default spotReducer;
