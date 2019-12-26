# Styled Components
- npm i styled-components
- 외부 css파일로 빼서 작업하지 않기에 className 중복 문제 해결
- scss 설치 없이 scss 문법 사용 가능

## 기존방식
- 컴포넌트에 props로 상태값을 전달하고 상태값에 따라 className을 다르게 붙이는 방식 

```javascript
class App extends Component {
  render() {
    return (
      <Fragment>
        <Button danger />
        <Button />
      </Fragment>
    );
  }
}

const Button = ({ danger }) => (
  <button
    className={danger ? "button button--danger" : "button button--success"}
  >
    Hello
  </button>
);
```

## Styled Components 기본문법
- const 컴포넌트명 = styled.태그명\`...css `
- 전역에 스타일 줄때는 createGlobalStyle 모듈 사용
- 기존 전역 모듈 injectGlobal 없어짐 https://www.styled-components.com/docs/api#createglobalstyle
- 상속 받을때는 컴포넌트.withComponent("태그명") 
- 상속 받은 컴포넌트 스타일 추가할때는 styled(컴포넌트.withComponent("태그명"))\`...css`;

```javascript
import styled, {createGlobalStyle} from "styled-components";

// 전역에 스타일 적용 컴포넌트 생성
export const GlobalStyle = createGlobalStyle`
  body{padding:0; margin:0}
`

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
```

## 애니메이션
- ver4에서는 return시 css 헬퍼가 필요하게 변경됨
- 기존의 keyframes을 keyframes모듈을 이용하여 변수에 지정해놓고 사용

```javascript
// css, keyframes 필요!!
import styled, {createGlobalStyle, css, keyframes} from "styled-components";

// ... 생략

class App extends Component {
  render() {
    return (
      <Container>
        <GlobalStyle />
        <Button success>success</Button>
        <Button danger rotationTime={5}>danger</Button>
      </Container>
    );
  }
}

const Button = styled.button`
  background-color: ${props => props.danger ? '#e74c3c' : '#2ecc71'}
  /* return시 css 헬퍼와 함께 사용 */
  ${props => {
    if(props.danger) {
      return css`animation: ${rotation} ${props.rotationTime}s linear infinite`;
    }
  }}
`;

const rotation = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

```

## setAttribute() 기능을 해주는 attrs(), css헬퍼
- attrs()의 매개변수에 객체로 속성을 넣으면 setAttribute가 됨
- 이어서 \`써서 스타일링도 가능
- 변수에 css헬퍼로 할당해놓은 스타일들은 언제든 쓸수 있음

```javascript
const awesomeCard = css`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const Input = styled.input.attrs({
  type: "password",
  required: true
})`
  border: none;
  ${awesomeCard};
`;
```

## ThemeProvider, nesting
- 여러군데 공통으로 쓸 테마를 빼놓음
- context API provider처럼 전역에 담아놓고 바로 사용 가능한 개념
- scss의 nesting도 가능
- 변수로 선언해놓은 styled-components를 참조해서 다른 컴포넌트 내부에서 overiding 가능

```javascript
// theme.js
const theme = {
  mainColor: "#3498db",
  dangerColor: "#e74c3c",
  successColor: "#2ecc71"
};
export default theme;

// app.js
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

```