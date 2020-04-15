import ApolloClient, { Operation } from "apollo-boost";

const apolloClient = new ApolloClient({
  clientState: {
    defaults: {
      auth: {
        __typename: "Auth",
        isLoggedIn: false,
      },
    },
  },
  resolvers: {
    Mutation: {
      logUserIn: (_, __, { cache }) => {
        cache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: true,
            },
          },
        });
        return null;
      },
      logUserOut: (_, __, { cache }) => {
        cache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: false,
            },
          },
        });
      },
    },
  },
  uri: "http://localhost:4000/graphql",
});

export default apolloClient;
