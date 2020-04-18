import React from "react";
import styled from "../styles/typed-components";

const Container = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  overflow: hidden;
  padding: 10px;
`;
const First = styled.div`
  font-weight: 700;
  font-size: 13px;
  margin-right
`;

const Second = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;
interface IProps {
  users: any;
  messages: any;
  handleClick?: (roomId: string) => void;
  roomId: string;
}
const Title: React.SFC<IProps> = ({ users, messages, handleClick, roomId }) => {
  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (handleClick) handleClick(roomId);
  };
  let id = 0;
  return (
    <Container onClick={onClick}>
      <First>
        {users.map((user: any) => (
          <span key={++id}>{user.user.username} </span>
        ))}
      </First>
      <Second>
        <span key={++id}>{messages[0]?.text}</span>
      </Second>
    </Container>
  );
};

export default Title;
