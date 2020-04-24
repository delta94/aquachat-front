import React, { useState, useImperativeHandle } from "react";
import styled from "../styles/typed-components";
import Button from "./Button";
import { useMutation, useQuery } from "react-apollo";
import { ADD_ROOM_USER } from "../Queries/RoomQueries";
import { GET_MY_PROFILE } from "../Queries/UserQueries";
import { toast } from "react-toastify";
import { SEND_MESSAGE } from "../Queries/MessageQueries";

const Container = styled.div`
  display: flex;
`;
const Input = styled.input``;

interface IProps {
  roomId: string;
}
const Search: React.SFC<IProps> = ({ roomId }) => {
  const [user, setUser] = useState("");
  const [addRoomUserMutation] = useMutation(ADD_ROOM_USER);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const { data: userData, loading } = useQuery(GET_MY_PROFILE, {
    skip: user === undefined || user === null,
    variables: {
      username: user,
    },
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };
  const onClick = async () => {
    if (!userData) return toast.error("No User!");
    if (!userData.getMyProfile) return toast.error("!!!");
    const data = await addRoomUserMutation({
      variables: {
        roomId: roomId,
        userId: userData?.getMyProfile?.id,
      },
    });
    const newUser = await sendMessageMutation({
      variables: {
        roomId: roomId,
        sender: user,
        text: "enter the room",
        isNotif: true,
      },
    });
  };
  return (
    <Container>
      <Input onChange={onChange} />
      <Button onClick={onClick} text={"초대"} />
    </Container>
  );
};

export default Search;
