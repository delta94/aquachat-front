import { gql } from "apollo-boost";

export const GET_ROOMS = gql`
  query($username: String!) {
    getRooms(username: $username) {
      id
      messages {
        text
        isNotif
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
        isNotif
      }
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation {
    createRoom {
      id
    }
  }
`;

export const ADD_ROOM_USER = gql`
  mutation($roomId: ID!, $userId: ID!) {
    addRoomUser(roomId: $roomId, userId: $userId) {
      id
    }
  }
`;

export const DELETE_ROOM = gql`
  mutation($roomId: String!) {
    deleteRoom(roomId: $roomId)
  }
`;
