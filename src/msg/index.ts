import "./index.less";
// require("./index.less");

class Msg {
  node: any; // 要绑定消息模块的节点

  constructor(props: any) {
    console.log(props);

    this.node = document.getElementById("msgBar");
  }
}

module.exports = Msg;
