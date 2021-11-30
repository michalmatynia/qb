import React, { useCallback } from "react";
import cx from "classnames";

import { parseBlockstyle } from "../../../../../../../theming/Funcs/blockstyleFunc";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// import  from "@material-ui/icons/";
// core components
import GridContainer from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";

// import Button from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js"
import Muted from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Typography/Muted.js";

import ProcessAsWrapperBG from '../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'
import FCGridItem from './FCGridItem'

import teamsStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
    reveal_array_name,
    reveal_array_description,
    reveal_array_name_sub,
    reveal_array_description_sub,
    reveal_array_title_sub,
  } from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'

const useStyles = makeStyles(teamsStyle);
function LoopCategory({ value, parentStyle }) {
    const classes = useStyles();

    return value.referenceID.category.length > 0 ? value.referenceID.category.map((item) => {
        return <Muted key={item._id}>
            <h6 className={classes.cardCategory} style={parentStyle}><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_title_sub}>{item.name}</FuncRevealWrapper></h6>
        </Muted>
    }) : null
}
export function SectionTeamsTeam05({ item, i }) {
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
                return <GridItem xs={12} sm={6} md={6} key={i} ><FCGridItem
                    parentClass={classes.card5}
                    colouredshadow={false}
                    value={value}
                    item={item}
                    i={i}
                    key={value.referenceID._id}
                    name={<h4 className={cx(classes.cardTitle, dynoclasses.name_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name_sub}>{value.referenceID.name}</FuncRevealWrapper></h4>}
                    title={value.referenceID.title ? <h6 className={cx(classes.cardCategory, dynoclasses.title_sub_style)}><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_title_sub}>{value.referenceID.title}</FuncRevealWrapper></h6> 
                    : <LoopCategory value={value} parentStyle={cx(classes.cardCategory, dynoclasses.title_sub_style)} />}
                    description={<p className={cx( 
                        classes.description, 
                        dynoclasses.description_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_description_sub}>{value.referenceID.description}</FuncRevealWrapper></p>}
                /></GridItem>
            })
        }, [classes.card5, classes.cardCategory, classes.cardTitle, classes.description, dynoclasses.description_sub_style, dynoclasses.name_sub_style, dynoclasses.title_sub_style])

    const WrapperOutputNext = useCallback(
        (props) => {


            try {

                if (item.blockstyle.length > 0 && !item.css_wrap_card) {
        
                  if (item.blockstyle[0].referenceID.images.length > 0) {
                    return <ProcessAsWrapperBG
                    props={props}
                    list={item.blockstyle[0].referenceID}
                    parentClassName={cx(classes.team, classes.wrapperasbg)} 
                />
        
                  } else {
                    throw item.blockstyle
                  }
                } else {
                  throw item.blockstyle
                }
              } catch (err) {
                
                return <div className={cx(classes.team, classes.wrapperasbg)}>{props.children}</div>

        
              }

        }, [classes.team, classes.wrapperasbg, item.blockstyle, item.css_wrap_card])


    return (
        // we've set the className to cd-section so we can make smooth scroll to it
        <WrapperOutputNext>
            <div className={dynoclasses.dynamiccontainer}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem
                            xs={12}
                            sm={8}
                            md={8}
                            className={cx(
                                classes.mlAuto,
                                classes.mrAuto,
                                classes.textCenter
                            )
                            }
                        ><div className={dynoclasses.name_outerdiv} style={{ marginTop: "80px" }}>
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
                    </GridContainer></div></div>
        </WrapperOutputNext>
    );
}

