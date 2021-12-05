import React, { useCallback } from "react";
// nodejs library that concatenates classes
import cx from "classnames";

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


export default function PriceSlider({ childCheckedTypeTaxo, childCheckedCategoryTaxo, cb_runChangePrice, viewingList }) {

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

    if (!priceRange && !initialPriceRange) {
      loadPrice({ looproducts: product_list }).then(({ floor_price_min, round_price_max }) => {

        console.log('loadpric');
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
      && (isChildCheckedCategoryTaxo !== childCheckedCategoryTaxo || isChildCheckedTypeTaxo !== childCheckedTypeTaxo)
      && viewingList
      && document
        .getElementById("sliderRegular")
        .classList.contains("noUi-target")
    ) {


      loadPrice({ looproducts: viewingList }).then(({ floor_price_min, round_price_max }) => {
        let pp = document.getElementById("sliderRegular")

        setChildCheckedCategoryTaxo(childCheckedCategoryTaxo)
        setChildCheckedTypeTaxo(childCheckedTypeTaxo)


        if (floor_price_min === Infinity || round_price_max === -Infinity) {
          console.log('destroy');
          pp.noUiSlider.destroy();
          // setPriceRange()
          // setInitialPriceRange()
        }
        else if (childCheckedCategoryTaxo.length !== 0 || childCheckedTypeTaxo.length !== 0) {
          setPriceRange([floor_price_min, round_price_max])

          console.log(floor_price_min);
          console.log(typeof(floor_price_min));

          console.log(round_price_max);

          let newOptions = {
            start: [floor_price_min, round_price_max],
            range: { min: floor_price_min, max: round_price_max },
          }

          pp.noUiSlider.updateOptions(
            newOptions, // Object
            true // Boolean 'fireSetEvent'
          );

        } else {
          setPriceRange([initialPriceRange[0], initialPriceRange[1]])

          let newOptions = {
            start: [initialPriceRange[0], initialPriceRange[1]],
            range: { min: initialPriceRange[0], max: initialPriceRange[1] },
          }


          pp.noUiSlider.updateOptions(
            newOptions, // Object
            true // Boolean 'fireSetEvent'
          );
        }

        if (pp.noUiSlider) {

          pp.noUiSlider.on('change', async function (values, handle) {
            cb_runChangePrice({ cb_ChangedPrice: [Math.floor(values[0]), Math.round(values[1])] });

          })
        }

      })


    }
  }, [cb_runChangePrice, childCheckedCategoryTaxo, childCheckedTypeTaxo, initialPriceRange, isChildCheckedCategoryTaxo, isChildCheckedTypeTaxo, isLoading, loadPrice, viewingList])

  React.useEffect(() => {

    if (!isLoading
      && priceRange
      && isChildCheckedCategoryTaxo
      && isChildCheckedTypeTaxo
      && !document
        .getElementById("sliderRegular")
        .classList.contains("noUi-target")
    ) {
      let pp = document.getElementById("sliderRegular")

      console.log('slider create');

      noUiSlider.create(pp, {
        start: [priceRange[0], priceRange[1]],

        range: { min: initialPriceRange[0], max: initialPriceRange[1] },
      }).on('change', async function (values, handle) {
        console.log('updates');

        cb_runChangePrice({ cb_ChangedPrice: [Math.floor(values[0]), Math.round(values[1])] });

      })

      pp.noUiSlider.on('update', function (values, handle) {

        setPriceRange([Math.floor(values[0]), Math.round(values[1])])

      })

    }

  }, [cb_runChangePrice, initialPriceRange, isChildCheckedCategoryTaxo, isChildCheckedTypeTaxo, isLoading, priceRange]);


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