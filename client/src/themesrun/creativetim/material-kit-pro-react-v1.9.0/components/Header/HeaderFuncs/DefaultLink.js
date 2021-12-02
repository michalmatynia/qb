import React from "react";
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
// core components
import { plg_logoutUser } from '../../../../../../components/utils/Plugs/user_plugs';

import { plg_findOne_QueMod } from '../../../../../../components/utils/Plugs/cms_plugs';

const useStyles = makeStyles(styles);

export function DefaultLink({ item }) {
    let dispatch = useDispatch()
    let history = useHistory()
    let reduxprops = useSelector(state => state)
    let currentdetailpage = useSelector(state => state.page.current_detail_page)
    // const [isCurrentDetailPage, setCurrentDetailPage] = React.useState();

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
                    console.log('staticlink');
                    plg_clearProps({ dispatch, model: 'page', actionType: 'current_detail' })
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
export async function logoutHandler({ dispatch, history, reduxprops }) {

    let response = await plg_logoutUser({ model: 'user', actionType: 'auth', dispatch })

    if (response.payload !== '') {

        let inQuery = {}
        Object.assign(inQuery, {
            isdefault: { "$eq": true },
            country: { "$eq": reduxprops.user.localeUser.referenceID.alpha2Code },
            language: { "$eq": reduxprops.user.localeUser.referenceID.languages[0].iso639_1 }
        });

        await plg_findOne_QueMod({ model: 'page', dispatch, actionType: 'current_detail', inQuery })


        // plg_clearProps({ dispatch, model: 'page', actionType: 'current_list' })
        // plg_clearProps({ dispatch, model: 'page', actionType: 'current_detail' })

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