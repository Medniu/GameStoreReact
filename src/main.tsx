import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
// import imgSmall from "images/testSmall.png"; // start-path is 'images' because we have an alias 'images' in webpack.common.js
// import imgCamera from "images/camera.svg";
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
// import style from "./styles/main.module.css";
// import someTypeScript from "./someTypeScript";

function HelloWorld() {
  return (
    <div>
      <h1>HelloWorld!</h1>
    </div>
  );
}

ReactDom.render(<HelloWorld />, document.getElementById("app"));
