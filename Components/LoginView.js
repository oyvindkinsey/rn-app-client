/**
 * @flow
 */

 "strict";

import React, {
  AsyncStorage,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import Relay from 'react-relay';

import LoginMutation from '../Mutations/LoginMutation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    height: 40,
    margin: 10,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
  }
});

class LoginView extends Component {

  _doLogin: () => void;

  state: {
    username: string,
    password: string,
  };

  constructor(props: Object) {
    super(props);
    this._doLogin = this._doLogin.bind(this);

    this.state = {
      username: '',
      password: '',
    };
  }

  _doLogin() {
    Relay.Store.commitUpdate(
      new LoginMutation({
        viewer: this.props.viewer,
        username: this.state.username,
        password: this.state.password,
      }),
      {
        onSuccess: async (response) => {
          const accessToken = response.login.access_token;
          await AsyncStorage.setItem('access_token', accessToken);
          this.props.navigator.pop();
        },
        onFailure: transaction => {console.log('failure', transaction)},
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={"Username"}
          onChangeText={text => this.setState({username: text})}
          autoCapitalize={"none"}
          autoCorrect={false}
          autoFocus={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder={"Password"}
          onChangeText={text => this.setState({password: text})}
          autoCorrect={false}
          secureTextEntry={true}
        />
        <TouchableHighlight onPress={this._doLogin} >
          <Text> Login </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Relay.createContainer(LoginView, {

  fragments: {

  },

});
