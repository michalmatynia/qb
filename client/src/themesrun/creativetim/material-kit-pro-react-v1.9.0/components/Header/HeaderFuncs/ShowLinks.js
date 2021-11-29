import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "../../../../../../hoc/Funcs/hook_funcs";
import cx from "classnames";

// nodejs library to set properties for components
import ListItem from "@material-ui/core/ListItem";
import { Link, useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import { DefaultLink } from "./DefaultLink"
import {
    plg_clearProps
} from '../../../../../../components/utils/Plugs/cms_plugs';

import styles from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";

// core components

const useStyles = makeStyles(styles);
// This VERSION IS CORRECT
export function ShowLinks({ staticlinks = null, dynamiclinks = null }) {

    let redux_localeuser = useSelector(state => state.user.localeUser)
    let userdata = useSelector(state => state.user.userData)
    const [isStaticList, setStaticList] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isLocalUser, setLocalUser] = React.useState();
    const [isLocation, setIsLocation] = React.useState();
    const [isComposedMenu, setComposedMenu] = React.useState();

    const [isCurrentDetailPage, setCurrentDetailPage] = React.useState();

    let redux_currentdetailpage = useSelector(state => state.page.current_detail_page)

    /* Dynamic Link Change */
    React.useEffect(() => {

        if (
            document.location.pathname === '/'
            && isCurrentDetailPage !== redux_currentdetailpage
            && !isLoading
        ) {


            setIsLoading(true)
            setComposedMenu()

            setCurrentDetailPage(redux_currentdetailpage)
            setStaticList()

        }

    }, [redux_currentdetailpage, isCurrentDetailPage, isLoading])


    /* Link Change dynamic to Static*/
    React.useEffect(() => {

        if (
            document.location.pathname !== isLocation
            && document.location.pathname !== '/'
            && !redux_currentdetailpage
            && !isLoading
        ) {

            setIsLoading(true)
            setComposedMenu()
            setStaticList()
            setCurrentDetailPage()

        }

    }, [redux_currentdetailpage, isCurrentDetailPage, isLoading, isLocation])

    const composeStaticList = useCallback(async () => {
        if (userdata) {

            let list = []
            dynamiclinks.forEach((item) => {

                item = { ...item, dynamiclink: true }
                list.push(item)

            });

            staticlinks.forEach((item) => {
                if (!userdata.isAuth) {
                    if (item.public === true) {
                        list.push(item)
                    }
                } else {

                    if (item.name !== 'Log in' && userdata) {
                        if ('layout' in item) {
                            if (userdata.role === 1 && item.layout === '/admin') {
                                list.push(item)
                            } else if (userdata.role === 2 && item.layout === '/contentmanager') {
                                list.push(item)
                            }
                        } else {
                            list.push(item)
                        }
                    }
                }
            });

            return list

        }


    }, [dynamiclinks, staticlinks, userdata])


    React.useEffect(() => {

        if (!isStaticList
            && userdata
            && ((redux_currentdetailpage && document.location.pathname === '/') || (!redux_currentdetailpage && document.location.pathname !== '/'))

        ) {

            console.log('Create Static List');

            composeStaticList().then((list) => {
                setStaticList(list)
                setLocalUser(redux_localeuser)
                setIsLocation(document.location.pathname)
                setCurrentDetailPage(redux_currentdetailpage)
                setIsLoading(false)

            })

        }

    }, [composeStaticList, isStaticList, redux_localeuser, userdata, redux_currentdetailpage])

    React.useEffect(() => {

        async function runComposeMenu() {
            return isStaticList.map((item, i) => {

                if (item.name !== 'My Cart') {
                    return <DefaultLink
                        item={item}
                        i={i}
                        key={i}
                    />
                } else if (item.name === 'My Cart') {
                    return <CartLink
                        item={item}
                        i={i}
                        key={i}

                    />

                } else {
                    return null

                }
            })

        } 

        if (!isComposedMenu) {

            if (isStaticList
                && userdata
                && !isLoading
    
            ) {
    
                runComposeMenu().then((menu)=>{
                    setComposedMenu(menu)
                })
    
            }

        }

    },[isComposedMenu, isCurrentDetailPage, isLoading, isLocalUser, isLocation, isStaticList, redux_currentdetailpage, redux_localeuser, userdata])


    return isComposedMenu && !isLoading ? isComposedMenu : null
}


export function CartLink({ item, i }) {
    const classes = useStyles();
    let currentdetailpage = useSelector(state => state.page.current_detail_page)
    let redux_cartuser = useSelector(state => state.user.cartUser)
    const [totalQuantity, setTotalQuantity] = useState(0);

    let reactrouter = useRouter()
    let dispatch = useDispatch()


    React.useEffect(() => {

        if (redux_cartuser) {
            let sum_of_products = redux_cartuser.reduce((accum, currentValue) => {
                return accum + currentValue.quantity
            }, 0)

            setTotalQuantity(sum_of_products)
        } else {
            setTotalQuantity(0)

        }

    }, [redux_cartuser])

    return <ListItem className={classes.listItem} key={item.name} >
        <Link
            to={item.link_to}
            style={{
                paddingRight: `25px`
            }}
            onClick={() => plg_clearProps({ dispatch, model: 'page', actionType: 'current_detail' })}
            className={cx(classes.navLink, {
                [classes.navLinkActive]: activeRoute(currentdetailpage, item, reactrouter)
            })}
            color="transparent"
        >
            <ShoppingCart className={classes.icons} />
            <div
                style={{
                    position: `absolute`,
                    background: `red`,
                    top: `0px`,
                    color: `inherit`,
                    borderRadius: `50%`,
                    marginTop: `10px`,
                    marginLeft: `18px`,

                    padding: `0px 7px 2px 7px`,
                    // fontSize: `8px`,
                }}
            >{totalQuantity}</div></Link></ListItem>

}


const activeRoute = (currentdetailpage, item, reactrouter) => {


    if (item.link_to.length === 0) {
        if (currentdetailpage !== undefined && currentdetailpage._id === item._id) {
            return true
        } else {
            return false
        }
    } else {
        if (reactrouter.location.pathname === item.link_to) {
            return true
        } else {
            return false
        }
    }
};

