import { populateFields_vh3 } from '../../../utils/Form/FormActions/populateFields_vh';

export async function compoFuncs_Refresh_vh3({ myLocalStorage, model = null, dispatch, found = null,  poliglot = null, newLocalStorage = null, redux_localeuser, fields = null, type = null }) {
    if (!newLocalStorage) {
        newLocalStorage = { ...myLocalStorage }
    }


    newLocalStorage['form']['formdata'] = await populateFields_vh3({ formdata: myLocalStorage.form.formdata, fields, redux_localeuser,  dispatch, poliglot, type, model });
    // === DEBUG, DISABLED FOR TESTING
    if (poliglot) {
        newLocalStorage['form']['formdata']['country'].value = redux_localeuser.referenceID.alpha2Code;
        newLocalStorage['form']['formdata']['language'].value = redux_localeuser.referenceID.languages[0].iso639_1;
    }

    return { newLocalStorage, found }
}