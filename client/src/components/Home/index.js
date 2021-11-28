import React, { useState, useCallback } from 'react';

import { loadList_v3 } from './HomeFuncs/loadlist';
import SectionsPage from './HomeFuncs/SectionsPage.js'

import { useSelector, useDispatch } from 'react-redux'

import CircularProgress from '@material-ui/core/CircularProgress';
import {
    plg_findOne_QueMod,
    plg_aggregate
} from '../../components/utils/Plugs/cms_plugs';

export default function Home() {

    const dispatch = useDispatch()

    let localeuser = useSelector(state => state.user.localeUser)
    let currencyuser = useSelector(state => state.user.currencyUser)


    let currentdetailpage = useSelector(state => state.page.current_detail_page)
    // let currentlistpage = useSelector(state => state.page.current_list_page)

    let current_mysite = useSelector(state => state.mysite.CurrentMysite)
    const [isWall, setIsWall] = useState();

    const setDefaultHomePage = useCallback(async () => {
        let inQuery = {}
        Object.assign(inQuery, {
            isdefault: { "$eq": true },
            country: { "$eq": localeuser.referenceID.alpha2Code },
            language: { "$eq": localeuser.referenceID.languages[0].iso639_1 }
        });

        await plg_findOne_QueMod({
            model: 'page', dispatch, actionType: 'current_detail', inQuery
        })

    }, [dispatch, localeuser])


    React.useEffect(() => {
        if (
            currentdetailpage === undefined
            && localeuser !== undefined
            && currencyuser
        ) {
            setDefaultHomePage()
        }

    }, [currencyuser, currentdetailpage, setDefaultHomePage])

    const loadPage = useCallback(async () => {

        return await loadList_v3({
            dispatch,
            currentdetailpage,
            current_mysite,
            currencyuser,
            localeuser
        })
    }, [currencyuser, current_mysite, currentdetailpage, dispatch, localeuser]);


    React.useEffect(() => {

        if (
            currentdetailpage !== undefined
            && localeuser
            && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
        ) {

            loadPage().then((allbricks) => {

                let wall = allbricks.map((a) => a.referenceID)

                setIsWall(wall)

            })

        }

    }, [currencyuser, currentdetailpage, loadPage, localeuser]);

    if (isWall) {
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
