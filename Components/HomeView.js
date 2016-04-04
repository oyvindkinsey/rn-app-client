import React, {
  AsyncStorage,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import Relay from 'react-relay';

import LoginViewRoute from '../Routes/LoginViewRoute';
import LoginMutation from '../Mutations/LoginMutation';
import AppState from '../AppState';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


class HomeView extends Component {
  componentDidMount() {
    if (!this.props.viewer.user) {
      this.props.navigator.push(new LoginViewRoute({
        viewer: this.props.viewer,
      }));
    }
  }
  render() {
    const user = this.props.viewer.user;
    const displayName = user ? user.name : null;
    return (
      <View style={styles.container}>
        <View>
          <Text>{displayName}</Text>
        </View>
        <TouchableHighlight
          onPress={() => (async () => {
            await AsyncStorage.setItem('access_token', '');
            AppState.setOrUpdateNetworkLayer(null);
          })().done()}>
            <Text>Log out</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

export default Relay.createContainer(HomeView, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${LoginMutation.getFragment('viewer')}
        id
        user {
          id
          name
        }
      }
    `,
  },
});
