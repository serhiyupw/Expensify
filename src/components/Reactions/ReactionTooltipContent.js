import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'underscore';
import styles from '../../styles/styles';
import {withPersonalDetails} from '../OnyxProvider';
import getPersonalDetailsByIDs from '../../libs/getPersonalDetailsByIDs';
import Text from '../Text';

const propTypes = {
    emojiCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
    accountIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
    emojiName: PropTypes.string.isRequired,
};

const ReactionTooltipContent = (props) => {
    const users = getPersonalDetailsByIDs(props.accountIDs);
    const names = _.map(users, user => user.displayName);
    const namesString = _.filter(names, n => n).join(', ');

    return (
        <View style={[styles.alignItemsCenter, styles.ph2]}>
            {_.map(props.emojiCodes, emojiCode => (
                <Text
                    key={emojiCode}
                    style={styles.reactionEmojiTitle}
                >
                    {emojiCode}
                </Text>
            ))}

            <Text style={[
                styles.mt1,
                styles.textMicroBold,
                styles.textReactionSenders,
            ]}
            >
                {namesString}
            </Text>

            <Text style={[
                styles.textMicro,
                styles.fontColorReactionLabel,
            ]}
            >
                {`reacted with :${props.emojiName}:`}
            </Text>
        </View>
    );
};

ReactionTooltipContent.propTypes = propTypes;
ReactionTooltipContent.displayName = 'ReactionTooltipContent';
export default React.memo(withPersonalDetails()(ReactionTooltipContent));
