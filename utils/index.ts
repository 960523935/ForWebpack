/** 去重 */
export function uniqueArr(arr: any[] = [], field: string) {
  var json: any = {};

  return arr.filter((item) => {
    if (json[item[field]]) {
      return false;
    } else {
      json[item[field]] = 1;
      return true;
    }
  });
}
