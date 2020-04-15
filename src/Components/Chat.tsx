import React, { SFC } from "react";
import styled from "../styles/typed-components";

const Container = styled.div<TextProps>`
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: ${(props) => (props.itsMe ? "flex-end" : "flex-start")};
`;

const Text = styled.span<TextProps>`
  font-weight: bold;
`;
const Avatar = styled.img<TextProps>`
  margin-right: ${(props) => (props.itsMe ? "20px" : 0)};
  order: ${(props) => (props.itsMe ? 1 : 0)};
  width: 30px;
  height: 30px;
  border-radius: 99%;
`;
interface TextProps {
  itsMe: boolean;
}
interface IProps {
  text: string;
  username: string;
}

const Chat: React.SFC<IProps> = ({ username, text }) => {
  const itsMe = username === "오옹";
  return (
    <Container itsMe={itsMe}>
      <Avatar
        itsMe={itsMe}
        alt=""
        src="https://image.edaily.co.kr/images/Photo/files/NP/S/2019/08/PS19082000442.jpg"
      />
      <Text itsMe={itsMe}>{text}</Text>
    </Container>
  );
};

export default Chat;
