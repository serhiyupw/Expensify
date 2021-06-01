import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {propTypes, defaultProps} from '../anchorForCommentsOnlyPropTypes';

/*
 * This is a default anchor component for regular links.
 */
const BaseAnchorForCommentsOnly = ({
    href,
    rel,
    target,
    children,
    style,
    ...props
}) => (
    <Text
        style={StyleSheet.flatten(style)}
        accessibilityRole="link"
        href={href}
        rel={rel}
        target={target}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
    >
        {children}
    </Text>
);

BaseAnchorForCommentsOnly.propTypes = propTypes;
BaseAnchorForCommentsOnly.defaultProps = defaultProps;
BaseAnchorForCommentsOnly.displayName = 'BaseAnchorForCommentsOnly';

export default BaseAnchorForCommentsOnly;
