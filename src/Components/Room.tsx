import React, { useState } from "react";
import styled from "../styles/typed-components";
import Chat from "./Chat";
import Message from "./Message";
import { useQuery } from "react-apollo";
import { GET_ROOM } from "../Queries/RoomQueries";

const Container = styled.div`
  display: flex;
  border-radius: 5px;
  width: 600px;
  height: 600px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 38px rgba(0, 0, 0, 0.22);
`;
const Loading = styled.div`
  background-color: red;
`;
const Wrapper = styled.div`
  display: flex;
  background-color: #f4f4f5;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  flex-direction: column;
  justify-content: flex-end;
`;
const Log = styled.div`
  overflow-y: auto;
`;
interface IProps {
  roomId: string;
}
const Room: React.SFC<IProps> = ({ roomId }) => {
  const [msg, setMsg] = useState<string>("");
  const [list, setList] = useState<string[]>([]);

  //api call
  console.log(roomId);
  const { data, loading } = useQuery(GET_ROOM, {
    skip: roomId === undefined || roomId === null,
    variables: {
      roomId,
    },
  });
  console.log(data);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setMsg(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setList((prev) => [...prev, msg]);
    setMsg("");
  };
  let id = 1;
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Wrapper>
          <Log>
            {data &&
              data.getRoom.messages.map((message: any) => (
                <Chat key={message.id} username={message.user.username} text={message.text} />
              ))}
            {list.map((c) => (
              <Chat key={++id} username={"오옹"} text={c} />
            ))}
          </Log>
          <Message onChange={onChange} onSubmit={onSubmit} text={msg} />
        </Wrapper>
      )}
    </Container>
  );
};

export default Room;
