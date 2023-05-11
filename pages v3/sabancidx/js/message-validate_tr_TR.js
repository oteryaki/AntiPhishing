var messages4validate =
    [
        ["m-required", "Bu alan�n doldurulmas� zorunludur."],
        ["m-remote", "L�tfen bu alan� d�zeltin."],
        ["m-email", "L�tfen ge�erli bir e-mail adresi giriniz."],
        ["m-url", "L�tfen ge�erli bir web adresi (URL) giriniz."],
        ["m-date", "L�tfen ge�erli bir tarih giriniz."],
        ["m-dateISO", "L�tfen ge�erli bir tarih giriniz(ISO format�nda)"],
        ["m-number", "L�tfen ge�erli bir say� giriniz."],
        ["m-digits", "L�tfen sadece say�sal karakterler giriniz."],
        ["m-step", "L�tfen {0} katlar� �eklinde say�sal karakterler giriniz."],
        ["m-creditcard", "L�tfen ge�erli bir kredi kart� giriniz."],
        ["m-equalTo", "L�tfen ayn� de�eri tekrar giriniz."],
        ["m-extension", "L�tfen ge�erli uzant�ya sahip bir de�er giriniz."],
        ["m-maxlength", "L�tfen en fazla {0} karakter uzunlu�unda bir de�er giriniz."],
        ["m-minlength", "L�tfen en az {0} karakter uzunlu�unda bir de�er giriniz."],
        ["m-rangelength", "L�tfen en az {0} ve en fazla {1} uzunlu�unda bir de�er giriniz."],
        ["m-range", "L�tfen {0} ile {1} aras�nda bir de�er giriniz."],
        ["m-max", "L�tfen {0} de�erine e�it ya da daha k���k bir de�er giriniz."],
        ["m-min", "L�tfen {0} de�erine e�it ya da daha b�y�k bir de�er giriniz."],
        ["m-require_from_group", "L�tfen bu alanlar�n en az {0} tanesini doldurunuz."],
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
