/**
 * @flow
 */

 "strict";
import Relay from 'react-relay';

export default class extends Relay.Route {
  static paramDefinitions = {
    viewer: {
      required: true,
    }  
  };
  static routeName = 'LoginViewRoute';
}
