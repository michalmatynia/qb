import React, { Component } from 'react';
import { connect } from 'react-redux';

// Generic Functions 
import { partsFuncs_submitForm_Add_v2 } from '../../../../User/Admin/GenericFuncs/parts_funcs'
import { compoFuncs_Refresh_v2 } from '../../../../User/Admin/GenericFuncs/compo_funcs'
import { actionFuncs_baseFindMany } from '../../ActionFunctions/baseFindMany'
import { actionFuncs_handleArrayOfIds, actionFuncs_transformIdsToArray } from '../../ActionFunctions/handleArrayOfIds'
import { actionFuncs_recalculatePrice } from '../../ActionFunctions/recalculatePrice'
import { actionFuncs_convertArrayOfRefsWithQty, actionFuncs_populateArrayOfRefsForDbWithQty_v2 } from '../../ActionFunctions/handleArrayOfRefs'
import FormCustomInput from '../../../../utils/Form/Funcs/FormCustomInput';
import { listFuncs_loadList_v2 } from '../../GenericFuncs/list_funcs'

import { messageCompleted, errorClosure, messageLoading, ShowMessages } from '../../../../User/Admin/GenericFuncs/errormsg_funcs'
import ListTable from '../../GenericCompos/list_table'

import GridContainer from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardHeader.js";
import Button from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";
import CardBody from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardBody.js";

// Table Functions
import { remove_fromDatabase, remove_fromFormTable } from '../../EventFuncs/remove_funcs'
import { search_inDatabase } from '../../EventFuncs/search_funcs'
import { routing_gotoEdit } from '../../EventFuncs/routing_funcs'
import { changesort_classicSort, changesort_sortInForm } from '../../EventFuncs/changesort_funcs'
import { changeqty_qtyInForm } from '../../EventFuncs/changeqty_funcs'

import { changpos_classicAdjust, changpos_informAdjust } from '../../EventFuncs/changepos_funcs'
import { loadmore_classicLoad } from '../../EventFuncs/loadmore_funcs'
import { toggle_addToReferer, toggle_boolSwitch_v1 } from '../../EventFuncs/toggle_funcs'

// Material-UI Icons
import {
    Edit,
    Close,
    Remove
} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import FormElement from '../../../../utils/Form/Funcs/formContainer'

// Material-UI Core
import InputAdornment from "@material-ui/core/InputAdornment";

import {
    plg_clearProps
} from '../../../../utils/Plugs/cms_plugs';

class AddProductgroup extends Component {

    state = {
        localStorage: {
            model: 'productgroup',
            resetok: true,
            poliglot: true,
            qhelpers: {
            },
            linguistic: {
                translate: ['name', 'description']
            },
            form: {
                formError: false,
                formSuccess: false,
                formdata: {
                    images: {
                        element: 'upload',
                        category: 'ct_regularimage',
                        value: [],
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        fillfields: {
                            value: {
                                // fromconfig: {
                                // },
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'array',
                                    resetvalue: [],
                                },
                            },

                        },
                        config: {
                            label: 'Images',
                            folder: this.props.mysite.CurrentMysite._id + '/Productgroup/File',

                        },
                        inputprops: {
                            type: 'file',
                            name: 'images_upload',
                        },
                        validation: {
                            parse: false
                        },
                        valid: true,
                        touched: false,
                    },
                    name: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '',
                        wrapcompos: {
                            griditem: {
                                xs: 12,
                                xm: 12,
                                md: 12,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        inputprops: {
                            type: 'text',
                            name: 'name_input',
                            autoComplete: 'On'
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,

                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '',
                                },
                            },

                        },
                        config: {
                            label: 'Name',
                            helpertext: 'Enter text for Name',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    description: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '',
                        wrapcompos: {
                            griditem: {
                                xs: 12,
                                xm: 12,
                                md: 12,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        inputprops: {
                            type: 'text',
                            name: 'description_input',
                            autoComplete: 'On',
                            multiline: true,
                            rows: 5,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,

                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '',
                                },
                            },

                        },
                        config: {
                            label: 'Description',
                            helpertext: 'Enter text for Description',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    price: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: 0,
                        fillfields: {
                            value: {
                                fromconfig: {
                                    model: 'productgroup',
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, fields }) => {
                                                    if (fields) {
                                                        return await actionFuncs_recalculatePrice({ cell, fields, myprops: this.props })
                                                    } else {

                                                        // const cellkey = Object.keys(cell)[0]
                                                        const cellvalue = Object.values(cell)[0]

                                                        return cellvalue.fillfields.value.toconfig.resetvalue


                                                    }
                                                },
                                            },
                                            // justRun :{ }
                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        wrapcompos: {
                            griditem: {
                                xs: 12,
                                xm: 4,
                                md: 4,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: false,
                        },
                        inputprops: {
                            name: 'price_input',
                            placeholder: '0.00',
                            startAdornment:
                                <InputAdornment position="start">
                                    {Object.keys(this.props.user.currencyUser.rates)}
                                </InputAdornment>,
                            type: 'number',
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true
                        },
                        config: {
                            label: 'Price',
                            helpertext: '',
                        },
                        validation: {
                            parse: false,
                            // type: ['required']
                        },
                        valid: true,
                        touched: false,
                        validationMessage: '',
                    },
                    category: {
                        element: 'autocomplete',
                        category: 'uim_autocompletetaxo',
                        value: [],
                        fillfields: {
                            value: {
                                fromconfig: {
                                    model: 'taxonomy',
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    if (fields) {
                                                        return await actionFuncs_transformIdsToArray({ cell, getlist, fields, myprops: this.props, populate: [{ path: 'referenceID' }] })
                                                    } else {

                                                        // const cellkey = Object.keys(cell)[0]
                                                        const cellvalue = Object.values(cell)[0]

                                                        return cellvalue.fillfields.value.toconfig.resetvalue

                                                    }
                                                },
                                            },
                                            // justRun :{ }
                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'array',
                                    resetvalue: [],
                                },
                                submitconfig: {
                                    // model: 'language',
                                    onSubmitAction: {
                                        // preCreate: {

                                        // },
                                        preCreate: {
                                            affectValue: {
                                                actionA: async ({ cell, fields }) => {
                                                    return await actionFuncs_handleArrayOfIds({ cell, fields })
                                                },
                                            }

                                        }
                                    }
                                }
                            },
                            options: {
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    return await actionFuncs_baseFindMany({ cell, getlist, model: 'taxonomy', fields, myprops: this.props, mystate: this.state, inQuery: { typetagmain: { "$in": { name: 'productgroup.cat.1' } } }, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
                                                },
                                            },
                                        }
                                    },
                                },
                                toconfig: {
                                    setpath: 'config.options',
                                    valuetype: 'array',
                                    resetvalue: [],
                                },
                            }
                        },
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'category_autocomplete',
                            type: 'text',
                            id: 'category',
                            autoComplete: true,
                            getOptionSelected: (option, value) => {

                                if (option._id === value._id) {
                                    return true
                                }
                            }
                        },

                        config: {
                            label: 'Category',
                            options: [],
                            resetvalue: [],
                            valuetype: 'array',
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    position: {
                        element: 'select',
                        category: 'ct_customselect',
                        value: '',
                        wrapcompos: {
                            griditem: {
                                xs: 4,
                                xm: 4,
                                md: 2,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,

                        },
                        inputprops: {
                            type: 'number',
                            name: "position_input",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'integer',
                                },
                            },
                        },
                        config: {
                            label: 'Position',
                            options: [],
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    inventory: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: 0,
                        wrapcompos: {
                            griditem: {
                                xs: 4,
                                xm: 4,
                                md: 4,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: false,
                        },
                        inputprops: {
                            type: 'number',
                            name: 'inventory_input',
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,

                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Inventory',

                            helpertext: '',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    visible: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: true,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'visible_switch',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: true,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Visible',
                            options: [
                                { key: true, value: 'yes' },
                                { key: false, value: 'no' },
                            ]
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    language: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '',
                        wrapcompos: {
                            griditem: {
                                xs: 12,
                                xm: 12,
                                md: 12,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        inputprops: {
                            type: 'hidden',
                            name: 'language_input',
                        },
                        configparams: {
                            showlabel: false,
                            showhelpertext: false,
                            showfield: false,

                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '',
                                },
                            },

                        },
                        config: {
                            label: 'Description',
                            helpertext: 'Enter text for Description',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    country: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '',
                        wrapcompos: {
                            griditem: {
                                xs: 12,
                                xm: 12,
                                md: 12,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        inputprops: {
                            type: 'hidden',
                            name: 'name_input',
                        },
                        configparams: {
                            showlabel: false,
                            showhelpertext: false,
                            showfield: false,

                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '',
                                },
                            },

                        },
                        config: {
                            label: 'Country',
                            helpertext: 'Enter text for Country',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    lgbinder: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '',
                        wrapcompos: {
                            griditem: {
                                xs: 12,
                                xm: 12,
                                md: 12,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        inputprops: {
                            type: 'hidden',
                            name: 'name_input',
                        },
                        configparams: {
                            showlabel: false,
                            showhelpertext: false,
                            showfield: false,
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '',
                                },
                            },
                        },
                        config: {
                            label: 'Lgbinder',
                            helpertext: 'Enter text for Lgbinder',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
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

                                                    if (!fields && !getlist) {
                                                        return []
                                                    } else {
                                                        return await actionFuncs_populateArrayOfRefsForDbWithQty_v2({ cell, getlist, fields, myprops: this.props, populate: [{ path: 'referenceID' }] })

                                                    }

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
                                            affectValue: {
                                                actionA: async ({ cell }) => {
                                                    return await actionFuncs_convertArrayOfRefsWithQty({ cell, myprops: this.props, mystate: this.state, model: this.state.localStorage.model })
                                                },
                                            },
                                            // justRun :{ }
                                        },
                                        // postCreate: { }
                                    }
                                }
                            },
                        },
                        config: {
                            label: 'Checked',
                            options: [],
                        },
                        sublist: {

                            // Don't change the name of this sublist

                            header: 'Add Components',
                            tiedtoelementkey: 'sublist',
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
                                    {
                                        keyname: 'images',
                                        columntype: 'image',
                                        configparams: {
                                        },
                                        config: {
                                            label: 'Image',
                                            valuetype: 'string',
                                            leftpath: 'referenceID.images',
                                            indicator: '0',
                                            rightpath: 'url'
                                        },
                                    },
                                    {
                                        keyname: 'name',
                                        columntype: 'text',
                                        config: {
                                            valuetype: 'string',
                                            label: 'Name',
                                            leftpath: 'referenceID',
                                            indicator: 'name'
                                        }
                                    },
                                    {
                                        keyname: 'quantity',
                                        columntype: 'quantity',
                                        config: {
                                            valuetype: 'integer',
                                            label: 'Quantity',
                                            indicator: 'quantity'
                                        }
                                    },
                                    {
                                        keyname: 'model',
                                        columntype: 'text',
                                        config: {
                                            valuetype: 'string',
                                            label: 'Model',
                                            indicator: 'model'
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
                                    {
                                        keyname: '',
                                        columntype: 'iconbutton',
                                        configparams: {
                                        },
                                        icon: Edit,
                                        actions: {
                                            onClick: ({ event, value, cell }) => this.onGotoLink({
                                                event,
                                                value,
                                                cell
                                            }),
                                        },
                                        inputprops: {
                                            id: 'generic',
                                            type: 'text',
                                            name: 'generic_button',
                                            color: 'primary'
                                        },
                                        config: {
                                            label: '',
                                        },
                                    }

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
                                                <SearchIcon />
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
                                    range: ['name', 'description'],
                                    depth: [],
                                    valid: false,
                                    touched: false,

                                },
                            },
                            models: ['taxonomy'],
                            // checked: []
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
                    },
                }
            },
            sublist: {
                // I can change the name of sublist here
                viewmodel: 'taxonomy',
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
                                    {/* <SearchIcon className={classes.inputIconsColor} /> */}
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            onBlur: (event) => this.onSearch({
                                event,
                                cell: { search: this.state.localStorage.sublist.viewparams.search },
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
            }

        }
    }

    async componentDidUpdate(prevProps, prevState) {

        if ('localeUser' in this.props.user) {
            let newLocalStorage

            if (
                prevProps.user.localeUser !== this.props.user.localeUser
            ) {

                let didmount_result = await compoFuncs_Refresh_v2({
                    model: this.state.localStorage.model,
                    myprops: this.props,
                    mystate: this.state,
                    prevmyprops: prevProps,
                    prevmystate: prevState,
                    poliglot: this.state.localStorage.poliglot,
                    type: 'add'
                })

                if (didmount_result) { newLocalStorage = { ...didmount_result.newLocalStorage } }
                else { newLocalStorage = { ...this.state.localStorage } }

                newLocalStorage = await this.showhidePriceField({ newLocalStorage })

                if (newLocalStorage && (!this.props[this.state.localStorage.sublist.viewmodel].list
                    || this.props.user.localeUser !== prevProps.user.localeUser)
                ) {
                    // The above condition has to be there to avoid looping
    
                    let sublistkey = 'sublist'
                    let tiedtoformkey = 'checked'
    
                    newLocalStorage.form.formdata[tiedtoformkey].value = []
    
                    newLocalStorage = await listFuncs_loadList_v2({
                        model: this.state.localStorage[sublistkey].viewmodel,
                        myprops: this.props,
                        mystate: this.state,
                        poliglot: this.state.localStorage.poliglot,
                        hideIDs: null,
                        sublistkey,
                        newLocalStorage
                    })
    
                }

                if (newLocalStorage) {
                    this.updateLocalStorage(newLocalStorage)
                }
            }
        }
    }
    async componentDidMount() {
        if ('localeUser' in this.props.user) {
            let didmount_result = await compoFuncs_Refresh_v2({
                model: this.state.localStorage.model,
                myprops: this.props,
                mystate: this.state,
                poliglot: this.state.localStorage.poliglot,
                type: 'add'
            })
            let newLocalStorage = { ...didmount_result.newLocalStorage }

            newLocalStorage = await this.showhidePriceField({ newLocalStorage })

            let sublistkey = 'sublist'

            newLocalStorage = await listFuncs_loadList_v2({
                sublistkey,
                model: this.state.localStorage[sublistkey].viewmodel,
                myprops: this.props,
                mystate: this.state,
                poliglot: this.state.localStorage.poliglot,
                hideIDs: null,
                newLocalStorage
            })

            if (newLocalStorage) {
                this.updateLocalStorage(newLocalStorage)
            }
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
    updateFormValues = async ({ cell }) => {

        let newLocalStorage = { ...this.state.localStorage }

        const cellkey = Object.keys(cell)[0]
        const cellvalue = Object.values(cell)[0]

        newLocalStorage['form']['formdata'][cellkey] = cellvalue
        this.updateLocalStorage(newLocalStorage)
    }

    showhidePriceField = async ({ newLocalStorage }) => {
        if (this.props.mysite.CurrentMysite.default_language.referenceID.alpha2Code !== this.props.user.localeUser.referenceID.alpha2Code) {
            newLocalStorage.form.formdata.price.configparams.showfield = false
        } else {
            newLocalStorage.form.formdata.price.configparams.showfield = true
        }

        return newLocalStorage
    }
    submitForm = async ({ translate = null }) => {
        await messageLoading({ myprops: this.props })

        let submit_result = await partsFuncs_submitForm_Add_v2({
            translate,
            model: this.state.localStorage.model,
            myprops: this.props,
            mystate: this.state,
            poliglot: this.state.localStorage.poliglot,
            type: 'add'
        })

        let newLocalStorage = { ...submit_result.newLocalStorage }

        let sublistkey = 'sublist'
        
        newLocalStorage = await listFuncs_loadList_v2({
            sublistkey,
            model: this.state.localStorage[sublistkey].viewmodel,
            myprops: this.props,
            mystate: this.state,
            poliglot: this.state.localStorage.poliglot,
            hideIDs: null,
            newLocalStorage
        })
        /* Reset the attach to field */

        if (newLocalStorage) {
            this.updateLocalStorage(newLocalStorage)
            if (submit_result.formIsValid) {
                await messageCompleted({ myprops: this.props })
            } else {
                await errorClosure({ myprops: this.props })
            }
        }
    }
    onGotoLink = ({ event, value = null, cell = null, sublistkey = null }) => {

        routing_gotoEdit({ event, value, cell, sublistkey, myprops: this.props, mystate: this.state })
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
    onChangeQuantityInForm = async ({event, direction, value = null, cell = null}) => {

        let newLocalStorage = await changeqty_qtyInForm({
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
    // =============== TABLE ACTIONS
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
            <div>
                <div>{<ShowMessages />}</div>
                {this.props ? <FormElement
                    formdata={this.state.localStorage.form.formdata}
                    model={this.state.localStorage.model}
                    myprops={this.props}
                    mystate={this.state}
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
                    changeQuantity={({ value, direction, event, cell }) => { return this.onChangeQuantityInForm({ value, direction, event, cell }) }}

                    submit={({ event, translate }) => this.submitForm({ event, translate })}
                /> : null}

                <GridContainer>
                    <GridItem xs={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <FormCustomInput
                                    sublistkey='sublist'
                                    tiedtoformkey='checked'
                                    formcell={this.state.localStorage.sublist.viewparams.search}
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
                                    sublistkey='sublist'
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
                                    handleSwitch={({ value, event, sublistkey, tiedtoformkey }) => {

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
                                    this.state.localStorage.sublist.viewparams.size > 0 && this.state.localStorage.sublist.viewparams.size >= this.state.localStorage.sublist.viewparams.limit ?
                                        <Button id='loadmore' style={{ width: '100%' }} onClick={(event) => {
                                            return this.onLoadMore({
                                                event,
                                                sublistkey: 'sublist',
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        productgroup: state.productgroup,
        taxonomy: state.taxonomy,
        mysite: state.mysite,
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(AddProductgroup);