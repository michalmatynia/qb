import React, { useState, useCallback } from 'react';
import { authasync } from '../redux/actions/user_actions';
// import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux'
import {
    useHistory,
} from "react-router-dom";
import {
    useRouter,
} from "./Funcs/hook_funcs";
import CircularProgress from '@material-ui/core/CircularProgress';
// import sectionsPageStyle from "../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsPageStyle.js";

// const useStyles = makeStyles(sectionsPageStyle);

// BACK TO THE ROOTS
export default function AuthFC(props) {
    // { Page, reload, adminRoute } adminRoute is unused argument at the moment
    const { Page, reload } = props

    let history = useHistory();
    // let location = useLocation();
    let reactrouter = useRouter()

    const dispatch = useDispatch()

    const [isloading, setIsLoading] = useState(true);
    // const [isAuthed, setIsAuthed] = useState(false);


    //==========================

    const authorizeUser = useCallback(async () => {
           return await dispatch(authasync({ dataToSubmit: { model: 'user' }, actionType: 'auth' }))
    }, [dispatch])
    React.useEffect(() => {

        authorizeUser().then(response => {

            console.log(response);

            if (response.payload.isAuth === false) {


                if (reload === true) {
                    console.log('no user is Auth')

                    history.push('/login_page')
                }  else if (reload === false) {
                    // history.push('/login_page')
                } else {
                    // history.push('/login_page')
                }

            } else {

                if (reload === false) {
                    if (response.payload.role === 1) {
                        history.push('/admin/dashboard')
                    } else if (response.payload.role === 2) {
                        history.push('/contentmanager/dashboard')
                    }
                } else {
                    if (reactrouter.match.path.includes('/admin') && response.payload.role !== 1) {
                        history.push('/login_page')
                    } else if (reactrouter.match.path.includes('/contentmanager') && response.payload.role !== 2) {
                        history.push('/login_page')

                    }
                }

                // Content Manager
                // else if (response.payload.role === 2) {
                //     if (reload === false) {
                //         history.push('/contentmanager/dashboard')
                //     }
                // }

            }

            setIsLoading(false)


        })


    }, [authorizeUser, history, reactrouter.match.path, reload])

    // const classes = useStyles();



    return (
        !isloading ? <div> <Page  /> </div> : null
    )


}