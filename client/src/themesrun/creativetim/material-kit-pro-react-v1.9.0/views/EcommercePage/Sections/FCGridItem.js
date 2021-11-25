import React, {useCallback} from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    useRouter,
} from "../../../../../../hoc/Funcs/hook_funcs";
// nodejs library that concatenates classes
import cx from "classnames";

// plugin that creates slider
import Slider from "nouislider";

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

// import { ShowMessages } from '../../../../../../components/Store/StoreFuncs/storemsg_funcs'
import { ShowMessages } from '../../../../../../components/Message/Generic/static_msg'


const useStyles = makeStyles(styles);

export default  function FCGridItem({ value, i, mystore }) {
    let reactrouter_history = useHistory()
    let localeuser = useSelector(state => state.user.localeUser)
  let currencyuser = useSelector(state => state.user.currencyUser)
  let current_mysite = useSelector(state => state.mysite.CurrentMysite)
  let redux_cart_user = useSelector(state => state.user.cartUser)
  const dispatch = useDispatch()
  const [showAddToCart, setShowAddToCart] = React.useState(false);

    const [isOverTheme, setOverTheme] = React.useState();
    const classes = useStyles({overtheme: isOverTheme});
    // ================

    const gotoProductDetail = useCallback(
        ({ value }) => {
            reactrouter_history.push(`/detail/product/${value._id}`)

        }, [reactrouter_history])
    // <h6 className={classes.cardCategory}>{'price' in value.referenceID ? value.referenceID.price + ' ' + Object.keys(reduxprops.user.currencyUser.rates) : null} </h6>


    let render = () => {
        return <GridItem md={4} sm={4}>
            {showAddToCart ? <ShowMessages
            visible={showAddToCart}
            mystore={mystore}
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
                        onClick={async () => {

                            await productFuncs_handleAddToCart({
                                value, redux_cart_user, dispatch
                            })
                            //      return <ShowMessages
                            //   visible={true}
                            //   mystore={mystore}
                            // />
                            setShowAddToCart(true)
                            setTimeout(() => {
                              setShowAddToCart(false)

                            }, 1000)

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
                        {mystore.view_btn}
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