import React, { useCallback } from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux'
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

import { imageFuncs_removeImagesHandler_vh2 } from '../../../User/Admin/GenericFuncs/image_funcs_vh'
import { submitFuncs_fullSubmit_vh2 } from '../../../User/Admin/GenericFuncs/submit_funcs_vh'

import {
    useRouter,
} from "../../../../hoc/Funcs/hook_funcs";

import CircularProgress from '@material-ui/core/CircularProgress';

import ListPanel from './List/ListPanel'
import GridContainer from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardBody.js";
import CardHeader from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardHeader.js";
import Button from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";
/* STATE */
import { grabFunctionState } from "./EditAdd Functions/grabFunctionState"

import { updateFormValues } from '../GenericFuncs/UpdateFormValues'
import { saveForm } from '../GenericFuncs/saveForm'
import { submitForm } from '../GenericFuncs/submitForm'
import { grabFormdata_vh2 } from '../../../utils/Form/FormActions/grabFormdata_vh';
import { attachtoFuncs_populateEdit_vh2 } from '../../../User/Admin/GenericFuncs/attachto_funcs_vh'
import AutocompleteMenu from '../GenericCompos/autocomplete_menu'
import { toggle_addToReferer, toggle_boolSwitch_v1 } from '../../../User/Admin/EventFuncs/toggle_funcs_vh'

import { ShowMessages } from '../GenericFuncs/errormsg_funcs'

import FormContainer from '../../../utils/Form/Funcs/FormContainer_v2'

import { compoFuncs_Refresh_vh3 } from '../../../User/Admin/GenericFuncs/compo_funcs_vh'

import {
    plg_clearProps,
    plg_findOne_QueMod
} from '../../../utils/Plugs/cms_plugs';

export default function EditAdd() {
    let reactrouter = useRouter()
    let reactrouter_history = useHistory()
    let reactrouter_location = useLocation()
    let reactrouter_match = useRouteMatch();

    const dispatch = useDispatch()
    let redux_localeuser = useSelector(state => state.user.localeUser)
    let redux_currencyuser = useSelector(state => state.user.currencyUser)

    let redux_current_mysite = useSelector(state => state.mysite.CurrentMysite)
    const [isRawState, setRawState] = React.useState();
    const [isLocalStorage, setLocalStorage] = React.useState();
    const [isPrevLocalStorage, setPrevLocalStorage] = React.useState();
    const [isPrevLocation, setPrevLocation] = React.useState();
    const [isSublistModel, setSublistModel] = React.useState('slide');
    const [isLoadingSublist, setIsLoadingSublist] = React.useState(false);
    const [isHideIDs, setIsHideIDs] = React.useState(null);

    

    const [isLocalUser, setLocalUser] = React.useState();
    const [isloading, setIsLoading] = React.useState(true);
    const [isComponentType, setComponentType] = React.useState();

    let redux_module = useSelector(state => state[reactrouter.match.params.model])

    /* SET RAWSTATE  */

    const establishStateParams = useCallback(async () => {

        return await grabFunctionState({ redux_current_mysite, redux_currencyuser, reactrouter_match, redux_localeuser, dispatch, model: reactrouter.match.params.model })


    }, [dispatch, reactrouter.match.params.model, reactrouter_match, redux_currencyuser, redux_current_mysite, redux_localeuser])

    React.useEffect(() => {
        if (!isLocalUser && !isRawState && redux_current_mysite && redux_localeuser) {

            establishStateParams().then((rawstate) => {

                setRawState(rawstate)

            })

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

    /* FIND ENTITY */
    const PrepareEditForm = useCallback(async () => {

        let inQuery = {}
        let found = { payload: '' }
        /* Edit */
        if (isRawState.localStorage.poliglot) {

            Object.assign(inQuery, {
                country: { "$eq": redux_localeuser.referenceID.alpha2Code },
                language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 }
            })

        }
        if (isPrevLocalStorage && isRawState.localStorage.poliglot) {

            Object.assign(inQuery, { lgbinder: { "$eq": isPrevLocalStorage.form.formdata.lgbinder.value } })

        } else {
            Object.assign(inQuery, { _id: { "$eq": reactrouter.match.params.id } })
        }

        if (isPrevLocalStorage && 'lgbinder' in isPrevLocalStorage.form.formdata && isPrevLocalStorage.form.formdata.lgbinder.value === '') {
            found = { payload: '' }

        } else if (Object.values(inQuery).length > 0) {
            found = await plg_findOne_QueMod({ model: reactrouter.match.params.model, dispatch, actionType: 'detail', inQuery, populate: isRawState.localStorage.qhelpers.populate })
        }


        if (found.payload) {


            /* Edit View */
            reactrouter_history.push(`/admin/edit/${reactrouter.match.params.model}/${found.payload._id}`)
            setPrevLocation(reactrouter_history.location)

            let newLocalStorage
            let didmount_result = await compoFuncs_Refresh_vh3({
                model: reactrouter.match.params.model,
                found,
                dispatch,
                redux_localeuser,
                fields: found.payload,
                myLocalStorage: isRawState.localStorage,
                poliglot: isRawState.localStorage.poliglot,
                type: 'edit'
            });

            newLocalStorage = { ...didmount_result.newLocalStorage }

            if ('attachto' in newLocalStorage) {
                newLocalStorage = await attachtoFuncs_populateEdit_vh2({
                    model: Object.keys(newLocalStorage.attachto)[0],
                    newLocalStorage,
                    found: found.payload,
                    dispatch,
                    redux_localeuser
                })

            }
            setComponentType('edit')
            setLocalUser(redux_localeuser)
            setLocalStorage(newLocalStorage)

        }

        else if (!found.payload) {
            setComponentType('edit')
            setLocalUser(redux_localeuser)
            setLocalStorage()
            setPrevLocation(reactrouter.location)

            let stripped_current_detail = await grabFormdata_vh2({
                formdata: isPrevLocalStorage.form.formdata,
                dispatch,
                model: reactrouter.match.params.model,
                redux_current_mysite
            });

            let current_detail = { ...stripped_current_detail, _id: reactrouter.match.params.id }

            let added = await submitFuncs_fullSubmit_vh2({
                model: reactrouter.match.params.model,
                current: current_detail,
                prospect: stripped_current_detail,
                source_lg: isPrevLocalStorage.form.formdata.language.value,
                target_lg: redux_localeuser.referenceID.languages[0].iso639_1,
                language: redux_localeuser.referenceID.languages[0].iso639_1,
                country: redux_localeuser.referenceID.alpha2Code,
                dispatch,
                isLocalStorage: isPrevLocalStorage,
                redux_current_mysite,
                poliglot: isPrevLocalStorage.poliglot,
                redux_localeuser
            })

            if (added !== undefined) {




                // ===================

                //    /*          if (model === 'taxonomy') {
                //                 await taxoFuncs_mirrorAdded({ model, myprops, mystate, insert: added.payload, country: myprops.user.localeUser.referenceID.alpha2Code, language: myprops.user.localeUser.referenceID.languages[0].iso639_1, form: 'tagparent' })
                //                 await taxoFuncs_mirrorAdded({ model, myprops, mystate, insert: added.payload, country: myprops.user.localeUser.referenceID.alpha2Code, language: myprops.user.localeUser.referenceID.languages[0].iso639_1, form: 'tagchild' })
                //             } */


                reactrouter_history.push(`/admin/edit/${reactrouter.match.params.model}/${added.payload._id}`)

            }

        }

    }, [dispatch, isPrevLocalStorage, isRawState, reactrouter.location, reactrouter.match.params.id, reactrouter.match.params.model, reactrouter_history, redux_current_mysite, redux_localeuser])

    const PrepareAddForm = useCallback(async () => {

        if (isRawState) {
            /* Add View */
            if (isLocalStorage === undefined && isLocalUser === undefined) {
                setPrevLocation(reactrouter_location)

                let didmount_result = await compoFuncs_Refresh_vh3({
                    model: reactrouter.match.params.model,
                    found: null,
                    dispatch,
                    redux_localeuser,
                    fields: null,
                    myLocalStorage: isRawState.localStorage,
                    poliglot: isRawState.localStorage.poliglot,
                    type: 'add'
                });
                setLocalUser(redux_localeuser)

                setComponentType('add')
                setLocalStorage(didmount_result.newLocalStorage)

            }
        }

    }, [dispatch, isLocalStorage, isLocalUser, isRawState, reactrouter.match.params.model, reactrouter_location, redux_localeuser])

    const onToggleCheck = useCallback(async ({ value, cellkey }) => {

        let newChecked = await toggle_addToReferer({
            value,
            cellkey,
            isLocalStorage,
            isSublistModel
        })

       let checkedIDs = isLocalStorage.form.formdata[cellkey].value.map(a => {
           return a.referenceID._id
       })


        let newLocalStorage = {
            ...isLocalStorage,
            form: {
                ...isLocalStorage.form,
                formdata: {
                    ...isLocalStorage.form.formdata,
                    [cellkey]: {
                        ...isLocalStorage.form.formdata[cellkey],
                        value: newChecked
                    }
                }
            }
        }

        setIsHideIDs(checkedIDs)
        setLocalStorage(newLocalStorage)

    }, [isLocalStorage, isSublistModel])

    // if hasOwnProperty('checked')


    React.useEffect(() => {

        // console.log(isloading);

        if (isRawState && redux_module.detail === undefined && isloading && !isLocalUser) {

            if (reactrouter.match.params.id !== undefined) {

                PrepareEditForm().then(() => {
                    setIsLoading(false)
                })

            } else {

                if (!isLocalUser) {

                    setIsLoading(true)
                    PrepareAddForm().then(() => {
                        setIsLoading(false)
                    })
                }

            }

        }

    }, [PrepareAddForm, PrepareEditForm, isLocalUser, isRawState, isloading, reactrouter.match.params.id, redux_module.detail])

    // /* Dodaje poza formularzem */
    async function getOverModel({ cell }) {
        const cellvalue = Object.values(cell)[0]

        let newLocalStorage = {
            ...isLocalStorage,
            attachto: {
                ...isLocalStorage.attachto,
                brick: [
                    ...cellvalue.value,
                ]
            }
        }


        setLocalStorage(newLocalStorage)
    }

    return (<div>
        <div>{<ShowMessages />}</div>
        {!isloading && isLocalStorage && 'attachto' in isLocalStorage ? <AutocompleteMenu
            change={({ cell }) => getOverModel({ cell })}
            onclick={({ event, cell, index }) => {
                const cellvalue = Object.values(cell)[0]

                reactrouter_history.push('/admin/edit_' + Object.keys(isLocalStorage.attachto)[0] + '/' + cellvalue.value[0]._id)
            }}
            state={{
                localStorage: {
                    model: Object.keys(isLocalStorage.attachto)[0],
                    poliglot: true,
                    resetok: true,
                    qhelpers: {
                        populate: null,
                        inQuery: null,
                    },
                    form: {
                        formdata: {
                            ticked: {
                                config: {
                                    label: 'Add to ' + Object.keys(isLocalStorage.attachto)[0]
                                }
                            }
                        }
                    }
                }
            }}
            inject_value={
                isLocalStorage.attachto[Object.keys(isLocalStorage.attachto)[0]]
            }

        /> : null}
        {!isloading && isLocalStorage ? <div><FormContainer
            formdata={isLocalStorage.form.formdata}
            model={reactrouter.match.params.model}
            localStorage={isLocalStorage}
            isComponentType={isComponentType}
            removefile={({ cell, fileid }) => imageFuncs_removeImagesHandler_vh2({
                cell,
                fileid,
                redux_module,
                dispatch,
                isLocalStorage
            })}
            change={({ cell, event }) => { setLocalStorage(updateFormValues({ cell, event, isLocalStorage })) }}
            save={async ({ event, translate }) => {
                setLocalStorage(await saveForm({
                    model: reactrouter.match.params.model,
                    event,
                    translate,
                    current: redux_module.detail,
                    dispatch,
                    isLocalStorage,
                    redux_module,
                    redux_localeuser,
                    redux_current_mysite
                }))

            }

            }
            submit={({ event, translate }) => {
                submitForm({
                    model: reactrouter.match.params.model,
                    translate,
                    dispatch,
                    isLocalStorage,
                    redux_localeuser,
                    redux_current_mysite
                }).then((result) => {
                    setLocalStorage(result)

                })

            }
            }

        />
        </div>
            : <div
                style={{
                    paddingTop: '30%',
                    position: 'relative',
                    left: '0px',
                    top: '0px',
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                }}
            >
                <CircularProgress style={{ color: '#cccccc' }} thickness={7} />
            </div>}
            {!isLoadingSublist ?
            <ListPanel
                model={isSublistModel}
                type='sublist'
                hideIDs={isHideIDs}
                onToggleCheck={({ value }) => onToggleCheck({ value, cellkey: 'checked' })}
            /> : null}
    </div>)
}