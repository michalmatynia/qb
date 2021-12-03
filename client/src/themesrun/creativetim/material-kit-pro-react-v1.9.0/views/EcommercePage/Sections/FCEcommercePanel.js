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

export default function FCEcommercePanel({ value, i, toggleCategoryTaxo, toggleEcomPanel, sumofchecked }) {
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


    // let taxonomy_list = useSelector(state => state.taxonomy.list)
    // let reduxprops = useSelector(state => state)
    let localeuser = useSelector(state => state.user.localeUser)
    let currencyuser = useSelector(state => state.user.currencyUser)
    let current_mysite = useSelector(state => state.mysite.CurrentMysite)
    let product_list = useSelector(state => state.product.list)
    let redux_currentmystore = useSelector(state => state.mystore.CurrentMystore)


    const [priceRange, setPriceRange] = React.useState();
    const [myFcState, setFcState] = React.useState(fc_state);

    const [viewingList, setViewingList] = React.useState();

    const [isLoading, setIsLoading] = React.useState(true);
    const [isOverTheme, setOverTheme] = React.useState();
    const [categoryTaxo, setCategoryTaxo] = React.useState();
    const [typeTaxo, setTypeTaxo] = React.useState(null);
    const [checkedCategoryTaxo, setCheckedCategoryTaxo] = React.useState([]);
    const [checkedTypeTaxo, setCheckedTypeTaxo] = React.useState([]);
    const [isLocalUser, setLocalUser] = React.useState();


    const classes = useStyles({ overtheme: isOverTheme });

    
  const loadPrice = useCallback(async () => {
 
    // // Viewparams and limits have to be carried out on a SUM array of products

    let priceArray = product_list.map(a => a.price)
    const price_min = Math.min(...priceArray)
    const price_max = Math.max(...priceArray)



    return { floor_price_min: Math.floor(price_min), round_price_max: Math.round(price_max) }

    // return { result_products: [], floor_price_min: 0, round_price_max: 0 }


  }, [product_list])
  React.useEffect(() => {

    if(!priceRange) {
        loadPrice().then(({ floor_price_min, round_price_max }) => {

            /* Refine Temporary */
            // refineProducts({ left_price: priceRange[0], right_price: priceRange[1] }).then((newViewingList) => {
            //           setViewingList(newViewingList)
    
    
            // ======
    
    
    
            // setViewingList(product_list)
    
            // setLocalUser(localeuser)
    
            setPriceRange([floor_price_min, round_price_max])
            toggleEcomPanel({categoryTaxo, typeTaxo, priceRange : [floor_price_min, round_price_max]})
            setIsLoading(false)

          })
    }
    

})



    /* Get Theme */
    /*   React.useEffect(() => {
    
        if (!isOverTheme && current_mysite) {
          processOverTheme({ currentmysite: current_mysite }).then((theme) => {
            console.log('set theme');
    
            setOverTheme(theme)
          })
        }
    
    
      }, [current_mysite, isOverTheme]) */

    const establishTaxonomy = useCallback(async () => {
        let category_taxo_array = []
        for (let eachproduct of product_list) {

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
        for (let eachproduct of product_list) {

            if (eachproduct.type.length > 0) {

                for (let typevalue of eachproduct.type) {

                    let dupe = type_taxo_array.find(eachcato => eachcato._id === typevalue._id)

                    if (!dupe) {
                        type_taxo_array.push(typevalue)
                    }
                }
            }
        }

        return { category_taxo_array, type_taxo_array }
    }, [product_list])


    React.useEffect(() => {

        if(!categoryTaxo && !typeTaxo) {
            setIsLoading(true)

        establishTaxonomy().then(({ category_taxo_array, type_taxo_array }) => {

            setCategoryTaxo(category_taxo_array)
            setTypeTaxo(type_taxo_array)
            setIsLoading(false)


        })
    }

    }, [categoryTaxo, establishTaxonomy, typeTaxo])

    return (categoryTaxo && typeTaxo && priceRange && !isLoading ? 
        <Card plain>{console.log('EcommercePanel Render')}
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
                    active={[0, 2]}
                    activeColor="primary"
                    collapses={[
                        {
                            title: redux_currentmystore.pricerange_nametag,
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
                            title: redux_currentmystore.column_one_nametag,
                            content: (
                                <div className={classes.customExpandPanel}>
                                    <div
                                        className={cx(classes.checkboxAndRadio, classes.checkboxAndRadioHorizontal)}
                                    >
                                        <FCTaxonomy
                                            arrayTaxo={categoryTaxo}
                                            checkedTaxo={checkedCategoryTaxo}
                                            cb_runCheckedTaxo={({ cb_NewChecked }) => {

                                                console.log('runcheck');
                                                setIsLoading(true)
                                                setCheckedCategoryTaxo(cb_NewChecked)
                                                toggleEcomPanel({categoryTaxo: cb_NewChecked, typeTaxo, priceRange})

                                                setIsLoading(false)

                                            }

                                            }
                                        />
                                    </div>
                                </div>
                            ),
                        },
                        {
                            title: redux_currentmystore.column_two_nametag,
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
        </Card> : null
    )

}
