import React from "react";
import ReactDOM from "react-dom";
import Msg from "./msg";

export default class {
  constructor(props: any) {
    this.init(props);
  }
  init(props: any = {}) {
    const parentDom = document.getElementById("msgBar");
    const childDom = document.createElement("div"); // 插入到一个空div,防止ReactDOM.render清空父节点下的所有子节点
    childDom.className = "msgChild";
    ReactDOM.render(<Msg {...props} />, childDom);
    parentDom?.appendChild(childDom);
  }
}
