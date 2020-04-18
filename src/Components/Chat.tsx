import React, { SFC } from "react";
import styled from "../styles/typed-components";
import { isNetworkRequestInFlight } from "apollo-client/core/networkStatus";

const Container = styled.div<TextProps>`
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.itsMe ? "flex-end" : "flex-start")};
`;

const TextContainer = styled.div<TextProps>`
  background-color: ${(props) => (props.itsMe ? props.theme.blueColor : "white")};
  border: ${(props) => (props.itsMe ? null : "1px solid rgba(0,0,0,0.2)")};
  padding: 10px;
  border-radius: 5px;
`;
const InfoColumn = styled.div<TextProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  order: ${(props) => (props.itsMe ? 1 : 0)};
`;
const User = styled.div`
  font-size: 11px;
  font-weight: bold;
`;
const Text = styled.span<TextProps>`
  color: ${(props) => (props.itsMe ? "white" : null)};
  font-size: 14px;
`;
const Avatar = styled.img<TextProps>`
  margin-right: ${(props) => (props.itsMe ? 0 : "10px")};
  margin-left: ${(props) => (props.itsMe ? "10px" : 0)};
  order: ${(props) => (props.itsMe ? 1 : 0)};
  width: 30px;
  height: 30px;
  border-radius: 99%;
`;

const Notification = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.blueColor};
`;
interface TextProps {
  itsMe: boolean;
}
interface IProps {
  text: string;
  itsMe: boolean;
  currentUser: string;
  isNotif: boolean;
}

const Chat: React.SFC<IProps> = ({ itsMe, text, currentUser, isNotif }) => {
  console.log(isNotif);
  return (
    <Container itsMe={itsMe}>
      {isNotif ? (
        <Notification>
          {currentUser} {text}
        </Notification>
      ) : (
        <>
          <InfoColumn itsMe={itsMe}>
            <User>{currentUser}</User>
            <Avatar
              itsMe={itsMe}
              alt=""
              src="https://image.edaily.co.kr/images/Photo/files/NP/S/2019/08/PS19082000442.jpg"
            />
          </InfoColumn>
          <TextContainer itsMe={itsMe}>
            <Text itsMe={itsMe}>{text}</Text>
          </TextContainer>
        </>
      )}
    </Container>
  );
};

export default Chat;
