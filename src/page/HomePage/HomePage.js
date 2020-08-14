import React from 'react';
import {
    StatusBar,
    View,
    Dimensions,
} from 'react-native';
import {SafeAreaInsetsContext, SafeAreaProvider} from 'react-native-safe-area-context';
import {Route} from '../../lib/Router';
import styles, {getSafeAreaPadding} from '../../style/StyleSheet';
import Header from './HeaderView';
import Sidebar from './SidebarView';
import Main from './MainView';
import Ion from '../../lib/Ion';
import IONKEYS from '../../IONKEYS';
import {initPusher} from '../../lib/actions/ActionsReport';
import * as pusher from '../../lib/Pusher/pusher';

const windowSize = Dimensions.get('window');
const widthBreakPoint = 1000;

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hamburgerShown: windowSize.width > widthBreakPoint,
            isSmallScreen: windowSize.width <= widthBreakPoint
        };

        this.toggleHamburger = this.toggleHamburger.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        Ion.get(IONKEYS.SESSION, 'authToken').then((authToken) => {
            if (authToken) {
                // Initialize the pusher connection
                pusher.init(null, {
                    authToken,
                });

                // Setup the report action handler to subscribe to pusher
                initPusher();
            }
        });
        Dimensions.addEventListener('change', this.onChange);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.onChange);
    }

    /**
     * Fired when the windows dimensions changes
     * @param {object} changedWindow
     */
    onChange({window: changedWindow}) {
        this.setState({isSmallScreen: changedWindow.width <= widthBreakPoint});
        if (!this.state.hamburgerShown && changedWindow.width > widthBreakPoint) {
            this.setState({hamburgerShown: true});
        } else if (this.state.hamburgerShown && changedWindow.width < widthBreakPoint) {
            this.setState({hamburgerShown: false});
        }
    }

    /**
     * Method called when we want to toggle the hamburger menu opened and closed
     * Only changes hamburger state on small screens (e.g. Mobile and mWeb)
     */
    toggleHamburger() {
        if (!this.state.isSmallScreen) {
            return;
        }

        const currentValue = this.state.hamburgerShown;
        this.setState({hamburgerShown: !currentValue});
    }

    render() {
        const hamburgerStyle = this.state.isSmallScreen && this.state.hamburgerShown ? {
            position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 2, width: 300
        } : {width: 300};
        const visibility = this.state.hamburgerShown ? {display: 'flex'} : {display: 'none'};
        const appContentStyle = !this.state.isSmallScreen ? styles.appContentRounded : null;
        return (
            <SafeAreaProvider>
                <StatusBar barStyle="dark-content" />
                <SafeAreaInsetsContext.Consumer style={[styles.flex1, styles.h100p]}>
                    {insets => (
                        <View style={[styles.appContent, styles.flexRow, styles.h100p, getSafeAreaPadding(insets)]}>
                            <Route path="/:reportID?">
                                <View style={[hamburgerStyle, visibility]}>
                                    <Sidebar insets={insets} toggleHamburger={this.toggleHamburger} />
                                </View>
                                <View style={[styles.appContent, appContentStyle, styles.flex1, styles.flexColumn]}>
                                    <Header
                                        shouldShowHamburgerButton={!this.state.hamburgerShown}
                                        toggleHamburger={this.toggleHamburger}
                                    />
                                    <Main />
                                </View>
                            </Route>
                        </View>
                    )}
                </SafeAreaInsetsContext.Consumer>
            </SafeAreaProvider>
        );
    }
}
App.displayName = 'App';
