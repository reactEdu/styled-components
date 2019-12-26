import React, { Component, Fragment } from "react";
import styled, {createGlobalStyle} from "styled-components"
// injectGlobal 없어짐
// https://www.styled-components.com/docs/api#createglobalstyle

export const GlobalStyle = createGlobalStyle`
  *{padding:0; margin:0; font-size: 14px;}
`

class App extends Component {
  render() {
    return (
      <Container>
        <GlobalStyle />
        <Button success>success</Button>
        <Button danger>danger</Button>
        <Anchor href="https://www.styled-components.com/docs/api">styled-components.com</Anchor>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: pink;
`

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  color: white;
  font-weight: 600;
  -webkit-appearance: none;
  cursor: pointer;
  &active,
  &focus{
    outline: none;
  }
  background-color: ${props => props.danger ? '#e74c3c' : '#2ecc71'}
`;

// Button 컴포넌트 스타일을 같게 적용하는 a태그를 만들고 css 추가
const Anchor = styled(Button.withComponent("a"))`
  text-decoration:none;
`;

export default App;
