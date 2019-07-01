import {create} from 'jss';
import {jssPreset, createGenerateClassName} from '@material-ui/styles';

// Configure JSS
export const jss = () => create(jssPreset());

// Create a new class name generator.
export const generateClassName = () => createGenerateClassName();