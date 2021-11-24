import React, { useCallback } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import cx from "classnames";

// core components

import GridContainer from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
// import Button from "../../../../../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js"
import Muted from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Typography/Muted.js";
import { parseBlockstyle } from "../../../../../../../theming/Funcs/blockstyleFunc";


import ProcessAsWrapperBG from '../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'
import FCGridItem from './FCGridItem'
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
  reveal_array_name,
  reveal_array_description,
  reveal_array_title,
  reveal_array_name_sub,
  reveal_array_description_sub,
  reveal_array_title_sub,
} from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'

import projectsStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.js";

const useStyles = makeStyles(projectsStyle);

function LoopCategory({ value, parentStyle }) {
  const classes = useStyles();

  return value.referenceID.category.length > 0 ? value.referenceID.category.map((item) => {
    return <h6 key={item._id} className={classes.description} style={parentStyle}><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_title_sub}>{item.name}</FuncRevealWrapper></h6>
  }) : null
}
export function SectionProjectsProject02({ item, i }) {

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
          colouredshadow={true}
          parentClass={classes.card2}
          value={value}
          item={item}
          i={i}
          key={value.referenceID._id}
          name={<a href="#pablo"><h4 className={cx(classes.cardTitle, dynoclasses.name_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name_sub}>{value.referenceID.name}</FuncRevealWrapper></h4></a>}
          title={value.referenceID.title ? <h6 className={cx(classes.description, dynoclasses.title_sub_style)}><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_title_sub}>{value.referenceID.title}</FuncRevealWrapper></h6> 
          : <LoopCategory value={value} parentStyle={cx(classes.description, dynoclasses.title_sub_style)} />}
          description={<p className={cx( 
            classes.description, 
            dynoclasses.description_sub_style,
            classes.marginTop20)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_description_sub}>{value.referenceID.description}</FuncRevealWrapper></p>}
        /></GridItem>
      })
    }, [classes.card2, classes.cardTitle, classes.description, classes.marginTop20, dynoclasses.description_sub_style, dynoclasses.name_sub_style, dynoclasses.title_sub_style])

  // ===========
  const WrapperOutputNext = useCallback(
    (props) => {

      if (item.blockstyle.length > 0 && item.blockstyle[0].referenceID.images.length > 0 && !item.css_wrap_card) {

        return <ProcessAsWrapperBG
          props={props}
          list={item.blockstyle[0].referenceID}
          parentClassName={classes.projects + " " + classes.wrapperasbg}

        />
      } else {
        return <div className={classes.projects + " " + classes.wrapperasbg}>{props.children}</div>
      }

    }, [classes.projects, classes.wrapperasbg, item.blockstyle, item.css_wrap_card])

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
              )}
            >
              <div className={dynoclasses.title_outerdiv} > 
              <Muted>
                <h6 className={dynoclasses.title_style}><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_title}>{item.title}</FuncRevealWrapper></h6>
              </Muted>
              </div>
              <div className={dynoclasses.name_outerdiv} style={{ marginTop: "80px" }}>
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
              <div className={classes.sectionSpace} />
            </GridItem>
          </GridContainer>
          <GridContainer >
            {loopChecked({ item })}
          </GridContainer></div></div>
    </WrapperOutputNext>
  );

}