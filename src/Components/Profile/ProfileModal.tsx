import React from "react";
import styled from "../../styles/typed-components";
import { useMutation } from "react-apollo";
import { LOG_USER_OUT } from "../../Queries/UserQueries";

const Container = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
  z-index: 1;
  position: absolute;
  right: -80px;
  top: 20px;
  display: flex;
  opacity: 1;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3), 0 10px 19px rgba(0, 0, 0, 0.22);
`;
const List = styled.div`
  height: 50%;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.blueColor};

    color: white;
  }
`;
const ProfileModal = () => {
  const [logOutMutation] = useMutation(LOG_USER_OUT);
  const handleLogOut = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    await logOutMutation();
  };
  const handleEdit = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("에딧에딧ㅋ");
  };
  return (
    <Container>
      <List onClick={handleEdit}>Edit</List>
      <List onClick={handleLogOut}>Logout</List>
    </Container>
  );
};

export default ProfileModal;
