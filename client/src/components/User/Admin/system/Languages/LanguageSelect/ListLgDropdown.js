import React, { useCallback } from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux'
import Fade from 'react-reveal/Fade';
import {
    plg_findOne_QueMod,
    plg_create_oprMod,
    plg_aggregate,
    plg_clearProps
} from '../../../../../utils/Plugs/cms_plugs';
import {
    act_getGeoLocation,
    act_injectProp
} from '../../../../../../redux/actions/generic/generic_actions'
import {
    layoutFuncs_findCurrency
} from '../../../../../../hoc/Funcs/layout_funcs';
/* STATE */
import { rawStateFunction } from "./Additional/func_state"

import FormCustomSelect from '../../../../../utils/Form/Funcs/FormCustomSelect';

import { compoFuncs_Refresh_vh3 } from '../../../../../User/Admin/GenericFuncs/compo_funcs_vh'

export default function ListLanguageMenu() {

    const dispatch = useDispatch()
    let redux_cartuser = useSelector(state => state.user.cartUser)
    let redux_currentmysite = useSelector(state => state.mysite.CurrentMysite)

    let redux_localeuser = useSelector(state => state.user.localeUser)
    let redux_current_detail_page = useSelector(state => state.page.current_detail_page)

    const [isRawState, setRawState] = React.useState();
    const [isLocalStorage, setLocalStorage] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

    const establishStateParams = useCallback(async () => {

        let rawstate = await rawStateFunction({ redux_localeuser, dispatch })
        setRawState(rawstate)

    }, [dispatch, redux_localeuser])

    React.useEffect(() => {

        if (!isRawState && redux_localeuser) {

            establishStateParams()

        }

    }, [establishStateParams, isRawState, redux_localeuser])

    const runInStateFunctions = useCallback(async () => {

        let didmount_result = await compoFuncs_Refresh_vh3({
            model: isRawState.localStorage.model,
            dispatch,
            redux_localeuser,
            myLocalStorage: isRawState.localStorage,
            poliglot: isRawState.localStorage.poliglot,
            type: 'add'
        });

        setLocalStorage(didmount_result.newLocalStorage)

    }, [dispatch, isRawState, redux_localeuser])

    React.useEffect(() => {

        if (isRawState && isLoading && redux_localeuser) {
            runInStateFunctions().then(()=>{
                setIsLoading(false)

            })
        }

    }, [isLoading, isRawState, redux_localeuser, runInStateFunctions])

    /* Cleanup */

    React.useEffect(() => {

        async function findLanguage(cm) {

            let iplocator = await act_getGeoLocation()

            // let iplocator = {payload: ''}
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

                        dispatch(act_injectProp({ dataToSubmit: iplocator.payload, model: 'user', actionType: 'geodata' }))
                        dispatch(act_injectProp({ dataToSubmit: lg_found, model: 'language', actionType: 'locale' }))

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

        if (redux_currentmysite !== undefined && redux_localeuser === undefined ) {

            setIsLoading(true)
            findLanguage(redux_currentmysite)
        }
    }, [redux_currentmysite, dispatch, redux_localeuser, isRawState])

        React.useEffect(() => {


        if (redux_currentmysite !== undefined && redux_localeuser !== undefined) {

            layoutFuncs_findCurrency({ localeuser: redux_localeuser, currentmysite: redux_currentmysite, dispatch })
        }
    }, [dispatch, redux_currentmysite, redux_localeuser])


    const onChange = useCallback(async ({ event, value = null, cell = null }) => {

        if (value._id !== redux_localeuser._id && isLocalStorage) {

            console.log('Change localeuser in lgdropdown');

            let inQuery = { _id: { "$eq": value._id } }
            await plg_findOne_QueMod({ model: isLocalStorage.model, dispatch, actionType: 'locale', inQuery, populate: isLocalStorage.qhelpers.populate })

            // ==================

            // if (document.location.pathname === '/' && redux_current_detail_page) {

            //     console.log('IN');

            //     inQuery = {
            //         country: { "$eq": value.referenceID.alpha2Code },
            //         language: { "$eq": value.referenceID.languages[0].iso639_1 }
            //     }
            //     if (redux_current_detail_page !== '' && redux_current_detail_page.lgbinder !== '') {
            //         Object.assign(inQuery, { lgbinder: { "$eq": redux_current_detail_page.lgbinder } })
            //     } else {
            //         Object.assign(inQuery, { isdefault: { "$eq": true } })

            //     }

            //     await plg_findOne_QueMod({ model: 'page', dispatch, actionType: 'current_detail', inQuery })

            // }

            if(redux_cartuser) {
                plg_clearProps({ dispatch, model: 'user', actionType: 'cart' })

            }

        }
    }, [dispatch, isLocalStorage, redux_cartuser, redux_localeuser])


    return  ( isLocalStorage && !isLoading && redux_localeuser && isRawState ? <div
        // style={{
        //     position: 'fixed',
        //     // left: '0px',
        //     // top: '0px',
        //     width: '10px',
        //     height: '10px',
        //     // zIndex: '9999',
        //     textAlign: 'center',
        // }}
        >
                <FormCustomSelect
                    formcell={isLocalStorage.form.formdata.ticked}
                    formcellkey='ticked'
                    change={({ event, cell, value }) => onChange({
                        event,
                        cell,
                        value
                    })}
                />
        </div> : null

    )

}