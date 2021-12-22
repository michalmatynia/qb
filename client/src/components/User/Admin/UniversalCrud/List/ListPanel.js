import React, { useCallback } from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux'
import { useHistory } from "react-router-dom";

import GridContainer from "../../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardBody.js";
import CardHeader from "../../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardHeader.js";
import Button from "../../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";
import { changpos_classicAdjust_vh } from '../../EventFuncs/changepos_funcs_vh'
import { remove_fromDatabase_vh, remove_fromOverMods_vh } from '../../EventFuncs/remove_funcs_vh'

import FormCustomInput from '../../../../utils/Form/Funcs/FormCustomInput_v2';

import { listFuncs_loadList_v2_vh } from '../../GenericFuncs/list_funcs_vh'
import ListTable from '../../GenericCompos/list_table_vh'
import { toggle_boolSwitch_v1_vh } from '../../EventFuncs/toggle_funcs_vh'

import {
    useRouter,
} from "../../../../../hoc/Funcs/hook_funcs";


/* STATE */
import { grabFunctionState } from "../EditAdd Functions/grabFunctionState"
import { processViewParams } from "./StateFunctions/processView"

// import { ShowMessages } from '../../GenericFuncs/errormsg_funcs'
import { ShowMessages } from '../../../../Message/Generic/static_msg'


import {
    plg_clearProps,
} from '../../../../utils/Plugs/cms_plugs';


export default function ListPanel(props) {

    let reactrouter = useRouter()
    let reactrouter_history = useHistory()

    const dispatch = useDispatch()
    let redux_localeuser = useSelector(state => state.user.localeUser)
    let redux_userdata = useSelector(state => state.user.userData)
    let redux_currencyuser = useSelector(state => state.user.currencyUser)


    let redux_current_mysite = useSelector(state => state.mysite.CurrentMysite)
    let redux_model_list = useSelector(state => state[reactrouter.match.params.model].list)

    const [isRawState, setRawState] = React.useState();

    const [isViewparams, setIsViewparams] = React.useState();

    const [isShowMessage, setShowMessage] = React.useState(false);
    const [isActualMessage, setIsActualMessage] = React.useState();

    const onRemoveItem = useCallback(async ({ removeall, value = null, state, viewparams, model, redux_localeuser }) => {
        setIsActualMessage('Removing')
        setShowMessage(true)

        if(state.localStorage.attachto) {

            await remove_fromOverMods_vh({
                dispatch,
                value,
                removeall,
                overmodel: Object.keys(state.localStorage.attachto)[0],
                submodel: model,
                isRawState: state
            })
        }


        await remove_fromDatabase_vh({
            dispatch,
            value,
            removeall,
            isRawState: state,
            thisview: viewparams,
            redux_localeuser,
            model,
            poliglot: state.localStorage.poliglot
        }).then(() => {
            setShowMessage(false)
            setIsActualMessage()
        })

    }, [dispatch])

    /* SET RAWSTATE  */

    const establishStateParams = useCallback(async () => {

        return grabFunctionState({
            onRemoveItem,

            redux_current_mysite,
            redux_currencyuser,
            redux_localeuser,
            dispatch,
            model: reactrouter.match.params.model,
            kind: 'list'
        })

    }, [dispatch, onRemoveItem, reactrouter.match.params.model, redux_currencyuser, redux_current_mysite, redux_localeuser])

    React.useEffect(() => {
        if (!isRawState && redux_current_mysite && redux_localeuser) {

            establishStateParams().then((rawstate) => {

                setRawState(rawstate)

            })
        }

    }, [establishStateParams, isRawState, redux_current_mysite, redux_localeuser])


      /* CLEAR RAWSTATE */

    // /* CLEANUP */

    React.useEffect(() => {

        return function cleanup() {

            console.log('cleanup');
            setIsViewparams()

            setRawState()
            plg_clearProps({ dispatch, model: reactrouter.match.params.model, actionType: 'list' })
            plg_clearProps({ dispatch, model: reactrouter.match.params.model, actionType: 'detail' })
        };

    }, [dispatch, reactrouter.match.params.model])

    React.useEffect(() => {
        if ( !isViewparams && reactrouter ) {
            processViewParams({reactrouter}).then((result) => {
                setIsViewparams(result)

            })
        }
    },[isViewparams, reactrouter])
    React.useEffect(() => {

        if (isRawState && isViewparams ) {

            listFuncs_loadList_v2_vh({
                sublistkey: null,
                model: reactrouter.match.params.model,
                redux_localeuser,
                dispatch,
                isRawState,
                thisview: isViewparams,
                populate: isRawState.localStorage.qhelpers.populate,
                hideIDs: null,
            }).then((res) => {
                if (isViewparams.size !== res.length) {
                    setIsViewparams(prevState => ({
                        ...prevState,
                        size: res.length
                    }));
                }
            })
        }

    }, [dispatch, isRawState, isViewparams, reactrouter.match.params.model, reactrouter_history.location, redux_localeuser])

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
           {isViewparams ?  <GridContainer>
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
                        {isRawState && redux_model_list && redux_localeuser ? <CardBody>
                            <ListTable
                                model={reactrouter.match.params.model}
                                tableparams={isRawState.localStorage.tableparams}
                                viewparams={isViewparams}
                                mystate={isRawState}
                                redux_localeuser={redux_localeuser}
                                redux_userdata={redux_userdata}
                                reactrouter_history={reactrouter_history}
                                changeSort={({ event }) => {

                                    setIsViewparams(prevState => ({
                                        ...prevState,
                                        sortOrder: prevState.sortOrder === 1 ? -1 : 1
                                    }));
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
                            {
                                isViewparams.size > 0 && isViewparams.size >= isViewparams.limit ?
                                    <Button id='loadmore' style={{ width: '100%' }} onClick={(event) => {
                                        setIsViewparams(prevState => ({
                                            ...prevState,
                                            limit: prevState.limit + 10
                                        }));
                                    }}>
                                        Load More...
                                    </Button>
                                    : null
                            }
                        </CardBody> : null}
                    </Card>
                </GridItem>
            </GridContainer> : null }
        </div>
    )
}