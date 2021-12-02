import React, { useState, useCallback } from 'react';

import { loadList_v3 } from './HomeFuncs/loadlist';
import SectionsPage from './HomeFuncs/SectionsPage.js'

import { useSelector, useDispatch } from 'react-redux'

import CircularProgress from '@material-ui/core/CircularProgress';
import {
    plg_findOne_QueMod,
} from '../../components/utils/Plugs/cms_plugs';

export default function Home() {

    const dispatch = useDispatch()

    let redux_localeuser = useSelector(state => state.user.localeUser)
    let currencyuser = useSelector(state => state.user.currencyUser)


    let redux_currentdetailpage = useSelector(state => state.page.current_detail_page)
    let currentlistpage = useSelector(state => state.page.current_list_page)

    let current_mysite = useSelector(state => state.mysite.CurrentMysite)
    const [isWall, setIsWall] = useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isLocalUser, setLocalUser] = React.useState();
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


    const findPage = useCallback(async () => {


        let inQuery = {}
        if (redux_currentdetailpage.lgbinder !== '') {
            Object.assign(inQuery, { 
                lgbinder: { "$eq": redux_currentdetailpage.lgbinder},
                country: { "$eq": redux_localeuser.referenceID.alpha2Code },
                language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 }
             })
            

        } else {
            Object.assign(inQuery, { _id: { "$eq": redux_currentdetailpage._id } })

        }

        return await plg_findOne_QueMod({
            model: 'page', dispatch, actionType: 'current_detail', inQuery
        })

    }, [dispatch, redux_currentdetailpage, redux_localeuser])
    /* Grab Default  */

    React.useEffect(() => {

        if (
            redux_localeuser
            && document.location.pathname === '/'
        ) {
            if (
                !isCurrentDetailPage && !redux_currentdetailpage && !isWall && !isLocalUser && isLoading) {

                setLocalUser(redux_localeuser)

                setDefaultHomePage().then((item) => {

                    setCurrentDetailPage(item.payload)


                })
            } else if((isLocalUser !== redux_localeuser) && redux_currentdetailpage && isLocalUser && isWall) {
                setIsLoading(true)

                setLocalUser(redux_localeuser)
                findPage().then((item) => {
                    setIsWall()

                    setCurrentDetailPage(item.payload)
                    setLocalUser(redux_localeuser)

                })
            } else if (
                (
                    isCurrentDetailPage !== redux_currentdetailpage
                    && isCurrentDetailPage
                    && redux_currentdetailpage
                )
                ||
                (
                    !isCurrentDetailPage
                    && redux_currentdetailpage
                    && !isLocalUser
                )
            ) {
                setIsLoading(true)
                setIsWall()
                setCurrentDetailPage(redux_currentdetailpage)
                setLocalUser(redux_localeuser)
            }

        }

    }, [currentlistpage, isCurrentDetailPage, isLoading, isLocalUser, isWall, redux_currentdetailpage, redux_localeuser, findPage, setDefaultHomePage])



    const loadPage = useCallback(async () => {

        return await loadList_v3({
            dispatch,
            mydetailpage: isCurrentDetailPage,
            current_mysite,
            currencyuser,
            redux_localeuser
        })
    }, [currencyuser, current_mysite, dispatch, isCurrentDetailPage, redux_localeuser]);


    React.useEffect(() => {

        if (
            isCurrentDetailPage
            && currencyuser
            && redux_localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
            && !isWall
            && isLoading
            && isLocalUser === redux_localeuser
        ) {

            loadPage().then((allbricks) => {
                let wall = allbricks.map((a) => a.referenceID)

                setIsWall(wall)
                setIsLoading(false)

            })
        }

    }, [currencyuser, isCurrentDetailPage, isLoading, isLocalUser, isWall, loadPage, redux_localeuser]);


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
