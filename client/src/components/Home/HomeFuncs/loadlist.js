import {
    plg_findMany,
} from '../../utils/Plugs/cms_plugs'

import { modelPopulate } from '../../User/Admin/ActionFunctions/modelPopulate'

async function processBricks({ bricks, dispatch, currencyuser, current_mysite, localeuser }) {
    let submodel_collection = ['slide', 'product', 'view']
    let inQuery
    let brickNewChecked = []
    let sectionNew = []
    let newlist

    for (let eachbrick of bricks) {

        for (let submodel of submodel_collection) {
            let filteredsubs = eachbrick['checked'].filter(sub => sub.model === submodel)
            if (filteredsubs.length > 0) {
                let mySublgbinder = filteredsubs.map(a => a.referenceID)
                inQuery = { _id: { "$in": mySublgbinder } }

                // Extract Slides / Products
                let translatedSub
                let populate = await modelPopulate({ model: submodel })

                translatedSub = await plg_findMany({ model: submodel, dispatch, actionType: 'samestate', inQuery, populate })

                if (submodel === 'product' && current_mysite.default_language.referenceID._id !== localeuser.referenceID._id) {
                    let extract_lgbinder = translatedSub.payload.map(item => item.lgbinder)

                    inQuery = {}
                    Object.assign(inQuery, {
                        country: { "$eq": current_mysite.default_language.referenceID.alpha2Code },
                        language: { "$eq": current_mysite.default_language.referenceID.languages[0].iso639_1 },
                        lgbinder: { "$in": extract_lgbinder }
                    });

                    let root_product = await plg_findMany({ model: 'product', dispatch, actionType: 'samestate', inQuery })

                    newlist = translatedSub.payload.map((item) => {

                        let foundIndex = root_product.payload.findIndex((each) => { return item.lgbinder === each.lgbinder })

                        if (foundIndex !== -1) {

                            let convertedPrice = root_product.payload[foundIndex].price / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
                            let decimalPrice = Math.round((convertedPrice + Number.EPSILON) * 100) / 100

                            item.price = decimalPrice

                        }

                        return item

                    });
                } else {
                    newlist = [...translatedSub.payload]
                }

                for (let rootvalue of newlist) {


                    let foundIndexToPopulate = eachbrick['checked'].findIndex((item) => { return item.referenceID === rootvalue._id })

                    if (foundIndexToPopulate !== -1) {

                        brickNewChecked.push(
                            {
                                model: submodel,
                                position: eachbrick['checked'][foundIndexToPopulate].position,
                                referenceID: rootvalue,
                                visible: eachbrick['checked'][foundIndexToPopulate].visible
                            }
                        )
                    }

                }

            }
        }


        brickNewChecked.sort(function (a, b) {
            return a.position - b.position;
        });
        eachbrick['checked'] = brickNewChecked
        brickNewChecked = []
        sectionNew.push(eachbrick)
    }

    // RESULT SHOULD BE AN ARRAY OF POPULATED BRICKS

    return sectionNew
}
export async function loadList_v3({ currentdetailpage = null, dispatch, localeuser = null, current_mysite = null, currencyuser = null }) {

    if (currentdetailpage.checked.length > 0) {

        let inQuery = {}
        let newChecked = []
        let brickNewChecked = []
        let populatedSections = []

        let get_models = currentdetailpage['checked'].map(a => a.model)
        /* remove duplicates */
        let subpage_models = [...new Set(get_models)]; // ES6 method


        for (let each_subpage_model of subpage_models) {

            let extract_model_ids = currentdetailpage['checked'].reduce((accum, currentValue) => {
                return each_subpage_model === currentValue.model ? [...accum, currentValue.referenceID] : accum
            }, [])

            inQuery = {
                _id: { "$in": extract_model_ids }
            }

            let populate
            if (each_subpage_model === 'brick') {
            populate = [ {
                path: 'blockstyle', populate: {
                  path: 'referenceID',
                  model: 'Blockstyle'
                }
              }]
            }

            let found_sections = await plg_findMany({ model: each_subpage_model, dispatch, actionType: 'samestate', inQuery, populate })

            if (each_subpage_model === 'brick') {

                // Here all the standard bricks should be populated
                let populatedBricks = await processBricks({ bricks: found_sections.payload, brickNewChecked, dispatch, currencyuser, current_mysite, localeuser })

                populatedSections.push(populatedBricks)

                // result should be array of bricks
            } else {

                // Here static bricks should be populated
                populatedSections.push(found_sections.payload)
            }
        }

        for (let eachsection of populatedSections) {

            for (let subsection of eachsection) {

                let foundIndexToPopulate = currentdetailpage['checked'].findIndex((item) => { return item.referenceID === subsection._id })


                if (foundIndexToPopulate !== -1) {

                    newChecked.push(
                        {
                            model: currentdetailpage['checked'][foundIndexToPopulate].model,
                            position: currentdetailpage['checked'][foundIndexToPopulate].position,
                            referenceID: subsection,
                            visible: currentdetailpage['checked'][foundIndexToPopulate].visible
                        }
                    )
                }
            }
        }

        newChecked.sort(function (a, b) {
            return a.position - b.position;
        });

        return newChecked

    } else {
        return []
    }

}