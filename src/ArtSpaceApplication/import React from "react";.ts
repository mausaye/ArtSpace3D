import React from "react";
import ReactDOM from "react-dom";
import ThreeScene from "./ThreeScene";

import "./styles.css";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1>React with ThreeJS</h1>
      <h2>Start editing to see some magic happen!</h2>

      <ThreeScene />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
