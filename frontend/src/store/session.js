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

export const loginUser = (userData) => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(userData)
    });

    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        return user;
    }
}

export const logoutUser = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });

    if(response.ok) {
        dispatch(removeUser());
        return response;
    }
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const user = await response.json();
    console.log(user);
    dispatch(setUser(user));
    return response;
};

export const signupUser = (userData) => async dispatch => {
    const response = await csrfFetch('api/users', {
        method: 'POST',
        body: JSON.stringify(userData)
    })
    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        return user;
    }
    return response;
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
