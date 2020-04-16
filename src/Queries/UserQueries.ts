import { gql } from "apollo-boost";

export const CONFIRM_USER = gql`
  mutation($username: String!) {
    confirmUser(username: $username)
  }
`;
export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
      username @client
    }
  }
`;
export const LOG_USER_IN = gql`
  mutation logUserIn($username: String!) {
    logUserIn(username: $username) @client
  }
`;
export const LOG_USER_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export const GET_MY_PROFILE = gql`
  query($username: String!) {
    getMyProfile(username: $username) {
      username
      avatar
    }
  }
`;
