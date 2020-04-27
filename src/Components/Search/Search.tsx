import React, { useState, useImperativeHandle } from "react";
import styled from "../../styles/typed-components";
import Button from "../Button";
import { useMutation, useQuery } from "react-apollo";
import { ADD_ROOM_USER, GET_ROOM } from "../../Queries/RoomQueries";
import { GET_MY_PROFILE } from "../../Queries/UserQueries";
import { toast } from "react-toastify";
import { SEND_MESSAGE } from "../../Queries/MessageQueries";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;
  top: 40px;
  left: 150px;
  z-index: 99;
  width: 200px;
  min-height: 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3), 0 10px 19px rgba(0, 0, 0, 0.22);
`;
const Input = styled.input`
  outline: none;
  height: 30px;
  border-radius: 5px;
  border: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 1px solid black;
`;

const Result = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  display: flex;
  align-items: center;
  line-height: 20px;
`;

interface IProps {
  roomId: string;
  setOpen: any;
}
const Search: React.SFC<IProps> = ({ roomId, setOpen }) => {
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
      refetchQueries: [
        {
          query: GET_ROOM,
          variables: {
            roomId,
          },
        },
      ],
    });
    setOpen(false);
  };
  console.log(userData);

  return (
    <Container>
      <Input onChange={onChange} />
      <Result onClick={onClick}>{userData?.getMyProfile?.username}</Result>
    </Container>
  );
};

export default Search;
