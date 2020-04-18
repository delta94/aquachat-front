import React from "react";
import styled from "../styles/typed-components";

const Container = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.blueColor};
`;
const Input = styled.input`
  background-color: #f4f4f5;
  border: 0;
  font-size: 15px;
  margin-left: 10px;
  width: 95%;
`;
const Form = styled.form`
  width: 100%;
`;
interface IProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  text: string;
}
const Message: React.SFC<IProps> = ({ onChange, onSubmit, text }) => {
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input placeholder={"type Message"} value={text} onChange={onChange} />
      </Form>
    </Container>
  );
};

export default Message;
