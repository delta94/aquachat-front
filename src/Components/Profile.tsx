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
  justify-content: space-between;
`;

const Avatar = styled.img`
  margin-top: 20px;
  margin-left: 20px;
  width: 150px;
  height: 150px;
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
const Info = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100px;
  margin-left: 20px;
`;
const UserInfo = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
`;
const List = styled.span``;
const Gender = styled.span`
  color: gray;
  margin-left: 10px;
`;
const MailInfo = styled.span``;
interface IProps {
  user: string | null;
}
const Profile: React.SFC<IProps> = ({ user }) => {
  const { data, loading } = useQuery(GET_MY_PROFILE, { variables: { username: user } });
  const [logOutMutation] = useMutation(LOG_USER_OUT);
  const onClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    await logOutMutation();
  };
  console.log(data);
  return (
    <Container>
      {data && <Avatar src={data.getMyProfile.avatar} alt="" />}
      <Info>
        <UserInfo>
          <List>{data?.getMyProfile.username}</List>
          <Gender>{data?.getMyProfile.gender}</Gender>
        </UserInfo>
        <MailInfo>{data?.getMyProfile.email}</MailInfo>
      </Info>
      <Button onClick={onClick}>X</Button>
    </Container>
  );
};

export default Profile;
