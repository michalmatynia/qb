import React, { useCallback } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { useSelector } from 'react-redux'
import cx from "classnames";

// core components
import GridContainer from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import { parseBlockstyle } from "../../../../../../../theming/Funcs/blockstyleFunc";

// import Button from "../../../../../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js"
import Muted from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Typography/Muted.js";
import ProcessAsWrapperBG from '../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'
import FCGridItem from './FCGridItem'
import projectsStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.js";
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
  reveal_array_name,
  reveal_array_description,
  reveal_array_name_sub,
  reveal_array_description_sub,
  reveal_array_title_sub,
} from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'
const useStyles = makeStyles(projectsStyle);

function LoopCategory({ value, parentStyle, parentClass }) {
  const classes = useStyles();

  return value.referenceID.category.length > 0 ? value.referenceID.category.map((item) => {
    return <h6 key={item._id} className={cx(classes.description, parentClass)} >
      <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_title_sub}>{item.name}</FuncRevealWrapper></h6>
  }) : null
}

export function SectionProjectsProject03({ item, i }) {

  let reduxprops = useSelector(state => state)

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

  // console.log(isBrickStyle);
  const useDynoStyles = makeStyles(isBrickStyle ? isBrickStyle : null);
  const dynoclasses = useDynoStyles();

  const loopChecked = useCallback(
    ({ item }) => {
      return item.checked.map((value, i) => {
        return <GridItem xs={12} sm={5} md={5} key={i} className={
          classes.mlAuto + " " + classes.mrAuto + " " + classes.textCenter
        } ><FCGridItem
            colouredshadow={false}
            parentClass={classes.card2}
            value={value}
            item={item}
            i={i}
            key={value.referenceID._id}
            price={<h6 className={cx(classes.cardCategory)}>{'price' in value.referenceID ? value.referenceID.price + ' ' + Object.keys(reduxprops.user.currencyUser.rates) : null} </h6>}
            name={<a href="#pablo" onClick={e => e.preventDefault()}><h4 className={cx(classes.cardTitle, dynoclasses.name_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name_sub}>{value.referenceID.name}</FuncRevealWrapper></h4></a>}
            title={value.referenceID.title ? <h6 className={cx(classes.description, dynoclasses.title_sub_style)}><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_title_sub}>{value.referenceID.title}</FuncRevealWrapper></h6>
              : <LoopCategory value={value} parentClass={cx(classes.description, dynoclasses.title_sub_style)} />}
            description={<p className={cx(dynoclasses.description_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_description_sub}>{value.referenceID.description}</FuncRevealWrapper></p>}
          /></GridItem>
      })
    }, [classes.card2, classes.cardCategory, classes.cardTitle, classes.description, classes.mlAuto, classes.mrAuto, classes.textCenter, dynoclasses.description_sub_style, dynoclasses.name_sub_style, dynoclasses.title_sub_style, reduxprops.user.currencyUser.rates])

  const WrapperOutputNext = useCallback(
    (props) => {

      try {

        if (item.blockstyle.length > 0 && !item.css_wrap_card) {

          if (item.blockstyle[0].referenceID.images.length > 0) {
            return <ProcessAsWrapperBG
              props={props}
              list={item.blockstyle[0].referenceID}
              parentClassName={cx(
                classes.projects,
                classes.sectionDark,
                classes.projects3,
                classes.wrapperasbg
              )}
            />

          } else {
            throw item.blockstyle
          }
        } else {
          throw item.blockstyle
        }
      } catch (err) {

        return <div
          className={cx(
            classes.projects,
            classes.sectionDark,
            classes.projects3,
            classes.wrapperasbg
          )}
        >{props.children}</div>

      }

    }, [classes.projects, classes.projects3, classes.sectionDark, classes.wrapperasbg, item.blockstyle, item.css_wrap_card])

  return (
    // we've set the className to cd-section so we can make smooth scroll to it
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
              classes.textCenter,

            )}
          ><div className={dynoclasses.name_outerdiv} style={{ marginTop: "80px" }}>
              <Muted>
                <h6 className={dynoclasses.name_style}><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name}>{item.name}</FuncRevealWrapper></h6>
              </Muted>
            </div>
            <div className={dynoclasses.description_outerdiv} >
              <h2 className={cx(
                classes.title,
                dynoclasses.description_style
              )
              } >
                <FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_description}>{item.description}</FuncRevealWrapper>
              </h2>
            </div>
          </GridItem>
        </GridContainer>
        <GridContainer >
          {loopChecked({ item })}
        </GridContainer></div>
    </WrapperOutputNext> : null
  );

}