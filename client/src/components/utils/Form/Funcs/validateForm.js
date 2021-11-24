// function that returns true if value is email, false otherwise
const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
        return true;
    }
    return false;
};

const verifyContactEmail = value => {

    
    // var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (emailRex.test(value)) {
    //     return true;
    // }
    return false;
};

// function VerifyContactEmail () {

//     console.log(this.props);
//     // const dispatch = useDispatch()

//     // let localeuser = useSelector(state => state.user.localeUser)
//     // let currentmysite = useSelector(state => state.mysite.CurrentMysite)

//     return 'asss'
// } 

// function that verifies if a string has a given length or not
const verifyLength = (value, length) => {

    if (value.length >= length) {
        return true;
    }
    return false;
};
const verifyNotEmpty = (value, length) => {


    if (value.trim() !== '') {
        return true;
    }
    return false;
};
// function that verifies if value contains only numbers
const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
        return true;
    }
    return false;
};
const verifyPhone = value => {
    var numberRex = new RegExp("^[0-9+' ']+$");
    if (numberRex.test(value)) {
        return true;
    }
    return false;
};
// verifies if value is a valid URL
const verifyUrl = value => {
    try {
        new URL(value);
        return true;
    } catch (_) {
        return false;
    }
};

export function validateForm({redux_currentmysite = null, formcell = null, event = null}) {
    let vtext = []
    let isValid = false

    for (let validtype of formcell.validation.type) {

        if (validtype === 'required') {
            if (verifyLength(event.target.value, 4)) {
                isValid = true
            } else {
                let message = formcell.config.label + " needs to be at least 5 characters long."
                isValid = false
                vtext.push(message)
            }
        } if (validtype === 'notempty') {
            if (verifyNotEmpty(event.target.value)) {
                isValid = true
            } else {
                let message = formcell.config.label + " can't be empty"
                isValid = false
                vtext.push(message)
            }
        } else if (validtype === 'verifyurl') {
            if (verifyUrl(event.target.value)) {
                isValid = true
            } else {
                let message = formcell.config.label + " URL addres not valid."
                isValid = false
                vtext.push(message)
            }
        } else if (validtype.includes('verifyemail') ) {
            if (verifyEmail(event.target.value)) {
                isValid = true
            } else {
                let message = formcell.config.label + " not valid."
                isValid = false
                vtext.push(message)
            }
        } else if (validtype.includes('contactemail') ) {

            if (redux_currentmysite.email === event.target.value) {
                let message = "Please enter Your email. Our email is not valid."
                isValid = false
                vtext.push(message)
            }
        }else if (validtype === 'verifynumber') {
            if (verifyNumber(event.target.value)) {
                isValid = true
            } else {
                let message = formcell.config.label + " Not a number."
                isValid = false
                vtext.push(message)
            }
        } else if (validtype === 'verifyphone') {
            if (verifyPhone(event.target.value)) {
                isValid = true
            } else {
                let message = " Not a phone number."
                isValid = false
                vtext.push(message)
            }
        }

        
    }

    return { isValid, vtext }
}