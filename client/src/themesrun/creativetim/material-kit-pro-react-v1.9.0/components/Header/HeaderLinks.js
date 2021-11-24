import React, { useCallback } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { ShowLinks } from './HeaderFuncs/ShowLinks.js'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// import { Link } from "react-router-dom";
/* import List_Language_Menu from "../../../../../components/User/Admin/system/Languages/LanguageSelect/list_language_menu"*/
import ListLanguageMenu from "../../../../../components/User/Admin/system/Languages/LanguageSelect/ListLgDropdown"

import { useSelector, useDispatch } from 'react-redux'
import {
  plg_findMany
} from '../../../../../components/utils/Plugs/cms_plugs';
import styles from "../../../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);
// Component Functions

export function HeaderLinks({ mystate, dropdownHoverColor }) {

  const dispatch = useDispatch()

    // let currentlistpage = useSelector(state => state.page.current_list_page)
    let localeuser = useSelector(state => state.user.localeUser)

  const [isCurrentDetailPage, setCurrentDetailPage] = React.useState();

  const fetchListMenu = useCallback(async () => {
    let inQuery = {
      visible: { "$eq": true },
      country: { "$eq": localeuser.referenceID.alpha2Code },
      language: { "$eq": localeuser.referenceID.languages[0].iso639_1 }
    }
    let result = await plg_findMany({ model: 'page', dispatch, actionType: 'current_list', inQuery })

    setCurrentDetailPage(await result.payload)
  }, [dispatch, localeuser]);

  React.useEffect(() => {
    fetchListMenu();
  }, [fetchListMenu]);

  // const { dropdownHoverColor, stateuser, propuser } = props;
  const classes = useStyles();

  return (
    isCurrentDetailPage ? <div className={classes.collapse}>
      <List className={classes.list + " " + classes.mlAuto}>

        <ShowLinks
          dynamiclinks={isCurrentDetailPage}
          staticlinks={mystate.user}
        />
        <ListItem className={classes.listItem} key='language_dropdown'><ListLanguageMenu localeuser={localeuser} /></ListItem>
      </List>
    </div> : null
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
