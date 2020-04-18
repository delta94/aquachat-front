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

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $gender: String!) {
    createUser(username: $username, email: $email, gender: $gender) {
      id
      username
    }
  }
`;

export const GET_MY_PROFILE = gql`
  query($username: String!) {
    getMyProfile(username: $username) {
      id
      username
      email
      gender
      avatar
    }
  }
`;
