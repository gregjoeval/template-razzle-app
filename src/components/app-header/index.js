import {Brightness2 as DarkThemeIcon, Brightness6 as LightThemeIcon} from '@material-ui/icons';
import React from 'react';
import {IconButton, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ThemeActions} from '../../actions';
import Header from '../../components/header';
import {THEME} from '../../constants';

const mapStateToProps = state => ({
    id: state.theme.id,
    type: state.theme.palette.type
});

const mapDispatchToProps = dispatch => ({
    themeActions: bindActionCreators(ThemeActions, dispatch)
});

type Props = {
    themeActions: Object,
    id: string,
    type: string
};

const AppHeader = ({themeActions, id, type}: Props) => {
    const {setThemeId, setLightTheme, setDarkTheme} = themeActions;

    const isLightTheme = type === THEME.LIGHT;
    const toggleThemeType = isLightTheme ? setDarkTheme : setLightTheme;

    return (
        <Header
            alignItems={'center'}
            justify={'space-between'}
        >
            <Typography
                color={'textPrimary'}
                variant={'h5'}
            >
                {'Title'}
            </Typography>
            <IconButton
                href={null}
                onClick={toggleThemeType}
            >
                {
                    isLightTheme
                        ? <LightThemeIcon color={'action'}/>
                        : <DarkThemeIcon color={'action'}/>
                }
            </IconButton>
        </Header>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);