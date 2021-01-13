import doApp from "./app";
import test from "./test";

function get() {
  test();
  doApp();
  console.log(123);
  console.log(321);
}

get();
