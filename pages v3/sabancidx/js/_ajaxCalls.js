function deleteUserOnUnload() {

    $.ajax({
        type: "GET",
        url: "logoff.ajax?cmd=deleteUser"
    });

}

function getIzinSure(fp, obj, caller) {
    var url = "iznkul.ajax?cmd=surehesapla";
    url = getURL(fp, url);
    var id = 0;
    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        success: function (data) {
            obj.value = ($(data).find("value").text());
        },
        error: function () {
        },
        complete: function () {
            $(caller).show();
            clearInterval(id);
        },
        beforeSend: function () {
            $(obj).val('');
            id = setInterval(function () {
                obj.value = obj.value + '.';
            }, 500);
            $(caller).hide()
        }
    });


}

function getSecurityLevel(fp, obj, lang) {
    var url = "passwd.ajax?cmd=getSecurityLevel";
    url = getURL(fp, url);
    $.ajax({
        type: "GET",
        url: url,
        beforeSend: function () {
            if (lang == 'en_US') {
                $(obj).html('Please Wait...');
            } else {
                $(obj).html('Lütfen Bekleyiniz...');
            }
        },
        success: function (data) {
            $(obj).html($(data).find("value").text());
        },
        error: function () {
            $(obj).html('');
        }
    });

}


function getIzinBakiye(fp) {
    var url = "persic.ajax?cmd=bakiyeKnt";
    url = getURL(fp, url);
    var id = 0;
    var result = 0;
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = ($(data).find("returnItem").text() * 1);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function loadDecodeDataFiltered(combo, cdectab, cdecacy) {
    var url = "decode.ajax?cmd=loadDecodeData&cdectab=" + cdectab + "&cdecacy=" + cdecacy;

    $("#cilikod").val("-1").change();

    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        success: function (data) {
            try {

                $(data).find("row").each(function () {
                    var key = $(this).find("key").text();
                    var value = $(this).find("value").text();
                    combo.options[combo.options.length] = new Option(value, key);
                });
            } catch (err) {
                alert(err);
            }
            //result =($(data).find("returnItem").text()*1);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
            combo.options.length = 0;
            combo.options[combo.options.length] = new Option(getMessage("M1193"), "-1");
        }
    });
}

function loadDecodeData(combo, cdectab) {
    loadDecodeDataFiltered(combo, cdectab, "");
}


function loadGenelDilSeviyeleri(combo, csnvsnc) {
    var url = "gnldils.ajax?cmd=loadGenelDilSeviyeleri&csnvsnc=" + csnvsnc.value;
    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        success: function (data) {
            try {
                $(data).find("row").each(function () {
                    var key = $(this).find("key").text();
                    var value = $(this).find("value").text();
                    $("select option[value='" + key + "']").attr("selected", "selected");

                });
            } catch (err) {
                alert(err);
            }
            //result =($(data).find("returnItem").text()*1);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });
}

function loadOrganizasyonKademe(divid, corgkod) {
    var corgkodtxt = corgkod.value;
    if (corgkodtxt.indexOf("|") >= 0)
        corgkodtxt = corgkodtxt.substring(0, corgkodtxt.indexOf("|"));
    var url = "orgtab.ajax?cmd=loadOrganizasyonKademe&corgkod=" + corgkodtxt;
    var datavarmi = false;
    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        success: function (data) {
            try {
                $('#' + divid).html('');
                var html = '<ul>';
                $(data).find("row").each(function () {
                    datavarmi = true;
                    var key = $(this).find("key").text();
                    var value = $(this).find("value").text();
                    html += '<li>' + value + '</li>';
                });
                html += '</ul>';
                $('#' + divid).html(html);

            } catch (err) {
                alert(err);
            }
            //result =($(data).find("returnItem").text()*1);
        },
        error: function () {
        },
        complete: function () {
            if (datavarmi) {
                $('#' + divid).slideDown();
            }
        },
        beforeSend: function () {
            $('#' + divid).slideUp();
        }
    });
}

function loadOrganizasyonForMultipleIsyeri(objsel, aut_status, cisyorg) {
    var temp_isy = cisyorg;
    if (typeof(temp_isy) == "undefined")
        temp_isy = "";

    var url = "orgtab.ajax?cmd=" + aut_status + "&cisyorg=" + temp_isy;
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: true,
        url: url,
        success: function (data) {
            try {
                $(data).find("item").each(function () {
                    var key = $(this).find("key").text();
                    var value = $(this).find("value").text();
                    objsel[objsel.options.length] = new Option(value, key);
                });
            } catch (err) {
                alert(err);
            }
        },
        error: function () {
        },
        complete: function () {
            $(objsel).multiselect("refresh");

        },
        beforeSend: function () {
            objsel.options.length = 0;
        }
    });
}

function loadServisDurakDate(combo, csrvkod) {

    var url = "servis.ajax?cmd=loadServisDurakData&csrvkod=" + csrvkod.value;

    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        success: function (data) {
            try {
                combo.options[combo.options.length] = new Option(getMessage("M1193"), "-1");
                $(data).find("row").each(function () {
                    var key = $(this).find("key").text();
                    var value = $(this).find("value").text();
                    combo.options[combo.options.length] = new Option(value, key);
                });
            } catch (err) {
                alert(err);
            }
            //result =($(data).find("returnItem").text()*1);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
            combo.options.length = 0;
        }
    });
}

function loadKadroGrubu(kadro, sirprmReadOnly) {

    var url = "kadtab.ajax?cmd=loadKadroGrubu&ckadkod=" + kadro;

    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        success: function (XML) {
            try {
                var key = $(XML).find("key").text();
                if (key != '' && sirprmReadOnly == 'H') {
                    document.getElementById("cpozkod").value = key;

                    var img_id = 'imgcpozkod';
                    var img = document.getElementById(img_id); // elle secilebilir ise nulldan farkli olcek
                    if (img != null) {
                        $("#cpozkod").combobox('destroy');
                        $("#cpozkod").combobox();
                    }
                }
            } catch (ex) {
            }
        },
        error: function () {
        }
    });
}

function loadKadroUstGrubu(kadro, sirprmReadOnly) {

    var url = "kadtab.ajax?cmd=loadKadroUstGrubu&ckadkod=" + kadro;

    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        success: function (XML) {
            try {
                var key = $(XML).find("key").text();
                var value = $(XML).find("value").text();
                if (key != '' && sirprmReadOnly == 'H') {
                    document.getElementById("ckusgrp").value = key;

                    var img_id = 'imgckusgrp';
                    var img = document.getElementById(img_id); // elle secilebilir ise nulldan farkli olcek
                    if (img != null) {
                        $("#ckusgrp").combobox('destroy');
                        $("#ckusgrp").combobox();
                    }
                }
            } catch (ex) {
            }
        },
        error: function () {
        }
    });
}

function loadDecodeSuggestData(decodeId, groupCode, listCount, sirkod, filterByCdecacy, afterSelectFunctionOnSuccess) {
    var decacyval = "";
    if (filterByCdecacy != "")
        decacyval = $("#" + filterByCdecacy).val();


    $.ajax({
        type: "GET",
        url: "decode.ajax",
        data: {
            listCount: listCount, csirkod: sirkod, searchkey: $("#" + decodeId).val().turkishToUpper(),
            cmd: 'searchDecode', cdectab: groupCode, cdecacy: decacyval
        },
        dataType: "xml",
        success: function (xml) {
            callbackDecodeSuggest(xml, decodeId, afterSelectFunctionOnSuccess);
        },
        contentType: 'text/html;charset=utf-8',
        beforeSend: function (req) {
            $("#" + decodeId).addClass('loadingTextBox');
            $("#" + decodeId).val($("#" + decodeId).val().turkishToUpper())
        },
        complete: function (req, status) {
            $("#" + decodeId).removeClass('loadingTextBox');
        }
    });
}

function callbackDecodeSuggest(xmlDocument, decodeId, afterSelectFunctionOnSuccess) {
    var opts = [];
    $(xmlDocument).find('returnItem').each(
        function () {
            opts.push($(this).text());
        }
    );

    $("#" + decodeId).autocomplete({
        source: opts,
        selectFirst: false,
        noCache: true,
        scroll: true,
        scrollHeight: 220,
        close: function (event, ui) {
            var val = $(this).val();
            var cdecaln = val.substring(0, val.indexOf(' - ')).trim();
            var firstIndex = 0;
            if (val.indexOf(' - ') > -1)
                firstIndex = val.indexOf(' - ') + 3;
            var cdecact = val.substring(firstIndex, val.length).trim();

            var decodeOrjId = decodeId.substring(4);
            $("#" + decodeOrjId).val(cdecaln);
            $(this).val(cdecact);

            if (afterSelectFunctionOnSuccess != "") {
                window[afterSelectFunctionOnSuccess]();
            }

        }
    });
}

function getBakiyeByIznNedeniAjax(fp, kosul) {

    var url = "iznkul.ajax?cmd=getbakiyebyneden&kosul=" + kosul;
    url = getURL(fp, url);
    var result = [];
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            $(data).find('item').each(function () {
                result.push($(this).find('value').text());
            });
            //result =($(data).find("value").text()*1);
        },
        error: function () {
        }
    });

    return result;
}

function isExistKisakdAjax(fp, ckisakd) {

    var result = "false";

    var url = "persic.ajax?cmd=isExistKisakd&ckisakdvalue=" + ckisakd;
    url = getURL(fp, url);

    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = ($(data).find("value").text());
        },
        error: function () {
        }
    });

    return result;
}

function decodePasifOlabilirMi(fp) {

    var result = "true";
    var url = "decode.ajax?cmd=pasifolabilirmi";
    url = getURL(fp, url);

    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = ($(data).find("value").text());
        },
        error: function () {
        }
    });

    return result;
}

function getFazmesTutarByTabhesAjax(fp) {

    var url = "wfazmf.ajax?cmd=getfazmesbytabhes";
    url = getURL(fp, url);
    var result = [];
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            $(data).find('item').each(function () {
                result.push($(this).find('value').text());
            });
        },
        error: function () {
        }
    });

    return result;
}

function getSrbzmnBakiye(fp) {
    var url = "persic.ajax?cmd=getSrbzmnBakiye";
    url = getURL(fp, url);
    var result = 0;
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = ($(data).find("returnItem").text() * 1);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function getHizmetSuresi(fp) {
    var url = "perkit.ajax?cmd=hizmetSuresiHesapla";
    url = getURL(fp, url);
    var result1 = 0;
    var result2 = 0;
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result1 = $(data).find("returnItem1").text();
            result2 = $(data).find("returnItem2").text();
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result1 + "|" + result2;
}

function getUrlForKariyer(fp, tabNum, linecount) {
    var url = "";

    if (tabNum == "1")
        url = "nitkat.ajax?cmd=getUrlForNitkat&linecount=" + linecount;
    else if (tabNum == "2")
        url = "perfrm.ajax?cmd=getUrlForPerdon&linecount=" + linecount;
    else if (tabNum == "3")
        url = "egtkat.ajax?cmd=getUrlForEgtkat&linecount=" + linecount;
    else if (tabNum == "5")
        url = "decode.ajax?cmd=getUrlForYbncdl&linecount=" + linecount;
    else if (tabNum == "6")
        url = "nitkat.ajax?cmd=getUrlForNitkat2&linecount=" + linecount;
    else if (tabNum == "7")
        url = "decode.ajax?cmd=getUrlForKariyerGereksinim&linecount=" + linecount;
    else if (tabNum == "8")
        url = "nitkat.ajax?cmd=getUrlForNitkatKariyerGereksinim&linecount=" + linecount;

    else
        return "0";

    var result = "0";
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = ($(data).find("returnItem").text());
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function getUrlEgtKat(fp, linecount, ckatyil, formName) {
    var url = "egtkat.ajax?cmd=getUrlForEgtkat&linecount=" + linecount + "&ckatyil=" + ckatyil + "&formName=" + formName;

    var result = "0";
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = ($(data).find("returnItem").text());
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function getUrlForBeceri(fp, linecount, formName, cmd) {
    var url = "polivalans.ajax?cmd=" + cmd + "&linecount=" + linecount + "&formName=" + formName;

    var result = "0";
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = ($(data).find("returnItem").text());
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function getEncryptedUrl(link) {
    var url = "common.ajax?cmd=getEncryptedUrl&url=" + link;
    var result = "0";
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = ($(data).find("returnItem").text());
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function getEncryptedUrlWithParameters(link) {
    var url = "common.ajax?cmd=getEncryptedUrlWithParameters&url=" + link;
    var result = "0";
    $.ajax({
        type: "GET",
        dataType: "xml",
        contentType: 'xml; charset=utf-8',
        async: false,
        url: url,
        success: function (data) {
            result = ($(data).find("returnItem").text());
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}


function getConfigItemsForDerece() {
    var url = "common.ajax?cmd=getConfigItemsForDerece";

    var result = "0";
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = ($(data).find("returnItem").text());
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function getHizmetSuresi2(fp, cbastar, ccikist) {
    var url = "perkit.ajax?cmd=getHizmetSuresi2&cbastar=" + cbastar + "&ccikist=" + ccikist;
    url = getURL(fp, url);
    var result1 = 0;
    var result2 = 0;
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result1 = $(data).find("returnItem1").text();
            result2 = $(data).find("returnItem2").text();
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result1 + "|" + result2;
}

function getEbildirgeKayitKontrol(fp) {
    var url = "brrapor.ajax?cmd=findSskgecAylikHizmet";
    url = getURL(fp, url);
    var result = "0";
    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        async: false,
        beforeSend: function () {
        },
        success: function (data) {
            result = $(data).find("returnItem").text();
        },
        error: function () {
        }
    });
    return result;
}

function kaynaktaKayitVarMi(fp) {
    var url = "isydig.ajax?cmd=kaynaktaKayitVarMi";
    url = getURL(fp, url);
    var result = "false";
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = $(data).find("returnItem").text();
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function isExistsCorgkod(fp) {
    var url = "orgtab.ajax?cmd=isExistsCorgkod&corgkodyeni=" + trim(fp.corgkody.value);
    url = getURL(fp, url);
    var result = "false";
    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = $(data).find("returnItem").text();
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function loadAileSeviye(combo, cisaile) {
    var url = "seviye.ajax?cmd=loadIsAileSeviyeData&cisaile=" + cisaile.value;

    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        success: function (data) {
            try {
                combo.options[combo.options.length] = new Option(getMessage("M1193"), "-1");
                $(data).find("row").each(function () {
                    var key = $(this).find("key").text();
                    var value = $(this).find("value").text();
                    combo.options[combo.options.length] = new Option(value, key);
                });
            } catch (err) {
                alert(err);
            }
            //result =($(data).find("returnItem").text()*1);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
            combo.options.length = 0;
        }
    });
}

function loadYetkinlikSeviye(combo, cnitkod) {
    var url = "yetsev.ajax?cmd=loadYetkinlikSeviyeData&cnitkod=" + cnitkod.value;

    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        success: function (data) {
            try {
                combo.options[combo.options.length] = new Option(getMessage("M1193"), "-1");
                $(data).find("row").each(function () {
                    var key = $(this).find("key").text();
                    var value = $(this).find("value").text();
                    combo.options[combo.options.length] = new Option(value, key);
                });
            } catch (err) {
                alert(err);
            }
            //result =($(data).find("returnItem").text()*1);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
            combo.options.length = 0;
        }
    });
}


function loadSPPData(combo, sourceType, csourc1, csourc2, csourc3, csourc4, cyilkod) {
    var url = "sppent.ajax?cmd=loadSPPData&sourceType=" + sourceType + "&csourc1=" + escape(csourc1) + "&csourc2=" + escape(csourc2) + "&csourc3=" + escape(csourc3) + "&csourc4=" + escape(csourc4) + "&cyilkod=" + escape(cyilkod);

    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        async: false,
        success: function (data) {
            try {

                $(data).find("row").each(function () {
                    var key = $(this).find("key").text();
                    var value = $(this).find("value").text();
                    combo.options[combo.options.length] = new Option(value, key);
                });
            } catch (err) {
                alert(err);
            }
            //result =($(data).find("returnItem").text()*1);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
            combo.options.length = 0;
            combo.options[combo.options.length] = new Option(getMessage("M1193"), "-1");
        }
    });
}


function getSppData(_csppent, _cyilkod) {
    var url = "sppent.ajax?cmd=getSPPData&_csppent=" + _csppent + "&_cyilkod=" + _cyilkod;
    var retval = "";
    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        async: false,
        success: function (data) {
            try {
                $(data).find("row").each(function () {
                    var csourc1 = $(this).find("csourc1").text();
                    var csourc2 = $(this).find("csourc2").text();
                    var csourc3 = $(this).find("csourc3").text();
                    var csourc4 = $(this).find("csourc4").text();
                    var cprogrs = $(this).find("cprogrs").text();
                    retval = csourc1 + "|" + csourc2 + "|" + csourc3 + "|" + csourc4 + "|" + cprogrs;
                });
            } catch (err) {
                alert(err);
            }
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });
    return retval;
}


function loadAltZimmetTipi(combo, czimtip, all, selected) {
    var url = "zimmet.ajax?cmd=loadAltZimmetTipiData&czimtip=" + czimtip.value;

    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        success: function (data) {
            try {
                if (all) {
                    combo.options[combo.options.length] = new Option(getMessage("M1623"), "@all");
                } else {
                    combo.options[combo.options.length] = new Option(getMessage("M1193"), "@all");
                }
                $(data).find("row").each(function () {
                    var key = $(this).find("key").text();
                    var value = $(this).find("value").text();
                    if (selected == key)
                        combo.options[combo.options.length] = new Option(value, key, true, true);
                    else
                        combo.options[combo.options.length] = new Option(value, key);
                });
            } catch (err) {
                alert(err);
            }
            //result =($(data).find("returnItem").text()*1);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
            combo.options.length = 0;
        }
    });
}

function loadSeriNoMarkaZimmet(combo, czimtip, cazimtp, all, selected) {
    var url = "perzim.ajax?cmd=loadSeriNoMarkaZimmetData&czimtip=" + czimtip.value + "&cazimtp=" + cazimtp.value;

    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        success: function (data) {
            try {
                if (all) {
                    combo.options[combo.options.length] = new Option(getMessage("M1623"), "@all");
                } else {
                    combo.options[combo.options.length] = new Option(getMessage("M1193"), "@all");
                }
                $(data).find("row").each(function () {
                    var key = $(this).find("key").text();
                    var value = $(this).find("value").text();
                    if (selected == key)
                        combo.options[combo.options.length] = new Option(value, key, true, true);
                    else
                        combo.options[combo.options.length] = new Option(value, key);
                });
            } catch (err) {
                alert(err);
            }
            //result =($(data).find("returnItem").text()*1);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
            combo.options.length = 0;
        }
    });
}

function fillCarcmarByCarckat(fp) {
    var url = "sirarc.ajax?cmd=fillCarcmarByCarckat";
    url = getURL(fp, url);

    var result = "true";

    clearAllField(1);
    if (fp.carckat.value == "-1")
        return;

    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            parseAllData(data, fp);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function fillCarcmodByCarcmar(fp) {
    var url = "sirarc.ajax?cmd=fillCarcmodByCarcmar";
    url = getURL(fp, url);

    var result = "true";

    clearAllField(2);
    if (fp.carcmar.value == "-1")
        return;

    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            parseAllData(data, fp);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function fillCplakanByCarcmod(fp) {
    var url = "sirarc.ajax?cmd=fillCplakanByCarcmod";
    url = getURL(fp, url);

    var result = "true";

    clearAllField(3);
    if (fp.carcmod.value == "-1")
        return;

    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            parseAllData(data, fp);
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function fillFieldsByCplakan(fp) {
    var url = "sirarc.ajax?cmd=fillFieldsByCplakan";
    url = getURL(fp, url);

    var result = "true";

    if (fp.cplakan.value == "-1") {
        clearAllField(4);
        return;
    }

    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            try {
                setAllFields(data, fp);
            } catch (err) {
                alert(err);
            }
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function parseAllData(data, fp) {
    try {
        fillAllCombos(data, fp);
        setAllFields(data, fp);
    } catch (err) {
        alert(err);
    }
}

function fillAllCombos(data, fp) {
    $(data).find("combocarcmar").each(function () {
        var combo = fp.carcmar;
        var key = $(this).find("key").text();
        var value = $(this).find("value").text();
        var varmi = isValueExist(combo, key);
        if (varmi == -1)
            combo.options[combo.options.length] = new Option(value, key);
    });
    $(data).find("combocarcmod").each(function () {
        var combo = fp.carcmod;
        var key = $(this).find("key").text();
        var value = $(this).find("value").text();
        var varmi = isValueExist(combo, key);
        if (varmi == -1)
            combo.options[combo.options.length] = new Option(value, key);
    });
    $(data).find("combocplakan").each(function () {
        var combo = fp.cplakan;
        var key = $(this).find("key").text();
        var value = $(this).find("value").text();
        var varmi = isValueExist(combo, key);
        if (varmi == -1)
            combo.options[combo.options.length] = new Option(value, key);
    });
}

function setAllFields(data, fp) {
    $(data).find("sirarcValue").each(function () {
        $("#csirano").val($(this).find("csirano").text());

        document.getElementById("carcmar").value = $(this).find("carcmar").text();
        document.getElementById("carcmod").value = $(this).find("carcmod").text();

        document.getElementById("cplakan").value = $(this).find("cplakan").text();
        $("#carccin").text($(this).find("carccin").text());
        $("#cmodyil").text($(this).find("cmodyil").text());

        $("#cyaktur").text($(this).find("cyaktur").text());
        $("#csasino").text($(this).find("csasino").text());
        $("#cmotorn").text($(this).find("cmotorn").text());

        $("#carackm").text($(this).find("carackm").text());
        $("#ctrfpol").text($(this).find("ctrfpol").text());
        $("#cmuatar").text($(this).find("cmuatar").text());

        $("#carctestar").text($(this).find("ctestar").text());
        $("#clastar").text($(this).find("clastar").text());
        $("#csigbit").text($(this).find("csigbit").text());

        $("#ckirfir").text($(this).find("ckirfir").text());
        $("#ckirbas").text($(this).find("ckirbas").text());
        $("#ckirbit").text($(this).find("ckirbit").text());
    });
}

function isExistPerarc(fp) {
    var url = "persic.ajax?cmd=isExistPerarc";
    url = getURL(fp, url);

    var result = "false";

    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = $(data).find("returnItem").text();
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });
    return result;
}

function isExistPerzim(fp) {
    var url = "persic.ajax?cmd=isExistPerzim";
    url = getURL(fp, url);

    var result = "false";

    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = $(data).find("returnItem").text();
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });
    return result;
}

function executeKadynh(cmd, cyanhak, ckadkod) {
    var url = "kadynh.ajax?cmd=" + cmd + "&cyanhak=" + cyanhak + "&ckadkod=" + ckadkod;

    var result = "false";

    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = $(data).find("returnItem").text();
        },
        error: function (err) {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });
    return result;
}

function executePerynh(cmd, crefers, ckadkod, cyanhak, ckaynak) {
    var url = "perynh.ajax?cmd=" + cmd + "&crefers=" + crefers + "&ckadkod="
        + ckadkod + "&cyanhak=" + cyanhak + "&ckaynak=" + ckaynak;

    var result = "false";

    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = $(data).find("returnItem").text();
        },
        error: function (err) {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });
    return result;
}

function seyahatLimitKontrol(fp) {
    var url = "syhbas.ajax?cmd=checkSyhlim";
    url = getURL(fp, url);

    var result = "FALSE";

    $.ajax({
        type: "GET",
        dataType: "xml",
        async: false,
        url: url,
        success: function (data) {
            result = $(data).find("returnItem").text();
        },
        error: function () {
            result = "ERR";
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });

    return result;
}

function callProgress(cyilkod, csppent) {
    var url = "sppent.ajax?cmd=getSPPDataProgress&csppent=" + csppent + "&cyilkod=" + cyilkod;
    var retval = "";
    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        async: false,
        success: function (data) {
            try {
                $(data).find("row").each(function () {
                    var cprogrs = $(this).find("progress").text();
                    retval = cprogrs;
                });
            } catch (err) {
                alert(err);
            }
        },
        error: function () {
        },
        complete: function () {
        },
        beforeSend: function () {
        }
    });
    return retval;
}

function raporluGunHesapla(fp, obj, caller) {
    var url = "iznkul.ajax?cmd=raporluGunHesapla";
    url = getURL(fp, url);
    var id = 0;
    $.ajax({
        type: "GET",
        dataType: "xml",
        url: url,
        success: function (data) {
            obj.value = ($(data).find("value").text());
        },
        error: function () {
        },
        complete: function () {
            $(caller).show();
            clearInterval(id);
        },
        beforeSend: function () {
            $(obj).val('');
            id = setInterval(function () {
                obj.value = obj.value + '.';
            }, 500);
            $(caller).hide()
        }
    });

}
