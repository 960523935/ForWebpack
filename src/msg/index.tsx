import React from "react";
import ReactDOM from "react-dom";
import Msg from "./msg";

export default class {
  constructor(props: any) {
    this.init(props);
  }
  init(props: any = {}) {
    const parentDom = document.getElementById("msgBar");
    const childDom = document.createElement("div");
    childDom.className = "msgChild";
    ReactDOM.render(<Msg {...props} />, childDom);
    parentDom?.appendChild(childDom);
  }
}
