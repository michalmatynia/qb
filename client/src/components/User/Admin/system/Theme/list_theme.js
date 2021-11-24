import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListTable from '../../GenericCompos/list_table'

import GridContainer from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardBody.js";
import CardHeader from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardHeader.js";
import Button from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";
// import FormElement from '../../../../utils/Form/Funcs/formContainer'
// import SearchFieldFC from '../../../../utils/Form/Funcs/FormSearchInput';
import FormCustomInput from '../../../../utils/Form/Funcs/FormCustomInput';

// Generic Functions
import { compoFuncs_DidUpdate_List_v2 } from '../../GenericFuncs/compo_funcs'
import { listFuncs_loadList_v2 } from '../../GenericFuncs/list_funcs'
import { ShowMessages } from '../../GenericFuncs/errormsg_funcs'

import { changesort_classicSort } from '../../EventFuncs/changesort_funcs'
import { search_inDatabase } from '../../EventFuncs/search_funcs'
import { loadmore_classicLoad } from '../../EventFuncs/loadmore_funcs'
import { toggle_boolSwitch_v1 } from '../../EventFuncs/toggle_funcs'
import { changpos_classicAdjust } from '../../EventFuncs/changepos_funcs'
import { remove_fromDatabase } from '../../EventFuncs/remove_funcs'
import { routing_gotoEdit_vh2 } from '../../EventFuncs/routing_funcs_vh2'

import {
    plg_clearProps
} from '../../../../utils/Plugs/cms_plugs';

// Material-UI
import InputAdornment from "@material-ui/core/InputAdornment";
import {
    Edit,
    Search,
    Close,
} from '@material-ui/icons';

class ListTheme extends Component {

    state = {
        localStorage: {
            model: 'theme',
            poliglot: false,
            tableparams: {
                renderHeader: true,
                columns: [
                    {
                        keyname: 'images',
                        columntype: 'image',
                        configparams: {
                        },
                        config: {
                            label: 'Image',
                            leftpath: 'images',
                            indicator: '0',
                            rightpath: 'url',
                            valuetype: 'string',
                        },
                    },
                    {
                        keyname: 'position',
                        columntype: 'text',
                        config: {
                            valuetype: 'string',
                            indicator: 'position',
                            label: 'Position'
                        }
                    },
                    {
                        keyname: 'name',
                        columntype: 'text',
                        config: {
                            valuetype: 'string',
                            indicator: 'name',
                            label: 'Name',
                        }
                    },
                    {
                        keyname: '',
                        columntype: 'adjust',
                        inputprops: {
                        },
                        config: {
                            label: 'Up/Down',
                        },
                    },
                    {
                        keyname: '',
                        columntype: 'iconbutton',
                        configparams: {
                        },
                        icon: Edit,
                        actions: {
                            onClick: ({ event, value, cell, sublistkey }) => this.onGotoLink({
                                event,
                                value,
                                cell,
                                sublistkey
                            }),
                        },
                        inputprops: {
                            id: 'generic',
                            type: 'text',
                            name: 'generic_button',
                            color: 'primary'
                        },
                        config: {
                            label: 'Edit',
                        },
                    },
                    {
                        keyname: '',
                        columntype: 'iconbutton',
                        configparams: {
                        },
                        icon: Close,
                        actions: {
                            onClick: ({ event, value, cell, sublistkey, tiedtoformkey }) => this.onRemoveItem({
                                removeall: false,
                                event,
                                value,
                                sublistkey,
                                tiedtoformkey
                            }),
                        },
                        inputprops: {
                            id: 'generic',
                            type: 'text',
                            name: 'generic_button',
                            color: 'inherit'
                        },
                        config: {
                            label: 'Remove',
                        },
                    },
                ]
            },
            viewparams: {
                limit: 5,
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
                        onBlur: (event) => this.onSearch({
                            event,
                            cell: { search: this.state.localStorage.viewparams.search },
                            blur: true
                        })

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
            },
            qhelpers: {
            },
            linguistic: {
                translate: ['name', 'description']
            },
        }
    }

    async componentDidUpdate(prevProps, prevState) {

        if ('localeUser' in this.props.user) {
            if (
                prevProps.user.localeUser !== this.props.user.localeUser
            ) {
                let newLocalStorage = await compoFuncs_DidUpdate_List_v2({
                    // model: this.props.match.params.model
                    model: this.state.localStorage.model,
                    myprops: this.props,
                    mystate: this.state,
                    poliglot: this.state.localStorage.poliglot,
                    viewparams: this.state.localStorage.viewparams,
                    prevmyprops: prevProps
                })
                if (newLocalStorage) {
                    await this.updateLocalStorage(newLocalStorage)
                }
            }
        }
    }
    async componentDidMount() {


        if ('localeUser' in this.props.user) {

            let newLocalStorage = await listFuncs_loadList_v2({
                sublistkey: null,
                model: this.state.localStorage.model,
                myprops: this.props,
                mystate: this.state,
                poliglot: this.state.localStorage.poliglot,
                hideIDs: null,
            })

            this.updateLocalStorage(newLocalStorage)
        }
    }
    async componentWillUnmount() {

        await plg_clearProps({ myprops: this.props, model: this.state.localStorage.model, actionType: 'list' })
        await plg_clearProps({ myprops: this.props, model: this.state.localStorage.model, actionType: 'detail' })
    }
    updateLocalStorage = (localStorage) => {
        this.setState({
            localStorage
        })
    }
    // TABLE FUNCTIONS
    onGotoLink = ({ event, value = null, cell = null, sublistkey = null }) => {

        routing_gotoEdit_vh2({
            model: this.state.localStorage.model,
            event,
            value,
            cell,
            sublistkey,
            myprops: this.props,
            mystate: this.state
        })
    }
    onRemoveItem = async ({ event, removeall, value = null, cell = null, sublistkey = null, tiedtoformkey = null }) => {
        await remove_fromDatabase({
            value,
            removeall,
            event,
            cell,
            sublistkey,
            tiedtoformkey,
            mystate: this.state,
            myprops: this.props,
            poliglot: this.state.localStorage.poliglot
        })
    }
    onChangePos = async ({ event, direction, value = null, cell = null, sublistkey = null, tiedtoformkey = null }) => {

        await changpos_classicAdjust({
            value,
            direction,
            event,
            cell,
            sublistkey,
            tiedtoformkey,
            mystate: this.state,
            myprops: this.props,
            poliglot: this.state.localStorage.poliglot
        })


    }
    onToggleSwitch = async ({ event, value = null, cell = null, sublistkey = null, tiedtoformkey = null }) => {

        await toggle_boolSwitch_v1({
            value,
            event,
            cell,
            sublistkey,
            tiedtoformkey,
            mystate: this.state,
            myprops: this.props,
            poliglot: this.state.localStorage.poliglot
        })

    }
    onSearch = async ({ event, blur, value = null, cell = null, sublistkey = null, tiedtoformkey = null }) => {

        let newLocalStorage = { ...this.state.localStorage }

        const cellkey = Object.keys(cell)[0]
        const cellvalue = Object.values(cell)[0]

        newLocalStorage[cellkey] = cellvalue
        this.updateLocalStorage(newLocalStorage)

        await search_inDatabase({
            value,
            blur,
            event,
            sublistkey,
            tiedtoformkey,
            mystate: this.state,
            myprops: this.props,
            poliglot: this.state.localStorage.poliglot,
            newLocalStorage
        })

    }
    onLoadMore = async ({ event, cell = null, sublistkey = null, tiedtoformkey = null }) => {

        let newLocalStorage = await loadmore_classicLoad({
            event,
            cell,
            sublistkey,
            tiedtoformkey,
            mystate: this.state,
            myprops: this.props,
            poliglot: this.state.localStorage.poliglot
        })
        this.updateLocalStorage(newLocalStorage)

    }
    onChangeSort = async ({ event, cell = null, sublistkey = null, tiedtoformkey = null }) => {
        let newLocalStorage = await changesort_classicSort({
            event,
            cell,
            sublistkey,
            tiedtoformkey,
            mystate: this.state,
            myprops: this.props,
            poliglot: this.state.localStorage.poliglot
        })

        this.updateLocalStorage(newLocalStorage)

    }
    render() {
        return (
            this.props.user.localeUser ? <div>
                <div>{<ShowMessages />}</div>
                <GridContainer>
                    <GridItem xs={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <FormCustomInput
                                    formcell={this.state.localStorage.viewparams.search}
                                    formcellkey='search'
                                    change={({ event, cell }) => this.onSearch({
                                        event,
                                        cell
                                    })}
                                />
                            </CardHeader>
                            <CardBody>
                                <ListTable
                                    // model={this.props.match.params.model}
                                    model={this.state.localStorage.model}    
                                    myprops={this.props}
                                    mystate={this.state}
                                    changeSort={({ event }) => {
                                        return this.onChangeSort({
                                            event
                                        })
                                    }}
                                    removeItem={({ value, removeall, event }) => {

                                        return this.onRemoveItem({
                                            removeall,
                                            event,
                                            value
                                        })
                                    }}
                                    changePosition={({ value, direction, event }) => {

                                        return this.onChangePos({
                                            direction,
                                            event,
                                            value
                                        })
                                    }}
                                    handleSwitch={({ value, event }) => {

                                        return this.onToggleSwitch({
                                            event,
                                            value,
                                        })
                                    }}
                                />
                                {
                                    this.state.localStorage.viewparams.size > 0 && this.state.localStorage.viewparams.size >= this.state.localStorage.viewparams.limit ?
                                        <Button id='loadmore' style={{ width: '100%' }} onClick={(event) => {
                                            return this.onLoadMore({
                                                event,
                                            })
                                        }}>
                                            Load More...
                                        </Button>
                                        : null
                                }
                            </CardBody>
                        </Card>

                    </GridItem>
                </GridContainer>
            </div> : null
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mysite: state.mysite,
        transengine: state.transengine,
        theme: state.theme,
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(ListTheme);