import React, { useCallback } from "react";
// nodejs library that concatenates classes
import cx from "classnames";

// plugin that creates slider
import Slider from "nouislider";
import FCGridItem from "./FCGridItem";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// @material-ui icons
// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FCTaxonomyListOne from './FCTaxonomyListOne'
import FCTaxonomy from './FCTaxonomy'

// core components
import AccordionFunc from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Accordion/AccordionFunc.js";

import GridContainer from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import Button from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import processOverTheme from "../../../../../../theming/Funcs/processOverTheme"
import PriceSlider from "./PriceSlider.js"

import styles from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/productStyle.js";
import { useSelector, useDispatch } from 'react-redux'
import {
  plg_findMany,
  // plg_findOne_QueMod,
  plg_clearProps
} from '../../../../../../components/utils/Plugs/cms_plugs';

import {
  act_injectProp,
} from '../../../../../../redux/actions/generic/generic_actions';


import { actionFuncs_recalculatePrice_v2 } from '../../../../../../components/User/Admin/ActionFunctions/recalculatePrice'

const useStyles = makeStyles(styles);

export default function SectionProducts({ mystore, toggleCartMsg }) {

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

  const dispatch = useDispatch()

  const [priceRange, setPriceRange] = React.useState();

  const [isLoading, setIsLoading] = React.useState(true);
  const [isOverTheme, setOverTheme] = React.useState();
  const [categoryTaxo, setCategoryTaxo] = React.useState();
  const [typeTaxo, setTypeTaxo] = React.useState(null);
  const [checkedCategoryTaxo, setCheckedCategoryTaxo] = React.useState([]);
  const [checkedTypeTaxo, setCheckedTypeTaxo] = React.useState([]);
  const [isLocalUser, setLocalUser] = React.useState();

  const classes = useStyles({ overtheme: isOverTheme });

  /* Clean Up */
  React.useEffect(() => {

    return function cleanup() {

      console.log('cleanup');

      plg_clearProps({ dispatch, model: 'product', actionType: 'list' })

    };

  }, [dispatch])

  /* Get Theme */
  /*   React.useEffect(() => {
  
      if (!isOverTheme && current_mysite) {
        processOverTheme({ currentmysite: current_mysite }).then((theme) => {
          console.log('set theme');
  
          setOverTheme(theme)
        })
      }
  
  
    }, [current_mysite, isOverTheme]) */

  /* LG Change */

  // React.useEffect(() => {

  //   if (current_mysite.default_language.referenceID._id !== localeuser.referenceID._id
  //     && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
  //   ) {

  //     console.log('resetter');
  //     setPriceRange(null)
  //     setCheckedCategoryTaxo([])
  //     setCheckedTypeTaxo([])
  //   }

  // }, [currencyuser, current_mysite, dispatch, localeuser])

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


  const loadProducts = useCallback(async (item) => {
    console.log('load products');

    let inQuery = {}

    Object.assign(inQuery, {
      country: { "$eq": localeuser.referenceID.alpha2Code },
      language: { "$eq": localeuser.referenceID.languages[0].iso639_1 },
      visible: true,
    });

    let result_products = await plg_findMany({ model: 'product', dispatch, actionType: 'list', inQuery, populate: [{ path: 'category' }, { path: 'type' }] })

    // Viewparams and limits have to be carried out on a SUM array of products

    let priceArray = result_products.payload.map(a => a.price)
    const price_min = Math.min(...priceArray)
    const price_max = Math.max(...priceArray)



    return { result_products: result_products.payload, floor_price_min: Math.floor(price_min), round_price_max: Math.round(price_max) }



  }, [dispatch, localeuser.referenceID.alpha2Code, localeuser.referenceID.languages])


  // React.useEffect(()=>{
  //       // ======= SET TAXONOMY ========

  //       let category_taxo_array = []
  //       for (let eachproduct of result_products.payload) {

  //         if (eachproduct.category.length > 0) {

  //           for (let catvalue of eachproduct.category) {

  //             let dupe = category_taxo_array.find(eachcato => eachcato._id === catvalue._id)

  //             if (!dupe) {
  //               category_taxo_array.push(catvalue)
  //             }

  //           }
  //         }
  //       }

  //       let type_taxo_array = []
  //       for (let eachproduct of result_products.payload) {

  //         if (eachproduct.type.length > 0) {

  //           for (let typevalue of eachproduct.type) {

  //             let dupe = type_taxo_array.find(eachcato => eachcato._id === typevalue._id)

  //             if (!dupe) {
  //               type_taxo_array.push(typevalue)
  //             }
  //           }
  //         }
  //       }
  // setCategoryTaxo(category_taxo_array)
  // setTypeTaxo(type_taxo_array)
  // })

  const refineProducts = useCallback(async () => {

    let newViewingList = []

    newViewingList = product_list.reduce((accum, currentValue, CurrentIndex) => {

      // Reduce on Price Range

      if (currentValue.price >= priceRange[0] && currentValue.price <= priceRange[1]) {

        let cat_bool = true
        let type_bool = true

        if (checkedCategoryTaxo.length > 0) {
          // cat_bool = false
          let cv_extracted_ids = currentValue.category.map(item => item._id)

          for (let eachCatValue of checkedCategoryTaxo) {

            if (!cv_extracted_ids.includes(eachCatValue._id)) {
              cat_bool = false
            }
          }
        }

        if (checkedTypeTaxo.length > 0) {
          // cat_bool = false
          let cv_extracted_ids = currentValue.type.map(item => item._id)

          for (let eachTypeValue of checkedTypeTaxo) {

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
    newViewingList = newViewingList.slice(0, myFcState.localStorage.viewparams.limit)

    return newViewingList

  },[checkedCategoryTaxo, checkedTypeTaxo, myFcState.localStorage.viewparams.limit, myFcState.localStorage.viewparams.sortBy, myFcState.localStorage.viewparams.sortOrder, priceRange, product_list])

  const establishTaxonomy = useCallback(async ({ result_products}) => {
       let category_taxo_array = []
        for (let eachproduct of result_products) {

          if (eachproduct.category.length > 0) {

            for (let catvalue of eachproduct.category) {

              let dupe = category_taxo_array.find(eachcato => eachcato._id === catvalue._id)

              if (!dupe) {
                category_taxo_array.push(catvalue)
              }

            }
          }
        }

        let type_taxo_array = []
        for (let eachproduct of result_products) {

          if (eachproduct.type.length > 0) {

            for (let typevalue of eachproduct.type) {

              let dupe = type_taxo_array.find(eachcato => eachcato._id === typevalue._id)

              if (!dupe) {
                type_taxo_array.push(typevalue)
              }
            }
          }
        }

        return {category_taxo_array, type_taxo_array}
  }, [])

  React.useEffect(() => {

    // RUN FUNCTION
    if (!viewingList
      && isLoading
      // && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]

    ) {

      setIsLoading(true)
      if(!product_list && !priceRange) {

        loadProducts().then(({ result_products, floor_price_min, round_price_max }) => {

          /* Refine Temporary */
          // refineProducts({ left_price: priceRange[0], right_price: priceRange[1] }).then((newViewingList) => {
          //           setViewingList(newViewingList)
  
  
          // ======
  
          establishTaxonomy({ result_products}).then(({category_taxo_array, type_taxo_array}) => {
            setViewingList(result_products)

            setCategoryTaxo(category_taxo_array)
            setTypeTaxo(type_taxo_array)
  
            setLocalUser(localeuser)
            setPriceRange([floor_price_min, round_price_max])
            setIsLoading(false)
          })
  
  
        })
      } else if (priceRange && product_list) {
        console.log('refineproducts');

        refineProducts().then((newViewingList) => {
          setViewingList(newViewingList)
          setIsLoading(false)

        })
      }


    }
  }, [establishTaxonomy, isLoading, loadProducts, localeuser, priceRange, product_list, refineProducts, viewingList])



  // React.useEffect(() => {

  //   if (isLoading) {

  //     if (priceRange
  //       && product_list
  //       && viewingList
  //       // && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
  //     ) {
  //       refineProducts().then((newViewingList) => {
  //         setViewingList(newViewingList)
  //         setIsLoading(false)

  //       })

  //     }
  //   }

  // }, [isLoading, priceRange, product_list, refineProducts, viewingList])




  // ================

  // const loopProducts = useCallback(
  //   ({ mystore }) => {
  //     return viewingList.length > 0 ? viewingList.map((value, i) => {
  //       return <FCGridItem
  //         value={value}
  //         i={i}
  //         key={value._id}
  //         mystore={mystore}
  //         isLoading={isLoading}
  //       />
  //     }) : null
  //   }, [isLoading, viewingList])

  // const handleLoadMore = useCallback(
  //   () => {
  //     let newMyFcState = { ...myFcState }

  //     newMyFcState.localStorage.viewparams.limit = myFcState.localStorage.viewparams.limit + 6

  //     setFcState(newMyFcState)
  //   }, [myFcState])

  return (!isLoading && priceRange ?
    <div className={classes.section}>{console.log('render')}
      <div className={classes.container}>
        <h2>{mystore.title}</h2>
        <GridContainer>
          <GridItem md={3} sm={3}>
            <Card plain>
              <CardBody className={classes.cardBodyRefine}>

                {/* Here should be a SEARCH FIELD */}
                {/* <h4 className={classes.cardTitle + " " + classes.textLeft}>
                  Refine
                  <Tooltip
                    id="tooltip-top"
                    title="Reset Filter"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      link
                      justIcon
                      size="sm"
                      className={classes.pullRight + " " + classes.refineButton}
                    >
                      <Cached />
                    </Button>
                  </Tooltip>
                  <Clearfix />
                </h4> */}
                <AccordionFunc
                  active={[0, 1, 2]}
                  activeColor="primary"
                  collapses={[
                    {
                      title: mystore.pricerange_nametag,
                      content: (<PriceSlider

                        priceparent={priceRange}
                      // isCategoryArray={isCategoryArray}
                      // cbActionOnClick={({ value }) => {
                      //   setIsLoading(true)
                      //   setIsFilter(value)
                      // }}
                      // isFilter={isFilter}
                      // item={item}
                      />

                      ),
                    },
                    {
                      title: mystore.column_one_nametag,
                      content: (
                        <div className={classes.customExpandPanel}>
                          <div
                            className={cx(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}
                          >
                            <FCTaxonomy 
                          arrayTaxo={categoryTaxo}
                          checkedTaxo={checkedCategoryTaxo}
                          cb_runCheckedTaxo={({cb_NewChecked})=>{

                            console.log('runcheck');
                            setIsLoading(true)
                            setCheckedCategoryTaxo(cb_NewChecked)
                            setViewingList()

                          }
                       
                          }
                          />
                          </div>
                        </div>
                      ),
                    },
                    {
                      title: mystore.column_two_nametag,
                      content: (
                        <div className={classes.customExpandPanel}>
                          <div
                            className={cx(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}
                          >
                            {/* {loopColumnTwo()} */}
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={9} sm={9}>
            <GridContainer>
              {/* {loopProducts({ mystore })} */}
            </GridContainer>
            <GridItem
              md={6}
              sm={6}
              className={cx(classes.mlAuto, classes.mrAuto)}
            >
              {/* {viewingList.length > 0 && viewingList.length >= myFcState.localStorage.viewparams.limit ? <Button
                color="primary"
                onClick={() => handleLoadMore()}
              >
                {mystore.loadmore_btn}
              </Button> : null} */}
            </GridItem>
          </GridItem>
        </GridContainer>
      </div>
    </div> : null
  );
}
