import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

// react components for routing our app without refresh
import { ShowLinks } from './HeaderFuncs/ShowLinks.js'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from 'react-redux'
import {
  plg_findMany,
} from '../../../../../components/utils/Plugs/cms_plugs';
import styles from "../../../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);
// Component Functions

export default function HeaderLinksProper({ mystate, dropdownHoverColor }) {

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
  }, [dispatch, localeuser]);

  React.useEffect(() => {
    if (localeuser && (isLocalUser !== redux_localeuser || !redux_currentlistpage)){
      setIsLoading(true)

      fetchListMenu().then(()=>{
        setIsLoading(false)
      })
    }
  }, [fetchListMenu, isLocalUser, localeuser, redux_currentlistpage, redux_localeuser]);

  const classes = useStyles();

  return ( 
    isCurrentListPage && !isLoading ? 
        <ShowLinks 
          dynamiclinks={isCurrentListPage}
          staticlinks={mystate.user}
        /> : null
  );

}

