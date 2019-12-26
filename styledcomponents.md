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

## Styled Components 문법
- const 컴포넌트명 = styled.태그명` ...css `
- 전역에 스타일 줄때는 createGlobalStyle 모듈 사용
- 기존 전역 모듈 injectGlobal 없어짐 https://www.styled-components.com/docs/api#createglobalstyle
- const Anchor = styled(Button.withComponent("a"))`
  text-decoration:none;
`;

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

class App extends Component {
  render() {
    return (
      <Container>
        <GlobalStyle />
        {/* ... 그외 컴포넌트 */} 
      </Container>
    );
  }
}
```

