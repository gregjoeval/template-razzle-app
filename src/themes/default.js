import primary from '@material-ui/core/colors/blue';
import secondary from '@material-ui/core/colors/green';
import error from '@material-ui/core/colors/red';
import {THEME} from '../constants';

const options = {
    themeName: THEME.DEFAULT_ID,
    typography: {
        useNextVariants: true
    },
    palette: {
        type: THEME.LIGHT,
        primary: {
            main: primary['500']
        },
        secondary: {
            main: secondary.A700
        },
        error: {
            main: error['500']
        }
    }
};

export default options;