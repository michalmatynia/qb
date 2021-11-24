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
import FormCustomInput from '../../../../utils/Form/Funcs/FormCustomInput';
import FormElement from '../../../../utils/Form/Funcs/formContainer'
import { sync_withAPI } from '../../EventFuncs/sync_funcs'
import { partsFuncs_submitForm_Add_v2 } from '../../GenericFuncs/parts_funcs'


// === Component Functions === 
import { compoFuncs_Refresh_v2 } from '../../GenericFuncs/compo_funcs'

// === Form Action Functions ===
import { messageCompleted, ShowMessages, messageLoading } from '../../GenericFuncs/errormsg_funcs'

// === List Action Functions ===
import { listFuncs_loadList_v2 } from '../../GenericFuncs/list_funcs'


import { actionFuncs_submitLanguage } from '../../ActionFunctions/submitLanguage'
import { actionFuncs_baseFindMany } from '../../ActionFunctions/baseFindMany'


import { changesort_classicSort } from '../../EventFuncs/changesort_funcs'
import { imageFuncs_removeImagesHandler_v2 } from '../../../../User/Admin/GenericFuncs/image_funcs'
import { changesort_sortInForm } from '../../EventFuncs/changesort_funcs'
import { toggle_addToReferer, toggle_boolSwitch_v1 } from '../../EventFuncs/toggle_funcs'
import { changpos_classicAdjust, changpos_informAdjust } from '../../EventFuncs/changepos_funcs'
import { loadmore_classicLoad } from '../../EventFuncs/loadmore_funcs'
import { remove_fromDatabase, remove_fromFormTable } from '../../EventFuncs/remove_funcs'
import { search_inDatabase } from '../../EventFuncs/search_funcs'
import { pre_processCheckedIDs } from '../../EventFuncs/CommonFuncs/pre_funcs'

// Material-UI
import InputAdornment from "@material-ui/core/InputAdornment";
// Material-UI Icons
import {
    Search,
    Close,
} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';


import {
    plg_clearProps,
} from '../../../../utils/Plugs/cms_plugs';

// models: ['slide', 'product', 'view'],


class List_Language extends Component {
    state = {
        localStorage: {
            model: 'language',
            poliglot: false,
            resetok: false,
            qhelpers: {
                populate: [{ path: 'referenceID' }]
            },
            linguistic: {
                // === DEBUG
                // modelArray: ['product'],

                modelArray: ['slide', 'product', 'taxonomy', 'brick', 'page', 'contact', 'login', 'mystore'],
                translate: ['name', 'description']
            },
            lgsublist: {
                // I can change the name of sublist here
                viewmodel: 'nation',
                header: 'Add Components',
                tableparams: {
                    renderHeader: true,
                    columns: [
                        {
                            keyname: '',
                            columntype: 'toggle',
                            inputprops: {
                                id: 'checkbox'
                            },
                            config: {
                                label: 'Add',
                            },
                        },
                        // {
                        //     keyname: 'flags',
                        //     columntype: 'image',
                        //     configparams: {
                        //     },
                        //     config: {
                        //         label: 'Image',
                        //         valuetype: 'string',
                        //         leftpath: 'flags',
                        //         // indicator: '0',
                        //     },
                        // },
                        {
                            keyname: 'name',
                            columntype: 'text',
                            config: {
                                label: 'Country',
                                valuetype: 'string',
                                leftpath: 'name'
                            }
                        },
                        {
                            keyname: 'languages',
                            columntype: 'text',
                            config: {
                                label: 'Language',
                                valuetype: 'string',
                                leftpath: 'languages',
                                indicator: '0',
                                rightpath: 'name'
                            }
                        },
                        {
                            keyname: '',
                            columntype: 'iconbutton',
                            configparams: {
                            },
                            icon: Close,
                            actions: {
                                onClick: ({ event, value, sublistkey, tiedtoformkey }) => this.onRemoveItem({
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
                        }
                    ]
                },
                viewparams: {
                    limit: 5,
                    skip: 0,
                    size: 0,
                    sortBy: 'name',
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
                                cell: { search: this.state.localStorage.lgsublist.viewparams.search },
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
                        range: ['name', 'languages.0.name'],
                        depth: [],
                        valid: false,
                        touched: false,

                    },
                },
            },
            form: {
                formError: false,
                formSuccess: false,
                formdata: {
                    checked: {
                        element: 'table',
                        category: 'uim_table',
                        value: [],
                        fillfields: {
                            value: {
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {

                                                    return await actionFuncs_baseFindMany({ cell, getlist, fields, myprops: this.props, mystate: this.state, populate: [{ path: 'referenceID' }] })
                                                },
                                            },
                                            // justRun :{ }

                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'arrayofrefs',
                                    leftpath: 'referenceID',
                                    resetvalue: [],

                                },
                                submitconfig: {
                                    onSubmitAction: {
                                        preCreate: {
                                            customReturn: {
                                                actionA: async ({ cell }) => {
                                                    return await actionFuncs_submitLanguage({ cell, myprops: this.props, mystate: this.state, model: this.state.localStorage.model, addToCollection: 'language', populate: [{ path: 'referenceID' }] })
                                                },
                                            },
                                            // justRun :{ }
                                        },
                                        // postCreate: {

                                        // }
                                    }
                                }
                            },
                        },
                        config: {
                            label: 'Checked',
                            options: []
                        },
                        sublist: {
                            // Don't change the name of this sublist
                            header: 'Add Components',
                            tiedtoelementkey: 'lgsublist',
                            tableparams: {
                                renderHeader: true,
                                columns: [
                                    {
                                        keyname: '',
                                        columntype: 'iconbutton',
                                        configparams: {
                                        },
                                        icon: DeleteIcon,
                                        actions: {
                                            onClick: ({ event, value, cell }) => this.onRemoveItemInForm({
                                                event,
                                                value,
                                                cell
                                            })
                                        },
                                        inputprops: {
                                            id: 'generic',
                                            type: 'text',
                                            name: 'generic_button',
                                        },
                                        config: {
                                            label: 'Remove',
                                        },
                                    },
                                    // {
                                    //     keyname: 'flags',
                                    //     columntype: 'image',
                                    //     configparams: {
                                    //     },
                                    //     config: {
                                    //         label: 'Image',
                                    //         valuetype: 'string',
                                    //         leftpath: 'referenceID.flags',
                                    //         // indicator: '',

                                    //     },
                                    // },
                                    {
                                        keyname: 'name',
                                        columntype: 'text',
                                        config: {
                                            valuetype: 'string',
                                            label: 'Country',
                                            leftpath: 'referenceID',
                                            indicator: 'name'

                                        }
                                    },
                                    {
                                        keyname: 'languages',
                                        columntype: 'text',
                                        config: {
                                            valuetype: 'string',
                                            label: 'Language',
                                            // languages.0.name
                                            leftpath: 'referenceID.languages',
                                            indicator: '0',
                                            rightpath: 'name',

                                        }
                                    },
                                    {
                                        keyname: 'position',
                                        columntype: 'text',
                                        config: {
                                            valuetype: 'integer',
                                            label: 'Position',
                                            indicator: 'position'
                                        }
                                    },
                                    {
                                        keyname: '',
                                        columntype: 'adjust',
                                        inputprops: {
                                        },
                                        config: {
                                            label: '',
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
                                            cell: { search: this.state.localStorage.form.formdata.checked.sublist.viewparams.search },
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
                                    range: ['name', 'languages.0.name'],
                                    depth: [],
                                    valid: false,
                                    touched: false,

                                },
                            },
                        },
                        validation: {
                            parse: false,
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 12,
                                xm: 12,
                                md: 12,
                            },
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'checked_list',
                            type: 'text',
                        },
                        configparams: {
                            showlabel: false,
                            showhelpertext: false,
                            showfield: true,
                        },
                        valid: true,
                        touched: false,
                    }
                }
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {

        // if ('localeUser' in this.props.user) {
        //     let sublistkey = 'lgsublist'
        //     let tiedtoformkey = 'checked'

        //     let newLocalStorage = await compoFuncs_DidUpdate_Edit({
        //         model: this.state.localStorage.model,
        //         myprops: this.props,
        //         prevmyprops: prevProps,
        //         mystate: this.state,
        //         poliglot: this.state.localStorage.poliglot,
        //         sublistkey,
        //         tiedtoformkey,
        //         type: 'edit'
        //     })
        //     // console.log(newLocalStorage);

        //     if (newLocalStorage && (!this.props[this.state.localStorage.lgsublist.viewmodel].list
        //         || this.props.user.localeUser !== prevProps.user.localeUser)
        //     ) {
        //         let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage })

        //         newLocalStorage = await listFuncs_loadList_v2({
        //             model: this.state.localStorage[sublistkey].viewmodel,
        //             myprops: this.props,
        //             mystate: this.state,
        //             poliglot: this.state.localStorage.poliglot,
        //             hideIDs: checkedIDs,
        //             sublistkey,
        //             newLocalStorage
        //         })

        //     }


        //     if (newLocalStorage) {
        //         await this.updateLocalStorage(newLocalStorage)
        //     }

        // }
    }
    async componentDidMount() {
        if ('localeUser' in this.props.user) {
            
            let newLocalStorage

            let sublistkey = 'lgsublist'
            let tiedtoformkey = 'checked'

            let didmount_result = await compoFuncs_Refresh_v2({
                model: this.state.localStorage.model,
                myprops: this.props,
                mystate: this.state,
                rootid: this.props.match.params.id,
                poliglot: this.state.localStorage.poliglot,
                type: 'edit'
            })

            if (didmount_result) { newLocalStorage = { ...didmount_result.newLocalStorage } }
            else { newLocalStorage = { ...this.state.localStorage } }

            let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage })

            newLocalStorage = await listFuncs_loadList_v2({
                sublistkey,
                model: this.state.localStorage[sublistkey].viewmodel,
                myprops: this.props,
                mystate: this.state,
                poliglot: this.state.localStorage.poliglot,
                hideIDs: checkedIDs,
                newLocalStorage
            })

            if (newLocalStorage) {

                await this.updateLocalStorage(newLocalStorage)
            }
        }
    }

    async componentWillUnmount() {
        await plg_clearProps({ myprops: this.props, model: this.state.localStorage.model, actionType: 'list' })
        await plg_clearProps({ myprops: this.props, model: this.state.localStorage.model, actionType: 'detail' })
        await plg_clearProps({ myprops: this.props, model: 'nation', actionType: 'list' })

    }
    updateLocalStorage = (localStorage) => {
        this.setState({
            localStorage
        })
    }

    // ============= FORM FUNCTIONS
    onChangeSortInForm = async ({ event, direction, value = null, cell = null, sublistkey = null, tiedtoformkey = null }) => {

        let newLocalStorage = await changesort_sortInForm({
            value,
            direction,
            event,
            cell,
            mystate: this.state,
            myprops: this.props,
            poliglot: this.state.localStorage.poliglot
        })

        this.updateLocalStorage(newLocalStorage)
    }
    onChangePosInForm = async ({ event, direction, value = null, cell = null, sublistkey = null, tiedtoformkey = null }) => {

        let newLocalStorage = await changpos_informAdjust({
            value,
            direction,
            event,
            cell,
            mystate: this.state,
            myprops: this.props,
            poliglot: this.state.localStorage.poliglot
        })

        this.updateLocalStorage(newLocalStorage)
    }
    onRemoveItemInForm = async ({ event, value = null, cell = null }) => {
        let newLocalStorage = await remove_fromFormTable({
            value,
            event,
            cell,
            mystate: this.state,
            myprops: this.props,
            poliglot: this.state.localStorage.poliglot
        })

        this.updateLocalStorage(newLocalStorage)
    }
    // ============= TABLE FUNCTIONS
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
    onToggleCheck = async ({ event, value = null, cell = null, sublistkey = null, tiedtoformkey = null }) => {

        let newLocalStorage = await toggle_addToReferer({
            value,
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
    onSave = async ({ event, cell = null }) => {
        await messageLoading({ myprops: this.props })

        await partsFuncs_submitForm_Add_v2({
            model: this.state.localStorage.model,
            myprops: this.props,
            mystate: this.state
        })
        await messageCompleted({ myprops: this.props })

    }

    // ================
    onSync = async ({ event }) => {

        let sublistkey = 'lgsublist'
        let tiedtoformkey = 'checked'

        let newLocalStorage = await sync_withAPI({
            event,
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
                {<FormElement
                    formdata={this.state.localStorage.form.formdata}
                    model={this.state.localStorage.model}
                    myprops={this.props}
                    mystate={this.state}
                    removefile={({ cell, fileid }) => imageFuncs_removeImagesHandler_v2({
                        cell,
                        fileid,
                        model: this.state.localStorage.model,
                        myprops: this.props,
                        mystate: this.state,
                        poliglot: this.state.localStorage.poliglot
                    })}
                    change={({ cell }) => this.updateFormValues({ cell })}
                    changePosition={({ value, direction, event, cell }) => {

                        return this.onChangePosInForm({
                            direction,
                            event,
                            value,
                            cell
                        })
                    }}

                    changeSort={({ event, cell }) => { return this.onChangeSortInForm({ event, cell }) }}
                    save={({ event, translate }) => this.onSave({
                        event,
                        translate,
                        poliglot: this.state.localStorage.poliglot,
                        mystate: this.state,
                        myprops: this.props,
                        model: this.state.localStorage.model,
                    })}
                />}
                <GridContainer>
                    <GridItem xs={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <Button id='sync' onClick={(event) => { this.onSync({ event }) }}> Sync </Button>
                                <FormCustomInput
                                    sublistkey='lgsublist'
                                    tiedtoformkey='checked'
                                    formcell={this.state.localStorage.lgsublist.viewparams.search}
                                    formcellkey='search'
                                    change={({ event, cell, sublistkey, tiedtoformkey }) => this.onSearch({
                                        event,
                                        cell,
                                        sublistkey,
                                        tiedtoformkey
                                    })}
                                />
                            </CardHeader>
                            <CardBody>
                                <ListTable
                                    // Name of key from state
                                    sublistkey='lgsublist'
                                    tiedtoformkey='checked'
                                    myprops={this.props}
                                    mystate={this.state}
                                    changePosition={({ value, direction, event, sublistkey, tiedtoformkey }) => {

                                        return this.onChangePos({
                                            direction,
                                            event,
                                            value,
                                            sublistkey,
                                            tiedtoformkey
                                        })
                                    }}
                                    removeItem={({ value, removeall, event }) => {

                                        return this.onRemoveItem({
                                            removeall,
                                            event,
                                            value
                                        })
                                    }}
                                    handleVisible={({ value, event, sublistkey, tiedtoformkey }) => {

                                        return this.onToggleSwitch({
                                            event,
                                            value,
                                            sublistkey,
                                            tiedtoformkey
                                        })
                                    }}
                                    toggleItem={({ value, event, sublistkey, tiedtoformkey }) => {

                                        return this.onToggleCheck({
                                            event,
                                            value,
                                            sublistkey,
                                            tiedtoformkey
                                        })
                                    }}

                                    changeSort={({ event, sublistkey, tiedtoformkey }) => {
                                        return this.onChangeSort({
                                            event,
                                            sublistkey,
                                            tiedtoformkey
                                        })
                                    }}

                                />
                                {
                                    this.state.localStorage.lgsublist.viewparams.size > 0 && this.state.localStorage.lgsublist.viewparams.size >= this.state.localStorage.lgsublist.viewparams.limit ?
                                        <Button id='loadmore' style={{ width: '100%' }} onClick={(event) => {
                                            return this.onLoadMore({
                                                event,
                                                sublistkey: 'lgsublist',
                                                tiedtoformkey: 'checked'
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
        language: state.language,
        nation: state.nation,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(List_Language);