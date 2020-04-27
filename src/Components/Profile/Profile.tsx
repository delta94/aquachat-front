import React, { useState } from "react";
import styled from "../../styles/typed-components";
import { useQuery, useMutation } from "react-apollo";
import { GET_MY_PROFILE, LOG_USER_OUT } from "../../Queries/UserQueries";
import Skeleton from "../Skeleton";
import ProfileModal from "./ProfileModal";

const Container = styled.div`
  position: relative;
  display: flex;
  border-radius: 5px;
  width: 400px;
  height: 200px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 10px 19px rgba(0, 0, 0, 0.22);
  background-color: #f4f4f5;
`;

const Avatar = styled.img`
  margin-top: 45px;
  margin-left: 20px;
  width: 100px;
  height: 100px;
  border-radius: 99%;
`;
const Button = styled.div`
  background-color: ${(props) => props.theme.blueColor};
  width: 30px;
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
  width: 150px;
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
const Menu = styled.div`
  margin-left: 70px;
  height: 30px;
  width: 30px;
  font-size: 30px;
  color: rgba(0, 0, 0, 0.8);
  &:hover {
    cursor: pointer;
  }
`;

interface IProps {
  user: string | null;
}
const Profile: React.SFC<IProps> = ({ user }) => {
  const { data, loading } = useQuery(GET_MY_PROFILE, { variables: { username: user } });
  const [modal, setModal] = useState(false);
  const onClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // await logOutMutation();
    setModal((prev) => !prev);
  };
  return (
    <>
      <Container>
        {loading ? (
          <Skeleton width={"400"} height={"200"} />
        ) : (
          <>
            {data && <Avatar src={data.getMyProfile.avatar} alt="" />}
            <Info>
              <UserInfo>
                <List>{data?.getMyProfile.username}</List>
                <Gender>{data?.getMyProfile.gender}</Gender>
              </UserInfo>
              <MailInfo>{data?.getMyProfile.email}</MailInfo>
            </Info>
            <Menu onClick={onClick}>...</Menu>
            {modal && <ProfileModal />}
          </>
        )}
      </Container>
    </>
  );
};

export default Profile;
