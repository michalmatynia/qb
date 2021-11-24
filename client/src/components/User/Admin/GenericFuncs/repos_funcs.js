import {
    plg_findMany,
    plg_countDocuments,
    plg_findOne_QueMod,
    plg_updateOne_queMod_oprMod,
    plg_updateMany
} from '../../../utils/Plugs/cms_plugs';

export async function reposFuncs_soloPositionSwap({ model, myprops = null, current = null, updated = null, poliglot = null }) {

    let inQuery
    let inOperator
    let inParams

    if (updated.payload.position !== current.position) {


        inQuery = {
            _id: { "$ne": updated.payload._id },
            position: { "$eq": updated.payload.position },
        }

        if (poliglot) {

            Object.assign(inQuery, {
                country: { "$eq": updated.payload.country },
                language: { "$eq": updated.payload.language },
            })

        }

        inOperator = {
            "$set": { position: current.position }
        }

        await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })

    }
}

export async function reposFuncs_syncPositionAcross({ model, myprops = null, current = null, updated = null, country = null, language = null }) {

    let inQuery
    let inOperator
    let inParams

    if (updated.payload.position !== current.position || updated.payload.visible !== current.visible) {
        inQuery = {
            country: { "$eq": country },
            language: { "$eq": language },
        }

        let count = await plg_countDocuments({ model, myprops, actionType: 'samestate', inQuery })

        inQuery = {
            country: { "$eq": country },
            language: { "$eq": language },
            lgbinder: { "$eq": updated.payload.lgbinder }
        }
        inParams = { new: false }

        let newPosition

        if (updated.payload.position > count.payload) {
            inOperator = {
                "$set": { position: count.payload, visible: updated.payload.visible },
            }

            newPosition = count.payload
        } else {
            inOperator = {
                "$set": { position: updated.payload.position, visible: updated.payload.visible }
            }

            newPosition = updated.payload.position
        }

        // SWAP Position Sync across languages
        let lgbupdated = await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })

        // If it's not about a position but only visible
        if (lgbupdated.payload !== '') {

            inQuery = {
                _id: { "$ne": lgbupdated.payload._id },
                country: { "$eq": country },
                language: { "$eq": language },
                position: { "$eq": newPosition },
            }

            inOperator = {
                "$set": { position: lgbupdated.payload.position }
            }

            await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })
        }

    }
}
export async function reposFuncs_ChangePosition({ item = null, direction = null, model = null, mystate = null, myprops = null, poliglot = null }) {
    let inQuery
    let inOperator
    let inParams

    if (poliglot) {
        inQuery = {
            country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
            language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
        }
    }
    let allitems = await plg_countDocuments({ model, myprops, actionType: 'samestate', inQuery })

    let targetresponse
    let endgameresponse
    let samepositem
    let countwithlgbinder

    // BEGIN POSITION SWAP
    inQuery = { _id: { "$eq": item._id } }
    let target = await plg_findOne_QueMod({ model, actionType: 'samestate', myprops, inQuery })

    if (
        target.payload.position + direction <= allitems.payload && target.payload.position + direction > 0
    ) {


        inQuery = { _id: { "$eq": item._id } }
        inOperator = { '$set': { position: target.payload.position + direction } }
        inParams = { new: true }

        targetresponse = await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inQuery, inOperator, inParams })

        inQuery = {
            _id: { "$nin": item._id },
            position: targetresponse.payload.position
        }

        if (poliglot) {
            Object.assign(inQuery,
                {
                    country: { "$eq": targetresponse.payload.country },
                    language: { "$eq": targetresponse.payload.language }
                }
            )
        }

        inOperator = { '$set': { 'position': target.payload.position } }
        inParams = { new: true }

        endgameresponse = await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inQuery, inOperator })

        if (poliglot) {

            if (target.payload.lgbinder) {

                inQuery = {
                    _id: { "$nin": item._id },
                    lgbinder: { "$eq": target.payload.lgbinder }
                }

                let otherlanguages = await plg_findMany({ mystate, model, myprops, actionType: 'samestate', inQuery })

                for (const value of Object.values(otherlanguages.payload)) {

                    let inQuery = {
                        country: { "$eq": value.country },
                        language: { "$eq": value.language },
                    }

                    countwithlgbinder = await plg_countDocuments({ model, myprops, actionType: 'samestate', inQuery })

                    if (
                        value.position + direction <= countwithlgbinder.payload && value.position + direction > 0
                    ) {

                        // SHORTHAND SWAP BEGIN SOURCE
                        if ('lgbinder' in endgameresponse.payload && endgameresponse.payload.lgbinder !== '') {

                            inQuery = {
                                lgbinder: { "$eq": endgameresponse.payload.lgbinder },
                                country: { "$eq": value.country },
                                language: { "$eq": value.language },
                            }

                            samepositem = await plg_findOne_QueMod({ model, myprops, actionType: 'samestate', inQuery })

                        } else {
                            samepositem = null
                        }

                        if (samepositem && samepositem.payload !== '') {
                            inOperator = { '$set': { position: samepositem.payload.position } }
                        } else {
                            inOperator = { '$set': { position: value.position + direction } }
                        }

                        inQuery = { _id: { "$eq": value._id } }
                        inParams = { new: true }

                        let lgbtargetresponse = await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inQuery, inOperator, inParams })

                        // SHORTHAND SWAP BEGIN TARGET
                        if (samepositem && samepositem.payload !== '') {

                            inQuery = {
                                _id: { "$nin": value._id },
                                country: { "$eq": value.country },
                                language: { "$eq": value.language },
                                position: samepositem.payload.position
                            }
                        } else {

                            inQuery = {
                                _id: { "$nin": value._id },
                                country: { "$eq": value.country },
                                language: { "$eq": value.language },
                                position: lgbtargetresponse.payload.position
                            }
                        }

                        inOperator = { '$set': { 'position': value.position } }
                        await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', myprops, inQuery, inOperator })

                    }
                }
            }
        }
    }
}
export async function reposFuncs_UpdatePosition({ myprops = null, country = null, language = null, removed = null, model = null, mystate = null, poliglot = null }) {
    let inQuery
    let inOperator

    if (poliglot) {
        inQuery = {
            country: { "$eq": country },
            language: { "$eq": language },
        }
    }

    let count = await plg_countDocuments({ model, myprops, actionType: 'samestate', inQuery })

    if (removed.payload.position <= count.payload) {

        if (poliglot) {
            inQuery = {
                _id: { "$ne": removed.payload._id },
                country: { "$eq": removed.payload.country },
                language: { "$eq": removed.payload.language },
                position: { "$gte": removed.payload.position },
            }
        } else {
            inQuery = {
                _id: { "$ne": removed.payload._id },
                position: { "$gte": removed.payload.position },
            }
        }
        inOperator = {
            "$inc": { position: -1 }
        }

        await plg_updateMany({ model, myprops, actionType: 'samestate', inQuery, inOperator })
    }
}
export async function reposFuncs_whenAdded({ myprops = null, country = null, language = null, added = null, model = null, poliglot = null }) {
    let inQuery
    let inOperator

    if (poliglot) {
        inQuery = {
            country: { "$eq": country },
            language: { "$eq": language },
        }
    }

    let count = await plg_countDocuments({ model, myprops, actionType: 'samestate', inQuery })

    //3

    if (added.payload.position < count.payload) {
        inQuery = {
            _id: { "$ne": added.payload._id },
            position: { "$gte": added.payload.position },
        }

        if (poliglot) {
            Object.assign(inQuery, {
                country: { "$eq": added.payload.country },
                language: { "$eq": added.payload.language }
            });
        }

        inOperator = {
            "$inc": { position: 1 }
        }

        await plg_updateMany({ model, myprops, actionType: 'samestate', inQuery, inOperator })
    }
}