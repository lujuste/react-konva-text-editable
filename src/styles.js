import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ContainerConva = styled.div`
  display: flex;
  width: 75vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  border-bottom: 2px solid black;
  background-color: purple;
`;

export const Board = styled.div`
  width: 20vw;
  height: 100vh;
  background-color: coral;
`;

export const MySquare = styled.div`
  background-color: blue;
  width: 30px;
  height: 30px; ;
`;

export const Image = styled.img`
  width: 200px;
  background-color: orange;
`;

export const Box = styled.div`
  width: 100px;
  height: 100px;
  background: black;
`;

export const Box2 = styled.div`
  width: 100px;
  height: 100px;
  background: red;
`;

export const WrapperContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const FlexButton = styled.div`
  width: 100%;
  height: 60px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonSave = styled.button`
  width: 60px;
  height: 50px;
  background: tomato;
  color: white;
  cursor: pointer;
  border-radius: 10px;
`;
