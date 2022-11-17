import { csrfFetch } from "./crsf";

const LOAD_SPOT_REVIEWS = 'review/LOAD_SPOT_REVIEWS'


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
        default:
            return state;
    }
}
