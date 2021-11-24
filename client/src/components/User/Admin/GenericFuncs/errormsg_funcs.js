import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import Snackbar from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Snackbar/Snackbar.js";

// import styles from "../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";

// import { makeStyles } from "@material-ui/core/styles";
// import AddAlert from "@material-ui/icons/AddAlert";

import {
    plg_findOne_QueMod,
    plg_clearProps
} from '../../../utils/Plugs/cms_plugs';

// const useStyles = makeStyles(styles);

export async function errorClosure({ myprops = null, dispatch = null }) {
    let inQuery = { type: { "$eq": 'error' } }

    await plg_findOne_QueMod({ model: 'message', myprops, dispatch, actionType: 'detail', inQuery })

    // setTimeout(async () => {
    //     await plg_clearProps({ myprops, model: 'message', actionType: 'detail' })

    // }, 500)
}
export async function messageLoading({ myprops = null, dispatch = null }) {

    let inQuery = { type: { "$eq": 'loading' } }
    await plg_findOne_QueMod({ model: 'message', myprops, dispatch, actionType: 'detail', inQuery })
}
export async function messageCompleted({ myprops = null, dispatch = null }) {
    // Handle Messages
    let inQuery = { type: { "$eq": 'completed' } }
    await plg_findOne_QueMod({ model: 'message',dispatch,  myprops, actionType: 'detail', inQuery })

    // setTimeout(async () => {
    //     await plg_clearProps({ myprops, model: 'message', actionType: 'detail' })
    // }, 500)
}
export function showMessages({ myprops = null }) {

    if (myprops.messages.DetailMessage) {

        if (myprops.messages.DetailMessage.type === 'completed') {
            return <div className="form_success">{myprops.messages.DetailMessage.text}</div>
        } else if (myprops.messages.DetailMessage.type === 'loading') {
            return <div className="form_success">{myprops.messages.DetailMessage.text}</div>
        } else if (myprops.messages.DetailMessage.type === 'error') {
            return <div className="error_label">{myprops.messages.DetailMessage.text}</div>
        } else if (myprops.messages.DetailMessage.type === 'custom') {
            return <div className="error_label">{myprops.messages.DetailMessage.text}</div>
        } else {
            return null
        }

    }
}
export function ShowMessages() {

    // const classes = useStyles();
    let messagedetail = useSelector(state => state.messages.DetailMessage)
    const dispatch = useDispatch()

    const [tr, setTR] = React.useState(false);
    
    React.useEffect(() => {
           return function cleanup() {

            plg_clearProps({ dispatch, model: 'message', actionType: 'detail' })

        }
    },[dispatch])

    React.useEffect(() => {

        if (messagedetail) {
            setTR(true)
        }

        let timer
        // console.log(messagedetail);
        if (messagedetail) {

            if (messagedetail.type === 'loading') {
                timer = 10000000
            } else {
                timer = 2000
            }
        } else {
            timer = 2000
        }


         setTimeout(async () => {

            setTR(false);

            plg_clearProps({ dispatch, model: 'message', actionType: 'detail' })

        }, timer)

    }, [dispatch, messagedetail])


    if (tr) {
        return <Snackbar
            place="tr"
            color={messagedetail.color}
            // icon={AddAlert}
            message={messagedetail.text}
            open={tr}
            closeNotification={() => setTR(false)}
            close
        />
    } else {
        return null
    }

}

// color: PropTypes.oneOf([
//     "primary",
//     "info",
//     "success",
//     "warning",
//     "danger",
//     "transparent",
//     "white",
//     "rose",
//     "dark",
//   ]),