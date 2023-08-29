import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
//import App from "./App";

/* 改变 REM 换算比例 */
import "lib-flexible";
import "./index.less";

/* 处理 REM 最大宽度 */
(function () {
  const handleMax = function handleMax() {
    let html = document.documentElement,
      root = document.getElementById("root"),
      deviceW = html.clientWidth;
    root.style.maxWidth = "750px";
    if (deviceW >= 750) {
      html.style.fontSize = "75px";
    }
  };
  handleMax();
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <div className="box">知乎日报</div>
  </>
);
