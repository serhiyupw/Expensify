import {View} from 'react-native';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import DateUtils from '../libs/DateUtils';
import withLocalize, {withLocalizePropTypes} from './withLocalize';
import Timers from '../libs/Timers';
import Text from './Text';

const propTypes = {
    timezone: PropTypes.shape({
        /** Value of selected timezone */
        selected: PropTypes.string,

        /** Whether timezone is automatically set */
        automatic: PropTypes.bool,
    }).isRequired,
    ...withLocalizePropTypes,
};

class AutoUpdateTime extends PureComponent {
    constructor(props) {
        super(props);
        this.getCurrentUserLocalTime = this.getCurrentUserLocalTime.bind(this);
        this.updateCurrentTime = this.updateCurrentTime.bind(this);
        this.state = {
            timezone: this.getCurrentUserLocalTime(),
        };
    }

    componentDidMount() {
        this.updateCurrentTime();
    }

    componentDidUpdate() {
        this.updateCurrentTime();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    getCurrentUserLocalTime() {
        return DateUtils.getLocalMomentFromDatetime(
            this.props.preferredLocale,
            null,
            this.props.timezone.selected,
        );
    }

    updateCurrentTime() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        const secondsUntilNextMinute = (60 - this.state.timezone.seconds()) * 1000;
        this.timer = Timers.register(
            setInterval(() => {
                this.setState({
                    timezone: this.getCurrentUserLocalTime(),
                });
            }, secondsUntilNextMinute),
        );
    }

    render() {
        let currentTime;

        // With non-GMT timezone, moment.zoneAbbr() will return the name of that timezone, so we can use it directly.
        if (Number.isNaN(Number(this.state.timezone.zoneAbbr()))) {
            currentTime = this.state.timezone.zoneAbbr();
        } else {
        // With GMT timezone, moment.zoneAbbr() will return a number, so we need to display it as GMT {abbreviations} format
        // ie: GMT +07
            currentTime = `${this.state.timezone
                .toString()
                .split(/[+-]/)[0]
                .slice(-3)} ${this.state.timezone.zoneAbbr()}`;
        }

        return (
            <View style={[styles.mb6, styles.detailsPageSectionContainer]}>
                <Text style={[styles.formLabel, styles.mb2]} numberOfLines={1}>
                    {this.props.translate('detailsPage.localTime')}
                </Text>
                <Text numberOfLines={1}>
                    {this.state.timezone.format('LT')}
                    {' '}
                    {currentTime}
                </Text>
            </View>
        );
    }
}

AutoUpdateTime.propTypes = propTypes;
export default withLocalize(AutoUpdateTime);
