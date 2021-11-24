import React, { useState } from 'react';

import { storeFuncs_loadList } from './StoreFuncs/store_funcs';
// import { InputToComponent } from "./HomeFuncs/home_funcs"
import EcommercePage from './Views/EcommercePage'

import { useSelector, useDispatch } from 'react-redux'

import CircularProgress from '@material-ui/core/CircularProgress';
import {
    plg_clearProps
} from '../utils/Plugs/cms_plugs';

export default function Home() {
    // const classes = useStyles();

    const dispatch = useDispatch()

    let localeuser = useSelector(state => state.user.localeUser)
    let currencyuser = useSelector(state => state.user.currencyUser)

    const [isloading, setIsLoading] = useState(true);
    const [isMystore, setMystore] = useState(null);

    React.useEffect(() => {

        async function loadPage() {
            return await storeFuncs_loadList({
                dispatch,
                model:'mystore',
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

                setMystore(item)
                setIsLoading(false)
            })
        }
        return function cleanup() {
            plg_clearProps({ dispatch, model: 'product', actionType: 'list' })

        };

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
                    <EcommercePage
                        list={isMystore}
                    /> 
            </div>

        )
    }
}
