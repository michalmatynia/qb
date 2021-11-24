import React from "react";
// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";

import Card from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardHeader.js";
import CardBody from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";

import ProcessImage from '../../../../../../../functions/HookFuncs/ProcessImage'
import ProcessBackgroundShadow from '../../../../../../../functions/HookFuncs/ProcessBackgroundShadow'
import teamsStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
    reveal_array_image_all_sub
} from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'

const useStyles = makeStyles(teamsStyle);


// component Functions
export default function FCGridItem({ value, item, description, title, name, price, parentClass = null, colouredshadow, toggleModal }) {
    // const { title, description, iconColor, vertical, className } = props;

    const classes = useStyles();

    let render = () => {
        return <Card profile plain className={parentClass}>
            <a
                href="#pablo"
                onClick={e => e.preventDefault()}
            >
                <CardHeader image plain>
                    <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_image_all_sub}>
                        <ProcessImage
                            list={value.referenceID}
                        />
                    </FuncRevealWrapper>
                    {colouredshadow ? <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_image_all_sub}><ProcessBackgroundShadow
                            list={value.referenceID}
                            parentClassName={classes.coloredShadow}
                        /></FuncRevealWrapper> : null}
                </CardHeader>
            </a>
            <CardBody plain>
                {price}
                {name}
                {title}
                {description}
            </CardBody>
        </Card>
    }
    return render()
}



