import React, { useCallback,useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from "../../../../../../hoc/Funcs/hook_funcs";
import cx from "classnames";

// nodejs library to set properties for components
import ListItem from "@material-ui/core/ListItem";
import { Link, useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";

import {
    plg_clearProps
} from '../../../../../../components/utils/Plugs/cms_plugs';

import styles from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";

// core components
import { plg_logoutUser } from '../../../../../../components/utils/Plugs/user_plugs';

import { plg_findOne_QueMod } from '../../../../../../components/utils/Plugs/cms_plugs';


const useStyles = makeStyles(styles);
// This VERSION IS CORRECT
export function ShowLinks({ staticlinks = null, dynamiclinks = null }) {

    let redux_localeuser = useSelector(state => state.user.localeUser)
    let userdata = useSelector(state => state.user.userData)
    const [isStaticList, setStaticList] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isLocalUser, setLocalUser] = React.useState();
    const [isPrevLocalUser, setPrevLocalUser] = React.useState();

      /* Lg Change */
      React.useEffect(() => {

        if (isLocalUser !== redux_localeuser && isLocalUser) {

            console.log('LG CHNAGE ShowLinks');

            setIsLoading(true)
            setPrevLocalUser(isLocalUser)
            setLocalUser(redux_localeuser)
            setStaticList()

        }

    }, [isLocalUser, redux_localeuser])
    
    const composeStaticList = useCallback(async () => {
        if(userdata) {

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
     ) {
            composeStaticList().then((list) => {
                setStaticList(list)
                setLocalUser(redux_localeuser)
                setIsLoading(false)

            })

        }

    }, [composeStaticList, isStaticList, redux_localeuser, userdata])

    if (isStaticList && userdata && !isLoading && redux_localeuser === isLocalUser) {

        console.log('inside isStaticList');

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
    } else {
        return null
    }



}
export async function logoutHandler({ dispatch, history, reduxprops }) {

    let response = await plg_logoutUser({ model: 'user', actionType: 'auth', dispatch })

    if (response.payload !== '') {

        // let inQuery = {}
        // Object.assign(inQuery, {
        //     isdefault: { "$eq": true },
        //     country: { "$eq": reduxprops.user.localeUser.referenceID.alpha2Code },
        //     language: { "$eq": reduxprops.user.localeUser.referenceID.languages[0].iso639_1 }
        // });

        // await plg_findOne_QueMod({ model: 'page', dispatch, actionType: 'current_detail', inQuery })
        plg_clearProps({ dispatch, model: 'page', actionType: 'current_list' })
        history.push('/')
    }

}
export async function setCurrentPage({ dispatch, item, history, reduxprops, reactrouter }) {

    if (reactrouter.location.pathname === '/') {

        if (item._id !== reduxprops.page.current_detail_page._id) {
            // window.scrollTo(0, 0);
            // document.body.scrollTop = 0;

            let inQuery = {
                _id: { "$eq": item._id }
            }
           await plg_findOne_QueMod({ model: 'page', actionType: 'current_detail', inQuery, dispatch })

        }
    } else {
        // window.scrollTo(0, 0);
        // document.body.scrollTop = 0;


        let inQuery = {
            _id: { "$eq": item._id }
        }
       await plg_findOne_QueMod({ model: 'page', actionType: 'current_detail', inQuery, dispatch })

        history.push('/')

    }

}


export function DefaultLink({ item }) {
    let dispatch = useDispatch()
    let history = useHistory()
    let reduxprops = useSelector(state => state)
    let currentdetailpage = useSelector(state => state.page.current_detail_page)
    let reactrouter = useRouter()


    const classes = useStyles();

    if (item.name === 'Log out') {
        return <ListItem className={classes.listItem} key={item.name} >

            <Link
                to={item.link_to}
                className={classes.navLink}
                color="transparent"
                onClick={() => logoutHandler({ dispatch, history, reduxprops })}
                style={{
                    cursor: `pointer`,
                    // display: `inline-block`,
                    // marginLeft: `60px`,
                }}
            >
                {item.name}
            </Link>
        </ListItem>
    } else if ('dynamiclink' in item) {
        return <ListItem className={classes.listItem} key={item.name} >
            <Button
                className={cx(classes.navLink, {
                    [classes.navLinkActive]: activeRoute(currentdetailpage, item, reactrouter)
                })}
                color="transparent"
                onClick={() => setCurrentPage({ dispatch, item, history, reduxprops, reactrouter })}

            >{item.name}
            </Button>
            {/* <Link
                to={item.link_to}
                onClick={() => setCurrentPage({ dispatch, item, history, reduxprops })}
                className={cx(classes.navLink, {
                    [classes.navLinkActive]: activeRoute(currentdetailpage, item, reactrouter)
                })}
                // className={cx(classes.navLink, {
                //     [classes.navLinkActive]: activeRoute("/")
                //   })}
                // className={classes.navLink + " " + classes.navLinkActive}
                color="transparent"
            >
                {item.name}
            </Link> */}
        </ListItem>
    } else {
        return <ListItem className={classes.listItem} key={item.name}>
            <Link
                to={item.link_to}
                onClick={() => {
                    plg_clearProps({ dispatch, model: 'page', actionType: 'current_detail' })
                    plg_clearProps({ dispatch, model: 'page', actionType: 'current_list' })
                }}
                className={cx(classes.navLink, {
                    [classes.navLinkActive]: activeRoute(currentdetailpage, item, reactrouter)
                })}>
                {item.name}
            </Link>

            {/* <Error className={classes.dropdownIcons} />  */}

        </ListItem>
    }

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

