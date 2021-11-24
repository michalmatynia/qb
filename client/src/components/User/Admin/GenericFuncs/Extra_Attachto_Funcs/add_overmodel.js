import {
    plg_findMany,
    plg_updateOne_queMod_oprMod,
    plg_findOne_QueMod,
    plg_updateMany
} from '../../../../utils/Plugs/cms_plugs';

export async function add_overModel_Edit_vh2({
    attachtobinder,
    updated,
    translate,
    dispatch,
    model,
    submodel,
    atadded
}) {
    let inQuery
    let inOperator


                if (translate) {
                    inQuery = {}
                    let lglist = await plg_findMany({ model: 'language', dispatch, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })

                    for (const eachlg of lglist.payload) {

                        /* find  brick in this language */
                        inQuery = {}
                        Object.assign(inQuery, {
                            language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                            country: { "$eq": eachlg.referenceID.alpha2Code },
                            lgbinder: { "$eq": atadded.lgbinder }
                        });

                        let lgbound_attachee = await plg_findOne_QueMod({ model, dispatch, actionType: 'samestate', inQuery })
                        if (lgbound_attachee.payload !== '') {
                            /* find a slide in this language */

                            inQuery = {}
                            Object.assign(inQuery, {
                                language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                                country: { "$eq": eachlg.referenceID.alpha2Code },
                                lgbinder: { "$eq": updated.lgbinder }
                            });
                            let lgbound_grab = await plg_findOne_QueMod({ model: submodel, dispatch, actionType: 'samestate', inQuery })

                            if (lgbound_grab.payload !== '') {
                                /* Prepare arrayofrefs formula */
                                let refs_formula_lgbound = {
                                    model: submodel,
                                    position: lgbound_attachee.payload[attachtobinder].length + 1,
                                    referenceID: lgbound_grab.payload._id,
                                    visible: lgbound_grab.payload.visible
                                }
                                let lgbound_newChecked = [...lgbound_attachee.payload[attachtobinder]]

                                lgbound_newChecked.push(refs_formula_lgbound)

                                inQuery = { _id: { "$eq": lgbound_attachee.payload._id }, }
                                inOperator = { '$set': { [attachtobinder]: lgbound_newChecked } }


                                await plg_updateOne_queMod_oprMod({ model, dispatch, actionType: 'samestate', inQuery, inOperator })

                            }

                        }

                    }

                } else {



                    let refs_formula = {
                        model: submodel,
                        position: atadded[attachtobinder].length + 1,
                        referenceID: updated._id,
                        visible: updated.visible
                    }
                    let newChecked = [...atadded[attachtobinder]]

                    newChecked.push(refs_formula)

                    if (submodel === 'blockstyle' && atadded.lgbinder !== '') {
                        inQuery = {
                            lgbinder: { "$eq": atadded.lgbinder },
                        }

                    } else {

                        inQuery = { _id: { "$eq": atadded._id }, }

                    }


                    await plg_findMany({ model, dispatch, actionType: 'samestate', inQuery })

                    inOperator = { '$set': { [attachtobinder]: newChecked } }

                    await plg_updateMany({ model, dispatch, actionType: 'samestate', inQuery, inOperator })
                }

        }
