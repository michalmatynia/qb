import {
    plg_findMany,
    plg_findOne_QueMod
} from '../../../utils/Plugs/cms_plugs';

export async function actionFuncs_recalculatePrice({ cell, fields = null, myprops = null }) {
    const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    if (myprops.user.localeUser.referenceID.alpha2Code !== myprops.mysite.CurrentMysite.default_language.referenceID.alpha2Code) {

        let inQuery = {
            country: { "$eq": myprops.mysite.CurrentMysite.default_language.referenceID.alpha2Code },
            language: { "$eq": myprops.mysite.CurrentMysite.default_language.referenceID.languages[0].iso639_1 },
            lgbinder: { "$eq": myprops[cellvalue.fillfields.value.fromconfig.model].detail.lgbinder }
        }

        let result = await plg_findOne_QueMod({ model: cellvalue.fillfields.value.fromconfig.model, myprops, actionType: 'samestate', inQuery })

        let convertedPrice = result.payload.price / myprops.user.currencyUser.deflgrates[myprops.mysite.CurrentMysite.default_language.referenceID.currencies[0].code] * Object.entries(myprops.user.currencyUser.rates)[0][1]
        let decimalPrice = Math.round((convertedPrice + Number.EPSILON) * 100) / 100

        return decimalPrice
    } else {
        return fields[cellkey]
    }
}
export async function actionFuncs_recalculateOnWall({ rootvalue, submodel = null, dispatch, current_mysite = null, currencyuser = null, localeuser = null }) {
   
    if (localeuser.referenceID.alpha2Code !== current_mysite.default_language.referenceID.alpha2Code) {

        let inQuery = {
            country: { "$eq": current_mysite.default_language.referenceID.alpha2Code },
            language: { "$eq": current_mysite.default_language.referenceID.languages[0].iso639_1 },
            lgbinder: { "$eq": rootvalue.lgbinder }
        }

        let result = await plg_findOne_QueMod({ model: submodel, dispatch, actionType: 'samestate', inQuery })

        let convertedPrice = result.payload.price / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
        let decimalPrice = Math.round((convertedPrice + Number.EPSILON) * 100) / 100

        return decimalPrice
    } else {
        return rootvalue.price
    }
}
export async function actionFuncs_recalculatePrice_v2({ root_products, dispatch, current_mysite = null, currencyuser = null, localeuser = null, inQuery = {} }) {

    let root_lgbinders = root_products.payload.map(a => a.lgbinder)

    // Slider Params grabbed

    Object.assign(inQuery, {
      country: { "$eq": localeuser.referenceID.alpha2Code },
      language: { "$eq": localeuser.referenceID.languages[0].iso639_1 },
      visible: true,
      lgbinder: { "$in": root_lgbinders }
    });

    let result_products = await plg_findMany({ model: 'product', dispatch, actionType: 'samestate', inQuery, populate: [{ path: 'category' }, { path: 'type' }] })

    // await actionFuncs_recalculatePrice_v2({ result_products, dispatch, current_mysite, currencyuser, localeuser })
    let recalculated_list = result_products.payload.map((item) => {

      let foundIndex = root_products.payload.findIndex((each) => { return item.lgbinder === each.lgbinder })

      if (foundIndex !== -1) {

        let convertedPrice = root_products.payload[foundIndex].price / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
        let decimalPrice = Math.round((convertedPrice + Number.EPSILON) * 100) / 100

        item.price = decimalPrice
      }

      return item

    });

    return { recalculated_list }

}