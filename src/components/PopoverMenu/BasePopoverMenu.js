import _ from 'underscore';
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import styles from '../../styles/styles';
import withWindowDimensions, {windowDimensionsPropTypes} from '../withWindowDimensions';
import MenuItem from '../MenuItem';
import {
    propTypes as createMenuPropTypes,
    defaultProps as defaultCreateMenuPropTypes,
} from './popoverMenuPropTypes';
import ArrowKeyFocusManager from '../ArrowKeyFocusManager';
import Text from '../Text';
import KeyboardShortcut from '../../libs/KeyboardShortcut';
import CONST from '../../CONST';

const propTypes = {
    /** Callback fired when the menu is completely closed */
    onMenuHide: PropTypes.func,

    ...createMenuPropTypes,
    ...windowDimensionsPropTypes,
};

const defaultProps = {
    ...defaultCreateMenuPropTypes,
    onMenuHide: () => {},
};

class BasePopoverMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            focusedIndex: -1,
        };
        this.updateFocusedIndex = this.updateFocusedIndex.bind(this);
        this.removeKeyboardShorcuts = this.removeKeyboardShorcuts.bind(this);
        this.onModalHide = this.onModalHide.bind(this);
    }

    componentDidMount() {
        if (!this.props.enableArrowKeysActions && !this.props.isVisible) {
            return;
        }

        const shortcutConfig = CONST.KEYBOARD_SHORTCUTS.ENTER;
        this.unsubscribeEnterKey = KeyboardShortcut.subscribe(shortcutConfig.shortcutKey, () => {
            if (this.state.focusedIndex === -1) {
                return;
            }
            this.props.onItemSelected(this.props.menuItems[this.state.focusedIndex]);
            this.updateFocusedIndex(-1);
        }, shortcutConfig.descriptionKey, shortcutConfig.modifiers, true);
    }

    componentWillUnmount() {
        this.removeKeyboardShorcuts();
    }

    onModalHide() {
        this.removeKeyboardShorcuts();
        this.updateFocusedIndex(-1);
        this.props.onMenuHide();
    }

    removeKeyboardShorcuts() {
        if (!this.unsubscribeEnterKey) {
            return;
        }
        this.unsubscribeEnterKey();
    }

    /**
     * @param {Number} index
     */
    updateFocusedIndex(index) {
        if (!this.props.enableArrowKeysActions) {
            return;
        }
        this.setState({focusedIndex: index});
    }

    render() {
        return (
            <Popover
                anchorPosition={this.props.anchorPosition}
                onClose={this.props.onClose}
                isVisible={this.props.isVisible}
                onModalHide={this.onModalHide}
                animationIn={this.props.animationIn}
                animationOut={this.props.animationOut}
                disableAnimation={this.props.disableAnimation}
                fromSidebarMediumScreen={this.props.fromSidebarMediumScreen}
            >
                <View style={this.props.isSmallScreenWidth ? {} : styles.createMenuContainer}>
                    {!_.isEmpty(this.props.headerText) && (
                        <View style={styles.createMenuItem}>
                            <Text
                                style={[styles.createMenuHeaderText, styles.ml3]}
                            >
                                {this.props.headerText}
                            </Text>
                        </View>
                    )}
                    <ArrowKeyFocusManager
                        focusedIndex={this.state.focusedIndex}
                        maxIndex={this.props.menuItems.length - 1}
                        onFocusedIndexChanged={this.updateFocusedIndex}
                    >
                        {_.map(this.props.menuItems, (item, menuIndex) => (
                            <MenuItem
                                key={item.text}
                                icon={item.icon}
                                iconWidth={item.iconWidth}
                                iconHeight={item.iconHeight}
                                title={item.text}
                                description={item.description}
                                onPress={() => this.props.onItemSelected(item)}
                                focused={this.state.focusedIndex === menuIndex}
                            />
                        ))}
                    </ArrowKeyFocusManager>
                </View>
            </Popover>
        );
    }
}

BasePopoverMenu.propTypes = propTypes;
BasePopoverMenu.defaultProps = defaultProps;
export default withWindowDimensions(BasePopoverMenu);
