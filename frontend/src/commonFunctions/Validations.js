export function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode;
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;
    return true;
}

export function validateSpecialCharacters() {
    var regex = /^[A-Za-z0-9 ]+$/
    //Validate TextBox value against the Regex.
    var isValid = regex.test(document.getElementById("txtName").value);
    if (!isValid) {
        alert("Contains Special Characters.");
    } else {
        alert("Does not contain Special Characters.");
    }

    return isValid;
}