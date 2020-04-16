import React from "react";
import styled from "../styles/typed-components";
import { useQuery } from "react-apollo";
import { GET_ROOMS } from "../Queries/RoomQueries";
import Title from "./Title";

const Container = styled.div`
  display: flex;
  border-radius: 5px;
  width: 400px;
  height: 380px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 10px 19px rgba(0, 0, 0, 0.22);
  background-color: #f4f4f5;
  margin-top: 20px;
  flex-direction: column;
`;
const Loading = styled.div`
  background-color: red;
`;
// 현재 내가 들어가있는 Room List 띄우기

interface IProps {
  roomData: any;
  handleClick?: (roomId: string) => void;
}
const List: React.SFC<IProps> = ({ roomData, handleClick }) => {
  return (
    <Container>
      {roomData?.map((room: any) => (
        <Title
          key={room.id}
          users={room.userConnection}
          messages={room.messages}
          handleClick={handleClick}
          roomId={room.id}
        />
      ))}
    </Container>
  );
};

export default List;
