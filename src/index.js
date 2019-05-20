import React from "react";
import ReactDOM from "react-dom";
import Microphone from "./Microphone";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Microphone id="mymicrophone" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
