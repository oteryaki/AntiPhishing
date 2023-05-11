var messages4validate =
    [
        ["m-required", "Bu alanýn doldurulmasý zorunludur."],
        ["m-remote", "Lütfen bu alaný düzeltin."],
        ["m-email", "Lütfen geçerli bir e-mail adresi giriniz."],
        ["m-url", "Lütfen geçerli bir web adresi (URL) giriniz."],
        ["m-date", "Lütfen geçerli bir tarih giriniz."],
        ["m-dateISO", "Lütfen geçerli bir tarih giriniz(ISO formatýnda)"],
        ["m-number", "Lütfen geçerli bir sayý giriniz."],
        ["m-digits", "Lütfen sadece sayýsal karakterler giriniz."],
        ["m-step", "Lütfen {0} katlarý þeklinde sayýsal karakterler giriniz."],
        ["m-creditcard", "Lütfen geçerli bir kredi kartý giriniz."],
        ["m-equalTo", "Lütfen ayný deðeri tekrar giriniz."],
        ["m-extension", "Lütfen geçerli uzantýya sahip bir deðer giriniz."],
        ["m-maxlength", "Lütfen en fazla {0} karakter uzunluðunda bir deðer giriniz."],
        ["m-minlength", "Lütfen en az {0} karakter uzunluðunda bir deðer giriniz."],
        ["m-rangelength", "Lütfen en az {0} ve en fazla {1} uzunluðunda bir deðer giriniz."],
        ["m-range", "Lütfen {0} ile {1} arasýnda bir deðer giriniz."],
        ["m-max", "Lütfen {0} deðerine eþit ya da daha küçük bir deðer giriniz."],
        ["m-min", "Lütfen {0} deðerine eþit ya da daha büyük bir deðer giriniz."],
        ["m-require_from_group", "Lütfen bu alanlarýn en az {0} tanesini doldurunuz."],
        ["M9999", "END-OF-MESSAGE"]];


function findKeyIndex4Validate(key) {
    for (var i = 0; i < messages4validate.length; i++) {
        if (messages4validate[i][0] == key) return i;
    }
    console.log("message key field not found");
    return -1;
}

function getMessage4Validate(key) {
    var index = findKeyIndex4Validate(key);
    return (messages4validate[index][1]);
}
