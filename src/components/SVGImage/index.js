import React from 'react';
import {Image} from 'react-native';
import * as Styles from '../../styles/styles';
import propTypes from './propTypes';

const SVGImage = props => (
    <Image
        style={Styles.getWidthAndHeightStyle(props.width, props.height)}
        source={props.src}
    />
);

SVGImage.propTypes = propTypes;
SVGImage.displayName = 'SVGImage';

export default SVGImage;
