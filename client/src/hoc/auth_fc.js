import React, { useState } from 'react';
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

    let reduxprops = useSelector(state => state)
    // let redux_userdata = useSelector(state => state.user.userData)

    const [isloading, setIsLoading] = useState(true);
    // const [isAuthed, setIsAuthed] = useState(false);


    //==========================
    React.useEffect(() => {
        const authorizeUser = async () => {
            return await dispatch(authasync({ dataToSubmit: { model: 'user' }, actionType: 'auth' }))
        };

        authorizeUser().then(response => {

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


    }, [dispatch, history, reactrouter.match.path, reload])

    // const classes = useStyles();

    if (isloading) {


        return (null
        //     <div
        //     style={{
        //         //   backgroundImage: "url(" + image + ")",
        //         backgroundSize: "cover",
        //         backgroundColor: '#E2E2E2',
        //         backgroundPosition: " center",
        //         paddingTop: '25%',
        //         position: 'fixed',
        //         left: '0px',
        //         top: '0px',
        //         width: '100%',
        //         height: '100%',
        //         // zIndex: '9999',
        //         textAlign: 'center',
        //     }}
        // >
        //     <CircularProgress style={{ color: '#cccccc' }} thickness={7} />
        // </div>
        )
    } else {
        return (
                <Page {...reactrouter} user={reduxprops.user} />
        )
    }

}