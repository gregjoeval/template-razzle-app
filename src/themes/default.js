import primary from '@material-ui/core/colors/blue';
import secondary from '@material-ui/core/colors/green';
import error from '@material-ui/core/colors/red';
import {THEMES} from "../constants";

const options = {
  themeName: THEMES.DEFAULT,
  typography: {
    useNextVariants: true
  },
  palette: {
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