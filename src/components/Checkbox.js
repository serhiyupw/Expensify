import React from 'react';
import {View, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import Icon from './Icon';
import {Checkmark} from './Icon/Expensicons';

const propTypes = {
    /** Whether checkbox is checked */
    isChecked: PropTypes.bool.isRequired,

    /** A function that is called when the box/label is pressed */
    onPress: PropTypes.func.isRequired,

    /** Should the input be styled for errors  */
    hasError: PropTypes.bool,
};

const defaultProps = {
    hasError: false,
};

const Checkbox = ({
    isChecked,
    onPress,
    hasError,
}) => (
    <Pressable onPress={() => onPress(!isChecked)}>
        <View style={[styles.checkboxContainer, isChecked && styles.checkedContainer, hasError && styles.borderColorDanger]}>
            <Icon src={Checkmark} fill="white" height={14} width={14} />
        </View>
    </Pressable>
);

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;
Checkbox.displayName = 'Checkbox';

export default Checkbox;
