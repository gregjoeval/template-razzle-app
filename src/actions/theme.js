import {THEME_ID__SET, THEME_TYPE__SET} from '../constants/action-types';
import {THEME} from '../constants';

export const setThemeId = (id) => ({
    type: THEME_ID__SET,
    payload: id
});

export const setLightTheme = () => ({
    type: THEME_TYPE__SET,
    payload: THEME.LIGHT
});

export const setDarkTheme = () => ({
    type: THEME_TYPE__SET,
    payload: THEME.DARK
});