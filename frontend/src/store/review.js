import { csrfFetch } from "./crsf";
import { getSpotDetail } from "./spot";

const LOAD_SPOT_REVIEWS = 'review/LOAD_SPOT_REVIEWS';
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
        reviewsObj[review.userId] = review
        return reviewsObj;
    }, {});
    dispatch(loadSpotReviews(reviews));
    return reviews;
};

export const createReview = (spotId, review) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review)
    });
    await dispatch(getSpotDetail(spotId));
    await dispatch(getSpotReviews(spotId));
    return response.json();
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
    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            return {
                spot: action.reviews
            }
        case CLEAR_SPOT_REVIEWS:
            return {
                spot: null
            }
        default:
            return state;
    }
}
