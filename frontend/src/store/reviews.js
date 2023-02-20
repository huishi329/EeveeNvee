import { csrfFetch } from "./crsf";
import { getSpotDetail } from "./spots";

const LOAD_SPOT_REVIEWS = 'review/LOAD_SPOT_REVIEWS';
const LOAD_USER_REVIEWS = 'review/LOAD_USER_REVIEWS';
const CREATE_REVIEW = 'review/CREATE_REVIEW';
const DELETE_REVIEW = 'review/DELETE_REVIEW';
const CLEAR_SPOT_REVIEWS = 'review/CLEAR_SPOT_REVIEWS';

const loadSpotReviews = (reviews) => {
    return {
        type: LOAD_SPOT_REVIEWS,
        reviews
    };
};

export const getSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    });

    const data = await response.json();
    const reviews = data.Reviews.reduce((reviewsObj, review) => {
        reviewsObj[review.id] = review
        return reviewsObj;
    }, {});
    dispatch(loadSpotReviews(reviews));
    return reviews;
};

export const getCurrentReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`, {
    });

    const data = await response.json();
    const reviews = data.Reviews.reduce((reviewsObj, review) => {
        reviewsObj[review.spotId] = review
        return reviewsObj;
    }, {});
    dispatch({ type: LOAD_USER_REVIEWS, reviews });
};


export const createReview = (spotId, reqBody) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reqBody)
    });
    const review = await response.json();
    dispatch({ type: CREATE_REVIEW, review });
};

export const updateReview = (reviewId, reqBody) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(reqBody)
    });

    const review = await response.json();
    dispatch({ type: CREATE_REVIEW, review });
};

export const deleteReview = (review) => async dispatch => {
    await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE'
    });
    await dispatch(getSpotDetail(review.spotId));
    await dispatch(getSpotReviews(review.spotId));
};

export const clearSpotReviews = () => {
    return {
        type: CLEAR_SPOT_REVIEWS
    }
}

const initialState = {
    spot: null,
    user: null
}

export default function reviewReducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            newState.spot = action.reviews
            return newState;
        case LOAD_USER_REVIEWS:
            newState.user = action.reviews
            return newState;
        case CREATE_REVIEW:
            newState.user = { ...newState.user };
            newState.user[action.review.spotId] = action.review
            return newState;
        case DELETE_REVIEW:
            newState.user = { ...newState.user };
            delete newState.user[action.review.spotId];
            return newState;
        case CLEAR_SPOT_REVIEWS:
            return {
                spot: null
            }
        default:
            return state;
    }
}
