import React from "react";
import $ from "jquery";
import {
  imcsetting,
  selectimc,
  jsonReadallMyAjax,
  jsonDataMyAjax,
  datasetRead,
  selectimctable,
  jsoncombine,
  jsonReadMyAjax,
  jsonUpdateMyAjax,
  callbackwithdata,
  checklastupdate,
  readdata,
  datalistreturn,
  datacodereturn,
  datafilterreturn
} from "./Common_data.js";
//import { initDisplay } from "./RedipsScript";
import {
  menuData,
  getcompmodule,
  menuMy,
  menuMainApp,
  menuInit
} from "./Common_menu.js";
import { toggleLogin } from "./fromHtml";
import { useSelector, useDispatch } from "react-redux";
import MultiDispatch from "../reducers/multipleDispatch";
import { currentsetting } from "../functions/config";
import Swal from "sweetalert2";
import axios from "axios";

//require ('smartmenus');
export function test() {
  console.log("hh");
}
// export const pageInit = () => {
//   const gb = useSelector(state => state.global);
//   //pageInit.setitem = setitem;
//   let constr; //= $("#ctl00_hidConnect").val();
//   if (typeof constr == "undefined")
//     constr =
//       "Data Source=SQL5004.Smarterasp.net;Initial Catalog=DB_9D66CD_imcmaster;User Id=DB_9D66CD_imcmaster_admin;Password=ykn90809080;";
//   //defconnect = "DBtype=mssql;" + constr;
//   window.alert = function(text) {
//     console.log("alert message: " + text);
//     return true;
//   };
//   gb.menutoggle = "";

//   let login = getuseridpassport();
//   if (login == "") {
//     gb.menutoggle = "open";
//   }
//   //else if (localStorage.getItem("imcsetting") == null) {
//   //    if (!imapp) {
//   //        Login(getlogin().id);
//   //        comp = getlogin().comp;
//   //        staff = getlogin().id;
//   //    }
//   //}
//   else {
//     gb.mycomp = login.comp;
//     if ((gb.mycomp == "1") | (typeof gb.mycomp == "undefined")) gb.mycomp = "";
//     compInit(true);
//     if (localStorage.getItem("imclist") == null) {
//       let myinfo = gb.mycomp + "," + login.id;
//       if (gb.mycomp == "") myinfo = "";
//       jsonReadMyAjax("imclist", myinfo, "", "", "", pageInit.setitem);
//     }
//   }
//   let imc = localStorage.getItem("imctable");

//   if (imc == null) {
//     //let myinfo = gb.mycomp + "," + getlogin().id;
//     //if (gb.mycomp == "") myinfo = "";
//     //jsonReadMyAjax("imctable", myinfo, "", "", "", init);
//     //return false;
//     console.log(
//       "로긴후 menu,submenu,control,adminmenu사라지는 버그 시작포인트 찾기"
//     );
//     imctableload("imctable");
//   } else process(imc);

//   function process(imc) {
//     let imcjson = JSON.parse(imc);
//     // if (gb.menutoggle = "" && !imcjson.hasOwnProperty("menu")) {
//     //     imctableload("imctable", pageInit);
//     // }
//     //if (!imapp) gb.menutoggle = "";
//     //if (imapp && localStorage.getItem("imcsetting") != null) gb.menutoggle = "";
//     findsubid(imcjson);
//     if (gb.imapp) initApp();
//     else {
//       init();
//     }
//   }

//   function imctableload(storename, callback, opt) {
//     if (typeof storename == "undefined") storename = "imctable";
//     let myinfo = gb.mycomp + "," + login.id;
//     if (gb.mycomp == "") myinfo = "";
//     //  jsonReadMyAjax(storename, myinfo, "", "", "", init);

//     let path = "/data/json/";
//     path += storename + ".json";
//     axios({
//       method: "post",
//       url: gb.webserviceprefix + "readDataMy",
//       data: {
//         path: path,
//         myinfo: myinfo,
//         dataname: "",
//         keycode: "",
//         keyvalue: ""
//       }
//     }).then(response => {
//       jsoncombine(storename, myinfo, response.data, "imctableload");
//       let imc = localStorage.getItem("imctable");
//       process(imc);
//       if (typeof callback == "function")
//         callbackwithdata(callback, response.data, opt);
//     });

//     // testapi();
//     return false;
//   }

//   function initApp() {
//     console.log("app?");
//     //jscssload(["jqgrid", "googlechart", "jstree", "datepicker", "multipleselect", "jqmodal", "sweetalert", "colresizable", "datatables", "pivottable"]);

//     //google.charts.load('visualization', '1', { packages: ['corechart'] });
//     setTimeout(function() {
//       menuMainApp();
//       initDisplay();
//     }, 2500);
//   }

//   function init() {
//     let theme = "cupertino",
//       csshref,
//       menu = selectimctable(gb.menutoggle + gb.menuid);
//     // if (typeof menu != "undefined" && menu.hasOwnProperty("theme"))
//     //   theme = menu.theme;
//     // if (theme != "cupertino" && theme != "undefined" && theme != "") {
//     //   $("#jstheme").remove();
//     //   $("#jqtheme").remove();
//     //   csshref = "./js/jquery-ui-themes-1.11.4/" + theme + "/theme.css";
//     //   cssInsert("jstheme", csshref);
//     // }

//     $("#menu").css("height", $(document).height() + "px");
//     // multilangReadAjax('kr');
//     menuInit();

//     if (isMobile()) {
//       setTimeout(function() {
//         $("#main-menu").hide();
//         $("#main-menu").css({ "margin-left": "", width: "100%" });
//         $(".nav-brand>a").remove();
//         $("#main-top").appendTo($(".nav-brand"));
//         $("#main-top").css({ float: "left", "background-color": "#F0FFF0" });
//         $("#splogo")
//           .empty()
//           .append($('<img style="width:50px" src="/images/logo/imc1_1.png"/>'));

//         setTimeout(function() {
//           if ($("#main-menu").css("display") == "block") $("#main-menu").hide();
//         }, 1000);
//       }, 1000);
//     }

//     chkwin();
//     $(window)
//       .on("resize", function() {
//         chkwin();
//       })
//       .resize();
//     //if click any places outside popover, close self.

//     getcompmodule();
//     lazyLoadImages();
//     if ($(".popover").length > 0)
//       $("body").click(function() {
//         $(".popover").popover("hide");
//       });
//   }

//   function setitem(data) {
//     localStorage.setItem("imclist", JSON.stringify(data));
//   }
// };
// function compInit(replacefile) {
//   const gb = useSelector(state => state.global);
//   //chk exist imcdata,imcsetting,imctable,imclist,imcsetting in /comp directory
//   //if not copy them

//   if (gb.mycomp != "" && replacefile)
//     //ajaxGen(webserviceprefix + "jsonInit", { comp: mycomp });
//     axios({
//       method: "post",
//       url: gb.webserviceprefix + "jsonInit",
//       data: {
//         comp: gb.mycomp
//       }
//     }).then(response => {
//       console.log(response.data);
//     });
// }

// function findsubid(imc) {
//   const gb = useSelector(state => state.global);
//   if (gb.menutoggle == "") {
//     imc = menuData();
//     let topm = imc.modumenu;
//     let defaultsub = "";
//     if (topm.length > 0) {
//       MultiDispatch({ menuid: topm[0].menuid });
//       defaultsub = topm[0].default;
//     }

//     var subm = imc.modusubmenu;
//     if (subm.length > 0) {
//       var mm = $.grep(subm, function(a) {
//         return a.menuid == gb.menuid;
//       });

//       if (mm.length > 0) {
//         mm.sort(function(a, b) {
//           return parseFloat(a.odr) - parseFloat(b.odr);
//         });
//         MultiDispatch({ subid: mm[0].subid });
//         if (defaultsub != "") MultiDispatch({ subid: defaultsub });
//       }
//     }
//   } else {
//     var topm = imc[gb.menutoggle + "menu"];
//     topm.sort(function(a, b) {
//       return parseFloat(a.odr) - parseFloat(b.odr);
//     });
//     MultiDispatch({ menuid: topm[0].menuid });
//     var mm = $.grep(imc[gb.menutoggle + "submenu"], function(a) {
//       return a.menuid == gb.menuid;
//     });
//     if (mm.length > 0) {
//       MultiDispatch({ subid: mm[0].subid });
//       if (mm[0].hasOwnProperty("default"))
//         MultiDispatch({ subid: mm[0].default });
//     }
//   }
// }
export function getuseridpassport() {
  var login = "";
  if (chkExp !== null) {
    if (!chkExp()) {
      //if expired reset
      toggleLogin("logout");
    } else if (chkExp()) {
      var imcsetting = localStorage.getItem("imcsetting");
      if (imcsetting != null) {
        imcsetting = JSON.parse(imcsetting);
        if (imcsetting.hasOwnProperty("login")) {
          login = imcsetting.login;
          if (imcsetting.login.hasOwnProperty("local"))
            login = imcsetting.login.local;
        }
      }
    }
  }
  return login;
}
function chkExp() {
  var rtn = false;
  var token = localStorage.getItem("token");
  if (token == null) rtn = null;
  const tk = parseJwt(token);
  if (tk) {
    var current_time = Date.now() / 1000;
    if (tk.exp >= current_time) {
      rtn = true;
    }
  }

  return rtn;
}
function parseJwt(token) {
  try {
    // Get Token Header
    const base64HeaderUrl = token.split(".")[0];
    const base64Header = base64HeaderUrl.replace("-", "+").replace("_", "/");
    const headerData = JSON.parse(window.atob(base64Header));

    // Get Token payload and date's
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const dataJWT = JSON.parse(window.atob(base64));
    dataJWT.header = headerData;

    // TODO: add expiration at check ...

    return dataJWT;
  } catch (err) {
    return false;
  }
}
export function getlogin() {
  return getuseridpassport();
}
export const funLoading = run => {
  $("#dvloading").remove();
  //if (isMobile()) {
  $(
    "<img id='dvloading' style='width:50px;z-index:100000' src='/images/loading1.gif'/>"
  )
    .center()
    .appendTo($("form")[0]);
};

export const funStop = () => {
  $("#dvloading").remove();
};
// export function chkwin() {
//   if ($(window).width() < 780) {
//     $("form")
//       .first()
//       .css("width", "");
//     $("#main-menu").removeAttr("style");
//     $("#splogo")
//       .empty()
//       .append(
//         $('<img style="width:50px" src="/images/logo/imc1_1_vertical.png"/>')
//       );
//   } else {
//     $("form")
//       .first()
//       .css({
//         "min-height": "800px",
//         width: "1024px",
//         "background-color": "White",
//         margin: "auto",
//         "border-right": "solid 10px #E3E3E3",
//         "border-bottom": "solid 5px #CECFCE"
//       });
//     $("body").css({ "background-color": "#EFEFE7" });
//     $("#main-menu").css({
//       float: "left",
//       "margin-left": "100px",
//       "z-index": 100,
//       "background-color": "#F0FFF0"
//     });
//     $("#splogo")
//       .empty()
//       .append(
//         $(
//           '<img style="width:50px" src="/images/logo/imc1_1.png"/><img style="width:120px;" src="/images/logo/imcmaster.png"/>'
//         )
//       );
//   }
// }
// // export function btnclickexecute(dtsrc, opt) {
// //   // id, btn, btnobj, ctrtype, options) {
// //   btnclickexecute.btnrun = btnrun;
// //   const gb = useSelector(state => state.global);
// //   funLoading();
// //   let id, btn, btnobj, ctrtype, options;
// //   if (typeof opt != "undefined") {
// //     if (opt.hasOwnProperty("id")) {
// //       id = opt.id;
// //       if (id.substr(0, 1) == "1") id = id.substring(1);
// //     }
// //     if (opt.hasOwnProperty("btn")) btn = opt.btn;
// //     if (opt.hasOwnProperty("btnobj")) btnobj = opt.btnobj;
// //     if (opt.hasOwnProperty("ctrtype")) ctrtype = opt.ctrtype;
// //     if (opt.hasOwnProperty("options")) options = opt.options;
// //   }

// //   if (btnobj.hasOwnProperty("confirm") && btnobj.confirm) {
// //     Swal.fire(
// //       {
// //         title: "Delete ?",
// //         text: "Are you sure to delete ?",
// //         type: "warning",
// //         showCancelButton: true,
// //         confirmButtonColor: "#DD6B55",
// //         confirmButtonText: "Yes, delete it!",
// //         closeOnConfirm: true,
// //         cookiekey: "confirm_" + id
// //       },
// //       function() {
// //         btnrun(dtsrc, id, btn, btnobj, ctrtype, options);
// //       }
// //     );
// //   } else {
// //     btnrun(dtsrc, id, btn, btnobj, ctrtype, gb, options);
// //   }

// //   function btnrun(dtsrc, id, btn, btnobj, ctrtype, gb, options) {
// //     //const gb = useSelector(state => state.global);
// //     if (
// //       $.inArray(btnobj.action, ["selfhide", "selfclose", "selfreload"]) > -1 &&
// //       btnobj.hasOwnProperty("callback")
// //     ) {
// //       console.log("im in", btnobj.callback, id, ctrtype);
// //       var callbtnid = btnobj.callback;
// //       actioncallback("", callbtnid, id, ctrtype);
// //       //$("#action" + callbtnid).attr("rtn", JSON.stringify(calloption));
// //     }
// //     console.log("btnrun");
// //     switch (btnobj.action) {
// //       case "custom":
// //         var script = scriptfilter(btnobj.script, id);
// //         var rtn = $("#action" + btnobj.code).attr("rtn");
// //         funLoading();
// //         //gb.evval("var rtn=" + rtn + ";" + script);
// //         eval("var rtn=" + rtn + ";" + script);
// //         if (btnobj.hasOwnProperty("callback")) {
// //           var callbtnid = btnobj.callback;
// //           setTimeout(function() {
// //             actioncallback("", callbtnid, id, ctrtype);
// //           }, 1500);
// //         }
// //         //else
// //         //    funStop();
// //         break;
// //       case "selfhide":
// //         var thisctr = $("#" + id),
// //           thisparent = $("#parent" + id);
// //         if (
// //           thisctr.parent().hasClass("panel-body") |
// //           thisparent.parent().hasClass("panel-body")
// //         ) {
// //           thisctr.closest(".panel-info").hide();
// //         } else thisctr.hide();
// //         break;
// //       case "selfclose":
// //         if ($("#tmpclose").length > 0) $("#tmpclose").click();
// //         var thisctr = $("#" + id),
// //           thisparent = $("#parent" + id);
// //         if (
// //           thisctr.parent().hasClass("panel-body") |
// //           thisparent.parent().hasClass("panel-body")
// //         ) {
// //           thisctr.closest(".panel-info").remove();
// //         } else thisctr.remove();
// //         if ($("#popupdv" + id).length > 0)
// //           $("#popupdv" + id)
// //             .dialog("destroy")
// //             .remove();
// //         break;
// //       case "selfreload":
// //         initbyctr(ctrtype, id);
// //         break;
// //       case "load":
// //         //btn==codearr
// //         funLoading();
// //         $(btnobj.reloadlist).each(function(q, r) {
// //           var rlist = r.mapfield;
// //           var val = [],
// //             set = {};
// //           $(rlist).each(function(x, y) {
// //             set = {};
// //             switch (ctrtype) {
// //               case "jqgrid":
// //                 set.code = y[1];
// //                 if (btn.hasOwnProperty(y[0])) set.value = btn[y[0]];
// //                 if (y[2] != "") set.value = gb.fixedReplace([y[2]]);
// //                 break;
// //               case "content":
// //                 var dtrow = btn
// //                   .parent()
// //                   .parent()
// //                   .find($(".grid-stack"))
// //                   .attr("dtrow");
// //                 if (dtrow != "") dtrow = JSON.parse(dtrow);
// //                 var valarr = [];
// //                 set.code = y[1];
// //                 if (y[0] != "") valarr = [dtrow[y[0]]];
// //                 else if (y[2] != "") valarr = fixedReplace([y[2]]);
// //                 set.value = valarr;
// //                 break;
// //               default:
// //                 set.code = y[1];
// //                 if (btn.hasOwnProperty(y[0])) set.value = btn[y[0]];
// //                 if (y[2] != "") set.value = fixedReplace([y[2]]);
// //                 break;
// //             }
// //             val.push(set);
// //           });
// //           if (btnobj.hasOwnProperty("callback")) {
// //             var callbtnid = btnobj.callback;
// //             actioncallback("", callbtnid, id, ctrtype);
// //           }
// //           reloadexe(id, val, btnobj.type, btnobj);
// //         });
// //         break;
// //       default:
// //         var param = [],
// //           datacode,
// //           dtype = "";
// //         if (btnobj.hasOwnProperty("dataset")) datacode = btnobj.dataset;
// //         else datacode = datacodereturn(dtsrc);
// //         if (dtsrc.hasOwnProperty("dtype")) dtype = dtsrc.dtype;
// //         if (dtype.indexOf("input") > -1) dtype = "input";
// //         var savedata = actionsavedata(id, btn, ctrtype, options);
// //         var dtlist = datalistreturn(dtsrc);
// //         //field convert
// //         var paramcode,
// //           keycode = [];
// //         var set = {},
// //           param = [];
// //         var inputobject = {},
// //           mapping;
// //         if (btnobj.hasOwnProperty("mapping")) mapping = btnobj.mapping;
// //         $(mapping).each(function(i, k) {
// //           if (k[2]) {
// //             keycode.push(k[0]);
// //           }
// //         });
// //         $(mapping).each(function(i, k) {
// //           //paramlist=parametername,parametervalue,fieldtype(only query case);.... repeat
// //           if (k[1] != null) {
// //             $(savedata).each(function(a, b) {
// //               if (k[1] == b.title) {
// //                 inputobject[k[0]] = b.val;
// //               }
// //             });
// //             //append filter $ started parameter
// //             if (userfilter(k[1]) != k[1]) inputobject[k[0]] = userfilter(k[1]);
// //           }
// //         });
// //         var callbtnid = "";

// //         if (btnobj.hasOwnProperty("callback")) {
// //           callbtnid = btnobj.callback;
// //           datasetUpdate(
// //             dtsrc,
// //             inputobject,
// //             keycode,
// //             btnobj.action,
// //             actioncallback,
// //             [callbtnid, id, ctrtype]
// //           );
// //         } else datasetUpdate(dtsrc, inputobject, keycode, btnobj.action);
// //         break;
// //     }
// //     funStop();
// //   }

//   function actionsavedata(id, btn, ctrtype, options) {
//     if (typeof btn == "string") btn = $("#" + btn);
//     var dt = [];
//     switch (ctrtype) {
//       case "form":
//         var form = btn
//           .parent()
//           .parent()
//           .find("form"); //closest(".form");//.find("form");

//         form.find(".form-group").each(function(i, k) {
//           var lbl = $(k)
//             .find("label:eq(0)")
//             .text();
//           var val = $(k).find(
//             ".control-label, .custom-control,.forminput,.ddlTextbox,.tableinput,input[type='file']"
//           );
//           switch (val.prop("tagName")) {
//             case "LABEL":
//             case "SPAN":
//               if ($(k).find(".custom-control").length > 0) {
//                 let cbval = $(k).find("input:radio:checked");
//                 let ckval = $(k).find("input:checkbox:checked");
//                 if (cbval.length > 0) dt.push({ title: lbl, val: cbval.val() });
//                 else if (ckval.length > 0) {
//                   var arr = [];
//                   ckval.each(function(a, b) {
//                     arr.push($(b).val());
//                   });
//                   dt.push({ title: lbl, val: arr.join(",") });
//                 }
//               } else dt.push({ title: lbl, val: val.text() });
//               break;
//             case "INPUT":
//             case "TEXTAREA":
//               if (val.attr("type") == "file") {
//                 //already uploaded list
//                 var cfile = [],
//                   curfile = val
//                     .closest("div")
//                     .find(".inpfilehidden")
//                     .val();
//                 if (curfile != "") cfile = JSON.parse(curfile);
//                 var set = {};
//                 var valrtn = uploadFile({ comp: getlogin().comp });
//                 set.title = lbl;
//                 var mg = $.merge(valrtn, cfile);
//                 set.val = JSON.stringify(mg);
//                 dt.push(set);
//               } else if (val.hasClass("ddlTextbox")) {
//                 //if tree, then save valinput not txinput
//                 dt.push({ title: lbl, val: val.next().val() });
//               } else if (val.hasClass("tableinput")) {
//                 dt.push({ title: lbl, val: val.val() });
//               } else {
//                 var varr = [];
//                 $(val).each(function(i, k) {
//                   if ($(k).val() != "") varr.push($(k).val());
//                 });
//                 if (varr.length > 0)
//                   dt.push({ title: lbl, val: varr.join("~") });
//               }
//               break;
//             case "MULTISELECT":
//             case "SELECT":
//             case "SELECTIMAGE":
//               let valtxt = val.find("option:selected").text();
//               let valval = val.val();
//               dt.push({ title: lbl, txt: valtxt, val: valval });
//               break;
//           }
//         });
//         break;
//       case "content":
//         var contt = btn.siblings(".grid-stack").attr("dtrow");
//         if (contt != "") contt = JSON.parse(contt);
//         var key = Object.keys(contt);
//         $(key).each(function(i, k) {
//           dt.push({ title: k, val: contt[k] });
//         });
//         break;
//       case "jqgrid":
//         var arr = Object.keys(btn);
//         $(arr).each(function(i, k) {
//           dt.push({ title: k, val: btn[k] });
//         });
//         break;
//       case "jstree":
//         break;
//       case "pivot":
//         break;
//     }
//     return dt;
//   }
// }
