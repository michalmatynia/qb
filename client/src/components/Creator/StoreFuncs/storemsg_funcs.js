import React from "react";

import Snackbar from "../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Snackbar/Snackbar.js";


export function ShowMessages({ mystore, visible }) {

    const [tr, setTR] = React.useState(false);

    React.useEffect(() => {
        setTR(visible)

        // return setTimeout( () => {
        //      setTR(false)

        // }, 1000)

    }, [visible])


    if (tr) {
        return <Snackbar
            place="bl"
            color='info'
            // icon={AddAlert}
            message={mystore.addedtocart_msg}
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