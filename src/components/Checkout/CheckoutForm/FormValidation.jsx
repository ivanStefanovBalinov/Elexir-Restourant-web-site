function FormValidation() {
    let name = document.forms['personInfo']['personName'];
    let city = document.forms['personInfo']['city'];
    let street = document.forms['personInfo']['street'];
    if (name.value.length < 3) {
        name.classList.add('required');
        document.documentElement.scrollTop = 0;
        return false;
    }

    if (city.value.length < 3) {
        city.classList.add('required');
        document.documentElement.scrollTop = 0;
        return false;
    }

    if (street.value.length < 3) {
        street.classList.add('required');
        document.documentElement.scrollTop = 0;
        return false;
    }

    return true;
}

export default FormValidation;
