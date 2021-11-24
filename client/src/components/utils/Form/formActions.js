import { LoopItems } from "../../Home/HomeFuncs/home_funcs"

export const validate = (element, formdata = []) => {
    let error = [true, ''];


    if (element.validation.email) {
        // eslint-disable-next-line
        const valid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(element.value)
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.confirm) {
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Passwords do not match' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid, message] : error;
    }
    if (element.validation.integer) {
        const valid = /(^\d+$)/.test(element.value)
        const message = `${!valid ? 'Must be a valid Number' : ''}`;
        error = !valid ? [valid, message] : error;
    }
    return error

}

// When a field is Touched, it is automatically Validated. Hidden and Untouched fields remain unvalidated

export const generateData = ({ formdata = null }) => {

    let dataToSubmit = {};

    for (let key in formdata) {
        if (key !== 'confirmPassword') {
            dataToSubmit[key] = formdata[key].value;
        }

    }

    return dataToSubmit;
}

export const grabFormdataShowPreview_v1 = ({ myprops = null, mystate = null }) => {

    let formdata = { ...mystate.localStorage.form.formdata }

    let dataToSubmit = []

    // Grab Form Data and convert to Submit data format
    for (let key in formdata) {

        if (formdata[key].inputprops.type === 'file') {
            let fileset = []
            for (let eachfile of formdata[key].value) {

                fileset.push(eachfile)

            }
            dataToSubmit[key] = fileset;

        } else {
            dataToSubmit[key] = formdata[key].value;
        }
    }

    return mystate.localStorage.form.formdata.htmltype !== '' ?
        <LoopItems
            item={dataToSubmit}
        />
        : null

    // return null
}


export const isFormValid_v2 = ({ formdata }) => {
    let formIsValid = true;

    for (let key in formdata) {
        if (formdata[key].validation.parse) {

            if (formdata[key].value !== '' || formdata[key].value !== []) {
                formIsValid = formdata[key].valid && formIsValid
            } else {
                formIsValid = formdata[key].valid
            }
        } else { formIsValid = formdata[key].valid && formIsValid }

    }

    return formIsValid;
}
export const populatePositionField = ({ formdata = null, response = null, field = null, type = null }) => {

    const totalPos = [];
    let i = 0

    if (Object.keys(response).length !== 0) {

        response.forEach((item) => {
            i = i + 1;
            totalPos.push({ key: i, value: i })

        })

    }

    if (type === 'add') {
        i = totalPos.length + 1;
        totalPos.push({ key: i, value: i })
    }

    let newFormData = {
        ...formdata
    }

    newFormData[field].config.options = totalPos;

    // objac gore
    if (type === 'add') {
        newFormData[field].value = totalPos.length
    }
    else if (type === 'edit') {
        newFormData[field].value = formdata[field].value

    }

    return newFormData;
}
// TO Ponizej jest tylko w mySite usunac potem
export const populateLanguageField = (formdata, response, field) => {

    let newFormData = {
        ...formdata
    }

    const options = [];

    if (response.length !== 0) {

        response.forEach((item, index) => {

            options.push({ key: item._id, value: item.referenceID.languages[0].name + ' (' + item.referenceID.name + ')' })
        })

    }
    newFormData[field].config.options = options;
    return newFormData;
}

export const populateFixedCats = ({ formdata, response, field }) => {

    let newFormData = {
        ...formdata
    }

    const options = [];

    if (response.length !== 0) {

        response.forEach((item, index) => {


            options.push({ key: item.name, value: item.name })
        })

    }
    newFormData[field].config.options = options;
    return newFormData;
}



// For resolving object paths from Array ('[header, body]', this.state.localStorage)
export const resolvepath = async (path, obj) => {
    return path.reduce(function (prev, curr) {

        return prev ? { ...prev[curr] } : null
    }, obj)
}
