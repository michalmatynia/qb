import { runPattern } from '../../../User/Admin/GenericCompos/format_table'
import {
    setPath
} from '../../../utils/Funcs/basefuncs'
import { populatePosition_v2 } from '../../../utils/Funcs/populate_funcs'


async function resolveQuery({ getlist = null, inQuery = null, formdata = null, key = null, model = null, fillval = null, fields = null }) {
    if ('onPopulateAction' in fillval.fromconfig) {
        if ('preFind' in fillval.fromconfig.onPopulateAction) {
            if ('affectValue' in fillval.fromconfig.onPopulateAction.preFind) {
                getlist = await fillval.fromconfig.onPopulateAction.preFind.affectValue.actionA({ cell: { [key]: formdata[key] }, getlist, fields })

            } else if ('justRun' in fillval.fromconfig.onPopulateAction.preFind) {
                await fillval.fromconfig.onPopulateAction.preFind.justRun.actionA({ cell: { [key]: formdata[key] }, getlist, fields })
            }
        }
    }

    return getlist
}
async function structureOutputs({ fields = null, formdata = null, key = null, model = null, myprops = null, fillval = null, fillkey = null, poliglot = null }) {

    let getlist
    let inQuery = {}

    if (poliglot) {
        inQuery = Object.assign(inQuery, {
            country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
            language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
        });
    }
    if (fields && fillkey === 'value') {



        // Edit Scenario
        if (Array.isArray(fields[key])) {


            if (fields[key].length === 0) {
                getlist = []
            } else if (fields[key].length > 0) {

                if ('fromconfig' in fillval) {
                    if (key === 'checked') {

                    }
                    getlist = await resolveQuery({
                        getlist, inQuery, formdata, key, model, fillval, fields
                    })

                    /* DEBUG if (key === 'checked') {
                                            console.log(getlist);
                                
                                        } */
                } else {
                    getlist = fields[key]
                }
            }

        } else if (typeof (fields[key]) === 'object' && fields[key] !== null) {

            if (Object.values(fields[key]).length === 0) {
                getlist = {}
            } else if (Object.values(fields[key]).length > 0) {
                if ('fromconfig' in fillval) {
                    getlist = await resolveQuery({
                        getlist, inQuery, formdata, key, model, fillval, fields
                    })
                } else {
                    getlist = fields[key]
                }
            }
        } else {

            if (fields[key].length === 0) {
                getlist = ''
            } else if (fields[key].length > 0) {

                if ('fromconfig' in fillval) {
                    getlist = await resolveQuery({
                        getlist, inQuery, formdata, key, model, fillval, fields
                    })
                } else {
                    getlist = fields[key]
                }

                // Handle Non-Arrays
            } else if (typeof (fields[key]) === 'boolean' || typeof (fields[key]) === 'number') {
                if ('fromconfig' in fillval) {
                    getlist = await resolveQuery({
                        getlist, inQuery, formdata, key, model, fillval, fields
                    })

                } else {
 

                    getlist = fields[key]
                }
            } else {
                console.log('field length is undefined');
            }
        }
        // ===================

    } else if (!fields || (fields && fillkey !== 'value')) {
        // populateValues
        if ('fromconfig' in fillval) {

            getlist = await resolveQuery({
                getlist, inQuery, formdata, key, model, fillval
            })

        } else {
            if (formdata[key].inputprops.type !== 'hidden') {
                if ('resetvalue' in fillval.toconfig) {
                    getlist = fillval.toconfig.resetvalue;

                } else {

                    if (fillval.toconfig.valuetype === 'array' || fillval.toconfig.valuetype === 'arrayofrefs') {

                        getlist = [];

                    } else if (fillval.toconfig.valuetype === 'boolean') {
                        getlist = true;

                    } else if (fillval.toconfig.valuetype === 'integer') {
                        getlist = ''

                    } else if (fillval.toconfig.valuetype === 'string') {

                        getlist = '';

                    }
                    getlist = [];
                }
            } else {
                getlist = formdata[key].value
            }
        }

    }
    return getlist
}


async function addFormulations({ formdata = null, key = null }) {

    // Nie wiem czy zrobic wyjatek na array ofrefs od tego
    formdata[key].valid = true;
    formdata[key].touched = true;

    return formdata
}
async function resetFormulations({ formdata = null, key = null, fields = null, populateEntity = null }) {


    if (!populateEntity && !fields) {
        if (formdata[key].inputprops.type !== 'hidden') {
            if (formdata[key].fillfields.value.toconfig.valuetype === 'string') {
                if (formdata[key].validation.parse === true) {
                    formdata[key].valid = false
                }
            }

            if ('filterfield' in formdata[key]) {
                if ('resetvalue' in formdata[key]['filterfield'].config) {
                    formdata[key]['filterfield'].value = formdata[key]['filterfield'].config.resetvalue;
                }
            }
        }
    }
    return formdata
}
async function populateGenericField({ formdata = null, key = null, fields = null, model = null, myprops = null, poliglot = null, fillkey = null, fillval = null }) {
    /*     PHASE 1 */
    /* reset occurs here as well */

    let getlist = await structureOutputs({ fields, formdata, key, model, myprops, poliglot, fillval, fillkey })


    let final_result = getlist
    if ('fromconfig' in fillval) {
        if (Array.isArray(getlist)) {
            final_result = []

            for (let each of getlist) {

                let patternresult = runPattern({ column: fillval.fromconfig, item: each })
                final_result.push(patternresult)
            }

        } else {
            final_result = runPattern({ column: fillval.fromconfig, item: final_result })
        }
        if ('parentindex' in fillval.fromconfig) {
            final_result = final_result[fillval.fromconfig.parentindex]
        }
    }

    setPath({ object: formdata[key], path: fillval.toconfig.setpath, value: final_result })

    formdata = await addFormulations({ formdata, key })

    formdata = await resetFormulations({ formdata, key, fields, fillval, fillkey })


    return formdata
}

// ===========
export const populateFields_v2 = async ({ formdata, fields = null, myprops, poliglot, type, model }) => {
    for (let key in formdata) {
        for (let [fillkey, fillval] of Object.entries(formdata[key].fillfields)) {

            if (fillval.toconfig.valuetype === 'integer' && key === 'position') {
                formdata[key] = await populatePosition_v2({ myprops, model, formdata, type, fields, key, poliglot });
            } else {


                formdata = await populateGenericField({ formdata, key, fields, model, myprops, poliglot, fillkey, fillval })

            }
        }
    }

    return formdata;
}