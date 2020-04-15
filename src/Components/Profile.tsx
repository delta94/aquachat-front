import React from "react";
import styled from "../styles/typed-components";

const Container = styled.div`
  display: flex;
  border-radius: 5px;
  width: 400px;
  height: 290px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 10px 19px rgba(0, 0, 0, 0.22);
  background-color: #f4f4f5;
`;
const Profile = () => {
  return <Container>Profile</Container>;
};

export default Profile;
