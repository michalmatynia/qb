import React, { useCallback } from "react";

import cx from "classnames";

import "animate.css/animate.min.css";

import { makeStyles } from "@material-ui/core/styles";

import Card from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import ProcessAsWrapperBG from '../../../functions/HookFuncs/ProcessAsWrapperBG.js'
import FuncRevealWrapper from '../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import { 
    reveal_array_exo, 
} from '../../../components/utils/Form/Fixed_categories/reveal_arrays'

import { parseBlockstyle } from "../../../theming/Funcs/blockstyleFunc";

// nodejs library that concatenates classes

// @material-ui/icons
import landingPageStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/landingPageStyle.js";

const useStyles = makeStyles(landingPageStyle);

export default function Wrapper({ props }) {

    const [isBrickStyle, setBrickStyle] = React.useState();

    const processStyle = useCallback(async (item) => {
        return await parseBlockstyle(item)
    }, [])

    React.useEffect(() => {

        processStyle({ item: props.item }).then((result) => {
            setBrickStyle(result)
        })
    }, [processStyle, props.item])

    const classes = useStyles();

    // console.log(isBrickStyle);
    const useDynoStyles = makeStyles(isBrickStyle ? isBrickStyle : null);
    const dynoclasses = useDynoStyles();

    const CardWrapper = useCallback(({ props }) => {

        if (props.item.css_wrap_card) {

            // IF THERE IS IMAGE

            if (props.item.blockstyle[0] && props.item.blockstyle[0].referenceID.images.length > 0) {
                return <Card className={cx(classes.card1, dynoclasses.blockwrapper)}><ProcessAsWrapperBG
                    props={props}
                    list={props.item.blockstyle[0].referenceID}
/* parentClassName={classes.card1} */ ><CardBody>{props.children}</CardBody></ProcessAsWrapperBG></Card>
            } else {
                // IF THERE ARE NO IMAGE

                return <Card className={cx(classes.card1, dynoclasses.blockwrapper)}><CardBody>{props.children}</CardBody></Card>
            }


        } else {

            return <div className={cx(dynoclasses.blockwrapper)} >{props.children}</div>

        }

    }, [dynoclasses.blockwrapper, classes.card1])


    // eslint-disable-next-line no-useless-concat
    return <FuncRevealWrapper key={props.item._id} item={props.item} revealarray={reveal_array_exo}><div className={"cd-section" + " " + cx(

        { [classes.container]: props.item.css_wrap_container },
        { [classes.main]: props.item.css_wrap_mainraised },
        { [classes.mainRaised]: props.item.css_wrap_mainraised },
        dynoclasses.cardwrapper
    )} id={props.item._id}><CardWrapper props={props} /></div></FuncRevealWrapper>

}
