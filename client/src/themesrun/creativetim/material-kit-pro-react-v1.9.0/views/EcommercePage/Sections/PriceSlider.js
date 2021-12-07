import React, { useCallback } from "react";
// nodejs library that concatenates classes
import cx from "classnames";
import { arraysEqual } from '../../../../../../components/utils/Funcs/array_funcs'

// plugin that creates slider
// import Slider from "nouislider";
import noUiSlider from 'nouislider';


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// @material-ui icons
// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// core components

import CardBody from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";

import styles from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/productStyle.js";
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(styles);


export default function PriceSlider({ childCheckedTypeTaxo = [], childCheckedCategoryTaxo = [], childPriceRange = [], cb_runChangePrice, viewingList }) {

  let redux_currencyuser = useSelector(state => state.user.currencyUser)
  let product_list = useSelector(state => state.product.list)

  const [initialPriceRange, setInitialPriceRange] = React.useState();

  const [priceRange, setPriceRange] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isChildCheckedCategoryTaxo, setChildCheckedCategoryTaxo] = React.useState();
  const [isChildCheckedTypeTaxo, setChildCheckedTypeTaxo] = React.useState();


  const classes = useStyles();

  const loadPrice = useCallback(async ({ looproducts }) => {

    // // Viewparams and limits have to be carried out on a SUM array of products

    let priceArray = looproducts.map(a => a.price)
    const price_min = Math.min(...priceArray)
    const price_max = Math.max(...priceArray)

    return { floor_price_min: Math.floor(price_min), round_price_max: Math.round(price_max) }


  }, [])

  React.useEffect(() => {

    if (!priceRange && !initialPriceRange && !isChildCheckedCategoryTaxo && !isChildCheckedTypeTaxo) {

      console.log('initiate local state');
      loadPrice({ looproducts: product_list }).then(({ floor_price_min, round_price_max }) => {

        setInitialPriceRange([floor_price_min, round_price_max])
        setPriceRange([floor_price_min, round_price_max])
        setChildCheckedCategoryTaxo(childCheckedCategoryTaxo)
        setChildCheckedTypeTaxo(childCheckedTypeTaxo)

        setIsLoading(false)
      })
    }

  })
  React.useEffect(() => {
    if (!isLoading
      && (isChildCheckedCategoryTaxo || isChildCheckedTypeTaxo)

      && (
        arraysEqual(isChildCheckedCategoryTaxo, childCheckedCategoryTaxo) === false
        || arraysEqual(isChildCheckedTypeTaxo, childCheckedTypeTaxo) === false
      )
      && document
        .getElementById("sliderRegular")
        .classList.contains("noUi-target")
    ) {

      let pp = document.getElementById("sliderRegular")

      setChildCheckedCategoryTaxo(childCheckedCategoryTaxo)
      setChildCheckedTypeTaxo(childCheckedTypeTaxo)

      pp.noUiSlider.off('change');

      if (childCheckedCategoryTaxo.length !== 0 || childCheckedTypeTaxo.length !== 0) {

        let newOptions = {
          start: [priceRange[0], priceRange[1]],
          range: { min: initialPriceRange[0], max: initialPriceRange[1] },
        }

        pp.noUiSlider.updateOptions(
          newOptions, // Object
          true // Boolean 'fireSetEvent'
        );

      } 

      if (pp.noUiSlider) {

        pp.noUiSlider.on('change', async function (values, handle) {
          cb_runChangePrice({ cb_CheckedCategoryTaxo: childCheckedCategoryTaxo, cb_CheckedTypeTaxo: childCheckedTypeTaxo, cb_ChangedPrice: [Math.floor(values[0]), Math.round(values[1])] });
          setPriceRange([Math.floor(values[0]), Math.round(values[1])])

        })
      }



    }
  }, [cb_runChangePrice, childCheckedCategoryTaxo, childCheckedTypeTaxo, initialPriceRange, isChildCheckedCategoryTaxo, isChildCheckedTypeTaxo, isLoading, priceRange])

  React.useEffect(() => {

    if (!isLoading
      && priceRange
      && isChildCheckedCategoryTaxo
      && isChildCheckedTypeTaxo
      && !document
        .getElementById("sliderRegular")
        .classList.contains("noUi-target")
    ) {

      console.log('create slider');

      console.log(isChildCheckedCategoryTaxo);

      let pp = document.getElementById("sliderRegular")

      noUiSlider.create(pp, {
        start: [priceRange[0], priceRange[1]],

        range: { min: initialPriceRange[0], max: initialPriceRange[1] },
      }).on('change', async function (values, handle) {

        cb_runChangePrice({ cb_CategoryTaxo: childCheckedCategoryTaxo, cb_TypeTaxo: childCheckedTypeTaxo, cb_ChangedPrice: [Math.floor(values[0]), Math.round(values[1])] });

      })

      pp.noUiSlider.on('update', function (values, handle) {

        setPriceRange([Math.floor(values[0]), Math.round(values[1])])

      })

    }

  }, [cb_runChangePrice, childCheckedCategoryTaxo, childCheckedTypeTaxo, initialPriceRange, isChildCheckedCategoryTaxo, isChildCheckedTypeTaxo, isLoading, priceRange]);


  return (

    !isLoading ? <CardBody className={classes.cardBodyRefine}>
      <span
        className={cx(
          classes.pullLeft,
          classes.priceSlider
        )}
      >
        {Object.keys(redux_currencyuser.rates)} {priceRange ? priceRange[0] : null}
      </span>
      <span
        className={cx(
          classes.pullRight,
          classes.priceSlider
        )}
      >
        {Object.keys(redux_currencyuser.rates)} {priceRange ? priceRange[1] : null}
      </span>
      <br />
      <br />
      <div id="sliderRegular" className="slider-gray" />
    </CardBody> : null)


}