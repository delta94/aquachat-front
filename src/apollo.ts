import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, concat, Operation, split } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});
const wsLink = new WebSocketLink({
  options: { reconnect: true },
  uri: "ws://localhost:4000/subscriptions",
});

const combinedLinks = split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      console.error(`Unexpected error: ${message}`);
    });
  }
  if (networkError) {
    console.error(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  defaults: {
    auth: {
      __typename: "Auth",
      isLoggedIn: Boolean(localStorage.getItem("currentUser")),
      username: localStorage.getItem("currentUser"),
    },
  },
  resolvers: {
    Mutation: {
      logUserIn: (_: any, { username }: any, { cache: appCache }: any) => {
        localStorage.setItem("currentUser", username);
        cache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: true,
              username: username,
            },
          },
        });
        return null;
      },
      logUserOut: (_: any, __: any, { cache: appCache }: any) => {
        localStorage.removeItem("currentUser");
        cache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: false,
              username: null,
            },
          },
        });
      },
    },
  },
});

const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, localStateLink, combinedLinks]),
});
export default apolloClient;
