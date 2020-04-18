import React, { useState } from "react";
import styled from "../styles/typed-components";
import { Link } from "react-router-dom";
import { useMutation } from "react-apollo";
import { CONFIRM_USER, LOG_USER_IN } from "../Queries/UserQueries";
import { toast, ToastContainer } from "react-toastify";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 400px;
  height: 400px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 38px rgba(0, 0, 0, 0.22);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.blueColor};
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Bold = styled.span`
  font-weight: bold;
  font-size: 30px;
  color: #f2f2f2;
`;
const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  background-color: #fafafa;
  border: 0;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  width: 80%;
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
  margin-bottom: 20px;
`;
const Button = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  width: 80%;
  height: 30px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.blueColor};
`;

const Footer = styled.div`
  position: relative;
  top: 80px;
  color: ${(props) => props.theme.blueColor};
`;
const LogIn = () => {
  const [username, setUsername] = useState("");
  const [confirmUserMutation] = useMutation(CONFIRM_USER);
  const [logUserInMutation] = useMutation(LOG_USER_IN);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const onClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleLogin();
  };
  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { which } = event;
    if (which === 13) {
      handleLogin();
    }
  };
  const handleLogin = async () => {
    const data = await confirmUserMutation({ variables: { username } });
    if (!data) {
      return toast.error("No Data...");
    }
    if (!data.data.confirmUser) {
      return toast.error("Confirm fail");
    }
    try {
      await logUserInMutation({ variables: { username: username } });
      console.log("success");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <FormContainer>
        <Header>
          <Bold>AQUA CHAT</Bold>
        </Header>
        <Main>
          <Input
            onKeyPress={onKeyPress}
            placeholder={"username"}
            onChange={onChange}
            value={username}
          />
          <Button onClick={onClick}>Log in</Button>
          <Footer>
            <Link to="/signup">Craete Account</Link>
          </Footer>
        </Main>
      </FormContainer>
    </Container>
  );
};

export default LogIn;
