import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { ShowLinks } from './HeaderFuncs/ShowLinks.js'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import cx from "classnames";

// import { Link } from "react-router-dom";
/* import List_Language_Menu from "../../../../../components/User/Admin/system/Languages/LanguageSelect/list_language_menu"*/
import ListLanguageMenu from "../../../../../components/User/Admin/system/Languages/LanguageSelect/ListLgDropdown"
import Fade from 'react-reveal/Fade';

import { useSelector, useDispatch } from 'react-redux'
import {
  plg_findMany,
  plg_clearProps
} from '../../../../../components/utils/Plugs/cms_plugs';
import styles from "../../../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);
// Component Functions

export function HeaderLinks({ mystate, dropdownHoverColor }) {

  const dispatch = useDispatch()

    let redux_currentlistpage = useSelector(state => state.page.current_list_page)
    let localeuser = useSelector(state => state.user.localeUser)
    let reactrouter_history = useHistory()
    let reactrouter_location = useLocation()

    let redux_localeuser = useSelector(state => state.user.localeUser)
    let redux_productdetail = useSelector(state => state.product.detail)
    const [isLocalUser, setLocalUser] = React.useState();
    const [isPrevLocalUser, setPrevLocalUser] = React.useState();
  const [isCurrentListPage, setCurrentListPage] = React.useState();

  const [isLoading, setIsLoading] = React.useState(true);

      /* Cleanup */
    React.useEffect(() => {

        if (isLocalUser !== redux_localeuser) {

            setIsLoading(true)
            setPrevLocalUser(isLocalUser)
            setLocalUser(redux_localeuser)
            setCurrentListPage()

        }

    }, [isLocalUser, reactrouter_history, reactrouter_location, redux_localeuser, redux_productdetail])



  const fetchListMenu = useCallback(async () => {


 
    let inQuery = {
      visible: { "$eq": true },
      country: { "$eq": localeuser.referenceID.alpha2Code },
      language: { "$eq": localeuser.referenceID.languages[0].iso639_1 }
    }
    let result = await plg_findMany({ model: 'page', dispatch, actionType: 'current_list', inQuery })

    setCurrentListPage( result.payload)
  }, [dispatch, localeuser.referenceID.alpha2Code, localeuser.referenceID.languages]);

  React.useEffect(() => {
    if (isLocalUser !== redux_localeuser || !redux_currentlistpage){
      setIsLoading(true)

      fetchListMenu().then(()=>{
        setIsLoading(false)
      })
    }
  }, [fetchListMenu, isLocalUser, redux_currentlistpage, redux_localeuser]);

  // const { dropdownHoverColor, stateuser, propuser } = props;
  const classes = useStyles();

  return (
    isCurrentListPage && !isLoading ? <Fade duration={1000}><div className={classes.collapse}>
                 
      <List className={cx(classes.list, classes.mlAuto)}>

        <ShowLinks
          dynamiclinks={isCurrentListPage}
          staticlinks={mystate.user}
        />
        <ListItem className={classes.listItem} key='language_dropdown'><ListLanguageMenu/></ListItem>
      </List>
    </div></Fade> : null
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
