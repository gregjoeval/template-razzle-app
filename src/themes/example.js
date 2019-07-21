import {THEME} from '../constants';
import primary from '@material-ui/core/colors/purple';
import secondary from '@material-ui/core/colors/green';
import error from '@material-ui/core/colors/orange';

const options = {
    themeName: THEME.EXAMPLE_ID,
    palette: {
        type: THEME.DARK,
        primary: {
            main: primary['500']
        },
        secondary: {
            main: secondary['500']
        },
        error: {
            main: error['500']
        }
    }
};

export default options;