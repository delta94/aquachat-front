import React from "react";
import styled from "styled-components";
import Room from "../Components/Room";
import Profile from "../Components/Profile";

// 대화창이 가운데, 옆에 대기방들, 초대목록

const Container = styled.div`
  width: 70%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Home = () => {
  return (
    <Container>
      <Room />
      <Profile />
    </Container>
  );
};

export default Home;
