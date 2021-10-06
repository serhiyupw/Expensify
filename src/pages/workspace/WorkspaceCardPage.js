import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {View, ScrollView} from 'react-native';
import styles from '../../styles/styles';
import Navigation from '../../libs/Navigation/Navigation';
import ROUTES from '../../ROUTES';
import HeaderWithCloseButton from '../../components/HeaderWithCloseButton';
import ScreenWrapper from '../../components/ScreenWrapper';
import withLocalize, {withLocalizePropTypes} from '../../components/withLocalize';
import WorkspaceCardNoVBAView from './WorkspaceCardNoVBAView';

const propTypes = {
    /** The route object passed to this page from the navigator */
    route: PropTypes.shape({
        /** Each parameter passed via the URL */
        params: PropTypes.shape({
            /** The policyID that is being configured */
            policyID: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,

    ...withLocalizePropTypes,
};

const WorkspaceCardPage = ({translate, route}) => (
    <ScreenWrapper>
        <HeaderWithCloseButton
            title={translate('workspace.common.card')}
            shouldShowBackButton
            onBackButtonPress={() => Navigation.navigate(ROUTES.getWorkspaceInitialRoute(_.get(route, ['params', 'policyID'])))}
            onCloseButtonPress={() => Navigation.dismissModal()}
        />
        <ScrollView style={[styles.settingsPageBackground]}>
            <View style={styles.w100}>

                <WorkspaceCardNoVBAView policyID={_.get(route, ['params', 'policyID'])} />

            </View>
        </ScrollView>
    </ScreenWrapper>
);

WorkspaceCardPage.propTypes = propTypes;
WorkspaceCardPage.displayName = 'WorkspaceCardPage';

export default withLocalize(WorkspaceCardPage);
