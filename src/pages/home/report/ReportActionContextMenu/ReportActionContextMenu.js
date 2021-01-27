import React from 'react';
import {Pressable, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../../styles/styles';
import getReportActionContextMenuStyles from '../../../../styles/getReportActionContextMenuStyles';
import getButtonState from '../../../../libs/getButtonState';
import ContextActions from './ContextActions';
import themeColors from '../../../../styles/themes/default';
import Icon from '../../../../components/Icon';
import Tooltip from '../../../../components/Tooltip';

const propTypes = {
    // The ID of the report this report action is attached to.
    // eslint-disable-next-line react/no-unused-prop-types
    reportID: PropTypes.number.isRequired,

    // The ID of the report action this context menu is attached to.
    // eslint-disable-next-line react/no-unused-prop-types
    reportActionID: PropTypes.number.isRequired,

    // If true, this component will be a small, row-oriented menu that displays icons but not text.
    // If false, this component will be a larger, column-oriented menu that displays icons alongside text in each row.
    isMini: PropTypes.bool,

    // Controls the visibility of this component.
    shouldShow: PropTypes.bool,
};

const defaultProps = {
    isMini: false,
    shouldShow: false,
};

const ReportActionContextMenu = (props) => {
    const {wrapperStyle, getButtonStyle} = getReportActionContextMenuStyles(props.isMini);
    return props.shouldShow && (
        <View style={[
            ...wrapperStyle,
            styles.flex1,
        ]}
        >
            {ContextActions.map(contextAction => (
                <Tooltip
                    title={contextAction.text}
                    key={contextAction.text}
                    placement="top"
                    arrow
                >
                    <Pressable style={({hovered, pressed}) => getButtonStyle(getButtonState(hovered, pressed))}>
                        {({pressed}) => (
                            <Icon
                                src={contextAction.icon}
                                fill={pressed ? themeColors.heading : themeColors.icon}
                            />
                        )}
                    </Pressable>
                </Tooltip>
            ))}
        </View>
    );
};

ReportActionContextMenu.propTypes = propTypes;
ReportActionContextMenu.defaultProps = defaultProps;

export default ReportActionContextMenu;
