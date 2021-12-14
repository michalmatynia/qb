import React, { useCallback } from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux'
import { useHistory, useLocation } from "react-router-dom";
import GridContainer from "../../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardBody.js";
import CardHeader from "../../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardHeader.js";
// import Button from "../../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";
import Button from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";
import { search_inDatabase } from '../../EventFuncs/search_funcs'
import { changpos_classicAdjust_vh } from '../../EventFuncs/changepos_funcs_vh'
import { remove_fromDatabase_vh, remove_fromOverMods_vh } from '../../EventFuncs/remove_funcs_vh'


// import FormElement from '../../../../utils/Form/Funcs/formContainer'
// import SearchFieldFC from '../../../../utils/Form/Funcs/FormSearchInput';
import FormCustomInput from '../../../../utils/Form/Funcs/FormCustomInput_v2';
import { roleFuncs_listEvent } from '../../RoleFuncs/cm_presets'
import { imageFuncs_removeImagesHandler_vh2 } from '../../GenericFuncs/image_funcs_vh'
import { submitFuncs_fullSubmit_vh2 } from '../../GenericFuncs/submit_funcs_vh'
import { listFuncs_loadList_v2_vh } from '../../GenericFuncs/list_funcs_vh'
import ListTable from '../../GenericCompos/list_table_vh'
import InputAdornment from "@material-ui/core/InputAdornment";
import { toggle_boolSwitch_v1_vh } from '../../EventFuncs/toggle_funcs_vh'

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

// import { ShowMessages } from '../../GenericFuncs/errormsg_funcs'
import { ShowMessages } from '../../../../Message/Generic/static_msg'

import FormContainer from '../../../../utils/Form/Funcs/FormContainer_v2'

import { compoFuncs_Refresh_vh3 } from '../../GenericFuncs/compo_funcs_vh'
import {
    Search,
} from '@material-ui/icons';
import {
    plg_clearProps,
    plg_findOne_QueMod,
    plg_findMany
} from '../../../../utils/Plugs/cms_plugs';


export default function ListPanel() {

    const viewparams = {
        limit: 10,
        skip: 0,
        size: 0,
        sortBy: 'position',
        sortOrder: 1,
        search: {
            element: 'input',
            category: 'ct_custominput',
            value: '',
            wrapcompos: {
                griditem: {
                    xs: 12,
                    xm: 4,
                    md: 4,
                },
            },
            formcontrolprops: {
                fullWidth: true,
            },
            inputprops: {
                id: 'search',
                type: 'text',
                name: 'search_input',
                placeholder: 'Search...',
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
                /* When field Loses Focus */
                // onBlur: ({ event, cell, value }) => onSearch({
                //     event,
                //     // cell: { search: this.isViewparams.search },
                //     blur: true
                // })

            },
            configparams: {
                showlabel: false,
                showhelpertext: false

            },
            config: {
                label: 'Search',
                valuetype: 'string',
                helpertext: 'Enter text for Search',
                autocomplete: 'Off',
            },
            validation: {
                parse: false,
                // type: ['required']
            },
            range: ['name', 'description'],
            depth: [],
            valid: false,
            touched: false,

        },
    }

    let reactrouter = useRouter()
    // let reactrouter_history = useHistory()
    // let reactrouter_location = useLocation()

    const dispatch = useDispatch()
    let redux_localeuser = useSelector(state => state.user.localeUser)

    let redux_current_mysite = useSelector(state => state.mysite.CurrentMysite)
    let redux_model_list = useSelector(state => state[reactrouter.match.params.model].list)

    const [isRawState, setRawState] = React.useState();
    const [isLocalStorage, setLocalStorage] = React.useState();
    const [isPrevLocalStorage, setPrevLocalStorage] = React.useState();
    const [isPrevLocation, setPrevLocation] = React.useState();

    const [isLocalUser, setLocalUser] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isComponentType, setComponentType] = React.useState();
    const [isCurrentSearch, setIsCurrentSearch] = React.useState('');
    const [isPrevSearch, setIsPrevSearch] = React.useState('');
    const [isViewparams, setIsViewparams] = React.useState(viewparams);
    const [isShowMessage, setShowMessage] = React.useState(false);
    const [isActualMessage, setIsActualMessage] = React.useState();



    /* SET RAWSTATE  */

    const establishStateParams = useCallback(async () => {

        return grabFunctionState({ redux_current_mysite, redux_localeuser, dispatch, model: reactrouter.match.params.model, kind: 'list' })

    }, [dispatch, reactrouter, redux_current_mysite, redux_localeuser])

    React.useEffect(() => {
        if (!isLocalUser && !isRawState && redux_current_mysite && redux_localeuser) {

            establishStateParams().then((rawstate) => {
                // console.log(rawstate);
                setRawState(rawstate)

            })
        }

    }, [establishStateParams, isLocalUser, isRawState, redux_current_mysite, redux_localeuser])

    // /* CLEANUP */

    React.useEffect(() => {

        return function cleanup() {

            console.log('cleanup');

            plg_clearProps({ dispatch, model: reactrouter.match.params.model, actionType: 'list' })
            plg_clearProps({ dispatch, model: reactrouter.match.params.model, actionType: 'detail' })

        };

    }, [dispatch, reactrouter.match.params.model])


    /* CLEAR RAWSTATE */

    // const unhingeRawState = useCallback(async () => {

    //     setRawState()
    //     setLocalUser()
    //     setPrevLocalStorage(isLocalStorage)
    //     // setPrevLocation(reactrouter_location)
    //     setLocalStorage()

    // }, [isLocalStorage])

    // React.useEffect(() => {
    //     if (isLocalUser && isRawState && redux_current_mysite && (redux_localeuser !== isLocalUser || reactrouter_history.location.pathname !== reactrouter_location.pathname || isPrevLocation.pathname !== reactrouter_location.pathname)) {
    //         setIsLoading(true)
    //         unhingeRawState()
    //     }

    // }, [isLocalUser, isRawState, reactrouter_location, redux_current_mysite, redux_localeuser, unhingeRawState, reactrouter_history.location.pathname, reactrouter_history, isPrevLocation])

    /* Grab List */

    // React.useEffect(() => {

    //     if (isRawState
    //         && !redux_model_list
    //         && isLoading
    //         // || (isCurrentSearch && isCurrentSearch !== isPrevSearch)
    //         // &&  ((isCurrentSearch !== '')             )
    //     ) {

    //         let inQuery = {}
    //         let found = { payload: '' }
    //         /* This is for later */
    //         /*             if (this.props.user.userData.role === 2) {

    //                         inQuery = await roleFuncs_listEvent({
    //                             inQuery,
    //                             event_lgbinder: '60fa0baa2956083e2c28e208',
    //                             myprops: this.props,
    //                         })
    //                     } */


    //         listFuncs_loadList_v2_vh({
    //             sublistkey: null,
    //             model: reactrouter.match.params.model,
    //             redux_localeuser,
    //             dispatch,
    //             isRawState,
    //             thisview: isViewparams,
    //             populate: isRawState.localStorage.qhelpers.populate,
    //             hideIDs: null,
    //             inQuery
    //         }).then(() => {
    //             setIsLoading(false)

    //         })


    //     }

    // }, [dispatch, isLoading, isRawState, reactrouter.match.params.model, redux_localeuser, redux_model_list, isViewparams])

    const onRemoveItem = useCallback(async ({ event, removeall, value = null }) => {
        
        // setIsActualMessage('Removing')
        // setShowMessage(true)
        
        await remove_fromOverMods_vh({
            value,
            removeall,
            overmodel: Object.keys(isRawState.localStorage.attachto)[0],
            submodel: reactrouter.match.params.model,
            isRawState,
            dispatch
        })

        await remove_fromDatabase_vh({
            value,
            removeall,
            event,
            isRawState,
            isViewparams,
            redux_localeuser,
            model: reactrouter.match.params.model,
            poliglot: isRawState.localStorage.poliglot
        }).then(() => {
            // setShowMessage(false)
            // setIsActualMessage()
        })

    },[dispatch, isRawState, isViewparams, reactrouter.match.params.model, redux_localeuser])

    React.useEffect(() => {

        if (isRawState && isViewparams) {

            listFuncs_loadList_v2_vh({
                sublistkey: null,
                model: reactrouter.match.params.model,
                redux_localeuser,
                dispatch,
                isRawState,
                thisview: isViewparams,
                populate: isRawState.localStorage.qhelpers.populate,
                hideIDs: null,
                // inQuery
            })
        }

    }, [dispatch, isRawState, isViewparams, reactrouter.match.params.model, redux_localeuser])

    const onToggleSwitch = useCallback(async ({ event, value = null }) => {

        await toggle_boolSwitch_v1_vh({
            value,
            event,
            model: reactrouter.match.params.model,
            dispatch,
            poliglot: isRawState.localStorage.poliglot,
            isViewparams,
            isRawState,
            redux_localeuser
        })

    }, [dispatch, isRawState, isViewparams, reactrouter.match.params.model, redux_localeuser])

    const onChangePos = useCallback(async ({ event, direction, value = null }) => {

        setIsActualMessage('Changing position')
        setShowMessage(true)

        await changpos_classicAdjust_vh({
            value,
            direction,
            event,
            dispatch,
            poliglot: isRawState.localStorage.poliglot,
            model: reactrouter.match.params.model,
            isViewparams,
            isRawState,
            redux_localeuser
        }).then(() => {
            setShowMessage(false)
            setIsActualMessage()
        })

    }, [dispatch, isRawState, isViewparams, reactrouter.match.params.model, redux_localeuser])


    return (
        <div>
            {isShowMessage ? <ShowMessages
                visible={isShowMessage}
                message={isActualMessage}
                color='success'
                place='tr'
            /> : null}
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <FormCustomInput
                                formcell={isViewparams.search}
                                value={isViewparams.value}
                                formcellkey='search'
                                change={({ event, value, cell, isValid }) => {
                                    const cellkey = Object.keys(cell)[0]
                                    setIsViewparams(prevState => ({
                                        ...prevState,
                                        [cellkey]: {
                                            ...prevState[cellkey],
                                            value,
                                            valid: isValid
                                        }
                                    }));
                                }
                                }
                            />
                        </CardHeader>
                        {isRawState && redux_model_list ? <CardBody>{console.log('render')}
                            <ListTable
                                model={reactrouter.match.params.model}
                                tableparams={isRawState.localStorage.tableparams}
                                viewparams={isViewparams}
                                mystate={isRawState}
                                changeSort={({ event }) => {
                                    setIsViewparams(prevState => ({
                                        ...prevState,
                                        sortOrder: prevState.sortOrder === 1 ? -1 : 1
                                    }));
                                }}
                                removeItem={({ value, removeall, event }) => {
                                    return onRemoveItem({
                                        removeall,
                                        event,
                                        value
                                    })
                                }}
                                changePosition={({ value, direction, event }) => {
                                    return onChangePos({
                                        direction,
                                        event,
                                        value
                                    })
                                }}
                                handleSwitch={({ value, event }) => {
                                    return onToggleSwitch({
                                        event,
                                        value,
                                    })
                                }}
                            />
                            {/* {
                                this.state.localStorage.viewparams.size > 0 && this.state.localStorage.viewparams.size >= this.state.localStorage.viewparams.limit ?
                                    <Button id='loadmore' style={{ width: '100%' }} onClick={(event) => {
                                        return this.onLoadMore({
                                            event,
                                        })
                                    }}>
                                        Load More...
                                    </Button>
                                    : null
                            } */}
                        </CardBody> : null}
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    )
}

