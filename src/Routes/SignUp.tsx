import React, { useState } from "react";
import styled from "../styles/typed-components";
import { useMutation } from "react-apollo";
import { CREATE_USER } from "../Queries/UserQueries";
import { toast } from "react-toastify";

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
  margin-bottom: 30px;
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

const GenderContainer = styled.div`
  border: 0;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: 80%;
  height: 35px;
  border-radius: 4px;
  background-color: #fafafa;
  margin-bottom: 30px;
`;
const GenderColumn = styled.div<GenderProps>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: 4px;
  color: ${(props) => (props.checked ? "#fafafa" : "gray")};
  cursor: pointer;
  background-color: ${(props) => (props.checked ? props.theme.blueColor : "#fafafa")};
`;

interface GenderProps {
  checked: boolean;
}
const SignUp = ({ history }: any) => {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [gender, setGender] = useState("male");
  const [createUserMutation] = useMutation(CREATE_USER);
  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const onMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  };
  const onMaleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setGender("male");
  };
  const onFemaleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setGender("female");
  };

  const onClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    try {
      const success = await createUserMutation({
        variables: {
          username,
          email: mail,
          gender,
        },
      });
      if (!success) throw Error();
      history.push("/");
    } catch (e) {
      console.log(e);
      toast.error("same username exist");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Header>
          <Bold>AQUA CHAT</Bold>
        </Header>
        <Main>
          <Input placeholder={"username"} onChange={onUsernameChange} value={username} />
          <Input placeholder={"email"} onChange={onMailChange} value={mail} />
          <GenderContainer>
            <GenderColumn checked={gender === "male"} onClick={onMaleClick}>
              Male
            </GenderColumn>
            <GenderColumn checked={gender === "female"} onClick={onFemaleClick}>
              Female
            </GenderColumn>
          </GenderContainer>
          <Button onClick={onClick}>Sing Up</Button>
        </Main>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
