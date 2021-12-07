import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import {
  productFuncs_handleAddToCart
} from "../../../../../../components/User/Admin/GenericFuncs/product_funcs_vh"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui icons
// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

// core components

import GridItem from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardHeader.js";
import CardBody from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import CardFooter from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardFooter.js";
import Button from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";

import styles from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/productStyle.js";
import { useSelector, useDispatch } from 'react-redux'

import { ShowMessages } from '../../../../../../components/Message/Generic/static_msg'


const useStyles = makeStyles(styles);

export default function FCEachProduct({ value }) {
  let reactrouter_history = useHistory()
  let currencyuser = useSelector(state => state.user.currencyUser)
  let redux_overtheme_mysite = useSelector(state => state.mysite.OverthemeMysite)

  let redux_cart_user = useSelector(state => state.user.cartUser)
  let redux_currentmystore = useSelector(state => state.mystore.CurrentMystore)

  const dispatch = useDispatch()
  const [showAddToCart, setShowAddToCart] = React.useState(false);
  const classes = useStyles({ overtheme: redux_overtheme_mysite });
  // ================

  // React.useEffect(() => {

  //   if (value && !isValue && isLoading) {
  //     setIsValue(value)
  //     setIsLoading(false)

  //   }
  // }, [isLoading, isValue, value])

  const gotoProductDetail = useCallback(
    async ({ value }) => {
      reactrouter_history.push(`/detail/product/${value._id}`)

    }, [reactrouter_history])



  let render = () => {
    return <GridItem md={4} sm={4}>
      {showAddToCart && redux_currentmystore ? <ShowMessages
        visible={showAddToCart}
        message={redux_currentmystore.addedtocart_msg}
        color='info'
        place='bl'

      /> : null}
      <Card plain product >
        <CardHeader noShadow image className={classes.cardHoverScale}>
          <div
            onClick={() => gotoProductDetail({ value })}
          >
            <img src={value.images.length > 0 ? value.images[0].secure_url : '/images/image_not_availble.png'} alt=".." />
          </div>
        </CardHeader>
        <CardBody plain>
          <a href="#pablo">
            <h4 className={classes.cardTitle}>{value.name}</h4>
          </a>
          <p className={classes.description}>
            {value.description}
          </p>
        </CardBody>
        <CardFooter plain className={classes.justifyContentBetween}>
          <div className={classes.priceContainer}>
            <span className={classes.price}> {Object.keys(currencyuser.rates)} {value.price}</span>
          </div>
          <Button
            color="transparent"
            style={{
              opacity: "0.9",
            }}
            onClick={() => {

              productFuncs_handleAddToCart({
                value, redux_cart_user, dispatch
              }).then(() => {
                setShowAddToCart(true)
                setTimeout(() => {
                  setShowAddToCart(false)

                }, 1000)
              })


            }}
            className={classes.pullRight}
          > <ShoppingCart />
          </Button>
          <Button
            color="primary"
            size="sm"
            style={{
              opacity: "0.9",
            }}
            onClick={() => gotoProductDetail({ value })}
            className={classes.pullRight}
          >
            {redux_currentmystore.view_btn}
          </Button>

          {/* <Tooltip
              id="tooltip-top"
              title="Saved to Wishlist"
              placement="left"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button
                justIcon
                simple
                color="rose"
                // className={classes.pullRight}
              >
                <Favorite />
              </Button>
            </Tooltip> */}
        </CardFooter>
      </Card>
    </GridItem>

  }


  return render()

}