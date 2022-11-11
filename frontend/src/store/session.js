import { csrfFetch } from "./crsf";

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const loginUser = (user) => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });

    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        return user;
    }
    const errors = response.json();
    console.log(errors);
}

const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:
            return { user: action.user };
        case REMOVE_USER:
            return { user: null }
        default:
            return state;
    }
};

export default sessionReducer;
