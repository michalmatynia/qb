import {
    plg_findMany,
    plg_findOne_QueMod,
    plg_updateOne_queMod_oprMod,
    plg_updateMany,
    plg_create_oprMod,
} from '../../../utils/Plugs/cms_plugs';
import { runtranslation } from '../../../utils/Funcs/translationfuncs';
import { runtranslation_vh2 } from '../../../utils/Funcs/translationfuncs_hook';

import { taxoFuncs_syncTaxoAcross, taxoFuncs_setTaxonomyTags_v2 } from './taxo_funcs'
import { messageCompleted } from './errormsg_funcs'
import { reposFuncs_syncPositionAcross, reposFuncs_soloPositionSwap, reposFuncs_soloPositionSwap_vh2 } from './repos_funcs'
import { preinputFuncs_formatData_Add, preinputFuncs_formatData_Edit } from './preinput_funcs'
import { grabFormdata_v2 } from '../../../utils/Form/FormActions/grabFormdata';
import { runPostCreateActionsfromState } from '../../../utils/Form/FormActions/stateActions'

export async function submitFuncs_UpdateTranslate({ translate = null, myprops = null, updated = null, current = null, prospect = null, model = null, mystate = null }) {
    if (updated.payload) {

        if (updated.payload.lgbinder !== '') {

            let inQuery

            if (model === 'brick'
                || model === 'page'
                || model === 'trnsdetailproduct'
            ) {
                updated.payload['checked'] = [...mystate.localStorage.form.formdata.checked.value]
            }

            inQuery = {
                _id: { "$ne": myprops.user.localeUser._id }
            }
            let lglist = await plg_findMany({ model: 'language', myprops, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })

            // LOOP through languages

            for (const item of Object.values(lglist.payload)) {

                // SYNCHRONIZE Position & Visible // Create syncPositionAcross
                // Lepiej zostawić jako osobny Run na bazie danych, bo jest tam skomplikowana opcja SWAP

                await reposFuncs_syncPositionAcross({ country: item.referenceID.alpha2Code, language: item.referenceID.languages[0].iso639_1, model, myprops, updated, current })

                /// SYNCHRONIZE TagtypeMain

                if (model === 'taxonomy') {

                    await taxoFuncs_syncTaxoAcross({
                        model,
                        myprops,
                        mystate,
                        updated: updated.payload,
                        current,
                        target_lg: item.referenceID.languages[0].iso639_1,
                        source_lg: myprops.user.localeUser.referenceID.languages[0].iso639_1,
                        language: item.referenceID.languages[0].iso639_1,
                        country: item.referenceID.alpha2Code
                    })
                }

                await submitFuncs_syncContentTranslateAcross({
                    translate,
                    myprops,
                    updated,
                    model,
                    mystate,
                    current,
                    prospect,
                    target_lg: item.referenceID.languages[0].iso639_1,
                    source_lg: myprops.user.localeUser.referenceID.languages[0].iso639_1,
                    language: item.referenceID.languages[0].iso639_1,
                    country: item.referenceID.alpha2Code
                })
            }
        }
        await messageCompleted({ myprops })

    }
}
export async function submitFuncs_syncContentTranslateAcross({ translate = null, myprops = null, updated = null, model = null, mystate = null, source_lg = null, target_lg = null, country = null, language = null, current = null, prospect = null }) {

    let inQuery
    let inOperator
    let inParams

    if (translate) {

        let merger = await submitFuncs_combineTranslateFields({ source_lg, target_lg, current: updated.payload, myprops, mystate })
        if (merger.combinedTranslation) {

            let translatedDataToSubmit = await preinputFuncs_formatData_Edit({ combinedTranslation: merger.combinedTranslation, language, country, current, prospect, updated: updated.payload, model, myprops, mystate })

            inQuery = {
                country: { "$eq": country },
                language: { "$eq": language },
                lgbinder: { "$eq": updated.payload.lgbinder }
            }

            inOperator = {
                "$set": translatedDataToSubmit
            }
            inParams = { new: true }

            await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams, populate: mystate.localStorage.qhelpers.populate })

        } else {

            let inQuery = { _id: { "$eq": myprops.match.params.id } }
            await plg_findOne_QueMod({ model, myprops, actionType: 'detail', inQuery })

            // =============
            setTimeout(async () => {

            inQuery = { type: { "$eq": 'custom' } }

            inOperator = {
                "$set": { text: merger.output.result }
            }
                await plg_updateOne_queMod_oprMod({ model: 'message', myprops, actionType: 'detail', inQuery, inOperator })

            }, 2000)



        }
    }

}
export async function submitFuncs_SyncLgbinder({ myprops = null, input = null, model = null }) {
    let inQuery
    let inOperator

    inQuery = {
        _id: { "$eq": input._id }
    }
    inOperator = { '$set': { lgbinder: input._id } }
    await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator })

}

export async function submitFuncs_genericSubmit_v2({ myprops = null, model = null, mystate = null, poliglot = null }) {
    let inQuery = {}
    let inOperator = {}

    let formdata = { ...mystate.localStorage.form.formdata }

    let inInsert = await grabFormdata_v2({ formdata, myprops, model, mystate });

    if (Object.values(inInsert).length > 0) {

        let added = await plg_create_oprMod({ model, myprops, actionType: 'samestate', inInsert })



        if (added.payload.position < mystate.localStorage.form.formdata.position.config.options.length) {


            if (poliglot) {

                Object.assign(inQuery,
                    {
                        country: { "$eq": added.payload.country },
                        language: { "$eq": added.payload.language },
                    }
                )
            }

            Object.assign(inQuery,
                {
                    _id: { "$ne": added.payload._id },
                    position: { "$gte": added.payload.position },
                }
            )

            inOperator = {
                "$inc": { position: 1 }
            }

            await plg_updateMany({ model, myprops: myprops, actionType: 'samestate', inQuery, inOperator })
        }

        added = await runPostCreateActionsfromState({ formdata, myprops, model, mystate, added });


        return added
    } else {
        return null
    }
}

export async function submitFuncs_fullSubmit({ myprops = null, model = null, mystate = null, current = null, prospect = null, source_lg = null, target_lg = null, language = null, country = null }) {
    let addedtranslated = null

    let merger = await submitFuncs_combineTranslateFields({ source_lg, target_lg, current, myprops, mystate })
    if (merger.combinedTranslation) {

        addedtranslated = await preinputFuncs_formatData_Add({ combinedTranslation: merger.combinedTranslation, language, country, current, prospect, model, myprops, mystate, source_lg, target_lg })
        /* Once the translation is created, create Translated Tags, do it last to maintain proper position */
        if (model === 'taxonomy') {

            let result
            let tagArray = ['tagparent', 'tagchild']

            for (let tagcontainer of tagArray) {

                result = await taxoFuncs_setTaxonomyTags_v2({ insert: addedtranslated.payload, current, source_lg, target_lg, language, country, model, myprops, mystate, key: tagcontainer })
            }

            if (result) {
                addedtranslated = result
            }
        }

    } else {
        setTimeout(async () => {

           let inQuery = { type: { "$eq": 'custom' } }

           let inOperator = {
                "$set": { text: merger.output.result }
            }
                await plg_updateOne_queMod_oprMod({ model: 'message', myprops, actionType: 'detail', inQuery, inOperator })

            }, 2000)
    }

    return addedtranslated

    // END IF TRANSLATION SUCCESS
}

export async function submitFuncs_combineTranslateFields({ source_lg = null, target_lg = null, myprops = null, mystate = null, current = null }) {
    let inQuery

    inQuery = { name: { "$eq": myprops.mysite.CurrentMysite.translation_engine } }
    let engine = await plg_findOne_QueMod({ model: 'transengine', myprops, actionType: 'samestate', inQuery })

    let combinedTranslation = []
    let translationValid = true;
    let output

    for (let value of mystate.localStorage.linguistic.translate) {

        output = await runtranslation({ source_lg, target_lg, content: current[value], myprops, engine: engine.payload })
        translationValid = output.Success && translationValid

        combinedTranslation = [...combinedTranslation, { output, field: value }]
    }


    if (translationValid) {
        return { combinedTranslation, output }
    } else {
        return { combinedTranslation: null, output }
    }
}

export async function submitFuncs_saveUpdate_v1({ myprops = null, mystate = null, model = null, current = null, poliglot = null }) {
    let inQuery
    let inOperator
    let inParams

    let formdata = { ...mystate.localStorage.form.formdata }

    let dataToSubmit = await grabFormdata_v2({ formdata, myprops, model, current });

    inQuery = { _id: { "$eq": myprops.match.params.id } }
    inOperator = { '$set': dataToSubmit }
    inParams = { new: true }

    let updated = await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'detail', inQuery, inOperator, inParams, populate: mystate.localStorage.qhelpers.populate })

    await reposFuncs_soloPositionSwap({ model, myprops, current, updated, poliglot })

    updated = await runPostCreateActionsfromState({ formdata, myprops, model, mystate, added: updated, current });

    return { dataToSubmit, updated }
}


export async function submitFuncs_syncEditImages({ detail = null, myprops = null, dataToSubmit = null, model = null, mystate = null, current = null }) {

    let inQuery
    let inOperator
    let inParams

    if (detail.lgbinder !== '') {

        inQuery = {
            _id: { "$ne": detail._id },
            lgbinder: { "$eq": detail.lgbinder }
        }

        let lglist = await plg_findMany({ mystate, model, myprops, actionType: 'samestate', inQuery })

        for (const item of Object.values(lglist.payload)) {

            inQuery = {
                country: { "$eq": item.country },
                language: { "$eq": item.language },
                lgbinder: { "$eq": detail.lgbinder }
            }
            inOperator = { '$set': { images: dataToSubmit } }
            inParams = { new: true }

            await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })

        }
    }
}
