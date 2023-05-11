function formVerify(fp) {
    if ($("#formLOGON").valid()) {
        console.log("success");
        return true;
    }
    document.getElementById('divLoading').style.display = "none";
    return false;
}


$(document).ready(function() {

    jQuery.validator.addMethod("checkTurkishChar", function(value, element) {

        return checkTurkishChars(value);
    });

    $("#formLOGON").validate({
        ignore: 'input[type=hidden]',
        rules: {
            userid: {
                required: true,
                checkTurkishChar:true
            },
            password: {
                required:true
            }
        },
        messages: {
            userid: {
                required: getMessage("M0001"),
                checkTurkishChar: getMessage("M0175")
            },
            password: {
                required:getMessage("M0002")
            }
        }
    });

});


function capLock_fl(e) {
    kc = e.keyCode ? e.keyCode : e.which;
    sk = e.shiftKey ? e.shiftKey : ((kc == 16) ? true : false);
    if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk))
        document.getElementById('check-cc').classList.add("c-err");
    else
        document.getElementById('check-cc').classList.remove("c-err");
}

function showHidePassword_fl(pass, size) {
    if (pass.type == "text") {
        pass.type = "password";
        pass.size = pass.size + size;
        document.getElementById('showhide-icon').className = "hr-web-view";

    } else {
        pass.type = "text";
        pass.size = pass.size - size;
        document.getElementById('showhide-icon').className = "hr-web-private";
    }
}

function showHideUsernameInfo() {
    var infobox = document.getElementById('infobox')
    if (infobox.style.display === "none") {
        infobox.style.display = "block";
    } else {
        infobox.style.display = "none";
    }
}

//jQuary Validate Plugindeki uyumsuzluk sebebiyle _check.js deki (isNoTurkishChar()) fonksiyonuyerine bu fonksiyonu kullandık
function checkTurkishChars(str) {
    var invalid = "\u011f\u011e\u0131\u0130\u015f\u015eçÇöÖüÜ";
    var ok = true;
    var temp;
    for (var i = 0; i < str.length; i++) {
        temp = "" + str.substring(i, i + 1);
        if (invalid.indexOf(temp) != "-1") {
            ok = false;
            return ok;
        }
    }
    return ok;
}
function tekrarSMSGonder(){
    var ajaxUrl  = "logon.ajax?cmd=tekrarSmsGonder";

    $.ajax({
        type: "GET",
        dataType:"xml",
        url:ajaxUrl,
        async: false,
        success: function(data) {
            try{
                $(data).find("result").each(function(){
                    var smsindex = $(this).find("smsindex").text();
                    if(Number(smsindex) > 0){
                        $("#smskod").html(smsindex);
                        $("#csmskod").val(smsindex);
                        toastr.warning(smsindex + getMessage("M2958") );
                    }else{

                    }
                });
            }catch(err){
                alert(err);
            }
        },
        error: function () {
            return false;
        },
        complete:function(){},
        beforeSend:function(){
        }
    });

}