import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Room from "../Components/Room";
import Profile from "../Components/Profile";
import List from "../Components/List";
import { useQuery } from "react-apollo";
import { GET_ROOMS } from "../Queries/RoomQueries";
import { IS_LOGGED_IN } from "../Queries/UserQueries";

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
  const [currentUser, setCurrentUser] = useState("");
  const { data: profileData } = useQuery(IS_LOGGED_IN);
  const { data: roomData, loading: roomLoading } = useQuery(GET_ROOMS, {
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
  console.log(roomData);
  return (
    <Container>
      {roomLoading ? (
        <Loading />
      ) : (
        <>
          <Left>
            <Room user={currentUser} roomId={renderRoomId} />
          </Left>
          <Right>
            <Profile user={currentUser} />
            <List roomData={roomData?.getRooms} handleClick={handleClick} />
          </Right>
        </>
      )}
    </Container>
  );
};

export default Home;
