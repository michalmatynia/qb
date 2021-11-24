import {
    plg_findMany,
    plg_updateOne_queMod_oprMod,
    plg_findOne_QueMod,
    plg_updateMany
} from '../../../../utils/Plugs/cms_plugs';

export async function remove_overModel_Edit_vh2({
    attachtobinder,
    updated,
    translate,
    dispatch,
    model,
    submodel,
    atremoved
}){

    let inQuery
    let inOperator
    let inParams

    if (translate) {

        inQuery = {}

        let lglist = await plg_findMany({ model: 'language', dispatch, actionType: 'samestate', inQuery, populate: [{ path: 'referenceID' }] })

        for (const eachlg of lglist.payload) {
            /* find brick in this language */
            inQuery = {}
            Object.assign(inQuery, {
                language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                country: { "$eq": eachlg.referenceID.alpha2Code },
                lgbinder: { "$eq": atremoved.lgbinder }
            });

            let lgbound_overmod = await plg_findOne_QueMod({ model, dispatch, actionType: 'samestate', inQuery })

            if (lgbound_overmod.payload !== '') {

                inQuery = {}
                Object.assign(inQuery, {
                    language: { "$eq": eachlg.referenceID.languages[0].iso639_1 },
                    country: { "$eq": eachlg.referenceID.alpha2Code },
                    lgbinder: { "$eq": updated.lgbinder }
                });
                let lgbound_undermod = await plg_findOne_QueMod({ model: submodel, dispatch, actionType: 'samestate', inQuery })


                if (lgbound_undermod.payload !== '') {
                    let counter = 1
                    let newChecked = [...lgbound_overmod.payload[attachtobinder]]
                    newChecked.sort(function (a, b) {
                        return a.position - b.position;
                    });
                    newChecked = newChecked.reduce((accum, currentvalue, CurrentIndex) => {

                        if (currentvalue.referenceID !== lgbound_undermod.payload._id) {

                            accum = [...accum, { model: currentvalue.model, referenceID: currentvalue.referenceID, position: counter, visible: currentvalue.visible }]
                            counter++

                        } else { accum = [...accum] }

                        return accum

                    }, []);

                    inQuery = {
                        _id: { "$eq": lgbound_overmod.payload._id },
                    }
                    inOperator = {
                        "$set": { [attachtobinder]: newChecked }
                    }

                    await plg_updateOne_queMod_oprMod({ model, dispatch, actionType: 'samestate', inQuery, inOperator, inParams })

                }

            }

        }
    } else {

        let counter = 1
        let newChecked = [...atremoved[attachtobinder]]
        newChecked.sort(function (a, b) {
            return a.position - b.position;
        });

        newChecked = newChecked.reduce((accum, currentvalue, CurrentIndex) => {

            if (currentvalue.referenceID !== updated._id) {

                accum = [...accum, { model: currentvalue.model, referenceID: currentvalue.referenceID, position: counter, visible: currentvalue.visible }]
                counter++

            } else { accum = [...accum] }

            return accum

        }, []);

        if (atremoved.lgbinder !== '') {
            inQuery = {
                lgbinder: { "$eq": atremoved.lgbinder },
            }
        } else {
            inQuery = {
                _id: { "$eq": atremoved._id },
            }
        }

        inOperator = {
            "$set": { [attachtobinder]: newChecked }
        }


        await plg_updateMany({ model, dispatch, actionType: 'samestate', inQuery, inOperator, inParams })


    }
}