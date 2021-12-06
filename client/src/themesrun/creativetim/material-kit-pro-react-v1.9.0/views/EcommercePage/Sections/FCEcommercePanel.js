import React, { useCallback } from "react";
// nodejs library that concatenates classes
import cx from "classnames";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// @material-ui icons
// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
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

const useStyles = makeStyles(styles);

export default function FCEcommercePanel({ toggleEcomPanel, toggleIsRefreshChild, viewingList, parentCheckedCategoryTaxo, parentCheckedTypeTaxo, parentPriceRange, isRefreshChild }) {

    let product_list = useSelector(state => state.product.list)
    let redux_currentmystore = useSelector(state => state.mystore.CurrentMystore)


    // const [priceRange, setPriceRange] = React.useState();

    // const [viewingList, setViewingList] = React.useState();

    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryTaxo, setCategoryTaxo] = React.useState();
    const [typeTaxo, setTypeTaxo] = React.useState();
    const [checkedCategoryTaxo, setCheckedCategoryTaxo] = React.useState();
    const [checkedTypeTaxo, setCheckedTypeTaxo] = React.useState();
    const [isMidPriceRange, setMidPriceRange] = React.useState();

    const [isLocalUser, setLocalUser] = React.useState();


    const classes = useStyles();
    // React.useEffect(() => {

    //     if(isLoading && !checkedCategoryTaxo) {

    //         console.log('load checked');
    //         setCheckedCategoryTaxo(parentCheckedCategoryTaxo)
    //         setCheckedTypeTaxo(parentCheckedTypeTaxo)
    //         setCheckedCategoryTaxo(parentPriceRange)

    //         setIsLoading(false)
    //     }
    // }, [checkedCategoryTaxo, isLoading, parentCheckedCategoryTaxo, parentCheckedTypeTaxo, parentPriceRange])

    // const loadPrice = useCallback(async ({ looproducts }) => {

    //     // // Viewparams and limits have to be carried out on a SUM array of products

    //     let priceArray = looproducts.map(a => a.price)
    //     const price_min = Math.min(...priceArray)
    //     const price_max = Math.max(...priceArray)

    //     return { floor_price_min: Math.floor(price_min), round_price_max: Math.round(price_max) }



    // }, [])
    // React.useEffect(() => {

    //     if (!priceRange && isLoading) {

    //         loadPrice({ looproducts: product_list }).then(({ floor_price_min, round_price_max }) => {
    //             setPriceRange([floor_price_min, round_price_max])
    //         })
    //     }

    // })

    /* Sync Mid with Parent */


    React.useEffect(() => {
        if (isRefreshChild) {


            setCheckedCategoryTaxo(parentCheckedCategoryTaxo)
            setCheckedTypeTaxo(parentCheckedTypeTaxo)
            setMidPriceRange(parentPriceRange)
            toggleIsRefreshChild(false)
        }

    }, [isRefreshChild, parentCheckedCategoryTaxo, parentCheckedTypeTaxo, parentPriceRange, toggleIsRefreshChild])


    // React.useEffect(() => {
    //     if ( viewingList && parentCheckedCategoryTaxo && parentCheckedTypeTaxo && parentPriceRange && isLoading && categoryTaxo && typeTaxo && checkedCategoryTaxo && checkedTypeTaxo && isMidPriceRange) {

    //         console.log('Update mid level');
    //         console.log(parentPriceRange);
    //         // toggleEcomPanel({ parentCheckedCategoryTaxo: checkedCategoryTaxo, parentCheckedTypeTaxo: checkedTypeTaxo, priceRange })
    //         // setIsLoading(false)
    //     }

    // }, [categoryTaxo, checkedCategoryTaxo, checkedTypeTaxo, isLoading, isMidPriceRange, parentCheckedCategoryTaxo, parentCheckedTypeTaxo, parentPriceRange, toggleEcomPanel, typeTaxo, viewingList])


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

        if (!categoryTaxo && !typeTaxo && parentPriceRange) {

            establishTaxonomy().then(({ category_taxo_array, type_taxo_array }) => {

                setCategoryTaxo(category_taxo_array)
                setTypeTaxo(type_taxo_array)
                setCheckedCategoryTaxo([])
                setCheckedTypeTaxo([])
                setMidPriceRange(parentPriceRange)
                setIsLoading(false)
            })
        }

    }, [categoryTaxo, establishTaxonomy, parentPriceRange, typeTaxo])

    return (categoryTaxo && checkedTypeTaxo && checkedCategoryTaxo && typeTaxo && viewingList && !isLoading ?
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
                    active={[0, 2]}
                    activeColor="primary"
                    collapses={[
                        {
                            title: redux_currentmystore.pricerange_nametag,
                            content: (
                                <PriceSlider
                                    childCheckedCategoryTaxo={checkedCategoryTaxo}
                                    childCheckedTypeTaxo={checkedTypeTaxo}
                                    viewingList={viewingList}
                                    cb_runChangePrice={({ cb_CheckedCategoryTaxo, cb_CheckedTypeTaxo, cb_ChangedPrice }) => {

                                        console.log(checkedCategoryTaxo);
                                        console.log(cb_CheckedCategoryTaxo);

                                        console.log(cb_ChangedPrice);

                                        toggleEcomPanel({ sourceCheckedCategoryTaxo: cb_CheckedCategoryTaxo, sourceCheckedTypeTaxo: cb_CheckedTypeTaxo, sourcePriceRange: cb_ChangedPrice })
                                    }}

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

                                                console.log('clicked');
                                                console.log(cb_NewChecked);

                                                // setCheckedCategoryTaxo(cb_NewChecked)
                                                toggleEcomPanel({ sourceCheckedCategoryTaxo: cb_NewChecked })

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
                                        <FCTaxonomy
                                            arrayTaxo={typeTaxo}
                                            checkedTaxo={checkedTypeTaxo}
                                            cb_runCheckedTaxo={({ cb_NewChecked }) => {

                                                setCheckedTypeTaxo(cb_NewChecked)
                                                toggleEcomPanel({ sourceCheckedTypeTaxo: cb_NewChecked })

                                            }
                                            }
                                        />
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

