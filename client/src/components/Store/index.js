import React, { useState, useCallback } from 'react';

import { storeFuncs_loadList } from '../../functions/HookFuncs/store_funcs';
// import { InputToComponent } from "./HomeFuncs/home_funcs"
import EcommercePage from '../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/EcommercePage/EcommercePage'

import { useSelector, useDispatch } from 'react-redux'

import CircularProgress from '@material-ui/core/CircularProgress';
import {
    plg_clearProps,
    plg_findMany
} from '../utils/Plugs/cms_plugs';

export default function Home() {
    // const classes = useStyles();

    const dispatch = useDispatch()

    let localeuser = useSelector(state => state.user.localeUser)
    let currencyuser = useSelector(state => state.user.currencyUser)

    const [isloading, setIsLoading] = useState(true);

    const loadProducts = useCallback(async () => {
    
        let inQuery = {}
    
        Object.assign(inQuery, {
          country: { "$eq": localeuser.referenceID.alpha2Code },
          language: { "$eq": localeuser.referenceID.languages[0].iso639_1 },
          visible: true,
        });
    
         await plg_findMany({ model: 'product', dispatch, actionType: 'list', inQuery, populate: [{ path: 'category' }, { path: 'type' }] })
   
    
      }, [dispatch, localeuser])

    const loadPage = useCallback(
        async () => {

            return await storeFuncs_loadList({
                dispatch,
                model:'mystore',
                actionType: 'current',
                localeuser
            })

        },[dispatch, localeuser])
    React.useEffect(() => {

        if (
            localeuser
            && currencyuser
            && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
        ) {

            loadPage().then((item) => {

                loadProducts().then(()=>{

                    setIsLoading(false)
                })

            })
        }


    }, [currencyuser, loadPage, loadProducts, localeuser]);


    React.useEffect(() => {
        return function cleanup() {
            plg_clearProps({ dispatch, model: 'mystore', actionType: 'current' })

        };
    },[dispatch])

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
