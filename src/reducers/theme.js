import * as R from 'ramda';
import {THEME_ID__SET, THEME_TYPE__SET} from '../constants/action-types';
import {THEME} from '../constants';

const initialState = {id: THEME.DEFAULT_ID, palette: {type: THEME.LIGHT}};

const theme = (state = initialState, action) => {
    const stateCopy = R.clone(state);
    switch (action.type) {
        case THEME_ID__SET:
            return ({...stateCopy, id: action.payload});
        case THEME_TYPE__SET:
            return ({...stateCopy, palette: {...stateCopy.palette, type: action.payload}});
        default:
            return stateCopy;
    }
};

export default theme;