import React, { useCallback } from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux'
import { useHistory, useLocation } from "react-router-dom";

import { imageFuncs_removeImagesHandler_vh2 } from '../../GenericFuncs/image_funcs_vh'
import { submitFuncs_fullSubmit_vh2 } from '../../GenericFuncs/submit_funcs_vh'

import {
    useRouter,
} from "../../../../../hoc/Funcs/hook_funcs";

import CircularProgress from '@material-ui/core/CircularProgress';

/* STATE */
import { grabFunctionState } from "../EditAdd Functions/grabFunctionState"

import { updateFormValues } from '../../GenericFuncs/UpdateFormValues'
import { saveForm } from '../../GenericFuncs/saveForm'
import { submitForm } from '../../GenericFuncs/submitForm'
import { grabFormdata_vh2 } from '../../../../utils/Form/FormActions/grabFormdata_vh';
import { attachtoFuncs_populateEdit_vh2 } from '../../GenericFuncs/attachto_funcs_vh'
import AutocompleteMenu from '../../GenericCompos/autocomplete_menu'

import { ShowMessages } from '../../GenericFuncs/errormsg_funcs'

import FormContainer from '../../../../utils/Form/Funcs/FormContainer_v2'

import { compoFuncs_Refresh_vh3 } from '../../GenericFuncs/compo_funcs_vh'

import {
    plg_clearProps,
    plg_findOne_QueMod
} from '../../../../utils/Plugs/cms_plugs';

export default function EditAdd() {
    let reactrouter = useRouter()
    let reactrouter_history = useHistory()
    let reactrouter_location = useLocation()

    const dispatch = useDispatch()
    let redux_localeuser = useSelector(state => state.user.localeUser)

    let redux_current_mysite = useSelector(state => state.mysite.CurrentMysite)
    const [isRawState, setRawState] = React.useState();
    const [isLocalStorage, setLocalStorage] = React.useState();
    const [isPrevLocalStorage, setPrevLocalStorage] = React.useState();
    const [isPrevLocation, setPrevLocation] = React.useState();

    const [isLocalUser, setLocalUser] = React.useState();
    const [isloading, setIsLoading] = React.useState(true);
    const [isComponentType, setComponentType] = React.useState();

    let redux_module = useSelector(state => state[reactrouter.match.params.model])

    /* SET RAWSTATE  */

    const establishStateParams = useCallback(async () => {

        let rawstate = await grabFunctionState({ redux_current_mysite, redux_localeuser, dispatch, model: reactrouter.match.params.model, kind: 'list' })

        setRawState(rawstate)

    }, [dispatch, reactrouter, redux_current_mysite, redux_localeuser])

    React.useEffect(() => {
        if (!isLocalUser && !isRawState && redux_current_mysite && redux_localeuser) {

            establishStateParams()

        }

    }, [dispatch, establishStateParams, isLocalUser, isRawState, redux_current_mysite, redux_localeuser])

    /* CLEANUP */

    React.useEffect(() => {

        if (isRawState && isLocalUser === redux_localeuser && reactrouter_history.location.pathname === reactrouter_location.pathname && redux_localeuser) {


            return function cleanup() {

                console.log('cleanup');

                plg_clearProps({ dispatch, model: reactrouter.match.params.model, actionType: 'list' })
                plg_clearProps({ dispatch, model: reactrouter.match.params.model, actionType: 'detail' })

            };
        }

    }, [dispatch, isLocalUser, isRawState, reactrouter.match.params.model, reactrouter_history.location.pathname, reactrouter_location, redux_localeuser])


    /* CLEAR RAWSTATE */

    const unhingeRawState = useCallback(async () => {

        setRawState()
        setLocalUser()
        setPrevLocalStorage(isLocalStorage)
        // setPrevLocation(reactrouter_location)
        setLocalStorage()

    }, [isLocalStorage])

    React.useEffect(() => {


        if (isLocalUser && isRawState && redux_current_mysite && (redux_localeuser !== isLocalUser || reactrouter_history.location.pathname !== reactrouter_location.pathname || isPrevLocation.pathname !== reactrouter_location.pathname)) {
            setIsLoading(true)
            unhingeRawState()
        }

    }, [isLocalUser, isRawState, reactrouter_location, redux_current_mysite, redux_localeuser, unhingeRawState, reactrouter_history.location.pathname, reactrouter_history, isPrevLocation])


    
}