import React, { useState, useEffect, useRef } from "react";
import styled from "../styles/typed-components";
import Chat from "./Chat";
import Message from "./Message";
import { useQuery, useMutation, useSubscription } from "react-apollo";
import { GET_ROOM, DELETE_ROOM, ADD_ROOM_USER } from "../Queries/RoomQueries";
import { SEND_MESSAGE, NEW_MESSAGE, GET_MESSAGES } from "../Queries/MessageQueries";
import Button from "./Button";
import { GET_MY_PROFILE } from "../Queries/UserQueries";
import Search from "./Search";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 600px;
  height: 620px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 38px rgba(0, 0, 0, 0.22);
  overflow: hidden;
`;
const UserList = styled.div`
  font-weight: 800;
  overflow-x: hidden;
  font-size: 12px;
  padding: 5px;
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-size: 20px;
  background-color: #f4f4f5;
`;

const Wrapper = styled.div`
  display: flex;
  background-color: #f4f4f5;
  width: 100%;
  height: 620px;
  border-radius: 5px;
  flex-direction: column;
`;
const Log = styled.div`
  padding: 10px;
  height: 540px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const Header = styled.div`
  height: 30px;
  width: 600px;
  border-bottom: 1px solid;
  display: flex;
  justify-content: flex-start;
  background-color: #f4f4f5;
`;
const Input = styled.input``;

interface IProps {
  roomId: string;
  user: string;
  roomRefetch: any;
}

const Room: React.SFC<IProps> = ({ roomId, user, roomRefetch }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [msg, setMsg] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const [userList, setUserList] = useState([]);
  const { data, loading, refetch } = useQuery(GET_ROOM, {
    skip: roomId === undefined || roomId === null,
    variables: {
      roomId,
    },
  });
  const { data: msgData, loading: __, refetch: msgRefetch } = useQuery(GET_MESSAGES, {
    skip: roomId === undefined || roomId === null,
    variables: {
      roomId,
    },
  });
  console.log(msgData);
  const [deleteRoomMutation] = useMutation(DELETE_ROOM);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setMsg(value);
  };

  const { data: newData } = useSubscription(NEW_MESSAGE);
  const handleNewMessage = async () => {
    if (newData !== undefined) {
      const { newMessage } = newData;
      await msgRefetch();
      scrollToBottom();
    }
  };
  const handleRoomOut = async () => {
    try {
      const success = await deleteRoomMutation({
        variables: {
          roomId,
        },
      });
      roomRefetch();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [loading]);
  useEffect(() => {
    handleNewMessage();
  }, [newData]);

  useEffect(() => {
    setList([]);
    if (roomId) {
      refetch();
    }
  }, [roomId]);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (msg === "") return;
    const success = await sendMessageMutation({
      variables: {
        text: msg,
        sender: user,
        roomId: roomId,
        isNotif: false,
      },
    });
    handleSubmit();
  };
  const scrollToBottom = () => {
    if (!mainRef.current) return;
    mainRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleSubmit = () => {
    setMsg("");
  };
  let id = 1;

  return (
    <Container>
      <Header>
        {data &&
          data.getRoom.userConnection.map((each: any) => <UserList>{each.user.username}</UserList>)}
        <Search roomId={roomId} />
        <Button onClick={handleRoomOut} text={"Exit"} />
      </Header>
      {loading || !roomId ? (
        <Loading>Welcome to Aqua Chat !</Loading>
      ) : (
        <Wrapper>
          <Log>
            {msgData &&
              msgData.getMessages.map((message: any) => (
                <Chat
                  key={message.id}
                  itsMe={message.user.username === user}
                  text={message.text}
                  currentUser={message.user.username}
                  isNotif={message.isNotif}
                />
              ))}

            <div ref={mainRef} />
          </Log>
          <Message onChange={onChange} onSubmit={onSubmit} text={msg} />
        </Wrapper>
      )}
    </Container>
  );
};

export default Room;
