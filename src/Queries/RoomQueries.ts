import { gql } from "apollo-boost";

export const GET_ROOMS = gql`
  {
    getRooms {
      id
      messages {
        text
      }
      userConnection {
        user {
          username
        }
      }
    }
  }
`;

export const GET_ROOM = gql`
  query($roomId: String!) {
    getRoom(roomId: $roomId) {
      messages {
        id
        user {
          username
        }
        text
      }
    }
  }
`;
