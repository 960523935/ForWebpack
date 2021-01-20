import React, { useState } from "react";
import classnames from "classnames";
import "./index.less";

let isJump = false;
let t1 = 0;
let t2 = 0;
let timer: any = null;

export default () => {
  const [floors] = useState([200, 300, 700, 200, 400, 300]);
  const [activeFloor, setActiveFloor] = useState(0);

  function setActive(e: any) {
    timer && clearTimeout(timer);
    const { scrollTop } = e.target;
    t1 = scrollTop;

    timer = setTimeout(listenScrollStop, 100);
    if (isJump) {
      return;
    }
    let height = 0;
    for (let i = 0; i < floors.length; i++) {
      height += document.getElementById(`${i}`)?.offsetHeight || 0;
      const nextHeight =
        height + (document.getElementById(`${i + 1}`)?.offsetHeight || 0);
      if (scrollTop < (document.getElementById("0")?.offsetHeight || 0)) {
        setActiveFloor(0);
      } else if (scrollTop >= height && scrollTop < nextHeight) {
        setActiveFloor(i + 1);
      }
    }
  }

  function listenScrollStop() {
    t2 = document.getElementsByClassName("test-page")[0].scrollTop;
    if (t1 === t2) {
      isJump = false;
    }
  }

  function doJump(index: number) {
    isJump = true;
    setActiveFloor(index);
    document.getElementById(`${index}`)?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <div onScroll={setActive} className="test-page">
      <div className="center-content">
        {floors.map((item: number, index) => {
          return (
            <div
              id={String(index)}
              key={String(index)}
              style={{ height: item }}
              className="floor-content"
            >
              {index}
            </div>
          );
        })}
      </div>
      <div className="floor-bars">
        <div className="bar-box">
          <div style={{ top: activeFloor * 50 }} className="bar-selected" />
          {floors.map((item, index) => {
            return (
              <div
                key={String(index)}
                className={classnames({
                  "floor-item": true,
                  "floor-active": index === activeFloor,
                })}
              >
                <div className="btn" onClick={() => doJump(index)}>
                  {index}
                </div>
                {/* <a className="btn" href={`#${index}`}>{index}</a> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
