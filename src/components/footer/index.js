// @flow
import React, {Component} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import ContentLayout from '../content-layout';
import SectionLayout from '../section-layout';

type Props = {
    alignContent?: string,
    alignItems?: string,
    children: Array<Node> | Node,
    direction?: string,
    justify?: string,
    spacing?: number,
    wrap?: string,
    xs?: string,
    sm?: string,
    md?: string,
    lg?: string,
    xl?: string
};

const Footer = (
    {
        alignContent,
        alignItems,
        children,
        direction = 'row',
        justify = 'space-around',
        spacing = 8,
        wrap = 'wrap',
        xs = 12,
        sm = 12,
        md = 9,
        lg = 7,
        xl = 5
    }: Props
): Component => (
    <Toolbar>
        <SectionLayout
            disableGutter={true}
            lg={lg}
            md={md}
            sm={sm}
            xl={xl}
            xs={xs}
        >
            <ContentLayout
                alignContent={alignContent}
                alignItems={alignItems}
                direction={direction}
                justify={justify}
                spacing={spacing}
                wrap={wrap}
            >
                {children}
            </ContentLayout>
        </SectionLayout>
    </Toolbar>
);

export default Footer;