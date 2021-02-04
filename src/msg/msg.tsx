import React, { useEffect, useState } from "react";
import classnames from "classnames";
import css from "./index.less";

const msgBar = document.getElementById("msgBar");

const Msg = (props: any) => {
  const [msgBarPos, setmsgBarPos] = useState<any>({ x: 0, y: 0 });
  const [msgBoxPos, setmsgBoxPos] = useState<any>({ width: 414, height: 440 });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getPos();
    msgBar?.addEventListener("mouseover", showMsg);
    msgBar?.addEventListener("mouseout", showMsg);
    return () => {
      msgBar?.removeEventListener("mouseover", showMsg);
      msgBar?.removeEventListener("mouseout", showMsg);
    };
  }, []);

  function showMsg() {
    setVisible((v) => !v);
  }

  function getPos() {
    const {
      x,
      y,
      width,
      height,
      right,
      bottom,
    }: any = msgBar?.getBoundingClientRect();

    setmsgBarPos({ x, y, width, height, right, bottom });
    setmsgBoxPos({
      ...msgBoxPos,
      left: (width - msgBoxPos.width) / 2,
      top: height,
    });
  }

  return (
    <div
      className={classnames({
        css["cjmsg-container"]:true
      })}
      style={{
        width: msgBoxPos.width,
        left: msgBoxPos.left,
        top: msgBoxPos.top,
      }}
    >
      <div className={css["cjmsg-inner"]}>
        <div className={css["cjmsg-tab"]}></div>
        <div className={css["cjmsg-msglist"]}></div>
        <div className={css["cjmsg-bottom"]}>
          <div className={css["cjmsg-mark-read"]}>Mark All as Read</div>
          <div className={css["cjmsg-goto-all"]}>{`Read All >`}</div>
        </div>
      </div>
    </div>
  );
};
export default Msg;
