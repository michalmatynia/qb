import React, { useState } from 'react';

import { storeFuncs_loadList } from '../../../functions/HookFuncs/store_funcs';
// import { InputToComponent } from "./HomeFuncs/home_funcs"
import LoginWrapper from './LoginWrapper'

import { useSelector, useDispatch } from 'react-redux'

import CircularProgress from '@material-ui/core/CircularProgress';

export default function Login() {
    // const classes = useStyles();

    const dispatch = useDispatch()

    let localeuser = useSelector(state => state.user.localeUser)
    let currencyuser = useSelector(state => state.user.currencyUser)

    const [isloading, setIsLoading] = useState(true);
    const [isSourceComponent, setSourceComponent] = useState(null);

    React.useEffect(() => {

        async function loadPage() {
            return await storeFuncs_loadList({
                dispatch,
                model: 'login',
                localeuser
            })
        }

        if (
            localeuser !== undefined
            && currencyuser !== undefined
            && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
        ) {

            setIsLoading(true)

            loadPage().then((item) => {

                setSourceComponent(item)
                setIsLoading(false)
            })
        }
        // return function cleanup() {
        //     plg_clearProps({ dispatch, model: 'product', actionType: 'list' })

        // };

    }, [currencyuser, dispatch, localeuser]);

    if (isloading) {
        return (
            <div
                style={{
                    //   backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundColor: '#595959',
                    backgroundPosition: " center",
                    paddingTop: '25%',
                    position: 'fixed',
                    left: '0px',
                    top: '0px',
                    width: '100%',
                    height: '100%',
                    // zIndex: '9999',
                    textAlign: 'center',
                }}
            >
                <CircularProgress style={{ color: '#cccccc' }} thickness={7} />
            </div>
        )
    } else if (!isloading) {
        return (
            <div>
                    {isSourceComponent ? <LoginWrapper
                        list={isSourceComponent}
                     /> : null}
            </div>

        )
    }
}
