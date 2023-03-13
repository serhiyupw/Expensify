import React, {forwardRef} from 'react';
import BasePicker from './Picker';
import {defaultProps, propTypes} from './pickerPropTypes';

const additionalPickerEvents = (onMouseDown, onChange) => ({
    onMouseDown,
    onChange: (e) => {
        if (e.target.selectedIndex === undefined) {
            return;
        }
        const index = e.target.selectedIndex;
        const value = e.target.options[index].value;
        onChange(value, index);
    },
});

const Picker = forwardRef((props, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BasePicker {...props} additionalPickerEvents={additionalPickerEvents} innerRef={ref} />
));

Picker.propTypes = propTypes;
Picker.defaultProps = defaultProps;

export default Picker;
