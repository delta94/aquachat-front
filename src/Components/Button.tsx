import React from "react";
import styled from "../styles/typed-components";

const Button = styled.button`
  background-color: ${(props) => props.theme.blueColor};
  width: 100px;
  height: 30px;
  color: white;
  border: 0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    transform: scale(0.99);
  }
`;

export default ({ text, onClick }: any) => {
  return <Button onClick={onClick}>{text}</Button>;
};
