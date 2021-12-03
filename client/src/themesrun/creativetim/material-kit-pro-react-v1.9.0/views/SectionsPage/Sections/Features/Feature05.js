import React, { useCallback } from "react";
import cx from "classnames";

// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// import Chat from "@material-ui/icons/Chat";
// import VerifiedUser from "@material-ui/icons/VerifiedUser";
// import Fingerprint from "@material-ui/icons/Fingerprint";
// import GroupWork from "@material-ui/icons/GroupWork";
// import Airplay from "@material-ui/icons/Airplay";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Extension from "@material-ui/icons/Extension";
// import ChildFriendly from "@material-ui/icons/ChildFriendly";
// import WatchLater from "@material-ui/icons/WatchLater";
// import Code from "@material-ui/icons/Code";
// import FormatPaint from "@material-ui/icons/FormatPaint";


import ProcessAsWrapperBG from '../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'
import { parseBlockstyle } from "../../../../../../../theming/Funcs/blockstyleFunc";

// core components
import GridContainer from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import FCGridItem from './FCGridItem'
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'

import {
    reveal_array_name,
    reveal_array_name_sub,
    reveal_array_description_sub,

  } from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'

import featuresStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/featuresStyle.js";

const useStyles = makeStyles(featuresStyle);

export function SectionFeaturesFeature05({ item, i }) {
    const [isBrickStyle, setBrickStyle] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    const processStyle = useCallback(async (item) => {
      return await parseBlockstyle(item)
    }, [])
    
    React.useEffect(() => {
      if (item.blockstyle.length > 0) {
        processStyle({ item }).then((result) => {
    
          setBrickStyle(result)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    
    }, [item, processStyle])
    
    const classes = useStyles();

    const useDynoStyles = makeStyles(isBrickStyle ? isBrickStyle : null);
    const dynoclasses = useDynoStyles();

    const loopChecked = useCallback(
        ({ item }) => {
            return item.checked.map((value, i) => {
                return <GridItem xs={12} sm={4} className={classes.gridItem} key={i}> <FCGridItem
                    vertical={true}
                    value={value}
                    item={item}
                    i={i}
                    key={value.referenceID._id}
                    parentClass={classes.infoArea5}
                    title={<div className={cx(dynoclasses.name_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name_sub}>{value.referenceID.name}</FuncRevealWrapper></div>}
                    description={<p className={cx(
                        dynoclasses.description_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_description_sub}>{value.referenceID.description}</FuncRevealWrapper></p>}

                    iconColor={true}
                    icon={true}
                /></ GridItem>
            })
        }, [classes.gridItem, classes.infoArea5, dynoclasses.description_sub_style, dynoclasses.name_sub_style])

    /* Render component specific element */
    const WrapperOutputNext = useCallback(
        (props) => {
            try {

                if (item.blockstyle.length > 0 && !item.css_wrap_card) {

                    if (item.blockstyle[0].referenceID.images.length > 0 ) {
                        return <ProcessAsWrapperBG
                        props={props}
                        list={item.blockstyle[0].referenceID}
                        parentClassName={cx(
                            classes.features5,
                            classes.wrapperasbg
                        )}
                    />
                    } else {
                        throw item.blockstyle

                    }
     

                } else {

                    throw item.blockstyle
                }


            } catch(err) {
                return <div className={cx(
                    classes.features5,
                    classes.wrapperasbg
                )}>{props.children}</div>

            }


        }, [classes.features5, classes.wrapperasbg, item.blockstyle, item.css_wrap_card])

    return (
        !isLoading ? <WrapperOutputNext>
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
                    >
                        <div className={dynoclasses.name_outerdiv} >
                            <h2 className={
                                cx(classes.title,
                                    dynoclasses.name_style
                                )} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name}>{item.name}</FuncRevealWrapper></h2>
                        </div>
                    </GridItem>
                    <div className={classes.container}>
                        <GridContainer className={classes.gridContainer}>
                            {loopChecked({ item })}
                        </GridContainer>
                    </div>
                </GridContainer>
            </div>
        </WrapperOutputNext> : null
    );
}


