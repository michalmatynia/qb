export async function actionFuncs_recalculatePriceLowHigh({ root_products, dispatch, current_mysite = null, currencyuser = null, localeuser = null, inQuery = {} }) {






    // let root_lgbinders = root_products.payload.map(a => a.lgbinder)

    // // Slider Params grabbed

    // Object.assign(inQuery, {
    //   country: { "$eq": localeuser.referenceID.alpha2Code },
    //   language: { "$eq": localeuser.referenceID.languages[0].iso639_1 },
    //   visible: true,
    //   lgbinder: { "$in": root_lgbinders }
    // });

    // let result_products = await plg_findMany({ model: 'product', dispatch, actionType: 'samestate', inQuery, populate: [{ path: 'category' }, { path: 'type' }] })

    // // await actionFuncs_recalculatePrice_v2({ result_products, dispatch, current_mysite, currencyuser, localeuser })
    // let recalculated_list = result_products.payload.map((item) => {

    //   let foundIndex = root_products.payload.findIndex((each) => { return item.lgbinder === each.lgbinder })

    //   if (foundIndex !== -1) {

    //     let convertedPrice = root_products.payload[foundIndex].price / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
    //     let decimalPrice = Math.round((convertedPrice + Number.EPSILON) * 100) / 100

    //     item.price = decimalPrice
    //   }

    //   return item

    // });

    // return { recalculated_list }

}