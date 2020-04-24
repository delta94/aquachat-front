import { gql } from "apollo-boost";

export const SEND_MESSAGE = gql`
  mutation($text: String!, $sender: String!, $roomId: String!, $isNotif: Boolean!) {
    sendMessage(text: $text, sender: $sender, roomId: $roomId, isNotif: $isNotif)
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      sender
      message {
        id
        text
      }
      date
      isNotif
    }
  }
`;

export const GET_MESSAGES = gql`
  query($roomId: String!) {
    getMessages(roomId: $roomId) {
      user {
        username
      }
      text
    }
  }
`;
