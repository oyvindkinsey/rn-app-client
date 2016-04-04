/**
 * @flow
 */

 "strict";

import Relay from 'react-relay';
import type GraphQL from 'graphql';

export default class extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`fragment on Viewer { id }`,
  };

  getFatQuery(): GraphQL.Fragment {
    return Relay.QL`fragment on LoginMutationPayload {
      viewer {
        id
        user
      }
    }`;
  }

  getVariables(): Object {
    return {
      username: this.props.username,
      password: this.props.password,
    };
  }

  getConfigs(): Array<Object> {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {viewer: this.props.viewer.id},
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`fragment on LoginMutationPayload {
          access_token
        }`],
      },
    ];
  }

  getMutation(): GraphQL.Mutation {
    return Relay.QL`mutation { login }`;
  }

}
