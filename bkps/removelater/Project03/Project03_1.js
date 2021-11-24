import React, { useCallback } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {createUseStyles} from 'react-jss'

import { useSelector } from 'react-redux'
import cx from "classnames";

// core components
import GridContainer from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";

// import Button from "../../../../../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js"
import Muted from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Typography/Muted.js";
import ProcessAsWrapperBG from '../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'
import FCGridItem from './FCGridItem'
import projectsStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.js";

// const useStyles = makeStyles(projectsStyle);
const useStyles = createUseStyles(projectsStyle);

function LoopCategory({ value, parentStyle }) {
  const classes = useStyles();

  return value.referenceID.category.length > 0 ? value.referenceID.category.map((item) => {
    return <h6 key={item._id} className={classes.description} style={parentStyle}>{item.name}</h6>
  }) : null
}

export function SectionProjectsProject03({ item, i }) {
  const classes = useStyles();

  let reduxprops = useSelector(state => state)

  const [isNameStyle, setNameStyle] = React.useState({ color: 'inherit' });
  const [isDescriptionStyle, setDescriptionStyle] = React.useState({ color: 'inherit' });
  const [isNameSubordinateStyle, setNameSubordinateStyle] = React.useState({ color: 'inherit' });
  const [isTitleSubordinateStyle, setTitleSubordinateStyle] = React.useState({ color: 'inherit' });
  const [isDescriptionSubordinateStyle, setDescriptionSubordinateStyle] = React.useState({ color: 'inherit' });
  const [isBrickStyle, setBrickkStyle] = React.useState();

  // const useDynoStyles = makeStyles(isBrickStyle);
  // const dynoclasses = useDynoStyles();


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
            price={<h6 className={classes.cardCategory} style={isNameSubordinateStyle}>{'price' in value.referenceID ? value.referenceID.price + ' ' + Object.keys(reduxprops.user.currencyUser.rates) : null} </h6>}
            name={<a href="#pablo" onClick={e => e.preventDefault()}><h4 className={classes.cardTitle} style={isNameSubordinateStyle}>{value.referenceID.name}</h4></a>}
            title={value.referenceID.title ? <h6 className={classes.description} style={isTitleSubordinateStyle}>{value.referenceID.title}</h6> : <LoopCategory value={value} parentStyle={isTitleSubordinateStyle} />}
            description={<p style={isDescriptionSubordinateStyle}>{value.referenceID.description}</p>}
          /></GridItem>
      })
    }, [classes.card2, classes.cardCategory, classes.cardTitle, classes.description, classes.mlAuto, classes.mrAuto, classes.textCenter, isDescriptionSubordinateStyle, isNameSubordinateStyle, isTitleSubordinateStyle, reduxprops.user.currencyUser.rates])


  React.useEffect(() => {
    if (item.blockstyle.length) {

      let name_style = {
        color: `rgba(${item.blockstyle[0].referenceID.NameFontColor.r}, ${item.blockstyle[0].referenceID.NameFontColor.g}, ${item.blockstyle[0].referenceID.NameFontColor.b}, ${item.blockstyle[0].referenceID.NameFontColor.a})`,
      }
      setNameStyle(name_style)

      let description_style = {
        color: `rgba(${item.blockstyle[0].referenceID.DescriptionFontColor.r}, ${item.blockstyle[0].referenceID.DescriptionFontColor.g}, ${item.blockstyle[0].referenceID.DescriptionFontColor.b}, ${item.blockstyle[0].referenceID.DescriptionFontColor.a})`,
      }
      setDescriptionStyle(description_style)


      let name_sub_style = {
        color: `rgba(${item.blockstyle[0].referenceID.NameFontColorSubordinate.r}, ${item.blockstyle[0].referenceID.NameFontColorSubordinate.g}, ${item.blockstyle[0].referenceID.NameFontColorSubordinate.b}, ${item.blockstyle[0].referenceID.NameFontColorSubordinate.a})`,
      }
      setNameSubordinateStyle(name_sub_style)

      let description_sub_style = {
        color: `rgba(${item.blockstyle[0].referenceID.DescriptionFontColorSubordinate.r}, ${item.blockstyle[0].referenceID.DescriptionFontColorSubordinate.g}, ${item.blockstyle[0].referenceID.DescriptionFontColorSubordinate.b}, ${item.blockstyle[0].referenceID.DescriptionFontColorSubordinate.a})`,
      }
      setDescriptionSubordinateStyle(description_sub_style)

      let title_sub_style = {
        color: `rgba(${item.blockstyle[0].referenceID.TitleFontColorSubordinate.r}, ${item.blockstyle[0].referenceID.TitleFontColorSubordinate.g}, ${item.blockstyle[0].referenceID.TitleFontColorSubordinate.b}, ${item.blockstyle[0].referenceID.TitleFontColorSubordinate.a})`,
      }
      setTitleSubordinateStyle(title_sub_style)


      let blockstyle = {
        dynamiccontainer: {
          margin: `${item.blockstyle[0].referenceID.margin_inner ? item.blockstyle[0].referenceID.margin_inner : 'auto'}`,
          padding: `${item.blockstyle[0].referenceID.padding_inner ? item.blockstyle[0].referenceID.padding_inner : 'auto'}`,
        }
      }

      setBrickkStyle(blockstyle)
    }
  }, [item])
  // ===========
  const WrapperOutputNext = useCallback(
    (props) => {

      if (item.blockstyle.length > 0 && item.blockstyle[0].referenceID.images.length > 0 && !item.css_wrap_card) {

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
    <WrapperOutputNext>

<div >

      {/* <div className={dynoclasses.dynamiccontainer }> */}
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
          >
            <Muted>
              <h6 style={{ ...isNameStyle, marginTop: "80px" }}>{item.name}</h6>
            </Muted>
            <h2 className={classes.title} style={isDescriptionStyle}>
              {item.description}
            </h2>
          </GridItem>
        </GridContainer>
        <GridContainer >
          {loopChecked({ item })}
        </GridContainer></div>
    </WrapperOutputNext>
  );

}