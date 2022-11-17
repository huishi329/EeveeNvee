const NARROW_NAVBAR = 'style/NARROW_NARBAR';
const RESTORE_NAVBAR = 'style_RESTORE_NAVBAR';

const narrowNavbar = {
    marginLeft: '10rem',
    marginRight: '10rem'
};

export const setNavbar = () => {
    return {
        type: NARROW_NAVBAR,
        style: narrowNavbar
    }
}

export const restoreNavbar = () => {
    return {
        type: RESTORE_NAVBAR,
    }
}

const initialState = {
    navbar: {}
};

const styleReducer = (state = initialState, action) => {
    switch (action.type) {
        case NARROW_NAVBAR:
            return { ...state, navbar: action.style }
        case RESTORE_NAVBAR:
            return { ...state, navbar: {} }
        default:
            return state;
    };
};

export default styleReducer;
