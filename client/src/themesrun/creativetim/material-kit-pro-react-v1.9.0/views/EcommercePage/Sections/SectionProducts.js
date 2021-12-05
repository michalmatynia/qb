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
import processOverTheme from "../../../../../../theming/Funcs/processOverTheme";
import PriceSlider from "./PriceSlider.js";
import FCEcommercePanel from "./FCEcommercePanel";

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
  // let localeuser = useSelector(state => state.user.localeUser)
  // let currencyuser = useSelector(state => state.user.currencyUser)
  // let current_mysite = useSelector(state => state.mysite.CurrentMysite)
  let product_list = useSelector(state => state.product.list)
  let redux_currentmystore = useSelector(state => state.mystore.CurrentMystore)


  const [isLoading, setIsLoading] = React.useState(true);
  const [isOverTheme, setOverTheme] = React.useState();
  const [categoryTaxo, setCategoryTaxo] = React.useState();
  const [typeTaxo, setTypeTaxo] = React.useState();
  // const [parentCheckedCategoryTaxo, setParentCheckedCategoryTaxo] = React.useState([]);
  const [parentCheckedTypeTaxo, setParentCheckedTypeTaxo] = React.useState([]);
  const [isLocalUser, setLocalUser] = React.useState();

  const classes = useStyles({ overtheme: isOverTheme });



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




  const refineProductList = useCallback(async ({ parentCheckedCategoryTaxo, parentCheckedTypeTaxo, priceRange }) => {

    let newViewingList = []

    newViewingList = product_list.reduce((accum, currentValue, CurrentIndex) => {

      // Reduce on Price Range

      if (currentValue.price >= priceRange[0] && currentValue.price <= priceRange[1]) {

        let cat_bool = true
        let type_bool = true

        if (parentCheckedCategoryTaxo.length > 0) {

          let cv_extracted_ids = currentValue.category.map(item => item._id)

          for (let eachCatValue of parentCheckedCategoryTaxo) {

            if (!cv_extracted_ids.includes(eachCatValue._id)) {
              cat_bool = false
              break
            }
          }
        }

        if (parentCheckedTypeTaxo.length > 0) {
          let cv_extracted_ids = currentValue.type.map(item => item._id)

          for (let eachTypeValue of parentCheckedTypeTaxo) {

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

    // return newViewingList
    setViewingList(newViewingList)



  }, [myFcState.localStorage.viewparams.limit, myFcState.localStorage.viewparams.sortBy, myFcState.localStorage.viewparams.sortOrder, product_list])


  // ================

  const loopProducts = useCallback(
    async () => {

      console.log(viewingList);

      return viewingList.length > 0 ? viewingList.map( (value, i) => {
        return <FCGridItem
          value={value}
          i={i}
          key={value._id}
        />
      }) : null
    }, [viewingList])

  // const handleLoadMore = useCallback(
  //   () => {
  //     let newMyFcState = { ...myFcState }

  //     newMyFcState.localStorage.viewparams.limit = myFcState.localStorage.viewparams.limit + 6

  //     setFcState(newMyFcState)
  //   }, [myFcState])

  return (
    <div className={classes.section}>{console.log('render Section Products')}
      <div className={classes.container}>
        <h2>{redux_currentmystore.title}</h2>
        <GridContainer>
          <GridItem md={3} sm={3}>

            <FCEcommercePanel
              toggleEcomPanel={({ parentCheckedCategoryTaxo, parentCheckedTypeTaxo, priceRange }) => {

                refineProductList({ parentCheckedCategoryTaxo, parentCheckedTypeTaxo, priceRange })
              }}
              viewingList={viewingList}
            />

          </GridItem>
          <GridItem md={9} sm={9}>
            <GridContainer>
              {viewingList ?
                viewingList.length > 0 ? viewingList.map( (value, i) => {
                  return <FCGridItem
                    value={value}
                    i={i}
                    key={value._id}
                  />
                }) : null
                : null}
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
    </div>
  );
}
