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
// core components

import CardBody from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";

import styles from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/productStyle.js";
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(styles);


export default function PriceSlider ({ priceparent }) {
    const dispatch = useDispatch()
    let redux_currencyuser = useSelector(state => state.user.currencyUser)

    const [priceRange, setPriceRange] = React.useState(priceparent);
    const [isLoading, setIsLoading] = React.useState(true);

    const classes = useStyles();


    React.useEffect(() => {

          if (priceRange &&
            !document
              .getElementById("sliderRegular")
              .classList.contains("noUi-target")
          ) {
    
            console.log('slider create');
    
            Slider.create(document.getElementById("sliderRegular"), {
              start: [priceRange[0], priceRange[1]],
              connect: true,
              range: { min: priceRange[0], max: priceRange[1] },
              step: 1,
            }).on("update", async function (values) {
    
              setPriceRange([Math.floor(values[0]), Math.round(values[1])])
    
            });
          }
      }, [ priceRange]);

      return (

        priceRange ? <CardBody className={classes.cardBodyRefine}>
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