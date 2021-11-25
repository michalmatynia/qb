import React, { useCallback } from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux'

/* STATE */
import { rawStateFunction } from "./Additional/func_state"

import {
    plg_findOne_QueMod,
    plg_clearProps,
} from '../../../../../utils/Plugs/cms_plugs';

import {
    act_injectProp,
} from '../../../../../../redux/actions/generic/generic_actions';

import FormCustomSelect from '../../../../../utils/Form/Funcs/FormCustomSelect';

import { compoFuncs_Refresh_vh3 } from '../../../../../User/Admin/GenericFuncs/compo_funcs_vh'

export default function ListLanguageMenu() {

    const dispatch = useDispatch()
    let redux_localeuser = useSelector(state => state.user.localeUser)
    let redux_current_detail_page = useSelector(state => state.page.current_detail_page)
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

        if (!isRawState) {
            establishStateParams()

        }

    }, [establishStateParams, isRawState])

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
        if (isLocalUser === redux_localeuser) {
    
          return function cleanup() {
    
            console.log('cleanup');
    
            plg_clearProps({ dispatch, model: 'page', actionType: 'current_list' })
    
          };
        }
    
      }, [dispatch, isLocalUser, redux_localeuser]) 

    React.useEffect(() => {

        if (isRawState && isLoading) {
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

            if (document.location.pathname === '/') {

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

            /*             Clears the Cart on Language Change */
             dispatch(act_injectProp({ dataToSubmit: [], model: 'user', actionType: 'cart' }))

            // ==============

        }
    }, [dispatch, isLocalStorage, redux_current_detail_page, redux_localeuser._id])


    return (
        isLocalStorage && !isLoading ? <div
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