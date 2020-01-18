import $ from 'jquery';
import Swal from 'sweetalert2';


//#region bootstrap custom checkbox
const makebootcustom=(type, txtarr, id, options)=> {
    //makebootcustom('checkbox', ['auto key generate'], 'cbkeymake',{event:'onchange|$(this).next().toggle()',hide:true,stack:true});
    // when save:  setting.ismodel = $("#cbkeymake").is(":checked");
    // when load: $("#cbkeymake").prop("checked", setting.ismodel);
    var dv = $("<div/>");
    $(txtarr).each(function(i, k) {
        dv.append(ctrmk(type, k, options));
    });

    function ctrmk(type, txt, options) {
        var lb = $("<label class='custom-control custom-" + type + "'/>"),
            inp = $("<input type='" + type + "' class='custom-control-input'/>"),
            sp = $("<span class='custom-control-indicator'/>"),
            sp1 = $("<span class='custom-control-description'/>");

        lb.append(inp).append(sp).append(sp1);
        var tx = txt.split(":");
        sp1.text(tx[0]);
        inp.val(tx[0]);
        if (tx.length > 1) inp.val(tx[1]);
        if (tx.length > 2) inp.attr("checked", "checked");
        if (typeof id != "undefined" | id != "") {
            if (type == "radio" && txtarr.length > 1)
                inp.attr("name", "radio" + id);
            else
                inp.attr("id", id);
        }
        if (typeof options != "undefined") {
            if (options.hasOwnProperty("event")) {
                var ev = options.event.split("|");
                inp.attr(ev[0], ev[1]);
            }
        }
        return lb;
    }
    if (typeof options != "undefined") {
        if (options.hasOwnProperty("stack")) dv.addClass("custom-controls-stacked");
        if (options.hasOwnProperty("hide")) dv.css({ display: "none" });
        if (options.hasOwnProperty("css")) dv.css(options.css);
    }
    return dv;
}

function bootcustomload(type, id, valarr) {
    $(".custom-control-input").each(function(i, k) {
        if ($(k).attr("id") == id) {
            $(this).prop("checked", false);
            if ($.inArray($(this).parent().find(".custom-control-description").text(), valarr) > -1)
                $(this).prop("checked", true);
        }
    });
    switch (type) {
        case "radio":
            return $("input:radio[name='radio" + id + "']:checked").parent().find(".custom-control-description").text();
            break;
        case "checkbox":
            return
            break;
    }
}

function getbootcustom(type, id) {
    switch (type) {
        case "radio":
            return $("input:radio[name='radio" + id + "']:checked").parent().find(".custom-control-description").text();
            break;
        case "checkbox":
            return
            break;
    }
}
//#endregion

//#region dynamic Table
function makeTableMapping(gdt, fieldlist) {
    //fieldlist=[[fieldname,mappingfield]]
    //var gdt = selectimcdata("imcdata", "dt16022311284")
    var data = [];
    var dt = applyFilter(dt, gdt.filter);
    var list = Object.keys(dt[0]);

    // data field list
    data.push([makeCtr(["span", "field", , , ]), makeCtr(["span", "mapping", , , ])]);
    if (fieldlist.length > 0) {
        $(fieldlist).each(function(i, k) {
            var sel = makeCtr(["select", makelist(list, k[1]), , , ]);
            data.push([k[0], sel]);
        });
    }

    function makelist(list, mappedfield) {
        var output = [];
        $(list).each(function(i, k) {
            if (k == mappedfield)
                output.push(k + "," + k + ",selected:true");
            else
                output.push(k);
        });
        return output.join(";");
    }
    var tb2 = makeTable("tb22", data, "general");
    return tb2;
}

function makeTableTable(country, tbid) {
    var list = [],
        enlist = [],
        data = [];
    if (jsonlang != "") {
        var jlang = JSON.parse(jsonlang).token;
        for (var key in jlang) {
            var set = [];
            set.push(key, jlang[key]);
            list.push(set);
            enlist.push(key);
        }
    }
    var tblist = saveTable("tbLanglist", false, true);
    $(tblist).each(function(i, k) {
        wordlist.push(k[0]);
    });
    $(wordlist).each(function(i, k) {
        if ($.inArray(k, enlist) == -1)
            list.push([k, ""]);
    });
    // data field list
    data.push([makeCtr(["span", "title", , , ]), makeCtr(["span", "control", , , ]), makeCtr(["span", , , "width:20px", ])]);
    if (list.length > 0) {
        $(list).each(function(i, k) {
            data.push([makeCtr(["div", k[0], , "imdim", "onclick:googletranSingle(" + i + ",'" + k[0] + "')"]), makeCtr(["input", k[1], , "width:99%", ]), makeCtr(["i", "fa fa-minus-square imdim", , "width:20px", ""])]);
        });
    }
    if (typeof tbid == "undefined" | tbid == '') tbid = "tbLanglist";
    var tb2 = makeTable(tbid, data, "general");

    var foot = ['<div class="dvtran"></p><div class="dvtranctr" /></div>', '<div style="text-align:right"><input type="button" class="btnRoundsmall" value="translate" onclick="googletranTable()" style="padding:0 3px 0 3px;margin:2px;" id="inptrans"/>' +
        '<input id="inptbLanglistadd" type="button" class="btnRoundsmall" value="add"  style="padding:0 3px 0 3px;margin:2px;"/></div>', '<input id="inpreset" type="button" class="btnRoundsmall" value="reset"  style="padding:0 3px 0 3px;margin:2px;"/>'
    ];
    tb2 = appendFooter(tb2, foot);
    tb2.attr("uselang", "none");
    return tb2;

}

function rowindexreorder(tbid) {
    //for callback after delete row reorder rowindex
    $("#" + tbid + ">tbody>tr>td:nth-child(1)>span").each(function(i, k) {
        $(k).text(i + 1);
    })
}

function rowseqnumber(tbid) {
    style = "table#" + tbid + "{  counter-reset: rowNumber;}";
    style += "table#" + tbid + " tr > td:first-child  { counter-increment: rowNumber; }";
    style += "table#" + tbid + " tr td:first-child::before  { content: counter(rowNumber); min-width: 1em; margin-right: 0.5em;    }";
    styleInsert("rowseq-style", style);
}

function tbcolindexbytitle(tbid, title) {
    //find column index by table id and head title
    var colindex;
    $("#" + tbid + ">thead>tr>th>span").each(function(i, k) {
        if ($(k).text() == title)
            colindex = i;
    });
    return colindex;
}

function chkalltoggle(cls) {
    var checked = $("#all" + cls).prop("checked");
    $("." + cls).prop('checked', checked);
    $("." + cls).trigger('click');
    $("." + cls).trigger('click');

}

function makeForm1(id, data) {
    /* table with form control dynamic creation

    */


    var table = $("<table width='100%' />");

    if (id != "") table.attr("id", id);
    var tbody = $("<tbody />");
    table.append(tbody);
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        tbody.append(row);
        $.each(r, function(colIndex, c) {
            var cell = $("<td/>");
            if (colIndex == 0)
                cell.css("width", "100px")
            if (typeof c != "undefined" && c.indexOf("|") > -1) {
                var csp = c.split('|');
                if (csp.length > 1) {
                    row.append(cell.html(csp[0]));
                    $.each($.parseJSON(csp[1]), function(k, v) {
                        cell.attr(k, v);
                    });
                }
            } else
                row.append(cell.html(c));
        });
    });
    return table;
}

function makeForm(id, data) {
    var form = $("<form width='100%' />");

    if (id != "") form.attr("id", id);
    var ul = $("<ul style='list-style-type: none;'/>").appendTo(form),
        li;
    $.each(data, function(rowIndex, r) {
        li = $("<li/>").appendTo(ul);
        $.each(r, function(colIndex, c) {

            if (typeof c != "undefined" && c.indexOf("|") > -1) {
                var csp = c.split('|');
                if (csp.length > 1) {
                    li.append($(csp[0]));
                    li.append($(csp[1]));
                    $.each($.parseJSON(csp[1]), function(k, v) {
                        $(csp[1]).attr(k, v);
                    });
                }
            } else
                li.append($(c));
        });
    });
    return form;
}

function makeCtr_img(startid, nextrownum) {
    var img = $("<img src='/images/splus.gif' class='imbtn' style='vertical-align:middle;;'/>");
    img.attr("onclick", "makeCtr_img1('" + startid + "'," + nextrownum + ")");

    return img.prop('outerHTML');
}

function makeCtr_img1(startid, nextrownum) {
    var ctr = $("#" + startid);
    var tr = $(ctr.parent().parent());
    var img = $($(tr.children()[0]).find("img"));
    var sib = tr.nextAll();
    var tbid = $(tr.parent().parent()).attr("id");
    switch (img.attr("src")) {
        case "/images/splus.gif":
            img.attr("src", "/images/sminus.gif");
            break;
        case "/images/sminus.gif":
            img.attr("src", "/images/splus.gif");
            break;
    }
    $(sib).each(function(i, k) {
        if (i < nextrownum)
            $(k).toggle();
    });
}

const togglechg=(id1, id2)=> {
    $([id1, id2]).each(function(i, k) {
        $("#" + k).toggle();

    })
}

const togglechgi=(id1, id2)=> {
    if ($("." + id1).length > 0) {
        var cls = $("." + id1).attr("class").replace(id1, id2);
        $("." + id1).attr("class", cls)
    } else {
        var cls = $("." + id2).attr("class").replace(id2, id1);
        $("." + id2).attr("class", cls)
    }
}

function InsertSelected1(list, val) {
    //create select with datatable
    var rtn = [];
    if (typeof list == "undefined") return false;
    $.each(list, function(i, k) {
        if (k == val) {
            rtn.push(k + "," + k + ",selected,selected");
        } else
            rtn.push(k + "," + k);
    });
    console.log(rtn, list)
    return rtn.join(';');
}

function InsertSelected(list, val, placeholder) {
    //create select with datatable
    var rtn = [];
    if (typeof list == "undefined") return false;
    $.each(list, function(i, k) {
        if (i == val) {
            rtn.push(i + "," + i + ",selected,selected");
        } else
            rtn.push(i + "," + i);
    });
    if (typeof placeholder == "undefined") placeholder = "select";
    rtn.unshift(placeholder + ",");
    return rtn.join(';');
}

function runAfterTableCreate(id, option) {
    var pagenum = 10,
        activepage = 0,
        inputpadding = 0,
        width = '100%';
    if (typeof option != "undefined") {
        if (option.hasOwnProperty("pagenum")) pagenum = option.pagenum;
        if (option.hasOwnProperty("activepage")) {
            activepage = option.activepage;
            if (activepage == "last") {
                activepage = parseInt(($("#" + id + " tbody>tr").length - 1) / pagenum);
            }
        }
        if (option.hasOwnProperty("inputpadding")) inputpadding = option.inputpadding;
        if (option.hasOwnProperty("width")) width = option.width;
    }
    var tb = $('#' + id);
    var limit = Math.ceil(($("#" + id + " tbody>tr").length - 1) / pagenum);
    if (limit > 10) limit = 10;
    if (tb.find("tbody>tr").length > pagenum) {
        var opt = {
            perPage: pagenum,
            limitPagination: limit
        };
        paginathing(tb, opt)
        // $("#" + id + " input").css("padding", inputpadding);
        hideAfterTablecreated(id);
        $("#" + id + ".roundbtn").button();
        tb.css("width", width);
    }
}

function hideAfterTablecreated(id) {
    //initiate expand collapse status to collapsed
    var tr = $("#" + id).find("tbody").children()
    var n = 0;
    $(tr).each(function(i, k) {
        var td = $(k).children()[0];
        var img = $(td).find("img")[0];
        var start = false;
        if (typeof img != "undefined" && img != "" && img != "undefined") {
            var imgcl = $(img).attr("onclick");
            if (imgcl != "" && typeof imgcl != "undefined") {
                n = parseInt($(img).attr("onclick").toString().replace(/.*\(|\).*/ig, "").split(',')[1]);
                $(img).attr("src", "/images/splus.gif")
                start = true;
            }
        }
        if (n > 0 && !start) {
            $(k).css({ "display": "none" });
            $(k).addClass("expandcollapse");
            $(td).css("padding-left", "15px");
            n--;
        }
    })
    styleInsert("expandcollapse", ".expandcollapse{ margin-left:5px;}");
}

function prependTableRow(table, rowData) {
    var row = $("<tr/>");
    var prevtr = $(table.find('tbody>tr:nth-child(1)')).attr("style");
    var secondtr = table.find('tbody>tr:nth-child(2)').css("background-color");
    if (typeof prevtr == "undefined")
        row.css("background-color", secondtr);

    var firstRow = row.prependTo(table.find('tbody:first'));
    $("tr:even").css("class", "even");

    $.each(rowData, function(colIndex, c) {
        var cell = $("<td  style='padding:3px ;border: 1px solid #D3D3D3;border-collapse:collapse;'/>");
        if (c.indexOf("|") > -1) {
            var csp = c.split('|');
            if (csp.length > 1) {
                firstRow.prepend(cell.html(csp[0]));
                $.each($.parseJSON(csp[1]), function(k, v) {
                    cell.attr(k, v);
                });
            }
        } else
            firstRow.prepend(cell.html(c));
    });
    return table;
}

function deleteTableColumn(thiss, rowIndex) {
    var table = thiss.parent();
    $(table + " tr:eq(" + rowIndex + ")").remove();
    return table;
}

function appendTableColumn(tb, cindex, title, insertobj) {
    tb.find('tr').each(function() {
        $(this).find('td').eq(cindex - 1).after(insertobj);
        $(this).find('th').eq(cindex - 1).after(title);
        if ($(this).attr("class") == "foot") {
            var cols = $(this).find('td').attr('colspan');
            $(this).find('td').attr('colspan', cols + 1);
        }
    });
}

function delRowdelegate(tbid, options) {
    console.log(tbid, options)
    //because row index chages  by deleting row, preassign
    //tdindex:which td?, controlindex:if multiple ctr at tdindex, which ctr?
    var title = "Row delete?",
        text = "Are you sure to delete row?",
        cookiekey = tbid + "_delete_row",
        text = "<div>" + text + "</div><div style='margin:0'><a  class='linkbtn' onclick=\"closenoask('" + cookiekey + "');$(this).css({color:'blue'})\">Don't ask</a></div>"

        ,
        confirm = "Yes, do it!",
        cancel = "No, cancel!",
        tdindex = $("#" + tbid + ">tbody>tr>td").last().index(),
        controlindex, callback, callbackoption;

    if (typeof options != "undefined") {
        if (options.hasOwnProperty("title")) title = options.title;
        if (options.hasOwnProperty("text")) title = options.text;
        if (options.hasOwnProperty("confirm")) title = options.confirm;
        if (options.hasOwnProperty("cancel")) title = options.cancel;
        if (options.hasOwnProperty("tdindex")) tdindex = options.tdindex;
        if (options.hasOwnProperty("controlindex")) controlindex = options.controlindex;
        if (options.hasOwnProperty("callback")) callback = options.callback;
        if (options.hasOwnProperty("callbackoption")) callbackoption = options.callbackoption;
    }
    $("#" + tbid + " tbody>tr>td:nth-last-child(1)").unbind("click").bind("click", function(e) {
        var cindex = $(this).index();
        var rindex = $(this).parent().index();
        if (rindex != -1 && cindex == tdindex) {
            if (checkCookie(tbid + '_delete_row')) {
                $("#" + tbid + ">tbody>tr:eq(" + rindex + ")").remove();
            } else {
                Swal.fire({
                    title: title,
                    text: text,
                    html: true,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: confirm,
                    cancelButtonText: cancel,
                    closeOnConfirm: true,
                    closeOnCancel: true
                }).then((isConfirm)=> {
                    if (isConfirm) {
                        $("#" + tbid + ">tbody>tr:eq(" + rindex + ")").remove();
                        if (typeof callback != "undefined") {
                            console.log(callback, callbackoption)
                            if (typeof callbackoption != "undefined")
                                callback(callbackoption[0]);
                            else
                                callback();
                        }
                    }
                });
            }
        }
    });
}

function rowSortable(tb, options) {
    var callback, callbackoption;
    if (typeof options != "undefined") {
        if (options.hasOwnProperty("callback")) callback = options.callback;
        if (options.hasOwnProperty("callbackoption")) callbackoption = options.callbackoption;
    }
    //odd background-color
    var bgcl = tb.find('tbody>tr:nth-child(2)').css("background-color");
    //make row droppable
    tb.find("tbody").sortable({
        // items: "> tr:not(:first)",
        appendTo: "parent",
        helper: "clone",
        update: function(event, ui) {
            evenoddcolor(tb, bgcl)
            if (typeof callback != "undefined") {
                if (typeof callbackoption != "undefined")
                    callback(callbackoption[0]);
                else
                    callback();
            }
        }
    }).disableSelection();
    //tr background-color

}

function evenoddcolor(tb, bgcl) {

    $.each(tb.find("tbody>tr"), function(rowIndex, r) {
        if (rowIndex % 2 != 0)
            $(r).css("background-color", bgcl);
        else
            $(r).removeAttr("style");
    });
}

function appendFooter(table, data, css) {
    //cssInsert("bootstrap-css", "/js2/bootstrap/css/bootstrap.css");

    var row = $("<tr/>");
    row.addClass('foot');
    $.each(data, function(colIndex, c) {
        var cell = $("<td/>");
        if (c.indexOf("|") > -1) {
            var csp = c.split('|');
            if (csp.length > 1) {
                row.append(cell.html(csp[0]));
                var tt = csp[1].replace('"', '');
                $.each($.parseJSON(csp[1]), function(k, v) {
                    cell.attr(k, v);
                });
            }
        } else
            row.append(cell.html(c));
    });

    var foot = $('<tfoot>').appendTo(table);
    if (css == "general")
        foot.addClass("ui-widget-header");
    foot.append(row);

    return table;
}

function colCount(table) {
    var colCount = 0;
    $(table).find('tr:nth-child(1) td').each(function() {
        if ($(this).attr('colspan')) {
            colCount += +$(this).attr('colspan');
        } else {
            colCount++;
        }
    });
    return colCount;
}

function appendPage(table) {
    var foot = table.find('tfoot');
    if (!foot.length) foot = $('<tfoot class=\"ui-widget-header\">').appendTo(table);

    //insert page
    var page = $("<tr/>");
    cell = $("<td colspan='" + colCount(table) + "'/>");
    cell.append($("<div class='pagination pagination-centered hide-if-no-paging'/>"));
    page.append(cell);
    foot.append(page);
    $(table).footable();
    return table;
}
// $('#tbFilter').find('tbody tr').each(function(i, trr) {
//     if (i == 1) {
//         $(trr).children().each(function(j, tdd) {});
//     }
// });

function paginated(id, rownum, pagernum) {
    if (typeof rownum == "undefined" | rownum == "") rownum = 10;
    if (typeof pagernum == "undefined" | pagernum == "") pagernum = 10;
    var tb, dvpg;
    if (typeof id == "object") {
        tb = id;
        id = "tbpg" + idMake();
        tb.attr("id", id);
        dvpg = $("#pg");
    } else {
        tb = $('#' + id);
        dvpg = $("#pg" + id);
    }
    tb.each(function() {
        var currentPage = 0;
        var numPerPage = rownum;
        var $table = $(this);
        $table.bind('repaginate', function() {
            $("#" + id + ">tbody>tr").hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
        });
        $table.trigger('repaginate');
        var numRows = $("#" + id + ">tbody>tr").length;
        var numPages = Math.ceil(numRows / numPerPage);
        if (numPages >= 1) {
            $table.parent().find(".pager").remove();
            var $pager = $("<div class='pager'></div>");
            for (var page = 1; page <= numPages; page++) {
                $('<span class="page-number"></span>').text(page).bind('click', {
                    newPage: page - 1
                }, function(event) {
                    currentPage = event.data['newPage'];
                    $table.trigger('repaginate');
                    $(this).addClass('active').siblings().removeClass('active');
                }).appendTo($pager).addClass('clickable');
            }
            $pager.insertAfter($table).find('span.page-number:first').addClass('active');
        }
    });
    var str = "div.pager {text-align: center; margin: 0.3em 0;}";
    str += " div.pager span { display: inline-block;width: 1em; height: 1em; line-height: 1;text-align: center;cursor: pointer;color: #383838;margin-right: 0.2em;}";
    str += " div.pager span.active { color:#800000;font-weight:bold;text-decoration:underline}";
    styleInsert("paginated", str);

}

function saveTable1(id) {
    var array = [];
    var arr = [];
    $('#' + id).find('tbody tr').each(function(i, trr) {
        arr = [];
        $(trr).find("td").each(function(j, tdd) {
            var inputEl = $(tdd).children().get(0);
            if (typeof inputEl !== "undefined") {
                if ($(inputEl).hasClass("form-inline")) {
                    $($(inputEl).children()).each(function(a, b) {
                        if (a == 0)
                            swit(b, arr);
                    });
                } else
                    swit(inputEl, arr);
            } else {
                arr.push($(tdd).text().trim());
            }
        })
        if (arr.length > 0)
            array.push(arr);
    });
    var newarr = [];
    $(array).each(function(i, k) {
        newarr.push(removetrim(k));
    });

    function swit(inputEl, arr) {
        switch (inputEl.tagName) {
            //case "DIV":
            //    if ($(inputEl).hasClass("form-inline")) {
            //        $($(inputEl).children()).each(function (a, b) {
            //            swit($(b), arr);
            //        });
            //    }
            //    break;
            case "SPAN":
                if ($(inputEl).attr("class") == "container") {
                    arr.push($($(inputEl).children()[0]).val());
                } else if (typeof $(inputEl).attr("title") != "undefined" && $(inputEl).attr("title") != "")
                    arr.push($(inputEl).attr("title"));
                else
                    arr.push($(inputEl).text());
                break;
            case "SELECT":
                if ($(inputEl).attr('class') == 'multiselect') {
                    arr.push($(inputEl).multipleSelect('getSelects'));
                } else
                    arr.push($(inputEl).val());
                break;
            case "INPUT":
                if ($(inputEl).attr('type') == 'checkbox') {
                    var chk = $(inputEl).is(':checked');
                    if (chk) { arr.push(true); } else { arr.push(false); }
                } else {
                    if ($(inputEl).siblings().length > 0 && $(inputEl).siblings().prop("tagName") == "INPUT") {
                        arr.push($(inputEl).val() + ":" + $(inputEl).siblings().val());
                    } else
                        arr.push($(inputEl).val());
                }
                break;
            case "LABEL":
                arr.push($(inputEl).text());
                break;
        }
    }

    function removetrim(array) {
        var rtn = [];
        $(array).each(function(i, k) {
            if (typeof k == "string")
                k = k.trim();
            rtn.push(k);
        });
        return rtn;
    }
    return newarr;
}

function saveTable(id, removeblank, saveallfield) {
    //removeblank: true,false, saveallfield:true,false(true==save all column, false=not save first column)
    if (typeof removeblak == "undefined") removeblank = false;
    if (typeof saveallfield == "undefined") saveallfield = false;
    var array = [],inputArr;
    var arr = [];
    $('#' + id + '>tbody>tr').each(function(i, trr) {
        arr = [];
        $(trr).children().each(function(j, tdd) {
            var inputEl;
            var num = 0;
            if (saveallfield) num = -1;
            if (j != num) {
                inputArr = $(tdd).children();
                if (inputArr.length == 0 && $(tdd).text() != "")
                    //in case td has text title
                    arr.push($(tdd).text());
                $(inputArr).each(function(s, m) {
                    inputEl = m;

                    if (typeof inputEl !== "undefined") { //&& s<2) {
                        swit(inputEl, arr);
                    }
                });

            } else {
                arr.push($(tdd).text());
            }
        })
        if (arr.length > 0)
            array.push(arr);

    });
    var arr = [];

    if (removeblank) {
        $(array).each(function(i, k) {
            console.log(k[1])
            if (k[1] != "" && k[1] != "undefined" && k[1] != null && typeof k[1] != "undefined")
                arr.push(k);
        });
        array = arr;
    }

    function swit(inputEl, arr) {

        switch (inputEl.tagName) {
            case "DIV":
                if ($(inputEl).attr('class') == 'dd-container') {
                    arr.push($("#" + $(inputEl).attr("id") + " .dd-selected-value").val());
                } else if ($(inputEl).attr('class') == 'form-inline')
                    arr.push($(inputEl).find("input:eq(0)").val());
                else
                    arr.push($(inputEl).text());
                break;
            case "TEXTAREA":
                arr.push($(inputEl).val());
                break;
            case "LABEL":
            case "SPAN":
                if ($(inputEl).attr("class") == "container") {
                    arr.push($($(inputEl).children()[0]).val());
                } else
                    arr.push($(inputEl).text());
                break;
            case "SELECT":
                if ($(inputEl).attr('class') == 'multiselect') {
                    arr.push($(inputEl).multipleSelect('getSelects'));
                } else
                    arr.push($(inputEl).val());
                break;
            case "INPUT":
                if ($(inputEl).attr('type') == 'checkbox') {
                    var chk = $(inputEl).is(':checked');
                    if (chk) { arr.push(true); } else { arr.push(false); }
                } else if ($(inputEl).attr('type') == 'color' && $(inputEl).attr("value") == "") { arr.push(""); } else {
                    if ($(inputEl).siblings().length > 0 && $(inputEl).siblings().prop("tagName") == "INPUT") {
                        arr.push($(inputEl).val() + ":" + $(inputEl).siblings().val());
                    } else
                        arr.push($(inputEl).val());
                }
                break;

        }
    }
    return array;
}
function saveTableObject(id){
    /* //////// FUNCTION DESCRIPTION ////////
        name: Table save object form
        desc: [{head1:row1, head2:row2}] style return
        date: 2019.2.21
    */
     var arr=[],head=[],set;
    
     $("#" + id + ">thead>tr th").each(function(l, m) {
       head.push($(m).text());
    });
     $(saveTable1(id)).each(function(i,k){
        set={};
        $(k).each(function(a,b){
            set[head[a]]=b;
        });
        arr.push(set);
     })
    return arr;
}

function saveTableHead(id) {
    //object type return : {"id":"a", "title":"b"}
    var arr=[],set = {};
    $("#" + id + ">tbody>tr").each(function(l, m) {
        set={};
        $(m).find("td>span").each(function(i, k) {
            let th = $("#" + id + " th:eq(" + i + ")>span").text();
            set[th] = $(k).text();
        });
        arr.push(set);
    });
    return arr;
}
//#endregion

//#region drag & drop box
function dndboxInit(gdt, ctrtype) {
    var dndcontain = $("#dndcontain_" + ctrtype),
        evlist = "",
        datacode;
    if (typeof gdt != "undefined") {
        if (gdt.hasOwnProperty("eventlist"))
            evlist = gdt.eventlist;
        if ($("#spDatacode").text() != "") datacode = $("#spDatacode").text()
        else if (gdt.hasOwnProperty("data")) {
            if (gdt.data.hasOwnProperty("datacode"))
                datacode = gdt.data.datacode;
            else if (gdt.data.hasOwnProperty("code"))
                datacode = gdt.data.code;
        }
    }
    dndcontain.append(makedndbox(dndcontain, evlist, dndbatchInsert, actionclick, [datacode, dndcontain, ctrtype]));
    //dndboxInit(evlist, actionclick, dndcontain, [datacode, dndcontain]);
    var reload = $("<i class='fa fa-rotate-right fa-lg imdim' style='padding-top:10px;float:right'/>");
    reload.prependTo(dndcontain);
    reload.click(function() {
        reloadAction(gdt, ctrtype);
    });
}

function reloadAction(gdt, ctrtype) {
    console.log(gdt, ctrtype);
    //when change db src, reset action
    if (typeof gdt != "undefined") {
        var dndcontain = $("#dndcontain_" + ctrtype),
            evlist = "",
            datacode;
        dndcontain.empty();
        if (typeof gdt != "undefined" && gdt.hasOwnProperty("eventlist"))
            evlist = gdt.eventlist;
        if ($("#spDatacode").text() != "") datacode = $("#spDatacode").text();
        else if (gdt.hasOwnProperty("data")) datacode = gdt.data.datacode;
        dndcontain.append(makedndbox(dndcontain, evlist, dndbatchInsert, actionclick, [datacode, dndcontain, ctrtype]));
        var reload = $("<i class='fa fa-rotate-right fa-lg imdim' style='padding-top:10px;float:right'/>");
        reload.prependTo(dndcontain);
        reload.click(function() {
            reloadAction(gdt, ctrtype);
        });
    } else {
        var id = $("#lbCtr").text();
        if (id != "") {
            if ($("#spdataajax").text() != "") {
                var set = {};
                set.data = JSON.parse($("#spdataajax").text());
                reloadAction(set, ctrtype)
            }
            var imc = selectimctable(menuid, subid, id);
            if (typeof imc != "undefined")
                reloadAction(imc, ctrtype);
        } else {
            var ardt = $("#sparchive").text();
            if (ardt != "") {
                ardt = JSON.parse(ardt);
                jsonReadMyAjax("imclist", mycomp, ardt.type, "code", ardt.code, reloadAction, [ctrtype]);
            }
        }
    }
}

function makedndbox(dvcontain, elist, callback, parentcallback, optarr) {
    //add div  onclick

    var sty = ".dnd{width: 100% border-bottom:solid 0px #AEAEAE;max-height:22px;float:left; }";
    sty += ".dndul { list-style-type: none; display: inline-block;margin:0;padding:0; }";
    sty += ".dndli { padding: 1px; width: 100px;text-align:center;text-overflow: ellipsis; white-space: nowrap; overflow: hidden;padding:0 5px 0 5px;border:solid 1px black;margin-right:3px; height: 34px; float:left;font-size: 1em;cursor:pointer; display: inline-block;}";
    sty += ".hidebtn{border:dashed 1px black;}";
    sty += ".selectlii {color:white !important;background-color:black !important;}";
    sty += ".newaddli{border:dashed 2px yellow !important;}";
    sty += ".dndcontain{overflow:hidden;min-height:35px;margin-top:10px;vertical-align:bottom}";
    styleInsert("dnd-css", sty);
    
    var dv = $("<div style='width:100%;padding:10px;'/>");
    var contain = $(".dnd");
    var trash = $(".fa-trash");
    var ul = $(".dnd").find("ul");
    //  if (contain.length == 0) {
    contain = $("<div class='dnd' />").droppable({
        drop: function(event, ui) { console.log('hi', event) }
    });
    ul = $("<ul class='dndul'/>").sortable({
        revert: false,
        placeholder: "ui-state-highlight"
    });
    contain.append(ul);
    trash = $("<i class='fa fa-trash fa-2x' style='float:left;padding-right:10px'/>");
    contain.appendTo(dvcontain);
    trash.prependTo(dvcontain);
    trash.droppable({
        activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
        drop: function(event, ui) {
            //$(this).addClass("ui-state-highlight")
            if ($("#" + ui.draggable.context.id).siblings().length == 1) {
                Swal.fire({
                    title: "Warning",
                    text: "Delete row completely?",
                    html: true,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: true,
                    closeOnCancel: true
               }).then((isConfirm)=>{
                    if (isConfirm) {
                        $("#" + ui.draggable.context.id).remove();
                        $("#tbBtn").parent().remove();
                    }
                });
            } else {
                $("#" + ui.draggable.context.id).remove();
                $("#tbBtn").parent().remove()
            }
        }
    });

    //  }
    $("<div style='clear:both;'/>").insertAfter(dvcontain);

    ul.disableSelection();
    //add more button
    var addbtn = $("<div id='dvaddbox' style='float:left;padding:2px 7px 0 0;'></div>");
    addbtn.attr("title", "add more contorls in a row");
    addbtn.append($("<i style='color:#797979;'  class='fa fa-plus-square fa-2x imdim'/>"));
    dvcontain.prepend(addbtn);
    addbtn.on("click", function() {
        var num = 1;
        $(ul.find("li")).each(function(i, k) {
            var val = $(k).attr("val");
            if (typeof val != "undefined") {
                val = JSON.parse(val);
                if (val.hasOwnProperty("subseq"))
                    if (parseInt(val.subseq) >= num)
                        num = parseInt(val.subseq) + 1;
            }
        });
        addli(ul, "act" + num, num, "", parentcallback, optarr);
    });
    $(".dnd").parent().css('style', 'margin:10px 20px 10px 0;');
    //if (typeof callback == "function" && typeof elist != "") {
    if (typeof callback == "function") {
        console.log('ssss')
        ul.empty();
        callback(ul, elist, parentcallback, optarr);
    }
}

function dndbatchInsert(ul, elist, parentcallback, optarr) {
    console.log(elist)
    //callbacked from makedndbox
    $(elist).each(function(i, k) {
        var btnname = "";
        if (k.hasOwnProperty("title")) btnname = k.title;
        addli(ul, btnname, k.subseq, k, parentcallback, optarr);

    });
    if (elist == "") addli($(".dndul"), "select", 1, "", parentcallback, optarr);
    ul.find("li").css("width", "100px").addClass("btn btn-secondary");
    // $("button").button();
    setTimeout(function() {
        ul.children().first().click();
    }, 500);
}

function dndautoInsert(insert, code, insertarray, data, ctrtype) {
    //auto insert or remove predifined action button for pivot, form
    switch (insert) {
        case true:
            var ss = {},
                elist = [];
            $(insertarray).each(function(i, k) {
                var n = i + 1;
                var btn = { seq: n, subseq: n, code: code + "_" + n, type: "button", position: "bottomright", insert: true };
                var keys = Object.keys(k);
                $(keys).each(function(j, p) {
                    btn[p] = k[p];
                })
                elist.push(btn);
            });
            ss.eventlist = elist;
            ss.data = data;

            $("#dndcontain_" + ctrtype).empty();
            dndboxInit(ss, ctrtype);
            action = false;
            $(insertarray).each(function(j, p) {
                if ($.inArray(p.action, ["save", "update"]) > -1) {
                    $(".dndli:contains('Save')").click();
                    $("#selaction").val("update").trigger("change");
                }
            });

            break;
        case false:
            $(".dndli").each(function(i, k) {
                var val = $(k).attr("val");
                if (val != "") {
                    val = JSON.parse(val);
                    if (val.hasOwnProperty("insert"))
                        $(k).remove();
                }
            })
            $("#tbBtn").parent().remove();
            action = true;
            break;
    }
}

function addli(ul, title, num, val, parentcallback, optarr) {
    var li = $("<li class='dndli'></li>");
    li.attr("id", "dnd" + num);
    if (title == "") title = "act" + num;
    li.text(title);
    li.attr({ "data-toggle": "tooltip", "data-placement": "top", "title": title });
    if (val == "")
        val = { subseq: num, code: "bt" + idMake() };
    li.attr("val", JSON.stringify(val));
    if (val.hasOwnProperty("display") && val["display"] == "hide")
        li.addClass("hidebtn");
    ul.append(li);
    li.tooltip();
    //$("button").button();
    //parentcallback(JSON.stringify(val));
    attachoption(parentcallback, JSON.stringify(val), optarr)
    setTimeout(function() {
        selectedli(li);
        //eventhandler when click btn
        li.on("click", function() {
            selectedli($(this));

            if (typeof parentcallback == "function") {
                //parentcallback($(this).attr("val"));
                attachoption(parentcallback, $(this).attr("val"), optarr)
            }
        });
    }, 100);
    return li;
}

function selectedli(that) {
    that.siblings().removeClass("selectlii");
    that.addClass("selectlii");
}

function attachoption(parentcallback, inputval, optarr) {
    if (typeof optarr == "undefined")
        parentcallback(inputval);
    else
        switch (optarr.length) {
            case 0:
                parentcallback(inputval);
                break;
            case 1:
                parentcallback(inputval, optarr[0]);
                break;
            case 2:
                parentcallback(inputval, optarr[0], optarr[1]);
                break;
            case 3:
                parentcallback(inputval, optarr[0], optarr[1], optarr[2]);
                break;
        }
}

function dndevtlist(ctrtype) {
    //ctrtype:form,pivot
    var eventlist = [];
    if ($("#dndcontain_" + ctrtype).find(".dndli").length > 0) {
        $("#dndcontain_" + ctrtype).find(".dndli").each(function(i, k) {
            eventlist.push(JSON.parse($(k).attr("val")));
        });
    }
    return eventlist;
}
global.datartnctr = "" //control that can return datacode
function actionclick(val, datacode, dndcontain, ctrtype) {
    //callbacked from dndboxInit
    //all data temporary saved to attr:val within li
    //data list for mapping
    console.log('imin')
    $("#tbBtn").parent().remove();
    actionclick.actionlist = actionlist;
    actionclick.showhide = showhide;
    actionclick.showhidedatamap = showhidedatamap;
    var fieldlist = [],
        btnlist = [],
        anum = 1;
    if ($(".dndli").length > 0) anum = $(".dndli").length;
    var dtt = $("#spdataajax").text();
    var dt1 = $("#spdlist").text();
    //if (dt1 != "" && dt1 != "[]") {
    //    var dt2 = JSON.parse(dt1)[0];
    //    dtt = JSON.parse(dtt);
    //    fieldlist=Object.keys(dt2);
    //}
    //console.log(fieldlist)
    if (typeof val != "undefined" && val != "") val = JSON.parse(val)
    // val = JSON.parse($(".dndul .selectlii").attr("val"));
    console.log(val)
    var seq = '1',
        code = "",
        object = "",
        event = "click",
        title = "act" + anum,
        position = "bottomright",
        /*linkfield = "",*/ display = "show",
        callback = "",
        icon = "",
        name = '',
        bstyle = '',
        bwth = false,
        data = '',
        keycode = '',
        local = '',
        url = '',
        sdata = '',
        script = "",
        saveplace = "",
        actiontype = "",
        connectstring = "",
        dtype = "",
        action = "",
        confirm = false,
        parameter = "",
        dataset = datacode,
        mapping = [],
        jsonscheme = [],
        reloadlist = [];


    if (val.hasOwnProperty("subseq")) seq = val.subseq;
    if (val.hasOwnProperty("code")) code = val.code;
    if (val.hasOwnProperty("title")) title = val.title;
    else code = "bt" + idMake();
    if (val.hasOwnProperty("object")) object = val.object;
    if (val.hasOwnProperty("type")) object = val.type;
    if (val.hasOwnProperty("event")) event = val.event;
    if (val.hasOwnProperty("position")) position = val.position;
    // if (val.hasOwnProperty("linkfield")) linkfield = val.linkfield;
    if (val.hasOwnProperty("display")) display = val.display;
    if (val.hasOwnProperty("buttonname")) name = val.buttonname;
    if (val.hasOwnProperty("buttonstyle")) bstyle = val.buttonstyle;
    if (val.hasOwnProperty("buttonwidth")) bwth = val.buttonwidth;
    if (val.hasOwnProperty("callback")) callback = val.callback;
    if (val.hasOwnProperty("icon")) icon = val.icon;
    if (val.hasOwnProperty("script")) script = val.script;
    if (val.hasOwnProperty("dtype")) dtype = val.dtype;
    if (val.hasOwnProperty("actiontype")) actiontype = val.actiontype;
    if (val.hasOwnProperty("connectstring")) connectstring = val.connectstring;
    if (val.hasOwnProperty("command")) action = val.command;
    if (val.hasOwnProperty("action")) action = val.action;
    if (val.hasOwnProperty("confirm")) confirm = val.confirm;
    if (val.hasOwnProperty("parameter")) parameter = val.parameter;
    if (val.hasOwnProperty("data")) data = val.data; //JSON.stringify(saveTable("tbform"))
    if (val.hasOwnProperty("keycode")) keycode = val.keycode;
    if (val.hasOwnProperty("local")) local = val.local;
    if (val.hasOwnProperty("serverurl")) url = val.serverurl;
    if (val.hasOwnProperty("serverdata")) sdata = val.serverdata;
    if (val.hasOwnProperty("dataset")) dataset = val.dataset;
    if (val.hasOwnProperty("mapping")) mapping = val.mapping;
    if (val.hasOwnProperty("jsonscheme")) jsonscheme = val.jsonscheme;
    if (val.hasOwnProperty("reloadlist")) reloadlist = val.reloadlist;
    if ($("#tbBtn").length == 0) {
        var data1 = [];
        var poslist = "select,,selected,disabled;out,topright;out,topleft;out,bottomleft;out,bottomright";
        switch (ctrtype) {
            case "jqgrid":
                poslist = "select,,selected,disabled;out,topright;out,topleft;out,bottomleft;out,bottomright;in,rowleft;in,rowright;in,pager";
                break;
            case "jstree":
                poslist = "select,,selected,disabled;out,topright;out,topleft;out,bottomleft;out,bottomright;" +
                    "node,click;node,create;node,rename;node,delete;node,move";
                break;
            case "html":
                poslist = "select,,selected,disabled;out,topright;out,topleft;out,bottomleft;out,bottomright";
                var editor = htmlsrc[0];
                $(editor).find("*").each(function(i, k) {
                    var nodename = $(k).prop("nodeName"),
                        name;
                    if ($.inArray(nodename, ["INPUT", "BUTTON"]) > -1 | $(k).hasClass("clickable")) {
                        switch (nodename) {
                            case "INPUT":
                                poslist += ";domobject," + $(k).val() + "," + $(k).outerHTML();
                                break;
                            case "BUTTON":
                            case "SPAN":
                            case "DIV":
                            case "LABEL":
                                poslist += ";domobject," + $(k).text() + "," + $(k).outerHTML();
                                break;
                            case "I":
                                poslist += ";domobject," + $(k).attr("id") + "," + $(k).outerHTML();
                                break;
                        }
                    }
                });
                if ($("#notice").length == 0) {
                    $("<div id='notice' style='width:200px' data-toggel='popover' class='imdim' title='How to add click point' data-content='include class=\"clickable\" in any domobjects except input,button'>" +
                        "<i class='fa fa-info-circle marginright' />add click points </div>").insertAfter($("#dndcontain_html"));

                    $("#notice").popover({
                        placement: "top"
                    });
                    styleInsert("popover_css", ".popover{max-height:300px }");
                }
                break;
        }
        var objlist = ["button", "icon", "anchor,link"];
        switch (ctrtype) {
            case "map":
                objlist = $.merge(objlist, ["map", "marker"]);
                break;
        }

        console.log('chkevent 1-0', event, action)
        var dv1 = $("<div class='roundbox' style='padding:10px;clear:both;'/>");
        data1.push([makeCtr(["label", "Seq", , "width:120px", ]), makeCtr(["label", seq, "lbSeq", , ])]);
        data1.push([makeCtr(["label", "Code", , "width:120px", ]), makeCtr(["label", code, "lbCode", , ])]);
        data1.push([makeCtr(["label", "Title", , "imdim", ]), makeCtr(["input", title, 'inptitle', , "onkeyup:buttonupdate($(this).val())"])]);
        data1.push([makeCtr(["label", "Object", , "imdim", ]), makeCtr(["select", objlist.join(";"), "selobject", , "placeholder:Select"])]);
        data1.push([makeCtr(["label", "ButtonName", , "imdim", ]), makeCtr(["input", name, 'inpbname', , ])]);
        data1.push([makeCtr(["label", "ButtonStyle", , "imdim", ]), "<div class='form-inline'>" + makeCtr(["input", bstyle, 'inpbstyle', , "col-10"]) +
            "<i class='fa fa-image fa-2x marginleft imdim' onclick=\"loadbtnstyle($(this).prev(),'#tbBtn')\"/></div>"
        ]);
        data1.push([makeCtr(["label", "ButtonWidth", , "imdim", ]), makebootcustom('checkbox', ['fit width'], 'cbbuttonwidth').outerHTML()]);
        data1.push([makeCtr(["label", "Icon", , "imdim", ]), makeCtr(["i", , , icon, ]) + "&nbsp;" + makeCtr(["span", icon, "lbicon", "inp", ]) + "&nbsp;" +
            makeCtr(["i", "", "btnediticon", "fa fa-external-link-square fa-lg imdim", ""])
        ]);
        data1.push([makeCtr(["label", "Position", , "imdim", ]), makeCtr(["select:selectgroup", poslist, "selposition", , ""])]);
        data1.push([makeCtr(["label", "Display", , "imdim", ]), makeCtr(["select", "show;hide;hover", "seldisplay", , ""])]);
        data1.push([makeCtr(["label", "Event", , "imdim", ]), makeCtr(["select", , "selevent", , "placeholder:Select"])]);
        data1.push([makeCtr(["label", "Action", , "imdim", ]), makeCtr(["select", , "selaction", , ""])]);
        data1.push([makeCtr(["label", "Confirm", , "imdim", ]), makebootcustom('checkbox', ['need confirm before execute'], 'cbconfirm').outerHTML()]);
        // data1.push([makeCtr(["label", "Parameter", , "imdim", ]), makeCtr(["input",parameter , "inpparam", , ""])]);


        var sty = "-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;width:100%;overflow:hidden";
        //$("#tbBtn>tbody>tr").last().find("textarea").attr("onkeyup", "auto_grow($(this))");//make textarea auto scrolling expand
        // data1.push([makeCtr(["label", "Actiontype", , , ]), makeCtr(["span", actiontype, "spactiontype", , "onchange:buttonupdate($(this).val())"])]);

        data1.push([makeCtr(["label", "Script", "helpicon", "qtipinfo", ]), makeCtr(["textarea", script, "txScript", sty, "onkeyup:auto_grow($(this))"])]);

        // data1.push([makeCtr(["label", "ConnectString", , , ]), makeCtr(["span", connectstring, "spconnectstring", , ])]);
        data1.push([makeCtr(["label", "Dataset", , , ]), makeCtr(["span", dataset, "lbactiondatacode", "qtipedit", ])]);
        data1.push([makeCtr(["label", "Mapping", , , ]), makeCtr(["span", , "spmap", , ""])]);
        data1.push([makeCtr(["label", "Callback", , "imdim", ]), makeCtr(["select", "", "selcallback", , ""])]);
        var tb3 = makeTable("tbBtn", data1, "", { hasthread: false, hasbackgroundcolor: false, hasborder: false });
        var tr = $("<tr/>");
        tb3.find("tbody").append(tr);
        var btn = '<div style="padding:10px 5px 0 0;text-align:right;"><button class="btn btn-secondary" >Save</button></div>';
        dv1.append(tb3);
        dv1.append(btn);
        dndcontain.append(dv1);

        tb3.find("tbody>tr").each(function(i, k) {
            $(k).find("td:eq(1)").children().not("i,span,div,label").addClass("form-control");
            $(k).find("td:eq(0)").css({ "vertical-align": "top" });
        });

        $("#selobject").on("change", function() {
            showhide($(this).val());
            selectupdate($("#selevent"), eventlistfinder(ctrtype, $(this).val()));
            selectupdate($("#selaction"), actionlistfinder($(this).val()));
        });

        $("#lbactiondatacode").bind("triggerevent", function() {
            //when select dataset to insert/update trigger
            if ($("#selaction").val() == "") action = $("#selaction").val();
            //jsonReadMyAjax("imcdata",mycomp, "", "code", $(this).text(), actionclick.actionlist, [action]);
            jsonDataMyAjax($(this).text(), datasetRead, "", [{ callback: actionclick.actionlist, action: action }]);
        });
        $("#lbactiondatacode").click(function() {
            var contain = $("<div id='dvtempdata'/>");
            $("#tbData").appendTo(contain);
            var opt = makedialogoption();
            opt.appendTo = "#tab-Contain";
            opt.title = "Data List";
            opt.height = 450;
            opt.close = function(event, ui) {
                $("#Data").append($(makeDatasrc()))
                $(this).dialog('destroy').remove();
            }
            opt.buttons = [];
            contain.dialog(opt);
            datartnctr = $(this);
            //jsonReadMyAjax("imcdata",mycomp, "", "code", $(this).text(), editDatacodecallback);
            jsonDataMyAjax($(this).text(), editDatacodecallback);
        });
    }

    if (url != "") {
        if ($('#selHref option[value=' + url + ']').length > 0)
            $("#selHref").val(url);
        else
            $("#inpHref").val(url)
    }

    $("#lbSeq").text(seq);
    $("#inpbname").val(name);
    $("#txScript").val(cleanup(script, ""));
    $("#selobject").val(object);
    // showhide($(this).val());
    if (bwth) $("#cbbuttonwidth").prop("checked", true);
    if (confirm) $("#cbconfirm").prop("checked", true);
    $("#selposition").val(position);
    $("#seldisplay").val(display);

    $("#lbCode").text(code);
    $("#lbicon").text(icon);
    var iconcls = "fa " + icon;
    if (icon.indexOf("ui-") > -1) iconcls = "ui-icon " + icon;
    $("#lbicon").prev().attr("class", iconcls)
    //if(reloadlist!="")
    //reloadpagelist(JSON.parse(reloadlist))

    var txt = "$curid:current id,$nextbtn,$nextbtn2, $prevbtn,$prevbtn2, $name: staffname, $id:staffid, $comp:companycode, $boss:bossid, $division:division";
    var opt = { title: "Script Help", "font-size": 14, show: "click" };
    qtip($("#helpicon"), txt, opt);
    $("#btnediticon").on("click", function() {
        faLoad('lbicon', $("#lbicon").text());
    });

    //#region add new localStorage
    function newlocal(lname) {
        $("<span style='margin-right:20px;' id='dvnewlocal1'/>").append($("<label style='margin-right:10px;'>" + lname +
                "</label><i onclick=\"$('#sellocal').show();$('#sellocal').prop('selectedIndex', 0);$(this).parent().remove();$('#dvnewlocal').parent().remove()\" class='fa fa-times-circle imexpand'/>"))
            .insertBefore($("#btnnewlocal"));
        $("#sellocal").hide();
    }
    var data1 = [];
    var localarr = [];
    $(Object.keys(localStorage)).each(function(i, k) {
        if (k != "imcdata" && k != "formlist") {
            localarr.push(k);
        }
    });
    data1.push([makeCtr(["label", "Parent", , "width:100px", ]), makeCtr(["select", "None,none;" + localarr.join(';'), "selnewlocal", "width:99%", ])]);
    data1.push([makeCtr(["label", "Name", , "width:100px", ]), makeCtr(["input", , "inpnewlocal", , "width:99%", ])]);
    var tb2 = makeTable("tbnewlocal", data1, "general", { hasthread: false, hasbackgroundcolor: false, hasborder: false });
    var dia = $("<div id='dvnewlocal'/>").append(tb2);

    $("#btnnewlocal,#btnnewlocal1").on("click", function() {
        if ($("#dvnewlocal").length > 0)
            $("#dvnewlocal").parent().show();
        else {
            dia.dialog({
                height: 'auto',
                width: 400,
                appendTo: "#tbBtn",
                modal: false,
                minHeight: 'auto',
                title: "New Local",
                stack: false,
                close: function(event, ui) {
                    $("#inpnewlocal").val("");
                    $(this).dialog('destroy').remove();
                },
                open: function() {
                    var lname = $("#dvnewlocal1").find("label").text();
                    if (lname != "") {
                        var ll = lname.split('/');
                        switch (ll.length) {
                            case 1:
                                $("#inpnewlocal").val(ll[0]);
                                break
                            case 2:
                                $("#inpnewlocal").val(ll[1]);
                                $("#selnewlocal").val(ll[0]);
                                break;
                        }
                    }
                },
                buttons: [{
                        text: "Create",
                        icons: {
                            primary: "ui-icon-check"
                        },
                        click: function() {
                            if ($("#inpnewlocal").val() != "") {
                                $("#dvnewlocal").parent().hide();
                                $("#dvnewlocal1").remove();
                                var sel = $("#selnewlocal").val() + "/";
                                if (typeof $("#selnewlocal").val() == "undefined" | sel == "/") sel = "";
                                newlocal(sel + $("#inpnewlocal").val());
                                //$("<span style='margin-right:20px;' id='dvnewlocal1'/>").append($("<label style='margin-right:10px;'>" + sel + $("#inpnewlocal").val()
                                //    + "</label><i onclick=\"$('#sellocal').show();$('#sellocal').prop('selectedIndex', 0);$(this).parent().remove();$('#dvnewlocal').parent().remove()\" class='fa fa-times-circle imexpand'/>")).insertBefore($("#btnnewlocal"));

                            } else
                                sweetmsgautoclose("Missing Field", "You missed fillin Name!!");
                        }
                    },
                    {
                        text: "Close",
                        icons: {
                            primary: "ui-icon-close"
                        },
                        click: function() {
                            $(this).dialog('destroy').remove();
                        }
                    }
                ]
            });
        }
    });
    $("#seldisplay").on("change", function() {
        if ($(this).val() == "hide")
            $(".dndli.selectlii").addClass("hidebtn");
        else
            $(".dndli.selectlii").removeClass("hidebtn");
        showhidebtn();
    });
    if ($("#sellocal").prop('selectedIndex') == 0 && local != "")
        newlocal(local);
    //#endregion

    //click save button
    $("#tbBtn").parent().find("button").last().on("click", function() {
        var aform = saveTable("tbBtn", true, false);
        var hidelist = [];
        $("#tbBtn>tbody>tr").each(function(i, k) {
            if ($(k).css("display") == "none")
                hidelist.push($(k).find("label").first().text().toLowerCase());
        })
        var set = {},
            name;
        $(aform).each(function(i, k) {
            //if (k[0] == "Code") name = k[0];
            //else
            name = k[0].toLowerCase();
            if ($.inArray(name, hidelist) == -1)
                switch (name) {
                    case "seq":
                        set[name] = k[1];
                        set["subseq"] = k[1];
                        break;
                    case "title":
                    case "code":
                    case "buttonname":
                    case "buttonstyle":
                    case "data":
                    case "keycode":
                    case "type":
                    case "action":
                    case "parameter":
                    case "actiontype":
                    case "object":
                    case "event":
                    case "connectstring":
                    case "script":
                    case "position":
                    case "dataset":
                    case "display":
                    case "icon":
                    case "callback":
                        set[name.toLowerCase()] = k[1];
                        break;
                    case "buttonwidth":
                    case "confirm":
                        set[name.toLowerCase()] = $("#cb" + name.toLowerCase()).is(":checked");
                        break;
                    case "local":
                        var val = $("#sellocal").val();
                        if ($("#dvnewlocal1").length > 0) {
                            val = $("#dvnewlocal1").find("label").text();
                        }
                        set[name] = val;
                        break;
                    case "serverurl":
                        if (k[1] != "")
                            set[name] = k[1];
                        else
                            set[name] = k[2];
                        break;
                    case "serverdata":
                        set[name] = saveTable1("tbajaxparam")
                        break;
                    case "mapping":
                        set[name] = saveTable1("tbparammap");
                        if ($("#tbjsonmap").length > 0)
                            set[name] = saveTable1("tbjsonmap");
                        break;
                    case "saveplace":
                        var sc = [];
                        $("#cbsaveplace").find("input:checked").each(function(i, ob) {
                            sc.push($(ob).val());
                        });
                        if (sc.length > 0)
                            set[name] = sc.join(",");
                        break;
                    case "reloadlist":
                        var list = []
                        $("#tbapplytable>tbody>tr").each(function(a, b) {
                            $(b).find('td').each(function(c, d) {
                                if (c == 5) {
                                    var set = $(d).find("span").text();
                                    if (set != "")
                                        list.push(JSON.parse(set));
                                }
                            });
                        });

                        set["reloadlist"] = list;
                        break;
                        // case "script":
                        //var command=$("#selaction").val();
                        //set[name] = scriptmake(k[1],command,ctrtype);
                        //   break;
                }
        });
        if (!chkaction(set.action)) {
            delete set.mapping;
            delete set.dataset;
        }
        var slist = Object.keys(set);
        $(slist).each(function(i, k) {
            if (k != "buttonwidth")
                if (set[k] == "" | set[k] == null)
                    delete set[k];
        });

        var curdnd = $(".dndli.selectlii").attr("val");
        if (typeof curdnd != "undefined" && curdnd != "") {
            curdnd = JSON.parse(curdnd);
            if (curdnd.hasOwnProperty("insert"))
                set.insert = true;
        }
        if (set.display == "hide") {
            set.type = "button";
            set.position = "bottomright";
        }
        dndcontain.find(".dndli.selectlii").attr("val", JSON.stringify(set));
        funStop();

        function complete(aform) {
            var rtn = true;
            $(aform).each(function(i, k) {
                if (k[0].toLowerCase() == "mapping") {
                    var mlist = saveTable1("tbparammap");
                    var dt1 = $.grep(mlist, function(a) {
                        return a[a.length - 1] == true;
                    });
                    if (dt1.length == 0)
                        rtn += "Keycode,";
                } else {
                    if (k[1] == "") rtn += k[0] + ",";
                }
            });
            return rtn;
        }
    })
    actsiblinglist();
    $("#selcallback").val(callback);
    $("#inpbname").on("keyup", function() {
        dndcontain.find(".selectlii").text($(this).val());
    });
    $("#tbBtn td").first().css("width", "120px");
    $("#inpajaxparamadd").on("click", function() {
        var inp = makeCtr(["input", , , "width:99%", ]);
        if ($('.paging-nav').length == 1)
            $("#tbajaxparam").paging("destroy");
        appendTableRow($('#tbajaxparam'), [inp, inp, makeCtr(["i", "fa fa-times-circle imdim", , "", ""])]);
        delRowdelegate('tbajaxparam');
        runAfterTableCreate("tbajaxparam", { activepage: "last" });
    });
    // lbactiondatacode differ from datacode
    if (action != "") {
        if (typeof dtt == "object")
            actionlist(dtt, { action: action });
        else
            //jsonDataMyAjax($("#lbactiondatacode").text(), datasetRead, "", [{ callback: actionclick.actionlist, action: action }]);
            jsonDataMyAjax($("#lbactiondatacode").text(), actionclick.actionlist, "", [{ action: action }]);
    } else
        actionlist();

    setTimeout(function() {
        selectupdate($("#selevent"), eventlistfinder(ctrtype, object));
        selectupdate($("#selaction"), actionlistfinder(object));
        var val = $(".selectlii").attr("val");
        if (val != "") {
            val = JSON.parse(val);
            event = val.event;
            action = val.action;
            $("#selevent").val(event);
            $("#selaction").val(action);
        }
        $("#seldisplay").trigger("change");
        showhide(object);
    }, 1000);

    function showhide(typeval) {
        var pos = $("#selposition"),
            icon = $("#lbicon"),
            /*link = $("#sellinkfield"),*/ disp = $("#seldisplay"),
            name = $("#inpbname"),
            sty = $("#inpbstyle"),
            wth = $("#cbbuttonwidth");
        // var command = $("#selaction"), mapping = $("#spmap"), script = $("#txscript");

        $([pos, icon, disp, name, sty, wth]).each(function(i, k) {
            k.closest("tr").hide();
        })
        var slist = [];
        switch (typeval) {
            case "button":
                slist = [pos, disp, name, sty, wth];
                pos.val(position);
                break;
            case "icon":
                slist = [pos, icon, disp];
                pos.val(position);
                break;
            case "link":
                slist = [pos];
                break;
        }
        //if ($("#selaction").val() == "load") {
        //    slist.push(link);
        //}

        $($.unique(slist)).each(function(i, k) {
            k.closest("tr").show();
        });
    }

    function showhidebtn() {
        var type = $("#seldisplay").val();
        var name = $("#inpbname"),
            sty = $("#inpbstyle"),
            pos = $("#selposition"),
            evt = $("#selevent"),
            wth = $("#cbbuttonwidth");
        $([name, sty, pos, evt, wth]).each(function(i, k) {
            k.closest("tr").hide();
        })
        if (type != "hide") {
            $([name, sty, pos, evt, wth]).each(function(i, k) {
                k.closest("tr").show();
            })
        }
    }

    function locallist(local) {
        var dv = $("<div />");
        var localarr = Object.keys(localStorage);
        var ul = $("<select id='sellocal'/>"),
            li = $("<li/>"),
            grp = $("<optgroup/>"),
            selected = "";
        li = $("<option  value='' disabled selected>Select localStorage</option>");
        ul.append(li);
        $(localarr).each(function(i, k) {
            selected = "";
            if ($.inArray(k, ["formlist", "imcdata"]) == -1) {
                grp = $("<optgroup />");
                grp.attr("label", k);
                ul.append(grp);
                var kk = JSON.parse(localStorage.getItem(k));
                $(Object.keys(kk)).each(function(a, b) {
                    if (b == local) selected = "selected";
                    li = $("<option value='" + b + "' " + selected + ">&nbsp;&nbsp;-" + b + "</option>");
                    grp.append(li);
                    selected = "";
                });
            } else {
                if (k == local) selected = "selected";
                li = $("<option value='" + k + "' " + selected + ">" + k + "</option>");
                ul.append(li);
            }
        });
        var btn = $("<i style='margin-left:5px' title='add new localStorage'  id='btnnewlocal' class='fa fa-plus-square imdim'/><span id='btnnewlocal1' class='linkbtn' title='add new localStorage'>add</span>");
        dv.append(ul).append(btn).append(dia);

        return dv;
    }

    function ajaxfunc(list) {
        var data = [];
        data.push([makeCtr(["span", "name", , , ]), makeCtr(["span", "value", , , ]), makeCtr(["span", , , "width:20px", ])]);
        if (typeof list != "undefined" && list.length > 0) {
            $(list).each(function(i, k) {
                data.push([makeCtr(["input", k[0], , "imdim", "width:99%"]), makeCtr(["input", k[1], , "width:99%", ]), makeCtr(["i", "fa fa-times-square imdim", , "width:10px", ""])]);
            });
        }
        var tb2 = makeTable("tbajaxparam", data, "general");
        foot = ['<span id="inpajaxparamadd" style="border:solid 1px lightslategray" class="btnRoundsmall imdim"><i class="fa fa-plus-circle"/>add</span>' +
            '|{"colspan":"3","style":"text-align:right;padding:5px;"}'
        ];
        var tb3 = appendFooter(tb2, foot, "general");

        return tb3;
    }

    function actionlist(dt, opt) {
        var action;
        if (typeof opt != "undefined") {
            if (opt.hasOwnProperty("action")) action = opt.action;
        }
        $("#selaction").empty();
        var datatype;
        $("label:contains('Reloadlist')").closest('tr').remove();
        if (typeof dt != "undefined" && dt.hasOwnProperty("dtype")) datatype = dt.dtype;
        if (typeof dt != "undefined" && dt.hasOwnProperty("querylist")) {
            $(dt.querylist).each(function(i, k) {
                $("#selaction").append($("<option value='" + k.sqlcommand + "'>" + k.buttonname + "</option>"));
            });
            $("#selaction").append($("<option value='" + action + "'>" + action + "</option>"));
            if ($("#spdtimsi").length > 0) $("#spdtimsi").remove();
            $("<span id='spdtimsi' style='display:none'>" + JSON.stringify(dt) + "</span>").insertAfter($("#tbBtn"));
        } else {
            //in case of excel, input,json/xml base data 
            //or the database which doesn't define querylist
            //field list becomes parameters to map
            //update,insert,delete to imcfile
            var actlist = ["select...,", "update", "delete", "load"];

            actlist.push("custom");
            $(actlist).each(function(i, k) {
                if (i == 0) var opt = $("<option value='' disabled selected>Select</option>");
                else {
                    var kk = k.split(",");
                    var name = kk[0],
                        val = kk[0]
                    if (kk.length > 1) val = kk[1];
                    opt = $("<option value='" + val + "'>" + name + "</option>");
                }
                $("#selaction").append(opt);
                $("#spconnectstring").closest("tr").hide();
                $("#spactiontype").closest("tr").hide();
                $("#cbsaveplace").closest("tr").hide();
            });
        }
        $("#selaction").val(action);
        var first = true;
        jsonDataMyAjax($("#lbactiondatacode").text(), actionclick.showhidedatamap, "", [{ action: $("#selaction").val() }]);
        $("#selaction").on("change", function() {
            var txt = $("#selaction option:selected").text().capitalize();
            if (txt == "Selfclose") txt = "Close";
            if ($("#inpbname").val().indexOf("act") > -1)
                $("#inpbname").val(txt);
            //if ($(this).val() == "load")
            //    $("#sellinkfield").closest("tr").show()
            dndcontain.find(".selectlii").text(txt).css("width", "100px");
            $("#txScript").val("");
            if (chkexist($("#selaction").val()))
                sweetmsgautoclose("Warn", "There exists same action!");
            console.log($("#selaction").val())
            jsonDataMyAjax($("#lbactiondatacode").text(), actionclick.showhidedatamap, "", [{ action: $("#selaction").val() }]);

            function chkexist(cval) {
                var rtn = false;
                if (cval != "" && typeof cval != "undefined")
                    dndcontain.find(".dndli:not('.selectlii')").each(function(i, k) {
                        var val = JSON.parse($(k).attr("val")).action;
                        if (typeof val != "undefined" && val == cval) {
                            rtn = true;
                        }
                    });
                return rtn;
            }
        });
    }

    function showhidedatamap(data1, action1) {
        console.log(data1, action1)
        var datatype, script1 = script;
        if (data1.hasOwnProperty("dtype")) datatype = data1.dtype;
        var tr1 = $("#lbactiondatacode"),
            tr2 = $("#spmap"),
            tr3 = $("#spconnectstring");
        var tr4 = $("#spactiontype"),
            tr5 = $("#txScript"),
            tr6 = $("#tdtable");
        $([tr1, tr2, tr3, tr4, tr5, tr6]).each(function(i, k) {
            $(k).closest("tr").hide();
        });
        var type = action1.action;
        switch (type) {
            case "save":
            case "update":
            case "delete":
            case "select":
                $([tr1, tr2]).each(function(i, k) {
                    $(k).closest("tr").show();
                });

                if (datatype == "database") {
                    //$([tr3, tr4]).each(function (i, k) {
                    //    $(k).closest("tr").show();
                    //});
                    if (data1.hasOwnProperty("querylist")) {
                        $(data1.querylist).each(function(i, k) {
                            if (k.sqlcommand == $("#selaction").val())
                                script = k.query;
                        });
                    }
                }
                commandhandler(data1, action1, datatype, true);
                break;
            case "load":
                if ($("label:Contains('Reloadlist')").length == 0) {
                    var tr = $("<tr><td style='padding:3px ;border-collapse:collapse;vertical-align:top;'><label>Reloadlist</label></td><td id='tdtable'></td></tr>")
                    // tr.insertAfter($("#sellinkfield").closest("tr"));
                    tr.insertAfter($("#selaction").closest("tr"));
                    var id = findcurid1(),
                        applyto = "";
                    var evt = $(".dndli.selectlii").attr("val");
                    if (evt != "") {
                        evt = JSON.parse(evt);
                        if (evt.hasOwnProperty("reloadlist"))
                            applyto = evt.reloadlist;
                    }
                    var paramname = menuid + ":" + subid + ":" + id;
                    var tb = reloadpagelist(applyto);
                    $("#tdtable").append(tb);
                    tb.find("tfoot>tr>td>input").first().on("click", function() {
                        reloadmenutree($("#lbCtr").text(), true)
                    });
                } else {
                    tr6.closest("tr").show();
                }
                break;
            case "custom":
                tr5.closest("tr").show();
                tr5.val(scriptmake(script, action1, ctrtype));
                break;
            default:
                $("label:Contains('Reloadlist')").closest("tr").remove();
                break;
        }
    }

    function scriptmake(curscript, action, ctrtype) {
        //complete script adding embedded program
        var curdata = $("#spdtimsi").text();
        if (curdata != "") curdata = JSON.parse(curdata);
        var rtn = "";
        if (curdata.dtype == "database")
            $(curdata.querylist).each(function(i, k) {
                if (k.sqlcommand == action) {
                    rtn = cleanup(curscript, k.query);
                }
            })
        else
            switch (action) {
                case "update":
                    switch (ctrtype) {
                        case "pivot":
                            //origin data
                            var param = saveTable("tbparammap"),
                                keycode = "";
                            var dt = $.grep(param, function(a) {
                                return a[2] == true;
                            });
                            if (dt.length > 0) keycode = dt[0][0];
                            var str = "",
                                datacode = $("#lbactiondatacode").text();
                            str += "//region insert from program";
                            str += " var newdt = pivotInsert('$curid', { type: 'save' })";
                            str += " updatedataset('" + datacode + "', newdt,'" + JSON.stringify(param) + "')";
                            str += "//endof region";
                            rtn = cleanup(curscript, str);
                            break;
                        case "form":
                            break;
                    }
                    break;
                case "delete":
                    break;
                default:
                    rtn = curscript;
                    break;
            }
        if (curscript != "") rtn = curscript;
        return rtn;
    }

    function chkaction(action1) {
        if ($.inArray(action1, ['save', 'update', 'delete']) > -1)
            return true;
        else
            return false;
    }

    function commandhandler(dt, action, datatype, first) {
        var filter1;

        if (typeof datatype == "undefined" && typeof dt == "object") datatype = dt.dtype;
        var valuearr = [];
        $(mapping).each(function(i, k) {
            valuearr.push(k[1]);
        });
        console.log(valuearr)
        if (datatype == "database") {
            $("#spmap").empty()
            $(dt.querylist).each(function(i, k) {
                if (k.sqlcommand == action) {
                    //if (first)
                    //    $("#spmap").append(commandmaptable(k.param, k.filter))
                    var str = "//region insert from program \n" + k.query + "\n//endof region\n";
                    // $("#txScript").val(cleanup($("#txScript").val(), str));
                    var con = dt.connection.split(";");
                    if (con[0].indexOf("DBtype") > -1) {
                        con.splice(0, 1);
                    }
                    $("#spconnectstring").text(con.join(";"));
                    $("#spactiontype").text(k.dtype);
                    filter1 = k.filter;
                }
            });
            //jsonscheme mapping
            var datalist = datalistreturn(dt);
            console.log(datalist)
            var dblist = [];
            $(mapping).each(function(i, k) {
                dblist.push(k[0]);
            });
            //  if (jsonscheme.length == 0) {
            $(Object.keys(datalist[0])).each(function(i, k) {
                if ($.inArray(k, dblist) == -1)
                    mapping.push([k, '', false]);
            });
            mapping = applyFilter(mapping, filter1)

            console.log(mapping, filter1)
            $("#spmap").append(commandjsontable(mapping, filter1));
            //   $("<div id='dvparammap' style='font-weight:bold;font-size:smaller;background-color:#DFDFDF;padding:2px;'>DB Parameters vs Field Mapping</div>").insertBefore($("#tbparammap"));
            $("#tbparammap").css({ "margin-bottom": "15px" })
            $("<div  id='dvfieldmap' style='font-weight:bold;font-size:smaller;background-color:#DFDFDF;padding:2px;'>Form to DB Field Mapping</div>").insertBefore($("#tbjsonmap"));
            toggleTable($("#tbjsonmap"), 1, valuearr)
        } else {
            var dtlist = [],
                dlist = [];
            var datalist = datalistreturn(dt);
            console.log(datalist, datalist[0], Object.keys(datalist[0]));
            dtlist = Object.keys(datalist[0]);
            //if (dt.hasOwnProperty("datascheme")) {
            //    var set = {};
            //    $(dt.datascheme).each(function (a, b) {
            //        dtlist.push(b.fieldname);
            //    });
            //}
            //else if (typeof dt != "undefined" && dt.hasOwnProperty("datalist") && dt.datalist.length > 0)

            //else 
            var keyarr = datakeycodereturn(data);
            $(dtlist).each(function(i, k) {
                var kk = "";
                if ($.inArray(k, keyarr) > -1) kk = true;
                dlist.push([k, kk]);
            });
            console.log(dlist)
            if (first)
                $("#spmap").empty().append(commandmaptable(dlist, dt.filter));
            toggleTable($("#tbparammap"), 1, valuearr);
            $("#tbparammap>tbody>tr").each(function(i, k) {
                var tx = $(k).find("td").first().text();
                $(k).find("select").val(tx);
            });
        }


    }

    function commandmaptable(param, filter) {
        var inputlist = [],
            dblist = [];

        inputlist = fieldnamelist(ctrtype);
        console.log(inputlist)
        var pname = "Parameters";
        if ($("#spconnectstring").text() == "") pname = "DataField";

        var data = [
            [makeCtr(["span", pname, , , ]), makeCtr(["span", "FormField", , , ]), makeCtr(["span", "Keycode", , , ])]
        ];
        if (typeof param != "undefined" && param.length > 0 && param[0].length == 3)
            data = [
                [makeCtr(["span", "Parameters", , , ]), makeCtr(["span", "Field", , , ]), makeCtr(["span", "Type", , , ]), makeCtr(["span", "Keycode", , , ])]
            ];
        if (param != "") {
            $(param).each(function(i, k) {
                if (param[0].length == 3)
                    data.push([k[0], "<div class='form-inline'>" + makeCtr(["select", inputlist.join(";") + ";custom", "", "form-control-sm", ]) + "</div>", k[2], makeCtr(["input:checkbox", , "", "", ""])]);
                else
                    data.push([k[0], "<div class='form-inline'>" + makeCtr(["select", inputlist.join(";") + ";custom", "", "form-control-sm", ]) + "</div>", makeCtr(["input:checkbox", , "", "", ""])]);
            });
        }
        var tb = makeTable("tbparammap", data, "general");
        var foot = ['<input type="button" class="btnRoundsmall" value="reload"  style="padding:0 3px 0 3px;"/>|{"colspan":"' + data[0].length + '","style":"text-align:right;padding:2px;"}'];
        tb = appendFooter(tb, foot, "general");

        $(tb.find("tfoot>tr>td>input")).on("click", function() {
            jsonReadMyAjax("imcdata", mycomp, "", "code", $("#lbactiondatacode").text(), actionclick.actionlist, [action]);
        });
        //$(tb.find("tbody>tr>td:nth-child(2)>select")).each(function (i, k) {
        //    toggleSelect($(this))


        $(mapping).each(function(i, k) {
            $(tb).find("tbody>tr").each(function(a, b) {
                if (i == a) {
                    //$(b).find("select").val(k[1]);
                    //toggleSelect($(b).find("select"), k[1]);
                    $(b).find("input:checkbox").prop("checked", k[k.length - 1]);
                }
                //else
                //    toggleSelect($(b).find("select"));
            })
        });


        return tb;
    }

    function commandjsontable(jsonscheme, filter) {
        var inputlist = [],
            dblist = [];
        inputlist = fieldnamelist(ctrtype);
        console.log(inputlist, ctrtype)
        var data = [
            [makeCtr(["span", "DataField", , , ]), makeCtr(["span", "FormField", , , ]), makeCtr(["span", "Keycode", , , ])]
        ];
        if (jsonscheme != "") {
            $(jsonscheme).each(function(i, k) {
                data.push([k[0], "<div class='form-inline'>" + makeCtr(["select", inputlist.join(";") + ";custom", "", "form-control-sm", ]) + "</div>", makeCtr(["input:checkbox", , "", "", ""])]);
            });
        }
        var tb = makeTable("tbjsonmap", data, "general");
        var foot = ['<input type="button" class="btnRoundsmall" value="reload"  style="padding:0 3px 0 3px;"/>|{"colspan":"' + data[0].length + '","style":"text-align:right;padding:2px;"}'];

        tb = appendFooter(tb, foot, "general");

        $(tb.find("tfoot>tr>td>input")).on("click", function() {
            //jsonReadMyAjax("imcdata",mycomp, "", "code", $("#lbactiondatacode").text(), actionclick.actionlist, [action]);
            jsonDataMyAjax($("#lbactiondatacode").text(), datasetRead, "", [{ callback: actionclick.actionlist, action: action }]);
        });
        //$(tb.find("tbody>tr>td:nth-child(2)>select")).each(function (i, k) {
        //    toggleSelect($(this))
        //});
        $(tb.find("tbody>tr")).each(function(i, k) {
            var tx = $(k).find("td").first().text();
            $(k).find("select").val(tx);
        })

        $(jsonscheme).each(function(i, k) {
            $(tb).find("tbody>tr").each(function(a, b) {
                if (i == a) {
                    $(b).find("select").val(k[1]);
                    // toggleSelect($(b).find("select"), k[1]);
                    $(b).find("input:checkbox").prop("checked", k[2]);
                }
                //else
                //    toggleSelect($(b).find("select"));
            })
        })

        return tb;
    }

    function cleanup(curstr, newstr) {
        var rtn = "";
        var fs = curstr.indexOf("/"),
            ed = curstr.lastIndexOf("/") + 14;
        if (fs == -1) {
            if (newstr != "" && curstr != "") newstr = "\n" + newstr;
            rtn = curstr + newstr;
        } else
            rtn = curstr.substring(0, fs) + newstr + curstr.substring(ed);
        return rtn;
    }

    function actsiblinglist() {
        //for callback list, action list except me
        var list = [{ text: "select", value: "" }, { text: "callbackclose", value: "callbackclose" }, { text: "selfclose", value: "selfclose" }, { text: "selfhide", value: "selfhide" }, { text: "selfreload", value: "selfreload" }];
        $('#selcallback').empty();
        $($(".selectlii").siblings()).each(function(i, k) {
            var vl = JSON.parse($(k).attr("val"));
            list.push({ text: vl.title, value: vl.code });
        });
        $.each(list, function(i, item) {
            $('#selcallback').append($('<option>', {
                value: item.value,
                text: item.text
            }));
        });
    }
}

function eventlistfinder(ctrtype, object) {
    //make selevent list by selobject
    var eventtypelist = ['none', 'click', 'blur', 'change', 'dblclick', 'focus', 'hover', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseeventer', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize'],
        mapevent = [];
    switch (ctrtype) {
        case "map":
            switch ($("#selmaptype").val()) {
                case "google":
                    mapevent = "bounds_changed, center_changed,click,dblclick,drag,dragend,dragstart,heading_changed";
                    mapevent += ",idle,maptypeid_changed,mousemove,mouseout,mouseover,projection_changed,resize,rightclick,tilesloaded,tilt_changed,zoom_changed";
                    mapevent = mapevent.split(',');
                    break;
                case "daum":
                    if (object == "map") {
                        mapevent = "center_changed,zoom_start,zoom_changed,bounds_changed,click,dblclick";
                        mapevent += ",rightclick,mousemove,dragstart,drag,dragend,idle,tilesloaded,maptypeid_changed";
                        mapevent = mapevent.split(',');
                    } else if (object == "marker")
                        mapevent = "click,mouseover,mouseout,rightclick,dragstart,dragend".split(',');
                    break;
                case "naver":
                    mapevent = "bounds_changed,center_changed,centerPoint_changed,click,dblclick,doubletap,drag";
                    mapevent += ",dragend,dragstart,idle,keydown,keyup,longtab,mapType_changed,mapTypeId_changed,mousedown";
                    mapevent += ",mousemove,mouseout,mouseup,panning,pinch,pinchend,pinchstart,projection_changed,removelayer";
                    mapevent += ",resize,rightclick,size_changed,tap,tileloaded,touchend,touchmove,touchstart,twofingertap,zoom-changed,zooming";
                    mapevent = mapevent.split(',');
                    break;
                case "streetdirectory":
                    elist = [];
                    break;
            }
            if (mapevent.length > 0)
                eventtypelist = $.merge(mapevent, ["custom"]);
            break;
        case "marker":
            eventtypelist = ['none', 'click', 'dragstart', 'dragend', 'mouseover', 'mouseout', 'rightclick'];
            var add = ['dblclick', 'drag', 'position_changed', 'mouseup'];
            if ($.inArray($("#selmaptype").val(), ["google", "naver"]) > -1)
                eventtypelist = $.merge(eventtypelist, add);
            break;
    }
    return eventtypelist;
}

function actionlistfinder(object) {
    //make selaction by selobject
    var def = ["load", "selfclose"],
        arr = [];
    switch (object) {
        case "map":
            arr = ["create new marker,createmarker", "remove marker,removemarker", "maintain marker at center,movetocenter"];
            break;
        case "marker":
            arr = ["set marker to center,pantocenter", "return position,inputinsert"];
            break;
        default:
            arr = ["update", "delete"];
            break;
    }
    var mg = $.merge(arr, def);
    return $.merge(mg, ["custom"]);
}

const loadbtnstyle=(input, appendto)=> {
    //input:input object that return style setting, appendto: optional where to ex: #tbBtn
    var data1 = [],
        imglist = [];

    data1.push([makeCtr(["label", "Size", , "width:100px", ]), makeCtr(["select", "Large,lg;Default,default,selected:selected;Small,sm", "selsize", "", ])]);
    imglist.push(",primary,<button class='btn btn-primary col-10'>primary</button>,");
    imglist.push(",secondary,<button class='btn btn-secondary col-10'>secondary</button>,");
    imglist.push(",success,<button class='btn btn-success col-10'>success</button>,");
    imglist.push(",info,<button class='btn btn-info col-10'>info</button>,");
    imglist.push(",warning,<button class='btn btn-warning col-10'>warning</button>,");
    imglist.push(",danger,<button class='btn btn-danger col-10'>danger</button>,");
    data1.push([makeCtr(["label", "Color", , "width:100px", ]), makeCtr(["select:selectimage", imglist.join(";"), "selcolor", "", ])]);

    var tb2 = makeTable("tbstyle", data1, "table");
    var dia = $("<div id='dvstyle' />").append(tb2);
    var opt = {
        width: 450,
        height: 400,
        appendTo: appendto,
        title: "Button Style",
        close: function(event, ui) {
            $(this).dialog('destroy').remove();
        },
        buttons: [{
                text: "Apply",
                icons: {
                    primary: "ui-icon-check"
                },
                click: function() {
                    input.val($("#selsize").val() + ";" + $("#selcolor").data('ddslick').selectedData.value);
                    $(this).dialog('destroy').remove();
                }
            },
            {
                text: "Close",
                icons: {
                    primary: "ui-icon-close"
                },
                click: function() {
                    $(this).dialog('destroy').remove();
                }
            }
        ]
    };
    if (typeof appendto == "undefined") opt.appendto = "#tbBtn";
    dia.dialog(opt);
    var sty = input.val().split(";"),
        cl = "",
        sz = "";
    if (sty != "") {
        $("#selsize").val(sty[0]);
        $("#selcolor  option[value='" + sty[1] + "']").attr('selected', 'selected');

    }
    $('.selectimage').ddslick({
        width: 290,
        imagePosition: "left",
        selectText: "Select a image",
        onSelected: function(selectedData) {
            //callback function: do something with selectedData;
        }
    });
}

function fieldnamelist(ctrtype) {
    //make table field name list
    inputlist = [];
    switch (ctrtype) {
        case "form":
            var list = $("#splistdata").text();
            if (list != "") list = JSON.parse(list);

            if (list.hasOwnProperty("ctrlist"))
                $.each(list.ctrlist, function(i, k) {
                    if ($.inArray(k.ctrtype, ["select", "selectimage", "multiselect"]) > -1) {
                        inputlist.push(k.title + ":text" + "," + k.title + ":text");
                        inputlist.push(k.title + ":value" + "," + k.title + ":value");
                    } else if (k.title != "") //($.inArray(k.ctrtype, ["button", "i"]) == -1 && k.title != "")
                        inputlist.push(k.title + "," + k.title);
                });

            break;
        case "jqgrid":
            var tt = jqCreateColmodel("jqgridedit").colNames;
            $(tt).each(function(i, k) {
                inputlist.push(k + "," + k);
            })
            break;
        default:
            var dt1 = $("#spdlist").text();
            if (dt1 != "" && dt1 != "[]") {
                var dt2 = JSON.parse(dt1)[0];
                inputlist = Object.keys(dt2);
            }
            break;
    }
    inputlist.unshift("select,");
    return jQuery.unique(inputlist)
}
//click to reload or popup control
function reloadpagelist(applylist) {
    var mapfield = "",
        loadtype = "";
    var data = [
        [makeCtr(["span", "Seq", , , ]), makeCtr(["span", "Pagename", , , ]), makeCtr(["span", "Control", , , ]), makeCtr(["span", "Mapping", , , ]), makeCtr(["span", "Action", , , ]), makeCtr(["span", "", , , ]), makeCtr(["i", "fa fa-pencil", , , ]), makeCtr(["i", "fa fa-trash", , , ])]
    ];
    if (typeof applylist != "undefined" && applylist != "") {
        $(applylist).each(function(i, k) {
            mapfield = "", mapfield1 = "", loadtype = "", func = "";
            if (k.hasOwnProperty("mapfield") && k.mapfield != "null") { mapfield = k.mapfield;
                mapfield1 = "mapped" }
            if (k.hasOwnProperty("loadtype") && k.loadtype != "null") loadtype = k.loadtype;
            if (k.hasOwnProperty("function") && k.function != "null") func = k.function;
            data.push([k.seq.toString(), k.pagename, makeCtr(["span", k.ctrtype, , "font-size:8px;color:red;margin-right:5px;", ]) + k.dvid, makeCtr(["span", mapfield1, , , "title:" + mapfield]), loadtype, makeCtr(["span", JSON.stringify(k), , "display:none", ]), makeCtr(["i", "fa fa-pencil imdim", , "", ]), makeCtr(["i", "fa fa-trash imdim", , "", ])]);
        });
    }
    var tb = makeTable("tbapplytable", data, "general");
    var foot = ['<input type="button" class="btnRoundsmall" value="add"  style="padding:0 3px 0 3px;"/>|{"colspan":"' + 8 + '","style":"text-align:right;padding:5px;"}'];
    tb = appendFooter(tb, foot, "general");
    setTimeout(function() { reloadeventhander(); }, 1000);
    return tb;
}

function reloadinsert(row) {
    $(row).each(function(i, k) {
        var append = [k.seq, k.pagename, makeCtr(["span", k.ctrtype, , "font-size:8px;color:red;margin-right:5px;", ]) + k.dvid, "", "", makeCtr(["span", JSON.stringify(k), , "display:none", ]), makeCtr(["i", "fa fa-pencil", , , ]), makeCtr(["i", "fa fa-trash", , , ])];
        appendTableRow($("#tbapplytable"), append);
        reloadeventhander();
        rowSortable($("#tbapplytable"));
    });
}

// function cleanupimctable() {
//     //remove blank, orphant
//     var local = localStorage.getItem("imctable");
//     if (local != "") local = JSON.parse(local);
//     $(["", "open", "admin"]).each(function(a, b) {
//         var mpage = menuMyOriginal("menu", b);
//         var spage = menuMyOriginal("submenu", b)
//         var control = menuMyOriginal("control", b)
//         var marr = [],
//             srr = []
//         $.each(mpage, function(s, o) {
//             if (o == "")
//                 mpage.splice(s, 1);
//             else
//                 marr.push(o.menuid);
//         });
//         $.each(spage, function(s, o) {
//             if (o == "" | $.inArray(o.menuid, marr) == -1)
//                 spage.splice(s, 1);
//             else
//                 sarr.push(o.id);
//         });
//         $.each(control, function(s, o) {
//             if (o == "" | o.menuid === false | o.menuid === true | $.inArray(o.menuid, marr) == -1)
//                 spage.splice(s, 1);
//             else
//                 sarr.push(o.id);
//         });
//     });
// }

function reloadedit(rowdt) {
    reloadedit.datasrc = datasrc;
    var gdt = selectimctable(rowdt.menuid, rowdt.subid, rowdt.dvid);
    if (typeof gdt != "undefined" && gdt.hasOwnProperty("data")) {
        var dtcode = datacodereturn(gdt.data);
        console.log(rowdt)
        jsonDataMyAjax(dtcode, datasetRead, "", [{ callback: reloadedit.datasrc, rowdt: rowdt }]);
    } else
        datasrc("", { rowdt: rowdt });

    function datasrc(data, option) {
        var list = "",
            childdata = "",
            rowdt, fieldlist = [];
        console.log(option)
        if (typeof option != "undefined") {
            rowdt = option.rowdt;
        }
        if (data != "") {
            list = datalistreturn(data, "", { "applyfilter": false });
            childdata = data.code;
        }
        console.log(data, rowdt, list)
        var field = [],
            field1 = [];
        if (list.length > 0)
            $.each(list[0], function(i, k) {
                var set = {};
                set.value = i;
                set.text = i;
                field.push(set);
                field1.push(i);
            });
        if ($("#dvParam").length > 0) $("#dvParam").remove();
        var dv = $("<div id='dvParam' style='text-align:left;margin:10px 5px 0 0;background-color:#F2F5F7'></div>");

        //mapping table
        //var sel = makeSelect(field, ["", "value", "text"]);
        //$(sel).attr("id", "selParam1");
        //$(sel).prepend("<option>select...</option>");
        var dtt = $("#spdataajax").text();
        // var dt1 = $("#spdlist").text();
        // if (dt1 != "" && dt1 != "[]") {
        if (dtt != "") {
            dtt = JSON.parse(dtt);
            var dt2 = datalistreturn(dtt);
            fieldlist = Object.keys(dt2[0]);
        }

        var keydata = [
            [makeCtr(["span", "Current", , , ]), makeCtr(["span", "Target", , , ]), makeCtr(["span", "DefValue", , , ]), '']
        ];
        foot = ['<span id="inpaddrow" class="badge badge-default imdim">add</span>|{"colspan":"4","style":"text-align:right;padding:5px;"}'];

        var tbkeymap = makeTable("tbkeymap", keydata, "general");
        tbkeymap = appendFooter(tbkeymap, foot, "general");
        $("#tbkeymap>thead>tr>th").css({ width: 120 });

        function keymapdata() {
            saveTable1("tbkeymap")
        }

        //Load type
        var lt = [],
            loadlist = ['reload', 'popup', 'replace', 'sidebyside', 'pagemove'];
        $.each(loadlist, function(i, k) {
            var set = {};
            set.value = k;
            set.text = k;
            lt.push(set);
        });
        var ltype = makeSelect(lt, ["", "value", "text"]);
        $(ltype).attr("id", "seltype1").addClass("form-control");
        var mapfield = "",
            loadtype = "",
            linkfield = "",
            func = "",
            wth = "";
        var sty = "width: 100%;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;";
        if (rowdt.hasOwnProperty("mapfield")) mapfield = rowdt.mapfield;
        if (rowdt.hasOwnProperty("loadtype")) loadtype = rowdt.loadtype;
        if (rowdt.hasOwnProperty("linkfield")) linkfield = rowdt.linkfield;
        if (rowdt.hasOwnProperty("function")) func = rowdt.function;
        if (rowdt.hasOwnProperty("width")) wth = rowdt.width;
        //var btn = $("<button class='btnRoundsmall' style='margin-left:5px' onclick=\"saveParam('" + pageid + "','" + dvid + "','" + paramname + "')\"> Save </button>");
        //dv.append($("<div style='text-align:center;text-decoration:underline;'>Mapping Field for " +pagename+"("+ dvid + ")</div>"));
        var tb = $("<table />"),
            tr = $("<tr />"),
            td = $("<td style='width:110px'/>");
        dv.append(tb);
        tb.append(tr);
        tr.append(td);
        td.append($("<label for='lbPage'> Page: </label>"));
        td = $("<td />");
        tr.append(td);
        td.append($("<label id='lbPage'> " + rowdt.pagename + "</label>"));
        tr = $("<tr />"), td = $("<td />");
        tb.append(tr);
        tr.append(td);
        td.append($("<label for='lbControl'> Control: </label>"));
        td = $("<td />");
        tr.append(td);
        td.append($("<span style='color:red;margin-right:5px;font-size:8px;'>" + rowdt.ctrtype + "</span><label id='lbControl'>" + rowdt.dvid + "</label>"));

        tr = $("<tr />"), td = $("<td style='vertical-align:top'/>");
        tb.append(tr);
        tr.append(td);
        td.append($("<label> Sel Field: </label>"));
        td = $("<td />");
        tr.append(td);
        td.append($(makeCtr(["select:multiselect", fieldlist.join(";"), "sellinkfield", "width:200px", ""])));

        tr = $("<tr />"), td = $("<td style='vertical-align:top'/>");
        tb.append(tr);
        tr.append(td);
        td.append($("<label for='tbkeymap'> Map Field: </label>"));
        td = $("<td />");
        tr.append(td);
        td.append(tbkeymap);

        tr = $("<tr />"), td = $("<td style='vertical-align:top' />");
        tb.append(tr);
        tr.append(td);
        td.append($("<label for='txFunc'> Function: </label>"));
        td = $("<td />");
        tr.append(td);
        td.append($("<textarea class='form-control' style='" + sty + "' id='txFunc'/>"));

        tr = $("<tr />"), td = $("<td />");
        tb.append(tr);
        tr.append(td);
        td.append($("<label for='seltype1'> Load Type: </label>"));
        td = $("<td/>");
        tr.append(td);
        td.append(ltype);
        tr = $("<tr style='display:none'/>"), td = $("<td />");
        tb.append(tr);
        tr.append(td);
        td.append($("<label for='seltype1'> width: </label>"));
        td = $("<td />");
        tr.append(td);
        td.append($("<div class='form-inline'><input class='form-control col-10 marginright' value='600'/><span class='col-1'>px</span></div>")); //.append($(makeCtr(["select", "px;%", "", "margin-left:5px", ""])));
        dv.dialog(opt());

        var set;

        function opt() {
            var dialogset = {};
            dialogset.title = "Mapping Field";
            dialogset.width = 600;
            //button
            dialogset.buttons = [];
            set = {};
            set.text = "Save";
            set.icons = { primaray: "ui-icon-disk" };
            set.click = function() {
                rowdt.mapfield = saveTable1("tbkeymap");
                rowdt.loadtype = $(ltype).val();
                rowdt.linkfield = $("#sellinkfield").multipleSelect("getSelects");
                if ($("#txFunc").val() != "")
                    rowdt.function = $("#txFunc").val();
                if ($(ltype).val() == "popup") {
                    var wth = $(ltype).closest("tr").next().find("input");
                    rowdt.width = wth.val();
                }
                var append = [rowdt.seq, rowdt.subid, rowdt.dvid, makeCtr(["span", JSON.stringify(rowdt), , "display:none", ]), makeCtr(["i", "fa fa-pencil", , , ]), makeCtr(["i", "fa fa-trash", , , ])];
                var chkexist = false;
                $("#tbapplytable>tbody>tr").each(function(a, b) {
                    var seq = $(b).find("td:nth-child(1)").text();
                    if (seq == rowdt.seq) {
                        $(b).find('td').each(function(c, d) {
                            switch (c) {
                                case 3:
                                    // $(d).text($(sel).val());
                                    break;
                                case 4:
                                    $(d).text($(ltype).val());
                                    break;
                                case 5:
                                    $(d).find("span").text(JSON.stringify(rowdt));
                                    break;
                            }
                        });
                        chkexit = true;
                    }
                });
                $(this).dialog("destroy");
                //if (!chkexist)
                //    appendTableRow($("#tbapplytable"), append);
                reloadeventhander();
            }
            dialogset.buttons.push(set);

            set = {};
            set.text = "Close";
            set.icons = { primaray: "ui-icon-close" };
            set.click = function() { $(this).dialog("destroy") }
            dialogset.buttons.push(set);
            //dialogset.modal = true;
            //confine
            //dialogset.position = { my: "center", at: "center", of: "#dvtable" };
            return dialogset;
        }

        //$("#tbkeymap>tbody>tr").each(function (a, b) {
        //    var pcode = $(b).find('td:eq(0)>input').val()
        //    var notexist = true;
        //    $(mapfield).each(function (c, d) {
        //        if (d[0] == pcode) {
        //            $(b).last('td').find('select').val(d[1]);
        //            notexist = false;
        //        }
        //    });
        //    if (notexist)
        //        $(b).last('td').find('select').val(pcode);
        //});
        selectmatch(mapfield);
        $("#tbkeymap>thead>tr>th").each(function(i, k) {
            var wth = [120, 150, 120, 20];
            $(k).css({ width: wth[i] });
        });
        $("#inpaddrow").on("click", function() {
            var klist = $("<input class='form-control'/>");
            if (klist.length > 0) inp = klist;
            var append = [klist.outerHTML(), makeCtr(["select", field1.join(";") + ";custom", "", "", ]), "<input  class='form-control'/>", makeCtr(["i", "fa fa-times-circle imdim", , "", ""])];
            appendTableRow($("#tbkeymap"), append);
            delRowdelegate('tbkeymap');
            runAfterTableCreate("tbkeymap", { activepage: "last", pagenum: 5 });
        });
        if ($("#tbkeymap>tbody>tr").length == 0) {
            var rt = rowdt.mapfield;
            $(rt).each(function(i, k) {
                $("#inpaddrow").trigger("click");
                $('#tbkeymap > tbody>tr:last>td').each(function(a, b) {
                    $(b).children().first().val(k[a]);
                });
            });
        }

        // if (mapfield != "") $("#selhidden").multipleSelect("setSelects", JSON.parse(mapfield));
        $("#seltype1").val(loadtype);
        if (loadtype == "popup") {
            $("#seltype1").closest("tr").next().show();
            $("#seltype1").closest("tr").next().find("input").val(wth);
        }
        $("#seltype1").on("change", function() {
            $(this).closest("tr").next().hide();
            if ($(this).val() == "popup") {
                $(this).closest("tr").next().show();
            }
        });
        $("#txFunc").val(func);
        dv.parent().css("z-Index", 500);
        $("#sellinkfield").multipleSelect({
            onClick: function(view) {
                multiselecteventhandler(view);
            },
            onCheckAll: function() {
                multiselectallhandler($("#sellinkfield"), true);
                return false;
            },
            onUncheckAll: function() {
                multiselectallhandler($("#sellinkfield"), false);
                return false;
            },

        });
        setTimeout(function() {
            if (linkfield != "")
                $("#sellinkfield").multipleSelect("setSelects", linkfield);
        }, 500);
    }

    function multiselecteventhandler(view) {
        var chk = false;
        $("#tbkeymap>tbody>tr").each(function(i, k) {
            console.log(view.label, $(k).find("input:eq(0)").val())
            if (view.label == $(k).find("input:eq(0)").val()) {
                chk = true;
                if (!view.checked) {
                    $(k).remove();
                }
            }
        });
        if (view.checked && !chk) {
            $("#inpaddrow").click();
            $("#tbkeymap>tbody>tr:last-child").find("input:eq(0)").val(view.label.trim());
        }
    }

    function multiselectallhandler(that, type) {
        setTimeout(function() {
            var list = that.multipleSelect('getSelects');
            if (!type) {
                that.multipleSelect('checkAll');
                list = $("#sellinkfield").multipleSelect('getSelects');
                that.multipleSelect('uncheckAll');
            }
            $(list).each(function(a, b) {
                multiselecteventhandler({ label: b, checked: type });
            });
            selectmatch(list);
        }, 100);
    }

    function selectmatch(mapfield) {
        $("#tbkeymap>tbody>tr").each(function(a, b) {
            var pcode = $(b).find('td:eq(0)>input').val()
            var notexist = true;
            $(mapfield).each(function(c, d) {
                if (d[0] == pcode) {
                    $(b).last('td').find('select').val(d[1]);
                    notexist = false;
                }
            });
            if (notexist)
                $(b).last('td').find('select').val(pcode);
        });
    }
}

function reloadeventhander() {
    //register eventhandler of reloadpagelist
    $("#tbapplytable>tbody>tr").each(function(a, b) {
        $(b).find("td>i").first().on("click", function() {
            var tx = $(b).find("td>i").first().closest("td").prev().find("span").text();
            reloadedit(JSON.parse(tx));
        });
    });
    delRowdelegate("tbapplytable");
    rowSortable($("#tbapplytable"));
}

function reloadmenutree(id, currentpage, options) {
    var dataset = "",
        jsopt = { textbox: "inNodetext1", valuebox: "inNodevalue1", display: "pop" },
        plugin = ["checkbox", "contextmenu"],
        mlistsel = $("<div class='form-inline'><span>Menu List: </span> " + makeCtr(["select", "All,all;Current,current", "selmlist", "", ""]) + "</div>"),
        callback = "",
        callopt = "";
    $("#" + jsopt.textbox).remove();
    $("#" + jsopt.valuebox).remove();
    if (typeof options != "undefined") {
        if (options.hasOwnProperty("dataset")) dataset = options.dataset;
        if (options.hasOwnProperty("jsopt")) jsopt = options.jsopt;
        if (options.hasOwnProperty("plugin")) plugin = options.plugin;
        if (options.hasOwnProperty("mlistsel")) mlistsel = options.mlistsel;
        if (options.hasOwnProperty("callback")) callback = options.callback;
        if (options.hasOwnProperty("callopt")) callopt = options.callopt;
    }
    //dialog setting
    if ($("#show").length > 0)
        $("#show").dialog("destroy");
    var menubox = $("<div id='show' style='z-index:500'></div>");
    menubox.append(mlistsel);
    menubox.append($("<div id='show1'/>"));
    menubox.dialog(dialogopt(callback, callopt));

    //jstree setting
    jsopt.plugin = plugin;
    $("<input id='" + jsopt.textbox + "' type='hidden' />").appendTo($('body'));
    $("<input id='" + jsopt.valuebox + "' type='hidden' />").appendTo($('body'));
    var data = menutreedata(id, currentpage);
    if (dataset != "") data = dataset;
    loadtreewithdata1("show1", data, jsopt);
    var jstree1 = $('#show1');

    $("#show").parent().css("z-Index", 500);

    //checkbox checked
    setTimeout(function() {
        $.each(menutree_selected(), function(i, k) {
            jstree1.jstree("select_node", "#" + JSON.stringify(k));
        });
        $("#dvParam").remove();
        if (currentpage) $("#selmlist").val("current");
        $("#selmlist").on("change", function() {
            var cp = false;
            if ($(this).val() == "current") cp = true;
            reloadmenutree(id, cp);
        });
    }, 300);

    var set;

    function dialogopt(callback, callopt) {
        var dialogset = {};
        dialogset.title = "Control List";
        dialogset.width = 400;
        //button
        dialogset.buttons = [];
        set = {};
        set.text = "Save";
        set.icons = { primaray: "ui-icon-disk" };
        set.click = function() {
            if (callback != "") {
                callbackexewithparam(callback, callopt);
            } else {
                var applytolist = [],
                    maxseq = 0;;
                var selarr = $('#show1').jstree(true).get_selected();
                $(selarr).each(function(a, b) {
                    if (checkJSON(b)) {
                        var set = JSON.parse(b),
                            chk = true;
                        $(menutree_selected()).each(function(i, k) {
                            if (k.dvid == set.dvid) {
                                chk = false;
                            }
                        });
                        if (chk) {
                            if ($("#tbapplytable>tbody>tr").length == 0) maxseq++;
                            else
                                $("#tbapplytable>tbody>tr").each(function(i, k) {
                                    var cnum = parseInt($(k).find("td").first().text());
                                    if (cnum >= maxseq)
                                        maxseq = cnum + 1;
                                });
                            set.seq = maxseq;
                            set.menutoggle = menutoggle;
                            applytolist.push(set);
                        }
                    }
                });

                reloadinsert(applytolist);
            }
            $(this).dialog("destroy");
        };
        dialogset.buttons.push(set);
        set = {};
        set.text = "Close";
        set.icons = { primaray: "ui-icon-close" };
        set.click = function() { $(this).dialog("destroy") }
        dialogset.buttons.push(set);
        dialogset.modal = true;
        //confine
        //dialogset.position = { my: "center", at: "center", of: "#dvtable" };
        return dialogset;
    }
}

function menutreedata(id, currentpage, options) {
    console.log(id, currentpage, options)
    //menutree data make
    //show current page submenu & control list
    var data = [];
    var level = "control",
        hascontrol = false;
    if (typeof options != "undefined") {
        if (options.hasOwnProperty("level")) level = options.level;
        if (options.hasOwnProperty("hascontrol")) hascontrol = options.hascontrol;
    }
    console.log(hascontrol, options)
    data.push({ id: "0", text: "Menu", parent: "#", icon: "fa fa-home" });
    //$([""]).each(function (a, b) {
    $(["", "open", "admin"]).each(function(a, b) {
        var mpage = menuMyOriginal("menu", b).filter(function(v) { return v !== '' });
        var spage = menuMyOriginal("submenu", b).filter(function(v) { return v !== '' });
        var control = menuMyOriginal("control", b).filter(function(v) { return v !== '' && v.menuid !== false && v.menuid !== true });
        var ctr = selectimctable(menuid, subid, id);
        var title = b;
        if (b == "") title = "main";
        var selectedlist = menutree_selected();
        var marr = [],
            sarr = [];
        if (typeof spage != "undefined" && spage != "") {
            data.push({ id: title, text: title, parent: "0", icon: "fa fa-home" });
            $.each(mpage, function(s, o) {
                set = {};
                set.id = o.menuid + b;
                set.text = o.title;
                set.parent = title;
                set.icon = "fa fa-align-justify";
                set.type = "menuid";
                marr.push(set.id);
                data.push(set);
            });

            $.each(spage, function(s, o) {
                set = {};
                set.id = o.subid;
                set.text = o.text;
                set.parent = o.menuid + b;
                set.icon = "fa fa-file-o";
                set.type = "subid";
                if ($.inArray(set.parent, marr) > -1) {
                    sarr.push(set.id);
                    //excluding no parent data
                    if (hascontrol) {

                        if (o.hasOwnProperty("table") && o.table.length > 0)
                            data.push(set);
                    } else
                        data.push(set);
                }
            });
            if (typeof(control) != "undefined" && level == "control") {
                //data.push({ "id": subid, "text": "Top", "parent": "#" });
                $.each(control, function(j, l) {
                    if (l != null && l != "" && typeof l.subid != "undefined" && typeof l.dvid != "undefined" && l.dvid != "undefined") {
                        if ($.inArray(l.subid, sarr) > -1) {
                            set = {};
                            var ctype = "",
                                mtitle = "",
                                stitle = "";
                            if (l.hasOwnProperty("ctrtype")) ctype = l.ctrtype;
                            var mp = "",
                                sp = "";

                            $(mpage).each(function(x, y) {
                                if (b.menuid + b == l.menuid + b)
                                    mp = y;
                            })
                            $(spage).each(function(x, y) {
                                if (b.subid == l.subid)
                                    sp = y;
                            })

                            if (sp != "" && mp.hasOwnProperty("title")) mtitle = mp.title;
                            if (sp != "" && sp.hasOwnProperty("text")) stitle = ">" + sp.text;
                            var obj = { menuid: l.menuid, subid: l.subid, dvid: l.dvid, ctrtype: ctype, pagename: mtitle + stitle };
                            set.id = JSON.stringify(obj);
                            set.text = ctype + " " + l.dvid;
                            set.parent = l.subid;
                            set.type = "control";

                            switch (ctype) {
                                case "jqgrid":
                                    set.icon = "fa fa-table";
                                    break;
                                case "jstree":
                                    set.icon = "fa fa-dribbble";
                                    break;
                                case "googlechart":
                                    set.icon = "fa fa-bar-chart";
                                    break;
                                case "fullcalendar":
                                    set.icon = "fa fa-calendar";
                                    break;
                                case "content":
                                    set.icon = "fa fa-list-alt";
                                    break;
                                case "map":
                                    set.icon = "fa fa-file-photo-o ";
                                    break;
                                case "ifrm":
                                    set.icon = "fa fa-desktop";
                                    break;
                                case "pivot":
                                    set.icon = "fa fa-table ";
                                    break;
                                case "form":
                                    set.icon = "fa fa-file-text-o ";
                                    break;
                                default:
                                    set.icon = "fa fa-paw";
                                    break;

                            }
                            if ($.inArray(obj, selectedlist) > -1)
                                set.state = { opened: true, selected: true }
                            data.push(set);
                        }
                    }
                });
            }
        }
    });

    var newdt = [],
        txtarr = [];
    if (currentpage) {
        $(data).each(function(i, k) {
            //  if ($.inArray(subid, [k.parent, k.id]) > -1 ) {
            //eliminate self i.e. $("#lbCtr").text()
            if (k.id == subid) {
                k.parent = "#";
                newdt.push(k)
            }
            if (k.type == "control") {
                var obj = JSON.parse(k.id);
                if (obj.subid == subid) {
                    newdt.push(k);
                    console.log(k, obj, obj.subid, subid)
                }
            }
        });
        data = newdt;

    }

    function addicon(ctype, set) {
        switch (ctype) {
            case "jqgrid":
                set.icon = "fa fa-table";
                break;
            case "jstree":
                set.icon = "fa fa-dribbble";
                break;
            case "googlechart":
                set.icon = "fa fa-bar-chart";
                break;
            case "fullcalendar":
                set.icon = "fa fa-calendar";
                break;
            case "content":
                set.icon = "fa fa-list-alt";
                break;
            case "map":
                set.icon = "fa fa-file-photo-o ";
                break;
            case "ifrm":
                set.icon = "fa fa-desktop";
                break;
            case "pivot":
                set.icon = "fa fa-table ";
                break;
            case "form":
                set.icon = "fa fa-file-text-o ";
                break;
            default:
                set.icon = "fa fa-paw";
                break;

        }
        return set;
    }
    console.log(data)
    return data;
}

function menutree_selected() {
    //extract id from current reloadlist 
    var applytolist = [];
    $("#tbapplytable>tbody>tr").each(function(a, b) {
        $(b).find('td').each(function(c, d) {
            if (c == 5) {
                var obj = $(d).find("span").text();
                if (obj != "") {
                    var nbj = {};
                    obj = JSON.parse(obj);
                    nbj.menuid = obj.menuid;
                    nbj.subid = obj.subid;
                    nbj.dvid = obj.dvid;
                    nbj.ctrtype = obj.ctrtype;
                    nbj.pagename = obj.pagename;
                    applytolist.push(nbj);
                }
            }
        });
    });
    return applytolist;
}
//#endregion

//#region tab,container
function makeTab(tabarr) {
    /*
    tabarr{id,head,content,options}
    tabarr.id = "tab-nobg";
    tabarr.head = ["Table", "Model"];
    var content = [];
    tabarr.content = content;
    */
    var tab = $(document.createElement('div'));
    var ul = $(document.createElement('ul'));
    var content = $(document.createElement('div'));
    $(tab).attr("id", tabarr.id);

    if (tabarr.hasOwnProperty("class"))
        $(tab).attr("class", tabarr.class);
    $.each(tabarr.head, function(r, k) {
        var li = $(document.createElement('li'));
        var a = $(document.createElement('a'));
        var href = k,
            html = k;
        if ($.type(k) == "object") { //k=[href:tabid,html:tabname]
            href = k.href;
            html = k.html;
        }
        $(a).attr("href", "#" + href);
        $(a).attr("lang", "en");
        $(a).html(html);
        $(li).append(a);
        $(ul).append(li);
        var tabEl = $("<div />");
        $(tabEl).attr("id", href);
        $(tabEl).append(tabarr.content[r]);
        $(content).append(tabEl);
    });
    $(tab).prepend(ul);
    $(tab).append(content);
    var tabs = $(tab).tabs();

    return tab;
}

function makebootstrapTab(tabarr) {
    var tab = $("<div class='container'/>");
    var ul = $("<ul class='nav nav-tabs'/>");
    var content = $("<div class='tab-content'/>");
    tab.attr("id", tabarr.id);
    tab.prepend(ul);
    tab.append(content);
    $.each(tabarr.head, function(r, k) {
        var li = $("<li/>");
        var a = $("<a data-toggle='tab'/>");
        var href = k,
            html = k;
        if ($.type(k) == "object") { //k=[href:tabid,html:tabname]
            href = k.href;
            html = k.html;
        }
        a.attr("href", "#" + href);
        a.attr("lang", "en");
        a.html(html);
        li.append(a);
        ul.append(li);
        var tabEl = $("<div />");
        tabEl.attr("id", href);

        tabEl.append(tabarr.content[r]);
        content.append(tabEl);
        if (r == 0) {
            li.attr("class", "active");
            tabEl.attr("class", "active");
        }
    });

    return tab;
}

function appendTab(tab, tabarr) {
    var ul = tab.find("ul");
    $.each(tabarr.head, function(r, k) {
        var li = $(document.createElement('li'));
        var a = $(document.createElement('a'));
        $(a).attr("href", "#" + k);
        $(a).html(k);
        $(li).append(a);
        $(ul).append(li);
        var tabEl = $(document.createElement('div'));
        $(tabEl).attr("id", k);
        $(tabEl).append(tabarr.content[r]);
        $(tab).append(tabEl);
    });
    var tabs = tab.tabs();

    return tabs;
}

function makePortlet(arr) {
    /*
    arr={};//{id,head,content,options}
    arr.id = "tab-nobg";
    arr.head = ["Table", "Model","Goal"];
    var content = [];
    content.push("<table width='100%'><tr><td style='width:200px;vertical-align:top;'><div id='dvtable' style='padding:5px 0 5px 0;'></div></td></tr></table>");
    content.push("<table id='jqgridedit' ></table><div id='jqpageedit'></div>");
    content.push("333");
    arr.content=content;
    arr.options={columns:[270,100],colchild:[["Table","Goal"],["Model"]]};//multiple column   일 경우 columnwidth
    , 각 column에 위치할 portlet head
    */
    var container = $("<div/>");
    var style = ".column {width: 270px;float: left;padding-bottom: 100px; }";
    if (typeof arr.options.columns != "undefined") {
        $.each(arr.options.columns, function(i, k) {
            style += ".column c" + i + "{width:" + k + "px; !important;}";
        });
    }
    style += ".portlet {    margin: 0 1em 1em 0;padding: 0.3em;}";
    style += ".portlet-header {    padding: 0.2em 0.3em;margin-bottom: 0.5em;position: relative;  }";
    style += ".portlet-toggle {    position: absolute;top: 50%;right: 0;margin-top: -8px;  }";
    style += ".portlet-content {    padding: 0.4em;  }";
    style += ".portlet-placeholder {    border: 1px dotted black;margin: 0 1em 1em 0;height: 50px;  }";
    styleInsert("portlet-css", style);
    var col = [arr.head];
    if (typeof arr.options.colchild != "undefined") {
        col = arr.options.colchild;
    }
    $(col, function(j, l) {
        dvc = $("<div/>");
        dvc.attr("class", "column c" + j);

        $.each(arr.head, function(i, k) {
            dvh = $("<div/>");
            dvh.attr("class", "portlet");
            dv = $("<div/>");
            dv.attr("class", "portlet-header");
            dv.text(k);
            dvh.append(dv);
            dv = $("<div/>");
            dv.attr("class", "portlet-content");
            dv.text(arr.content[i]);
            dvh.append(dv);
            if ($.inArray(k, l) > -1)
                dvc.append(dvh);
        });
        container.append(dvc);
    });

    $(".column").sortable({
        connectWith: ".column",
        handle: ".portlet-header",
        cancel: ".portlet-toggle",
        placeholder: "portlet-placeholder ui-corner-all",
        stop: function(event, ui) {
            console.log('hhh');
        },
        update: function(event, ui) {
            var inp = makeinput();
            var vv = [];
            $(".portlet-header").each(function(i) {
                vv.push($(this).text());
            });
            inp.val(vv.join(','));
        }
    });

    $(".portlet")
        .addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
        .find(".portlet-header")
        .addClass("ui-widget-header ui-corner-all")
        .prepend("<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

    $(".portlet-toggle").click(function() {
        var icon = $(this);
        icon.toggleClass("ui-icon-minusthick ui-icon-plusthick");
        icon.closest(".portlet").find(".portlet-content").toggle();
    });
    return container;
}

function makeAccordion(arr) {
    /*
    arr={id,header,content,options}
    arr.id = "tab-nobg";
    arr.head = ["Table", "Model"];
    var content = [];
    content.push("<table width='100%'><tr><td style='width:200px;vertical-align:top;'><div id='dvtable' style='padding:5px 0 5px 0;'></div></td></tr></table>");
    content.push("<table id='jqgridedit' ></table><div id='jqpageedit'></div>");
    arr.content = content;
    */
    accordioncss();
    var id = "accord";
    if (arr.id != "") id = arr.id;
    var accord = $("<div />");
    accord.attr("id", id);
    accord.remove();
    var dvg, dv, h;

    $.each(arr.head, function(i, k) {
        dvg = $("<div/>");
        dvg.attr("class", "group");
        dv = $("<div/>");
        dv.append(arr.content[i]);
        h = $("<h3/>");
        h.append(k);
        //        dvg.append(h);
        //        dvg.append(dv);
        //        accord.append(dvg);
        accord.append(h.outerHTML());
        accord.append(dv.outerHTML());
    });
    accord.accordion({
            header: "h3",
            collapsible: true,
            active: 0,
            heightStyle: "content"
        })
        .sortable({
            axis: "y",
            handle: "h3",
            stop: function(event, ui) {
                //ui.item.children( "h3" ).triggerHandler( "focusout" );
                $(this).accordion("refresh");
            },
            //tab order change & save state
            update: function(e, ui) {
                var inp = makeinput();
                var vv = [];
                $(".ui-accordion-header").each(function(i) {
                    vv.push($(this).text());
                });
                inp.val(vv.join(','));
            }
        });
    //    accord.accordion({
    //        event: "click",
    //        collapsible: true,
    //        active: 0
    //    });
    //    accord.accordion();
    return accord;
}

function makeinput() {
    $("#inporder").remove();
    var inp = $("<input/>");
    inp.attr("id", "inporder");
    inp.attr("type", "hidden");
    $(document.body).append(inp);
    return inp
}

function makeContainer(conarr) {
    var container = "";
    if (typeof(conarr) == "undefined") var conarr = {};

    if (!conarr.hasOwnProperty("id")) {
        conarr.id = "dvContainer";
    } else
        $(conarr.id).remove();
    if (conarr.hasOwnProperty("parent")) {
        $("#" + conarr.parent).append(conarr.body).append(conarr.bottom);
    } else {
        if ($("#" + conarr.id).length == 0) {
            container = $(document.createElement('div'));
            $('body').append(container);
            $('body').append("<div class='fade' style='display:block;z-index:20;'></div>"); // onclick=\"$('#" + conarr.id + "').remove();$('.fade').remove();\"></div>");
            $(container).resizable();
        } else
            container = $("#" + conarr.id);
        if (!conarr.hasOwnProperty("class"))
            conarr.class = "pdiv";
        if (!conarr.hasOwnProperty("css"))
            conarr.css = {
                "z-index": "401",
                "border": "solid 1px #97BCE1",
                "-moz-box-shadow": "0 3 3px #000000",
                "-webkit-box-shadow": "0 3 3px #000000",
                "-moz-border-radius": "5px",
                "-webkit-border-radius": "5px",
                "padding": "5px",
                "background-color": "#4A5D84",
                "width": "1024px",
                "height": "auto",
                "position": "absolute",
                "top": "20%",
                "left": "20%"
            }
        if (!conarr.hasOwnProperty("top"))
            conarr.top = "<div id='dvContainTop' onmouseover=\"enabling('" + conarr.id + "')\" onmouseout=\"disabling('" + conarr.id + "')\" style='text-align:right;'><i  onclick=\"$('#" + conarr.id + "').remove();$('.fade').remove();\" style='color:white;' class='fa fa-times-circle-o fa-2x imexpand' /></div>";


        container.css(conarr.css);
        if ($("#dvContainTop").length == 0)
            $(container).prepend(conarr.top);
        $(container).attr("id", conarr.id);
        $(container).attr("class", conarr.class);

        $(container).append(conarr.body);
        $(container).append(conarr.bottom);
    }
    return container;
}

const enabling=(that)=> {
    $("#" + that).draggable().draggable('enable');
}

const disabling=(that)=> {
    $("#" + that).draggable('disable');
}
//#endregion

//#region misc
function clearinserted() {
    //remove all the inserted
    $("#spdlist").remove();
    $("#archivegdt").remove();
    $("#spdataajax").remove();

}

function sweetmsg(title, body,icon) {
    //Swal.fire({
    //    title: "<span style='color:#F8BB86'>Filtering Method<span>"
    //, text: "$[data] will replaced with value string. ex)this is $[data].==> this is value"
    //, showConfirmButton: false
    //, html: true
    //});
    if (typeof body == "undefined" | body == "")
        Swal.fire({ title: "", body: title, html: true });
    else
        Swal.fire({ title: title, text: body, html: true });
}

function sweetmsgautoclose(title, body, options) {
    var timer = 2500;
    if (typeof options != "undefined") {
        if (options.hasOwnProperty("timer")) timer = options.timer;
    }
    if (typeof body == "undefined" | body == "")
        Swal.fire({ title: "", body: title, html: true, timer: timer, showConfirmButton: false });
    else
        Swal.fire({ title: title, text: body, html: true, timer: timer, showConfirmButton: false });
}

const sweetmsgconfirm=(confirmfunc, option)=> {
    var title = "Delete Confirm",
        body = "Are your sure to delete?",
        cookiekey = "cookie" + idMake();
    if (typeof option != "undefined") {
        if (option.hasOwnProperty("title")) title = option.title;
        if (option.hasOwnProperty("body")) body = option.body;
        if (option.hasOwnProperty("cookiekey")) cookiekey = option.cookiekey;
    }
    body = "<div>" + body + "</div><div style='margin:0'><label id='cbcookie' type='checkbox'><i class='fa fa-square-o imdim'/>Don't ask</label></div>"
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
    }).then((isConfirm)=> {
        if (isConfirm) {
            switch (typeof confirmfunc) {
                case "string":
                    evval(confirmfunc);
                    break;
                case "function":
                    confirmfunc();
                    break;
            }
        }
    });


    //$("#cbcookie").on("click", function () {
    //    $(this).find("i").removeClass();
    //    $(this).find("i").addClass("fa fa-check-square-o imdim");
    //    setCookie("noaskdel_" + cookiekey, true, 1);
    //});
}

function makeTable(id, data, css, option) {
    /* table dynamic creation
    var data = [["City 1", "City 2", "City 3"], //headers
    ["New York", "LA", "Seattle"],
    ["Paris", "Milan", "Rome"],
    ["Pittsburg", "Wichita", "Boise"]]
    var tb = makeTable(data);
    appendTableRow(tb, ['data', 'pager', 'rowNum']);
    $("#dvtable").append(tb);
    appendTableRow(tb, ["<input />", "<input type='checkbox'/>", "<textarea />"]);
    */

    var table, hasthread = true,
        hasbackgroundcolor = false,
        hasborder = true;
    if (typeof option != "undefined") {

        if (option.hasOwnProperty("hasthread")) hasthread = option.hasthread;
        if (option.hasOwnProperty("hasbackgroundcolor")) hasbackgroundcolor = option.hasbackgroundcolor;
        if (option.hasOwnProperty("hasborder")) hasborder = option.hasborder;
    }
    table = $("<table style='width:100%'/>");

    //table javascript
    if (id != "") table.attr("id", id);
    var thead = $("<thead/>");
    var tbody = $("<tbody />");
    table.append(thead);
    table.append(tbody);
    if (typeof css != "undefined") {
        //csssimpleInit(table, css);
        if (css == "general") {
            thead.addClass('ui-widget-header');
            tbody.addClass('ui-widget-content');
        }
    }
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        if (hasthread) {
            if (rowIndex == 0)
                thead.append(row);
            else
                tbody.append(row);
        } else {
            tbody.append(row);
        }
        if(typeof r!="undefined")
        $.each(r, function(colIndex, c) {
            var cell = $("<t" + (rowIndex == 0 && hasthread ? "h" : "d") + "/>");
            if (typeof c != "undefined" && c.toString().indexOf("|") > -1) {
                var csp = c.split('|');
                if (csp.length > 1) {
                    row.append(cell.html(csp[0]));
                    $.each($.parseJSON(csp[1]), function(k, v) {
                        cell.attr(k, v);
                    });
                }
            } else
                row.append(cell.html(c));
        });
    });

    ////else {
    //table = $("<table style='border-collapse: collapse;width:100%;" + sty + "' />");
    //if (!hasborder) table = $("<table  style='width:100%;" + sty + "' />");
    //    thead.addClass('ui-widget-header');
    //    tbody.addClass('ui-widget-content');

    //    $.each(data, function (rowIndex, r) {
    //        var row = $("<tr/>");
    //        if (hasthread) {
    //            if (rowIndex == 0)
    //                thead.append(row);
    //            else
    //                tbody.append(row);
    //            if (hasbackgroundcolor && rowIndex != 0 && rowIndex % 2 == 0)
    //                row.css("background-color", "#e8eff5");
    //        }
    //        else {
    //            tbody.append(row);
    //            //if (hasbackgroundcolor && rowIndex % 2 == 0)
    //            //    row.css("background-color", "#e8eff5");
    //        }
    //        $.each(r, function (colIndex, c) {
    //            var cell = $("<t" + (rowIndex == 0 && hasthread ? "h" : "d") + "/>");
    //            if (hasborder)
    //                cell.attr("style", "padding:3px ;border: 1px solid #D3D3D3;border-collapse:collapse;vertical-align:top;");
    //            else if (typeof css == "undefined" | css == "" | css == "general")
    //                cell.attr("style", "padding:3px ;border-collapse:collapse;vertical-align:top;");
    //            if (typeof c != "undefined" && c.indexOf("|") > -1) {
    //                var csp = c.split('|');
    //                if (csp.length > 1) {
    //                    row.append(cell.html(csp[0]));
    //                    $.each($.parseJSON(csp[1]), function (k, v) {
    //                        cell.attr(k, v);
    //                    });
    //                }
    //            }
    //            else
    //                row.append(cell.html(c));
    //            var wth = row.children().first().css("width");
    //            if (wth == "")
    //                wth = row.children().first().children().first().css("width");
    //            if (wth != "")
    //                row.css({ width: wth });
    //        });
    //    });
    //}
    //if rows are composed of checkbox add it on head too
    tbody.find("tr").first().find("td").each(function(i, k) {
        if ($(k).children("input:checkbox").length > 5) {
            var cls = $(k).children("input:checkbox").attr("class");
            thead.find("tr>th>span").each(function(a, b) {
                if (a == i)
                    $(b).prepend($("<input id='all" + cls + "' style='margin-right:5px' type='checkbox' onchange=\"chkalltoggle('" + cls + "')\"/>"))
            })
        }
    });

    return table;
}
function makeTableBoot($tb, bootopt) {
    // apply table  look & feel to bootstrap style
    //table: table, table-dark, table-striped, table-borderd, table-hover, table-sm
    //thead: thead-dark
    //head bold:    <th scope="col">#</th>
    //background c/l: table-active,primary,secondary,danger,warning,info,light,dark
    //responsive: wrap table with div class="table-responsive{-sm|-md|-lg|-xl}"
    //caption: <table class="table">  <caption>List of users</caption>
    /*
        sample css
        var bootopt={tb:"table table-sm table-hover",thead:"thead-dark",responsive:"table-responsive-md",caption:"caption:remark" }
    */

    let tb, thead, responsive, caption;
    if (bootopt.hasOwnProperty('tb')) {
        tb = bootopt.tb;
        $tb.removeClass().addClass(tb);
        $tb.find("thead tr th").attr("scope", "col");
    }
    if (bootopt.hasOwnProperty('thead')) {
        thead = bootopt.thead;
        $tb.find("thead").removeClass().addClass(thead);
    }
    if (bootopt.hasOwnProperty('responsive')) {
        $tb.wrap('<div class='+responsive+'></div>');
    }
    if (bootopt.hasOwnProperty('caption')) {
        caption = bootopt.caption;
        $tb.prepend("<caption>" + caption + "</caption>");
    }
}

function applybootstrap(tb, nth) {
    //nth:index of td that has form control
    //apply bootstrap css
    tb.find("tbody>tr").each(function(i, k) {
        $(k).find("td:eq(1)").children().not('i, span, div,label').addClass("form-control");
    });
}

function makeCtrboot(inp, rtntype) {
    // create control
    // inp=['type','value','id','class','attr']
    var t = inp[0].split(':');
    var type = t[0]
    if (t[0] == "radiolist") t[0] = "div";
    var rtn = document.createElement(t[0]);
    if (t.length > 1)
        type = t[1];
    //class or style
    //if both, join with "|"(ex:style|class)
    if (typeof inp[3] !== "undefined") {
        var dual = inp[3].split("|");
        if (dual.length == 1) {
            var st = inp[3].split(":");
            if (st.length > 1)
                rtn.setAttribute("style", inp[3]);
            else
                rtn.setAttribute("class", inp[3]);
        } else if (dual.length == 2) {
            var st = dual[0].split(":");
            if (st.length > 1) {
                rtn.setAttribute("style", dual[0]);
                rtn.setAttribute("class", dual[1]);
            } else {
                rtn.setAttribute("style", dual[1]);
                rtn.setAttribute("class", dual[0]);
            }
        }

    }
    //attribute(onlick...)
    if (typeof inp[4] !== "undefined" && inp[4] != "") {
        var st1 = inp[4].split("^");
        $.each(st1, function(i, k) {
            var st = k.split(":");
            rtn.setAttribute(st[0], st[1]);
        });
    }

    if (typeof inp[2] !== "undefined" && inp[2] != "") rtn.setAttribute("id", inp[2]);

    switch (type) {
        case "span":
        case "div":
        case "label":
            if (typeof inp[1] !== "undefined" && inp[1] != "")
                //rtn.innerText = inp[1];
                $(rtn).text(inp[1]);
            break;
        case "button":
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                rtn.innerHTML = inp[1];
                rtn.setAttribute("type", "button");
                $(rtn).addClass("form-control");
            }
            break;
        case "i":
            if (typeof inp[1] !== "undefined" && inp[1] != "")
                rtn.setAttribute("class", inp[1]);

            break;
        case "textarea":
            if (typeof inp[1] !== "undefined" && inp[1] != "")
                $(rtn).text(inp[1]);
            if (typeof $(rtn).attr("rows") == "undefined")
                rtn.setAttribute("rows", "3");
            if (typeof $(rtn).attr("cols") == "undefined")
                rtn.setAttribute("cols", "20");
            $(rtn).addClass("form-control");
            break;
        case "input":
            if (typeof inp[1] !== "undefined" && inp[1] != "")
                rtn.setAttribute("value", inp[1]);
            rtn.setAttribute("type", "text");
            $(rtn).addClass("form-control");
            break;
        case "checkbox":

            if (typeof inp[1] != "undefined" && inp[1] != "") {
                if (inp[1] != true && inp[1] != false && inp[1].indexOf(";") > -1) {
                    //checked checkbox (text,value,checked:checked)
                    var val = inp[1].split(";");
                    var rtn = document.createElement("div");
                    rtn.setAttribute("id", inp[2]);
                    $(val).each(function(i, k) {
                        var opt = document.createElement("input");
                        opt.setAttribute("type", "checkbox");
                        if (i > 0)
                            opt.setAttribute("style", "margin-left:10px");
                        var op = k.toString().split(',');
                        var tx = document.createTextNode(op[0]);


                        if (op.length > 1)
                            var valu = op[1];
                        if (op.length == 1) valu = op[0];
                        opt.value = valu;
                        if (op.length > 2) {
                            for (var s = 2; s < op.length; s++) {
                                var att = op[s].split(':');
                                opt.setAttribute(att[0], att[1]);
                            }
                        }
                        rtn.appendChild(opt);
                        rtn.appendChild(tx);
                    });


                } else {
                    rtn.setAttribute("type", "checkbox");
                    if (inp[1] != "" && typeof inp[1] != "undefined")
                        rtn.setAttribute("checked", inp[1]);
                }
            } else
                rtn.setAttribute("type", "checkbox");
            $(rtn).addClass("form-control");
            break;
        case "text":
            rtn.setAttribute("type", type);
            rtn.setAttribute("value", inp[1]);
            break;
        case "color":
            rtn.setAttribute("type", type);
            var colval = inp[1];
            if (inp[1] == "") colval = "#FFFFFE";
            rtn.setAttribute("value", colval);
            rtn.setAttribute("class", "cpicker");
            break;
        case "number":
            rtn.setAttribute("type", type);
            rtn.setAttribute("value", inp[1]);
            if (t.length == 3)
                rtn.setAttribute("step", t[2]);

            break;
        case "datetime":
            rtn.setAttribute("type", "text");
            rtn.setAttribute("class", "datetime");
            break;
        case "select":
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                var val = inp[1].split(';');
                //selected option (text,value,selected:selected)

                $(val).each(function(i, k) {
                    var opt = document.createElement("option");
                    var op = k.toString().split(',');
                    opt.text = op[0];

                    if (op.length > 1)
                        var valu = op[1];
                    if (op.length == 1) valu = op[0];
                    opt.value = valu;
                    if (op.length > 2) {
                        for (var s = 2; s < op.length; s++) {
                            var att = op[s].split(':');
                            opt.setAttribute(att[0], att[1]);
                        }
                    }
                    rtn.appendChild(opt);
                });
            }
            break;
        case "selectgroup":
            //<optgroup label='grp1'><option></option></optgroup>
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                var val = inp[1].split(';');
                //selected option (text,value,selected:selected)
                var grp, optgroup;
                $(val).each(function(i, k) {
                    var opt = document.createElement("option");
                    var op = k.toString().split(',');
                    if (grp != op[0]) {
                        optgroup = document.createElement("optgroup");
                        rtn.appendChild(optgroup);
                        grp = op[0];
                        if (grp != "" && typeof grp != "undefined")
                            $(optgroup).attr('label', op[0]);
                    }
                    optgroup.appendChild(opt);
                    opt.text = op[1];

                    if (op.length > 1)
                        var valu = op[2];
                    if (op.length == 2) valu = op[1];
                    opt.value = valu;
                    if (op.length > 3) {
                        for (var s = 3; s < op.length; s++) {
                            var att = op[s].split(':');
                            opt.setAttribute(att[0], att[1]);
                        }
                    }

                });
            }
            break;
        case "radiolist":
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                var val = inp[1].split(';');

                $(val).each(function(i, k) {
                    var lb = document.createElement("label");
                    var opt = document.createElement("input");
                    lb.setAttribute("for", "rd" + i);
                    opt.setAttribute("type", "radio");
                    opt.setAttribute("id", "rd" + i);
                    opt.setAttribute("name", "rd" + i);

                    var op = k.toString().split(',');
                    lb.innerHTML = op[0];

                    if (op.length > 1)
                        var valu = op[1];
                    if (op.length == 1) valu = op[0];
                    opt.value = valu;
                    if (op.length > 2) {
                        for (var s = 2; s < op.length; s++) {
                            var att = op[s].split(':');
                            opt.setAttribute(att[0], att[1]);
                        }
                    }
                    rtn.appendChild(lb);
                    rtn.appendChild(opt);
                });
            }
            break;
        case "ul":
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                var val = inp[1].split(';');
                $(val).each(function(i, k) {
                    var opt = $(document.createElement("li"));
                    var op = k.toString().split(',');
                    var ahr = $("<a/>");
                    var img = $("<img/>");
                    ahr.text = op[0];
                    switch (op[2]) {
                        case "img":
                            img.src = op[1];
                            ahr.append(img);
                            break;
                        case "icon":
                            img = $("<i/>");
                            img.attr("class", op[1]);
                            ahr.append(img);
                            break;
                    }
                    opt.append(ahr);

                    if (op.length > 2) {
                        for (var s = 2; s < op.length; s++) {
                            var att = op[s].split(':');
                            opt.setAttribute(att[0], att[1]);
                        }
                    }
                    $(rtn).append(opt);
                });
            }
            break;
        case "selectimage":
            //value;text;imgsrc;description(index:0;1;2;3)
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                var val = inp[1].split(';');
                $(val).each(function(i, k) {
                    var opt = document.createElement("option");
                    var op = k.toString().split(',');
                    opt.value = op[0];
                    $(opt).text(op[1]);
                    //opt.text = op[1];
                    opt.setAttribute("data-imagesrc", op[2]);
                    opt.setAttribute("data-description", op[3]);
                    //if (op.length > 2) {
                    //    for (var s = 2; s < op.length; s++) {
                    //        var att = op[s].split(':');
                    //        opt.setAttribute(att[0], att[1]);
                    //    }
                    //}
                    rtn.setAttribute("class", "selectimage");
                    rtn.appendChild(opt);
                });

            }
            break;
        case "multiselect":
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                var val = inp[1].split(';');
                for (i in val) {
                    if (val[i] != "" && typeof val[i] != "function") {
                        var opt = document.createElement("option");
                        var op = val[i].split(',');
                        opt.text = op[0];
                        if (op.length > 1)
                            var valu = op[1];
                        if (valu == "" | op.length == 1) valu = op[0];
                        opt.value = valu;
                        if (op.length > 2) {
                            for (var s = 2; s < op.length; s++) {
                                var att = op[s].split(':');
                                opt.setAttribute(att[0], att[1]);
                            }
                        }
                        rtn.appendChild(opt);
                        rtn.setAttribute("class", "multiselect");
                        rtn.setAttribute("multiple", "multiple");
                    }
                }
            }
            break;
        case "jstree":
            break;
    }
    jQuery.fn.outerHTML = function(s) {
        return s ?
            this.before(s).remove() :
            jQuery("<p>").append(this.eq(0).clone()).html();
    };
    if (!typeof(rtntype) === "undefined")
        rtn = rtn;
    else
        rtn = $(rtn).outerHTML();
    return rtn;
}

const makeCtr=(inp, rtntype)=> {
    // create control
    // inp=['type','value','id','class','attr']
    var t = inp[0].split(':');
    var type = t[0]
    if (t[0] == "radiolist") t[0] = "div";
    var rtn = document.createElement(t[0]);
    if (t.length > 1)
        type = t[1];
    //class or style
    //if both, join with "|"(ex:style|class)
    if (typeof inp[3] !== "undefined") {
        var dual = inp[3].split("|");
        if (dual.length == 1) {
            var st = inp[3].split(":");
            if (st.length > 1)
                rtn.setAttribute("style", inp[3]);
            else
                rtn.setAttribute("class", inp[3]);
        } else if (dual.length == 2) {
            var st = dual[0].split(":");
            if (st.length > 1) {
                rtn.setAttribute("style", dual[0]);
                rtn.setAttribute("class", dual[1]);
            } else {
                rtn.setAttribute("style", dual[1]);
                rtn.setAttribute("class", dual[0]);
            }
        }
    }
    //attribute(onlick...)
    if (typeof inp[4] !== "undefined" && inp[4] != "") {
        var st1 = inp[4].split("^");
        $.each(st1, function(i, k) {
            var st = k.split(":");
            if (st[0] != "" && st[0] != "placeholder")
                rtn.setAttribute(st[0], st[1]);
        });
    }

    if (typeof inp[2] !== "undefined" && inp[2] != "") rtn.setAttribute("id", inp[2]);

    switch (type) {
        case "span":
        case "div":
        case "label":
            if (typeof inp[1] !== "undefined" && inp[1] != "")
                //rtn.innerText = inp[1];
                $(rtn).text(inp[1]);
            break;
        case "button":
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                rtn.setAttribute("type", "button");
                $(rtn).addClass("form-control");
                rtn.setAttribute("value", inp[1]);
            }
            break;
        case "i":
            if (typeof inp[1] !== "undefined" && inp[1] != "")
                rtn.setAttribute("class", inp[1]);
            break;
        case "textarea":
            if (typeof inp[1] !== "undefined" && inp[1] != "")
                $(rtn).text(inp[1]);
            if (typeof $(rtn).attr("rows") == "undefined")
                rtn.setAttribute("rows", "3");
            if (typeof $(rtn).attr("cols") == "undefined")
                rtn.setAttribute("cols", "20");
            $(rtn).addClass("form-control");
            break;
        case "input":
            if (typeof inp[1] !== "undefined" && inp[1] != "")
                rtn.setAttribute("value", inp[1]);
            // rtn.setAttribute("type", "text");

            $(rtn).addClass("form-control");
            break;
        case "checkbox":
            if (typeof inp[1] != "undefined" && inp[1] != "") {
                if (inp[1] != true && inp[1] != false && inp[1].indexOf(";") > -1) {
                    //checked checkbox (text,value,checked:checked)
                    var val = inp[1].split(";");
                    var rtn = document.createElement("div");
                    rtn.setAttribute("id", inp[2]);
                    $(val).each(function(i, k) {
                        var opt = document.createElement("input");
                        opt.setAttribute("type", "checkbox");
                        if (i > 0)
                            opt.setAttribute("style", "margin-left:10px");
                        var op = k.toString().split(',');
                        var tx = document.createTextNode(op[0]);


                        if (op.length > 1)
                            var valu = op[1];
                        if (op.length == 1) valu = op[0];
                        opt.value = valu;
                        if (op.length > 2) {
                            for (var s = 2; s < op.length; s++) {
                                var att = op[s].split(':');
                                opt.setAttribute(att[0], att[1]);
                            }
                        }
                        rtn.appendChild(opt);
                        rtn.appendChild(tx);
                    });
                } else {
                    rtn.setAttribute("type", "checkbox");
                    if (inp[1] != "" && typeof inp[1] != "undefined")
                        rtn.setAttribute("checked", inp[1]);
                }
            } else
                rtn.setAttribute("type", "checkbox");
            $(rtn).addClass("form-control");
            break;
        case "text":
            rtn.setAttribute("type", type);
            rtn.setAttribute("value", inp[1]);
            break;
        case "color":
            rtn.setAttribute("type", type);
            var colval = inp[1];
            if (inp[1] == "") colval = "#FFFFFE";
            rtn.setAttribute("value", colval);
            rtn.setAttribute("class", "cpicker");
            break;
        case "number":
            rtn.setAttribute("type", type);
            rtn.setAttribute("value", inp[1]);
            if (t.length == 3)
                rtn.setAttribute("step", t[2]);
            $(rtn).addClass("form-control");
            break;
        case "datetime":
        case "date":
        case "datetime-local":
        case "month":
        case "week":
        case "time":
            if (type == "datetime")
                type == "datetime-local";
            rtn.setAttribute("type", type);
            $(rtn).addClass("form-control");
            break;
        case "select":
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                var val = inp[1].split(';');
                //selected option (text,value,selected:selected)

                $(val).each(function(i, k) {
                    var opt = document.createElement("option");
                    var op = k.toString().split(',');
                    opt.text = op[0];

                    if (op.length > 1)
                        var valu = op[1];
                    if (op.length == 1) valu = op[0];
                    opt.value = valu;
                    if (op.length > 2) {
                        for (var s = 2; s < op.length; s++) {
                            var att = op[s].split(':');
                            opt.setAttribute(att[0], att[1]);
                        }
                    }
                    rtn.appendChild(opt);
                });
            }
            $(rtn).addClass("form-control");
            break;
        case "selectgroup":
            //<optgroup label='grp1'><option></option></optgroup>
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                var val = inp[1].split(';');
                //selected option (text,value,selected:selected)
                var grp, optgroup;
                $(val).each(function(i, k) {
                    var opt = document.createElement("option");
                    var op = k.toString().split(',');
                    if (grp != op[0]) {
                        optgroup = document.createElement("optgroup");
                        rtn.appendChild(optgroup);
                        grp = op[0];
                        if (grp != "" && typeof grp != "undefined")
                            $(optgroup).attr('label', op[0]);
                    }
                    optgroup.appendChild(opt);
                    opt.text = op[1];

                    if (op.length == 2) valu = op[1];
                    if (op.length > 2)
                        var valu = op[2];
                    opt.value = valu;
                    if (op.length > 3) {
                        for (var s = 3; s < op.length; s++) {
                            var att = op[s].split(':');

                            opt.setAttribute(att[0], att[1]);
                        }
                    }

                });
            }
            $(rtn).addClass("form-control");
            break;
        case "radiolist":
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                var val = inp[1].split(';');

                $(val).each(function(i, k) {
                    var lb = document.createElement("label");
                    var opt = document.createElement("input");
                    lb.setAttribute("for", "rd" + i);
                    opt.setAttribute("type", "radio");
                    opt.setAttribute("id", "rd" + i);
                    opt.setAttribute("name", "rd" + i);

                    var op = k.toString().split(',');
                    lb.innerHTML = op[0];

                    if (op.length > 1)
                        var valu = op[1];
                    if (op.length == 1) valu = op[0];
                    opt.value = valu;
                    if (op.length > 2) {
                        for (var s = 2; s < op.length; s++) {
                            var att = op[s].split(':');
                            opt.setAttribute(att[0], att[1]);
                        }
                    }
                    rtn.appendChild(lb);
                    rtn.appendChild(opt);
                });
                $(rtn).addClass("form-control");
            }
            break;
        case "ul":
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                var val = inp[1].split(';');
                $(val).each(function(i, k) {
                    var opt = $(document.createElement("li"));
                    var op = k.toString().split(',');
                    var ahr = $("<a/>");
                    var img = $("<img/>");
                    ahr.text = op[0];
                    switch (op[2]) {
                        case "img":
                            img.src = op[1];
                            ahr.append(img);
                            break;
                        case "icon":
                            img = $("<i/>");
                            img.attr("class", op[1]);
                            ahr.append(img);
                            break;
                    }
                    opt.append(ahr);

                    if (op.length > 2) {
                        for (var s = 2; s < op.length; s++) {
                            var att = op[s].split(':');
                            opt.setAttribute(att[0], att[1]);
                        }
                    }
                    $(rtn).append(opt);
                });
            }
            break;
        case "selectimage":
            //value;text;imgsrc;description(index:0;1;2;3)
            //getvalue: $(selector).data('ddslick').selectedData.value
            //setvalue:$(selector).ddslick('select', {index: i });
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                var val = inp[1].split(';');
                $(val).each(function(i, k) {
                    var opt = document.createElement("option");
                    var op = k.toString().split(',');
                    opt.value = op[1];
                    $(opt).text(op[0]);
                    //opt.text = op[1];
                    opt.setAttribute("data-imagesrc", op[2]);
                    opt.setAttribute("data-description", op[3]);
                    //if (op.length > 2) {
                    //    for (var s = 2; s < op.length; s++) {
                    //        var att = op[s].split(':');
                    //        opt.setAttribute(att[0], att[1]);
                    //    }
                    //}
                    rtn.setAttribute("class", "selectimage");
                    rtn.appendChild(opt);
                });
            }
            $(rtn).addClass("form-control");
            break;
        case "multiselect":
            if (typeof inp[1] !== "undefined" && inp[1] != "") {
                var val = inp[1].split(';');
                for (i in val) {
                    if (val[i] != "" && typeof val[i] != "function") {
                        var opt = document.createElement("option");
                        var op = val[i].split(',');
                        opt.text = op[0];
                        if (op.length > 1)
                            var valu = op[1];
                        if (valu == "" | op.length == 1) valu = op[0];
                        opt.value = valu;
                        if (op.length > 2) {
                            for (var s = 2; s < op.length; s++) {
                                var att = op[s].split(':');
                                opt.setAttribute(att[0], att[1]);
                            }
                        }
                        rtn.appendChild(opt);
                        rtn.setAttribute("class", "multiselect");
                        rtn.setAttribute("multiple", "multiple");
                    }
                }
            }
            $(rtn).addClass("form-control");
            break;
        case "jstree":
            break;
    }
    if (typeof inp[4] !== "undefined" && inp[4] != "") {
        var st1 = inp[4].split("^");
        $.each(st1, function(i, k) {
            var st = k.split(":");
            if (st[0] == "placeholder") {
                switch (type) {
                    case "input":
                        $(rtn).attr(st[0], st[1]);
                        break;
                    default:
                        $(rtn).prepend($('<option value="" disabled selected hidden>' + st[1] + '</option>'));
                        break;
                }
            }
        });
    }

    jQuery.fn.outerHTML = function(s) {
        return s ?
            this.before(s).remove() :
            jQuery("<p>").append(this.eq(0).clone()).html();
    };
    if (!typeof(rtntype) === "undefined")
        rtn = rtn;
    else
        rtn = $(rtn).outerHTML();
    return rtn;
}

function appendTableRow(table, rowData) {
    var row = $("<tr/>");
    var prevtr = $(table.find('tbody>tr:nth-last-child(1)')).attr("style");
    var secondtr = table.find('tbody>tr:nth-child(2)').css("background-color");
    if (typeof prevtr == "undefined")
        row.css("background-color", secondtr);

    var lastRow = row.appendTo(table.find('tbody:last'));
    $("tr:even").css("class", "even");
    $.each(rowData, function(colIndex, c) {
        var cell = $("<td/>");
        if (typeof c != "undefined" && c != "" && c.toString().indexOf("|") > -1) {
            var csp = c.split('|');

            if (csp.length > 1) {
                lastRow.append(cell.html(csp[0]));
                $.each($.parseJSON(csp[1]), function(k, v) {
                    cell.attr(k, v);
                });
            }
        } else
            lastRow.append(cell.html(c));
    });
    return table;
}

function paginathing(id, opt) {
    //pagination insert UL or Table
    //id: any of #id, .class, $('#id'),$(".class")
    //var opt = {
    //    perPage: perpage
    //, limitPagination: limit
    //, containerClass: container
    //, insertAfter: insert
    //, currentpage:1
    //};
    styleInsert("panel-footer", ".panel-footer {   padding: 10px 15px;    background-color: #f5f5f5;    border-top: 1px solid #ddd;    border-bottom-right-radius: 3px;    border-bottom-left-radius: 3px;}");
    var type = typeof id,
        ctr;
    switch (type) {
        case "object":
            ctr = id;
            break;
        case "string":
            ctr = $(id);
            break;
    }
    var perpage = 6,
        limit = 8,
        container = "panel-footer",
        insert = "#" + ctr.attr("id");
    if (typeof opt != "undefined") {
        if (opt.hasOwnProperty("perPage")) perpage = opt.perPage;
        if (opt.hasOwnProperty("limitPagination")) limit = opt.limitPagination;
        if (opt.hasOwnProperty("containerClass")) container = opt.containerClass;
        if (opt.hasOwnProperty("insertAfter")) insert = opt.insertAfter;
    }
    var num = ctr.find("tbody>tr").length;
    if (num / perpage < limit) limit = Math.ceil(num / perpage);
    opt = {
        perPage: perpage,
        limitPagination: limit
            //, containerClass: container
            ,
        insertAfter: null
    };

    var nav = ctr.next().prop("tabName");
    if (nav == "NAV") ctr.next().remove();
    $("." + container).remove();
    $(".pagination-container").remove();

    switch (ctr.prop('tagName')) {
        case "TABLE":
            opt.insertAfter = insert; // "#" + ctr.attr("id");
            if (ctr.find("tbody").length > 0 && limit > 1) {
                ctr.find("tbody").paginathing(opt);
                $(".pagination-container").find("ul").css({ margin: "5px 0" })
            }
            break;
        case "UL":
            opt.containerClass = container; // "panel-footer";
            ctr.paginathing(opt);
            break;
    }
}

function resizeIframe($contain) {
    var $you = $($contain.find("iframe"));
    var ratio = 9 / 16; //parseFloat($you.height() / $you.width());
    var rratio = 16 / 9;
    $you.data('aspectRatio', ratio)

    var newWidth = $contain.width();
    var newHeight = $contain.height();
    var newratio = parseFloat(newHeight / newWidth);
    if (ratio < newratio)
        $you.width(newWidth)
        .height(parseInt(parseFloat(newWidth) * ratio));
    else
        $you.height(newHeight)
        .width(parseInt(parseFloat(newHeight) * rratio));
    $contain.resize(function() {
        var newWidth = $contain.width();
        var newHeight = $contain.height();
        var newratio = parseFloat(newHeight / newWidth);
        if (ratio < newratio)
            $you.width(newWidth)
            .height(parseInt(parseFloat(newWidth) * ratio));
        else
            $you.height(newHeight)
            .width(parseInt(parseFloat(newHeight) * rratio));
    }).resize();
}
global.pinstatus = false;

const refreshLayout=()=> {
    var mstyle = selectimctable(menuid, '', '');
    if (typeof(mstyle) == "undefined" | mstyle == "") {
        mstyle = {};
        mstyle.width = 250;
        mstyle.backcolor = "#4A6184";
    }
    if (mstyle.width == "") mstyle.width = 250;
    if (pinstatus) {
        $("#dvMenu1").attr("style", "float:left;position:absolute;width:" + mstyle.width + ";height:" + $(window).height() + "px");
        var w = $(window).width() - parseInt(mstyle.width) - 5;
        console.log(w, mstyle.width)
        $('#tableinsert').attr("style", "clear:both;padding:5px 0 0 5px;float:right;width:" + w + "px");
    } else {
        $("#dvMenu1").removeAttr("style");
        $('#tableinsert').removeAttr("style");
    }
    //initDisplay('', '');

}

var jsonlang = "",
    jsonlist = "";

function multilangReadAjax(language, callback) {
    if (typeof language == "undefined")
        language = $("#selCountry").val();
    if (typeof language == "undefined") language = 'kr';
    //var path = pfx + "jquery-lang-js-master/js/langpack/";
    var path = "/data/langpack/";
    path += language + ".json";
    axios({
        method: "post",
        url: webserviceprefix + "ReadData",
        data: {
            path: path
        }
    }).then((response) => {
        jsonlang = response.data;
        if (typeof callback == "function") {

            numcnt = 0;
            callback();
        }
    });

}

function multilangReadListAjax(callback) {
    var list, list1 = [];
    var pfx = "js2/";
    //if (imapp) pfx = "/js2/";
    //var path = pfx + "jquery-lang-js-master/js/langpack/";
    var path = "/data/langpack/";
    axios({
        method: "post",
        url: webserviceprefix + "ReadDataList",
        data: {
            path: path,
            filetype: "json"
        }
    }).then((response) => {
        jsonlang = response.data;
    });

    // $.ajax({
    //     url: webserviceprefix+"ReadDataList",
    //     //data: { path: JSON.stringify(path), filetype: JSON.stringify("json") },
    //     data: JSON.stringify({path:path,filetype:"json"}),
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "JSON",
    //     method:"POST",
    //     success: function (data, status) {
    //         console.log(data)
    //       //if(data!="")
    //       //  $(data).each(function (i, k) {
    //       //      list1.push(k.replace(".json", ""));
    //       //  });
    //       //  jsonlist = list1.join(';');
    //       //  if (typeof callback === "function") callback(jsonlist);
    //         //if (data.d != "") {
    //         //    list = data.d.split(',');
    //         //}

    //         //$(list).each(function (i, k) {
    //         //    list1.push(k.replace(".json", ""));
    //         //});
    //         //jsonlist = list1.join(';');
    //         //if (typeof callback === "function") callback(jsonlist);
    //     },
    //     error: function (response) {
    //         var r = jQuery.parseJSON(response.responseText);
    //         console.log("Message: " + r.Message);
    //         console.log("StackTrace: " + r.StackTrace);
    //         console.log("ExceptionType: " + r.ExceptionType);
    //     }
    // });
}
var numcnt = 0;

function multilangInject() {
    // var el = $(data).find('[lang]')
    var langlist = [],
        exlist = [];
    if (numcnt > 3) return false;
    if (jsonlang == "" | jsonlang.hasOwnProperty("error")) {
        multilangReadAjax("kr", multilangInject);
        numcnt++;
        return false;
    }

    // //console.log("jsonlang:", jsonlang, "numcnt:", numcnt);
    // if (jsonlang != "" && typeof jsonlang!="undefined") {
    //     var lang1 = jsonlang; //JSON.parse(jsonlang);
    //     langlist = (Object.keys(lang1.token))
    // }
    //add lang="en"
    var data = (document.documentElement.innerHTML);
    var exclude = $(data).find("[lang='en']");
    if (exclude.length > 0) {
        $(exclude).each(function(i, k) {
            $.merge(exlist, $(k).find("*"));
        });
    }
    var domlist = ['label', 'input', 'button', 'option', 'textarea', 'img', 'a', 'i', 'p', 'span'];
    $(domlist).each(function(a, b) {
        var el = $(data).find(b)
        $(el).each(function(i, k) {
            var txt = "";
            if ($(k).css("display") != "none") {
                if ($(k).attr("title")) {
                    txt = $(k).attr("title");
                    if ($.inArray(txt, langlist) > -1)
                        $(k).attr("lang", "en");
                }
                switch ($(k).get(0).tagName.toLowerCase()) {
                    case "span":
                    case "button":
                    case "option":
                    case "a":
                    case "p":
                        txt = $(k).text();
                        break;
                    case "input":
                    case "textarea":
                        txt = $(k).val();
                        break;
                    case "img":
                        if (typeof $(k).attr("alt") != "undefined")
                            txt = $(k).attr("alt");
                        break;

                }

                if ($.inArray(txt, langlist) > -1 && $.inArray(k, exlist) == -1) {
                    var target = $($('body').find(b)[i]);
                    //var wrap=$("<div/>");
                    //wrap.insertAfter(target);
                    //var cl = target.clone().attr('lang', 'en');
                    //wrap.append(cl);
                    //cl.unwrap();
                    // target.remove();
                    target.attr('lang', 'en')
                }
            }
        });
    });
}


//region expand collapse control
function wrapcontrol(object, title, inobj, type, callback, paramarr1) {
    //object:control div or its id, title: tab or head title txt, inobj:inner div id or object, callback:function aft expand or collapse
    var id = object,
        inid = inobj;
    if (typeof object == "object") id = object.attr("id");
    if (typeof inobj == "object") {
        inid = inobj.attr("id");
        if (typeof inid == "undefined") {
            inid = "in" + id;
            inobj.attr("id", inid);
        }
    }
    if ($("#" + id).closest("table").attr("id") == "tblEditor")
        return false;
    // $("#" + id).prepend($("<ul><li><a href='#" + inid + "'>" + title + "</a></li></ul>"));
    //setTimeout(function () {
    var content = $("#" + id);
    if (!content.parent().hasClass("panel-body")) {
        var panel = $("<div class='panel panel-info clearfix'/>").insertBefore(content);
        var head = $('<div class="panel-heading" />');
        var htitle = $('<h3 class="panel-title pull-left">' + title + '</h3>').appendTo(head);
        var hbtn = $("<i id='irebtn" + id + "' class='fa fa-plus-square-o pull-right imdim'/>").appendTo(head);
        head.append($("<div class='clearfix'/>"));
        panel.append(head);
        var body = $("<div class='panel-body'/>");
        $(["jqgrid", "map", "fullcalendar"]).each(function(a, b) {
            if (content.hasClass(b) | content.children().hasClass(b)) {
                body.css("padding", 0);
                if (b != "map")
                    panel.css("border", "none");
            }
        });
        if (content.css("display") == "none")
            panel.hide();
        content.wrap(body);
        panel.append(content.parent());
        // panel.append($("<div style='clear:both'/>"));
    }
    $("#irebtn" + id).click(function(e) {
        expandcollapsediv($("#" + id), callback, paramarr1);
        if (typeof callback == "function" && inid.indexOf("gbox_jq") > -1)
            callbackexewithparam(callback, paramarr1);
        //if($('#'+id).hasClass('fullcalendar'))
        //      $('#' + id).fullCalendar('option', 'height', $(window).height());
    });
    // }, 0);
    function xy(that, e) {
        var offset = that.offset();
        var relativeX = (e.pageX - offset.left);
        var relativeY = (e.pageY - offset.top);
        cursor = [relativeX, relativeY];
    }
}
global.fullwin = false;
    var cursor = [0, 0],
    originopt, elementparent, originw, originh;

function expandcollapsediv(element, callback, paramarr, fromfullsrc) {
    if (fullwin) {
        element.removeAttr("style");
        element.attr("style", styval);
        var elementchildren = element.parent().children().not(".panel-primary");
        elementparent.append(elementchildren); //because inputdropdown moved to child of td, others are not affected
        $("#elecontain").remove();
        elementparent.css("position", "relative");
        //  elementparent.append($("<div style='clear:both'/>"));
        console.log(fromfullsrc, originh)
        if (typeof callback == "function") {
            if (element.find(".map").length > 0) {
                paramarr[3].w = originw, paramarr[3].h = fromfullsrc;
                element.css("float", "right");
                var open = false;
                if ($(".hidescroll").css("display") == "block")
                    open = true;
                setTimeout(function() {
                    $("#containclose").click();
                    if (open)
                        $("#containopen").click();
                }, 100);
                $(".hidescroll").css("height", fromfullsrc);
            }
            if (element.hasClass("fullcalendar") | element.find(".fullcalendar").length > 0) {
                console.log('fullc', paramarr, originh)
                paramarr.splice(1, 1, fromfullsrc);
            }
            if (element.hasClass("googlechart") | element.find(".googlechart").length > 0) {
                paramarr[1].gdt.setting[2][1] = originh;
            }

            console.log(paramarr);
            callbackexewithparam(callback, paramarr);
        }

        window.scrollTo(cursor[0], cursor[1]);
        fullwin = false;
    } else {
        //container move top:0,left:0,position:absolute
        originw = element.parent().width();
        originh = element.height();
        console.log(originw, originh, element.height())
        // var id = element.attr("id");
        var styval = element.attr("style");
        element.removeAttr("style");
        var td = element.closest("td") // move element child of td
        elementparent = element.parent(); //when returning place to append
        var elementwrap = $("<div  id='elecontain'></div>");

        elementwrap.append(elementparent.children());
        elementwrap.prependTo(td);
        var eh = element.height(),
            wh = $(document).height();
        if (eh > wh) wh = eh;
        elementwrap.css({
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            width: "99.3%",
            height: wh,
            "background-color": "white",
            padding: "0 0 0 5px",
            "z-index": 10001
        });
        var sty = { position: "absolute", left: 0, top: 0 };
        var head = $('<div class="panel-heading" style="height:35px"/>');
        var htitle = $('<h3 class="panel-title pull-left">' + 'hh' + '</h3>').appendTo(head);
        var hbtn = $("<i class='fa fa-times-circle pull-right imdim'/>").appendTo(head);
        var panel = $("<div class='panel panel-primary'/>").append(head);
        elementwrap.prepend(panel);
        window.scrollTo(0, 0);
        fullwin = true;
        hbtn.on("click", function() {
            console.log(paramarr, originh);
            expandcollapsediv(element, callback, paramarr, originh)
        });
        if (typeof callback == "function") {
            if (element.find(".map").length > 0) {
                originopt = paramarr[3], clone = originopt;
                clone.w = $(window).width() - 15;
                clone.h = $(window).height();
                if (widthsidebyside(element) > 15)
                    clone.widthsidebyside = widthsidebyside(element);
                paramarr.splice(3, 1, clone);
                callbackexewithparam(callback, paramarr);
                setTimeout(function() {
                    var open = false;
                    if ($(".hidescroll").css("display") == "block")
                        open = true;
                    $("#containclose").click();
                    if (open)
                        $("#containopen").click();
                    $(".hidescroll").css("height", clone.h);
                }, 100);
            }
            if (element.hasClass("fullcalendar")) {
                console.log('fullc', paramarr, originh)
                paramarr.splice(1, 1, $(window).height());
                callbackexewithparam(callback, paramarr);
            } else if (element.hasClass("googlechart")) {
                var originh = paramarr[1].gdt.setting[2][1];
                paramarr[1].gdt.setting[2][1] = $(window).height();
                paramarr[1].gdt.setting[0][1] = "none";
                callbackexewithparam(callback, paramarr);
                console.log(paramarr)
            } else
                callbackexewithparam(callback, paramarr);
        }

        $(["map", "fullcalendar", "googlechart"]).each(function(i, k) {
            if (element.hasClass(k) | element.find("." + k).length > 0)
                panel.css("margin-bottom", 0);
        });
        if (element.find(".map").length == 0)
            elementwrap.css("z-index", 10004);
    }

    function widthsidebyside(element) {
        var rtn = 15;
        $(element.siblings().not($(".panel-primary"))).each(function(i, k) {
            if (rtn < $(k).width())
                rtn = $(k).width();
        });
        return rtn;
    }
}
var eventregister = [];

function inputdropdown(objid, options) {
    //objct insert into dropdownlist
    if (typeof objid == "object") {
        objid = objid.attr("id");
        if (typeof objid == "undefined") {
            var cid = "newid_" + Math.floor(Math.random() * 100000)
            objid.attr("id", cid);
            objid = cid;
        }
    }
    var dropdiv = $("<div id='dvi" + objid + "' class='ddlDiv'  style='margin-bottom:2px' ></div>");
    var textbox = "txinput" + objid,
        valuebox = "valinput" + objid,
        wth = "",
        title = "",
        optdialog = "",
        keepopen = false;
    if (typeof options != "undefined") {
        if (options.hasOwnProperty("textbox")) textbox = options.textbox;
        if (options.hasOwnProperty("valuebox")) valuebox = options.valuebox;
        if (options.hasOwnProperty("wth")) wth = options.width;
        if (options.hasOwnProperty("optdialog")) optdialog = options.optdialog;
        if (options.hasOwnProperty("title")) title = options.title;
        if (options.hasOwnProperty("keepopen")) keepopen = options.keepopen;
    }
    if ($("#dvi" + objid).length > 0) return false;
    $("#" + objid).wrap(dropdiv);
    $("#dvi" + objid).wrap("<div id='dv" + objid + "'></div>");
    $("#dvi" + objid).css({ "margin-top": "40px" });

    var input = document.createElement('input');
    input.id = textbox;
    input.setAttribute("class", "ddlTextbox form-control");
    input.setAttribute("type", "text");
    input.setAttribute("aria-describedby", "sptitle");
    input.setAttribute("autocomplete", "off");

    $(input).on("click", function() {
        var dv = $("#dvi" + objid);
        if (dv.css("visibility") == "visible")
            dv.css("visibility", "hidden");
        else
            dv.css("visibility", "visible");
    })
    $(input).css({ "background-image": "url('/images/arrow_down.png')" });
    var input1 = document.createElement('input');
    input1.id = valuebox;
    input1.setAttribute("style", "display:none");
    if (title != "") {
        var dvrow = $("<div class='row'/>");
        var dvgrp = $("<div class='col-lg-" + wth + "''/>").appendTo(dvrow);
        var dv = $("<div class='input-group'/>").appendTo(dvgrp);
        var title = $("<span class='input-group-addon' id='sptitle'>" + title + "</span>").appendTo(dv);
        dv.append($(input));
        $("#dv" + objid).append(dvrow);
    } else
        $("#dv" + objid).append(input);
    $("#dv" + objid).css({ "margin-bottom": "2px" });
    document.getElementById("dv" + objid).appendChild(input1);
    //var w = $("#dv" + objid + " .input-group").width();

    var optwth = $("#dv" + objid).width(); //400;
    if (optdialog.hasOwnProperty("width")) optwth = optdialog.width;
    $("#dvi" + objid).css("width", optwth);

    //dropdown keepopen
    if ($.inArray("ddlDiv", eventregister) == -1) {
        $(document).click(function(e) {
            $(".ddlDiv").css({ visibility: "hidden" });
            if ($(e.target).hasClass("ddlTextbox"))
                $(e.target).parent().find(".ddlDiv").css({ visibility: "visible" });
            eventregister.push("ddlDiv");
        });
        $(".pac-container").click(function() {
            console.log('hhhsss')
            $("#dvi" + objid).css({ visibility: "visible" });
        });
    }
    if (keepopen) {
        $(document).click(function(e) {

            if (e.hasOwnProperty("originalEvent"))
                $(e.originalEvent.path).each(function(i, k) {
                    if ($(k).hasOwnProperty("context") && $($(k).context).attr("id") == objid) {
                        $("#dvi" + objid).css({ visibility: "visible" });
                        return false;
                    }
                });
        });

    }
    if (options.hasOwnProperty("callback")) {
        var copt = [];
        if (options.hasOwnProperty("callopt")) copt = options.callopt;
        setTimeout(function() { callbackexewithparam(options.callback, copt); }, 200);
    }
}

function nextrowopen(that) {
    that.closest("tr").next().hide();
    if (that.val() == "dropdown") {
        that.closest("tr").next().show();
    }
}
/*  how to insert keepopen */
//1. table row insert
//    ["keepopen", makebootcustom('checkbox', ['keep open when click inside'], 'cbkeepopen').outerHTML()]
//2. row hide/ show event
//    tb.find("tbody tr").each(function (i, k) {
//        switch ($(k).find("td:eq(0)").text()) {
//            case "keepopen":
//                $(k).css({ display: "none" });
//                break;
//            case "display":
//                $(k).find("select").on("change", function () {
//                    nextrowopen($(this));
//                });
//                break;
//        }
//});
//3. data read
//    var keepopen = false
//    if (st.hasOwnProperty("keepopen")) keepopen = st.keepopen;
//4. prev display select option is "dropdown" eventtrigger show keepopen row
//    nextrowopen($("#selDisplay"));
//    $("#cbkeepopen").prop("checked", keepopen);
//5. for save
//    setting.keepopen = $("#cbkeepopen").is(":checked");

function inputdialog(objid, options) {
    //object insert into dialog
    if (typeof objid == "object") {
        var oid = objid.attr("id");
        if (typeof oid == "undefined") {
            var cid = "newid_" + Math.floor(Math.random() * 100000)
            objid.attr("id", cid);
            objid = cid;
        } else
            objid = oid;
    }
    console.log(objid, options)
    var textbox = "txinput" + objid,
        valuebox = "valinput" + objid,
        wth = "",
        ht = 500,
        title = "",
        optdialog = "",
        callback = "",
        callopt = "";
    if (typeof options != "undefined") {
        if (options.hasOwnProperty("textbox")) textbox = options.textbox;
        if (options.hasOwnProperty("valuebox")) valuebox = options.valuebox;
        if (options.hasOwnProperty("wth")) wth = options.w;
        if (options.hasOwnProperty("ht")) ht = options.h;
        if (options.hasOwnProperty("title")) title = options.title;
        if (options.hasOwnProperty("optdialog")) optdialog = options.optdialog;
        if (options.hasOwnProperty("callback")) callback = options.callback;
        if (options.hasOwnProperty("callopt")) callopt = options.callopt;
    }
    if ($("#" + textbox).length > 0) {
        return false;
    }
    var contain = $("<div style='margin-bottom:2px' />").insertBefore($("#" + objid));
    var inputt = $("<input id='" + textbox + "' class='ddlTextbox form-control'/>");
    inputt.css({ "background-image": "url('/images/paperairplane.png')" });
    if (title != "") {
        var dvrow = $("<div class='row'/>");
        var dvgrp = $("<div class='col-lg-" + wth + "''/>").appendTo(dvrow);
        var dv = $("<div class='input-group'/>").appendTo(dvgrp);
        var title = $("<span class='input-group-addon' id='sptitle'>" + title + "</span>").appendTo(dv);
        dv.append(inputt);
        contain.append(dvrow);
    } else
        contain.append(inputt);
    var inputv = $("<input id='" + valuebox + "' style='display:none'/>").appendTo(contain);
    $("#" + objid).hide();
    var diabox = $("<div />").appendTo(contain);
    var optwth = 400;
    if (optdialog.hasOwnProperty("width")) optwth = optdialog.width;
    diabox.append($("#" + objid));
    inputt.on("click", function() {
        $("#" + objid).show();
        diabox.append($("#" + objid));
        var opt = {
            width: optwth,
            height: 'auto',
            autoResize: true,
            modal: false,
            autoOpen: true,
            title: "Tree Select",
            stack: false,
            hide: {
                effect: "explode",
                duration: 1000
            },
            close: function(event, ui) {
                if (!isorigin)
                    dialogexpandcollapse(callback, callopt);
                $("#" + objid).hide().appendTo(contain);
                $(this).dialog('destroy').remove();
            },
            buttons: [
                //{
                //    text: "Close",
                //    icons: {
                //        primary: "ui-icon-check"
                //    },
                //    click: function () {
                //        var selval = $("#" + objid).jstree("get_selected"),
                //            selarr = $("#" + objid).jstree().get_selected(true), seltxt = [];
                //        $(selarr).each(function (i, k) {
                //            seltxt.push(k.text);
                //        });
                //        inputv.val(selval);
                //        inputt.val(seltxt.join(','));
                //        $("#" + objid).hide().appendTo(contain);
                //        $(this).dialog('destroy').remove();
                //    }
                //}
                {
                    text: "Close",
                    icons: {
                        primary: "ui-icon-close"
                    },
                    click: function() {
                        if (!isorigin)
                            dialogexpandcollapse(callback, callopt);
                        $("#" + objid).hide().appendTo(contain);
                        $(this).dialog('destroy').remove();
                    }
                }
            ]
        }
        if (optdialog != "") {
            $(Object.keys(optdialog)).each(function(a, b) {
                if (b == "button") {
                    $(optdialog["button"]).each(function(c, d) {
                        $(opt.button).each(function(e, f) {
                            if (d.text == f.text)
                                f.click = d.click;
                        });
                    })
                } else
                    opt[b] = optdialog[b];
            });
        }
        diabox.dialog(opt);
        diabox.closest(".ui-dialog").css("z-index", 10002);
        if (diabox.find(".map").length > 0)
            diabox.closest(".ui-dialog-content").css("padding", "0");

        if ($("#btnfullscreen").length == 0)
            dialogfullscreen(callback, callopt);
    });

    if (callback != "") {
        var copt = [];
        if (options.hasOwnProperty("callopt")) copt = options.callopt;
        callbackexewithparam(options.callback, copt);
        console.log(callopt)
    }
}

function inputwrap(ctr, display) {
    //wrap a row control with dropdown,dialog
    console.log(ctr, display)
    var customctr = $(ctr).find(".custom-checkbox").parent();
    customctr.css({ padding: "5px" });

    var inputbox;
    switch (display) {
        case "dropdown":
            funLoading();
            inputdropdown(customctr, { keepopen: true, callback: writetextbox, callopt: [customctr, $(ctr)] });
            $(ctr).closest(".ddlDiv").css({ "overflow-x": "hidden" });
            //setTimeout(function () {
            //    inputbox = $(ctr).find(".ddlTextbox");
            //}, 1000);
            break;
        case "dialog":
            funLoading();
            setTimeout(function() {
                inputdialog(customctr, { callback: writetextbox, callopt: [customctr, $(ctr)] });
            }, 300);
            //setTimeout(function () {
            //    writetextbox(customctr, $(ctr));
            //}, 3000);

            break;
    }
    $(customctr).find(".custom-control-input").on("change", function() {
        writetextbox(customctr, $(ctr));
        console.log(customctr, $(ctr));
    });
}

function writetextbox(customctr, ctr) {
    //chk event shows in dropdown textbox
    console.log(customctr.get(0))
    if (typeof ctr == "undefined")
        txbox = customctr.closest(".form-group").find(".ddlTextbox");
    else
        txbox = ctr.find(".ddlTextbox");
    var vlbox = txbox.next();
    txbox.val('');
    vlbox.val('');
    var rdval = $(customctr).find("input:radio:checked");
    var ckval = $(customctr).find("input:checkbox:checked");
    console.log(ckval, customctr)
    if (rdval.length > 0) {
        vlbox.val(rdval.val());
        txbox.val(rdval.parent().find(".custom-control-description").text());
    } else if (ckval.length > 0) {
        var arr = [],
            tarr = [];
        ckval.each(function(a, b) {
            arr.push($(b).val());
            tarr.push($(b).parent().find(".custom-control-description").text());
        });
        vlbox.val(arr.join(","));
        txbox.val(tarr.join(","));
    }

    ctr.find(".ddlDiv").css({ "overflow-x": "hidden" });
}

function bootmodal(body, option) {
    body.attr("data-toggle", "modal");
    body.modal("show");
    //var dv=$('<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"/>'),
    //    cover = $("<div class='model-content'/>").appendTo(dv);
    //dv.insertBefore(body);
    //cover.append(body);


}
var originaldialogcss, isorigin = true;

function dialogfullscreen(callback, callopt) {
    var nbtn = $('<button id="btnfullscreen" class="ui-button ui-widget ui-corner-all" title="expand"><span class="ui-icon ui-icon-triangle-1-ne"></span></button>');
    nbtn.button().css({ position: 'relative', float: "right", margin: "5px 10px 5px 5px", height: "20px", padding: "4px 3px 0 1px", width: "20px" })
        .insertBefore($(".ui-dialog").find("button:eq(0)"));
    $('.ui-dialog-title').css("width", "70%");
    originaldialogcss = $('.ui-dialog').attr("style");
    originw = $('.ui-dialog-content').width(), originh = $('.ui-dialog-content').height();
    nbtn.on("click", function() {
        dialogexpandcollapse($(this), callback, callopt);
    });
}

function dialogexpandcollapse(that, callback, callopt) {
    var nbtn = that; //$(".ui-dialog button[ data-toggle='tooltip' data-placement='top' title='expand']");
    if (isorigin) {
        $('.ui-dialog').css({ top: 0, left: 0, width: $(window).width() - 5, height: $(window).height() });
        $('.ui-dialog-content').css("height", $(window).height() - 120);
        if ($('.ui-dialog .map').length > 0)
            $('.ui-dialog-content').css("padding", "0");
        nbtn.find("span:eq(0)").removeClass().addClass("ui-icon ui-icon-triangle-1-sw");
        isorigin = false;
        var opt = {};
        opt.w = $(window).width() - 20;
        opt.h = $(window).height() - 120;

        if (typeof callback == "function") {
            callopt.splice(3, 1, opt);
            callbackexewithparam(callback, callopt);
            console.log('hellooo', callopt)
        }
    } else {
        $('.ui-dialog').attr("style", "");
        $('.ui-dialog').attr("style", originaldialogcss);
        var opt = {};
        opt.w = originw;
        opt.h = originh;

        if (typeof callback == "function") {
            callopt.splice(3, 1, opt);
            callbackexewithparam(callback, callopt);
            console.log(callopt);
        }
        $('.ui-dialog-content').css("height", 400);
        nbtn.find("span:eq(0)").removeClass().addClass("ui-icon ui-icon-triangle-1-ne");
        isorigin = true;
    }
}
//#endregion
//export {multilangReadAjax,multilangReadListAjax,rowSortable}
 export 
{bootcustomload,getbootcustom, makeTableMapping
    ,rowseqnumber,tbcolindexbytitle,chkalltoggle,makeForm1,makeForm,makeCtr_img,makeCtr_img1
    ,InsertSelected,runAfterTableCreate,hideAfterTablecreated
    ,prependTableRow,deleteTableColumn,appendTableColumn,delRowdelegate,rowSortable,evenoddcolor
    ,appendFooter,colCount,appendPage,paginated,saveTable1,saveTable,saveTableObject,saveTableHead
    ,dndboxInit,reloadAction,makedndbox,dndbatchInsert,dndautoInsert,addli,selectedli,attachoption
    ,dndevtlist,actionclick,eventlistfinder,actionlistfinder,fieldnamelist,reloadpagelist
    ,reloadinsert,reloadedit,reloadeventhander,reloadmenutree,menutreedata
    ,menutree_selected,makeTab,makebootstrapTab,appendTab,makePortlet,makeAccordion,makeinput
    ,makeContainer,clearinserted,sweetmsg,sweetmsgautoclose
    ,makeTable,makeTableBoot,applybootstrap,makeCtrboot,appendTableRow,paginathing,resizeIframe
    ,multilangReadAjax,multilangReadListAjax,multilangInject,wrapcontrol,expandcollapsediv
    ,inputdropdown,nextrowopen,inputdialog,inputwrap,writetextbox,bootmodal,dialogfullscreen
    ,dialogexpandcollapse}