import {create} from 'jss';
import {jssPreset, createGenerateClassName} from '@material-ui/core';

// Configure JSS
export const jss = create(jssPreset());

export const generateClassName = createGenerateClassName();