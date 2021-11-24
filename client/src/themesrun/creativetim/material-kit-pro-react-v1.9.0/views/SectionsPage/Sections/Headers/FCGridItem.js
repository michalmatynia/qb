import React, {useCallback} from "react";
// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import ProcessAsWrapperBG from '../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'

import cx from "classnames";
// react component for creating beautiful carousel
// @material-ui/core components
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
// import Share from "@material-ui/icons/Share";
// import ShoppingCart from "@material-ui/icons/ShoppingCart";
// // core components
// import Button from "../../../../../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js"

import headersStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/headersStyle.js";

const useStyles = makeStyles(headersStyle);




// component Functions
export default function FCGridItem({ i, value, item, description, title, name, parentClass = null, colouredshadow }) {

    const classes = useStyles();

    function isOdd(num) { return num % 2; }

    let renderVarietyHeader = () => {
        if (isOdd(i)) {
            return <GridContainer >
                <GridItem
                    xs={12} sm={6} md={6} key={value.referenceID._id}>
                    {name}{description}
                    <br />
                    {/* <Button color="danger" size="lg">
              Read more
    </Button> */}
                    {/* <Button justIcon color="white" simple>
              <i className="fab fa-twitter" />
            </Button>
            <Button justIcon color="white" simple>
              <i className="fab fa-facebook-square" />
            </Button>
            <Button justIcon color="white" simple>
              <i className="fab fa-get-pocket" />
            </Button> */}
                </GridItem>
            </GridContainer>
        } else {
            return <GridContainer>
                <GridItem
                    xs={12}
                    sm={7}
                    md={7}
                    className={cx(classes.mlAuto, classes.textRight)}
                >{name}{description}
                    <br />
                    <div>
                        {/* <Button color="white" simple size="lg">
                <Share /> Share Offer
              </Button> */}
                        {/* <Button color="danger" size="lg">
                <ShoppingCart /> {value.referenceID.btn_launch}
              </Button> */}
                    </div>
                </GridItem>
            </GridContainer>
        }
    }



    const WrapperOutputNext = useCallback(
        (props) => {
    
          if (item.checked.length > 0 && value.referenceID.images.length > 0) {
    
            return <ProcessAsWrapperBG
              props={props}
              list={value.referenceID}
              parentClassName={classes.pageHeader} 
            />
          } else {
            return <div className={classes.pageHeader}>{props.children}</div>
          }
    
        }, [classes.pageHeader, item.checked.length, value.referenceID])


    return <div><WrapperOutputNext>
      <div className={classes.container}>
       {renderVarietyHeader()}
    </div></WrapperOutputNext>
  </div>

}



