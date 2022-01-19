import PropTypes from 'prop-types';

const propTypes = {
    /** Input label */
    label: PropTypes.string,

    /** Name attribute for the input */
    name: PropTypes.string,

    /** Input value */
    value: PropTypes.string,

    /** Default value - used for non controlled inputs */
    defaultValue: PropTypes.string,

    /** Input value placeholder */
    placeholder: PropTypes.string,

    /** Error text to display */
    errorText: PropTypes.string,

    /** Should the input be styled for errors  */
    hasError: PropTypes.bool,

    /** Customize the TextInput container */
    textInputContainerStyles: PropTypes.arrayOf(PropTypes.object),

    /** Customize the main container */
    containerStyles: PropTypes.arrayOf(PropTypes.object),

    /** input style */
    inputStyle: PropTypes.arrayOf(PropTypes.object),

    /** If present, this prop forces the label to remain in a position where it will not collide with input text */
    forceActiveLabel: PropTypes.bool,

    /** Should the input auto focus? */
    autoFocus: PropTypes.bool,

    /** Disable the virtual keyboard from  */
    disableKeyboard: PropTypes.bool,

    /** Forward the inner ref */
    innerRef: PropTypes.func,
};

const defaultProps = {
    label: '',
    name: '',
    errorText: '',
    placeholder: '',
    hasError: false,
    containerStyles: [],
    textInputContainerStyles: [],
    inputStyle: [],
    autoFocus: false,

    /**
     * To be able to function as either controlled or uncontrolled component we should not
     * assign a default prop value for `value` or `defaultValue` props
     */
    value: undefined,
    defaultValue: undefined,
    forceActiveLabel: false,
    disableKeyboard: false,
    innerRef: () => {},
};

export {propTypes, defaultProps};
