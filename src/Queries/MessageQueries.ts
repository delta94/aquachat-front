import { gql } from "apollo-boost";

export const SEND_MESSAGE = gql`
  mutation($text: String!, $sender: String!, $roomId: String!, $isNotif: Boolean!) {
    sendMessage(text: $text, sender: $sender, roomId: $roomId, isNotif: $isNotif)
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage($id: String!) {
    newMessage(id: $id) {
      sender
      message {
        id
        text
      }
      date
      isNotif
      roomId
    }
  }
`;

export const GET_MESSAGES = gql`
  query($roomId: String!) {
    getMessages(roomId: $roomId) {
      user {
        username
        avatar
      }
      text
      isNotif
    }
  }
`;
