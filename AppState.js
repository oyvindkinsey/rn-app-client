/**
 * @flow
 */

 "strict";

import Relay, {
  DefaultNetworkLayer   ,
} from 'react-relay';

const GRAPHQL_SERVER = 'http://graph.kinsey.no';

export default {
  setOrUpdateNetworkLayer(token: ?string) {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : null;
    Relay.injectNetworkLayer(
      new DefaultNetworkLayer(GRAPHQL_SERVER, config)
    );
  },
};
