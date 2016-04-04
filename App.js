/**
 * @flow
 */

 "strict";

import React, {
  View,
  Text,
  AsyncStorage,
  Component,
  Navigator,
} from 'react-native';

import Relay from 'react-relay';

//import LoginView from './Components/LoginView';
import HomeView from './Components/HomeView';
import LoginView from './Components/LoginView';

import HomeViewRoute from './Routes/HomeViewRoute';
import LoginViewRoute from './Routes/LoginViewRoute';
import AppState from './AppState';

export default class extends Component {
  state: {
    configured: boolean,
  };

  _renderScene: (route: Relay.Route, navigator: Navigator) => void;

  constructor(props: Object) {
    super(props);
    this._renderScene = this._renderScene.bind(this);
    this.state = {
      configured: false,
    };
  }

  componentWillMount() {
    (async () => {
      const accessToken = await AsyncStorage.getItem('access_token');
      AppState.setOrUpdateNetworkLayer(accessToken);
      this.setState({
        configured: true,
      });
    })().done()
  }

  _mapRouteToComponent(route: Relay.Route): ReactElement {
    if (route instanceof HomeViewRoute) {
      return HomeView;
    }
    if (route instanceof LoginViewRoute) {
      return LoginView;
    }
    throw new Error('Unknown route');
  }

  _renderScene(route: Relay.Route, navigator: Navigator): ReactElement {
    const props = { route, navigator };

    const Component = this._mapRouteToComponent(route);
    return (
      <Relay.RootContainer
        Component={Component}
        route={route}
        renderFetched={data => <Component {...props} {...data} />}
      />
    );
  }

  render() {
    if (!this.state.configured) {
      return <View><Text>Loading</Text></View>;
    }
    return (
      <Navigator
        initialRoute={new HomeViewRoute()}
        renderScene={this._renderScene}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
}
