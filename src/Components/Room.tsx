import React, { useState } from "react";
import styled from "../styles/typed-components";
import Chat from "./Chat";
import Message from "./Message";

const Container = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.blueColor};
  border-radius: 5px;
  width: 600px;
  height: 600px;
`;
const Wrapper = styled.div`
  display: flex;
  background-color: white;
  width: 99.5%;
  height: 99.5%;
  border-radius: 5px;
  margin: auto auto;
  flex-direction: column;
  justify-content: flex-end;
`;

const Room = () => {
  const [msg, setMsg] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
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
      <Wrapper>
        {list.map((c) => (
          <Chat key={++id} itsMe={true} text={c} />
        ))}

        <Message onChange={onChange} onSubmit={onSubmit} text={msg} />
      </Wrapper>
    </Container>
  );
};

export default Room;
