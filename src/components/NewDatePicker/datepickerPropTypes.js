import PropTypes from 'prop-types';
import moment from 'moment';
import {
    propTypes as fieldPropTypes,
    defaultProps as defaultFieldPropTypes,
} from '../TextInput/baseTextInputPropTypes';
import CONST from '../../CONST';

const propTypes = {
    ...fieldPropTypes,

    /**
     * The datepicker supports any value that `moment` can parse.
     * `onInputChange` would always be called with a Date (or null)
     */
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),

    /**
     * The datepicker supports any defaultValue that `moment` can parse.
     * `onInputChange` would always be called with a Date (or null)
     */
    defaultValue: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),

    /** A minimum date of calendar to select */
    minDate: PropTypes.objectOf(Date),

    /** A maximum date of calendar to select */
    maxDate: PropTypes.objectOf(Date),

    /** Default year to be set in the calendar picker */
    defaultYear: PropTypes.string,
};

const datePickerDefaultProps = {
    ...defaultFieldPropTypes,
    minDate: moment().year(CONST.CALENDAR_PICKER.MIN_YEAR).toDate(),
    maxDate: moment().year(CONST.CALENDAR_PICKER.MAX_YEAR).toDate(),
    value: undefined,
};

export {propTypes, datePickerDefaultProps};
