import { useEffect, useState } from "react";
import { uniqueArr } from "../../utils";
import axios from "../../utils/request";
import { Base64 } from "js-base64";

export default ({ getDomainByUrl, isLogin }: any) => {
  const token = Base64.decode(localStorage.getItem("token") || "");
  const userId = Base64.decode(localStorage.getItem("userId") || "");
  const [visible, setVisible] = useState(false);
  const [messageType, setMessageType] = useState(1);
  const [isMark, setIsMark] = useState(false); // 是否列表都标记已读
  const [messageList, setMessageList] = useState([]); // 消息列表
  const [messageNum, setMessageNum] = useState(0); // 消息条数
  const [tabList, setTabList] = useState([
    { name: "From CJ", id: 1, count: 0 },
    { name: "ELITES", id: 2, count: 0 },
    { name: "Recommendations", id: 3, count: 0 },
  ]);

  useEffect(() => {
    if (!isLogin) return;
    changeTab(messageType);
    getCount();
  }, []);

  const getData: any = {
    "1": getList_1,
    "2": getList_2,
    "3": getList_3,
  };

  function changeTab(id: number) {
    setMessageType(id);
    getData[id] && getData[id]();
  }

  async function getList_1() {
    const data: any = await axios.post(
      getDomainByUrl("messageCenterCj/notification/queryGetCjnotification"),
      {
        pageSize: 5,
        pageNum: 1,
        data: { isread: "", userId },
      }
    );
    const { code, data: result = {} } = data;
    if (+code !== 200) return;

    const { list } = result;
    let isReadArr: any[] = [];
    let messagePre = list.map((v: any) => {
      const ind = v.notificationType.indexOf("html:");
      if (ind > -1) {
        v.url = v.notificationType.slice(ind + 5);
        v.notificationType = v.notificationType.slice(0, ind);
      }
      isReadArr.push(v.isread);
      return v;
    });
    setIsMark(!isReadArr.includes("0"));
    //将未读的置顶
    let idxs: any[] = [],
      tops: any[] = [];
    messagePre.forEach((v: any, i: number) => {
      v.isread === "0" && idxs.unshift(i);
    });
    idxs.forEach((idx) => (tops = tops.concat(messagePre.splice(idx, 1))));
    messagePre = tops.reverse().concat(messagePre);

    const data2: any = await axios.post(
      getDomainByUrl("messageCenterCj/notification/queryNoticeUpperApex"),
      { userId }
    );
    const { code: topCode, data: topResult = {} } = data2;
    if (+topCode !== 200) return;

    const { list: topList } = topResult;
    const noReadList = topList.filter((v: any) => v.isread === "0").reverse();
    const arr = uniqueArr([...noReadList, ...messagePre], "id");
    messagePre = arr.filter((v, i) => i < 5);
    setMessageList(messagePre);
    noReadList.length > 0 && setVisible(true);
  }

  async function getList_2() {
    const data: any = await axios.post(
      getDomainByUrl("app/notification/getInformList"),
      { pageNum: "1", pageSize: "5" }
    );
    let messagePre = data?.list || [];
    if (messagePre.length > 0) {
      let isReadArr = [];
      for (let i = 0; i < messagePre.length; i++) {
        isReadArr.push(messagePre[i].read_status);
        if (isReadArr.includes(2)) {
          setIsMark(false);
        }
      }
    }
    setMessageList(messagePre);
  }
  async function getList_3() {
    const data: any = await axios.post(
      getDomainByUrl("cj/appPush/getCJPushInfoListByUserId"),
      {
        pageNum: "1",
        pageSize: "5",
      }
    );
    const list = data.list || [];
    let messagePre = list.map((_: any) => {
      const arr = _.picurl.split(",");
      return {
        ..._,
        img_url_one: arr.length > 0 ? arr[0] : _.picurl,
      };
    });
    if (messagePre.length > 0) {
      let isReadArr: any[] = [];
      messagePre.forEach((con: any) => {
        con.create_time = con.create_time.split(".")[0];
        isReadArr.push(con.is_read);
        if (isReadArr.includes(2)) {
          setIsMark(false);
        }
      });
    }
    setMessageList(messagePre);
  }

  function toAnother(item: any) {
    if (messageType == 2) {
      let otime = new Date().getTime();
      if (item.operation_type == "1") {
        window.open(
          `https://elites.cjdropshipping.com/cross?token=${token}&_t=${otime}&url=/personal-index?id=${item.user_id}&page=other`
        ); //关注
      }
      if (
        item.operation_type == "4" ||
        item.operation_type == "6" ||
        item.operation_type == "9" ||
        item.operation_type == "10"
      ) {
        window.open(
          `https://elites.cjdropshipping.com/cross?token=${token}&_t=${otime}&url=/question-detail?id=${item.detail_id}`
        ); //问题
      }
      if (item.operation_type == "3" || item.operation_type == "7") {
        window.open(
          `https://elites.cjdropshipping.com/cross?token=${token}&_t=${otime}&url=/question-detail?id=${item.question_id}`
        ); //问题
      }
      if (
        item.operation_type == "2" ||
        item.operation_type == "5" ||
        item.operation_type == "8"
      ) {
        window.open(
          `https://elites.cjdropshipping.com/cross?token=${token}&_t=${otime}&url=/article-detail?id=${item.detail_id}`
        ); //文章详情
      }
    } else if (messageType == 3) {
      location.href =
        "/list-detail?id=" + item.push_id + "&fromType=CommentList";
    }
  }

  function toAnother2(item: any) {
    if (messageType == 2) {
      let otime = Date.now();
      if (item.operation_type == "1") {
        window.open(
          `https://elites.cjdropshipping.com/cross?token=${token}&_t=${otime}&url=/personal-index?id=${item.user_id}&page=other`
        ); //关注
      }
      if (
        item.operation_type == "4" ||
        item.operation_type == "6" ||
        item.operation_type == "9" ||
        item.operation_type == "10"
      ) {
        window.open(
          `https://elites.cjdropshipping.com/cross?token=${token}&_t=${otime}&url=/question-detail?id=${item.detail_id}`
        ); //问题
      }
      if (item.operation_type == "3" || item.operation_type == "7") {
        window.open(
          `https://elites.cjdropshipping.com/cross?token=${token}&_t=${otime}&url=/question-detail?id=${item.question_id}`
        ); //问题
      }
      if (
        item.operation_type == "2" ||
        item.operation_type == "5" ||
        item.operation_type == "8"
      ) {
        window.open(
          `https://elites.cjdropshipping.com/cross?token=${token}&_t=${otime}&url=/article-detail?id=${item.detail_id}`
        ); //文章详情
      }
    } else if (messageType == 3) {
      location.href =
        "/list-detail.html?id=" + item.push_id + "&fromType=CommentList";
    }
  }

  /**跳转消息列表 */
  function toAllMessage() {
    location.href = "/myCJ.html#/all-message/" + messageType;
  }

  /**获取通知数量 */
  async function getCount() {
    const res = await axios.post(
      getDomainByUrl("app/notification/selectIsNotRead"),
      {
        isread: 0,
      }
    );
    const { elitesCount, pushCount } = res?.data || {};
    const res2: any = await axios.post(
      getDomainByUrl("messageCenterCj/notification/queryCjInformMap"),
      { userId }
    );
    const { code, data: result = {} } = res2;
    if (+code !== 200) return;
    const { cjInformNum } = result;
    setMessageNum(cjInformNum - -elitesCount - -pushCount);
    setTabList((list) => {
      return list.map((v, i) => {
        if (i === 0) v.count = cjInformNum;
        if (i === 1) v.count = elitesCount * 1;
        if (i === 2) v.count = pushCount * 1;
        return v;
      });
    });
  }

  async function toMarkAll() {
    const postUrl: any = {
      "1": "messageCenterCj/notification/updateRead",
      "2": "app/notification/allRead",
      "3": "cj/appPush/updateAppPushIsRead",
    };
    const params: any = {};
    if (messageType == 1) {
      params.userId = userId;
    }
    const res: any = await axios.post(
      getDomainByUrl(postUrl[messageType]),
      params
    );
    let code;
    if (messageType == 1) {
      code = res.code;
    } else {
      code = res.statusCode;
    }
    if (code === 200) {
      getCount();
      getData[messageType]();
    }
  }

  return {
    visible,
    messageType,
    messageList,
    isMark,
    messageNum,
    tabList,
    setVisible,
    changeTab,
    toAnother,
    toAnother2,
    toMarkAll,
    toAllMessage,
  };
};
