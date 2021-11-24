import React from "react";
// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardHeader.js";
import CardBody from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import CardFooter from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardFooter.js";
import Muted from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Typography/Muted.js";

import ProcessImage from '../../../../../../../functions/HookFuncs/ProcessImage'
import ProcessBackgroundShadow from '../../../../../../../functions/HookFuncs/ProcessBackgroundShadow'
import teamsStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
    reveal_array_image_all_sub
} from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'

const useStyles = makeStyles(teamsStyle);


// component Functions
export default function FCGridItem({   value, item, description, title, name,  parentClass = null, colouredshadow}) {
    // const { title, description, iconColor, vertical, className } = props;

    const classes = useStyles();


    let render = () => {
        return <Card profile plain className={parentClass}>
        <GridContainer>
            <GridItem xs={12} sm={5} md={5}>
                <CardHeader image plain>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_image_all_sub}>
                        <ProcessImage
                            list={value.referenceID}
                        /></FuncRevealWrapper>
                    </a>
                    {colouredshadow ? <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_image_all_sub}><ProcessBackgroundShadow
                        list={value.referenceID}
                        parentClassName={classes.coloredShadow}
                    /></FuncRevealWrapper> : null}
                </CardHeader>
            </GridItem>
            <GridItem xs={12} sm={7} md={7}>
                <CardBody plain>
                    {name}
                    {title}
                    {description}
                </CardBody>
                <CardFooter profile plain>
                    {/* <Button justIcon simple color="twitter">
                        <i className="fab fa-twitter" />
                    </Button>
                    <Button justIcon simple color="facebook">
                        <i className="fab fa-facebook-square" />
                    </Button>
                    <Button justIcon simple color="google">
                        <i className="fab fa-google" />
                    </Button> */}
                </CardFooter>
            </GridItem>
        </GridContainer>
    </Card>
    }
    return render()
}



