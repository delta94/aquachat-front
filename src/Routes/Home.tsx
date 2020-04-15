import React, { useState } from "react";
import styled from "styled-components";
import Room from "../Components/Room";
import Profile from "../Components/Profile";
import List from "../Components/List";
import { useQuery } from "react-apollo";
import { GET_ROOMS } from "../Queries/RoomQueries";

// 대화창이 가운데, 옆에 대기방들, 초대목록

const Container = styled.div`
  width: 70%;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 5px;
`;
const Right = styled.div`
  height: 600px;
  width: 400px;
  align-self: center;
`;
const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  place-self: center center;
`;
const Home = () => {
  const { data: roomData, loading: roomLoading } = useQuery(GET_ROOMS);
  const [renderRoomId, setRenderRoomId] = useState<string>("");
  const handleClick = (roomId: string) => {
    setRenderRoomId(roomId);
  };
  return (
    <Container>
      {roomLoading ? (
        <Loading />
      ) : (
        <>
          <Left>
            <Room roomId={renderRoomId} />
          </Left>
          <Right>
            <Profile />
            <List roomData={roomData.getRooms} handleClick={handleClick} />
          </Right>
        </>
      )}
    </Container>
  );
};

export default Home;
