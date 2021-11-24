/* Refine based on database */

  // React.useEffect(() => {
  //   async function refineProductsNonRoot({ left_price, right_price }) {

  //     let inQuery = {}

  //     let deconverted_price_min = Math.floor(left_price * currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] / Object.entries(currencyuser.rates)[0][1])
  //     let deconverted_price_max = Math.round(right_price * currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] / Object.entries(currencyuser.rates)[0][1])

  //     Object.assign(inQuery, {
  //       country: { "$eq": current_mysite.default_language.referenceID.alpha2Code },
  //       language: { "$eq": current_mysite.default_language.referenceID.languages[0].iso639_1 },
  //       visible: true,
  //       price: { "$gte": deconverted_price_min, "$lte": deconverted_price_max }

  //     });

  //     let root_products = await plg_findMany({ model: 'product', dispatch, actionType: 'samestate', inQuery, populate: [{ path: 'category' }, { path: 'type' }] })


  //     // Prepare query for Taxonomy
  //     inQuery = {}

  //     if (checkedCategoryTaxo.length > 0) {
  //       let checked_catetaxo_id_arr = checkedCategoryTaxo.map(item => item._id)

  //       Object.assign(inQuery, {
  //         category: { "$in": checked_catetaxo_id_arr },
  //       });
  //     }

  //     if (checkedTypeTaxo.length > 0) {
  //       let checked_typetaxo_id_arr = checkedTypeTaxo.map(item => item._id)

  //       Object.assign(inQuery, {
  //         type: { "$in": checked_typetaxo_id_arr },
  //       });
  //     }

  //     let result = await actionFuncs_recalculatePrice_v2({ root_products, dispatch, current_mysite, currencyuser, localeuser, inQuery })

  //     await dispatch(act_injectProp({ dataToSubmit: result.recalculated_list, model: 'product', actionType: 'list' }))

  //   }

  //   async function refineProducts({ left_price, right_price }) {
  //     let inQuery = {}
  //     Object.assign(inQuery, {
  //       country: { "$eq": localeuser.referenceID.alpha2Code },
  //       language: { "$eq": localeuser.referenceID.languages[0].iso639_1 },
  //       visible: true,
  //       price: { "$gte": left_price, "$lte": right_price }
  //     });

  //     if (checkedCategoryTaxo.length > 0) {
  //       let checked_catetaxo_id_arr = checkedCategoryTaxo.map(item => item._id)

  //       Object.assign(inQuery, {
  //         // category: { "$elemMatch": { _id: { "$in": checked_catetaxo_id_arr } } }
  //         category: { "$in": checked_catetaxo_id_arr },
  //       });
  //     }
  //     if (checkedTypeTaxo.length > 0) {
  //       let checked_typetaxo_id_arr = checkedTypeTaxo.map(item => item._id)

  //       Object.assign(inQuery, {
  //         // category: { "$elemMatch": { _id: { "$in": checked_catetaxo_id_arr } } }
  //         type: { "$in": checked_typetaxo_id_arr },
  //       });
  //     }
  //     await plg_findMany({ model: 'product', dispatch, actionType: 'list', inQuery, populate: [{ path: 'category' }, { path: 'type' }] })
  //   }

  //   if (document
  //     .getElementById("sliderRegular")
  //     .classList.contains("noUi-target")
  //     && priceRange
  //   ) {

  //     if (
  //       current_mysite.default_language.referenceID.alpha2Code !== localeuser.referenceID.alpha2Code
  //       && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
  //     ) {
  //       refineProductsNonRoot({ left_price: priceRange[0], right_price: priceRange[1] })

  //     } else {
  //       refineProducts({ left_price: priceRange[0], right_price: priceRange[1] })

  //     }

  //   }

  // }, [checkedCategoryTaxo, checkedTypeTaxo, currencyuser, current_mysite, dispatch, localeuser, priceRange])

  // =====================