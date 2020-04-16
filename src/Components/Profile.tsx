import React from "react";
import styled from "../styles/typed-components";
import { useQuery, useMutation } from "react-apollo";
import { GET_MY_PROFILE, LOG_USER_OUT } from "../Queries/UserQueries";

const Container = styled.div`
  display: flex;
  border-radius: 5px;
  width: 400px;
  height: 200px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 10px 19px rgba(0, 0, 0, 0.22);
  background-color: #f4f4f5;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 99%;
`;
const Button = styled.div`
  background-color: ${(props) => props.theme.blueColor};
  width: 100px;
  height: 30px;
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface IProps {
  user: string | null;
}
const Profile: React.SFC<IProps> = ({ user }) => {
  const { data, loading } = useQuery(GET_MY_PROFILE, { variables: { username: user } });
  const [logOutMutation] = useMutation(LOG_USER_OUT);
  const onClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    await logOutMutation();
  };
  return (
    <Container>
      {!loading && data && <Avatar src={data.getMyProfile.avatar} alt="" />}
      <div>{user}</div>
      <Button onClick={onClick}>Log Out</Button>
    </Container>
  );
};

export default Profile;
