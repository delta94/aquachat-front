import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Room from "../Components/Room";
import Profile from "../Components/Profile/Profile";
import List from "../Components/List";
import { useQuery } from "react-apollo";
import { GET_ROOMS } from "../Queries/RoomQueries";
import { IS_LOGGED_IN } from "../Queries/UserQueries";
import Skeleton from "../Components/Skeleton";

// 대화창이 가운데, 옆에 대기방들, 초대목록

const Container = styled.div`
  width: 70%;
  height: 100vh;
  margin: 0 auto;
  padding: 50px 0px 50px;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 5px;
`;
const Right = styled.div`
  height: 100%;
  width: 400px;
  align-self: center;
`;
const Left = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  place-self: center center;
`;
const Home = () => {
  const [currentUser, setCurrentUser] = useState("");
  const { data: profileData } = useQuery(IS_LOGGED_IN);
  const { data: roomData, loading: roomLoading, refetch: roomRefetch } = useQuery(GET_ROOMS, {
    skip: !currentUser,
    variables: {
      username: currentUser,
    },
  });
  const [renderRoomId, setRenderRoomId] = useState<string>("");
  const handleClick = (roomId: string) => {
    setRenderRoomId(roomId);
  };
  useEffect(() => {
    setCurrentUser(profileData?.auth.username);
  }, [profileData]);

  useEffect(() => {
    setRenderRoomId(roomData?.getRooms[0]?.id);
  }, [roomData]);
  console.log(currentUser);
  console.log(roomData);
  return (
    <Container>
      <Left>
        <Room
          loading={roomLoading}
          user={currentUser}
          roomId={renderRoomId}
          roomRefetch={roomRefetch}
        />
      </Left>
      <Right>
        <Profile user={currentUser} />
        <List
          currentRoom={renderRoomId}
          roomData={roomData?.getRooms}
          user={currentUser}
          handleClick={handleClick}
          refetch={roomRefetch}
        />
      </Right>
    </Container>
  );
};

export default Home;
