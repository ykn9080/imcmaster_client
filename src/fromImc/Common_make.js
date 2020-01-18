import $ from "jquery";
import Swal from "sweetalert2";

function sweetmsg(title, body, icon) {
  if ((typeof body == "undefined") | (body == ""))
    Swal.fire({ title: "", body: title, html: true });
  else Swal.fire({ title: title, text: body, html: true });
}

function sweetmsgautoclose(title, body, options) {
  var timer = 2500;
  if (typeof options != "undefined") {
    if (options.hasOwnProperty("timer")) timer = options.timer;
  }
  if ((typeof body == "undefined") | (body == ""))
    Swal.fire({
      title: "",
      body: title,
      html: true,
      timer: timer,
      showConfirmButton: false
    });
  else
    Swal.fire({
      title: title,
      text: body,
      html: true,
      timer: timer,
      showConfirmButton: false
    });
}
function idMake(option) {
  var d = new Date();
  var yr = d
    .getFullYear()
    .toString()
    .substr(2, 2);
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hr = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  var msec = d.getMilliseconds();
  var id =
    yr +
    (("" + month).length < 2 ? "0" : "") +
    month +
    (("" + day).length < 2 ? "0" : "") +
    day +
    hr +
    min +
    sec;
  if (typeof option != "undefined") {
    //leaver the num from right side
    id += msec;
    var num = id.length - parseInt(option);
    id = id.substring(num);
  }
  return id;
}
const sweetmsgconfirm = (confirmfunc, option) => {
  var title = "Delete Confirm",
    body = "Are your sure to delete?",
    cookiekey = "cookie" + idMake();
  if (typeof option != "undefined") {
    if (option.hasOwnProperty("title")) title = option.title;
    if (option.hasOwnProperty("body")) body = option.body;
    if (option.hasOwnProperty("cookiekey")) cookiekey = option.cookiekey;
  }
  body =
    "<div>" +
    body +
    "</div><div style='margin:0'><label id='cbcookie' type='checkbox'><i class='fa fa-square-o imdim'/>Don't ask</label></div>";
  Swal.fire({
    title: title,
    text: body,
    html: true,
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, do it!",
    cancelButtonText: "No, cancel!",
    closeOnConfirm: true,
    closeOnCancel: true
  }).then(isConfirm => {
    if (isConfirm) {
      switch (typeof confirmfunc) {
        case "string":
          eval(confirmfunc);
          break;
        case "function":
          confirmfunc();
          break;
      }
    }
  });
};

export { sweetmsg, sweetmsgautoclose, sweetmsgconfirm };
