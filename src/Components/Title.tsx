import React from "react";
import styled from "../styles/typed-components";

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: red;
  cursor: pointer;
`;
const First = styled.div`
  color: blue;
`;

interface IProps {
  users: any;
  messages: any;
  handleClick?: (roomId: string) => void;
  roomId: string;
}
const Second = styled.div``;
const Title: React.SFC<IProps> = ({ users, messages, handleClick, roomId }) => {
  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (handleClick) handleClick(roomId);
  };
  let id = 0;
  return (
    <Container onClick={onClick}>
      <First>
        {users.map((user: any) => (
          <span key={++id}>{user.user.username}</span>
        ))}
      </First>
      <Second>
        {messages.map((m: any) => (
          <span key={++id}>{m.text}</span>
        ))}
      </Second>
    </Container>
  );
};

export default Title;
