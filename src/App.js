import React, { Component, Fragment } from "react";
import "./App.css";
// import styled from "styled-components"
// https://www.styled-components.com/

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

export default App;
