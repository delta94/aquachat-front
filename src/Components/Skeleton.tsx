import React from "react";
import styled from "../styles/typed-components";

const Container = styled.div<Props>`
  background-color: rgba(0, 0, 0, 0.05);
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
`;
interface Props {
  width: string;
  height: string;
}
const Skeleton: React.SFC<Props> = ({ width, height }) => {
  return <Container width={width} height={height} />;
};

export default Skeleton;
