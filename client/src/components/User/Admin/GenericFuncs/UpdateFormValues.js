
import { validateForm } from "../../../utils/Form/Funcs/validateForm"

export  function updateFormValues({ event = null, cell, isLocalStorage }) {

    let newLocalStorage = {...isLocalStorage}

    const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0].value

    // VERSION 2
    let validated = { isValid: false }

   

    // =================

    if (isLocalStorage.form.formdata[cellkey].validation.parse) {
        validated = validateForm({ formcell: isLocalStorage.form.formdata[cellkey], event })

        if (!validated.isValid) {
            newLocalStorage = {
                ...isLocalStorage,
                form: {
                    ...isLocalStorage.form,
                    formdata: {
                        ...isLocalStorage.form.formdata,
                        [cellkey]: {
                            ...isLocalStorage.form.formdata[cellkey],
                            validation: { ...isLocalStorage.form.formdata[cellkey].validation, message: validated.vtext[0] },
                            value: cellvalue,
                            valid: false
                        }
                    }
                }
            }


        } else {
            newLocalStorage = {
                ...isLocalStorage,
                form: {
                    ...isLocalStorage.form,
                    formdata: {
                        ...isLocalStorage.form.formdata,
                        [cellkey]: {
                            ...isLocalStorage.form.formdata[cellkey],
                            validation: { ...isLocalStorage.form.formdata[cellkey].validation, message: '' },
                            value: cellvalue,
                            valid: true
                        }
                    }
                }
            }
        
        }

    } else {

        newLocalStorage = {
            ...isLocalStorage,
            form: {
                ...isLocalStorage.form,
                formdata: {
                    ...isLocalStorage.form.formdata,
                    [cellkey]: {
                        ...isLocalStorage.form.formdata[cellkey],
                        value: cellvalue,
                    }
                }
            }
        }
   
    }


    return newLocalStorage
}