import React, {useCallback} from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  useRouter,
} from "../../../../../../hoc/Funcs/hook_funcs";
// nodejs library that concatenates classes
import cx from "classnames";

// plugin that creates slider
import Slider from "nouislider";
import FCGridItem from "./FCGridItem";

import {
  productFuncs_handleAddToCart
} from "../../../../../../components/User/Admin/GenericFuncs/product_funcs_vh"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui icons
// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

// core components
import AccordionFunc from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Accordion/AccordionFunc.js";

import GridContainer from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardHeader.js";
import CardBody from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import CardFooter from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardFooter.js";
import Button from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import processOverTheme from "../../../../../../theming/Funcs/processOverTheme"

import styles from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/productStyle.js";
import { useSelector, useDispatch } from 'react-redux'
import {
  plg_findMany,
  // plg_findOne_QueMod,
  // plg_clearProps
} from '../../../../../../components/utils/Plugs/cms_plugs';
// import { ShowMessages } from '../../../../../../components/Store/StoreFuncs/storemsg_funcs'
import { ShowMessages } from '../../../../../../components/Message/Generic/static_msg'

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

  const [viewingList, setViewingList] = React.useState([]);

  // let taxonomy_list = useSelector(state => state.taxonomy.list)
  // let reduxprops = useSelector(state => state)
  let localeuser = useSelector(state => state.user.localeUser)
  let currencyuser = useSelector(state => state.user.currencyUser)
  let current_mysite = useSelector(state => state.mysite.CurrentMysite)
  const dispatch = useDispatch()

  const [priceRange, setPriceRange] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(true);
  const [isOverTheme, setOverTheme] = React.useState();
  const classes = useStyles({overtheme: isOverTheme});

  React.useEffect(() => {

    if (!isOverTheme && current_mysite) {
      processOverTheme({currentmysite: current_mysite}).then((theme)=>{

        setOverTheme(theme)
      })
    }


  },[current_mysite, isOverTheme])



  React.useEffect(() => {

    async function loadProducts() {

      let inQuery = {}

      if (current_mysite.default_language.referenceID.alpha2Code !== localeuser.referenceID.alpha2Code
      ) {


        Object.assign(inQuery, {
          country: { "$eq": current_mysite.default_language.referenceID.alpha2Code },
          language: { "$eq": current_mysite.default_language.referenceID.languages[0].iso639_1 },
          visible: true,
        });

        let root_products = await plg_findMany({ model: 'product', dispatch, actionType: 'samestate', inQuery })

        let priceArray = root_products.payload.map(a => a.price)
        const price_min = Math.min(...priceArray)
        const price_max = Math.max(...priceArray)

        let converted_price_min = price_min / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
        let converted_price_max = price_max / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
        setPriceRange([Math.floor(converted_price_min), Math.round(converted_price_max)])

        let result = await actionFuncs_recalculatePrice_v2({ root_products, dispatch, current_mysite, currencyuser, localeuser })

        // ======= SET TAXONOMY ========
        let category_taxo_array = []
        for (let eachproduct of result.recalculated_list) {

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
        for (let eachproduct of result.recalculated_list) {

          if (eachproduct.type.length > 0) {

            for (let typevalue of eachproduct.type) {

              let dupe = type_taxo_array.find(eachcato => eachcato._id === typevalue._id)

              if (!dupe) {
                type_taxo_array.push(typevalue)
              }
            }
          }
        }

        // ==========
        setViewingList(result.recalculated_list)
        dispatch(act_injectProp({ dataToSubmit: result.recalculated_list, model: 'product', actionType: 'list' }))

        // await plg_clearProps({ myprops: this.props, model: 'user', actionType: 'cart' })

      } else {

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

        // ======= SET TAXONOMY ========

        let category_taxo_array = []
        for (let eachproduct of result_products.payload) {

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
        for (let eachproduct of result_products.payload) {

          if (eachproduct.type.length > 0) {

            for (let typevalue of eachproduct.type) {

              let dupe = type_taxo_array.find(eachcato => eachcato._id === typevalue._id)

              if (!dupe) {
                type_taxo_array.push(typevalue)
              }
            }
          }
        }

        // ======
        setViewingList(result_products.payload)

        setPriceRange([Math.floor(price_min), Math.round(price_max)])

      }

    }

    // RUN FUNCTION
    if (!priceRange
      && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]

    ) {

      setIsLoading(true)
      loadProducts()
      setIsLoading(false)

    }
  }, [dispatch, currencyuser, localeuser, current_mysite, priceRange])





  // ================
  const loopProducts = useCallback(
    ({ mystore }) => {
      return viewingList.length > 0 ? viewingList.map((value, i) => {
        return <FCGridItem
          value={value}
          i={i}
          key={value._id}
          mystore={mystore}
        />
      }) : null
    },[viewingList])


  // const handleToggle = ({ value, i }) => {


  //   console.log(value);
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];
  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setChecked(newChecked);
  // };



  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2>{mystore.title}</h2>
        <GridContainer>
          <GridItem md={9} sm={9}>
            <GridContainer>
              {loopProducts({mystore})}
            </GridContainer>
            <GridItem
              md={6}
              sm={6}
              className={cx(classes.mlAuto, classes.mrAuto)}
            >
            </GridItem>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
