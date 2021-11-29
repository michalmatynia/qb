import React, { useState, useCallback } from 'react';

import { loadList_v3 } from './HomeFuncs/loadlist';
import SectionsPage from './HomeFuncs/SectionsPage.js'

import { useSelector, useDispatch } from 'react-redux'

import CircularProgress from '@material-ui/core/CircularProgress';
import {
    plg_findOne_QueMod,
    plg_aggregate,
    plg_clearProps
} from '../../components/utils/Plugs/cms_plugs';

export default function Home() {

    const dispatch = useDispatch()

    let redux_localeuser = useSelector(state => state.user.localeUser)
    let currencyuser = useSelector(state => state.user.currencyUser)


    let currentdetailpage = useSelector(state => state.page.current_detail_page)
    let currentlistpage = useSelector(state => state.page.current_list_page)

    let current_mysite = useSelector(state => state.mysite.CurrentMysite)
    const [isWall, setIsWall] = useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isLocalUser, setLocalUser] = React.useState();
    const [isPrevLocalUser, setPrevLocalUser] = React.useState();
    const [isCurrentDetailPage, setCurrentDetailPage] = React.useState();

    const setDefaultHomePage = useCallback(async () => {
        let inQuery = {}
        Object.assign(inQuery, {
            isdefault: { "$eq": true },
            country: { "$eq": redux_localeuser.referenceID.alpha2Code },
            language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 }
        });

        return await plg_findOne_QueMod({
            model: 'page', dispatch, actionType: 'current_detail', inQuery
        })

    }, [dispatch, redux_localeuser])


    React.useEffect(() => {
        if (
            !isCurrentDetailPage
            && !isLocalUser
            && !currentdetailpage
            && currentlistpage
            && redux_localeuser
            && isLoading
            && !isWall


        ) {

            console.log('Set Current Detail Page');
            setDefaultHomePage().then((item) => {

                setLocalUser(redux_localeuser)
                // console.log('brejk');
                setCurrentDetailPage(item.payload)


            })
        }

    }, [currentdetailpage, currentlistpage, isCurrentDetailPage, isLoading, isLocalUser, isWall, redux_localeuser, setDefaultHomePage])

    /* Lg Change */
    React.useEffect(() => {
        // console.log(isLocalUser);
        // console.log(redux_localeuser);

        if (
            isLocalUser !== redux_localeuser
            && isLocalUser
            && currentdetailpage
            && !isLoading
        ) {

            console.log('LG CHNAGE Load wall');

            setIsLoading(true)
            plg_clearProps({ dispatch, model: 'page', actionType: 'current_detail' })
            // setPrevLocalUser(isLocalUser)
            setLocalUser()
            setIsWall()
            setCurrentDetailPage()
            

        }

    }, [currentdetailpage, dispatch, isLoading, isLocalUser, redux_localeuser])

    const loadPage = useCallback(async () => {

        return await loadList_v3({
            dispatch,
            currentdetailpage,
            current_mysite,
            currencyuser,
            redux_localeuser
        })
    }, [currencyuser, current_mysite, currentdetailpage, dispatch, redux_localeuser]);


    React.useEffect(() => {

        if (
            isCurrentDetailPage
            && currentlistpage
            && redux_localeuser
            && redux_localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
            && !isWall
            && isLoading
            && isLocalUser
        ) {

            loadPage().then((allbricks) => {
                console.log('load Page');
                let wall = allbricks.map((a) => a.referenceID)

                setIsWall(wall)

                setIsLoading(false)

            })

        }

    }, [currencyuser, currentlistpage, isCurrentDetailPage, isLoading, isLocalUser, isWall, loadPage, redux_localeuser]);

    if (isWall && !isLoading) {
        return (
            <SectionsPage
                list={isWall}
            />
        )
    } else {
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
    }
}
