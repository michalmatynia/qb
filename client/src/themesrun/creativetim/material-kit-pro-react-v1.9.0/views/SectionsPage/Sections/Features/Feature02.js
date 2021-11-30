import React, { useCallback } from "react";
import cx from "classnames";

// @material-ui/core components
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';

import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// import LocationOn from "@material-ui/icons/LocationOn";
// import VerifiedUser from "@material-ui/icons/VerifiedUser";
// import Fingerprint from "@material-ui/icons/Fingerprint";
// import ChildFriendly from "@material-ui/icons/ChildFriendly";
// import WatchLater from "@material-ui/icons/WatchLater";
// import Code from "@material-ui/icons/Code";
// import FormatPaint from "@material-ui/icons/FormatPaint";
// import ViewCarousel from "@material-ui/icons/ViewCarousel";
// import AccessTime from "@material-ui/icons/AccessTime";
// import AttachMoney from "@material-ui/icons/AttachMoney";
// core components

import ProcessAsWrapperBG from '../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'
import { parseBlockstyle } from "../../../../../../../theming/Funcs/blockstyleFunc";

import GridContainer from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import FCGridItem from './FCGridItem'
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
    reveal_array_name,
    reveal_array_description,
    reveal_array_btn_launch,
    reveal_array_name_sub,
    reveal_array_description_sub,
  } from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'

import featuresStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/featuresStyle.js";

const useStyles = makeStyles(featuresStyle);

export function SectionFeaturesFeature02({ item, i }) {
    const [isBrickStyle, setBrickStyle] = React.useState();

    const processStyle = useCallback(async (item) => {
        return await parseBlockstyle(item)
    }, [])

    React.useEffect(() => {

        processStyle({ item }).then((result) => {
            setBrickStyle(result)
        })
    }, [item, processStyle])

    const classes = useStyles();

    const useDynoStyles = makeStyles(isBrickStyle ? isBrickStyle : null);
    const dynoclasses = useDynoStyles();

    const loopChecked = useCallback(
        ({ item }) => {
            return item.checked.map((value, i) => {
                return <GridItem xs={12} sm={4} md={4} key={i} ><FCGridItem
                    parentClass={classes.infoArea2}
                    vertical={false}
                    value={value}
                    item={item}
                    i={i}
                    key={value.referenceID._id}

                    title={<div className={cx(dynoclasses.name_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name_sub}>{value.referenceID.name}</FuncRevealWrapper></div>}
                    description={<span><p className={cx(
                        dynoclasses.description_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_description_sub}>{value.referenceID.description}</FuncRevealWrapper></p>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_btn_launch}>{item.btn_launch}</FuncRevealWrapper></a></span>}
                    iconColor={true}
                    icon={true}
                /></GridItem>
            })
        }, [classes.infoArea2, dynoclasses.description_sub_style, dynoclasses.name_sub_style])


    const WrapperOutputNext = useCallback(
        (props) => {

            try {

                if (item.blockstyle.length > 0 && !item.css_wrap_card) {

                    if (item.blockstyle[0].referenceID.images.length > 0 ) {
                        return <ProcessAsWrapperBG
                        props={props}
                        list={item.blockstyle[0].referenceID}
                        parentClassName={cx(classes.features2, classes.wrapperasbg)} //                 ,
    
                    />
                    } else {
                        throw item.blockstyle

                    }
     

                } else {

                    throw item.blockstyle
                }


            } catch(err) {
                return <div className={cx(classes.features2, classes.wrapperasbg)}>{props.children}</div>

            }


        }, [classes.features2, classes.wrapperasbg, item.blockstyle, item.css_wrap_card])


    return (
        // we've set the className to cd-section so we can make smooth scroll to it
        <WrapperOutputNext>
            <div className={dynoclasses.dynamiccontainer}>
                <GridContainer>
                    <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={cx(
                            classes.mlAuto,
                            classes.mrAuto,
                            classes.textCenter
                        )}
                    ><div className={dynoclasses.name_outerdiv} >
                            <h2 className={
                                cx(classes.title,
                                    dynoclasses.name_style
                                )} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name}>{item.name}</FuncRevealWrapper></h2>
                        </div>
                        <div className={dynoclasses.description_outerdiv} >
                            <h5 className={cx(
                                classes.description,
                                dynoclasses.description_style
                            )} >
                                <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_description}>{item.description}</FuncRevealWrapper>
                            </h5>
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer >
                    {loopChecked({ item })}
                </GridContainer></div>
        </WrapperOutputNext>
    );

}