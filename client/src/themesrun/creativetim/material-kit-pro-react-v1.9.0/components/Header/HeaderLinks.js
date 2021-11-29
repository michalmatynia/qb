import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import cx from "classnames";

// import { Link } from "react-router-dom";
/* import List_Language_Menu from "../../../../../components/User/Admin/system/Languages/LanguageSelect/list_language_menu"*/
import ListLanguageMenu from "../../../../../components/User/Admin/system/Languages/LanguageSelect/ListLgDropdown"
import HeaderLinksProper from "./HeaderLinksProper"
import Fade from 'react-reveal/Fade';

import styles from "../../../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);
// Component Functions

export function HeaderLinks({ dropdownHoverColor }) {

  console.log('HeaderLinks');
  // const { dropdownHoverColor, stateuser, propuser } = props;
  const classes = useStyles();

  return (
    <div className={classes.collapse}>
                 
      <List className={cx(classes.list, classes.mlAuto)}>
      <HeaderLinksProper
      />
        <ListItem className={classes.listItem} key='language_dropdown'><Fade duration={1000}><ListLanguageMenu/></Fade></ListItem>
      </List>
    </div> 
  );

}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
