import {
    plg_countDocuments,
    plg_updateOne_queMod_oprMod,
    plg_removeOne,
    plg_removeFile_Cloudinary_v2,
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';
import {
    taxoFuncs_removeSubtags_v2
} from './taxo_funcs'
import {
    reposFuncs_UpdatePosition
} from './repos_funcs'
import {
    brickFuncs_removeBrickSubs
} from './brick_funcs'

export async function removeFuncs_delEntityFromDb_v2({
    item = null,
    removeall = null,
    model = null,
    mystate = null,
    myprops = null,
    poliglot = null
}) {

    let inQuery
    let response
    let removed

    // BEGIN MULTILANGUAGE REMOVE
    if (removeall && poliglot) {

        // In case you click removeAll, but it's the last entity in this language
        if (item.lgbinder === '') {
            inQuery = { _id: { "$eq": item._id } }
        } else {
            inQuery = { lgbinder: { "$eq": item.lgbinder }, }
        }

        response = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery })

        for (const value of Object.values(response.payload)) {

            inQuery = { _id: { "$eq": value._id } }
            removed = await plg_removeOne({ model, myprops, actionType: 'samestate', inQuery })

            await reposFuncs_UpdatePosition({ myprops, country: value.country, language: value.language, removed, model, mystate, poliglot })

            if (model === 'taxonomy') {
                await taxoFuncs_removeSubtags_v2({ myprops, removed, model, mystate })
            }
            if (model === 'product' || model === 'slide') {
                await brickFuncs_removeBrickSubs({ myprops, removed: removed.payload, model })

            }
            // ------END OF LANGUAGE LOOP
        }

        // Remove image in Remove All but outside loop, because ALL images are removed anyways
        await removeFuncs_CloudinaryImages({ myprops, removed, model, mystate })

    } else {
        // REMOVE INDIVIDUAL

        // Clear lgbinder if it's the last instance and remove Images from CLoudinary
        if (!removeall && poliglot) {

            inQuery = { _id: { "$eq": item._id } }
            removed = await plg_removeOne({ model, myprops, actionType: 'samestate', inQuery })
            if (removed.payload.lgbinder !== '') {
                await removeFuncs_SyncLgbinder({ myprops, removed, model, mystate })
            } else {
                await removeFuncs_CloudinaryImages({ myprops, removed, model, mystate })
            }
            if (removed.payload.position) {
                await reposFuncs_UpdatePosition({ myprops, country: myprops.user.localeUser.referenceID.alpha2Code, language: myprops.user.localeUser.referenceID.languages[0].iso639_1, removed, model, mystate, poliglot })
            }

        } else if (model && !poliglot) {

            inQuery = { _id: { "$eq": item._id } }
            removed = await plg_removeOne({ model, myprops, actionType: 'samestate', inQuery, populate: mystate.localStorage.qhelpers.populate })

            if (removed.payload !== '') {

                if (model === 'language') {
                    await removeFuncs_languageContent_v2({ model, removed: removed.payload, mystate, myprops })
                }

                await reposFuncs_UpdatePosition({ myprops, removed, model, mystate, poliglot })

            }
        }

        if (model === 'taxonomy') {
            await taxoFuncs_removeSubtags_v2({ myprops, removed, model, mystate })
        }
        if (model === 'product' || model === 'slide') {
            await brickFuncs_removeBrickSubs({ myprops, removed: removed.payload, model })

        }
    }


}

export async function removeFuncs_CloudinaryImages({ myprops = null, removed = null, model = null, mystate = null }) {
    if ('images' in removed.payload && removed.payload.images.length > 0) {
        for (const image of Object.values(removed.payload.images)) {

            await plg_removeFile_Cloudinary_v2({ model, myprops, dataToSubmit: image.public_id, actionType: 'samestate' })

        }
    }
}
export async function removeFuncs_SyncLgbinder({ myprops = null, removed = null, model = null, mystate = null }) {
    let inQuery
    let inOperator

    inQuery = {
        lgbinder: { "$eq": removed.payload.lgbinder }
    }

    let countwithlgbinder = await plg_countDocuments({ model, myprops, actionType: 'samestate', inQuery })

    if (countwithlgbinder.payload === 1) {

        inQuery = {
            lgbinder: { "$eq": removed.payload.lgbinder }
        }
        inOperator = { '$set': { lgbinder: '' } }

        await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator })
    }
}

// Remove Language Content =============
export async function removeFuncs_languageContent_v2({ model = null, inInsert = null, removed = null, mystate = null, myprops = null }) {
    let inQuery
    let inOperator
    let populate = mystate.localStorage.qhelpers.populate

    let modelArray = mystate.localStorage.linguistic.modelArray
    for (let eachid of removed) {

        inQuery = {
            referenceID: { "$eq": eachid },
        }


        let removedlg = await plg_removeOne({ model, myprops, actionType: 'samestate', inQuery, populate })
        if (removedlg.payload.position) {
            await reposFuncs_UpdatePosition({ myprops, removed: removedlg, model, mystate })
        }


        for (const modelvalue of modelArray) {
            inQuery = {
                country: { "$eq": removedlg.payload.referenceID.alpha2Code },
                language: { "$eq": removedlg.payload.referenceID.languages[0].iso639_1 },
            }
            let contentinlg = await plg_findMany({ model: modelvalue, actionType: 'samestate', myprops, inQuery })
            for (const rootcontent of Object.values(contentinlg.payload)) {

                inQuery = { _id: { "$eq": rootcontent._id } }

                let removedcontent = await plg_removeOne({ model: modelvalue, myprops, actionType: 'samestate', inQuery })

                if (modelvalue === 'product' || modelvalue === 'slide') {
                    await brickFuncs_removeBrickSubs({ myprops, removed: removedcontent, model: modelvalue })

                }

                if (removedcontent.payload.lgbinder !== '') {
                    inQuery = { lgbinder: { "$eq": removedcontent.payload.lgbinder } }
                    let countwithlgbinder = await plg_countDocuments({ model: modelvalue, myprops, actionType: 'samestate', inQuery })

                    if (countwithlgbinder.payload === 1) {

                        inQuery = {
                            lgbinder: { "$eq": removedcontent.payload.lgbinder }
                        }
                        inOperator = { '$set': { lgbinder: '' } }

                        await plg_updateOne_queMod_oprMod({ model: modelvalue, myprops, actionType: 'samestate', inQuery, inOperator })
                    }
                } else {

                    if (removedcontent.payload.images.length > 0) {
                        for (const image of Object.values(removedcontent.payload.images)) {
                            await plg_removeFile_Cloudinary_v2({ model: modelvalue, myprops, dataToSubmit: image.public_id, actionType: 'samestate' })
                        }
                    }
                }
            } // END Remove language content
        }
        /// HERE
    }

}