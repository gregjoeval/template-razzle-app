import {Brightness2 as DarkThemeIcon, Brightness6 as LightThemeIcon, Palette as PaletteIcon} from '@material-ui/icons';
import React, {useState} from 'react';
import {IconButton, Typography, Menu, MenuItem} from '@material-ui/core';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ThemeActions} from '../../actions';
import Header from '../../components/header';
import {THEME} from '../../constants';
import ContentLayout from '../content-layout';

const mapStateToProps = state => ({
    id: state.theme.id,
    type: state.theme.palette.type
});

const mapDispatchToProps = dispatch => ({
    themeActions: bindActionCreators(ThemeActions, dispatch)
});

type Props = {
    themeActions: {setThemeId: any => void, setLightTheme: any => void, setDarkTheme: any => void},
    id: string,
    type: string
};

const AppHeader = ({themeActions, id, type}: Props) => {
    const {setThemeId, setLightTheme, setDarkTheme} = themeActions;

    const isLightTheme = type === THEME.LIGHT;
    const toggleThemeType = isLightTheme ? setDarkTheme : setLightTheme;

    const [themeMenuAnchorEl, setThemeMenuAnchorEl] = useState(null);

    const themeMenuId = 'theme-menu-id';
    const openThemeMenu = (e) => setThemeMenuAnchorEl(e.currentTarget);
    const closeThemeMenu = () => setThemeMenuAnchorEl(null);
    const handleThemeMenuClick = (themeId) => () => {
        if (id !== themeId) {
            setThemeId(themeId);
        }

        closeThemeMenu();
    };

    const ThemeMenu = () => (
        <Menu
            anchorEl={themeMenuAnchorEl}
            id={themeMenuId}
            keepMounted={true}
            onClose={closeThemeMenu}
            open={Boolean(themeMenuAnchorEl)}
        >
            <MenuItem
                button={true}
                component={'li'}
                onClick={handleThemeMenuClick(THEME.DEFAULT_ID)}
            >
                {THEME.DEFAULT_ID}
            </MenuItem>
            <MenuItem
                button={true}
                component={'li'}
                onClick={handleThemeMenuClick(THEME.EXAMPLE_ID)}
            >
                {THEME.EXAMPLE_ID}
            </MenuItem>
        </Menu>
    );

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
            <ContentLayout
                direction={'row'}
            >
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
                <IconButton
                    aria-controls={themeMenuId}
                    aria-haspopup={'true'}
                    href={null}
                    onClick={openThemeMenu}
                >
                    <PaletteIcon/>
                </IconButton>
                <ThemeMenu/>
            </ContentLayout>
        </Header>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);