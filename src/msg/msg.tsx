import React, { useEffect, useState } from "react";
import classnames from "classnames";
import css from "./index.less";
import useHooks from "./hooks";
import dayjs from "dayjs";

interface Props {
  /**浮窗的位置 */
  position: "left" | "center" | "right";
  /**处理url */
  getDomainByUrl: (str: string) => {};
  /**是否已登录 */
  isLogin: boolean;
}

const msgTips: any = {
  "1": "follow you",
  "2": "support your article",
  "3": "support your answer",
  "4": "answer your question",
  "5": "comment your article",
  "6": "comment your question",
  "7": "comment your answer",
  "8": "replied to your comment under the article",
  "9": "replied to your comment under the question",
  "10": "replied to your comment under the answer of question",
};

const Msg = ({ position = "center", getDomainByUrl, isLogin }: Props) => {
  const [msgBoxPos, setmsgBoxPos] = useState<any>({ width: 414, height: 440 }); // 消息窗口的宽高
  const {
    visible,
    messageType,
    messageList,
    tabList,
    setVisible,
    changeTab,
    toAnother2,
    toMarkAll,
    toAllMessage,
  } = useHooks({ getDomainByUrl, isLogin });

  useEffect(() => {
    if (!isLogin) return;
    const msgBar = document.getElementById("msgBar");
    getPos(msgBar as Element);
    msgBar?.addEventListener("mouseover", showMsg);
    msgBar?.addEventListener("mouseout", unshowMsg);
    return () => {
      msgBar?.removeEventListener("mouseover", showMsg);
      msgBar?.removeEventListener("mouseout", unshowMsg);
    };
  }, []);

  /**消息按钮的悬浮事件 */
  function showMsg() {
    setVisible(true);
  }

  /**消息按钮的悬浮事件 */
  function unshowMsg() {
    setVisible(false);
  }

  /**设置浮窗的位置 */
  function getPos(msgBar: Element) {
    const barStyle: any = msgBar?.getBoundingClientRect();
    if (!barStyle) return;
    const { width, height } = barStyle;
    let left = (width - msgBoxPos.width) / 2;
    if (position == "left") {
      left = 0;
    } else if (position == "right") {
      left = width - msgBoxPos.width;
    }
    setmsgBoxPos({ ...msgBoxPos, left, top: height });
  }

  return (
    <div
      className={classnames({
        [css.cjmsgContainer]: true,
        [css.show]: visible,
      })}
      style={{
        width: msgBoxPos.width,
        left: msgBoxPos.left,
        top: msgBoxPos.top,
        height: visible ? msgBoxPos.height : 0,
      }}
    >
      <div className={css.cjmsgInner}>
        <div className={css.cjmsgTab}>
          {tabList.map((item) => (
            <div
              onClick={() => changeTab(item.id)}
              key={item.id}
              className={classnames({
                [css.cjmsgChildtab]: true,
                [css.activeTab]: messageType === item.id,
              })}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className={css.cjmsgMsglist}>
          {messageList.map((item: any, index: number) => {
            return (
              <div key={index} className={css.messageItem}>
                {item.noticeSpecify == 0 && <b className="isTopBage"></b>}
                {messageType == 1 && (
                  <a
                    href={
                      item.url
                        ? item.url + "&href"
                        : "/myCJ.html#/message-list/" + item.id
                    }
                    className={classnames({ [css.hasRead]: item.isread == 1 })}
                  >
                    <div className="mes-left-detail">
                      <p className="mes-detail-titp">{item.notificationType}</p>
                      <p className="mes-detail-p">{item.info}</p>
                    </div>
                    <div className="mes-right-time">
                      <span className="mes-time">
                        {dayjs(item.sendDate).format("YYYY-M-D H:m:s")}
                      </span>
                    </div>
                  </a>
                )}
                {messageType == 2 && (
                  <a
                    className={classnames({
                      hasRead: item.read_status == 1,
                    })}
                    onClick={() => {
                      toAnother2(item);
                    }}
                  >
                    <div className="mesElit-left-detail">
                      <p>
                        {item.user_name}
                        <span
                          style={
                            item.operation_type != "1" ? { color: "#999" } : {}
                          }
                        >
                          {msgTips[item.operation_type]}
                        </span>
                      </p>
                    </div>
                    <div className="mesElit-right-time">
                      <span v-show="messageType=='2'">
                        {dayjs(item.create_time.time).format("YYYY-M-D H:m:s")}
                      </span>
                    </div>
                  </a>
                )}
                {messageType == 3 && (
                  <a
                    onClick={() => {
                      toAnother2(item);
                    }}
                    className={classnames({ [css.hasRead]: item.isread == 1 })}
                  >
                    <div className="shopping-left-detail">
                      <img
                        src={item.img_url_one}
                        alt=""
                        className="shopping-left-img"
                      />
                    </div>
                    <div className="shopping-right-time">
                      <p className="shopping-title">{item.title}</p>
                      <p className="shopping-content">{item.content}</p>
                      <span className="shopping-time">{item.create_time}</span>
                    </div>
                  </a>
                )}
              </div>
            );
          })}
        </div>
        <div className={css.cjmsgBottom}>
          <div onClick={toMarkAll} className={css.cjmsgMarkRead}>
            Mark All as Read
          </div>
          <div
            onClick={toAllMessage}
            className={css.cjmsgGotoAll}
          >{`Read All >`}</div>
        </div>
      </div>
    </div>
  );
};
export default Msg;
