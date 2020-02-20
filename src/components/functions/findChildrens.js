import _ from "lodash";

//하위의 모든 자식을 리턴하는 프로그램
//Call find children function for 1004
// findChildrens(arr, "1004", [], res => {
//   console.log("result for 1004", res);
// });

// const arr = [
//   { id: "1001", depth: "1", pid: "0" },
//   { id: "1002", depth: "1", pid: "0" },
//   { id: "1003", depth: "2", pid: "1001" },
//   { id: "1004", depth: "2", pid: "1001" },
//   { id: "1005", depth: "3", pid: "1003" },
//   { id: "1006", depth: "3", pid: "1004" },
//   { id: "1007", depth: "4", pid: "1006" },
//   { id: "1008", depth: "4", pid: "1006" },
//   { id: "1009", depth: "5", pid: "1008" }
// ];

export default function findChildrens(data, id, oputArr, callback) {
  let filterArr = data.filter(({ pid }) => pid == id);
  if (filterArr.length) {
    //Concat array with filtered data
    oputArr = [...oputArr, ...filterArr.map(({ id }) => id)];
    //Recursive call for again search next node data
    findChildrens(data, oputArr[oputArr.length - 1], oputArr, callback);
  } else {
    //If find
    callback(oputArr);
  }
}
//pid를 parent로 갖는 objects만 추출
export const directChild = (data, pid, seq) => {
  return data
    .filter((subitem, itemIndex) => subitem.pid === pid)
    .sort(function(a, b) {
      return a[seq] < b[seq] ? -1 : 1;
    });
};

let res = [];
//not callback childFind(data,"id");
export const findChild = (data, id, sortFields, sortOrder) => {
  data.forEach(obj => {
    let newres = [];
    if (obj.pid === id) {
      res.push(obj);
      _.remove(data, dt => dt.id === id);
      console.log(data);
      findChild(data, obj.id);
    }
  });
  //res = _.uniqBy(res, "id");
  if (typeof sortFields !== "undefined")
    res = sortBy(res, sortFields, sortOrder);
  return res;
};

//fields:['a','b'], orderby:['asc','asc']
// var data = [{
//   a: 'a',
//   b: 2
// }, {
//   a: 'a',
//   b: 1
// }]
export const sortBy = (data, fields, orderby) => {
  if (typeof orderby === "undefiend") orderby = [];
  return _.sortBy(data, fields, orderby);
};
