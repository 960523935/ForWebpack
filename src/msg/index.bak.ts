const cssObj = require("./index.less").default;

class Msg {
  /**一些string索引 */
  [name: string]: any;
  /**要绑定消息模块的节点 */
  msgBar: any;
  /**消息窗口 */
  msgBox: any;
  /**节点属性 */
  msgBarPos: any;
  /**消息弹窗属性 */
  msgBoxPos: any;
  /**消息头 */
  tabList: any[];
  /**当前选中tab的id */
  activeId: string;

  constructor({}: any) {
    this.insertStyle();
    this.msgBar = document.getElementById("msgBar");
    this.msgBarPos = { x: 0, y: 0 };
    this.msgBoxPos = { width: 414, height: 440 };
    this.tabList = [
      { name: "From CJ" },
      { name: "ELITES" },
      { name: "Recommendations" },
    ];
    this.activeId = "cjmsgtab_0"; // 当前选中的tag节点

    this.init();
  }

  /**初始化 */
  init() {
    this.getPos();
    this.addMsgBox();
    this.addTab();
    this.addCenter();
    this.addBottom();

    this.msgBar.addEventListener("mouseover", this.showMsg);
    this.msgBar.addEventListener("mouseout", this.unshowMsg); // todo：调试完成后要关掉注释
  }

  /**添加底部操作 */
  addBottom() {
    const bottom = document.createElement("div"); // 底部模块
    bottom.className = "cjmsg-bottom";

    const markAllRead = document.createElement("div"); // 左侧的标记所有为已读
    markAllRead.className = "cjmsg-mark-read";
    markAllRead.innerHTML = "Mark All as Read";
    markAllRead.onclick = this.markAllRead;

    const goToReadAll = document.createElement("div"); // 右侧的跳转所有消息
    goToReadAll.className = "cjmsg-goto-all";
    goToReadAll.innerHTML = "Read All >";
    goToReadAll.onclick = this.goToReadAll;

    bottom.appendChild(markAllRead);
    bottom.appendChild(goToReadAll);
    this.addToBox(bottom);
  }

  /**去所有已读 */
  goToReadAll = () => {
    console.log("read all >");
  };

  /**标记所有已读 */
  markAllRead = () => {
    console.log("mark all as read");
  };

  /**添加消息列表 */
  addCenter() {
    const center = document.createElement("div"); // 消息列表
    center.className = "cjmsg-msglist";

    this.addToBox(center);
  }

  /**节点添加到消息盒子中 */
  addToBox(child: Node) {
    document.getElementsByClassName("cjmsg-inner")[0]?.appendChild(child);
  }

  /**添加tab */
  addTab() {
    const tab = document.createElement("div");
    tab.className = "cjmsg-tab";
    for (let i = 0; i < this.tabList.length; i++) {
      const childTab = document.createElement("div");
      const id = `cjmsgtab_${i}`;
      childTab.id = id;
      childTab.className = "cjmsg-childtab";
      if (id == this.activeId) {
        childTab.classList.add("active-tab");
      }
      childTab.innerHTML = this.tabList[i].name;
      childTab.onclick = this.changeTab.bind(this, id);
      tab.appendChild(childTab);
    }
    this.addToBox(tab);
  }

  /**切换tab */
  changeTab(activeId: string) {
    if (activeId == this.activeId) {
      return;
    }
    if (this.activeId) {
      document.getElementById(this.activeId)?.classList.remove("active-tab");
    }
    this.activeId = activeId;
    document.getElementById(this.activeId)?.classList.add("active-tab");
    this.getData();
  }

  /**获取当前活动页的数据 */
  getData() {
    const id = this.activeId.split("_")[1];
    this[`renderList_${id}`] && this[`renderList_${id}`]();
  }

  renderList_0() {
    // console.log(axios);
  }
  renderList_1() {}
  renderList_2() {}

  /**添加消息弹窗 */
  addMsgBox() {
    this.msgBox = document.createElement("div");
    const innerBox = document.createElement("div");

    this.msgBox.className = "cjmsg-container";
    innerBox.className = "cjmsg-inner";

    this.msgBox.style.width = `${this.msgBoxPos.width}px`;
    this.msgBox.style.left = `${
      (this.msgBarPos.width - this.msgBoxPos.width) / 2
    }px`;
    this.msgBox.style.top = `${this.msgBarPos.height}px`;

    this.msgBox.appendChild(innerBox);
    this.msgBar.appendChild(this.msgBox);
  }

  /**获取节点位置 */
  getPos() {
    const {
      x,
      y,
      width,
      height,
      right,
      bottom,
    } = this.msgBar.getBoundingClientRect();
    this.msgBarPos = { x, y, width, height, right, bottom };
  }

  /**展开消息窗口 */
  showMsg = () => {
    this.msgBox.classList.add("show");
    this.msgBox.style.height = `${this.msgBoxPos.height}px`;
  };

  /**关闭消息窗口 */
  unshowMsg = () => {
    this.msgBox.classList.remove("show");
    this.msgBox.style.height = "0px";
  };

  /**插入打包的css到style样式中 */
  insertStyle() {
    const oStyle = document.createElement("style");
    oStyle.innerHTML = cssObj.toString(); // 提取js打包出来的css
    document.head.appendChild(oStyle);
  }
}

// module.exports = Msg;
export default Msg;
