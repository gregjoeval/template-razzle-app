// @flow
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import defaultThemeOptions from './default';
import exampleThemeOptions from './example';
import {mergeDeepRight} from 'ramda';

const getThemeOptionsFromName = (themeName) => {
    switch (themeName) {
        case exampleThemeOptions.themeName:
            return mergeDeepRight(defaultThemeOptions, exampleThemeOptions);
        case defaultThemeOptions.themeName:
        default:
            return defaultThemeOptions;
    }
};

const getTheme = (options: Object) => createMuiTheme(options);

export const getThemeFromName = (themeName: string) => getTheme(getThemeOptionsFromName(themeName));

export const getThemeFromIdWithChanges = (themeName: string, options: Object) => getTheme(mergeDeepRight(getThemeOptionsFromName(themeName), options));