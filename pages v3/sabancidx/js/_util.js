/*
	En üstte javascriptin kendi fonksiyonalitesine ek yaptigimiz fonksiyonlar mevcut örnegin string degiskenler icin trim
	özelligi ekliyoruz böylece var degisken = "test degisken" seklinde bir tanimlamadan sonra degisken.trim() seklinde
	bir fonksiyon cagirabiliyoruz. 
	
	dey1 @14.04.2011
*/

var maxImageSize = 5120; //KB Cinsinden
var maxImageSizeMB = 5;  //MB Cinsinden

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
}

String.prototype.turkishToUpper = function () {
    var string = this;
    ;
    string = string.replace(/ð/g, "Ð");
    string = string.replace(/þ/g, "Þ");
    string = string.replace(/i/g, "Ý");
    string = string.replace(/ö/g, "Ö");
    string = string.replace(/ü/g, "Ü");
    string = string.replace(/ç/g, "Ç");

    return string.toUpperCase();
}
String.prototype.escapeSpecialChars = function () {
    return this.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
};

var timerID = null;
var count = 0;
var timerRunning = false;
var reset = false;

function sendLink(link, url, target) {

    var hideButtonAfterClick = false;

//4. parametre gelir ise bu butonun saklanip saklanmayacagini belirler
    try {
        if (arguments.length > 3) {
            hideButtonAfterClick = arguments[3];
        }
    } catch (err) {
        //do nothing
    }

    var last = url.substring(url.lastIndexOf('.'), url.length)
    var url_query = generateRandom(999, 9999999);
    var isgoback = (last == ".back(1)" || last == ".back(-1)" || last == ".go(-1)");
    if (isgoback) {
        self.history.go(-1);
        return false;
    }

    if (last != ".do" && last != ".html" && last != ".jsp" && last != ".back(1)" && last != ".back(-1)" && last != ".go(-1)" && last != "/ik/" && last != "/ikportal/")
        url = url + '&rnd_number=' + url_query;
    if (url.indexOf("deleteAll") != -1) {
        if (confirm(getMessage("S0003"))) {
            link.href = url;
            link.target = target;
            setLoadingTimer(target);
            if (hideButtonAfterClick)
                $(link).hide();

        }
    } else if (url.indexOf("deleteDet") != -1) {
        if (confirm(getMessage("S0008"))) {
            link.href = url;
            link.target = target;
            setLoadingTimer(target);
            if (hideButtonAfterClick)
                $(link).hide();
        }
    } else if (url.indexOf("delete") != -1) {
        if (confirm(getMessage("S0001"))) {
            link.href = url;
            link.target = target;
            setLoadingTimer(target);
            if (hideButtonAfterClick)
                $(link).hide();
        }
    } else {
        link.href = url;
        link.target = target;
        setLoadingTimer(target);
        if (hideButtonAfterClick)
            $(link).hide();
    }

}

function sendLinkFromShortCut(link, url, target) {
    var last = url.substring(url.lastIndexOf('.'), url.length)
    var url_query = generateRandom(999, 9999999);
    if (last != ".do" && last != ".html" && last != ".jsp" && last != ".back(1)" && last != ".back(-1)" && last != ".go(-1)" && last != "/ik/" && last != "/ikportal/")
        url = url + '&rnd_number=' + url_query;
    var promptAttributes = "toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes"
    if (url.indexOf("deleteAll") != -1) {
        if (confirm(getMessage("S0003"))) {
            if (target == '_blank')
                openPrompt(url, 'Prompt', promptAttributes, 800, 600);
            else
                window.location = url;
            setLoadingTimer(target);
            return false;
        }
    } else if (url.indexOf("deleteDet") != -1) {
        if (confirm(getMessage("S0008"))) {
            if (target == '_blank')
                openPrompt(url, 'Prompt', promptAttributes, 800, 600);
            else
                window.location = url;
            setLoadingTimer(target);
            return false;
        }
    } else if (url.indexOf("delete") != -1) {
        if (confirm(getMessage("S0001"))) {
            if (target == '_blank')
                openPrompt(url, 'Prompt', promptAttributes, 800, 600);
            else
                window.location = url;
            setLoadingTimer(target);
            return false;
        }
    } else {
        if (target == '_blank')
            openPrompt(url, 'Prompt', promptAttributes, 800, 600);
        else
            window.location = url;
        setLoadingTimer(target);
        return false;
    }

}

function hideUstButtonGroup() {
    try {
        $("[name^='ustbtngrp']").each(function (index) {
            $(this).addClass("normal");
            $(this).css('font-weight', 'bold');
            $(this).find("a").remove();
            if (index == 0)
                $(this).html(getMessage("M1258"));
        });

        $("body").append("<div class='black_overlay' style='display:block;color:#808080;text-align:center;vertical-align:middle;padding-top:100px;font-family:Tahoma;font-size:25px;'>" + getMessage("M1258") + "</div>")
    } catch (err) {
    }
    try {
        $("[name^='button2Tag']").each(function (index) {
            $(this).hide();
        });
    } catch (err) {
    }

}


function sendForm(cmd, fp, verify, action, target) {
    var hideButtonAfterClick = false;
    var _hrwebapptype = true;
    //4. parametre gelir ise bu butonun saklanip saklanmayacagini belirler
    try {
        if (arguments.length > 5) {
            hideButtonAfterClick = arguments[5];
        }
    } catch (err) {
    }

    if ((cmd == "delete") || (cmd == "deletegv") || (cmd == "detailDelete") || (cmd == "deletek") || (cmd == "deletebt") || (cmd == "deleteDov") || (cmd == "deleteblt") || (cmd == "gelplndelete") || (cmd == "pdgglpdelete")) {
        if (typeof(fp.hrwebapptype) != "undefined" && (fp.hrwebapptype.value == "ikportal_fl" || fp.hrwebapptype.value == "ik_fl")) {
            _hrwebapptype = false;
            swal({
                title: getMessage("M2335"),
                text: getMessage("M2336"),
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn btn-danger",
                confirmButtonText: getMessage("M2337"),
                cancelButtonText: getMessage("M2338"),
                cancelButtonClass: "btn btn-primary m-l-lg",
                buttonsStyling: false,
            }).then(function(result) {
                if (result.value) {
                    f_sendForm(cmd, fp, verify, action, target);
                }
                return;
            });
        } else {
            if (confirm(getMessage("S0001")) == false) return;
        }
    } else if ((cmd == "deleteddb")) {
        if (confirm(getMessage("S0006")) == false) return;
    } else if ((cmd == "editegtgrc")) {
        if (confirm(getMessage("S0007")) == false) return;
    } else if ((cmd == "approveRecord")) {
        if (confirm(getMessage("S0009")) == false) return;
    } else if ((cmd == "createForm")) {
        if (confirm(getMessage("S0010")) == false) return;
    } else if ((cmd == "izindonustur")) {
        var kullanBakiye = eval(fp.ciznbak.value);
        var kullanIzin = eval(fp.cpizs01.value);
        if ((kullanBakiye < kullanIzin)) {
            if (confirm(getMessage("M0798")) == false) return;
        }
    }
    
    $("form").each(function() {
  		// Form reference:
  	  	var theForm = document.forms[this.name];
  	  	if (document.getElementById('randomInfoID') != null)
  	  		addHidden(theForm, 'randomInfoID', document.getElementById('randomInfoID').innerHTML);  	  	 
  	});

    if (_hrwebapptype) {
        f_sendForm(cmd, fp, verify, action, target, hideButtonAfterClick);
    }
}

function f_sendForm(cmd, fp, verify, action, target, hideButtonAfterClick) {
    var url_query = generateRandom(999, 9999999);
    if (target != null) fp.target = target;
    fp.cmd.value = cmd;
    verify = verify * 1;
    var kontrol = false;
    fp.action = action; //+"?rnd_number="+url_query;
    if (fp.action.indexOf('?') > -1)
        fp.action = action + "&rnd_number=" + url_query;
    else fp.action = action + "?rnd_number=" + url_query;
    if (verify == 1) {
        kontrol = formVerify(fp);
        if (kontrol) {
            fp.submit();
            setLoadingTimer(target);
            if (hideButtonAfterClick)
                hideUstButtonGroup();
        }
    } else {
        fp.submit();
        setLoadingTimer(target);
        if (hideButtonAfterClick)
            hideUstButtonGroup();
    }
    return;
}

function showUser(name) {
    window.status = name
}

// cont ile gönderilen string icinde tokenizer ile
// ayrýlan stringleri diziye koyar ve diziyi geri
// döndürür. Promptlarda kullanýlýyor...
function tokenize(cont, tokenizer) {
    var _array = new Array();
    j = 0;
    temp = "";
    for (var i = 0; i < cont.length; i++) {
        if (cont.charAt(i) != tokenizer) {
            temp = temp + cont.charAt(i);
        } else {
            _array[j++] = temp;
            temp = "";
        }
    }
    if (temp.length > 0) {
        _array[j++] = temp;
    }
    return _array;
}

// promptlarda seçim yapýlýnca gönderilen fieldname
// lere göre value larý ilgili form da atama yapar ve
// promptu kapatýr
function closePrompt(fieldname, value) {
    var fieldnames = tokenize(fieldname, '|');
    var values = tokenize(value, '|');
    for (var i = 0; i < fieldnames.length; i++) {
        //var element = eval("window.opener.document." + fieldnames[i]);
        var element = eval(fieldnames[i]);
        if (typeof(element) == "undefined")
            continue;
        if (element.type == 'text' || element.type == 'hidden' || element.type == 'textarea' || element.type == 'number') {
            try {
                element.value = values[i].replace(/#n/g, '\r\n'); //jsp sayfasindan close promptu cagirirken string degerde \r\n olma olasiligi var ise degeri #n yapilmali
            } catch (err) {
                element.value = values[i];
            }

            try {
                element.focus();//disable elementlerde focus yapamiyor
            } catch (err) {
            }
        } else if (element.type == 'checkbox') {
            if (element.value == values[i])
                element.checked = true;
            else
                element.checked = false;
        } else if (element.type == 'select-one') {
            element.value = values[i];
            $('#' + element.name).change();
        }

    }
    //window.close();
    $('#promptModal').modal('hide');
}

// promptu açar......
// örnek :
// openPrompt('/context/omgrp.do?cmd=prompt&apkodu=A&fieldname=form1.odesek|form1.odeack;','Prompt','',600,400)
// attributes e deger gonderilirken height ve width dýþýndakileri gönderiniz..
function openPrompt(url, title, attributes, width, height) {
    // promptu ekranýn ortasýnda açmak için......
    var vertpos = (width / 2);
    var horpos = (height / 2);
    var swcalc = (screen.width / 2);
    var shcalc = (screen.height / 2);
    var tlt = (swcalc - vertpos);
    var tll = (shcalc - horpos);
    var attr = "height=" + height + ",width=" + width + ",left=" + tlt + ",top=" + tll + ",screenx=" + tlt + ",screeny=" + tll;
    attr = attr + ", scrollbars=yes, resizable=yes ";
    var newWindow;
    if (attributes != '') {
        attr = attr + ',' + attributes;
    }
    newWindow = window.open(url, title, attr);
    newWindow.focus();
}


// String trim....
function trim(s) {
    var str = "";
    if (s == null) return str;
    for (trim_i = 0; trim_i < s.length; trim_i++) {
        if (s.charAt(trim_i) != " ") str = str + s.charAt(trim_i);
    }
    return str;
}

// boþ kalmamasý gereken nümerik bi alanda onKeyUp="check(this,repl)" ile eklenirse
// boþ kaldýðýnda repl string ini yerleþtirir.
function fill(field, repl) {
    if (trim(field.value) == "") field.value = repl;
}


// Combox lardan gelen KOD|ACIKLAMA þeklindeki ifadenin KOD kismini döndürür
function getComboValue(sel_opt) {
    var index = sel_opt.indexOf("|");
    if (index != -1)
        return sel_opt.substring(0, sel_opt.indexOf("|"));
    else
        return sel_opt;
}

function textcon(txtarea, count) {
    if (txtarea.value.length >= count)
        return false
    else
        return true
}

function textconblur(txtarea, count) {
    if (txtarea.value.length >= count) {
        alert(getMessage("M1058") + count + getMessage("M1059"));
        return false
    }
    else
        return true
}

function textlengthcheck(txtarea, count) {
    if (txtarea.value.length > count) {
        alert(getMessage("M1058") + ((txtarea.value.length - count)) + " " + getMessage("M1247"));
        return false
    }
    else
        return true
}

function signboard(txtarea, count, idlabel, idtextarea) {
    document.getElementById(idlabel).innerHTML = count - txtarea.value.length;
    if ((count - txtarea.value.length) < 0) {
        //alert ( getMessage("M1058") + ((txtarea.value.length - count))+" " + getMessage("M1247") );
        document.getElementById(idlabel).style.color = "#FF0000";
        //document.getElementById(idtextarea).style.color = "#FF0000";
    }
    else {
        document.getElementById(idlabel).style.color = "#7B8989";
        //document.getElementById(idtextarea).style.color = "#000000";
    }
}

function datediff(dt1, dt2, dt3) {
    var hesap1 = dt1.value;
    var hesap2 = dt2.value;

    var yil = eval(hesap1.substring(6, 10));
    var yil_k = eval(hesap2.substring(6, 10));
    var ay = eval(hesap1.substring(3, 5));
    var ay_k = eval(hesap2.substring(3, 5));
    var gun = eval(hesap1.substring(0, 2));
    var gun_k = eval(hesap2.substring(0, 2));

    if (gun_k < gun) {
        gun_k = gun_k + 30;
        ay_k = ay_k - 1;
        if (ay_k < 0)
            ay_k = 0;
    }

    if (ay_k < ay) {
        ay_k = ay_k + 12;
        yil_k = yil_k - 1;
        if (yil_k < 0)
            yil_k = 0;
    }

    var kidem_gun = gun_k - gun;
    var kidem_ay = ay_k - ay;
    var kidem_yil = yil_k - yil;
    if (kidem_yil < 0)
        kidem_yil = 0;

    if (kidem_gun >= 30) {
        kidem_gun = 0;
        kidem_ay = kidem_ay + 1;
    }

    if (kidem_ay >= 12) {
        kidem_ay = kidem_ay - 12;
        if (kidem_ay < 0)
            kidem_ay = 0;
        kidem_yil = kidem_yil + 1;
    }


    kidem_gun = kidem_gun + 1;
    if (kidem_gun >= 30) {
        kidem_gun = 0;
        kidem_ay = kidem_ay + 1;
    }

    if (kidem_ay >= 12) {
        kidem_ay = kidem_ay - 12;
        if (kidem_ay < 0)
            kidem_ay = 0;
        kidem_yil = kidem_yil + 1;
    }


    yil = kidem_yil;
    ay = kidem_ay;
    gun = kidem_gun;


    if (yil < 10) yil = "0" + yil; else yil = "" + yil;
    if (ay < 10) ay = "0" + ay; else ay = "" + ay;
    if (gun < 10) gun = "0" + gun; else gun = "" + gun

    if (isNaN(yil + ay + gun))
        dt3.value = "";
    else
        dt3.value = yil + ay + gun;
}

function datediff2(dt1, dt2, dt3) {
    var hesap1 = dt1.value;
    var hesap2 = dt2.value;
    var yil1 = eval(hesap1.substring(0, 2));
    var yil2 = eval(hesap2.substring(0, 2));
    var ay1 = eval(hesap1.substring(2, 4));
    var ay2 = eval(hesap2.substring(2, 4));
    var gun1 = eval(hesap1.substring(4, 6));
    var gun2 = eval(hesap2.substring(4, 6));
    var count = 0;
    var gun = gun1 + gun2;
    if (gun >= 30) {
        gun = gun - 30;
        count = 1;
    }
    var ay = ay1 + ay2 + count;
    count = 0;
    if (ay >= 12) {
        ay = ay - 12;
        count = 1;
    }
    var yil = yil1 + yil2 + count;

    if (yil < 10) yil = "0" + yil; else yil = "" + yil;
    if (ay < 10) ay = "0" + ay; else ay = "" + ay;
    if (gun < 10) gun = "0" + gun; else gun = "" + gun

    if (isNaN(yil + ay + gun))
        dt3.value = "";
    else
        dt3.value = yil + ay + gun;
}

function datediff3(dt1, dt2, dt3) {
    var hesap1 = dt1.value;
    var hesap2 = dt2.value;

    var yil1 = eval(hesap1.substring(6, 10));
    var yil2 = eval(hesap2.substring(6, 10));
    var ay1 = eval(hesap1.substring(3, 5));
    var ay2 = eval(hesap2.substring(3, 5));
    var gun1 = eval(hesap1.substring(0, 2));
    var gun2 = eval(hesap2.substring(0, 2));

    var count = 0;
    var gun = gun2 - gun1;
    if (gun < 0) {
        gun = gun + 30;
        count = 1;
    }
    var ay = (ay2 - ay1) - count;
    count = 0;
    if (ay < 0) {
        ay = ay + 12;
        count = 1;
    }
    var yil = (yil2 - yil1) - count;

    if (yil < 10) yil = "0" + yil; else yil = "" + yil;
    if (ay < 10) ay = "0" + ay; else ay = "" + ay;
    if (gun < 10) gun = "0" + gun; else gun = "" + gun

    if (isNaN(yil + ay + gun))
        dt3.value = "";
    else
        dt3.value = yil + ay + gun;
}

function formatla(field) {
    str = field.value;
    var tempstr, newstr;
    var commapos, aftercomma, commacount;
    while (str.indexOf(",") >= 0) {
        str = str.replace(",", "");
    }
    commacount = 0;
    commapos = str.indexOf(",");
    if (commapos >= 0) {
        aftercomma = str.substr(commapos);
        str = str.substr(0, commapos);
    }
    else
        aftercomma = "";

    if (str.length > 3) {
        tempstr = str;
        newstr = "";
        while (tempstr.length > 3) {
            newstr = "," + tempstr.substr(tempstr.length - 3) + newstr;
            tempstr = tempstr.substr(0, tempstr.length - 3);
        }
        nokta = tempstr + newstr + aftercomma
    }
    else {
        nokta = str;
    }
    field.value = nokta;
}

function mod(a, b) {
    return a - Math.floor(a / b) * b;
}

function div(a, b) {
    return Math.floor(a / b);
}

function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        while (1) {
            curleft += obj.offsetLeft;
            if (!obj.offsetParent)
                break;
            obj = obj.offsetParent;
        }
    } else if (obj.x)
        curleft += obj.x;
    return curleft;
}

function findPosY(obj) {
    var curtop = 0;
    if (obj.offsetParent)
        while (1) {
            curtop += obj.offsetTop;
            if (!obj.offsetParent)
                break;
            obj = obj.offsetParent;
        }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}

function getRadioCheckedValue(radio) {
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked)
            return radio[i].value;
    }
    return "";
}


function callFunction(funcRef, funcName) {
    var tag = document.getElementById(funcRef);
    if (funcName == 'onclick')
        tag.onclick();
    if (funcName == 'onblur')
        tag.onblur();
}

function getMouseXY(e) {
    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
    }
    // posx and posy contain the mouse position relative to the document
    // Do something with this information
    var result = new Array(2);
    result[0] = posx;
    result[1] = posy;
    return result;
}

function refreshParent() {
    var hreff = window.opener.location.href;
    window.opener.location.reload();// = hreff;

    if (window.opener.progressWindow) {
        window.opener.progressWindow.close()
    }
    window.close();
}


function DisableButton(div_id) {
    var _div = document.getElementById(div_id);
    if (_div != null)
        _div.style.visibility = 'hidden';
}

function EnableButton(div_id) {
    var _div = document.getElementById(div_id);
    if (_div != null)
        _div.style.visibility = 'visible';
}

function copySelectBoxOptions(resource, destination, emptydestinationfirst) {
    if (emptydestinationfirst)
        removeAllOptions(destination);

    for (i = 0; i < resource.options.length; i++) {
        addItem(destination, resource.options[i].value, resource.options[i].text);
    }

    //removeAllOptions(resource, true);

}

function removeAllOptions(selectbox, addNoneOption) {
    selectbox.options.length = 0;
    if (addNoneOption)
        addItem(selectbox, "-1", "----Hiçbiri----");
}

function addItem(selectbox, item_val, item_text) {
    var varmi = isValueExist(selectbox, item_val);
    if (varmi == -1) {
        selectbox.options[selectbox.options.length] = new Option(item_text, item_val);
    }
}

function isValueExist(selectbox, item_val) {
    var i = 0;
    var varmi = false;
    for (i = 0; i < selectbox.options.length; i++) {
        if (selectbox.options[i].value == item_val) {
            varmi = true;
            break;
        }
    }
    if (!varmi)
        return -1;
    else
        return i;
}

function getSelectedValueByKey(selectbox, key) {
    var varmi = isValueExist(selectbox, key);
    var result = "";
    if (varmi != -1)
        result = selectbox.options[varmi].text;
    return result;
}

function setSelected(selectbox, sel_val) {
    varmi = isValueExist(selectbox, sel_val);
    if (varmi != -1)
        selectbox.options[varmi].selected = true;
}


function submitViaEnter(evt, cmd, fp, validate, path) {
    evt = (evt) ? evt : event;
    var target = (evt.target) ? evt.target : evt.srcElement;
    var form = target.form;
    var charCode = (evt.charCode) ? evt.charCode :
        ((evt.which) ? evt.which : evt.keyCode);
    if (charCode == 13 || charCode == 3) {
        sendForm(cmd, fp, validate, path);
        return false;
    }
    return true;
}


function dontPressTurkish(textbox) {
    var val = textbox.value;
    val = val.replace(/[^0-9a-zA-Z@._]/g, "");
    textbox.value = val;
}

function imposeMaxLength(Object, MaxLen) {
    if (Object.value.length > MaxLen)
        Object.value = Object.value.substring(0, MaxLen)
}

function swaphideshow(id) {
    var tr = document.getElementsByName(id);
    alert(tr[0]);
    if (tr == null) {
        return;
    }
    var bExpand = tr.style.display == '';
    tr.style.display = (bExpand ? 'none' : '');
    close_others(id);
}


function startPolling() {
    setInterval("poll()", 100);
}

function startPollingExtra() {
    setInterval("pollExtra()", 100);
}

function startDivPolling(divref) {
    setInterval(function () {
        polldiv(divref)
    }, 100);
}

/*function poll(){
	if (navigator.appName == "Microsoft Internet Explorer"){
		var position = document.body.scrollTop;
	}else
	{
		var position = window.pageYOffset;
	}
	document.getElementById('ok_div').style.top=position+200;
	document.getElementById('ok_div').style.left=5;
}*/

function polldiv(divref) {
    var ScrollTop = document.body.scrollTop;
    if (ScrollTop == 0) {
        if (window.pageYOffset)
            ScrollTop = window.pageYOffset;
        else
            ScrollTop = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
    }
    divref.style.top = ScrollTop + 200;
}

function poll() {
    var ScrollTop = document.body.scrollTop;
    if (ScrollTop == 0) {
        if (window.pageYOffset)
            ScrollTop = window.pageYOffset;
        else
            ScrollTop = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
    }
    document.getElementById('ok_div').style.top = (ScrollTop * 1 + 300) + "px";
    document.getElementById('ok_div').style.left = "5px";

    if (ScrollTop == 0) {
        try {
            poll2();
        } catch (err) {
        }
    }
}

function poll2() {
    var ScrollTop = parent.document.body.scrollTop;
    if (ScrollTop == 0) {
        if (parent.window.pageYOffset)
            ScrollTop = parent.window.pageYOffset;
        else
            ScrollTop = (parent.document.body.parentElement) ? parent.document.body.parentElement.scrollTop : 0;
    }
    document.getElementById('ok_div').style.top = (ScrollTop * 1 + 300) + "px";
    document.getElementById('ok_div').style.left = "5px";
}

function pollExtra() {
    var ScrollTopExtra = document.body.scrollTop;
    if (ScrollTopExtra == 0) {
        if (window.pageYOffset)
            ScrollTopExtra = window.pageYOffset;
        else
            ScrollTopExtra = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
    }
    document.getElementById('ok_div_extra').style.top = (ScrollTopExtra * 1 + 340) + "px";
    document.getElementById('ok_div_extra').style.left = "5px";

    if (ScrollTopExtra == 0) {
        try {
            poll2Extra();
        } catch (err) {
        }
    }
}

function poll2Extra() {
    var ScrollTopExtra = parent.document.body.scrollTop;
    if (ScrollTopExtra == 0) {
        if (parent.window.pageYOffset)
            ScrollTopExtra = parent.window.pageYOffset;
        else
            ScrollTopExtra = (parent.document.body.parentElement) ? parent.document.body.parentElement.scrollTop : 0;
    }
    document.getElementById('ok_div_extra').style.top = (ScrollTopExtra * 1 + 340) + "px";
    document.getElementById('ok_div_extra').style.left = "5px";
}

function getDateObject(date1) {
    var year1 = date1.substring(6, 10) * 1;
    var month1 = date1.substring(3, 5) * 1;
    var day1 = date1.substring(0, 2) * 1;
    var obj = new Date();
    obj.setDate(day1);
    obj.setMonth(month1 - 1);
    obj.setFullYear(year1);
    return obj;
}

function getDateObjectByFormat(date1, format) {
    if (format == "yyyyaagg") {
        var year1 = date1.substring(0, 4) * 1;
        var month1 = date1.substring(5, 7) * 1;
        month1 = month1 - 1;
        var day1 = date1.substring(8, 10) * 1;


        var obj = new Date(year1, month1, day1, 0, 0, 0, 0);
        return obj;
    }
}

function convertDateToString(date) {
    var year1 = date.substring(0, 4);

    var month1 = date.substring(5, 7);
    // if (month1 < 10) month1 = "0" + month1;

    var day1 = date.substring(8, 10);
    //if (day1 < 10) day1 = "0" + day1;

    return year1 + month1 + day1;
}


function dateToString(date1, format) {
    if (format == "yyyyaagg") {
        var year1 = date1.getFullYear();
        var month1 = date1.getMonth();
        month1 = month1 + 1;
        var day1 = date1.getDate();

        var monthstr = "";
        if (month1 < 10)
            monthstr = "0" + month1;
        else
            monthstr = "" + month1;

        var daystr = "";
        if (day1 < 10)
            daystr = "0" + day1;
        else
            daystr = "" + day1;


        var str = year1 + "-" + monthstr + "-" + daystr;
        return str;
    }
}

function pageValidate(totalpage) {
    var indexpage = document.getElementById('pageindex').value * 1;
    if (indexpage > totalpage) {
        //alert(getMessage("M0816"));
        toastr.error(getMessage("M0816"));
        return false;
    }
    return true;
}

function MoveCurserToEnd(Element) {
    if (Element.createTextRange)
        Element.createTextRange().text += "";
    else if (Element.insertionPoint)
        Element.insertionPoint = Element.text.length;
}

function flipdiv(deger, div_id, ref_btn_id) {
    var imgobj = document.getElementById(ref_btn_id);
    var x = findPosX(imgobj);
    var y = findPosY(imgobj);
    var divobj = document.getElementById(div_id);
    divobj.style.top = y - 230;
    divobj.style.left = x + 70;
    divobj.style.visibility = deger;
}

function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture);
        return true;
    }
    else if (elm.attachEvent) {
        var r = elm.attachEvent('on' + evType, fn);
        return r;
    }
    else {
        elm['on' + evType] = fn;
    }
}

function getIndexByValue(selectbox, value) {
    result = -1;
    for (var i = 0; i < selectbox.length; i++) {
        if (selectbox.options[i].value == value) {
            result = i;
            break;
        }
    }
    return result;
}

function generateRandom(start, end) {
    var result = start + Math.floor(Math.random() * (end - start));
    return result;
}

function minMax(obj, a, img, max_path, min_path) {
    if (obj.style.display == 'none') {
        obj.style.display = 'block';
        img.src = min_path;
        a.title = 'Küçült';
    } else if (obj.style.display == 'block' || obj.style.display == '') {
        obj.style.display = 'none';
        img.src = max_path;
        a.title = 'Büyüt';
    }
}

function getElementsByClass(searchClass, domNode, tagName) {
    if (domNode == null) domNode = document;
    if (tagName == null) tagName = '*';
    var el = new Array();
    var tags = domNode.getElementsByTagName(tagName);
    var tcl = " " + searchClass + " ";
    for (i = 0, j = 0; i < tags.length; i++) {
        var test = " " + tags[i].className + " ";
        if (test.indexOf(tcl) != -1)
            el[j++] = tags[i];
    }
    return el;
}

function addAttribute(element, attributeName, attributeValue) {
    if (element.length == 0) {
        element.setAttribute(attributeName, attributeValue);
    } else {
        for (var i = 0; i < element.length; i++) {
            element[i].setAttribute(attributeName, attributeValue);
        }
    }
}

function hideElement(element) {
    if (element.length == 0) {
        element.style.visibility = 'hidden';
    } else {
        for (var i = 0; i < element.length; i++) {
            element[i].style.visibility = 'hidden';
        }
    }
}


function toogleCheckboxMain(cb_toogle, cb_ref) {
    var result = false;
    for (var y = 0; y < cb_ref.length; y++) {
        if (!cb_ref[y].checked) {
            result = true;
            break;
        }
    }
    cb_toogle.checked = !result;
}

function setPosition(ref_obj, obj, frame_obj, top_ofset, left_ofset) {
    var x = findPosX(ref_obj) + top_ofset;
    var y = findPosY(ref_obj) + left_ofset;
    obj.style.top = y;
    obj.style.left = x;
    frame_obj.style.height = obj.clientHeight;
    frame_obj.style.width = obj.clientWidth;
    frame_obj.style.top = y;
    frame_obj.style.left = x;
}


function AJAXInteractionDecode(fp, url, callback) {
    var req = init();
    req.onreadystatechange = processRequest;

    function init() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }

    function processRequest() {
        if (req.readyState == 4) {


            if (req.status == 200) {
                if (callback) callback(req);
                //callback()çagrildiginda readyState 4 degerini alirsa,XMLHttpRequest islemini tamamladi demektir.
                //Eger status degeri de 200 ise baglanti islemin basariyla yapildigi anlami çikar.
            }
        }
    }

    this.doGet = function () {
        req.open("GET", url, true);
        req.send(null);
    }
}

function insertDecode(group, kod, ad, id) {
    if (kod == "" || ad == "") {
        alert(getMessage("M0840"));
        return;
    }
    if (group == "TAB017" && kod.length != 3) {
        alert(getMessage("M0841"));
        return;
    }

    var btn = document.getElementById("b_" + id);
    btn.disabled = true;
    btn.value = "Lütfen Bekleyiniz";
    var url = "decode.ajax?cmd=insert&cdectab=" + group + "&cdecaln=" + kod + "&cdecact=" + ad + "&id=" + id;
    var ajax = new AJAXInteractionDecode(document.forms[0], url, validateCallbackInsertDecode);
    ajax.doGet();
    return false;
}

function validateCallbackInsertDecode(req) {
    var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
    xmldoc.async = false;
    xmldoc.loadXML(req.responseText);
    var root = xmldoc.getElementsByTagName("result")[0];
    var key = root.childNodes[0].firstChild.nodeValue;
    var value = root.childNodes[1].firstChild.nodeValue;
    var id = root.childNodes[2].firstChild.nodeValue;
    var error = root.childNodes[3].firstChild.nodeValue;
    var message = root.childNodes[4].firstChild.nodeValue;
    if (error == "true") {
        document.getElementById("p_" + id).style.visibility = 'hidden';
        addItem(document.getElementById(id), key, value);
    } else {
        alert(message);
    }
    var btn = document.getElementById("b_" + id);
    btn.disabled = false;
    btn.value = "Ekle";
}

function lastDayOfMonth(year, month) {
    var array = new Array("", "31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31");
    var number_month = eval(month) * 1;
    var number_year = eval(year) * 1;
    if (number_month == 2) {
        if (number_year % 4 == 0)
            return "29";
        else
            return "28";
    }
    return array[number_month];
}

function checkTCKimlikNo(tcno) {
    var knt = true;
    if (tcno.length == 11) {
        var tcKimlikNoNumber = parseInt(tcno);
        var d = new Array(10);
        var tmp1 = null;
        var tmp = null;
        var odd_sum = null;
        var even_sum = null;
        var total = null;
        var chkDigit1 = null;
        var chkDigit2 = null;
        if (tcKimlikNoNumber > 0) {
            tmp = Math.floor(tcKimlikNoNumber / 100);
            tmp1 = Math.floor(tcKimlikNoNumber / 100);
            for (var i = 9; i > 0; i--) {
                d[i] = tmp1 % 10;
                tmp1 = Math.floor(tmp1 / 10);
            }
            odd_sum = d[9] + d[7] + d[5] + d[3] + d[1];
            even_sum = d[8] + d[6] + d[4] + d[2];
            total = odd_sum * 3 + even_sum;
            chkDigit1 = (10 - (total % 10)) % 10;
            odd_sum = chkDigit1 + d[8] + d[6] + d[4] + d[2];
            even_sum = d[9] + d[7] + d[5] + d[3] + d[1];
            total = odd_sum * 3 + even_sum;
            chkDigit2 = (10 - (total % 10)) % 10;
            tmp = tmp * 100 + chkDigit1 * 10 + chkDigit2;
            if (tmp != tcKimlikNoNumber)
                knt = false;
        } else
            knt = false;
    }
    if (knt == false)
        alert(getMessage("M0886"));
    return knt;
}

function checkTCKimlikNoWithoutAlert(tcno) {
    var knt = true;
    if (tcno.length == 11) {
        var tcKimlikNoNumber = parseInt(tcno);
        var d = new Array(10);
        var tmp1 = null;
        var tmp = null;
        var odd_sum = null;
        var even_sum = null;
        var total = null;
        var chkDigit1 = null;
        var chkDigit2 = null;
        if (tcKimlikNoNumber > 0) {
            tmp = Math.floor(tcKimlikNoNumber / 100);
            tmp1 = Math.floor(tcKimlikNoNumber / 100);
            for (var i = 9; i > 0; i--) {
                d[i] = tmp1 % 10;
                tmp1 = Math.floor(tmp1 / 10);
            }
            odd_sum = d[9] + d[7] + d[5] + d[3] + d[1];
            even_sum = d[8] + d[6] + d[4] + d[2];
            total = odd_sum * 3 + even_sum;
            chkDigit1 = (10 - (total % 10)) % 10;
            odd_sum = chkDigit1 + d[8] + d[6] + d[4] + d[2];
            even_sum = d[9] + d[7] + d[5] + d[3] + d[1];
            total = odd_sum * 3 + even_sum;
            chkDigit2 = (10 - (total % 10)) % 10;
            tmp = tmp * 100 + chkDigit1 * 10 + chkDigit2;
            if (tmp != tcKimlikNoNumber)
                knt = false;
            else
                knt = true;
        } else
            knt = false;
    } else
        knt = false;
    return knt;
}

function setElementsDisabled(container) {

    var fields = container.getElementsByTagName('input');
    for (var j = 0; j < fields.length; j++) {
        fields[j].disabled = fields[j].readonly;
    }
    fields = container.getElementsByTagName('textarea');
    for (var j = 0; j < fields.length; j++) {
        fields[j].disabled = fields[j].readOnly;
    }

}


function switchAll(container, truefalse) {
    $('input').attr("disabled", truefalse);
    $('textarea').attr("disabled", truefalse);
    $(':hidden').attr("disabled", false);

    setReadonlyClass();
}

function setReadonlyClass() {

    $('input[type=text]').each(function () {
        if ($(this).attr('readonly'))
            $(this).addClass('disableLikeInput');
    });
    $('textarea').each(function () {
        if ($(this).attr('readonly'))
            $(this).addClass('disableLikeInput');
    });
}

function hideShowTopMenu(anchor, imageId) {
    var image = document.getElementById(imageId);
    var objtop = parent.document.getElementById("TopFrameset");

    var src = image.src;
    var index = src.indexOf("_");
    var srctemp = src.substring(0, index);
    var srcup = srctemp + "_up.gif";
    var srcdown = srctemp + "_down.gif";

    if (objtop.rows == "0,*") {
        objtop.rows = "100,*";
        image.src = srcup;
        anchor.title = "Baþlýðý Gizle";
    } else {
        objtop.rows = "0,*";
        image.src = srcdown;
        anchor.title = "Baþlýðý Göster";
    }
}


function hideShowLeftMenu(doubleParent) {
    var parentjon = parent;
    if (doubleParent)
        parentjon = parent.parent;

    var menuDocument = parentjon.document.getElementById("idMenu").contentWindow.document;
    var anchor = menuDocument.getElementById('idAnchor');
    var image = menuDocument.getElementById('idMenuSwitch');
    var objleft = parentjon.document.getElementById("ChildFrameset");

    var src = image.src;
    var index = src.indexOf("_");
    var srctemp = src.substring(0, index);
    var srcleft = srctemp + "_left.gif";
    var srcright = srctemp + "_right.gif";
    var table = menuDocument.getElementById("Table_Ana");

    var btnGroup = menuDocument.getElementById('btnGroup');
    var menuDiv = menuDocument.getElementById('menudiv');
    var btnGroup1 = menuDocument.getElementById('btnGroup1');
    var rootMenu = menuDocument.getElementById('rootMenu');

    if (objleft.cols == "70,*") {
        objleft.cols = "275,*";
        image.src = srcleft;
        anchor.title = getMessage("M1050");

        $('[id^="spnBtnspace"]').each(function () {
            $(this).html("");
        });
        $(btnGroup).width(226);
        $(table).width(265);
        $(menuDiv).show();
        $(btnGroup1).show();
        $(rootMenu).show();
    } else {
        objleft.cols = "70,*";
        image.src = srcright;
        anchor.title = getMessage("M1049");

        $('[id^="spnBtnspace"]').each(function () {
            $(this).html("<br>");
        });

        $(btnGroup).width(30);
        $(table).width(80);
        $(menuDiv).hide();
        $(btnGroup1).hide();
        $(rootMenu).hide();
    }
}

function hideLeftMenu(doubleParent) {
    var parentjon = parent;
    if (doubleParent)
        parentjon = parent.parent;

    var menuDocument = parentjon.document.getElementById("idMenu").contentWindow.document;
    var anchor = menuDocument.getElementById('idAnchor');
    var image = menuDocument.getElementById('idMenuSwitch');
    var objleft = parentjon.document.getElementById("ChildFrameset");

    var src = image.src;
    var index = src.indexOf("_");
    var srctemp = src.substring(0, index);
    var srcleft = srctemp + "_left.gif";
    var srcright = srctemp + "_right.gif";
    var table = menuDocument.getElementById("Table_Ana");

    var btnGroup = menuDocument.getElementById('btnGroup');
    var menuDiv = menuDocument.getElementById('menudiv');
    var btnGroup1 = menuDocument.getElementById('btnGroup1');
    var rootMenu = menuDocument.getElementById('rootMenu');

    objleft.cols = "70,*";
    image.src = srcright;
    anchor.title = getMessage("M1049");

    $('[id^="spnBtnspace"]').each(function () {
        $(this).html("<br>");
    });

    $(btnGroup).width(30);
    $(table).width(80);
    $(menuDiv).hide();
    $(btnGroup1).hide();
    $(rootMenu).hide();
}

function HideTopMenu() {
    var objtop = parent.document.getElementById("TopFrameset");
    objtop.rows = "0,*";
}

function ShowTopMenu() {
    var objtop = parent.document.getElementById("TopFrameset");
    objtop.rows = "100,*";
}

function ShowContents(menu_show, menu_hide) {
    var obj = parent.document.getElementById("ChildFrameset");
    if (obj == null)
        obj = parent.parent.document.getElementById("ChildFrameset");


    //window.top.ChildFrameset.cols=menu_show;
    obj.cols = menu_show;

    var obj2 = window.parent.topFrame;
    if (typeof(obj2) == 'undefined')
        obj2 = window.parent.parent.topFrame;

    obj2.document.getElementById('menu').innerHTML = '<b><a onClick="HideContents(\'' + menu_show + '\',\'' + menu_hide + '\')"><FONT size="2" face="Verdana, Arial, Helvetica, sans-serif;" color="#414141" style="cursor:pointer">Menü Gizle</FONT></a></b>';
    obj2.document.getElementById('menu').innerHTML = '<b><a style="style1" onClick="HideContents(\'' + menu_show + '\',\'' + menu_hide + '\')"><FONT size="2" face="Verdana, Arial, Helvetica, sans-serif;" color="#414141" style="cursor:pointer">' + getMessage("M1050") + '</FONT></a></b>';
}

function HideContents(menu_show, menu_hide) {
    //window.top.ChildFrameset.cols=menu_hide;
    var obj = parent.document.getElementById("ChildFrameset");
    if (obj == null)
        obj = parent.parent.document.getElementById("ChildFrameset");
    obj.cols = menu_hide;

    var obj2 = window.parent.topFrame;
    if (typeof(obj2) == 'undefined')
        obj2 = window.parent.parent.topFrame;

    obj2.document.getElementById('menu').innerHTML = '<b><a onClick="ShowContents(\'' + menu_show + '\',\'' + menu_hide + '\')"><FONT size="2" face="Verdana, Arial, Helvetica, sans-serif;" color="#414141" style="cursor:pointer">Menü Göster</FONT></a></b>';
    obj2.document.getElementById('menu').innerHTML = '<b><a style="style1" onClick="ShowContents(\'' + menu_show + '\',\'' + menu_hide + '\')"><FONT size="2" face="Verdana, Arial, Helvetica, sans-serif;" color="#414141" style="cursor:pointer">' + getMessage("M1049") + '</FONT></a></b>';
}

function RemoveMenu(menu_show, menu_hide) {
    var obj = parent.document.getElementById("ChildFrameset");
    if (obj == null)
        obj = parent.parent.document.getElementById("ChildFrameset");
    obj.cols = menu_hide;

    var obj2 = window.parent.topFrame;
    if (typeof(obj2) == 'undefined')
        obj2 = window.parent.parent.topFrame;
    obj2.document.getElementById('menu').innerHTML = '';
}

function beforeOfset(str, ofset) {
    var index = str.indexOf(ofset);
    if (index != -1)
        return $.trim(str.substring(0, index));
    else
        return str;
}

function afterOfset(str, ofset) {
    var index = str.indexOf(ofset);
    if (index != -1)
        return $.trim(str.substring(index + 1));
    else
        return str;
}

function avoidPaste() {
    $('input').bind('copy paste', function (e) {
        alert(getMessage('M0993'));
        clipboardData.clearData();
    });
}

function makeNumeric(obj, cansetNegative, max1, max2) {
//max1 gönderilmemis ise default' 0

    if (typeof(max2) == 'undefined')
        max2 = 0;

    //max1 gönderilmemis ise attribute'taki veriden aliyoruz
    if (typeof(max1) == 'undefined') {
        var maxlength = $(obj).attr("maxlength");
        if (maxlength < 18)
            max1 = maxlength;
        else
            max1 = 7;
    }

    $(obj).bind('keypress', function (event) {
        return makeNumberWithScale(obj, event, max1, max2, cansetNegative);
    });

    $(obj).bind('blur', function () {
        setScaleOnBlur(obj, max1, max2);
    });
}


function unbindMakeNumeric(obj) {
    $(obj).unbind('keypress');
    $(obj).unbind('blur');
}

function makeNumberWithScale(obj, event, max1, max2, cansetNegative) {
    var scaleSplitter = '.';
    var splitcount = obj.value.split(scaleSplitter).length - 1;
    var splitpos = obj.value.indexOf(scaleSplitter);
    var charCode = (event.which) ? event.which : event.keyCode;
    if (obj.value.indexOf('.') > -1 && charCode == 46)
        return false;
    if (typeof(cansetNegative) == 'undefined') {
        cansetNegative = false;
    }

    if (charCode == 37)
        return false;

    if (charCode == 8 || charCode == 9 || charCode == 37 || charCode == 39 || charCode == 46)
        return true;

    if (isTextSelected(obj) && (charCode > 48 && charCode < 57)) {
        return true;
    }

    var addMinus = cansetNegative && charCode == 45 && obj.value.indexOf("-") == -1 && obj.value.length == 0;

    if (charCode < 48 || charCode > 57) {

        if (splitcount == 0 && charCode == 46 && max2 != 0)
            return true;
        if (addMinus)
            return true;

        return false;
    }

    var len = beforeOfset(obj.value, scaleSplitter);
    var scale = "";

    if (splitcount > 0)
        scale = afterOfset(obj.value, scaleSplitter);

    var cursorpos = caretPos(obj);
    if (len.length == max1 && (splitpos == -1 || cursorpos <= splitpos))
        return false;


    if (scale.length == max2 && cursorpos > splitpos && max2 != 0)
        return false;

    $(obj).bind('blur', function () {
        setScaleOnBlur(obj, max1, max2);
    });

}

function isTextSelected(input) {
    if (typeof input.selectionStart == "number") {
        return input.selectionStart == 0 && input.selectionEnd == input.value.length;
    } else if (typeof document.selection != "undefined") {
        input.focus();
        return document.selection.createRange().text == input.value;
    }
}


function setScaleOnBlur(obj, max1, max2) {

    var scaleSplitter = '.';
    if (obj.value.length > 0) {
        obj.value = obj.value.replace(/,/g, scaleSplitter);
        var lastChar = obj.value.substring(obj.value.length - 1);
        var firstChar = obj.value.substring(0, 1);
        if (firstChar == scaleSplitter)
            obj.value = "0" + obj.value;

        if (lastChar == scaleSplitter)
            obj.value = obj.value.substring(0, obj.value.length - 1);

        var splitcount = obj.value.split(scaleSplitter).length - 1;
        if (max2 > 0) {
            if (splitcount == 0)
                obj.value += scaleSplitter;
            var afterSplit = afterOfset(obj.value, scaleSplitter);
            for (var i = 0; i < (max2 - afterSplit.length); i++) {
                obj.value += '0';
            }
        }
    } else {
        var tempval = "0";
        if (max2 > 0) {
            tempval += ".";
            for (var i = 0; i < (max2); i++) {
                tempval += '0';
            }
        }
        obj.value = tempval;
    }
    obj.value = removeAllDotsExceptTheFirstOne(obj.value);
}

function removeAllDotsExceptTheFirstOne(input) {

    var index = input.indexOf('.');
    if (index > -1) {
        input = input.substr(0, index + 1) + input.slice(index).replace(/\./g, '');
    }
    return input;
}

function caretPos(el) {
    var pos = 0;
    // IE Support
    if (document.selection) {
        el.focus();
        var Sel = document.selection.createRange();
        var SelLength = document.selection.createRange().text.length;
        Sel.moveStart('character', -el.value.length);
        pos = Sel.text.length - SelLength;
    }
    // Firefox support
    else if (el.selectionStart || el.selectionStart == '0')
        pos = el.selectionStart;

    return pos;

}

function doSetCaretPosition(oField, iCaretPos) {

    // IE Support
    if (document.selection) {

        // Set focus on the element
        oField.focus();

        // Create empty selection range
        var oSel = document.selection.createRange();

        // Move selection start and end to 0 position
        oSel.moveStart('character', -oField.value.length);

        // Move selection start and end to desired position
        oSel.moveStart('character', iCaretPos);
        oSel.moveEnd('character', 0);
        oSel.select();
    }

    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0') {
        oField.selectionStart = iCaretPos;
        oField.selectionEnd = iCaretPos;
        oField.focus();
    }
}

function _autocomplete(dateval) {

    if (dateval.length == 8) {
        var last_two = dateval.substring(6);
        var first_part = dateval.substring(0, 6);
        var pref = '20';
        if (last_two > '20')
            pref = '19';
        first_part += pref + last_two;
        return first_part;
    }
    return dateval;
}

function takvimMaskOperations(input) {

    if (input.value.length == 10 && input.value.substring(8) == '__') {
        input.value = input.value.substring(0, 8);
        input.value = _autocomplete(input.value);
    }

    if (input.value.indexOf('_') != -1)
        input.value = '';
}


function clearStatusTextForAllAnchors() {
    $('a').bind('mouseover', function () {
        if (DTREE_USE_STATUS_TEXT) {
            window.status = $(this).attr('title');
            return true;
        }
    });
    $('a').bind('mouseout', function () {
        if (DTREE_USE_STATUS_TEXT) {
            window.status = '';
            return true;
        }
    });
}

function izinGunSaatDonusum(gun, saat, dakika, carpan, caller, izinnedeni) {
    if (izinnedeni == '001') {
        //setAsDisableLike(saat);
        //setAsDisableLike(dakika);
        $(saat).attr("readOnly", "true");
        $(dakika).attr("readOnly", "true");
    } else {
        //removeDisableLike(saat);
        //removeDisableLike(dakika);
        $(saat).removeAttr("readOnly");
        $(dakika).removeAttr("readOnly");
    }

    if (caller == "saat") {
        gun.value = ((saat.value * 1 + (dakika.value * 1 / 60)) / carpan.value * 1).toFixed(2);
    } else if (caller == "gun") {
        if (gun.value.indexOf(",") != -1) {
            gun.value = gun.value.replace(/, /g, ".");
        }

        saat.value = gun.value * 1 * carpan.value;
        saat.value = parseFloat(saat.value).toFixed(2);
        var pointIndex = saat.value.indexOf(".");

        if (pointIndex != -1) {
            dakika.value = parseInt((parseInt(saat.value.substring(pointIndex + 1)) * 6 / 10).toFixed(0));
            saat.value = parseInt(saat.value);
        } else {
            dakika.value = 0;
        }
    }

    if (!$.isNumeric(gun.value))
        gun.value = 0;
    if (!$.isNumeric(saat.value))
        saat.value = 0;
    if (!$.isNumeric(dakika.value))
        dakika.value = 0;
}

function setIzinsuresiSaatByIzinNedeni(objned, objsaat, objdakika, carpan) {
    if (objned.value != '001') {
        fl_removeDisableLike(objsaat);
        fl_removeDisableLike(objdakika);
    } else {
        fl_setAsDisableLike(objsaat);
        fl_setAsDisableLike(objdakika);
        var saatvalue = document.getElementById("cpizs01").value * 1 * carpan.value;
        saatvalue = saatvalue.toFixed(2);
        saatvalue = saatvalue + '';

        var pointIndex = saatvalue.indexOf(".");

        if (pointIndex != -1) {
            objdakika.value = parseInt((parseInt(saatvalue.substring(pointIndex + 1)) * 6.0 / 10).toFixed(0));
            objsaat.value = parseInt(saatvalue);
        } else {
            objdakika.value = 0;
        }
    }
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function setVucutKitleIndeksi(boyu, kilosu, objsonuc) {
    var boy = boyu / 100;
    var boykare = boy * boy;
    if (boykare == 0) {
        objsonuc.value = 0;
        return;
    }
    var kilo = kilosu * 1;
    var bmi = kilo / boykare;
    if (isNaN(bmi))
        bmi = 0;
    objsonuc.value = parseInt(bmi * 100) / 100;
}

function parseIzinSureleri(izinSureleri) {
    result = new Array();
    var ary = tokenize(izinSureleri, ";");
    for (var i = 0; i < ary.length; i++) {
        var item = tokenize(ary[i], "|");
        var item1 = item[0];
        var item2 = item[1];
        if (item2 == undefined)
            item2 = "0";
        if (item2.trim() == "")
            item2 = "0";
        result[item1] = item2;
    }

    return result;
}

function getFileSuffix(filename) {

    try {
        return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
    } catch (err) {

    }
    return "";
}

function setDate(objrefval, objhid) {
    if (objrefval.trim() == "") {
        objhid.value = "1900-01-01";
    } else {
        objhid.value = objrefval.substring(6, 10) + "-" + objrefval.substring(3, 5) + "-" + objrefval.substring(0, 2);
    }
}

function focusElementOnLoad() {
    try {
        for (i = 0; i < document.forms[0].elements.length; i++) {
            var el = document.forms[0].elements[i];
            if (el.type == 'text' || el.type == 'select-one' || el.type == 'checkbox') {
                el.focus();
                return;
            }
        }
    } catch (err) {
        //do nothing
    }
}

function setButtonsGroupAsDraggableAndSavePosition() {
    try {
        $('#buttonsgroup').draggable({
            axis: 'x',
            scroll: false,
            delay: 300,
            containment: 'document',
            cursor: 'move',
            helper: 'original',
            stop: function () {
                var o = $('#buttonsgroup').offset();
                setCookie('btn_grp_left', o.left, 100);
                setCookie('btn_grp_top', o.top, 100);
            }

        });
    } catch (err) {
    }
}

function buttonGroupClosingCounter() {
    var count = $('#idcountdown').html();
    if (count != '') {
        var n = count * 1;
        n = n - 1;
        if (n > 0)
            $('#idcountdown').html(n + '');
        if (n == 0) {
            $('#idcountdown').html('');
            clearInterval(window.closingCountDownTimerId);
        }
    }
}

function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
};

function setRelativeDatePicker(itemdest, itemsource, afterbefore) {
    var dateText = $('#' + itemsource).val();
    if (afterbefore == "after")
        $('#' + itemdest).datepicker('option', {minDate: dateText});
    else if (afterbefore == "before")
        $('#' + itemdest).datepicker('option', {maxDate: dateText});

    $('#' + itemdest).datepicker('option', {defaultDate: parseDate(dateText)});
}

function parseDate(dateText) {
    if (dateText == "")
        return new Date();
    if (dateText.length != 10)
        return null;
    if (dateText != "" && dateText.indexOf(".") != -1) {
        var day = dateText.substring(0, 2) * 1;
        var month = dateText.substring(3, 5) * 1 - 1;
        var year = dateText.substring(6, 10) * 1;
        return new Date(year, month, day);
    }
    return null;
}

function recycleSelectBox(item) {
    var img_id = 'img' + item.id;
    var img = document.getElementById(img_id);
    if (img == null) {
        if (!$(item).attr('disabled')) {
            $('#' + item.id).combobox();
            $('#' + item.id).combobox('focus');
        }
    } else {
        $('#' + item.id).combobox('destroy');
    }
}

function getNotSortableIndex(tableId) {
    var i = 0;
    var index = 0;
    var arrayOfNotSortable = new Array();
    $("#" + tableId + " tr th").each(function () {
        if (this.innerHTML == "&nbsp;" || this.innerHTML == "" || this.innerHTML.indexOf("checkbox") != -1)
            arrayOfNotSortable[i++] = index;

        index++;
    });

    return arrayOfNotSortable;
}

function getDateTimeSortable(tableId) {
    var i = 0;
    var index = 0;
    var dateTimeSortable = new Array();
    $("#" + tableId + " tr th").each(function () {
        if (this.innerHTML.indexOf("dataSortType") != -1 && this.innerHTML.indexOf("DATETIME") != -1)
            dateTimeSortable[i++] = index;

        index++;
    });

    return dateTimeSortable;
}

function makeSortable(tableId) {

    try {
        $('#' + tableId).dataTable({
            "aoColumnDefs": [
                {"bSortable": false, "aTargets": getNotSortableIndex(tableId)},
                {"sType": "eu_date", "aTargets": getDateTimeSortable(tableId)}
            ],
            "bSortClasses": false,
            "bLengthChange": false,
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "oLanguage": {
                "sProcessing": "Ýþleniyor...",
                "sLengthMenu": "Sayfada _MENU_ Kayýt Göster",
                "sZeroRecords": "Eþleþen Kayýt Bulunmadý",
                "sInfo": "  _TOTAL_ Kayýttan _START_ - _END_ Arasý Kayýtlar",
                "sInfoEmpty": "Kayýt Yok",
                "sInfoFiltered": "( _MAX_ Kayýt Ýçerisinden Bulunan)",
                "sInfoPostFix": "",
                "sSearch": "Bul:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "Ýlk",
                    "sPrevious": "Önceki",
                    "sNext": "Sonraki",
                    "sLast": "Son"
                }
            }
        });
    } catch (err) {
    }

}

//function CKEDITOR_DialogPositioningBugFix(){
//CKEDITOR.on('dialogDefinition', function(e) {
//  var dialogName = e.data.name;
// var dialogDefinition = e.data.definition;
//dialogDefinition.onShow = function() {
//      this.move(this.getPosition().x,0); // Top center
//}
//});
//}

function setLoadingTimer(target) {
    try {
        if (target != "_blank") {
            showLoading();
        }
    } catch (err) {
    }
}


function hideLoading() {
    try {
        window.parent.topFrame.document.getElementById('divLoading').style.display = "none";
        //window.parent.main2.document.getElementById('main').style.visibility = "visible";
    } catch (err) {
    }
}
/*
function showLoading() {
    try {
        var docTopFrame = window.parent.topFrame.document;
        docTopFrame.getElementById('divLoading').style.display = "block";
    } catch (err) {
        var docTopFrame = window.parent.parent.topFrame.document;
        docTopFrame.getElementById('divLoading').style.display = "block";
    }
}
*/
function showLoading() {
    document.getElementById('divLoading').style.display = "block";
}

function blurFocusedElementOnClickFunctionButton() {
    try {
        //$(document.activeElement).blur();
        $('input:focus').blur();
    } catch (err) {
    }
}

function hideButtonGroupIfNoButton() {
    try {
        var tds = $('[name="ustbtngrp"]');
        if (tds.length == 0) {
            $('#buttonsgroup').hide();
        }
    } catch (err) {
    }
}

function substractDaysFromADate(dateval, days) {
    var datestr = "";
    if (dateval != "") {
        var yil_k = eval(dateval.substring(6, 10));
        var ay_k = eval(dateval.substring(3, 5));
        var gun_k = eval(dateval.substring(0, 2));
        var dtobj = new Date();
        dtobj.setFullYear(yil_k * 1, ay_k * 1 - 1, gun_k * 1);

        var newDate = new Date(dtobj.getTime() - (days * 24 * 60 * 60 * 1000));
        var _m = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1);
        var _d = newDate.getDate() > 9 ? newDate.getDate() : "0" + newDate.getDate();
        datestr = _d + "." + _m + "." + newDate.getFullYear();
    }
    return datestr;
}

function dateAfter(dateval, days) {
    var datestr = "";
    if (dateval != "") {
        var yil_k = eval(dateval.substring(6, 10));
        var ay_k = eval(dateval.substring(3, 5));
        var gun_k = eval(dateval.substring(0, 2));
        var dtobj = new Date();
        dtobj.setFullYear(yil_k * 1, ay_k * 1 - 1, gun_k * 1);

        var newDate = new Date(dtobj.getTime() + (days * 24 * 60 * 60 * 1000));
        var _m = (newDate.getMonth() + 1) > 9 ? (newDate.getMonth() + 1) : "0" + (newDate.getMonth() + 1);
        var _d = newDate.getDate() > 9 ? newDate.getDate() : "0" + newDate.getDate();
        datestr = _d + "." + _m + "." + newDate.getFullYear();
    }
    return datestr;
}

function roundNumber(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

function repeatCalcHeight() {
    try {
        clearTimeout(window.scrollFixerIntervalId);
    } catch (err) {
    }
    window.scrollFixerIntervalId = setTimeout(function () {
        calcHeight()
    }, 400);
}

function calcHeight() {
    //find the height of the internal page
    try {
        var the_height = document.getElementById('main').contentWindow.document.body.scrollHeight;
        if (the_height < 1000) the_height = 1000;
        //change the height of the iframe
        if (the_height < 4750)
            document.getElementById('main').height = the_height;
        repeatCalcHeight();
    } catch (err) {
    }
}

function addDays(dateobj, days) {
    return new Date(dateobj.getTime() + (days * 1000 * 60 * 60 * 24));
}

function substractDays(dateobj, days) {
    return new Date(dateobj.getTime() - (days * 1000 * 60 * 60 * 24));
}

function formatDate(dateobj) {
    var dd = dateobj.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = dateobj.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yyyy = dateobj.getFullYear();
    return (dd + "." + mm + "." + yyyy)
}

function formatDateYYYYMMDD(dateobj) {
    var dd = dateobj.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = dateobj.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yyyy = dateobj.getFullYear();
    return (yyyy + "-" + mm + "-" + dd)
}

function scrollToAnchor(anchorname) {
    if (browserDetect() == "chrome")
        return;

    try {
        parent.location.hash = anchorname;
    } catch (err) {
    }
    try {
        window.parent.parent.main2.location.hash = anchorname;
    } catch (err) {
    }
}


function countChars(input, counter) {
    var message = input.value;
    var cnt = 0;
    for (var i = 0; i < message.length; i++) {
        var char = message.charAt(i);
        if (smsCharacterControl(char)) {
            cnt++;
        } else {
            cnt += 2;
        }
    }
    counter.value = cnt;
}

function discountChars(maxcount, input, counter) {
    var message = input.value;
    var cnt = 0;
    for (var i = 0; i < message.length; i++) {
        var char = message.charAt(i);
        if (smsCharacterControl(char)) {
            cnt++;
        } else {
            cnt += 2;
        }
    }
    counter.value = maxcount - cnt;
}

function asgariUcretKnt() {
    if (document.getElementById('cucreti').value == '0')
        return;
    var url = "persic.ajax?cmd=asgariUcret";
    var ajax = new AJAXInteraction(document.forms[0], url, validateCallbackAsgariUcret);
    ajax.doGet();
}

function validateCallbackAsgariUcret(req) {
    var xmldoc = getXMLDoc(req.responseText);
    var root = xmldoc.getElementsByTagName("result")[0];
    var message = root.childNodes[0].childNodes[1].firstChild.nodeValue;
    if (message != "-")
        alert(message);
}


/*function addBubble(id, innerText, cp) {
    $('#' + id).CreateBubblePopup({
        position: 'top',
        align: 'center',
        innerHtml: '<br>' + innerText,
        themeName: 'all-grey',
        themePath: cp + JQUERY_BUBBLE_IMAGE_PATH
    });
}*/

function addBubble(id, innerText, cp) {
    $('#' + id).popover({
        content: innerText,
        trigger: 'hover',
        placement: 'right',
        container: 'body',
        template:innerText
    });
}


function addBubbleWpostheme(id, innerText, cp, pos, th) {
    $('#' + id).CreateBubblePopup({
        position: pos,
        align: 'center',
        innerHtml: innerText,
        themeName: th,
        themePath: cp + JQUERY_BUBBLE_IMAGE_PATH,
        distance: 40
    });
}

function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    } else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

function setDegerlemeBilgileri(kategori, katalogKodu) {

    var name = "cprfpuap";
    //var puanlamaDiv = null;
    //var puanlamaDiv = window.opener.document.getElementById('divPuanlama_' + name);
    var puanlamaDiv = document.getElementById('divPuanlama_' + name);
    //console.log(puanlamaDiv);

    if (puanlamaDiv != null && typeof(puanlamaDiv) != "undefined") {
        var url = "perfrm.ajax?cmd=getPuanlamaBilgi&kategori=" + kategori + "&name=" + name + "&katalogKodu=" + katalogKodu;
        $.ajax({
            type: "GET",
            url: url,
            async: false,
            beforeSend: function () {
                puanlamaDiv.innerHTML = '';
            },
            success: function (data) {
                var html = $(data).find("result").text();
                puanlamaDiv.innerHTML = html;
            },
            error: function () {
            }
        });

    }

    name = "cprfpuay";
    //puanlamaDiv = window.opener.document.getElementById('divPuanlama_' + name);
    puanlamaDiv = document.getElementById('divPuanlama_' + name);
    //console.log(puanlamaDiv);
    if (puanlamaDiv != null && typeof(puanlamaDiv) != "undefined") {
        var url = "perfrm.ajax?cmd=getPuanlamaBilgi&kategori=" + kategori + "&name=" + name + "&katalogKodu=" + katalogKodu;
        $.ajax({
            type: "GET",
            url: url,
            async: false,
            beforeSend: function () {
                puanlamaDiv.innerHTML = '';
            },
            success: function (data) {
                var html = $(data).find("result").text();
                puanlamaDiv.innerHTML = html;
            },
            error: function () {
            }
        });

    }
}


function turkceKarakterTemizle(deger) {
    var sonuc = deger.toUpperCase();
    sonuc = sonuc.replace(/ /g, "");
    sonuc = sonuc.replace(/Ð/g, "G");
    sonuc = sonuc.replace(/Þ/g, "S");
    sonuc = sonuc.replace(/Ý/g, "I");
    sonuc = sonuc.replace(/Ö/g, "O");
    sonuc = sonuc.replace(/Ü/g, "U");
    sonuc = sonuc.replace(/Ç/g, "C");
    return sonuc;
}

function makeUpperCase(textbox) {
    textbox.value = turkceKarakterTemizle(textbox.value);
}


function buttonclickOpenmenu(buttonId, divId) {
    var pos = $("#" + buttonId).offset();
    var div = $("#" + divId);

    var display = div.css("display");
    if (display == "none")
        div.fadeIn();
    else
        div.fadeOut();

    div.offset({top: pos.top + 30, left: pos.left});

}

function openPreviousDetayRecord(divId, buttonId) {
    var pos = $("#" + buttonId).offset();
    var currentDivId = "#divid" + divId;

    $("[id^='divid']").each(function () {
        var id = $(this).attr("id");
        if ("#" + id != currentDivId)
            $(this).hide();
    });

    var div = $(currentDivId);


    var display = div.css("display");
    if (display == "none")
        div.fadeIn();
    else
        div.fadeOut();
    div.offset({top: pos.top + 30, left: pos.left - 250});


}

function serbestZamanSureKontrol(saat, dakika, carpan) {

    var sure = (saat * 1 + (dakika / 60)).toString();

    if (eval(sure) <= eval(carpan))
        return true;
    else {
        var mod = (eval(sure) % eval(carpan));
        if (mod == 0)
            return true;
    }
    return false;

}


function unescapeXmlSepcialChars(deger) {
    var sonuc = deger;
    sonuc = sonuc.replace(/&amp;/g, "&");
    sonuc = sonuc.replace(/&lt;/g, "<");
    sonuc = sonuc.replace(/&gt;/g, ">");
    sonuc = sonuc.replace(/&quot;/g, "\"");
    sonuc = sonuc.replace(/&apos;/g, "'");
    return sonuc;
}

function filterBySelection(cgechas, hasalt, uyarispan, ctrl) {
    if (cgechas.value != "-1") {
        var url = "iscsgd.ajax?cmd=loadAltHasKod&chaskod=" + cgechas.value;
        var selected = "-1";
        $.ajax({
            type: "GET",
            dataType: "xml",
            url: url,
            async: false,
            success: function (data) {
                try {
                    addItem(hasalt, "-1", "----- Hiçbiri -----");

                    $(data).find("row").each(function () {
                        var key = $(this).find("key").text();
                        var value = $(this).find("value").text();

                        if (ctrl == key)
                            selected = key;

                        addItem(hasalt, key, key + " - " + value);
                    });
                    hasalt.value = selected;

                } catch (err) {
                    alert(err);
                }
            },
            error: function () {
            },
            complete: function () {
                $(hasalt).combobox('destroy');
                $(hasalt).combobox();
            },
            beforeSend: function () {
                hasalt.options.length = 0;
            }
        });
    } else {
        addItem(hasalt, "-1", "----- Hiçbiri -----");
        hasalt.value = "-1";
        $(hasalt).combobox('destroy');
        $(hasalt).combobox();
    }

}


function controlHaskodHasalt(haskod, hasalt) {
    var result = "0";
    var url = "decode.ajax?cmd=controlHaskodHasalt&chaskod=" + haskod + "&chasalt=" + hasalt;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        async: false,
        success: function (data) {
            result = $(data).find("value").text();
        },
        error: function () {
        }
    });
    return result;
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}


function logConfirmMessage(message) {
    var url = "common.ajax?cmd=logConfirmMessage&message=" + message;
    $.ajax({
        type: "GET",
        url: url,
        async: false,
        beforeSend: function () {
        },
        success: function (data) {
        },
        error: function () {
        }
    });

}

function disabledForm(updateStatus) {

    if (updateStatus == '0') {
        //@dst1 22.11.2013 inputlar? readonly ve disabled yap?yor
        $(document).ready(function () {

            $(".date").find("input").datepicker('remove');
            $(".date").find(".input-group-addon").hide();

            $(':input').attr('readonly', 'readonly');
            $(':checkbox').click(function () {
                return false;
            });
            $(':radio:not(:checked)').attr('disabled', true);
            $(':input').addClass('displayInput');
            $('select').each(function () {
                /*bir problem olmas? halinde a?a??daki kodu tekrar açmam?z gerekiyor.
				if ($( this ).attr( "name").indexOf("corgkod") == -1 && $( this ).attr( "name").indexOf("ckadkod") == -1 ){
					$(this).hide();
					var text = $(this).find("option:selected").text();
					$(this).first().after("<input type=\"hidden\" name=\""+$( this ).attr( "name")+"\" value=\""+$( this ).val()+"\"><input class='displayInput' readonly='readonly' value='"+text+"' size='"+(text.length+14)+"' ></input>");
				}else{
					$( this ).attr( {"disabled":"disabled",
									 "class":"displayInput"
									});
				}*/
                //$(this).combobox('destroy');
                $(this).attr('disabled', 'disabled');
            });
            $('a:[rev!="disabledID"]').attr('onclick', '');
            $('img:[id!="promptNotReadonly"]').attr('onclick', '');
            $('input[type=button]').attr('onclick', '');
            $('input[type=text]').attr('disabled', '');
            $('input[type=textarea]').attr('disabled', '');
            $(".input-group-addon").attr("disabled","disabled");
        });

    }
}

function setMultiselectes(name) {
    $("#" + name).multiselect({selectedList: 4}).multiselectfilter({
        filter: function (event, matches) {
            if (!matches.length) {
            }
        }
    });
}

function SameRowAllCheckUncheck(name1, name2, i) {
    $("input[id^='" + name1 + i + "_']").each(function () {
        $(this).attr("checked", $("#" + name2 + i + "_").is(':checked'));
    });
}

function substractTwoDate(date1, date2) {

    var birthDate = stringToDate(date1);
    var currentDate = stringToDate(date2);

    var age = Math.floor((currentDate.getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

    return age;
}

function stringToDate(dateString) {
    var s = dateString;
    s = s.split(/\D/);
    return new Date(Date.UTC(s[0], --s[1] || '', s[2] || '', s[3] || '', s[4] || '', s[5] || '', s[6] || ''));
}

function hideElements(array) {
    for (var i = 0; i < array.length; i++) {
        $('[id="' + array[i] + '"]').hide();
    }
}

function prepareIsyerleri(isyeriCombo) {

    if (!$(isyeriCombo).attr('multiple')) {
        if (trim($(isyeriCombo).attr('value')) != "")
            return $(isyeriCombo).attr('value');
        else
            return "X#X|";
    }

    var coklu_isyerleri = "X#X|";
    var x;

    for (x = 0; x < isyeriCombo.length; x++) {
        if (isyeriCombo.options[x].selected) {
            coklu_isyerleri += isyeriCombo.options[x].value + "|";
        }
    }

    return coklu_isyerleri;
}


function prepareIsyerleriTextArea(textArea) {

    var isyerilist = tokenize(textArea.value.replace(/\n/g, "|"), "|");

    var coklu_isyerleri = "X#X|";
    var x;

    for (x = 0; x < isyerilist.length; x++) {
        coklu_isyerleri += isyerilist[x].substring(0, isyerilist[x].indexOf("-")) + "|";
    }

    return coklu_isyerleri;
}

function disableKusgrb(ckusgrb) {
    $(ckusgrb).hide();
    var text = $(ckusgrb).find("option:selected").text();
    $(ckusgrb).parent().html("<input class='displayInput' readonly='readonly' value='" + text + "' size='" + (text.length + 14) + "' ></input>");
}


function createDatePicker(kaytarid, hiddenid) {
    $("#" + kaytarid).datepicker({
        buttonImage: GENERAL_IMAGES_PATH + 'butonset5/takvim.gif',
        buttonImageOnly: true,
        numberOfMonths: 1,
        showOn: 'button',
        buttonText: getMessage('M1269'),
        showAnim: '',
        changeYear: true,
        onSelect: function (dateText, inst) {
            document.getElementById(kaytarid).focus();
        },
        onClose: function (dateText, inst) {
            setDate(dateText, document.getElementById(hiddenid));
        }
    });
}

function capLock(e) {
    kc = e.keyCode ? e.keyCode : e.which;
    sk = e.shiftKey ? e.shiftKey : ((kc == 16) ? true : false);
    if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk))
        document.getElementById('divPassWarning').style.visibility = 'visible';
    else
        document.getElementById('divPassWarning').style.visibility = 'hidden';
}

function showHidePassword(pass, size, imageId) {
    if (pass.type == "text") {
        pass.type = "password";
        //pass.size = pass.size + size;
        //imageId.src = 'images/LoginPage/unlock.png';
    } else {
        pass.type = "text";
        //pass.size = pass.size - size;
        //imageId.src = 'images/LoginPage/degistir.png';
    }
}

function dateDiffToday(date1, date2) {

    var yil1 = date1.substr(0, 4);
    var yil2 = date2.substr(0, 4);

    var ayi1 = date1.substr(5, 2);
    var ayi2 = date2.substr(5, 2);

    var gun1 = date1.substr(8, 2);
    var gun2 = date2.substr(8, 2);

    var diff = 365 * (yil2 - yil1) + 30 * (ayi2 - ayi1) + (gun2 - gun1);

    return diff;
}

function getCurrentDateYyyyMmDd() { // 2014-01-01 gibi
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 !
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    return today;
}

function dateFormatToTire(dateval) {
    if (dateval == "")
        return new Date();
    return dateval.substring(6, 10) + "-" + dateval.substring(3, 5) + "-" + dateval.substring(0, 2);
}

function dateFormatToNokta(dateval) {
    if (dateval == "")
        return new Date();
    return dateval.substring(8, 10) + "." + dateval.substring(5, 7) + "." + dateval.substring(0, 4);
}

function showDiv(id, divPrefix) {
    $("[id^='" + divPrefix + "']").hide();
    $("#" + id).fadeIn();
    $("#" + id).focus();
}

function closeDiv(id) {
    $("#" + id).fadeOut();
}

function blink(selector) {
    $("#" + selector).fadeOut('slow', function () {
        $(this).fadeIn('slow', function () {
        });
    });
}

function addTinyMCE(lang, title, browseURL, fieldName) {
    tinymce.init({
        selector: 'textarea.' + fieldName,
        plugins: "image,code,table,textcolor,link,preview",
        toolbar: ["undo redo | styleselect | bold italic | link image | alignleft aligncenter alignright ",
            "forecolor backcolor | code | table | visualchars | visualblocks | preview "],
        theme: 'modern',
        menubar: false,
        link_title: false,
        relative_urls: false,
        remove_script_host: false,
        language: lang, // change language here
        file_browser_callback: function (field_name, url, type, win) {
            tinymce.activeEditor.windowManager.open({
                title: title,
                url: browseURL,
                width: 800,
                height: 450
            }, {
                oninsert: function (url) {
                    win.document.getElementById(field_name).value = url;
                }
            });
        },
    });
}


function addTinyMCEById(lang, title, browseURL, fieldName) {
    tinymce.init({
        mode: "exact",
        elements: fieldName,
        plugins: "image,code,table,textcolor,link,preview",
        toolbar: ["undo redo | styleselect | bold italic | link image | alignleft aligncenter alignright ",
            "forecolor backcolor | code | table | visualchars | visualblocks | preview "],
        theme: 'modern',
        menubar: false,
        link_title: false,
        relative_urls: false,
        remove_script_host: false,
        language: lang, // change language here
        file_browser_callback: function (field_name, url, type, win) {
            tinymce.activeEditor.windowManager.open({
                title: title,
                url: browseURL,
                width: 800,
                height: 450
            }, {
                oninsert: function (url) {
                    win.document.getElementById(field_name).value = url;
                }
            });
        },
    });
}

function toHours(clockTime) {
    var p = clockTime.split(':');
    var secs = parseInt(p[0], 10) * 3600 + parseInt(p[1], 10) * 60;
    return (secs / 3600).toFixed(6);
}


function toClockTime(hours) {
    var decimal = Math.floor(hours);
    var reminder = hours % 1;
    var hourpart = "";
    if (decimal > 9)
        hourpart = "" + decimal;
    else
        hourpart = "0" + decimal;

    var minutepart = "";
    var minutes = Math.round(reminder * 60);
    if (minutes > 9)
        minutepart = "" + minutes;
    else
        minutepart = "0" + minutes;

    return hourpart + ":" + minutepart;
}

function toDays(clockTime, hourInADay) {
    var p = clockTime.split(':');
    var secsInADay = hourInADay * 3600;
    var secs = parseInt(p[0], 10) * 3600 + parseInt(p[1], 10) * 60;
    return (secs / secsInADay).toFixed(6);
}

function toSeconds(clockTime) {
    var p = clockTime.split(':');
    return parseInt(p[0], 10) * 3600 + parseInt(p[1], 10) * 60;
}

function fill(clockTime, digits) {
    clockTime = clockTime.toString();
    while (clockTime.length < digits) clockTime = '0' + clockTime;
    return clockTime;
}

function addHours() {
    var sec = 0;
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == "")
            arguments[i] == "00:00";
        sec += toSeconds(arguments[i]);
    }


    var result =
        fill(Math.floor(sec / 3600), 2) + ':' +
        fill(Math.floor(sec / 60) % 60, 2);

    return result;
}

$(function () {
    var pressed = false;
    var start = undefined;
    var startX, startWidth;

    $(".column").mousedown(function (e) {
        start = $(this);
        pressed = true;
        startX = e.pageX;
        startWidth = $(this).width();
        $(start).addClass("resizing");
    });

    $(document).mousemove(function (e) {
        if (pressed) {
            $(start).width(startWidth + (e.pageX - startX));
        }
    });

    $(document).mouseup(function () {
        if (pressed) {
            $(start).removeClass("resizing");
            pressed = false;
        }
    });
});

function getFAQ() {
    var url = "anaSayfa.ajax?cmd=getFaq&criteria=" + document.getElementById('faqSearch').value;
    $.ajax({
        type: "GET",
        url: url,
        async: false,
        success: function (data) {
            var Table = document.getElementById("Table_Faq");
            Table.innerHTML = "";
            try {
                $(data).find("row").each(function () {
                    var htmlresult = $(this).find("htmlresult").text();
                    $("#Table_Faq").append(htmlresult);
                });
            } catch (err) {
                alert(err);
            }
        },
        error: function (data) {

        }
    });
    document.getElementById('faqSearch').focus();
    moveCursorToEnd(document.getElementById('faqSearch'));
//	document.getElementById('faqSearch').focus();
//    var range = document.getElementById('faqSearch').createTextRange();
//    range.collapse(false);
//    range.select();

//	$('#faqSearch').focus();
}

function getDokuman() {
    var url = "anaSayfa.ajax?cmd=getDokuman&criteria=" + document.getElementById('dokumanSearch').value;
    $.ajax({
        type: "GET",
        url: url,
        async: false,
        success: function (data) {
            var Table = document.getElementById("Table_Dokuman");
            Table.innerHTML = "";
            try {
                $(data).find("row").each(function () {
                    var htmlresult = $(this).find("htmlresult").text();
                    $("#Table_Dokuman").append(htmlresult);
                });
            } catch (err) {
                alert(err);
            }
        },
        error: function (data) {

        }
    });
    document.getElementById('dokumanSearch').focus();
    moveCursorToEnd(document.getElementById('dokumanSearch'));
//	$('#dokumanSearch').focus();

//	var searchInput = $("#dokumanSearch");
//
//	searchInput.putCursorAtEnd().on("focus", function() {
//	    searchInput.putCursorAtEnd()
//	  });


}

function moveCursorToEnd(obj) {

    if (!(obj.updating)) {
        obj.updating = true;
        var oldValue = obj.value;
        obj.value = '';
        setTimeout(function () {
            obj.value = oldValue;
            obj.updating = false;
        }, 100);
    }

}

function addHidden(theForm, key, value) {
    // Create a hidden input element, and append it to the form:
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;'name-as-seen-at-the-server';
    input.value = value;
    theForm.appendChild(input);
}


function fSwal4DelegasyonPost(cmd,fp,url, title, text, type, showCancelButton, confirmButtonClass, button1, button2, cancelButtonClass, buttonsStyling, logConfirmMessageInfo, swalInclude)
{
    swal({
        title: title,
        text: text,
        type: type,
        showCancelButton: showCancelButton,
        confirmButtonClass: confirmButtonClass,
        confirmButtonText: button1,
        cancelButtonText: button2 ,
        cancelButtonClass: cancelButtonClass,
        buttonsStyling: buttonsStyling,
    }).then(function (result) {

        if (result.value)
        {
            logConfirmMessage(logConfirmMessageInfo);
            if(swalInclude==0){
                sendForm(cmd, fp, 0, url,'_self');
            }else{
                fSwal4Delegasyon(fp);
            }
        }
        else
        {
            return false;
        }

    });

}



function getHrnextUrl(v) {
    var url = "hrnext.ajax?cmd=hrnext";
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            var url = ($(data).find("url").text());
            url =  url.split('*').join('&');
            v.href = url;
            v.target='_blank'
        },
        error: function () {
            alert('Baðlantý sýrasýnda hata oluþtu');
        }
    });
}

function zorunluALanlariYukle(formName) {
    var print = "1";
    $.map(window.zorunlulukArray, function (el) {
        if($("#" + el.ckolons) != null && $("#" + el.ckolons).length != 0) {
            var zormsg = el.czormsg;
            var colorElement = $("#" + el.ckolons).parent();
            while (colorElement.prev().length == 0) {
                colorElement = colorElement.parent();
            }
            if(print == "1"){
                colorElement.prev().css("color", "#ed5565");
                colorElement.prev().css('font-weight', 'bold');
                if(colorElement.prev().prop("nodeName") == "DIV"){
                    print = "0";
                }
            }else{
                if(colorElement.prev().prop("nodeName") != "DIV"){
                    colorElement.prev().css("color", "#ed5565");
                    colorElement.prev().css('font-weight', 'bold');
                    print = "1";
                }
            }
            if (el.cctypes != 'DATE') {
                alan = el.ckolons;
            } else {
                alan = el.ckolons + "_inp";
            }
            $("#" + formName).validate();
            $("#" + alan).rules("add", {
                required: true, notEqual: el.cdiscrd,
                messages: {required: getMessage(zormsg), notEqual: getMessage(zormsg)}
            });
        }
    });
}
