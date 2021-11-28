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

        if (isLocalUser !== redux_localeuser && isLocalUser) {

            console.log('HeaderLinks LG Change');

            setIsLoading(true)
            setPrevLocalUser(isLocalUser)
            setLocalUser(redux_localeuser)
            setCurrentListPage()

        }

    }, [isLocalUser, reactrouter_history, reactrouter_location, redux_localeuser, redux_productdetail])



  const fetchListMenu = useCallback(async () => {

    let inQuery = {
      visible: { "$eq": true },
      country: { "$eq": redux_localeuser.referenceID.alpha2Code },
      language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 }
    }
    return await plg_findMany({ model: 'page', dispatch, actionType: 'current_list', inQuery })

  }, [dispatch, redux_localeuser]);

  React.useEffect(() => {
    if (redux_localeuser && !isCurrentListPage ){
      setIsLoading(true)

      fetchListMenu().then((result)=>{
        console.log('normal links render')

        setCurrentListPage( result.payload)
        setLocalUser(redux_localeuser)
        setIsLoading(false)
      })
    }
  }, [fetchListMenu, isCurrentListPage, redux_localeuser]);

  const classes = useStyles();

  return (
    isCurrentListPage && !isLoading ? 
        <ShowLinks 
          dynamiclinks={isCurrentListPage}
          staticlinks={mystate.user}
        /> : null
  );

}

