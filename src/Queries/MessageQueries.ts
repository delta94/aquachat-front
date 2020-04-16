import { gql } from "apollo-boost";

export const SEND_MESSAGE = gql`
  mutation($text: String!, $sender: String!, $roomId: String!) {
    sendMessage(text: $text, sender: $sender, roomId: $roomId)
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
    }
  }
`;
