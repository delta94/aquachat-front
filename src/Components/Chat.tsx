import React, { SFC } from "react";
import styled from "../styles/typed-components";

const Container = styled.div<TextProps>`
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: ${(props) => (props.itsMe ? "flex-end" : "flex-start")};
`;

const Text = styled.span`
  font-weight: bold;
`;
const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 99%;
  order: 2;
`;
interface TextProps {
  itsMe: boolean;
}
interface IProps {
  text: string;
  itsMe: boolean;
}

const Chat: React.SFC<IProps> = ({ itsMe, text }) => {
  return (
    <Container itsMe={itsMe}>
      <Avatar
        alt=""
        src="https://image.edaily.co.kr/images/Photo/files/NP/S/2019/08/PS19082000442.jpg"
      />
      <Text>{text}</Text>
    </Container>
  );
};

export default Chat;
