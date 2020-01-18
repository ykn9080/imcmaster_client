// region expand/collapse: ctr+M+O, ctr+M+L
//#region login
import $ from 'jquery'
import {imcsetting,selectimc,jsonReadallMyAjax,jsonDataMyAjax,datasetRead,jsoncombine
    ,jsonUpdateMyAjax,callbackwithdata,checklastupdate,readdata,datalistreturn,datacodereturn,datafilterreturn} from './Common_data.js';
import {menuData,getcompmodule,menuMy,menuMainApp} from './Common_menu.js'
import {multilangReadAjax} from './Common_make.js'
import {getCookie,setCookie} from './default.js'
import {toggleLogin} from '../../start.js'
import {jstreeInit} from './Controls_jstree.js' 
import {googlechartInit} from './Controls_googlechart.js' 
import {fullCalendarInit} from './Controls_fullCalendar.js'
import {contentInit} from './Controls_content.js'
import {mapInit} from './Controls_map.js'
import {pivotInit} from './Controls_pivot.js'
import {formInit} from './Controls_form.js'
import {htmlInit} from './Controls_xtra.js'
import {currentsetting} from '../../config/index.js'
//require ('smartmenus');

//#region pageInit,login
var config = {
    dbtype: "mssql", //mssql,mongodb
    datasrc: "json", //mongodb,text
    server: "node", //c#,node
    authentication: "passport" //c#,passport
}

function declareglobal() {
    imapp = true;
    googlekey = currentsetting.googlekey//"AIzaSyBIJnp5VXSiVEAr8xPM7-OWAYRfdYtlbV0"
    , output = 0;
    contType = "afterlogin",
        umenuid = "", usubid = "", omenuid = "", osubid = "", mtogg = "", hpcd = "";
    tt, cnt = 0, pfx = "./js/";
}
global.menuid = "1",  global.subid = "",global.extlink = [];
global.jsonlang = "";
var passporturl = currentsetting.passporturl;//"http://localhost:3001";
window.webserviceprefix = currentsetting.webserviceprefix;//"http://localhost:3001/"; //"http://www.imcmaster.co.kr/webservice.asmx/";
var googlekey = currentsetting.googlekey;//"AIzaSyBIJnp5VXSiVEAr8xPM7-OWAYRfdYtlbV0";
var extlink = [],
    pfx = "./js/",
    imapp = false;
window.fixedStr = ["$comp", "$name", "$id", "$boss", "$division", "$position"];
window.fixedPeriod = ["$thisYear", "$thisQuarter", "$thisMonth", "$thisWeek", "$thisWeednumber", "$Today", "$Yesterday", "$Tomorrow"];
window.mycomp = "";
window.jsonlist = "";

function makefixedstrlist(type) {
    if (type == "period")
        var list = "this year,$thisYear;this qtr,$thisQuarter;this month,$thisMonth;" +
            "this week,$thisWeek;this weeknum,$thisWeednumber;today,$Today;yesterday$Yesterday;tomorrow,$Tomorrow";
    else
        list = "company,$comp;name,$name;staffid,$id;boss,$boss;department,$division;position level,$position";
    return makeCtr(["select", list, , , ]);
}

function fixedReplace(arr) {
    //replace fixedstr with actual data
    console.log('fixedreplace')
    var log = getlogin();
    $(fixedStr).each(function(i, k) {
        var kk = k.replace("$", ""),
            chg = "";
        if (log.hasOwnProperty(kk))
            chg = log[kk];
        if (typeof arr == "object")
            $(arr).each(function(a, b) {
                if (b == k) {
                    arr.splice(a, 1, chg);
                }
            });
        else if (typeof arr == "string" && arr == k)
            arr = chg;
    });
    return arr;
}

function jscssload(list, callback) {
    var cnt = 0;
    //if (typeof callback == "undefined")
    //    callback = pageInit;
    //if (location.hostname == "") {
    //    webserviceprefix = "https://www.imcmaster.co.kr";
    var pfx = "./js/";
    //}
    $.each(list, function(i, k) {
        switch (k) {
            // case "font-awesome":
            //     cssInsert("font-awesome-css", pfx + "font-awesome/css/font-awesome.min.css");
            //     break;
            // case "switchButton":
            //     cssInsert("switchButton-css", pfx + "switchButton/jquery.switchButton.css");
            //     jscriptInsert("switchButton-js", pfx + "switchButton/jquery.switchButton.js");
            //     break;
            case "themeroller":
                jscriptInsert("themeroller-js", pfx + "jquery-themeroller/jquery.themeswitcher.min.js");
                break;
            case "colresizable":
                cssInsert("colresizable-css", pfx + "colResizable/samples/colResizable.Demo/css/main.css");
                jscriptInsert("colresizable-js", pfx + "colResizable/colResizable-1.6.min.js");
                break;
            case "sweetalert":
                cssInsert("sweetalert-css", pfx + "sweetalert/sweetalert.css");
                jscriptInsert("sweetalert-js", pfx + "sweetalert/sweetalert.min.js");
                break;
            case "jqgrid":
                cssInsert("jqgrid-css", pfx + "jqGrid3/css/ui.jqgrid.css");
                if ($("#jqgrid-js2").length > 0) {
                    $("#jqgrid-js2").remove();
                    $("#jqgrid-js1").remove();
                }
                jscriptInsert("jqgrid-js2", pfx + "jqGrid3/js/i18n/grid.locale-en.js");
                jscriptInsert("jqgrid-js1", pfx + "jqGrid3/js/jquery.jqGrid.src.js");
                break;
            case "fullcalendar":
                cssInsert("fullcalendar-css", pfx + "fullcalendar/fullcalendar.css");
                cssInsert("fullcalendar-wrap-css", pfx + "fullcalendar/fullcalendarwrap.css");
                //cssInsert("fullcalendar-printer-css", pfx+"fullcalendar/fullcalendar.printer.css");
                //jscriptInsert("fullcalendar-jquery-js1", pfx+"fullcalendarjquery.min.js");
                jscriptInsert("fullcalendar-jquery-ui-js1", pfx + "fullcalendar/jquery-ui.js");
                jscriptInsert("fullcalendar-moment-js1", pfx + "fullcalendar/moment.min.js");
                jscriptInsert("fullcalendar-js1", pfx + "fullcalendar/fullcalendar.min.js");
                break;
            case "datepicker":
            case "datetimepicker":
                cssInsert("datetimepicker-css", pfx + "datetimepicker/jquery.datetimepicker.css");
                jscriptInsert("datetimepicker-js1", pfx + "datetimepicker/jquery.datetimepicker.js");
                break;
            case "multipleselect":
                cssInsert("multiple-select-css", pfx + "jquery-multiple-select/multiple-select.css");
                jscriptInsert("multiple-select-js", pfx + "jquery-multiple-select/jquery.multiple.select.js");
                break;
            case "jstree":
                cssInsert("jstree-css", pfx + "jstree/default/style.min.css");
                jscriptInsert("jstree-js", pfx + "jstree/jstree.js");
                styleInsert("jstree-style", ".vakata-context { z-index: 10000001 !important; }.vakata_context { z-index: 10000001 !important; }");
                break;
            case "jqmodal":
                cssInsert("jqmodal-css", pfx + "jqmodal/jqmodal.css");
                jscriptInsert("jqmodal-js", pfx + "jqmodal/jqmodal.js");
                break;
                //case "googlechart":
                //    jscriptInsert("jsapi-js", pfx+"googlechart/jsapi.js");
                //    break;
            case "footable": //for table pagination/sorting
                cssInsert("footable-css", pfx + "footable/css/footable.core.css");
                cssInsert("footable-css1", pfx + "footable/css/footable-demos.css");
                jscriptInsert("footable-js1", pfx + "footable/js/footable.js");
                jscriptInsert("footable-js2", pfx + "footable/js/footable.paginate.js");
                jscriptInsert("footable-js3", pfx + "footable/js/demos.js");
                break;
            case "qtip2":
                cssInsert("qtip2-css", pfx + "qtip2/qtip2.css");
                jscriptInsert("qtip2-js", pfx + "qtip2/qtip2.js");
                break;
            case "simplePagination":
                cssInsert("simplePagination-css", pfx + "simplePagination/simplePagination.css");
                jscriptInsert("simplePagination-js", pfx + "simplePagination/jquery.simplePagination.js");
                break;
                //case "quickPagination":
                //    jscriptInsert("quickpagination_js", pfx + "jquery-quick-pagination-master/js/jquery.quick.pagination.js");
                //    cssInsert("quickpagination-css", pfx + "jquery-quick-pagination-master/css/style.css");
                //    break;
            case "tinymce":
                jscriptInsert("tinymce-js", pfx + "tinymce/tinymce.min.js");
                break;
            case "fancybox":
                cssInsert("fancybox-css", pfx + "fancybox/jquery.fancybox.css");
                jscriptInsert("fancybox-js", pfx + "fancybox/jquery.fancybox.js");
                break;
            case "ddlslick": //dropdown with images
                jscriptInsert("ddlslick-js", pfx + "ddlslick/ddlslick.js");
                break;
            case "colorpicker":
                cssInsert("colorpicker-css", pfx + "colorpicker/css/colorpicker.css");
                jscriptInsert("colorpicker-js", pfx + "colorpicker/js/colorpicker.js");
                break;
            case "lang":
                jscriptInsert("lang-js1", pfx + "jquery-lang-js-master/js/jquery-lang.js");
                jscriptInsert("lang-js2", pfx + "jquery-lang-js-master/js/jquery-cookie.js");
                break;

            case "datatables":
                cssInsert("dataTables-css", pfx + "jquery-dataTables/media/css/jquery.dataTables.css");
                jscriptInsert("dataTables-js", pfx + "jquery-dataTables/media/js/jquery.dataTables.js");
                break;
            case "smartmenus":
                cssInsert("smartmenus-css1", pfx + "smartmenus/css/sm-core-css.css");
                cssInsert("smartmenus-css2", pfx + "smartmenus/css/sm-clean/sm-clean.css");
                cssInsert("smartmenus-css3", pfx + "smartmenus/css/sm-simple/sm-simple.css");
                cssInsert("smartmenus-css4", pfx + "smartmenus/css/sm-mint/sm-mint.css");
                cssInsert("smartmenus-css5", pfx + "smartmenus/css/sm-blue/sm-blue.css");
                jscriptInsert("smartmenus-js", pfx + "smartmenus/jquery.smartmenus.js");

                break;
                //case "googlemap":
                //    jscriptInsert("googlemap-js", "https://maps.googleapis.com/maps/api/js?key="+googlekey);
                //    break;
            case "pivottable":
                cssInsert("pivot-css1", pfx + "pivottable-master/dist/pivot.css");
                jscriptInsert("pivot-js1", pfx + "pivottable-master/dist/pivot.js");
                jscriptInsert("pivot-js2", pfx + "pivottable-master/dist/c3_renderers.js");
                jscriptInsert("pivot-js3", pfx + "pivottable-master/dist/d3_renderers.js");
                jscriptInsert("pivot-js4", pfx + "pivottable-master/dist/gchart_renderers.js");
                jscriptInsert("pivot-js5", pfx + "jquery-ui/jquery-ui-mouse-min.js");
                jscriptInsert("pivot-js6", pfx + "jquery.ui.touch-punch.js");
                break;
        }
    });
    //asp page to use list
    extlink.push({ grp: "Setting", name: "Company", url: "/setting/admin/comp/default.aspx" });
    extlink.push({ grp: "Setting", name: "Staff", url: "/setting/admin/UserAdmin.aspx" });
    extlink.push({ grp: "Setting", name: "Organization", url: "/setting/code/View_menu.aspx?code=DV00000000" });
    extlink.push({ grp: "Setting", name: "Level", url: "/setting/code/View_menu.aspx?code=JP00000000" });
    extlink.push({ grp: "Setting", name: "Product", url: "/setting/code/View_Prod.aspx?master=setting&code=PD00000000" });
    extlink.push({ grp: "Setting", name: "Customer", url: "/setting/code/view_chan.aspx?tab=0&hide=1&code=ch00000000" });
    extlink.push({ grp: "Forecast", name: "Forecast", url: "/setting/goal/reportforecast.aspx" });
    extlink.push({ grp: "Goal", name: "GoalList", url: "/setting/goal/batchgoallist.aspx" });
    extlink.push({ grp: "Goal", name: "GoalEdit", url: "/setting/goal/batchgoaledit1.aspx" });
    extlink.push({ grp: "Survey", name: "SurveyList", url: "/setting/ahp/ahpbldlist.aspx?master=nude" });
    extlink.push({ grp: "Report", name: "Reportlist", url: " /Report/reportview.aspx?code=gotop" });

    if ($.inArray("googlechart", list) > -1)
        google.load('visualization', '1', {
            packages: ['controls', 'charteditor']
                //packages: ['controls']
                ,
            callback: function() {
                console.log('page inited....');
                if (typeof callback == "function")
                    setTimeout(function() {
                        console.log('callback run');
                        callback();
                    }, 2500);
            }
        });

    else if (typeof callback == "function")
        callback();
}

function compInit(replacefile) {
    //chk exist imcdata,imcsetting,imctable,imclist,imcsetting in /comp directory
    //if not copy them
    if (mycomp != "" && replacefile)
        //ajaxGen(webserviceprefix + "jsonInit", { comp: mycomp });
    axios({
        method: "post",
        url: webserviceprefix + "jsonInit",
        data: {
            comp: mycomp
        }
    }).then((response) => {
        console.log(response.data);
    });
}
 menuid = "1", subid = "";
 global.htdefine = "";
var contType = "afterlogin",cnt = 0;

window.pageInit=function() {
    //pageInit.setitem = setitem;
    var constr; //= $("#ctl00_hidConnect").val();
    if (typeof constr == "undefined")
        constr = "Data Source=SQL5004.Smarterasp.net;Initial Catalog=DB_9D66CD_imcmaster;User Id=DB_9D66CD_imcmaster_admin;Password=ykn90809080;";
    //defconnect = "DBtype=mssql;" + constr;
    window.alert = function(text) { console.log('alert message: ' + text); return true; };
    menutoggle = "";

    var login = getuseridpassport();
    if (login == "") {
        menutoggle = "open";
    }
    //else if (localStorage.getItem("imcsetting") == null) {
    //    if (!imapp) {
    //        Login(getlogin().id);
    //        comp = getlogin().comp;
    //        staff = getlogin().id;
    //    }
    //}
    else {

        mycomp = login.comp;
        if (mycomp == "1" | typeof mycomp == "undefined") mycomp = "";
        compInit(true);
        if (localStorage.getItem("imclist") == null) {
            var myinfo = mycomp + "," + login.id;
            if (mycomp == "") myinfo = "";
            jsonReadMyAjax("imclist", myinfo, "", "", "", pageInit.setitem);
        }
    }
    var imc = localStorage.getItem("imctable");

    if (imc == null) {
        //var myinfo = mycomp + "," + getlogin().id;
        //if (mycomp == "") myinfo = "";
        //jsonReadMyAjax("imctable", myinfo, "", "", "", init);
        //return false;
        console.log('로긴후 menu,submenu,control,adminmenu사라지는 버그 시작포인트 찾기')
        imctableload("imctable");
    } 
    else
        process(imc);

    function process(imc){
        var imcjson = JSON.parse(imc);
        // if (menutoggle = "" && !imcjson.hasOwnProperty("menu")) {
        //     imctableload("imctable", pageInit);
        // }
        //if (!imapp) menutoggle = "";
        //if (imapp && localStorage.getItem("imcsetting") != null) menutoggle = "";
        findsubid(imcjson);
        if (imapp)
            initApp();
        else {
            init();
        }
    }

    function imctableload(storename, callback, opt) {
        if (typeof storename == "undefined") storename = "imctable";
        var myinfo = mycomp + "," + login.id;
        if (mycomp == "") myinfo = "";
        //  jsonReadMyAjax(storename, myinfo, "", "", "", init);

        var path = "/data/json/";
        path += storename + ".json";
        axios({
            method: "post",
            url: webserviceprefix + "readDataMy",
            data: {
                path: path,
                myinfo: myinfo,
                dataname: "",
                keycode: "",
                keyvalue: ""
            }
        }).then((response) => {
            jsoncombine(storename, myinfo, response.data,"imctableload");
            var imc = localStorage.getItem("imctable");
            process(imc);
            if (typeof callback == "function")
                callbackwithdata(callback, response.data, opt);
        });

        // testapi();
        return false;
    }

    function initApp() {
        console.log('app?')
        jscssload(["jqgrid", "googlechart", "jstree", "datepicker", "multipleselect", "jqmodal", "sweetalert", "colresizable", "datatables", "pivottable"]);

        google.charts.load('visualization', '1', { packages: ['corechart'] });
        setTimeout(function() {
            menuMainApp();
            initDisplay();
        }, 2500);

    }

    function init() {
        var theme = "cupertino",
            csshref, menu = selectimctable(menutoggle + menuid);
        if (typeof menu != "undefined" && menu.hasOwnProperty("theme")) theme = menu.theme;
        if (theme != "cupertino" && theme != "undefined" && theme != "") {
            $("#jstheme").remove();
            $("#jqtheme").remove();
            csshref = "./js/jquery-ui-themes-1.11.4/" + theme + "/theme.css";
            cssInsert("jstheme", csshref);
        }

        $("#menu").css("height", $(document).height() + "px");
        multilangReadAjax('kr');
        menuInit();

        if (isMobile()) {
            setTimeout(function() {
                $("#main-menu").hide();
                $("#main-menu").css({ "margin-left": "", width: "100%" })
                $(".nav-brand>a").remove()
                $("#main-top").appendTo($(".nav-brand"));
                $("#main-top").css({ "float": "left", "background-color": "#F0FFF0" });
                $("#splogo").empty().append($('<img style="width:50px" src="/images/logo/imc1_1.png"/>'));

                setTimeout(function() {
                    if ($("#main-menu").css("display") == "block")
                        $("#main-menu").hide();
                }, 1000);
            }, 1000);

        }

        chkwin();
         $(window).on("resize", function() {
            chkwin();
        }).resize();
        //if click any places outside popover, close self.
       
        getcompmodule();
        lazyLoadImages();
        if ($('.popover').length > 0)
            $("body").click(function() { $('.popover').popover('hide'); });
    }

    function setitem(data) {
        localStorage.setItem("imclist", JSON.stringify(data));
    }
}

function chkwin() {
    if ($(window).width() < 780) {
        $("form").first().css("width", "");
        $("#main-menu").removeAttr("style");
        $("#splogo").empty().append($('<img style="width:50px" src="/images/logo/imc1_1_vertical.png"/>'));
    } else {
        $("form").first().css({ 'min-height': '800px', width: '1024px', 'background-color': 'White', margin: 'auto', 'border-right': 'solid 10px #E3E3E3', 'border-bottom': 'solid 5px #CECFCE' });
        $("body").css({ "background-color": "#EFEFE7" })
        $("#main-menu").css({ "float": "left", "margin-left": "100px", "z-index": 100, "background-color": "#F0FFF0" });
        $("#splogo").empty().append($('<img style="width:50px" src="/images/logo/imc1_1.png"/><img style="width:120px;" src="/images/logo/imcmaster.png"/>'));
    }

}
function myinfomake(){
     var login = getuseridpassport();
     var mycomp = login.comp;
        if (mycomp == "1" | typeof mycomp == "undefined") mycomp = "";
            var myinfo = mycomp + "," + login.id;
            if (mycomp == "") myinfo = "";
    return myinfo;
}
function isrefreshready() {
    // every 6 hrs refresh imctable setting
    var cook = getCookie("imcvisit"),
        hrs = 0,
        refresh = false;
    if (cook != "") {
        var start = new Date(cook),
            end = new Date(),
            diff = new Date(end - start),
            hrs = diff / 1000 / 60 / 60;
    }
    if (menutoggle != "open" && (hrs > 6 | hrs == 0)) {
        setCookie("imcvisit", makeDateTime(new Date(), "-", "yy-MM-dd hh:mm"));
        refresh = true;
    }
    return refresh;
}

function imcload(imc) {
    /*
    retrieve data & update localStorage data by user status as below
    before login/
    after login
        -free user
        -paid user

        -admin group
        -user group
    */
    //menutoggle = "";
    if (typeof imc == "undefined")
        imc = localStorage.getItem("imctable");
    var pimc, imckey;

    if (imc != null && imc != "") {
        pimc = JSON.parse(imc);
        imckey = Object.keys(pimc);
    }
    checklastupdate("imcsetting");
    //if (localStorage.getItem("imcdata") == null) jsonReadallAjax("imcdata");
    //else { checklastupdate("imcdata"); sec += 300;}
    // if ($.inArray("adminmenu", imckey) == -1) jsonReadallAjax("imctable_admin");
    if ($.inArray("menu", imckey) == -1) {
        jsonReadallMyAjax("imctable");
        sweetmsgautoclose("Welcome", "Enjoy your first visit")
    } else {
        checklastupdate("imctable");
    }
}

function imcloadchk(sname) {
    var rtn = false;
    if (localStorage.getItem(sname) != "" && sname in localStorage) rtn = true;
    return rtn;
}

function getuserid1() {
    var id = "";
    var login = getuseridpassport();
    if (login != "")
        id = login.id;
    return id;
}

function getuserid() {

    return getuseridpassport();
}

function getuseridpassport() {
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
        const base64HeaderUrl = token.split('.')[0];
        const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
        const headerData = JSON.parse(window.atob(base64Header));

        // Get Token payload and date's
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const dataJWT = JSON.parse(window.atob(base64));
        dataJWT.header = headerData;

        // TODO: add expiration at check ...

        return dataJWT;
    } catch (err) {
        return false;
    }
}

function getlogin() {
    return getuseridpassport();
}

function Login(id, pass) {
    console.log('login started')
    if (typeof(pass) == "undefined") pass = '';
    if (id != "")
        $.ajax({
            url: webserviceprefix + "Login",
            data: { id: JSON.stringify(id), pass: JSON.stringify(pass) },
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function(data, status) {
                if (data.d != "") {
                    var dt = JSON.parse(data.d);
                    var dt1 = selectimc("imcsetting", "login");
                    imcsetting("imcsetting", "login", data.d);
                    //localStorage.removeItem("imctable");
                    //pageInit();
                    menutoggle = "";
                }
            },
            error: function(response) {
                var r = jQuery.parseJSON(response.responseText);
                alert("Message: " + r.Message);
                alert("StackTrace: " + r.StackTrace);
                alert("ExceptionType: " + r.ExceptionType);
            }
        });
}

function findsubid(imc) {
    if (menutoggle == "") {
        imc = menuData();
        var topm = imc.modumenu;
        var defaultsub = "";
        if (topm.length > 0) {
            menuid = topm[0].menuid;
            defaultsub = topm[0].default;
        }


        var subm = imc.modusubmenu;
        if (subm.length > 0) {
            var mm = $.grep(subm, function(a) {
                return a.menuid == menuid;
            });

            if (mm.length > 0) {
                mm.sort(function(a, b) {
                    return parseFloat(a.odr) - parseFloat(b.odr);
                });
                subid = mm[0].subid;
                if (defaultsub != "")
                    subid = defaultsub;
            }
        }
    } else {
        var topm=imc[menutoggle + "menu"];
        topm.sort(function(a, b) {
            return parseFloat(a.odr) - parseFloat(b.odr);
        });
        menuid = topm[0].menuid;
        var mm = $.grep(imc[menutoggle + "submenu"], function(a) {
            return a.menuid == menuid;
        });
        if (mm.length > 0) {
             subid = mm[0].subid;
            if(mm[0].hasOwnProperty("default"))
                subid=mm[0].default;
        }
    }
}

function cleanobject(obj) {
    //delete element key without value
    $(Object.keys(obj)).each(function(i, k) {
        if (obj[k] == "" && k != "odr")
            delete obj[k];
    })
    return obj
}

function showcode(setting) {
    if (typeof setting == "string") setting = JSON.parse(setting);
    var contain = $("<div/>");
    var txa = $("<textarea style='width: 100%; min-height:300px;margin: 0; padding: 0; border-width: 0;'/>").appendTo(contain);
    txa.val(JSON.stringify(setting));
    contain.dialog({
        autoOpen: true,
        width: 800,
        modal: true,
        title: 'show source',
        close: function(event, ui) {
            $(this).dialog('destroy').remove();
        },
        buttons: [{
                text: "Copy Clipboard",
                click: function() {
                    txa.select();
                    document.execCommand("copy");
                    $(this).dialog('destroy').remove();
                }
            },
            {
                text: "Close",
                click: function() {
                    $(this).dialog('destroy').remove();
                }
            }

        ]
    });
    console.log(setting);
}

//#endregion

//#region frequently used function
(function($) {
    //visibility: invisible(), visible()
    $.fn.invisible = function() {
        return this.each(function() {
            $(this).css("visibility", "hidden");
        });
    };
    $.fn.visible = function() {
        return this.each(function() {
            $(this).css("visibility", "visible");
        });
    };
}(jQuery));
jQuery.fn.outerHTML = function(s) {
    return s ?
        this.before(s).remove() :
        jQuery("<p>").append(this.eq(0).clone()).html();
};

window.funLoading=(run)=> {
    $("#dvloading").remove();
    //if (isMobile()) {
    $("<img id='dvloading' style='width:50px;z-index:100000' src='/images/loading1.gif'/>").center().appendTo($("form")[0]);
}

window.funStop=()=> {
    $("#dvloading").remove();
}

function userfilter(sign) {
    var rtn = sign;
    $(fixedStr).each(function(i, k) {
        var idx = sign.indexOf(k);
        if (idx > -1)
            rtn = rtn.substr(0, idx) + rep(k) + rtn.substr(idx + k.length, rtn.length)
    });

    function rep(k) {
        var rtn1 = "";
        if ($.inArray(k, fixedStr) > -1) {
            var log = getlogin();
            var key = k.substring(1)
            rtn1 = log[key];
        } else if ($.inArray(k, fixedPeriod) > -1) {
            var dd = k.substring(1).replace("this", "").toLowerCase();
            var d = new Date();
            switch (dd) {
                case "year":
                    rtn1 = d.getFullYear();
                    break;
                case "month":
                    rtn1 = d.getMonth();
                    break;
                case "week":
                    var wk = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"];
                    rtn1 = wk[d.getDay() - 1];
                    break;
                case "weeknumber":
                    rtn1 = d.getDay();
                    break;
                case "today":
                    rtn1 = d.getDate();
                    break;
                case "yesterday":
                    rtn1 = d.addDays(-1);
                    break;
                case "tomorrow":
                    rtn1 = d.addDays(1);
                    break;
            }
        }
        return rtn1;
    }
    return rtn;
}

function scriptfilter(script, id) {
    //var fixedStr = ["$comp", "$name", "$id", "$boss", "$division", "$position"];
    //var fixedPeriod = ["$thisYear", "$thisQuarter", "$thisMonth", "$thisWeek", "$thisWeednumber", "$Today", "$Yesterday", "$Tomorrow"];
    $($.merge(fixedStr, fixedPeriod)).each(function(i, k) {
        script = script.replace(k, userfilter(k));
    });
    script = script.replace("$curid", id);
    var tt = script.split('$');
    for (var q = 0; q < tt.length; q++)
        script = script.replace("$(this)", "$('#" + id + "')");
    return script;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) break;
    }
}

function jsonOrderchange(json, orderlist) {
    //orderlist=["a","b","c"]
    json = JSON.parse(JSON.stringify(json, orderlist));
    return;
}

function tabbedDialog(dia, tab) {

    dia.parent().find('.ui-dialog-titlebar-close').prependTo('#' + tab.attr("id"));
    dia.closest('.ui-dialog').children('.ui-dialog-titlebar').remove();
    //var tabid = $("#tabs-mycal");
    tab.find('.ui-dialog-titlebar-close').css({ top: '20px', margin: '-10px 5px 0 0' });
    dia.css({ padding: 0 });

}

function getUrlVars() {
    /*
    ex:http://www.example.com/?me=myValue&name2=SomeOtherValue
    return:{
            "me"    : "myValue",
            "name2" : "SomeOtherValue"
        }
        getUrlVars()[0]="me";
        getUrlVars()["me"]="myValue;
    */
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getURLParam(strParamName) {
    //parameter fetch
    // http://localhost/test.php?type=view&page=2 일경우
    //getURLParam("type")
    var strReturn = "";
    var strHref = window.location.href;
    var bFound = false;

    var cmpstring = strParamName + "=";
    var cmplen = cmpstring.length;

    if (strHref.indexOf("?") > -1) {
        var strQueryString = strHref.substr(strHref.indexOf("?") + 1);
        var aQueryString = strQueryString.split("&");
        for (var iParam = 0; iParam < aQueryString.length; iParam++) {
            if (aQueryString[iParam].substr(0, cmplen) == cmpstring) {
                var aParam = aQueryString[iParam].split("=");
                strReturn = aParam[1];
                bFound = true;
                break;
            }

        }
    }
    if (bFound == false) return null;
    return strReturn;
}

function browserWidth() {
    //browser width
    if (self.innerHeight) {
        return self.innerWidth;
    }

    if (document.documentElement && document.documentElement.clientHeight) {
        return document.documentElement.clientWidth;
    }

    if (document.body) {
        return document.body.clientWidth;
    }
}

function browserHeight() {
    if (self.innerHeight) {
        return self.innerHeight;
    }

    if (document.documentElement && document.documentElement.clientHeight) {
        return document.documentElement.clientHeight;
    }

    if (document.body) {
        return document.body.clientHeight;
    }
}

function missingArray(old_array, new_array) {
    //var old_array = [1, 2, 3], new_array = [1, 3, 4] return:[2]
    return $(old_array).not(new_array).get();
}

function countObject(object) {
    var element_count = 0;
    for (e in object) { if (object.hasOwnProperty(e)) element_count++; }
    return element_count;
}

function convertId1(addid) {
    //combine pathname + addid
    if (typeof(addid) === "undefined") addid = "";
    else addid = "_" + addid
    var pathname = window.location.pathname;
    pathname = pathname.substring(pathname.lastIndexOf("/") + 1)
    return pathname + addid;
}

function convertId(gridid) {
    //combine pathname + grid id
    //if (typeof (ridid) === "undefined") gridid = ""; else gridid="_"+gridid
    var pathname = window.location.pathname;
    pathname = pathname.substring(pathname.lastIndexOf("/") + 1)
    return pathname + "_" + gridid;
}

function isNumber(o) {
    return !isNaN(o - 0) && o !== null && o !== "" && o !== false;
}

function isDate(val) {
    var d = new Date(val);
    return !isNaN(d.valueOf());
}

function isBool(val) {
    return typeof(val);
}

function isMobile() {
    var filter = "win16|win32|win64|mac|macintel";
    var rtn;
    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            //mobile
            rtn = true;
        } else {
            //pc
            rtn = false;
        }
    }
    return rtn;
}

function imApp() {
    //is app?
    var rtn = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        rtn = true;
    }
    return rtn;
}

function isOdd(num) { return num % 2; }

function isColumntype(collist, type) {
    var chk = true;
    $.each(collist, function(i, k) {
        switch (type) {
            case "number":
                if (!isNumber(k))
                    chk = false;
                break;
            case "datetime":
                if (!isDate(k) | isNumber(k))
                    chk = false;
                break;
            case "bool":
                if (isBool(k) != "boolean")
                    chk = false;
                break;
        }
        if (!chk) return false;
    });
    return chk;
}

function arraychkexist(arraylist, element) {
    //element exist in a array
    var rtn = false;
    $.each(arraylist, function(i, k) {
        if (k == element)
            rtn = true;
    });
    return rtn;
}

function arraycheckexist(arr, val) {
    var chk = false;

    $.each(arr, function(i, k) {
        if (k != "undefined" && k.length > 0 && k != "" && k.indexOf(val) > -1)
            chk = true;
    });
    return chk;
}

function rgb2hex(rgb) {
    if (rgb.search("rgb") == -1) {
        return rgb;
    } else {
        rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);

        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
}

function scriptExists(srcarr, autoinsert) {
    var rtn = false;

    $.each(srcarr, function(i, src) {

        //src= fullurl;exist check할 partial url(ex:"/js2/jqGrid/css/ui.jqgrid.css" vs "css/ui.jqgrid.css")
        var spsrc = src.split(';');
        if (spsrc[1] != "")
            var value = spsrc[1];
        else
            value = src.substring(src.lastIndexOf('/') + 1);

        $('srcipt').each(function() {
            if ($(this).attr("src").indexOf(value) > -1) {
                rtn = true;
                if (typeof(autoinsert) != "undefined" && autoinsert == true)
                    jsInsert(spsrc[0]);
            }
        });
        $('link').each(function() {
            if ($(this).attr("href").indexOf(value) > -1) {
                rtn = true;
                if (typeof(autoinsert) != "undefined" && autoinsert == true)
                    cssInsert(spsrc[0]);
            }
        });
    });
    return rtn;
}

function cssInsert(id, csshref) {
    //   css dynamic insert
    //    cssInsert("/App_Themes/table-samples/css/example.css");
    if ($("#" + id).length == 0) {
        var ss = document.createElement("link");
        ss.type = "text/css";
        ss.id = id;
        ss.rel = "stylesheet";
        ss.href = csshref;
        if (ss != null)

            document.getElementsByTagName("head")[0].appendChild(ss);
        return true;
    } else
        return false;
}

function styleInsert(id, style) {
    // style dynamic insert
    // style="div {border: 2px solid black; background-color: blue;}"
    // styleInsert(style);
    if (document.getElementById(id) == 'undefined' || document.getElementById(id) == null) {
        var sheet = document.createElement('style')
        sheet.innerHTML = style;
        sheet.id = id;
        document.body.appendChild(sheet);
        return true;
    }
    return false;
}

function jsfunctionInsert(id, script) {
    // js script dynamic insert
    // script="function xy(){};"
    // jsfunctionInsert(script);
    if (document.getElementById(id) == 'undefined' || document.getElementById(id) == null) {
        var sheet = document.createElement('script')
        sheet.innerHTML = script;
        sheet.id = id;
        document.body.appendChild(sheet);
        return true;
    }
    return false;
}

function jsInsert(jssrc) {
    //   js dynamic insert
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.setAttribute("src", jssrc)
    document.getElementsByTagName("head")[0].appendChild(js);
}

function jscriptInsert(id, jscript, callback) {
    if (document.getElementById(id) == 'undefined' || document.getElementById(id) == null) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = jscript;
        script.id = id;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
        if (typeof callback === "object") {
            callback();
            console.log('callback running')
        }

        return true;
    } else
        return false;
}

function documentreadyInsert(id, jscript) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = id;
    script.text = '$(document).ready(function(){' + jscript + '});';
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
}

function numberOnly(evt) {
    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode != 46)) {
        //alert("숫자만 입력가능합니다.");
        swal({ title: "Only Number allowed!", text: "I will close in 2 seconds.", timer: 2000, showConfirmButton: false });
        return false;
    }
    return true;
}

function idMake(option) {
    var d = new Date();
    var yr = d.getFullYear().toString().substr(2, 2)
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hr = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    var msec = d.getMilliseconds();
    var id = yr +
        (('' + month).length < 2 ? '0' : '') + month +
        (('' + day).length < 2 ? '0' : '') + day +
        hr + min + sec;
    if (typeof option != "undefined") {
        //leaver the num from right side
        id += msec;
        var num = id.length - parseInt(option);
        id = id.substring(num);
    }
    return id;
}

function makeDateTime(d, seperator, format) {
    var sep = "/";
    if (typeof seperator != "undefined") sep = seperator;

    var yr = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hr = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    var y = yr + sep,
        mm = (('' + month).length < 2 ? '0' : '') + month + sep,
        dd = (('' + day).length < 2 ? '0' : '') + day + " ",
        h = (('' + hr).length < 2 ? '0' : '') + hr + ":",
        m = (('' + min).length < 2 ? '0' : '') + min + ":",
        s = (('' + sec).length < 2 ? '0' : '') + sec;
    var dt = y + mm + dd + h + m;
    switch (format) {
        case "yyyy-MM-dd hh:mm:ss":
            dt = dt + s;
            break;
        case "yy-MM-dd hh:mm:ss":
            dt = dt.substring(2) + s;
            break;
        case "yy-MM-dd hh:mm":
            dt = dt.substring(2);
            break;
        case "yyyy-MM-dd":
            dt = y + mm + dd;
            break;
        case "yy-MM-dd":
            dt = y.substring(2) + mm + dd;
            break;
    }
    return dt;
}

function friendlydate(d) {
    var rtn = "n/a";
    if (typeof d != "undefined" && d != "") {
        rtn = makeDateTime(new Date(d), "-", "yy-MM-dd hh:mm")
        var diff = new Date() - new Date(d);
        var sec = Math.floor(diff / 1000),
            min = Math.floor(sec / 60),
            hr = Math.floor(sec / 3600),
            day = Math.floor(hr / 24);
        if (min < 1)
            rtn += "(" + sec + " secs ago)";
        else if (min < 60)
            rtn += "(" + min + " mins ago)";
        else if (hr >= 1 && day < 1) {
            var mm = Math.floor((sec - hr * 3600) / 60);
            rtn += "(" + hr + "hr" + mm + "min ago)";
        } else if (day >= 1) {
            var hhr = Math.floor(hr - day * 24);
            rtn += "(" + day + "day " + hhr + " hr ago)";
        }
    }
    return rtn;
}
Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this
}
Date.prototype.addHours = function(h) {
    this.setHours(this.getHours() + h);
    return this;
}
Date.prototype.addMinutes = function(m) {
    this.setMinutes(this.getMinutes() + m);
    return this;
}
Date.prototype.formatDate = function(format) {
    /*
    d = new Date(); console.log(d.formatDate("dd/MM/yyyy hh:mm:ss t"));
    Return -> "30/10/2012 11:49:49 pm"
    d = new Date(); console.log(d.formatDate("dd/MM/yyyy HH:mm:ss"));
    Return -> "30/10/2012 23:50:53"
    */
    var date = this,
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    if (!format) {
        format = "yyyy/MM/dd HH:mm";
    }

    format = format.replace("MM", month.toString().replace(/^(\d)$/, '0$1'));

    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
    }

    format = format.replace("dd", day.toString().replace(/^(\d)$/, '0$1'));

    if (format.indexOf("t") > -1) {
        if (hours > 11) {
            format = format.replace("t", "pm");
        } else {
            format = format.replace("t", "am");
        }
    }

    if (format.indexOf("HH") > -1) {
        format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    }

    if (format.indexOf("hh") > -1) {
        if (hours > 12) {
            hours -= 12;
        }

        if (hours === 0) {
            hours = 12;
        }
        format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
    }

    if (format.indexOf("mm") > -1) {
        format = format.replace("mm", minutes.toString().replace(/^(\d)$/, '0$1'));
    }

    if (format.indexOf("ss") > -1) {
        format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    }

    return format;
};
String.prototype.capitalize = function() {
    //first letter capitalize
    //"hello world".capitalize();  =>  "Hello world"
    return this.charAt(0).toUpperCase() + this.slice(1);
}
Array.prototype.transpose || (Array.prototype.transpose = function() {
    //transpose row to column
    //var a = [ [1, 2, 3], [4, 5, 6]];
    //var at = a.transpose();
    if (!this.length) {
        return [];
    }

    if (this[0] instanceof Array) {
        var tlen = this.length,
            dlen = this[0].length,
            newA = new Array(dlen);
    } else {
        throw new Error("二次元配列をクレ！（・∀・）");
    }

    for (var i = tlen; i--;) {
        if (this[i].length !== dlen) throw new Error("Index Error! 不揃いな林檎たち（・∀・）");
    }

    for (var i = 0; i < dlen; ++i) {
        newA[i] = [];
        for (var j = 0, l = tlen; j < l; j++) {
            newA[i][j] = this[j][i];
        }
    }

    return newA;
});
// Array.prototype.diff = function(a) {
//     //[1,2,3,4,5,6].diff( [3,4,5] );
//     // => [1, 2, 6]
//     return this.filter(function(i) { return a.indexOf(i) < 0; });
// };
Array.prototype.diff = function(arrays) {
    var items = [].concat.apply(this, arguments);
    var diff = [].slice.call(items), i, l, x, pos;

    for (x = 0, i = 0, l = items.length; i < l; x = 0, i++) {
        while ((pos = diff.indexOf(items[i])) > -1) {
            diff.splice(pos, 1) && x++;
        }
        if (x === 1) diff.push(items[i]);
    }
    return diff;
};
jQuery.fn.center = function() {
    //align element center of page
    //ex:$(element).center();
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
        $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
    return this;
}
var checkJSON = function(m) {
    //check string is object type or just string
    //ex:checkJSON('hi')=false;checkJSON("{'obj':'goog'}")=true
    if (typeof m == 'object') {
        try { m = JSON.stringify(m); } catch (err) { return false; }
    }

    if (typeof m == 'string') {
        try { m = JSON.parse(m); } catch (err) { return false; }
    }

    if (typeof m != 'object') { return false; }
    return true;

};

function populate1(id, content, code, name, selcode) {
    var selected = "";
    $(id).empty();
    var newOptions = '<option value="">-- Select --</option>';
    for (i in content) {
        if (selcode == content[i][code]) selected = "selected";
        newOptions += '<option ' + selected + ' value="' + content[i][code] + '">' + content[i][name] + '</option>';
        selected = "";
    }
    $(id).append(newOptions);
    if (typeof $(id).selectmenu() !== "undefined") {
        $(id).selectmenu("refresh", true);
    }
    //$(id).selectmenu('refresh');
    //$(id).attr("selectedIndex", -1)
}

function populate(jsondata, id, topmsg, selectedvalue) {
    var selected = "";
    var select = $('#' + id);
    select.empty();
    if (topmsg != "") {
        var newOptions = '<option value="">' + topmsg + '</option>';
        select.append(newOptions);
    }
    //select.find('option').remove();
    $.each(jsondata, function(key, data) {
        selected = "";
        if (data.code == selectedvalue) selected = "selected";
        select.append('<option ' + selected + ' value=' + data.code + '>' + data.name + '</option>');
    })
}

function stripTextonly(element) {
    //from node element return text only part
    var rtn = element.clone() //clone the element
        .children() //select all the children
        .remove() //remove all the children
        .end() //again go back to selected element
        .text();
    return rtn;
}

function removeblankarr(arr) {
    //var arr = ["Lorem", "", "ipsum"]-->["Lorem", "ipsum"]
    arr = $.grep(arr, function(n) {
        return (n);
    });
    return arr;
}

function cleanupstorage(json) {
    var list = Object.keys(json);
    $(list).each(function(i, k) {
        json[k] = removeblankarr(json[k]);
    });
    return json;
}

function cleanupimctable(json) {
    var list = Object.keys(json);
    $(list).each(function(i, k) {
        json[k] = removeblankarr(json[k]);
        $(json[k]).each(function(a, b) {
            if (!b.menuid)
                json[k].splice(a, 1)

            switch (k) {
                case "control":
                case "admincontrol":
                    if (typeof b.menuid == "undefined" | typeof b.subid == "undefined" | typeof b.dvid == "undefined")
                        json[k].splice(a, 1);
                    break;
            }

        });
    });
    return json;
}

function auto_grow(element) {
    //AUTO SCROLL EXPAND TEXTAREA
    //<textarea onkeyup="auto_grow(this)"></textarea>
    //element.style.height = "15px";
    //element.style.height = (element.scrollHeight) + "px";
    var ht = element.prop("scrollHeight");
    //if (ht < 10) ht = 10;
    element.css({ "height": ht + 5 + "px" });
}

function makedialogoption() {
    //make default dialog option
    return {
        autoOpen: true,
        appendTo: "body",
        modal: true,
        height: 400,
        width: 800,
        title: "title area",
        close: function(event, ui) {
            $(this).dialog('destroy').remove();
        },
        buttons: [{
                text: "Close",
                click: function() {
                    $(this).dialog('destroy').remove();
                }
            },
            {
                text: "Save",
                click: function() {
                    $(this).dialog('destroy').remove();
                }
            }
        ]
    }
}

function toggleInsert(list, option) {
    //  list:option list ";" seperated,option:id:select id,width of select, placeholder: if any
    //example: toggleInsert("selhelp","2;3;4",{width:"col-6",placeholder:"select one"}
    //after insert toggleInsert,
    var id = "",
        wth = "col-11",
        placeholder = "placeholder:select";
    if (typeof option != "undefined") {
        if (option.hasOwnProperty("id")) id = option.id;
        if (option.hasOwnProperty("width")) wth = option.width;
        if (option.hasOwnProperty("placeholder")) {
            placeholder = "placeholder:" + option.placeholder;
            if (option.placeholder == "")
                placeholder = "";
        }
    }
    return "<div class='form-inline'>" + makeCtr(["select", list + ";custom", id, wth, placeholder]) + "</div>";
}

function toggleTable(table, colindex, valuearr, popover) {
    //batch toggle Init inside table
    console.log(valuearr)
    var opt;
    if (typeof popover != "undefined") {
        opt = {};
        opt.popover = true;
    }
    // table:table object, colindex:index of columnn select control located, valuearr:value of each control in array
    table.find("tbody>tr").each(function(i, k) {
        $(k).find("td:eq(" + colindex + ") select").each(function(a, b) {
            if (typeof valuearr != "undefined")
                toggleSelect($(b), valuearr[i], opt);
            else
                toggleSelect($(b), "", opt);
        });

    });
}

function toggleSelect(sel, curval, options) {
    //toggle b/w "select" and "input"
    //curval: current value
    //option:iconclass,customvalue,width
    //example:$(tb.find("tbody>tr>td:nth-child(2)>select")).each(function (i, k) { toggleSelect($(this))});
    var customvalue = "custom",
        iconclass = "fa fa-remove",
        wth = "col-10",
        popover = false;
    if (typeof options != "undefined") {
        if (options.hasOwnProperty("customvalue")) customvalue = options.customvalue;
        if (options.hasOwnProperty("iconclass")) iconclass = options.iconclass;
        if (options.hasOwnProperty("width")) wth = options.width;
        if (options.hasOwnProperty("popover")) popover = options.popover;
    }
    var id = "";
    if ($.type(sel) == "string") {
        id = sel;
        sel = $("#" + sel);
    } else {
        id = sel.attr("id");
    }
    var vallist = []
    $(sel.find("option")).each(function(i, k) {
        if ($(k).val() != "")
            vallist.push($(k).val());
    })

    var icon = $("<i class='" + iconclass + " imdim'/>");
    if (typeof curval != "undefined" && curval != "null" && curval != null && curval != "" && $.inArray(curval, vallist) == -1) {
        var td = sel.parent();
        var inp = $("<input class='form-control " + wth + " marginright' id='inp" + id + "' value='" + curval + "'/>");
        td.prepend(inp);
        icon.insertAfter(inp);
        icon.on("click", function() {
            var clon = sel.clone();
            td.prepend(clon);
            $(this).prev().remove();
            $(this).parent().find(".fa-question").remove();
            $(this).remove()
            toggleSelect(clon);

        });

        sel.remove();
    } else {
        sel.change(function() {
            console.log(customvalue)
            if ($(this).val() == customvalue) {
                $("<input class='form-control " + wth + " marginright' id='inp" + id + "' />").insertBefore($(this));
                icon.insertAfter($(this));
                $(this).remove();
                icon.on("click", function() {
                    var clon = sel.clone();
                    clon.insertAfter($(this));
                    toggleSelect(clon);
                    $(this).parent().find(".fa-question").remove();
                    $(this).prev().remove();
                    $(this).remove()
                });
            }
        });
        if (typeof curval != "undefined" && curval != "" && curval != "null" && curval != null)
            sel.val(curval);
        if (popover) togglePopover(sel);
    }

}

function togglePopover(sel) {
    var qstn = $("<i class='fa fa-question imdim marginleft'/>");
    var td = sel.parent();
    qstn.insertAfter(td.find("input"));
    sel.change(function() {
        if ($(this).val() == "custom") {
            qstn.appendTo(td);
        }
    });


    var fixedStr11 = ["$comp:company id of user", "$name:user name", "$id:user id", "$boss:boss id of user", "$division:division id of user", "$position:position id of user"];
    var fixedPeriod11 = ["$thisYear", "$thisQuarter", "$thisMonth", "$thisWeek", "$thisWeednumber", "$Today", "$Yesterday", "$Tomorrow"];
    var str = "<b>User Related</b><br/>",
        str1 = "<br/><b>Date Related</b><br/>";
    $(fixedStr11).each(function(i, k) {
        str += k + "<br />"
    });
    $(fixedPeriod11).each(function(i, k) {
        str1 += k + "<br />"
    });

    qstn.popover({
        title: "Abbrebiation ",
        placement: "top",
        trigger: "click",
        container: "body",
        html: true,
        animation: false,
        content: str + str1
    });
    styleInsert("popover_css", ".popover{z-index: 100000 !important;}");
    $("body").click(function(e) {
        if ($.inArray(e.target.nodeName, ["I", "INPUT"]) == -1) {
            $('.popover').popover('hide');
        }
    });
}

function toggleReturn(id) {
    var rtn = "";
    //chk select exist
    if ($("#" + id).length > 0)
        rtn = $("#" + id).val();
    else if ($("#inp" + id).length > 0)
        rtn = $("#inp" + id).val();
    return rtn;
}
jQuery.fn.rowspan = function(colIdx) {
    return this.each(function() {

        var that;
        $('tr', this).each(function(row) {
            $('th:eq(' + colIdx + ')', this).filter(':visible').each(function(col) {
                if ($(this).html() == $(that).html()) {
                    rowspan = $(that).attr("rowSpan");
                    if (rowspan == undefined) {

                        $(that).attr("rowSpan", 1);
                        rowspan = $(that).attr("rowSpan");
                    }
                    rowspan = Number(rowspan) + 1;
                    $(that).attr("rowSpan", rowspan); // do your action for the colspan cell here
                    $(this).hide(); // .remove(); // do your action for the old cell here
                } else {
                    that = this;
                }
                that = (that == null) ? this : that; // set the that if not already set
            });
        });

    });
}
jQuery.fn.colspan = function(rowIdx) {
    return this.each(function() {

        var that;
        $('tr', this).filter(":eq(" + rowIdx + ")").each(function(row) {
            $(this).find('th').filter(':visible').each(function(col) {
                if ($(this).html() == $(that).html()) {
                    colspan = $(that).attr("colSpan");
                    if (colspan == undefined) {
                        $(that).attr("colSpan", 1);
                        colspan = $(that).attr("colSpan");
                    }
                    colspan = Number(colspan) + 1;
                    $(that).attr("colSpan", colspan);
                    $(this).hide(); // .remove();
                } else {
                    that = this;
                }
                that = (that == null) ? this : that; // set the that if not already set
            });
        });

    });
}

function mergeCells(cells, separator) {

    var data = [];

    $.each(cells, function(i, item) {
        data.push(item[0].innerHTML);
    });

    var result = $('<td/>', {
        'html': data.join(separator)
    });

    return result;
}

function splitCell(cell, separator) {

    var result = "";
    var data = (cell[0].innerHTML).split(separator);
    $.each(data, function(i, item) {
        result = result + "<td>{0}</td>".format(item);
    });

    return result;
}

function wrapouter(obj, type, divid, tabname) {
    /*
    wrap around each object inside tableinsert
    obj:outer div object, type:rectangle,round,tab,divid:div id inside obj,tabname:tabtitle for divid
    */
    switch (type) {
        case "rect":
            obj.tabs();
            obj.removeClass("ui-corner-all");
            break;
        case "round":
            obj.tabs();
            break;
        case "tab":
            $("#ul" + divid).first().remove();
            obj.prepend($("<ul id='ul" + divid + "'><li><a href='#'" + divid + ">" + tabname + "</a></li></ul>"));
            obj.tabs();
            break;
    }
}

function selectupdate(obj, optarr, option) {
    //obj:select object, optarr:option array[[text,value]],option.updatetype:prepend,append,replace
    //if optarr item length==1 then value=text;
    var updatetype = "replace";
    if (typeof option != "undefined") {
        if (option.hasOwnProperty("updatetype")) updatetype = option.updatetype;
    }
    //create optionlist
    if (updatetype == "replace") {
        obj.empty();
        obj.prepend($("<option disabled selected>Select</option>"));
    }
    if (optarr.length > 0)
        $(optarr).each(function(a, b) {
            var bb = b.split(',');
            var txt = bb[0],
                val = bb[0];
            if (bb.length > 1) val = bb[1];
            var option1 = new Option(txt, val);
            switch (updatetype) {
                case "replace":
                case "append":
                    obj.append($(option1));
                    break;
                case "prepend":
                    obj.prepend($(option1));
                    break;
            }
        });
}

//chk click point is within div
function isinsidediv(e, dvobj) {
    //div top,left offset
    var dvset, eset, ht, wth, rtn = false;
    dvset = dvobj.offset();
    if (typeof dvset != "undefined") {
        ht = dvobj.height();
        wth = dvobj.width();
        eset = $(e.target).offset();
        if (eset.left >= dvset.left && eset.left <= dvset.left + wth &&
            eset.top <= dvset.top && eset.top >= dvset.top - ht)
            rtn = true;
        console.log('dvpos:', dvobj.position(), 'epos:', $(e.target).position(), 'dvset:', dvset, 'eset:', eset, 'ht:', ht, 'wth:', wth, 'rtn:', rtn)
    }
    return rtn;
}

//triggerevent:when event happend triggered
//$(sel).bind("triggerevent", function () { //action});

//#region comment parser
// This jQuery plugin will gather the comments within
// the current jQuery collection, returning all the
// comments in a new jQuery collection.
//
// NOTE: Comments are wrapped in DIV tags.
//ex:  var jComments = $( "#template" ).comments();
// <div id="template" style="display: none ;">
//    <!--
//        <li>This is an LI template.</li>
//    -->
//</div>
jQuery.fn.comments = function(blnDeep) {
    var blnDeep = (blnDeep || false);
    var jComments = $([]);

    // Loop over each node to search its children for
    // comment nodes and element nodes (if deep search).
    this.each(
        function(intI, objNode) {
            var objChildNode = objNode.firstChild;
            var strParentID = $(this).attr("id");

            // Keep looping over the top-level children
            // while we have a node to examine.
            while (objChildNode) {

                // Check to see if this node is a comment.
                if (objChildNode.nodeType === 8) {

                    // We found a comment node. Add it to
                    // the nodes collection wrapped in a
                    // DIV (as we may have HTML).
                    jComments = jComments.add(
                        "<div rel='" + strParentID + "'>" +
                        objChildNode.nodeValue +
                        "</div>"
                    );

                } else if (
                    blnDeep &&
                    (objChildNode.nodeType === 1)
                ) {

                    // Traverse this node deeply.
                    jComments = jComments.add(
                        $(objChildNode).comments(true)
                    );

                }
                console.log(objChildNode.nodeType, objChildNode.nodeName, objChildNode.nodeValue)
                // Move to the next sibling.
                objChildNode = objChildNode.nextSibling;

            }

        }
    );

    // Return the jQuery comments collection.
    return (jComments);
}
// Array.prototype.move = function(from, to) {
//     //var arr = ['a', 'b', 'c', 'd', 'e'];
//     //arr.move(3, 1);//["a", "d", "b", "c", "e"]
//     this.splice(to, 0, this.splice(from, 1)[0]);
//     return this;
// };
 // Array.prototype.move = function (old_index, new_index) {
 //    console.log("old_index:",old_index,"newindex:",new_index, "this:",this);
 //        if ( this.length === 0 ) {
 //            return this;
 //        }
 //        while (old_index < 0) {
 //            old_index += this.length;
 //        }
 //        while (new_index < 0) {
 //            new_index += this.length;
 //        }
 //        if (new_index >= this.length) {
 //            var k = new_index - this.length;
 //            while ((k--) + 1) {
 //                this.push(undefined);
 //            }
 //        }
 //        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
 //        return this; // for testing purposes
 //    };
Array.prototype.move = function (pos1, pos2) {
    // local variables
    var i, tmp;
    // cast input parameters to integers
    pos1 = parseInt(pos1, 10);
    pos2 = parseInt(pos2, 10);
    // if positions are different and inside array
    if (pos1 !== pos2 &&
        0 <= pos1 && pos1 <= this.length &&
        0 <= pos2 && pos2 <= this.length) {
        // save element from position 1
        tmp = this[pos1];
        // move element down and shift other elements up
        if (pos1 < pos2) {
            for (i = pos1; i < pos2; i++) {
                this[i] = this[i + 1];
            }
        }
        // move element up and shift other elements down
        else {
            for (i = pos1; i > pos2; i--) {
                this[i] = this[i - 1];
            }
        }
        // put element from position 1 to destination
        this[pos2] = tmp;
    }
}
//#endregion
//#endregion

//#region action execute & save
function actionbutton(data, id, gdt, container1, options) {
    //attach action button or icon/link to init page
    var ctrtype = "",
        datacode = "",
        event;
    if (typeof gdt == "undefined") return false;
    if (gdt.hasOwnProperty("ctrtype")) ctrtype = gdt.ctrtype;
    if (gdt.hasOwnProperty("eventlist")) event = gdt.eventlist;
    if (ctrtype == "content") container1 = $("#" + id).find(".ui-tabs-panel");
    if (typeof event != "undefined" && event != "") {
        var reverse = JSON.parse(JSON.stringify(event)).reverse(),
            btn, btndiv;
        anchorbtn(id, event, ctrtype);

        $(container1).each(function(i, container) {
            if ($(container).find("#top" + id).length == 0) {
                $("<div style='margin:5px 0 5px 0;' id='top" + id + "'/>").prependTo(container);
                $("<div style='margin-bottom:5px' id='btm" + id + "' />").appendTo(container);
                // $("<div style='clear:both'/>").insertAfter($("#btm" + id));
                attachbtn(id, container, event, reverse, ctrtype);
            }
        });
    }

    function topOrbtm(id, btnobj) {
        var rtn = $("#btm" + id);
        if (typeof btnobj != "undefined" && btnobj.hasOwnProperty("position"))
            if (btnobj.position.indexOf("top") > -1) rtn = $("#top" + id);
        return rtn;
    }

    function anchorbtn(id, event, ctrtype) {
        $(event).each(function(a, btnobj) {
            var position = "";
            if (btnobj.hasOwnProperty("position")) position = btnobj.position;
            $("#" + id).find("*").each(function(i, k) {
                if ($(k).outerHTML() == position) {
                    var btn = $(k);
                    if (btnobj.hasOwnProperty("callback"))
                        options.callback = btnobj.callback; // callbackfind(btnobj.callback);
                    btnclickevent(id, btn, btnobj, ctrtype, "", options);
                }
            });
        });
    }

    function attachbtn(id, container, event, reverse, ctrtype) {
        var btndiv, dvbtn1, dvbtn2, dvbtn3;
        //if not button return false
        $(event).each(function(i, btnobj) {
            var position = "";
            if (btnobj.hasOwnProperty("position")) position = btnobj.position;
            if (position != "" && $.inArray(position, ["topright", "topleft", "bottomleft", "bottomright"]) == -1) return false;
            if (position != "" && $.inArray(position, ["topright", "bottomright"]) == -1) {
                //if ($.inArray(btnobj.position, ["topleft", "bottomleft", "create", "rename", "delete"]) > -1) {
                dvbtn1 = "";
                btndiv = topOrbtm(id, btnobj);
                var tn = makebtn(btndiv, btnobj);
                btn = tn.btn;
                if (tn.hasOwnProperty("btndiv")) dvbtn1 = tn.btndiv;
                if (btnobj.hasOwnProperty("dataset")) datacode = btnobj.dataset;
                switch (position) {
                    case "topleft":
                        if (dvbtn1 != "")
                            $(container).prepend(dvbtn1);
                        else
                            $(container).prepend(btn);
                        break;
                    case "bottomleft":
                        if (dvbtn1 != "")
                            $(container).append(dvbtn1);
                        else
                            $(container).append(btn);
                        break;
                }
                if (typeof btn == "object") {
                    btn.css({ margin: "3px 0 3px 0" });
                    if (btnobj.hasOwnProperty("callback"))
                        options.callback = btnobj.callback; // callbackfind(btnobj.callback);
                    btnclickevent(id, btn, btnobj, ctrtype, datacode, options);
                }
            }
        });

        $(reverse).each(function(i, btnobj) {
            var position = "";
            if (btnobj.hasOwnProperty("position")) position = btnobj.position;
            if (position != "" && $.inArray(position, ["topright", "topleft", "bottomleft", "bottomright"]) == -1) return false;
            if (position != "" && $.inArray(position, ["topright", "bottomright"]) == -1) return false;
            dvbtn3 = "";
            btndiv = topOrbtm(id, btnobj);
            var tn = makebtn(btndiv, btnobj);
            btn = tn.btn;
            if (tn.hasOwnProperty("btndiv")) dvbtn3 = tn.btndiv;
            if (btnobj.hasOwnProperty("dataset")) datacode = btnobj.dataset;
            switch (position) {
                case "topright":
                    if (dvbtn3 != "")
                        $(container).prepend(dvbtn3);
                    else {
                        var wrap = $("<div style='text-align:right;padding:5px;'/>");
                        wrap.append(btn);
                        $(container).prepend(btn);
                    }
                    break;
                case "bottomright":
                    if (dvbtn3 != "") {
                        $(container).append(dvbtn3);
                    } else {
                        var wrap = $("<div style='text-align:right;padding:5px;'/>");
                        wrap.append(btn);
                        $(container).append(wrap);
                    }
                    if (ctrtype == "content") //let btn inside parent div
                        btn.closest($("div[role='tabpanel']")).css({ overflow: "hidden" });
                    break;
            }
            if (dvbtn3 != "") {
                dvbtn3.css({ "float": "right" });
            }
            btnclickevent(id, btn, btnobj, ctrtype, datacode, options);
        });
    }

    function callbackfind(code) {
        var rtn = "";
        $(event).each(function(i, k) {
            if (k.code == code)
                rtn = k;
        });
        return rtn;
    }

    function makebtn(btndiv, btnobj) {
        var btn = $("<input id='action" + btnobj.code + "' type='button' command='" + btnobj.command + "' class='btn btn-primary ml-1' value='" + btnobj.buttonname + "'/>");
        switch (btnobj.type) {
            case "icon":
                var icprefix = "fa ";
                if (btnobj.icon.indexOf("ui-icon") > -1) icprefix = "ui-icon ";
                btn = $("<i id='action" + btnobj.code + "' class='fa-darkred imdim " + icprefix + btnobj.icon + "'/>")
                if (btnobj.hasOwnProperty("buttonname") && btnobj.buttonname != "")
                    btn = $("<span class='imdim linkbtn'><i id='action" + btnobj.code + "' style='margin-right:5px' class='fa-darkred " + icprefix + btnobj.icon + "'/>" + btnobj.buttonname + "</span>")
                break;
            case "button":
                btn.text(btnobj.buttonname);
                if (btnobj.hasOwnProperty("buttonstyle") && btnobj.buttonstyle != "") {
                    var cls = btnobj.buttonstyle.split(";");
                    $(["default", "primary", "secondary", "success", "info", "warning", "danger", "lg", "sm", "default"]).each(function(i, k) {
                        btn.removeClass("btn btn-" + k);
                        btn.removeClass("btn-" + k);
                    })
                    btn.addClass("btn btn-" + cls[0]);
                    btn.addClass("btn-" + cls[1]);
                }
                break;
            case "link":
                btn = "";
                break;
        }
        var set = {};
        switch (btnobj.display) {
            case "hide":
                btn.hide();
                set.btn = btn;
                break;
            case "hover":
                btndiv.append(btn);
                btn.invisible();
                btndiv.hover(
                    function() { btn.visible(); },
                    function() { btn.invisible(); }
                );
                set.btn = btn;
                set.btndiv = btndiv;
                break;
            default:
                btndiv.append(btn);
                set.btndiv = btndiv;
                set.btn = btn;

                break;
        }
        return set;
    }

    function btnclickevent(id, btn, btnobj, ctrtype, datacode, options) {
        btn.on("click", function(e) {
            if (e.which == 1) {
                if (datacode == "")
                    btnclickexecute("", { id: id, btn: btn, btnobj: btnobj, ctrtype: ctrtype, options: options });
                else {
                    jsonDataMyAjax(datacode, btnclickexecute, "", [{ id: id, btn: btn, btnobj: btnobj, ctrtype: ctrtype, options: options }]);
                }
            }
        });
    }
}
global.evval=eval;
function btnclickexecute(dtsrc, opt) { // id, btn, btnobj, ctrtype, options) {
    btnclickexecute.btnrun = btnrun;
    funLoading();
    var id, btn, btnobj, ctrtype, options;
    if (typeof opt != "undefined") {
        if (opt.hasOwnProperty("id")) {
            id = opt.id;
            if (id.substr(0, 1) == "1") id = id.substring(1);
        }
        if (opt.hasOwnProperty("btn")) btn = opt.btn;
        if (opt.hasOwnProperty("btnobj")) btnobj = opt.btnobj;
        if (opt.hasOwnProperty("ctrtype")) ctrtype = opt.ctrtype;
        if (opt.hasOwnProperty("options")) options = opt.options;
    }

    if (btnobj.hasOwnProperty("confirm") && btnobj.confirm) {
        swal({
                title: "Delete ?",
                text: "Are you sure to delete ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true,
                cookiekey: "confirm_" + id
            },
            function() {
                btnrun(dtsrc, id, btn, btnobj, ctrtype, options)
            });
    } else {
        btnrun(dtsrc, id, btn, btnobj, ctrtype, options);
    }

    function btnrun(dtsrc, id, btn, btnobj, ctrtype, options) {
        if ($.inArray(btnobj.action, ["selfhide", "selfclose", "selfreload"]) > -1 && btnobj.hasOwnProperty("callback")) {
            console.log('im in', btnobj.callback, id, ctrtype);
            var callbtnid = btnobj.callback;
            actioncallback("", callbtnid, id, ctrtype);
            //$("#action" + callbtnid).attr("rtn", JSON.stringify(calloption));
        }
        console.log('btnrun')
        switch (btnobj.action) {
            case "custom":
                var script = scriptfilter(btnobj.script, id);
                var rtn = $("#action" + btnobj.code).attr("rtn");
                funLoading();
                evval("var rtn=" + rtn + ";" + script);
                if (btnobj.hasOwnProperty("callback")) {
                    var callbtnid = btnobj.callback;
                    setTimeout(function() { actioncallback("", callbtnid, id, ctrtype); }, 1500);
                }
                //else
                //    funStop();
                break;
            case "selfhide":
                var thisctr = $("#" + id),
                    thisparent = $("#parent" + id);
                if (thisctr.parent().hasClass("panel-body") | thisparent.parent().hasClass("panel-body")) {
                    thisctr.closest(".panel-info").hide();
                } else
                    thisctr.hide();
                break;
            case "selfclose":
                if ($("#tmpclose").length > 0)
                    $("#tmpclose").click();
                var thisctr = $("#" + id),
                    thisparent = $("#parent" + id);
                if (thisctr.parent().hasClass("panel-body") | thisparent.parent().hasClass("panel-body")) {
                    thisctr.closest(".panel-info").remove();
                } else
                    thisctr.remove();
                if ($("#popupdv" + id).length > 0)
                    $("#popupdv" + id).dialog('destroy').remove();
                break;
            case "selfreload":
                initbyctr(ctrtype, id);
                break;
            case "load":
                //btn==codearr
                funLoading();
                $(btnobj.reloadlist).each(function(q, r) {
                    var rlist = r.mapfield;
                    var val = [],
                        set = {};
                    $(rlist).each(function(x, y) {
                        set = {};
                        switch (ctrtype) {
                            case "jqgrid":
                                set.code = y[1];
                                if (btn.hasOwnProperty(y[0])) set.value = btn[y[0]];
                                if (y[2] != "")
                                    set.value = fixedReplace([y[2]]);
                                break;
                            case "content":
                                var dtrow = btn.parent().parent().find($(".grid-stack")).attr("dtrow");
                                if (dtrow != "") dtrow = JSON.parse(dtrow);
                                var valarr = [];
                                set.code = y[1];
                                if (y[0] != "")
                                    valarr = [dtrow[y[0]]];
                                else if (y[2] != "")
                                    valarr = fixedReplace([y[2]]);
                                set.value = valarr;
                                break;
                            default:
                                set.code = y[1];
                                if (btn.hasOwnProperty(y[0])) set.value = btn[y[0]];
                                if (y[2] != "")
                                    set.value = fixedReplace([y[2]]);
                                break;
                        }
                        val.push(set);
                    });
                    if (btnobj.hasOwnProperty("callback")) {
                        var callbtnid = btnobj.callback;
                        actioncallback("", callbtnid, id, ctrtype);
                    }
                    reloadexe(id, val, btnobj.type, btnobj);
                });
                break;
            default:
                var param = [],
                    datacode, dtype = "";
                if (btnobj.hasOwnProperty("dataset")) datacode = btnobj.dataset;
                else datacode = datacodereturn(dtsrc);
                if (dtsrc.hasOwnProperty("dtype")) dtype = dtsrc.dtype;
                if (dtype.indexOf("input") > -1) dtype = "input";
                var savedata = actionsavedata(id, btn, ctrtype, options);
                var dtlist = datalistreturn(dtsrc);
                //field convert
                var paramcode, keycode = [];
                var set = {},
                    param = [];
                var inputobject = {},
                    mapping;
                if (btnobj.hasOwnProperty("mapping"))
                    mapping = btnobj.mapping;
                $(mapping).each(function(i, k) {
                    if (k[2]) {
                        keycode.push(k[0])
                    }
                });
                $(mapping).each(function(i, k) {
                    //paramlist=parametername,parametervalue,fieldtype(only query case);.... repeat
                    if (k[1] != null) {
                        $(savedata).each(function(a, b) {
                            if (k[1] == b.title) {
                                inputobject[k[0]] = b.val;
                            }
                        });
                        //append filter $ started parameter
                        if (userfilter(k[1]) != k[1])
                            inputobject[k[0]] = userfilter(k[1]);
                    }
                });
                var callbtnid = "";

                if (btnobj.hasOwnProperty("callback")) {
                    callbtnid = btnobj.callback;
                    datasetUpdate(dtsrc, inputobject, keycode, btnobj.action, actioncallback, [callbtnid, id, ctrtype])
                } else
                    datasetUpdate(dtsrc, inputobject, keycode, btnobj.action);
                break;
        }
        funStop();

    }

    function actionsavedata(id, btn, ctrtype, options) {
        if (typeof btn == "string") btn = $("#" + btn);
        var dt = [];
        switch (ctrtype) {
            case "form":
                var form = btn.parent().parent().find("form"); //closest(".form");//.find("form");

                form.find(".form-group").each(function(i, k) {

                    var lbl = $(k).find("label:eq(0)").text();
                    var val = $(k).find(".control-label, .custom-control,.forminput,.ddlTextbox,.tableinput,input[type='file']");
                    switch (val.prop("tagName")) {
                        case "LABEL":
                        case "SPAN":
                            if ($(k).find(".custom-control").length > 0) {
                                cbval = $(k).find("input:radio:checked");
                                ckval = $(k).find("input:checkbox:checked");
                                if (cbval.length > 0)
                                    dt.push({ title: lbl, val: cbval.val() });
                                else if (ckval.length > 0) {
                                    var arr = [];
                                    ckval.each(function(a, b) {
                                        arr.push($(b).val());
                                    });
                                    dt.push({ title: lbl, val: arr.join(",") });
                                }
                            } else
                                dt.push({ title: lbl, val: val.text() });
                            break;
                        case "INPUT":
                        case "TEXTAREA":
                            if (val.attr("type") == "file") {
                                //already uploaded list
                                var cfile = [],
                                    curfile = val.closest("div").find(".inpfilehidden").val();
                                if (curfile != "") cfile = JSON.parse(curfile);
                                var set = {};
                                var valrtn = uploadFile({"comp":getlogin().comp});
                                set.title = lbl;
                                var mg = $.merge(valrtn, cfile)
                                set.val = JSON.stringify(mg);
                                dt.push(set);
                            } else if (val.hasClass("ddlTextbox")) {
                                //if tree, then save valinput not txinput
                                dt.push({ title: lbl, val: val.next().val() });
                            } else if (val.hasClass("tableinput")) {
                                dt.push({ title: lbl, val: val.val() });
                            } else {
                                var varr = [];
                                $(val).each(function(i, k) {
                                    if ($(k).val() != "")
                                        varr.push($(k).val());
                                });
                                if (varr.length > 0)
                                    dt.push({ title: lbl, val: varr.join("~") });
                            }
                            break;
                        case "MULTISELECT":
                        case "SELECT":
                        case "SELECTIMAGE":
                            valtxt = val.find("option:selected").text();
                            valval = val.val();
                            dt.push({ title: lbl, txt: valtxt, val: valval });
                            break;
                    }
                });
                break;
            case "content":
                var contt = btn.siblings(".grid-stack").attr("dtrow");
                if (contt != "") contt = JSON.parse(contt);
                var key = Object.keys(contt);
                $(key).each(function(i, k) {
                    dt.push({ title: k, val: contt[k] });
                });
                break;
            case "jqgrid":
                var arr = Object.keys(btn);
                $(arr).each(function(i, k) {
                    dt.push({ title: k, val: btn[k] });
                })
                break;
            case "jstree":

                break;
            case "pivot":
                break;
        }
        return dt
    }

}

function multipleupdate(data, inputobject) {
    multipleupdate.deljson = deljson;
    if (data.hasOwnProperty("joindtlist")) {
        $(data.joindtlist).each(function(i, k) {
            var subdatacode = k.datacode;
            var excludemap = "";
            if (k.hasOwnProperty("excludemap")) excludemap = k.excludemap;
            if (k.hasOwnProperty("upddel")) {
                //update, delete
                //jsonReadMyAjax("imcdata", mycomp, "", "code", subdatacode, multipleupdate.deljson, [inputobject, k.upddel, excludemap]);
                jsonDataMyAjax(subdatacode, datasetRead, "", [{ callback: multipleupdate.deljson, inputobject: inputobject, upddel: k.upddel, excludemap: excludemap }]);
            }
        });
    }

    function deljson(datasrc, opt) {
        var inputobject, upddel, excludemap;
        if (typeof opt != "undefined") {
            if (opt.hasOwnProperty("inputobject")) inputobject = opt.inputobject;
            if (opt.hasOwnProperty("upddel")) upddel = opt.upddel;
            if (opt.hasOwnProperty("excludemap")) excludemap = opt.excludemap;
        }
        //replace column name
        if (excludemap != "") {
            $(Object.keys(inputobject)).each(function(i, k) {
                $(excludemap).each(function(a, b) {
                    if (k == b[1]) {
                        inputobject[b[0]] = inputobject[k];
                        delete inputobject[k];
                    }
                });
            });
        }
        //find keycode
        var filter = datafilterreturn(datasrc);
        $(filter).each(function(i, k) {

        });
    }
}

function multikeycheck(datarow, inputobject, keycode) {
    //if keycode are multi, check all fit
    //datarow:datalist each rows, inputobject:data from form
    var chk = false,
        coincidenum = 0;
    $(keycode).each(function(i, k) {
        if (datarow[k] == inputobject[k])
            coincidenum++;
    });
    if (keycode.length == coincidenum)
        chk = true;
    return chk;
}

function multikeyvaluemake(inputobject, keycode) {
    //if keycode are multi
    var keyvalarr = [],
        rtn = "";
    $(keycode).each(function(i, k) {
        keyvalarr.push(inputobject[k]);
    });

    if (keyvalarr.length > 0)
        rtn = keyvalarr.join(',');
    return rtn;
}

function reloadexe(ctrid, codearr, btntype, btnobj) {
    //codearr=[['parentkeycode1','value1'],[parentkeycode2,value2]....]
    if ($("#archivegdt").text() != "")
        var ctr1 = JSON.parse($("#archivegdt").text());
    else
        ctr1 = readdata(ctrid, "gdt");
    var pctrtype;
    if (typeof ctr1 != "undefined" && ctr1.hasOwnProperty("ctrtype")) pctrtype = ctr1.ctrtype;
    if (typeof ctr1 != "undefined" && ctr1.hasOwnProperty("eventlist")) {
        var elist = $.grep(ctr1.eventlist, function(a) {
            return a.action == "load"; // && a.type == btntype;
        });
        if (typeof btnobj != "undefined") {
            var curcode = btnobj.code;
            var elist = $.grep(ctr1.eventlist, function(a) {
                return a.code == curcode;
            });
        }
        if (elist.length > 0) {
            funLoading(true);
            $(elist).each(function(i, k) {
                $(k.reloadlist).each(function(l, m) {
                    var mid = m.menuid,
                        sid = m.subid,
                        did = m.dvid,
                        ctype = m.ctrtype,
                        loadtype = m.loadtype,
                        func = m.function,
                        mtogg = m.menutoggle,
                        mapfield = m.mapfield,
                        wth, dt1 = "";
                    if (m.hasOwnProperty("width")) wth = m.width;
                    var ctrlist = menuMy("control");
                    var reloadctr = $.grep(ctrlist, function(a) {
                        return a.dvid == did
                    });
                    if (reloadctr.length > 0) {
                        if (reloadctr[0].hasOwnProperty("data")) {
                            dt1 = reloadctr[0].data;
                        }

                        var ss = filterchange(dt1, mapfield, codearr);
                        console.log(ss)
                        var opt = { gdt: reloadctr[0], editmode: true }
                        switch (loadtype) {
                            case "reload":
                                controlinit(did, ctrid);
                                break;
                            case "popup":
                                $("#popupdv" + did).remove();
                                var dv = $("<div id='popupdv" + did + "'/>")
                                opt.contain = dv;
                                var opt1 = {
                                    height: 'auto',
                                    width: wth,
                                    modal: false
                                        // , appendTo: "#" + ctrid
                                        ,
                                    minHeight: 'auto',
                                    title: opt.ctrtype,
                                    stack: false,
                                    close: function(event, ui) {
                                        $(this).dialog('destroy').remove();
                                    }
                                }
                                if (pctrtype == "map") {
                                    // prevent popup appendTo map iframe
                                    // opt.autoOpen=false;
                                    opt1.open = function() {
                                        setTimeout(function() {
                                            dv.parent().appendTo($("body"));
                                        }, 10)
                                    };
                                }
                                opt.ctrid = ctrid;
                                opt.pctrtype = pctrtype;
                                dv.dialog(opt1);
                                break;
                            case "replace":
                                replaceinit(ctrid, did, pctrtype);
                                opt.contain = $("#" + did);
                                opt.ctrid = ctrid;
                                opt.pctrtype = pctrtype;
                                break;
                            case "sidebyside":
                                opt.ctrid = ctrid;
                                opt.pctrtype = pctrtype;
                                //,  if (pctrtype == "form") ctrid = "tb" + ctrid;
                                var td = $("#" + ctrid).closest("td");
                                td.find(".panel-info:not(:eq(0))").remove();
                                var tf = $("#" + ctrid).parent().hasClass("panel-body");
                                if (pctrtype == "map")
                                    tf = $("#" + ctrid).parent().parent().hasClass("panel-body");

                                if (tf) {
                                    $("#" + ctrid).closest(".panel-info").css({ float: "left", width: "49%" });
                                    $("#" + ctrid).closest(".panel-body").css({ "padding": 0 });
                                    $('#jq' + ctrid).setGridWidth($("#" + ctrid).closest(".panel-info").width(), true)
                                } else {
                                    $("#" + ctrid).css({ float: "left", width: "49%" });
                                    $('#jq' + ctrid).setGridWidth($("#" + ctrid).width(), true)
                                }
                                $("#gbox_jq" + ctrid).removeClass("ui-tabs-panel").css({ "margin": "5px 0 5px 0" });

                                break;
                            case "pagemove":

                                break;
                        }
                        if (loadtype == "sidebyside") {
                            $("#" + did).remove();
                            var cdv = $("<div id='" + did + "' />");
                            $("#" + cdv.attr("id")).remove();
                            td.append(cdv);
                            opt.contain = cdv;
                        }
                        reloadview(loadtype, ctype, did, opt);
                        funStop();
                        if (typeof func != "undefined" && func != "")
                            setTimeout(function() {
                                evval(func);
                            }, 20);
                    }
                });
            });
        }
    }

    function filterchange(data, mapfield, codearr) {
        if (data.dtype == "database") {
            if (data.hasOwnProperty("querylist")) {
                $(data.querylist).each(function(i, k) {
                    if (k.sqlcommand == "select") {
                        filterchg(k.filter, mapfield, codearr);
                    }
                });
            }
        } else {
            var ftr = [];
            if (!data.hasOwnProperty("filter"))
                data.filter = ftr;
            else
                ftr = data.filter;
            var ftr1 = filterchg(ftr, mapfield, codearr);
            data.filter = ftr1;
        }

        function filterchg(filter1, mapfield, codearr) {
            //mapfield=[[parentkey1,childkey1],[parentkey2,childkey2]....]
            //codearr=[[parentkey1,value1],[parentkey2,value2]...]
            //filter[0][0]:childcode
            var exist = false;
            console.log(filter1, mapfield, codearr)
            if (typeof filter1 != "undefined" && filter1.length == 0) {
                var arr = [];
                $(mapfield).each(function(i, k) {
                    filter1.push([k[1], "string", "", [], "", "", false])
                });
            }
            $(filter1).each(function(a, b) {
                $(mapfield).each(function(c, d) {
                    if (d[1] == b[0]) { //if mapfield childkey == filter childkey
                        var parentkey = d[0].trim();
                        if (parentkey == "") parentkey = d[1];
                        $(codearr).each(function(e, f) {
                            var cc = f.code;
                            if (cc != null) cc = cc.toLowerCase();
                            if (cc == parentkey.toLowerCase()) {
                                //incase newly created tree, needs parentnode code
                                b[3] = [];
                                if (typeof f.value != "undefined")
                                    b[3].push(f.value);
                                exist = true;
                            }
                        });
                    }
                });
                if (!exist) {
                    // if new data insert
                    $(filter1).each(function(a, b) {
                        $(codearr).each(function(e, f) {
                            var cc = f.code;
                            if (cc != null) cc = cc.toLowerCase();
                            if (cc == b[0].toLowerCase()) {

                                //incase newly created tree, needs parentnode code
                                b[3] = [f.value];
                            }
                        });
                    });
                }
            });
            return filter1;
        }
        return data
    }
}

function replaceinit(ctrid, curid, pctrtype) {
    var dv = $("<div />");
    dv.css({ "padding": "0 5px 5px 0", "margin": "5px 0 5px 0" });
    dv.attr("id", ctrid + "_copy");
    var ctr = $("#" + ctrid),
        pctr = $("#parent" + ctrid),
        panel = "";
    if (pctrtype == "map");
    if (ctr.parent().hasClass("panel-body"))
        panel = ctr.closest(".panel-info");
    if (pctrtype == "map" && pctr.parent().hasClass("panel-body"))
        panel = pctr.closest(".panel-info");
    if (panel == "")
        dv.insertAfter(ctr);
    else
        dv.insertAfter(panel);
    if (pctrtype == "map" && panel != "")
        removectr("parent" + ctrid);
    else
        removectr(ctrid);
    dv.attr("id", ctrid);

    var td = dv.closest("td");
    if ($("#" + curid).length == 0) {
        var dv = $("<div />");
        dv.css({ "padding": "0 5px 5px 0", "margin": "5px 0 5px 0" });
        dv.attr("id", curid);
        td.append(dv);
    }
}

function removectr(ctrid) {
    var ctr = $("#" + ctrid),
        panel = "";
    if (ctr.parent().hasClass("panel-body")) {
        panel = ctr.closest(".panel-info");
        panel.remove();
    } else
        ctr.remove();

}

function controlinit(ctrid, curid) {
    //var c = ctrid, i = curid;
    //curid = c; ctrid = i;
    //did:current id, ctrid:next id
    //clear control div returning to its initial look
    var dv = $("<div />");
    dv.css({ "padding": "0 5px 5px 0", "margin": "5px 0 5px 0" });
    dv.attr("id", ctrid + "_copy");
    // dv.attr("class", ctype);
    var td = $("#" + ctrid);
    //if (td.parent().hasClass("panel-body"))
    //    td = td.closest(".panel-info");
    if (td.length == 0) {
        $("#" + curid).closest("td").append(dv);
    } else
        dv.insertAfter(td);
    td.remove();
    dv.attr("id", ctrid);
    var thisctr = $("#" + ctrid),
        thisparent = $("#parent" + ctrid);
    if (thisctr.parent().hasClass("panel-body") | thisparent.parent().hasClass("panel-body")) {
        thisctr.closest(".panel-info").show();
    } else
        thisctr.show();

}

function reloadview(loadtype, ctype, did, options) {
    //completely remove existing div and inject brandnew div of each control for wrapping
    var ctrid, pctrtype;
    if (typeof options != "undefined") {
        ctrid = options.ctrid;
        pctrtype = options.pctrtype;
    }
    ctrinit(ctype, did, options);
    console.log(loadtype, ctype, did, options)
    if (loadtype != "reload") {
        switch (ctype) {
            case "content":
                options.gdt.setup.wrap = "none";
                break;
            case "form":
                options.gdt.wrap = false;
                break;

        }
    }
    if ($.inArray(loadtype, ["sidebyside", "replace"]) > -1)
        wrapcontrol(options.contain, "edit", options.contain);

    setTimeout(function() {
        var close = $("<i id='tmpclose' class='fa fa-times-rectangle-o imdim float-right marginleft' />");
        switch (loadtype) {
            case "sidebyside":
                options.contain.closest(".panel-info").addClass("float-right").css({ width: "50%" });
                close.insertBefore(options.contain.closest(".panel-body").prev().find("i"));
                close.click(function() {
                    $("#tmpclose").closest(".panel-info").remove();
                    setTimeout(function() {
                        var tdwth = $("#" + ctrid).closest("td").width();
                        if ($("#" + ctrid).parent().hasClass("panel-body") | $("#parent" + ctrid).parent().hasClass("panel-body")) {
                            //parent+ctrid--> for map
                            $("#" + ctrid).closest(".panel-body").css({ padding: 0 });
                            $("#" + ctrid).closest(".panel-info").css({ width: tdwth })
                        }
                        switch (pctrtype) {
                            case "jqgrid":
                                $('#jq' + ctrid).setGridWidth(tdwth, true);
                                break;
                            case "map":
                                $("#" + ctrid).css({ width: "100%" })
                                break;
                        }

                    }, 200);
                });
                break;
            case "replace":
                $("#" + did).closest(".panel-body").css({ "padding": 0 });
                close.insertBefore(options.contain.closest(".panel-body").prev().find("i"));
                close.click(function() {
                    $("#tmpclose").closest(".panel-info").remove();
                    ctrinit(pctrtype, ctrid);
                    setTimeout(function() {
                        var tdwth = $("#" + ctrid).closest("td").width();
                        if ($("#" + ctrid).parent().hasClass("panel-body") | $("#parent" + ctrid).parent().hasClass("panel-body")) {
                            $("#" + ctrid).closest(".panel-body").css({ padding: 0 });
                            $("#" + ctrid).closest(".panel-info").css({ width: tdwth });
                        }
                    }, 100);
                });
                break;
            case "popup":
                close.appendTo($("#" + did));
                close.hide();
                close.click(function() {
                    controlinit(ctrid)
                    ctrinit(pctrtype, ctrid);
                    $("#popupdv" + did).parent().remove();
                });
                break;
            case "pagemove":
                $("#main-menu>li>ul>li>a[subid='" + options.gdt.subid + "']").click();
                ctrinit(ctrtype, options.gdt.dvid, options);
                break;
        }
    }, 0);

    function ctrinit(ctype, id, options) {
        switch (ctype) {
            case "jqgrid":
                jqgridInit(id, options);
                break;
            case "jstree":
                jstreeInit(id, options);
                break;
            case "googlechart":
                googlechartInit(id, options);
                break;
            case "fullcalendar":
                fullCalendarInit(id, options);
                break;
            case "content":
                contentInit(id, options);
                break;
            case "map":
                mapInit(id, options);
                break;
            case "ifrm":
                set.icon = "fa fa-desktop";
                break;
            case "pivot":
                pivotInit(id, options);
                break;
            case "form":
                formInit(id, options);
                break;
            case "html":
                htmlInit(id, options);
                break;
            default:
                formInit(id, options);
                break;
        }
    }
}

function actioncallback(data, callbtnid, id, ctrtype) {
    if (callbtnid != "") {
        switch (callbtnid) {
            case "callbackclose":
                document.getElementById('tmpclose').click();
                break;
            case "selfhide":
                var thisctr = $("#" + id),
                    thisparent = $("#parent" + id);
                if (thisctr.parent().hasClass("panel-body") | thisparent.parent().hasClass("panel-body")) {
                    thisctr.closest(".panel-info").hide();
                } else
                    thisctr.hide();
                break;
            case "selfclose":
                if ($("#tmpclose").length > 0)
                    $("#tmpclose").click();
                var thisctr = $("#" + id),
                    thisparent = $("#parent" + id);
                if (thisctr.parent().hasClass("panel-body") | thisparent.parent().hasClass("panel-body")) {
                    thisctr.closest(".panel-info").remove();
                } else
                    thisctr.remove();
                if ($("#popupdv" + id).length > 0)
                    $("#popupdv" + id).dialog('destroy').remove();
                break;
            case "selfreload":
                controlinit(id);
                initbyctr(ctrtype, id);
                break;
            default:
                document.getElementById("action" + callbtnid).click();
                break;
        }
    }
    funStop();
}

function calendardatamapping(field, dt, type) {
    //field:mapping table, dt:original database, type:forward(db->fullcalendar),backward(db<-fullcalendar)
    //convert data by mapping field title
    var newdt = [];
    var tit = Object.keys(field);
    //make mapping pair(name:fullcalendar field, value:original field)
    newset = [];
    $(tit).each(function(i, k) {
        var set = {};
        set.name = k;
        set.value = field[k];
        newset.push(set)
    })
    var compareval, renameval;
    if (typeof type == "undefined") type = 'forward';
    $(dt).each(function(i, k) {
        for (dtname in k) {
            $(newset).each(function(j, l) {
                if (l.name != l.value) {
                    switch (type) {
                        case "forward": //change to fullcalendar data format
                            compareval = l.value;
                            renameval = l.name;
                            break;
                        case "backward": //from fullcalendar format back to database original
                            compareval = l.name;
                            renameval = l.value;
                            break;
                    }
                    if (compareval == dtname) {
                        k[renameval] = k[dtname];
                        delete k[dtname];
                    }
                }
            });
        }
    });
    return dt;
}

function findcontainer(id) {
    //in case popup, prevent save multiple data with same id
    var container = "#" + id;
    $("#tb" + id).parent().each(function(i, k) {
        if ($(k).attr("id") == "popupdv" + id) {
            container = "#popupdv" + id;
        }
    });
    return container;
}

function actionsave(data, id, command, datacode, btnobj) {
    var dtype = "",
        datalist = [],
        rtn, dobj, keycode, keyvalue;
    if (data.hasOwnProperty("dtype")) dtype = data.dtype;
    datalist = datalistreturn(data);
    rtn = makedtobj(btnobj.mapping);
    dobj = rtn.set;
    keycode = rtn.keycode;
    keyvalue = rtn.keyvalue;
    var newdatalist = updatedatalist(datalist, keycode, keyvalue, command, dobj);
    data.datalist = newdatalist;
    jsonUpdateMyAjax("imcdata", mycomp, data, "", "code", datacode);

    function updatedatalist(datalist, keycode, keyvalue, command, newdata) {
        switch (command) {
            case "save":
            case "update":
                $(datalist).each(function(i, k) {
                    if (k[keycode] == keyvalue) {
                        datalist.splice(i, 1);
                    }
                });
                datalist.push(newdata)
                break;
            case "delete":
                $(datalist).each(function(i, k) {
                    if (k[keycode] == keyvalue)
                        datalist.splice(i, 1);
                });
                break;
        }
        return datalist
    }

    function makedtobj(maplist) {
        var set = {},
            rtn = {},
            keycode, keyvalue;
        $(maplist).each(function(i, k) {
            set[k[0]] = findvalwithtitle(id, k[1]);
            if (k[k.length - 1]) {
                keycode = k[0];
                keyvalue = findvalwithtitle(id, k[1]);
            }
        });
        rtn.set = set;
        rtn.keycode = keycode;
        rtn.keyvalue = keyvalue;
        return rtn;
    }
}

function findvalwithtitle(id, code) {
    //find value with field title
    var inputdt = saveTable("tb" + id);
    var rtn = "";
    $(inputdt).each(function(a, b) {
        if (b[0] == code) {
            rtn = b[1];
            return false;
        }
    });
    return rtn;
}
//#endregion

 export {pageInit,myinfomake,isrefreshready
    ,imcload,imcloadchk,getuserid1,getuserid,getuseridpassport,chkExp,parseJwt
    ,getlogin,Login,findsubid,cleanobject,showcode,userfilter
    ,scriptfilter,sleep,jsonOrderchange,tabbedDialog,getUrlVars,getURLParam
    ,browserWidth,browserHeight,missingArray,countObject,convertId1,convertId
    ,isNumber,isDate,isBool,isMobile,imApp,isOdd,isColumntype,arraychkexist
    ,arraycheckexist,rgb2hex,scriptExists,cssInsert,styleInsert,jsfunctionInsert
    ,jsInsert,jscriptInsert,documentreadyInsert,numberOnly,idMake,makeDateTime
    ,friendlydate,populate1,populate,stripTextonly,removeblankarr,cleanupstorage
    ,cleanupimctable,auto_grow,makedialogoption,toggleInsert,toggleTable,toggleSelect
    ,togglePopover,toggleReturn,mergeCells,splitCell,wrapouter,selectupdate,isinsidediv
    ,actionbutton,btnclickexecute,multipleupdate,multikeycheck,multikeyvaluemake
    ,reloadexe,replaceinit,removectr,controlinit,reloadview,actioncallback
    ,calendardatamapping,findcontainer,actionsave,findvalwithtitle,funLoading,funStop}


