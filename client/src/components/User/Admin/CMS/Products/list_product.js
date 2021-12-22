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
import { routing_gotoEdit } from '../../EventFuncs/routing_funcs'

import {
    plg_clearProps,
    plg_findMany
} from '../../../../utils/Plugs/cms_plugs';
import {
    act_injectProp,
} from '../../../../../redux/actions/generic/generic_actions';
// Material-UI
import InputAdornment from "@material-ui/core/InputAdornment";
import {
    Edit,
    Search,
    Close,
    Remove
} from '@material-ui/icons';

class ListProduct extends Component {

    state = {
        localStorage: {
            // model: 'product',
            poliglot: true,
            attachtobinder: 'checked',
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
                        keyname: 'price',
                        columntype: 'text',
                        config: {
                            label: 'Price ' + Object.keys(this.props.user.currencyUser.rates),
                            valuetype: 'string',
                            indicator: 'price',
                        }
                    },
                    {
                        keyname: 'visible',
                        columntype: 'switch',
                        configparams: {},
                        inputprops: {
                            id: 'visible'
                        },
                        config: {
                            label: 'Visible',
                            indicator: 'visible',
                            valuetype: 'boolean',
                        },
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
                    {
                        keyname: '',
                        columntype: 'iconbutton',
                        configparams: {
                        },
                        icon: Remove,
                        actions: {
                            onClick: ({ event, value, cell, sublistkey, tiedtoformkey }) => this.onRemoveItem({
                                event,
                                value,
                                cell,
                                sublistkey,
                                tiedtoformkey,
                                removeall: true
                            }),
                        },
                        inputprops: {
                            id: 'generic',
                            type: 'text',
                            name: 'generic_button',
                            color: 'secondary'
                        },
                        config: {
                            label: 'Remove All',
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
                this.props.user.currencyUser !== prevProps.user.currencyUser
            ) {
                let newLocalStorage = await compoFuncs_DidUpdate_List_v2({
                    model: this.state.localStorage.model,
                    myprops: this.props,
                    mystate: this.state,
                    poliglot: this.state.localStorage.poliglot,
                    viewparams: this.state.localStorage.viewparams,
                    prevmyprops: prevProps
                })
                if (newLocalStorage) {

                    newLocalStorage = await this.changeCurrencyLabel({ newLocalStorage })
                    await this.recalculatePrice({ myprops: this.props, mystate: this.state })

                    await this.updateLocalStorage(newLocalStorage)
                }
            }
        }


    }
    async componentDidMount() {

        if ('localeUser' in this.props.user && 'currencyUser' in this.props.user) {


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
    // UNIQUE FUNCTIONS
    changeCurrencyLabel = async ({ newLocalStorage, prevmyprops }) => {

        let foundIndex = newLocalStorage.tableparams.columns.findIndex((item) => {
            return item.keyname === 'price' ? true : false

        })
        newLocalStorage.tableparams.columns[foundIndex].config.label = 'Price ' + Object.keys(this.props.user.currencyUser.rates)

        return newLocalStorage
    }
    recalculatePrice = async ({ myprops, mystate }) => {

        let decimalPrice


        if (myprops.user.localeUser.referenceID.alpha2Code !== myprops.mysite.CurrentMysite.default_language.referenceID.alpha2Code) {

            let inQuery = {
                country: { "$eq": myprops.mysite.CurrentMysite.default_language.referenceID.alpha2Code },
                language: { "$eq": myprops.mysite.CurrentMysite.default_language.referenceID.languages[0].iso639_1 },
            }

            let result = await plg_findMany({ model: mystate.localStorage.model, myprops, actionType: 'samestate', inQuery })
            let rootList = result.payload

            let currentList = myprops[mystate.localStorage.model].list


            for (let [key, value] of Object.entries(currentList)) {
                let found = rootList.find((item) => value.lgbinder === item.lgbinder)

                if (found) {
                    let convertedPrice = found.price / myprops.user.currencyUser.deflgrates[myprops.mysite.CurrentMysite.default_language.referenceID.currencies[0].code] * Object.entries(myprops.user.currencyUser.rates)[0][1]
                    decimalPrice = Math.round((convertedPrice + Number.EPSILON) * 100) / 100
                }

                currentList[key].price = decimalPrice

            }


             act_injectProp({ dataToSubmit: currentList, model: this.state.localStorage.model, actionType: 'list' })
        }
    }
    // TABLE FUNCTIONS
    onGotoLink = ({ event, value = null, cell = null, sublistkey = null }) => {

        routing_gotoEdit({ event, value, cell, sublistkey, myprops: this.props, mystate: this.state })
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
        product: state.product,
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(ListProduct);