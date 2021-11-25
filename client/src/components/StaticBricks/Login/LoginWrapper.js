import React, { useCallback, useRef } from "react";
import cx from "classnames";

/* @material-ui */
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

import LoginPage from './LoginPage01'
// import LoginPage from './indextwo'
import ProcessAsWrapperBG from '../../../functions/HookFuncs/ProcessAsWrapperBG'

import loginPageStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(loginPageStyle);

export default function LoginWrapper({ list }) {
    const classes = useStyles();

    const WrapperOutputNext = useCallback(
        (props) => {

            if (list.images.length > 0) {

                return <ProcessAsWrapperBG
                    props={props}
                    list={list}
                    parentClassName={cx(
                        classes.pageHeader
                    )}
                />
            } else {
                return <div
                    className={cx(
                        classes.pageHeader
                    )}
                >{props.children}</div>
            }

        }, [classes.pageHeader, list])

    return (<WrapperOutputNext>
            <div className={classes.container}>
                <LoginPage
                    list={list} /></div>
        </WrapperOutputNext>)

}
