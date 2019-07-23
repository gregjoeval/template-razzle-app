import {Brightness2 as DarkThemeIcon, Brightness6 as LightThemeIcon, Palette as PaletteIcon} from '@material-ui/icons';
import React from 'react';
import {IconButton, Typography} from '@material-ui/core';
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
                    href={null}
                    onClick={() => console.log('hello')}
                >
                    <PaletteIcon/>
                </IconButton>
            </ContentLayout>
        </Header>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);