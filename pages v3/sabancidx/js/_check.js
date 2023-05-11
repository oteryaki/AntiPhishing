function openBrWindow(theURL, winName, features) {
    window.open(theURL, winName, features);
}

// ************************************************************************************/
// sadece verilen newStrCheck'in içinde bulunan karakterlerin yazýlmasýna izin verir.
function numberFormat(fld, e, newStrCheck) {
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = newStrCheck;
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return true;  // Enter
    key = String.fromCharCode(whichCode);  // Anahtar deðeri anahtar koddan al
    if (strCheck.indexOf(key) == -1) return false;  // Yanlýþ deðer
}

// ************************************************************************************/
// sadece verilen newStrCheck'in içinde bulunan karakterlerin yazýlmasýna izin verir.
function controlCode(fld, event) {
//var newStrCheck ="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-_:/\\";
    var newStrCheck = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-_@!?\"$%'()*+,-:;[]^_`{}|~£#";
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = newStrCheck;
    var aux = aux2 = '';
    var whichCode = (event.which) ? event.which : event.keyCode;

    if (whichCode == 13) return true;  // Enter
    if (whichCode == 8) return true;  // Enter
    if (whichCode == 9) return true;  // Tab
    key = String.fromCharCode(whichCode);  // Anahtar deðeri anahtar koddan al
    if (strCheck.indexOf(key) == -1) return false;  // Yanlýþ deðer
}

// ************************************************************************************/
// sadece verilen newStrCheck'in içinde bulunan karakterlerin yazýlmasýna izin verir.
function alfaNumerikFormat(fld, e) {
    var newStrCheck = "0123456789abcçdefgðhýijklmnoöpqrsþtuüvwxyzABCÇDEFGÐHIÝJKLMNOÖPRSÞTUÜVWXYZ";
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = newStrCheck;
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return true;  // Enter
    key = String.fromCharCode(whichCode);  // Anahtar deðeri anahtar koddan al
    if (strCheck.indexOf(key) == -1) return false;  // Yanlýþ deðer
}

// ************************************************************************************/
// GIVES THE INDEX OF SELECTED RADIO CHOSE, -1 in no one selected.
function stateChecker(radioItem) {
    var j = -1;
    var len = typeof(radioItem.length);
    if (len == "undefined") {
        if (radioItem.checked) {
            j = 1;
        }
    }
    else {
        for (var i = 0; i < radioItem.length; i++) {
            if (radioItem[i].checked == "1") {
                j = i;
            }
        }
    }
    return j
}

//************************************************************************************/
// GIVES THE value  OF SELECTED RADIO CHOSE, null in no one selected.
function getRadioValue(radioItem) {
    var len = typeof(radioItem.length);
    if (len == "undefined") {
        if (radioItem.checked) {
            return radioItem.value;
        }
    }
    else {
        for (var i = 0; i < radioItem.length; i++) {
            if (radioItem[i].checked == "1") {
                return radioItem[i].value;
            }
        }
    }
    return null;
}

//****************************************************************************************/
function isNoTurkishChar(field) {
    var invalid = "\u011f\u011e\u0131\u0130\u015f\u015eçÇöÖüÜ";
    var ok = true;
    var temp;
    for (var i = 0; i < field.value.length; i++) {
        temp = "" + field.value.substring(i, i + 1);
        if (invalid.indexOf(temp) != "-1") {
            ok = false;
            return ok;
        }
    }
    return ok;
}

//****************************************************************************************/
function isDigit(c) {
    var retVal = false;
    if ((c >= '0') && (c <= '9'))
        retVal = true;
    return retVal;
}

//****************************************************************************************/
function isCharNew(c) {
    var retVal = false;
    if ((c >= 'a') && (c <= 'z'))
        retVal = true;
    if ((c >= 'A') && (c <= 'Z'))
        retVal = true;
    return retVal;
}

//****************************************************************************************/
function isAllDigit(s) {
    var retVal = false;
    for (var i = 0; i < s.length; i++)
        if (isDigit(s.charAt(i)))
            retVal = true;
        else {
            retVal = false;
            break;
        }
    return retVal;
}

//general purpose function to see if a suspected numeric input
//is a positive or negative number
function isNumber(inputVal) {
    oneDecimal = false;
    inputStr = inputVal.toString();
    if (inputStr == '-')
        return false;
    for (var i = 0; i < inputStr.length; i++) {
        var oneChar = inputStr.charAt(i)
        if (i == 0 && oneChar == "-") {
            continue;
        }
        if (oneChar == "." && !oneDecimal) {
            oneDecimal = true;
            continue;
        }

        if (oneChar == "." && oneDecimal) {
            return false;
        }

        if (oneChar < "0" || oneChar > "9") {
            return false;
        }
    }
    return true;
}

//****************************************************************************************/
//separator opsiyonel decimal sayýlar için, fieldLength=0 ise girilen rakamýn fix bir boyu yok demektir.
function isValidNumber(fieldValue, fieldLength, separator) {
    var inLen = fieldValue.length;
    var i;
    var ch;
    var decimalLen = 0;
    var retVal = true;
    if (ch != '') {
        for (i = 0; i < inLen; i++) {
            ch = fieldValue.substring(i, i + 1);
            if (ch == separator) {
                decimalLen = inLen - i - 1;
            }
            else {
                if (isDigit(ch))
                    retVal = true;
                else {
                    retVal = false;
                    break;
                }
            }
        }// for
    } // end if
    if ((fieldLength != 0) && (inLen != fieldLength)) {
        retVal = false;
    }
    if ((decimalLen != 0) && (decimalLen > 2)) {
        retVal = false;
    }
    return retVal;
} // isValidNumber

//****************************************************************************************/
//ilk tarihin son tarihen kücük olmasýný saðlýyor ...
function compareDate(year1, month1, day1, year2, month2, day2) {
    var date1 = new Date(year1, month1, day1);
    var date2 = new Date(year2, month2, day2);
    var datediff = date1 - date2;
    if (datediff < 0) {
        return false;
    }
    return true;
}

//****************************************************************************************/
function placeFocus() {
    if (document.forms.length > 0) {
        var field = document.forms[0];
        for (i = 0; i < field.length; i++) {
            if ((field.elements[i].type == "text") || (field.elements[i].type == "textarea") || (field.elements[i].type.toString().charAt(0) == "s")) {
                document.forms[0].elements[i].focus();
                break;
            }
        }
    }
}

//****************************************************************************************/
function isChar(field) {
    var valid = "abcçdefgðhýijklmnoöpqrsþtuüvwxyz"
    var ok = "dogru";
    var temp;
    for (var i = 0; i < field.value.length; i++) {
        temp = "" + field.value.substring(i, i + 1);
        if (valid.indexOf(temp) == "-1") ok = "yanlýs";
    }
    if (ok == "yanlýs") {
        alert("Gecersiz!");
        field.focus();
        field.select();
    }
}

//*********************************************************************************************/
function dateValid(objName) {
    var strDate;
    var strDateArray;
    var strDay;
    var strMonth;
    var strYear;
    var intday;
    var intMonth;
    var intYear;
    var booFound = false;
    var datefield = objName;
    var strSeparatorArray = new Array("-", " ", "/", ".");
    var intElementNr;
// var err = 0;

    strDate = objName;
    if (strDate.length < 1) {
        return true;
    }

    if (strDate.length != 10) {
        return false;
    }

    for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
        if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
            strDateArray = strDate.split(strSeparatorArray[intElementNr]);
            if (strDateArray.length != 3) {
                err = 1;
                return false;
            }
            else {
                strYear = strDateArray[0];
                strMonth = strDateArray[1];
                strDay = strDateArray[2];
            }
            booFound = true;
        }
    }
    if (booFound == false) {
        if (strDate.length > 5) {
            strDay = strDate.substr(0, 2);
            strMonth = strDate.substr(2, 2);
            trYear = strDate.substr(4);
        }
    }
    if (strYear.length == 2) {
        strYear = '20' + strYear;
    }

    intday = parseInt(strDay, 10);
    if (isNaN(intday)) {
        err = 2;
        return false;
    }
    intMonth = parseInt(strMonth, 10);
    if (isNaN(intMonth)) {
        err = 3;
        return false;
    }

    intYear = parseInt(strYear, 10);
    if (isNaN(intYear)) {
        err = 4;
        return false;
    }

    if (intYear < 1900) {
        err = 4;
        return false;
    }

    if (intMonth > 12 || intMonth < 1) {
        err = 5;
        return false;
    }
    if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
        err = 6;
        return false;
    }
    if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
        err = 7;
        return false;
    }
    if (intMonth == 2) {
        if (intday < 1) {
            err = 8;
            return false;
        }
        if (LeapYear(intYear) == true) {
            if (intday > 29) {
                err = 9;
                return false;
            }
        }
        else {
            if (intday > 28) {
                err = 10;
                return false;
            }
        }
    }
    return true;
}

//*******************************
// Check an email address
function checkEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

//***********

function ibanno_kontrol(text) {
    var temp = text;
    var index = text.indexOf(" ");
    while (index != -1) {
        text = text.replace(" ", "");
        index = text.indexOf(" ");
    }
    if ((text != "") && (text.length != 26))
        return false;
    return true;
}

//**********************************************************************************************/

function LeapYear(intYear) {
    if (intYear % 100 == 0) {
        if (intYear % 400 == 0) {
            return true;
        }
    }
    else {
        if ((intYear % 4) == 0) {
            return true;
        }
    }
    return false;
}


// ********** Check phone and fax numbers
function CheckField(field) {
    for (var i = 0; i < field.value.length; i++) {
        var ch = field.value.substring(i, i + 1);
        if ((ch < "0" || ch > "9") && ch != " ") {
            return false;
        }
    }
    return true;
}

// ********** Check alpha-numeric numbers
function CheckFieldAlpNum(field) {
    for (var i = 0; i < field.value.length; i++) {
        var ch = field.value.substring(i, i + 1);
        if ((ch >= "0" && ch <= "9") || (ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")) {
            return true;
        }
    }
    return false;
}

/*** Count Length without space ***/
function CountLength(field) {
    var count = 0;
    for (var i = 0; i < field.value.length; i++) {
        var ch = field.value.substring(i, i + 1);
//alert ('i='+i);
        if (ch != " ") {
            count++;
        }
    }
//alert ('c='+ count);
    return count;
}

// **************** Functions for blank filed checking
function isBlank(s) {
    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if ((c != ' ') && (c != '\n') && (c != '\t')) return false;
    }
    return true;
}

//****************************************************************************************/
//extractChar newChar value form the given fieldValue
function extractChar(fieldValue, newChar) {
    var inLen = fieldValue.length;
    var i;
    var ch;
    var resultStr = "";
    for (i = 0; i < inLen; i++) {
        ch = fieldValue.substring(i, i + 1);
        if (ch != newChar) {
            resultStr = resultStr + ch
        }
    }// for
    return resultStr;
} // isValidNumber

// ************************************************************************************/

function numberCheck(e) {
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '-0123456789.';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return true;  // Enter
    key = String.fromCharCode(whichCode);  // Anahtar deðeri anahtar koddan al
    if (strCheck.indexOf(key) == -1) return false;  // Yanlýþ deðer
    else return true;
}


function convertToSQLDate(strDate) {

    var str = strDate;
    var month = 0;
    var day = 0;
    var year = 0;
    var retVal = "";


    if (str.length >= 8 && str.length <= 10) {

        // dd.mm.yyyy format
        if (str.charAt(2) == "." && str.charAt(5) == "." && str.length == 10) {
            day = eval(str.substring(0, 2));
            month = eval(str.substring(3, 5));
            year = eval(str.substring(6, str.length));

        }

        // d.mm.yyyy format
        if (str.charAt(1) == "." && str.charAt(4) == "." && str.length == 9) {
            day = eval(str.substring(0, 1));
            month = eval(str.substring(2, 4));
            year = eval(str.substring(5, str.length));

        }

        // dd.m.yyyy format
        if (str.charAt(2) == "." && str.charAt(4) == "." && str.length == 9) {
            day = eval(str.substring(0, 2));
            month = eval(str.substring(3, 4));
            year = eval(str.substring(5, str.length));

        }

        // d.m.yyyy format
        if (str.charAt(1) == "." && str.charAt(3) == "." && str.length == 8) {
            day = eval(str.substring(0, 1));
            month = eval(str.substring(2, 3));
            year = eval(str.substring(4, str.length));

        }
    }

    retVal = "" + year + "-" + ((month < 10) ? "0" + month : month) + "-" + ((day < 10) ? "0" + day : day)
    return retVal;

}


function dateValid2(strDate) {
    var str = strDate;
    var format = 0;
    var month = 0;
    var day = 0;
    var year = 0;
    var err = false;

    if (str.length < 8 || str.length > 10)
        err = true;

    if (str.length >= 8 && str.length <= 10) {
        // dd.mm/yyyy format
        if (str.charAt(2) == "." && str.charAt(5) == "." && str.length == 10) {
            format = 1;
            // Check that month is a number.
            for (var i = 0; i < 2; i++) {
                var ch = str.substring(i, i + 1);
                if (ch < "0" || "9" < ch) err = true;
            }
            // Check that day is a number.
            for (var i = 3; i < 5; i++) {
                var ch = str.substring(i, i + 1);
                if (ch < "0" || "9" < ch) err = true;
            }
            // Check that year is a number.
            for (var i = 6; i < 10; i++) {
                var ch = str.substring(i, i + 1);
                if (ch < "0" || "9" < ch) err = true;
            }
            // Set variables
            if (err == false) {
                day = eval(str.substring(0, 2));
                month = eval(str.substring(3, 5));
                year = eval(str.substring(6, str.length));
            }
        }

        // d.mm.yyyy format
        if (str.charAt(1) == "." && str.charAt(4) == "." && str.length == 9) {
            format = 2;
            // Check that month is a number.
            for (var i = 0; i < 1; i++) {
                var ch = str.substring(i, i + 1);
                if (ch < "0" || "9" < ch) err = true;
            }
            // Check that day is a number.
            for (var i = 2; i < 4; i++) {
                var ch = str.substring(i, i + 1);
                if (ch < "0" || "9" < ch) err = true;
            }
            // Check that year is a number.
            for (var i = 5; i < 9; i++) {
                var ch = str.substring(i, i + 1);
                if (ch < "0" || "9" < ch) err = true;
            }
            // Set variables
            if (err == false) {
                day = eval(str.substring(0, 1));
                month = eval(str.substring(2, 4));
                year = eval(str.substring(5, str.length));
            }
        }

        // dd.m.yyyy format
        if (str.charAt(2) == "." && str.charAt(4) == "." && str.length == 9) {
            format = 3;
            // Check that month is a number.
            for (var i = 0; i < 2; i++) {
                var ch = str.substring(i, i + 1);
                if (ch < "0" || "9" < ch) err = true;
            }
            // Check that day is a number.
            for (var i = 3; i < 4; i++) {
                var ch = str.substring(i, i + 1);
                if (ch < "0" || "9" < ch) err = true;
            }
            // Check that year is a number.
            for (var i = 5; i < 9; i++) {
                var ch = str.substring(i, i + 1);
                if (ch < "0" || "9" < ch) err = true;
            }
            // Set variables
            if (err == false) {
                day = eval(str.substring(0, 2));
                month = eval(str.substring(3, 4));
                year = eval(str.substring(5, str.length));
            }
        }

        // d.m.yyyy format
        if (str.charAt(1) == "." && str.charAt(3) == "." && str.length == 8) {
            format = 4;
            // Check that month is a number.
            for (var i = 0; i < 1; i++) {
                var ch = str.substring(i, i + 1);
                if (ch < "0" || "9" < ch) err = true;
            }
            // Check that day is a number.
            for (var i = 2; i < 3; i++) {
                var ch = str.substring(i, i + 1);
                if (ch < "0" || "9" < ch) err = true;
            }
            // Check that year is a number.
            for (var i = 4; i < 8; i++) {
                var ch = str.substring(i, i + 1);
                if (ch < "0" || "9" < ch) err = true;
            }
            // Set variables
            if (err == false) {
                day = eval(str.substring(0, 1));
                month = eval(str.substring(2, 3));
                year = eval(str.substring(4, str.length));
            }
        }

        // Incorrect format.
        if (format != 1 && format != 2 && format != 3 && format != 4)
            var err = true;
    }

    // Check that month is between 1 &12.
    if (month <= 0 || month >= 13)
        err = true;

    // Check that day is right depending on month.
    if (month == 2 && ((year / 4) == parseInt(year / 4))) {
        if (day <= 0 || day > 29) err = true;
    }
    if (month == 2 && ((year / 4) != parseInt(year / 4))) {
        if (day <= 0 || day > 28) err = true;
    }
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (day <= 0 || day > 30) err = true;
    }
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        if (day <= 0 || day > 31) err = true;
    }

    // Check that year is OK
    //if(year<=0 || year>99) err=true;

    // If anything appears incorrect, display error message.
    if (err == true) return false;
    return true;

}

//onKeyPress="return hitDigitOnly(event)"
//sadece digit deðerlerin girilmesine izin verir.
function hitDigitOnly(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

//bu fonksiyon kullanýlýrken ayrýca valid Decimal numeric olup olmadýðý kontrol edilmedi
//Örneðin: isNumber(inputVal)
//onKeyPress="return hitDecimalOnly(event)"
//sadece digit,+,-,. deðerlerin girilmesine izin verir.

function hitNumericOnly(formname, name, maxlength1, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode > 47 && charCode < 58) || charCode == 46 || charCode == 45 || charCode == 43) {
        return maxLengthKnt(formname, name, maxlength1);
    }
    return false;
}

function hitBackspaceOnly(formname, name, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    return false;
}

function maxLengthKnt(formname, name, maxlength1) {
    var inputtext = eval("document.forms['" + formname + "']._" + name).value;
    while (inputtext.indexOf(",") > 0) {
        inputtext = inputtext.replace(",", "");
    }
    if (inputtext.indexOf(".") != -1) {
        if (inputtext.substring(0, inputtext.indexOf(".")).length >= eval(maxlength1))
            return false;
    }
    else if (inputtext.length >= eval(maxlength1))
        return false;
    return true;
}

function hitNumericOnlyNotPoint(formname, name, maxlength1, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode > 47 && charCode < 58) || charCode == 45) {
        return maxLengthKnt(formname, name, maxlength1);
    }
    return false;
}

// select - deselect named field with value in form fp
//onclick='javascript:toggleCheckBoxAll(document.forms["form1"], sec, true)'   

function toggleCheckBoxAll(fp, mode) {
    if (typeof(fp.sec.length) != "undefined") {
        for (var i = 0; i < fp.sec.length; i++) fp.sec[i].checked = mode;
    } else {
        fp.sec.checked = mode;
    }
}

function toggleCheckBoxSilAll(fp, mode) {
    if (typeof(fp.secsil.length) != "undefined") {
        for (var i = 0; i < fp.secsil.length; i++) fp.secsil[i].checked = mode;
    } else {
        fp.secsil.checked = mode;
    }
}

function toggleCheckAllByName(fp, name, mode) {
    var cb_obj = eval("fp." + name);
    if (typeof(cb_obj.length) != "undefined") {
        for (var i = 0; i < cb_obj.length; i++) {
            if (!cb_obj[i].disabled)
                cb_obj[i].checked = mode;
        }
    } else {
        if (!cb_obj.disabled)
            cb_obj.checked = mode;
    }
}


function toggleCheckAllById(id, mode) {
    var cb_obj = document.getElementById(id);
    if (typeof(cb_obj.length) != "undefined") {
        for (var i = 0; i < cb_obj.length; i++) {
            if (!cb_obj[i].disabled)
                cb_obj[i].checked = mode;
        }
    } else {
        if (!cb_obj.disabled)
            cb_obj.checked = mode;
    }
}

function setMasterCheckbox(fp, master_name, name, mode) {
    var cb_obj_master = eval("fp." + master_name);
    var cb_obj = eval("fp." + name);
    var count_total = 0;
    var count_selected = 0;
    if (typeof(cb_obj.length) != "undefined") {
        count_total = cb_obj.length;
        for (var i = 0; i < cb_obj.length; i++) {
            if (cb_obj[i].checked)
                count_selected = count_selected + 1;
        }
    } else {
        count_total = 1;
        if (cb_obj.selected)
            count_selected = 1;
    }
    if (count_total == count_selected)
        cb_obj_master.checked = true;
    else
        cb_obj_master.checked = false;
}

//onKeyPress="return hitDateOnly(event)"
//sadece digit,/ deðerlerin girilmesine izin verir.

function hitDateOnly(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode > 47 && charCode < 58) || charCode == 46 || charCode == 47) {
        return true;
    }
    return false;
}

// gönderilen sayiyi virguller
function formatCommas(numString) {

    var re = /(-?\d+)(\d{3})/;
    while (re.test(numString)) {
        numString = numString.replace(re, "$1,$2");
    }

    if (numString.indexOf('.') > -1) {
        var temp = '';


        // . ya kadar temp e al
        for (i = 0; i < numString.length; i++) {
            if (numString.charAt(i) == '.') {
                temp = temp + numString.charAt(i);
                break;
            } else {
                temp = temp + numString.charAt(i);
            }
        }

        // . dan sonraki , leri almadan stringi oluþtur
        for (j = i + 1; j < numString.length; j++) {
            if (numString.charAt(j) != ',') {
                temp = temp + numString.charAt(j);
            }
        }
        numString = temp;
        temp = '';
        var copy = true;
        // decimal pointteki 0 lar atýlýyor.
        for (j = numString.length - 1; j >= 0; j--) {
            if (copy && numString.charAt(j) != '0') {
                copy = false;
            }
            if (!copy) {
                temp = temp + numString.charAt(j);
            }
        }

        // en sonda . kaldýysa atýlýr
        if (temp.charAt(0) == '.') {
            j = 1;
        } else {
            j = 0;
        }
        numString = '';
        // temp te ters duran string ters çevrilerek düzeltilir...
        for (i = temp.length - 1; i >= j; i--) {
            numString = numString + temp.charAt(i);
        }

        if (trim(numString) == '') {
            numString = '0';
        }
    }

    return numString;
}

// gonderilen stringteki virgulleri temizler
function stripCommas(numString) {
    var re = /,/g;
    return numString.replace(re, "");
}

// onBlur="return virgulle(document.forms['FORM1']._sayi,document.forms['FORM1'].sayi); " 
// onKeyPress="return hitNumericOnly(event);"
// yukarýdaki þekilde kullanýlýr. ekrandan girilen sayýlarýn virgullu olarak goruntuler
// arka taraftada sql icin hazýr þekilde deger tutar.
function virgulle(field, hidden_field, maxlength2) {
    var al = field.value;
    var temp1 = "";
    var temp2 = "";
    if (al.indexOf(".") > 0) {
        temp1 = al.substring(0, al.indexOf(".") + 1);
        temp2 = al.substring(al.indexOf(".") + 1);
        if (temp2.length > eval(maxlength2))
            temp2 = temp2.substring(0, maxlength2);
        al = temp1 + temp2;
    }
    var to_hidden = stripCommas(al);
    hidden_field.value = to_hidden;
    var ver = formatCommas(to_hidden);
    field.value = ver;
    if (!isNumber(hidden_field.value)) {
        alert("Lütfen geçerli bir sayý giriniz...");
        field.focus();
    }
    return true;
}

// field_2 nin degerini virgulleyip field_1 e taþýr
function virgulle_tasi(field_1, field_2) {
    field_1.value = formatCommas(field_2.value);
}


function toggleCheckAllByNameForDinamikSorgu(fp, name, mode) {
    var cb_obj = eval("fp." + name);
    if (typeof(cb_obj.length) != "undefined") {
        for (var i = 0; i < cb_obj.length; i++) {
            if (!cb_obj[i].disabled)
                cb_obj[i].checked = mode;
            var sira = eval(cb_obj[i].id.substring(3)) - 1;
            //	alert(sira);
            tikla(cb_obj[i], sira);
        }
    } else {
        var sira = eval(cb_obj.id.substring(3)) - 1;
        alert(sira);
        if (!cb_obj.disabled) {
            cb_obj.checked = mode;
            tikla(cb_obj, sira);
        }
    }
}

function saatFormat2(textBox, event) {
    try {
        var charCode = (event.which) ? event.which : event.keyCode;
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && (event.keyCode != 9)) {
            event.returnValue = false;
            textBox.value = "";
        }
        if (event.keyCode == 58 && textBox.value.length != 2) event.returnValue = false;
        if (textBox.value.length == 2) {
            var saat = textBox.value * 1;

            if (saat > 23)
                textBox.value = "23";

            textBox.value += ":";
            if (event.keyCode == 58)
                event.returnValue = false;

        }

        if (textBox.value.length == 5) {
            var dakika = textBox.value.substring(3) * 1;
            if (dakika > 59) {
                textBox.value = textBox.value.substring(0, 3) + "59";
                event.returnValue = false;
            }
        }
        $(textBox).bind('blur', function () {
            try {
                var ofset = textBox.value.indexOf(":");
                if (textBox.value != "") {


                    if (ofset == '-1') {//1 gibi bir de?er girildi?i zaman 01:00 yapmak için yaz?ld? //dst1 23-12-2013//
                        if (textBox.value.length > 2) {
                            textBox.value = "0";
                        }

                        if (textBox.value.length == 0) {
                            textBox.value = "00:";
                        } else {
                            textBox.value = "0" + textBox.value + ":";
                        }
                    }
                    ofset = textBox.value.indexOf(":");
                    var afterofset = textBox.value.substring(ofset + 1);
                    var dongu = 2 - (afterofset.length);
                    for (var i = 0; i < dongu; i++) {
                        textBox.value = textBox.value + "0";
                    }

                    if (textBox.onblur != null) {
                        callFunction(textBox.id, 'onblur');
                    }
                }
            } catch (err) {
                alert(err);
                //do nothing
            }
        });
    } catch (err) {
    }
}



function saatFormat(textBox, event) {
    try {
        var charCode = (event.which) ? event.which : event.keyCode;
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && (event.keyCode != 9)) {
            event.returnValue = false;
            textBox.value = "";
        }
        if (event.keyCode == 58 && textBox.value.length != 2) event.returnValue = false;
        if (textBox.value.length == 2) {
            var saat = textBox.value * 1;

            if (saat > 23)
                textBox.value = "23";

            textBox.value += ":";
            if (event.keyCode == 58)
                event.returnValue = false;

        }

        if (textBox.value.length == 5) {
            var dakika = textBox.value.substring(3) * 1;
            if (dakika > 59) {
                textBox.value = textBox.value.substring(0, 3) + "59";
                event.returnValue = false;
            }
        }
        $(textBox).bind('blur', function () {
            try {
                var ofset = textBox.value.indexOf(":");
                if (ofset == '-1') {//1 gibi bir de?er girildi?i zaman 01:00 yapmak için yaz?ld? //dst1 23-12-2013//
                    if (textBox.value.length > 2) {
                        textBox.value = "0";
                    }

                    if (textBox.value.length == 0) {
                        textBox.value = "00:";
                    } else {
                        textBox.value = "0" + textBox.value + ":";
                    }
                }
                ofset = textBox.value.indexOf(":");
                var afterofset = textBox.value.substring(ofset + 1);
                var dongu = 2 - (afterofset.length);
                for (var i = 0; i < dongu; i++) {
                    textBox.value = textBox.value + "0";
                }

                if (textBox.onblur != null) {
                    callFunction(textBox.id, 'onblur');
                }
            } catch (err) {
                alert(err);
                //do nothing
            }
        });
    } catch (err) {
    }
}

function saatFarkiBulDetay(textBox1, textBox2, textBoxToplam) {
    if (textBox1.value.length == 5 && textBox2.value.length == 5) {
        var saat1 = textBox1.value.substring(0, 2);
        var saat2 = textBox2.value.substring(0, 2);
        var dakika1 = textBox1.value.substring(3);
        var dakika2 = textBox2.value.substring(3);
        var saatfark = (saat2 * 1) - (saat1 * 1);
        if (saat1 > saat2 || (saat1 == saat2 && dakika1 > dakika2)) {
            textBoxToplam.value = "0";
            return;
        } else {
            var dakikafark = (dakika2 * 1) - (dakika1 * 1);
            var negatifmi = dakikafark < 0;
            if (negatifmi)
                dakikafark = dakikafark * (-1);
            var hesaplanan = dakikafark / 60.00;
            if (negatifmi)
                saatfark = saatfark - hesaplanan;
            else
                saatfark = saatfark + hesaplanan;
        }
        textBoxToplam.value = Math.round(saatfark * 10) / 10;
    } else {
        textBoxToplam.value = "0";
    }
}

function saatFarkiBul(textBox1, textBox2) {
    if (textBox1.value.length == 5 && textBox2.value.length == 5) {
        var saat1 = textBox1.value.substring(0, 2);
        var saat2 = textBox2.value.substring(0, 2);
        var dakika1 = textBox1.value.substring(3);
        var dakika2 = textBox2.value.substring(3);
        var saatfark = (saat2 * 1) - (saat1 * 1);
        if (saatfark < 0)
            return saatfark;
    } else
        return -99;
}

function browserDetect() {
    /*
        dey1 : Uygulamanin chrome ve firefox icin destek vermesi için ajax requestlerinde
        kullanilan bazi methodlarin degistirilmesi gerekiyordu. Bu islem icin browserDetect
        yapiliyor. Basit bir browser detection daha sonra detaylandirilip düzenlenebilir.

        06.04.2011
    */
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
        return 'chrome';
    else if (navigator.userAgent.toLowerCase().indexOf('msie') > -1)
        return 'ie';
    else if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
        return 'firefox';
    else
        return 'ie';
}

function hourValid(hour) {
    if (hour.indexOf(":") == -1) {
        return false;
    }

    var h = hour.substring(0, 2);
    var d = hour.substring(hour.indexOf(":") + 1);
    if (h * 1 == 'NaN' || d * 1 == 'NaN')
        return false;

    if (h * 1 > 23 || d * 1 > 59)
        return false;

    return true;
}

function smsCharacterControl(str) {
    var myRegxp = /([a-zA-Z0-9 .,+?!:;\\@$#\n]+)$/;
    return myRegxp.test(str);
}

function validateSMSTelefon(str) {
    var myRegxp = /^[0-9]+/;
    return myRegxp.test(str);
}


function validateAllTextAreas(errors) {
    $('[id^="errormax"]').remove();
    var count = 0;
    $("textarea").each(function () {
        try {
            var keypress = this.onkeypress + "";
            if (keypress.indexOf("textcon(this,") != -1) {
                var maxtemp = keypress.substring(keypress.indexOf("textcon(this,") + 13);
                var max = maxtemp.substring(0, maxtemp.indexOf(")"));
                if (this.value.length > max) {
                    if (count++ == 0)
                        errors += getMessage("M1167");
                    $(this).parent().append("<span id='errormax" + count + "' style='color:red'> </span>");
                    $("#errormax" + count).html("&nbsp; </br> *(max: " + max + ")");
                }
            }
        } catch (err) {
        }
    });

    return errors;
}