import React, { useEffect, useState } from "react";
import styled from "../styles/typed-components";
import { useQuery, useSubscription } from "react-apollo";
import { GET_ROOM } from "../Queries/RoomQueries";
import { NEW_MESSAGE } from "../Queries/MessageQueries";

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
`;

const Second = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;
interface IProps {
  currentRoom: string;
  users: any;
  messages: any;
  handleClick?: (roomId: string) => void;
  roomId: string;
}
const Title: React.SFC<IProps> = ({ users, messages, handleClick, roomId, currentRoom }) => {
  const [alarm, setAlarm] = useState<number>(0);
  const { data, loading, refetch } = useQuery(GET_ROOM, {
    skip: roomId === undefined || roomId === null,
    variables: { roomId: roomId },
  });
  const { data: newData } = useSubscription(NEW_MESSAGE);
  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (handleClick) handleClick(roomId);
    setAlarm(0);
  };
  // const handleNewData = async () => {
  //   if (newData !== undefined) {
  //     await refetch();
  //     setAlarm(alarm + 1);
  //   }
  // };

  // useEffect(() => {
  //   handleNewData();
  //   console.log("여기도");
  // }, [newData]);
  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <Container onClick={onClick}>
          <>
            <First>
              {data?.getRoom?.userConnection.map((user: any) => {
                return <span key={user.user.id}>{user.user.username} </span>;
              })}
            </First>
            <Second>{<span>{data?.getRoom?.messages[messages.length - 1]?.text}</span>}</Second>
          </>
        </Container>
      )}
    </>
  );
};

export default Title;
