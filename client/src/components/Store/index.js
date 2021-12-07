import React, { useState, useCallback } from 'react';

import { storeFuncs_loadList } from '../../functions/HookFuncs/store_funcs';
// import { InputToComponent } from "./HomeFuncs/home_funcs"
import EcommercePage from '../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/EcommercePage/EcommercePage'

import { useSelector, useDispatch } from 'react-redux'
import { actionFuncs_recalculatePrice_v3 } from '../../components/User/Admin/ActionFunctions/recalculatePrice'

import CircularProgress from '@material-ui/core/CircularProgress';
import {
    plg_clearProps,
    plg_findMany
} from '../utils/Plugs/cms_plugs';

import {
    act_injectProp,
} from '../../redux/actions/generic/generic_actions';

export default function Home() {
    // const classes = useStyles();

    const dispatch = useDispatch()

    let localeuser = useSelector(state => state.user.localeUser)
    let current_mysite = useSelector(state => state.mysite.CurrentMysite)

    let currencyuser = useSelector(state => state.user.currencyUser)
    const [isLocalUser, setLocalUser] = React.useState();
    const [isloading, setIsLoading] = useState(true);

    const loadProducts = useCallback(async () => {

        let inQuery = {}

        Object.assign(inQuery, {
            country: { "$eq": localeuser.referenceID.alpha2Code },
            language: { "$eq": localeuser.referenceID.languages[0].iso639_1 },
            visible: true,
        });

        let current_products = await plg_findMany({ model: 'product', dispatch, actionType: 'list', inQuery, populate: [{ path: 'category' }, { path: 'type' }] })

        if (current_mysite.default_language.referenceID.alpha2Code !== localeuser.referenceID.alpha2Code
        ) {

            let result = await actionFuncs_recalculatePrice_v3({ current_products, dispatch, current_mysite, currencyuser })

            dispatch(act_injectProp({ dataToSubmit: result.recalculated_list, model: 'product', actionType: 'list' }))

        }

    }, [currencyuser, current_mysite, dispatch, localeuser])

    const loadPage = useCallback(
        async () => {

            return await storeFuncs_loadList({
                dispatch,
                model: 'mystore',
                actionType: 'current',
                localeuser
            })

        }, [dispatch, localeuser])
    React.useEffect(() => {

        if (
            isLocalUser !== localeuser
            && currencyuser
            && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]

            ) {
            setIsLoading(true)

            loadPage().then((item) => {

                loadProducts().then(() => {

                    setLocalUser(localeuser)

                    setIsLoading(false)
                })

            })
        }


    }, [currencyuser, isLocalUser, loadPage, loadProducts, localeuser]);


    React.useEffect(() => {
        return function cleanup() {
            console.log('cleanup');
            plg_clearProps({ dispatch, model: 'mystore', actionType: 'current' })
            plg_clearProps({ dispatch, model: 'product', actionType: 'list' })

        };
    }, [dispatch])

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
        return (<div>
            <EcommercePage />
        </div>
        )
    }
}
