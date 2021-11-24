import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    useLocation,
} from 'react-router-dom';
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from '@material-ui/core/CircularProgress';
import parentstyleFunc from "./theming/Funcs/parentstyleFunc";

import {
    plg_findOne_QueMod,
    plg_create_oprMod,
    plg_aggregate
} from './components/utils/Plugs/cms_plugs';
import {
    act_getGeoLocation,
    act_injectProp
} from '../../client/src/redux/actions/generic/generic_actions'
import {
    layoutFuncs_findCurrency
} from './hoc/Funcs/layout_funcs';

import Panel from './components/Panel/panel'
import Frontside from './components/Frontside/frontside'
import HeaderHolder from './components/Header_footer/Header';

export default function App() {
    const dispatch = useDispatch()
    let location = useLocation()
    // const isFirstRender = useRef(true);

    let localeuser = useSelector(state => state.user.localeUser)
    let currentmysite = useSelector(state => state.mysite.CurrentMysite)

    const [isBodyTheme, setIsBodyTheme] = React.useState({});

    const processStyle = useCallback(async (item) => {
        return await parentstyleFunc(item)
    }, [])

    const useDynoStyles = makeStyles(isBodyTheme ? isBodyTheme : null);
    const parentclasses = useDynoStyles();



    /* Find Mysite */
    React.useEffect(() => {

        async function findMysite() {
            let inQuery = {
                isdefault: { "$eq": true }
            }
            let mysite_result = await plg_findOne_QueMod({
                model: 'mysite', dispatch, actionType: 'current', inQuery, populate: [{ path: 'default_language', populate: { path: 'referenceID', model: 'Nation' } }, {
                    path: 'checked', populate: {
                        path: 'referenceID',
                        model: 'Theme'
                    }
                }]
            })

            if (mysite_result.payload.checked.length > 0) {

                processStyle({ currentmysite: mysite_result.payload }).then((result) => {
                    console.log('setBodytheme');
                    setIsBodyTheme(result)
                })

            }
            return mysite_result.payload
        }

        if (currentmysite === undefined) {

            findMysite()
        }

    }, [currentmysite, dispatch, processStyle]);

    React.useEffect(() => {

        async function findLanguage(cm) {

            let iplocator = await act_getGeoLocation()

            let inQuery
            await plg_create_oprMod({ model: 'visit', dispatch, actionType: 'samestate', inInsert: iplocator.payload })
            try {
                if (iplocator.payload.Success) {

                    let inPipeline = [
                        {
                            $match: {
                                alpha2Code: { "$eq": iplocator.payload.data.country.iso_code }
                            }
                        },
                        {
                            $lookup:
                            {
                                from: "languages",
                                as: "agg_lg",
                                let: { wspolny_id: "$_id" },
                                pipeline: [{
                                    $match: {
                                        $expr: { $eq: ["$$wspolny_id", "$referenceID"] },
                                    }
                                },
                                ]
                            }
                        },
                        {
                            $set: {
                                agg_nation: "$$ROOT"
                            }
                        }

                    ]

                    let result = await plg_aggregate({ model: 'nation', dispatch, actionType: 'samestate', inPipeline })

                    if (result.payload[0].agg_lg[0]) {
                        result.payload[0].agg_lg[0].referenceID = result.payload[0].agg_nation
                        let lg_found = result.payload[0].agg_lg[0]

                        await dispatch(act_injectProp({ dataToSubmit: iplocator.payload, model: 'user', actionType: 'geodata' }))
                        await dispatch(act_injectProp({ dataToSubmit: lg_found, model: 'language', actionType: 'locale' }))

                    } else {
                        throw iplocator
                    }

                } else {
                    throw iplocator
                }

            } catch (iplocator) {

                inQuery = {
                    _id: { "$eq": cm.default_language._id }
                }
                let result = await plg_findOne_QueMod({ model: 'language', dispatch, actionType: 'locale', inQuery, populate: [{ path: 'referenceID' }] })

                return result.payload
            }

        }

        if (currentmysite !== undefined && localeuser === undefined) {

            findLanguage(currentmysite)

        }
    }, [currentmysite, dispatch, localeuser])

    React.useEffect(() => {


        if (currentmysite !== undefined && localeuser !== undefined) {

            layoutFuncs_findCurrency({ localeuser, currentmysite, dispatch })
        }
    }, [currentmysite, dispatch, localeuser])

    const MemoizedWrapper = React.useCallback((props) => {
        console.log('APP Wrapper');

        if (parentclasses.body) {

            return <div
                className={cx(parentclasses.body)}
            >
                {props.children}
            </div>
        } else {
            return <div>
                {props.children}
            </div>
        }
    }, [parentclasses.body])

    if (
        currentmysite
        && localeuser
        && (
            location.pathname.includes('/admin')
            || location.pathname.includes('/client')
            || location.pathname.includes('/contentmanager')
        )

    ) {
        return <div>
            <Panel />
        </div>
    } else if (
        currentmysite
        && localeuser
    ) {
        return <div>            

            <HeaderHolder /><MemoizedWrapper>
                <Frontside />
            </MemoizedWrapper></div>
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
