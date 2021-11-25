import React, { useCallback, useRef } from "react";
import cx from "classnames";

/* @material-ui */
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

import LoginPage from './LoginPage01'
// import LoginPage from './indextwo'
import { ShowMessages } from '../../../components/Message/Generic/static_msg'
import ProcessAsWrapperBG from '../../../functions/HookFuncs/ProcessAsWrapperBG'

import loginPageStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(loginPageStyle);

export default function LoginWrapper({ list }) {
    const classes = useStyles();
    const isShowMessage = useRef(false);
    // const [isShowMessage, setShowMessage] = React.useState(false);
    const [isMessage, setMessage] = React.useState();

    React.useEffect(() => {
        if (list.message_loginfailed) {
            setMessage(list.message_loginfailed)
        }

    }, [list.message_loginfailed])

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

    return (console.log('loginwrapper'), <div>
        {/* {isShowMessage ? <ShowMessages
            visible={isShowMessage}
            message={isMessage}
            color='danger'
            place='bl'
        /> : null} */}
        <WrapperOutputNext>

            <div className={classes.container}>
                <LoginPage
                    // toggleMessage={(cb_toggleMessage) => { setShowMessage(cb_toggleMessage) }}
                    toggleMessage={(cb_toggleMessage) => { 
                        // setShowMessage(cb_toggleMessage) 
                    }}
                    list={list} /></div>
        </WrapperOutputNext></div>)

}
