import React, { useCallback } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import cx from "classnames";

// @material-ui/icons
// import  from "@material-ui/icons/";
// core components
import ProcessAsWrapperBG from '../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'

import GridContainer from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Muted from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Typography/Muted.js";
import { parseBlockstyle } from "../../../../../../../theming/Funcs/blockstyleFunc";

import FCGridItem from './FCGridItem'

// import teamsStyle from "../../../../../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
import teamsStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";

const useStyles = makeStyles(teamsStyle);

function LoopCategory({ value, parentStyle }) {
    const classes = useStyles();

    return value.referenceID.category.length > 0 ? value.referenceID.category.map((item) => {
        return <Muted key={item._id}>
            <h6 className={classes.cardCategory} style={parentStyle}>{item.name}</h6>
        </Muted>
    }) : null
}

export function SectionTeamsTeam03({ item, i }) {

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
                return <GridItem xs={12} sm={6} md={6} key={i} ><FCGridItem
                    parentClass={classes.card3}
                    colouredshadow={true}
                    value={value}
                    item={item}
                    i={i}
                    key={value.referenceID._id}
                    name={<h4 className={cx(classes.cardTitle, dynoclasses.name_sub_style)} >{value.referenceID.name}</h4>}
                    title={value.referenceID.title ? <h6 className={cx(classes.cardCategory, dynoclasses.title_sub_style)}>{value.referenceID.title}</h6> : <LoopCategory value={value} parentStyle={cx(classes.cardCategory, dynoclasses.title_sub_style)} />}
                    description={<p className={cx( 
                        classes.description, 
                        dynoclasses.description_sub_style)} >{value.referenceID.description}</p>}
                /></GridItem>
            })
        }, [classes.card3, classes.cardCategory, classes.cardTitle, classes.description, dynoclasses.description_sub_style, dynoclasses.name_sub_style, dynoclasses.title_sub_style])




    const WrapperOutputNext = useCallback(
        (props) => {

            try {

                if (item.blockstyle.length > 0 && !item.css_wrap_card) {
        
                  if (item.blockstyle[0].referenceID.images.length > 0) {
                    return <ProcessAsWrapperBG
                    props={props}
                    list={item.blockstyle[0].referenceID}
                    parentClassName={cx(classes.team, classes.wrapperasbg)} //                 ,
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
        !isLoading ?  <WrapperOutputNext>
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
                            )}
                        >
                            <div className={dynoclasses.name_outerdiv} style={{ marginTop: "80px" }}>
                                <h2 className={
                                    cx(classes.title,
                                        dynoclasses.name_style
                                    )} >{item.name}</h2>
                            </div>
                            <div className={dynoclasses.description_outerdiv} >
                                <h5 className={cx(
                                    classes.description,
                                    dynoclasses.description_style
                                )} >
                                    {item.description}
                                </h5>
                            </div>
                        </GridItem>
                    </GridContainer>
                    <GridContainer >
                        {loopChecked({ item })}
                    </GridContainer></div></div>
        </WrapperOutputNext> : null
    );
}