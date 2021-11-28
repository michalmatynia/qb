import React, { useCallback } from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux'
import Fade from 'react-reveal/Fade';

/* STATE */
import { rawStateFunction } from "./Additional/func_state"

import {
    plg_findOne_QueMod,
    plg_clearProps,
} from '../../../../../utils/Plugs/cms_plugs';

import FormCustomSelect from '../../../../../utils/Form/Funcs/FormCustomSelect';

import { compoFuncs_Refresh_vh3 } from '../../../../../User/Admin/GenericFuncs/compo_funcs_vh'

export default function ListLanguageMenu() {

    const dispatch = useDispatch()
    let redux_cartuser = useSelector(state => state.user.cartUser)

    let redux_localeuser = useSelector(state => state.user.localeUser)
    let redux_current_detail_page = useSelector(state => state.page.current_detail_page)
    let redux_current_list_page = useSelector(state => state.page.current_list_page)

    const [isRawState, setRawState] = React.useState();
    const [isLocalStorage, setLocalStorage] = React.useState();
    const [isLocalUser, setLocalUser] = React.useState();
    const [isPrevLocalUser, setPrevLocalUser] = React.useState();
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

        console.log('runInstateFunctions');

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

    /* Cleanup */
    React.useEffect(() => {

        if (isLocalUser !== redux_localeuser) {

            setIsLoading(true)
            setRawState()
            setPrevLocalUser(isLocalUser)
            setLocalUser(redux_localeuser)

        }

    }, [isLocalUser, redux_localeuser])

    React.useEffect(() => {

        if (isRawState && isLoading && redux_localeuser) {
            runInStateFunctions().then(()=>{
                setLocalUser(redux_localeuser)
                setIsLoading(false)

            })
        }

    }, [isLoading, isRawState, redux_localeuser, runInStateFunctions])

    
    const onChange = useCallback(async ({ event, value = null, cell = null }) => {

        if (value._id !== redux_localeuser._id && isLocalStorage) {

            let inQuery = { _id: { "$eq": value._id } }
            await plg_findOne_QueMod({ model: isLocalStorage.model, dispatch, actionType: 'locale', inQuery, populate: isLocalStorage.qhelpers.populate })

            // ==================

            if (document.location.pathname === '/' && redux_current_detail_page) {

                inQuery = {
                    country: { "$eq": value.referenceID.alpha2Code },
                    language: { "$eq": value.referenceID.languages[0].iso639_1 }
                }
                if (redux_current_detail_page !== '' && redux_current_detail_page.lgbinder !== '') {
                    Object.assign(inQuery, { lgbinder: { "$eq": redux_current_detail_page.lgbinder } })
                } else {
                    Object.assign(inQuery, { isdefault: { "$eq": true } })

                }

                await plg_findOne_QueMod({ model: 'page', dispatch, actionType: 'current_detail', inQuery })

            }

            if(redux_cartuser) {
                plg_clearProps({ dispatch, model: 'user', actionType: 'cart' })

            }

        }
    }, [dispatch, isLocalStorage, redux_cartuser, redux_current_detail_page, redux_localeuser])


    return (
        isLocalStorage && !isLoading  ? <div
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
            {
                <FormCustomSelect
                    formcell={isLocalStorage.form.formdata.ticked}
                    formcellkey='ticked'
                    change={({ event, cell, value }) => onChange({
                        event,
                        cell,
                        value
                    })}
                />
            }
        </div> : null

    )

}