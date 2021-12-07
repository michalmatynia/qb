import React, { useCallback } from "react";
// nodejs library that concatenates classes
import cx from "classnames";

// plugin that creates slider
import FCEachProduct from "./FCGridItem";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui icons
// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// core components

import GridContainer from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Button from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import {
  plg_clearProps,
  plg_findMany,
  plg_aggregate
} from '../../../../../../components/utils/Plugs/cms_plugs';
import FCEcommercePanel from "./FCEcommercePanel";
import { actionFuncs_recalculatePrice_v2 } from '../../../../../../components/User/Admin/ActionFunctions/recalculatePrice'

import styles from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/productStyle.js";
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(styles);

export default function SectionProducts() {
  const dispatch = useDispatch()

  const fc_state = {
    localStorage: {
      viewparams: {
        limit: 6,
        skip: 0,
        size: 0,
        sortBy: 'position',
        sortOrder: 1,
      },
    }
  }

  const [myFcState, setFcState] = React.useState(fc_state);

  const [viewingList, setViewingList] = React.useState();

  // let taxonomy_list = useSelector(state => state.taxonomy.list)
  // let reduxprops = useSelector(state => state)
  let localeuser = useSelector(state => state.user.localeUser)
  let currencyuser = useSelector(state => state.user.currencyUser)
  let current_mysite = useSelector(state => state.mysite.CurrentMysite)
  let product_list = useSelector(state => state.product.list)
  let redux_currentmystore = useSelector(state => state.mystore.CurrentMystore)
  let redux_overtheme_mysite = useSelector(state => state.mysite.OverthemeMysite)


  const [isLoading, setIsLoading] = React.useState(true);
  const [isMystore, setIsMystore] = React.useState();



  const [parentCheckedCategoryTaxo, setParentCheckedCategoryTaxo] = React.useState();
  const [parentCheckedTypeTaxo, setParentCheckedTypeTaxo] = React.useState();
  const [isLocalUser, setLocalUser] = React.useState();
  const [parentPriceRange, setParentPriceRange] = React.useState();
  const [isRefreshChild, setRefreshChild] = React.useState();

  const classes = useStyles({ overtheme: redux_overtheme_mysite });

  const loadPrice = useCallback(async ({ looproducts }) => {

    // // Viewparams and limits have to be carried out on a SUM array of products

    let priceArray = looproducts.map(a => a.price)
    const price_min = Math.min(...priceArray)
    const price_max = Math.max(...priceArray)

    return { floor_price_min: Math.floor(price_min), round_price_max: Math.round(price_max) }



  }, [])
  // const lgchangeLoadProducts = useCallback(async (item) => {
  //   console.log('load products');


  //   let inQuery = {}

  //   // if (current_mysite.default_language.referenceID.alpha2Code !== localeuser.referenceID.alpha2Code
  //   // ) {


  //     Object.assign(inQuery, {
  //       country: { "$eq": current_mysite.default_language.referenceID.alpha2Code },
  //       language: { "$eq": current_mysite.default_language.referenceID.languages[0].iso639_1 },
  //       visible: true,
  //     });

  //     let root_products = await plg_findMany({ model: 'product', dispatch, actionType: 'samestate', inQuery })

  //     let priceArray = root_products.payload.map(a => a.price)
  //     const price_min = Math.min(...priceArray)
  //     const price_max = Math.max(...priceArray)

  //     let converted_price_min = price_min / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
  //     let converted_price_max = price_max / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]

  //     let result = await actionFuncs_recalculatePrice_v2({ root_products, dispatch, current_mysite, currencyuser, localeuser })


  //     // ======= SET TAXONOMY ========
  //     let category_taxo_array = []
  //     for (let eachproduct of result.recalculated_list) {

  //       if (eachproduct.category.length > 0) {

  //         for (let catvalue of eachproduct.category) {

  //           let dupe = category_taxo_array.find(eachcato => eachcato._id === catvalue._id)

  //           if (!dupe) {
  //             category_taxo_array.push(catvalue)
  //           }

  //         }
  //       }
  //     }

  //     let type_taxo_array = []
  //     for (let eachproduct of result.recalculated_list) {

  //       if (eachproduct.type.length > 0) {

  //         for (let typevalue of eachproduct.type) {

  //           let dupe = type_taxo_array.find(eachcato => eachcato._id === typevalue._id)

  //           if (!dupe) {
  //             type_taxo_array.push(typevalue)
  //           }
  //         }
  //       }
  //     }

  //     dispatch(act_injectProp({ dataToSubmit: result.recalculated_list, model: 'product', actionType: 'list' }))
  //     return { category_taxo_array, type_taxo_array, result_products: result.recalculated_list, floor_price_min: Math.floor(converted_price_min), round_price_max: Math.round(converted_price_max) }
  //   // }
  // }, [currencyuser, current_mysite, dispatch, localeuser])




  const refineProductList = useCallback(async ({ sourceCheckedCategoryTaxo = parentCheckedCategoryTaxo, sourceCheckedTypeTaxo = parentCheckedTypeTaxo, sourcePriceRange = parentPriceRange, tableLimit = myFcState.localStorage.viewparams.limit }) => {

    let newViewingList = []

    newViewingList = product_list.reduce((accum, currentValue, CurrentIndex) => {

      // Reduce on Price Range

      if (currentValue.price >= sourcePriceRange[0] && currentValue.price <= sourcePriceRange[1]) {

        let cat_bool = true
        let type_bool = true

        if (sourceCheckedCategoryTaxo.length > 0) {

          let cv_extracted_ids = currentValue.category.map(item => item._id)

          for (let eachCatValue of sourceCheckedCategoryTaxo) {

            if (!cv_extracted_ids.includes(eachCatValue._id)) {
              cat_bool = false
            }
          }
        }

        if (sourceCheckedTypeTaxo.length > 0) {
          let cv_extracted_ids = currentValue.type.map(item => item._id)

          for (let eachTypeValue of sourceCheckedTypeTaxo) {

            if (!cv_extracted_ids.includes(eachTypeValue._id)) {
              type_bool = false
            }
          }
        }


        if (cat_bool && type_bool) {
          accum = [...accum, currentValue]

        } else {
          accum = [...accum]
        }

      } else { accum = [...accum] }

      // Category Taxonomy

      return accum

    }, []);


    if (myFcState.localStorage.viewparams.sortOrder === 1) {
      newViewingList.sort(function (a, b) {
        return a[myFcState.localStorage.viewparams.sortBy] - b[myFcState.localStorage.viewparams.sortBy];
      });
    } else {
      newViewingList.sort(function (a, b) {
        return b[myFcState.localStorage.viewparams.sortBy] - a[myFcState.localStorage.viewparams.sortBy];
      });
    }
    newViewingList = newViewingList.slice(0, tableLimit)

    return { newViewingList, sourceCheckedCategoryTaxo, sourceCheckedTypeTaxo, sourcePriceRange }

  }, [myFcState.localStorage.viewparams.limit, myFcState.localStorage.viewparams.sortBy, myFcState.localStorage.viewparams.sortOrder, parentCheckedCategoryTaxo, parentCheckedTypeTaxo, parentPriceRange, product_list])


  //   React.useEffect(() => {

  //     if (isLocalUser !== localeuser && isLocalUser) {

  //       console.log('clear product list');
  //       plg_clearProps({ dispatch, model: 'product', actionType: 'list' })
  //     }
  //     // return function cleanup() {
  //     //     console.log('cleanup');

  //     // };
  // },[dispatch, isLocalUser, localeuser])
  /* LG Change */


  const refineProductList_LgChange = useCallback(async ({ sourceCheckedCategoryTaxo = parentCheckedCategoryTaxo, sourceCheckedTypeTaxo = parentCheckedTypeTaxo, sourcePriceRange = parentPriceRange, tableLimit = myFcState.localStorage.viewparams.limit }) => {

    console.log('inside callback');


    // if (current_mysite.default_language.referenceID._id !== localeuser.referenceID._id
    //   && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
    // ) {



    // #########################


    //   let inQuery = {}

    //   // if (current_mysite.default_language.referenceID.alpha2Code !== localeuser.referenceID.alpha2Code
    //   // ) {


    //     Object.assign(inQuery, {
    //       country: { "$eq": current_mysite.default_language.referenceID.alpha2Code },
    //       language: { "$eq": current_mysite.default_language.referenceID.languages[0].iso639_1 },
    //       visible: true,
    //     });

    //     let root_products = await plg_findMany({ model: 'product', dispatch, actionType: 'samestate', inQuery })

    //     let priceArray = root_products.payload.map(a => a.price)
    //     const price_min = Math.min(...priceArray)
    //     const price_max = Math.max(...priceArray)

    //     let converted_price_min = price_min / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
    //     let converted_price_max = price_max / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]

    //     let result = await actionFuncs_recalculatePrice_v2({ root_products, dispatch, current_mysite, currencyuser, localeuser })

    // #################################

    // let inPipeline = [{
    //   $group: {
    //     _id: '$data.country.iso_code',
    //     "mycount": { $sum: 1 },  //$sum accumulator
    //   }
    // }, {$sort: {"mycount": -1}}, {$limit: 2} ]

    // #################################
    let inPipeline = [
      // Match country
      {
        "$match": {
          country: { "$eq": current_mysite.default_language.referenceID.alpha2Code },
          language: { "$eq": current_mysite.default_language.referenceID.languages[0].iso639_1 },
        }
      },
      // Group by product type, capturing each product's total value + quantity
      {
        "$group": {
          "_id": {},
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" }
        }
      },
    ];




    let agg = await plg_aggregate({ model: 'product', dispatch, actionType: 'samestate', inPipeline })


    let converted_price_min = agg.payload[0].minPrice / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
    let converted_price_max = agg.payload[0].maxPrice / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]

    console.log(Math.floor(converted_price_min));
    console.log(Math.round(converted_price_max));
    
  }, [currencyuser.deflgrates, currencyuser.rates, current_mysite.default_language.referenceID.alpha2Code, current_mysite.default_language.referenceID.currencies, current_mysite.default_language.referenceID.languages, dispatch, myFcState.localStorage.viewparams.limit, parentCheckedCategoryTaxo, parentCheckedTypeTaxo, parentPriceRange])

  React.useEffect(() => {

    // if (current_mysite.default_language.referenceID._id !== localeuser.referenceID._id
    //   && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
    //   && product_list
    // ) {


    if (isLocalUser !== localeuser && isLocalUser
      && redux_currentmystore !== isMystore
      && !isLoading
      // && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
      && product_list
    ) {
      refineProductList_LgChange({}).then(() => {

      })




      //     const price_min = Math.min(...priceArray)
      //     const price_max = Math.max(...priceArray)


      //     loadPrice({ looproducts: product_list }).then(({ floor_price_min, round_price_max }) => {


      //       console.log(floor_price_min);
      //       console.log(round_price_max);

      //       console.log(product_list);
      //       console.log(localeuser);
      //       console.log(isLocalUser);
      //       setLocalUser(localeuser)
      //       setIsMystore(redux_currentmystore)

      // })











      // setIsLoading(true)
      // console.log(product_list);

      // loadPrice({ looproducts: product_list }).then(({ floor_price_min, round_price_max }) => {

      //   console.log();

      //   refineProductList({ sourceCheckedCategoryTaxo: [], sourceCheckedTypeTaxo: [], sourcePriceRange: [floor_price_min, round_price_max] }).then((result) => {
      //     // setParentCheckedCategoryTaxo([])
      //     // setParentCheckedTypeTaxo([])
      //     // setParentPriceRange([floor_price_min, round_price_max])
      //     // setViewingList(result.newViewingList)
      //     // setIsLoading(false)

      //   })
      // })


      // console.log('resetter');
      // setParentPriceRange()
      // setParentCheckedCategoryTaxo([])
      // setParentCheckedTypeTaxo([])
    }

  }, [isLoading, isLocalUser, isMystore, localeuser, product_list, redux_currentmystore, refineProductList_LgChange])

  /* First Load */
  React.useEffect(() => {

    if (isLoading && !isLocalUser && !viewingList && !parentCheckedCategoryTaxo && !parentCheckedTypeTaxo && !parentPriceRange) {
      loadPrice({ looproducts: product_list }).then(({ floor_price_min, round_price_max }) => {

        refineProductList({ sourceCheckedCategoryTaxo: [], sourceCheckedTypeTaxo: [], sourcePriceRange: [floor_price_min, round_price_max] }).then((result) => {
          setParentCheckedCategoryTaxo([])
          setParentCheckedTypeTaxo([])
          setParentPriceRange([floor_price_min, round_price_max])
          setViewingList(result.newViewingList)
          setLocalUser(localeuser)
          setIsMystore(redux_currentmystore)
          setIsLoading(false)
        })
      })
    }

  }, [isLoading, isLocalUser, loadPrice, localeuser, parentCheckedCategoryTaxo, parentCheckedTypeTaxo, parentPriceRange, product_list, redux_currentmystore, refineProductList, viewingList])

  /* Load more Refresh */
  React.useEffect(() => {

    if (isLoading && !viewingList && parentCheckedCategoryTaxo && parentCheckedTypeTaxo && parentPriceRange) {
      loadPrice({ looproducts: product_list }).then(({ floor_price_min, round_price_max }) => {

        refineProductList({ sourceCheckedCategoryTaxo: [], sourceCheckedTypeTaxo: [], sourcePriceRange: [floor_price_min, round_price_max] }).then((result) => {

          setViewingList(result.newViewingList)

          setIsLoading(false)
        })


      })
    }

  }, [isLoading, loadPrice, parentCheckedCategoryTaxo, parentCheckedTypeTaxo, parentPriceRange, product_list, refineProductList, viewingList])

  const handleLoadMore = useCallback(
    async () => {
      let newMyFcState = { ...myFcState }

      newMyFcState.localStorage.viewparams.limit = myFcState.localStorage.viewparams.limit + 6

      refineProductList({ parentCheckedCategoryTaxo, parentCheckedTypeTaxo, parentPriceRange, tableLimit: newMyFcState.localStorage.viewparams.limit }).then((result) => {

        setViewingList(result.newViewingList)

      })

    }, [myFcState, parentCheckedCategoryTaxo, parentCheckedTypeTaxo, parentPriceRange, refineProductList])

  return (
    !isLoading && viewingList ? <div className={classes.section}>
      <div className={classes.container}>
        <h2>{redux_currentmystore.title}</h2>
        <GridContainer>
          <GridItem md={3} sm={3}>

            <FCEcommercePanel
              toggleEcomPanel={({ sourceCheckedCategoryTaxo, sourceCheckedTypeTaxo, sourcePriceRange }) => {

                refineProductList({ sourceCheckedCategoryTaxo, sourceCheckedTypeTaxo, sourcePriceRange }).then((result) => {

                  if (result.sourceCheckedCategoryTaxo) {
                    setParentCheckedCategoryTaxo(result.sourceCheckedCategoryTaxo)
                  }

                  if (result.sourceCheckedTypeTaxo) {
                    setParentCheckedTypeTaxo(result.sourceCheckedTypeTaxo)
                  }

                  if (sourcePriceRange) {
                    setParentPriceRange(result.sourcePriceRange)

                  }

                  setViewingList(result.newViewingList)
                  setRefreshChild(true)

                })



              }}
              toggleIsRefreshChild={(boolean) => {
                setRefreshChild(boolean)

              }}
              viewingList={viewingList}
              parentCheckedCategoryTaxo={parentCheckedCategoryTaxo}
              parentCheckedTypeTaxo={parentCheckedTypeTaxo}
              parentPriceRange={parentPriceRange}
              isRefreshChild={isRefreshChild}

            />

          </GridItem>
          <GridItem md={9} sm={9}>
            <GridContainer>
              {
                viewingList ?
                  viewingList.length > 0 ? viewingList.map((value, i) => {

                    return <FCEachProduct
                      value={value}
                      key={value._id}
                    />

                  }) : null
                  : null
              }
            </GridContainer>
            <GridItem
              md={6}
              sm={6}
              className={cx(classes.mlAuto, classes.mrAuto)}
            >
              {
                viewingList && redux_currentmystore ?
                  viewingList.length > 0 && viewingList.length >= myFcState.localStorage.viewparams.limit ?
                    <Button
                      color="primary"
                      onClick={() => handleLoadMore()}
                    >
                      {redux_currentmystore.loadmore_btn}
                    </Button>
                    : null
                  : null
              }
            </GridItem>
          </GridItem>
        </GridContainer>
      </div>
    </div> : null
  );
}
