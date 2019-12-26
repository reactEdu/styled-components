import React, { Component } from "react";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import theme from './theme';

export const GlobalStyle = createGlobalStyle`
  *{padding:0; margin:0; font-size: 14px;}
`;

const Card = styled.div`
  background-color: red;
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: pink;
  ${Card}:first-child { 
    /* 카드는 원래 빨간색이지만 첫번째 자식은 파란색으로 변경 */
    background-color: blue;
  }
`;

const Button = styled.button`
  border-radius: 30px;
  padding: 25px 15px;
  /* 5단계 아래있는 버튼에서 theme에 한번에 접근가능 */
  background-color: ${props => props.theme.successColor};
`;

class App extends Component {
  render() {
    return (
      // 하위 컴포넌트들에서 theme에 있는 속성들 사용 가능
      <ThemeProvider theme={theme}>
        <Container>
          <Form />
          <Form />
          <GlobalStyle />
        </Container>
      </ThemeProvider>
    );
  }
}

const Form = () => (
<Card>
  <Button>Hello</Button>
</Card>);

export default App;
