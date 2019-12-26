import React, { Component, Fragment } from "react";
import styled, {createGlobalStyle, css, keyframes} from "styled-components";
// injectGlobal 없어짐
// https://www.styled-components.com/docs/api#createglobalstyle

export const GlobalStyle = createGlobalStyle`
  *{padding:0; margin:0; font-size: 14px;}
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: pink;
`;

const awesomeCard = css`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

// setAttribute() 기능을 해주는 attrs()
const Input = styled.input.attrs({
  type: "password",
  required: true
})`
  border: none;
  ${awesomeCard};
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Input placeholder="hello" />
        <GlobalStyle />
      </Container>
    );
  }
}


export default App;
