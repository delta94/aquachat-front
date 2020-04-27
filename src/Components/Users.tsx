import React, { useState } from "react";
import styled from "../styles/typed-components";
import Search from "./Search/Search";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Hidden = styled.div`
  visibility: hidden;
  transition: 0.3s ease;
  opacity: 0;
  margin-left: 10px;
  width: 100px;
  min-height: 30px;
  display: flex;
  position: absolute;
  z-index: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3), 0 10px 19px rgba(0, 0, 0, 0.22);
`;
const Main = styled.button`
  outline: none;
  border: none;
  cursor: pointer;

  &:focus,
  &:active {
    .hidden {
      transform: translate(0, 20px);
      opacity: 1;
      visibility: visible;
    }
  }
`;
const Invite = styled.div`
  font-size: 20px;
  font-weight: 700;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
const List = styled.div``;
const Row = styled.div`
  margin-bottom: 10px;
`;
interface IProps {
  userList: any;
  roomId: string;
}
const Users: React.SFC<IProps> = ({ userList, roomId }) => {
  console.log(userList);
  const [open, setOpen] = useState(false);
  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpen(true);
  };
  return (
    <Container>
      <Main>
        Users
        <Hidden className="hidden">
          <Invite onClick={onClick}>+</Invite>
          <List>
            {userList?.map((user: any) => (
              <Row key={user.user.id}>{user.user.username}</Row>
            ))}
          </List>
        </Hidden>
      </Main>
      {open ? <Search roomId={roomId} setOpen={setOpen} /> : null}
    </Container>
  );
};

export default Users;
