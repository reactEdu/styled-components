# Styled Components
- npm i styled-components
- 외부 css파일로 빼서 작업하지 않기에 className 중복 문제 해결
- 또 장점??

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