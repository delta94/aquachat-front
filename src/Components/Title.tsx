import React, { useEffect, useState } from "react";
import styled from "../styles/typed-components";
import { useQuery, useSubscription } from "react-apollo";
import { GET_ROOM } from "../Queries/RoomQueries";
import { NEW_MESSAGE } from "../Queries/MessageQueries";

const Container = styled.div<{ current: boolean }>`
  border: ${(props) => (props.current ? `2px solid ${props.theme.blueColor}` : "1px solid gray")};
  width: 100%;
  height: 60px;
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
  display: flex;
  justify-content: space-between;
`;

const Alarm = styled.div`
  background-color: ${(props) => props.theme.blueColor};
  height: 25px;
  width: 25px;
  border-radius: 99px;
  color: white;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  margin-bottom: 30px;
`;
interface IProps {
  currentRoom: string;
  users: any;
  messages: any;
  handleClick?: (roomId: string) => void;
  roomId: string;
}
const Title: React.SFC<IProps> = ({ users, messages, handleClick, roomId, currentRoom }) => {
  const [alarm, setAlarm] = useState<boolean>(false);
  const { data, loading, refetch } = useQuery(GET_ROOM, {
    skip: roomId === undefined || roomId === null,
    variables: { roomId: roomId },
  });
  const { data: newData } = useSubscription(NEW_MESSAGE, {
    variables: {
      id: roomId,
    },
  });
  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (handleClick) handleClick(roomId);
    setAlarm(false);
  };
  const handleNewData = async () => {
    if (newData !== undefined) {
      await refetch();
      if (newData.newMessage.roomId === currentRoom) return;
      setAlarm(true);
    }
  };

  useEffect(() => {
    handleNewData();
  }, [newData]);
  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <Container onClick={onClick} current={currentRoom === roomId}>
          <>
            <First>
              {data?.getRoom?.userConnection.map((user: any) => {
                return <span key={user.user.id}>{user.user.username} </span>;
              })}
            </First>
            <Second>
              {
                <span>
                  {newData
                    ? newData.newMessage.message.text
                    : data?.getRoom?.messages[messages.length - 1]?.text}
                </span>
              }
              {alarm && <Alarm>New</Alarm>}
            </Second>
          </>
        </Container>
      )}
    </>
  );
};

export default Title;
