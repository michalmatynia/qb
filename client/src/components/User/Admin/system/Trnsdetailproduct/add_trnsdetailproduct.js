import React, { Component } from 'react';
import { connect } from 'react-redux';

// Generic Functions 
import { partsFuncs_submitForm_Add_v2 } from '../../../../User/Admin/GenericFuncs/parts_funcs'
import { compoFuncs_Refresh_v2 } from '../../../../User/Admin/GenericFuncs/compo_funcs'
import { ShowMessages } from '../../../../User/Admin/GenericFuncs/errormsg_funcs'

import { actionFuncs_isDefaultHandle } from '../../ActionFunctions/isdefaultHandle'
import { actionFuncs_convertArrayOfRefs, actionFuncs_populateArrayOfRefsForDb_v2 } from '../../ActionFunctions/handleArrayOfRefs'
import {modelPopulate} from '../../ActionFunctions/modelPopulate'

import ListTable from '../../GenericCompos/list_table'
import { tim_colors } from '../../../../utils/Form/Fixed_categories/tim_colors'

import GridContainer from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardBody.js";
import CardHeader from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardHeader.js";
import Button from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";
import FormCustomInput from '../../../../utils/Form/Funcs/FormCustomInput';
import { listFuncs_loadList_v2 } from '../../GenericFuncs/list_funcs'

import FormElement from '../../../../utils/Form/Funcs/formContainer'
import { messageCompleted, errorClosure, messageLoading } from '../../GenericFuncs/errormsg_funcs'

import {
    Edit,
    Close,
    Remove
} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

import InputAdornment from "@material-ui/core/InputAdornment";

// Material-UI Icons
import {
    plg_clearProps,
} from '../../../../utils/Plugs/cms_plugs';


import { changesort_classicSort, changesort_sortInForm } from '../../EventFuncs/changesort_funcs'
import { toggle_addToReferer, toggle_boolSwitch_v1 } from '../../EventFuncs/toggle_funcs'
import { changpos_classicAdjust, changpos_informAdjust } from '../../EventFuncs/changepos_funcs'
import { loadmore_classicLoad } from '../../EventFuncs/loadmore_funcs'
import { remove_fromDatabase, remove_fromFormTable } from '../../EventFuncs/remove_funcs'
import { search_inDatabase } from '../../EventFuncs/search_funcs'
import { routing_gotoEdit } from '../../EventFuncs/routing_funcs'
import { pre_processCheckedIDs } from '../../EventFuncs/CommonFuncs/pre_funcs'

import { grabFormdataShowPreview_v1 } from '../../../../utils/Form/formActions.js'

class AddTrnsDetailProduct extends Component {

    state = {
        localStorage: {
            model: 'trnsdetailproduct',
            resetok: true,
            poliglot: true,
            qhelpers: {
            },
            linguistic: {
                translate: [
                    'description_one_nametag',
                    'description_two_nametag',
                    'similar_product_nametag',
                    'back_btn',
                    'buy_btn',
                    'addedtocart_msg'
                ]
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
                            folder: this.props.mysite.CurrentMysite._id + '/Trnsdetailproduct/File',
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
                    image_filter: {
                        element: 'select',
                        category: 'ct_customselect',
                        value: '',
                        fillfields: {
                            options: {
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    return tim_colors
                                                },
                                            },
                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'config.options',
                                    valuetype: 'array',
                                },
                            },
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: tim_colors[0],

                                },
                            },
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
                            name: 'tim_colors_select',
                            type: 'text',
                            id: 'tim_colors',
                        },

                        config: {
                            label: 'Filter Color',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    description_one_nametag: {
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
                            name: 'description_one_input',
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
                            label: 'Desription One Nametag',
                            helpertext: 'Enter text for Desription One Nametag',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    description_two_nametag: {
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
                            name: 'description_two_input',
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
                            label: 'Description Two',
                            helpertext: 'Enter text for Description Two Nametag',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    similar_product_nametag: {
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
                            name: 'similar_product_input',
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
                            label: 'Similar Product Nametag',
                            helpertext: 'Enter text for Similar Product Nametag',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    back_btn: {
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
                            name: 'back_btn_input',
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
                            label: 'Back Button',
                            helpertext: 'Enter text for Back Button',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    buy_btn: {
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
                            label: 'Buy Button',
                            helpertext: 'Enter text for Buy Button',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    addedtocart_msg: {
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
                            name: 'addedtocart_msg_input',
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
                            label: 'Added To Cart Message',
                            helpertext: 'Enter text for Added To Cart Message',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
          
                    isdefault: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: true,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'isdefault_switch',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: true,
                                },
                                submitconfig: {
                                    // model: 'language',
                                    onSubmitAction: {
                                        // preCreate: {

                                        // },
                                        postCreate: {
                                            justRun: {
                                                actionA: async ({ cell, added, current }) => {
                                                    await actionFuncs_isDefaultHandle({ cell, myprops: this.props, mystate: this.state, model: this.state.localStorage.model, added, current })
                                                },
                                            }
                                        }
                                    }
                                }
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Default',
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
                                                        return await actionFuncs_populateArrayOfRefsForDb_v2({ cell, getlist, fields, myprops: this.props, populate: [{ path: 'referenceID' }] })

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
                                                    return await actionFuncs_convertArrayOfRefs({ cell, myprops: this.props, mystate: this.state, model: this.state.localStorage.model })
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
                                        keyname: 'position',
                                        columntype: 'text',
                                        config: {
                                            valuetype: 'integer',
                                            label: 'Position',
                                            indicator: 'position'
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
                            models: ['slide', 'product', 'view'],
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
                },
            },
            sublist: {
                // I can change the name of sublist here
                viewmodel: 'slide',
                qhelpers: {
                    populate: [{ path: 'category' }]
                },
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
                models: ['slide'],
            }
        }
    }
    
    async componentDidUpdate(prevProps, prevState) {

        if ('localeUser' in this.props.user) {

            let newLocalStorage

            if (prevProps.user.localeUser !== this.props.user.localeUser) {

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
            }


            if (newLocalStorage && (!this.props[this.state.localStorage.sublist.viewmodel].list
                || this.props.user.localeUser !== prevProps.user.localeUser)
            ) {
                // The above condition has to be there to avoid looping

                let sublistkey = 'sublist'
                let tiedtoformkey = 'checked'

                newLocalStorage.form.formdata[tiedtoformkey].value = []

                let populate  = await modelPopulate({model: this.state.localStorage[sublistkey].viewmodel})

                newLocalStorage = await listFuncs_loadList_v2({
                    model: this.state.localStorage[sublistkey].viewmodel,
                    myprops: this.props,
                    mystate: this.state,
                    poliglot: this.state.localStorage.poliglot,
                    hideIDs: null,
                    sublistkey,
                    newLocalStorage,
                    populate
                })

            }

            if (newLocalStorage) {
                this.updateLocalStorage(newLocalStorage)
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

            let sublistkey = 'sublist'

            let populate  = await modelPopulate({model: this.state.localStorage[sublistkey].viewmodel})

            newLocalStorage = await listFuncs_loadList_v2({
                sublistkey,
                model: this.state.localStorage[sublistkey].viewmodel,
                myprops: this.props,
                mystate: this.state,
                poliglot: this.state.localStorage.poliglot,
                hideIDs: null,
                newLocalStorage,
                populate
            })

            if (newLocalStorage) {
                this.updateLocalStorage(newLocalStorage)
            }
        }
    }
    async componentWillUnmount() {
        await plg_clearProps({ myprops: this.props, model: this.state.localStorage.model, actionType: 'list' })
        await plg_clearProps({ myprops: this.props, model: this.state.localStorage.model, actionType: 'detail' })

        await plg_clearProps({ myprops: this.props, model: 'slide', actionType: 'list' })
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
    /* Dodaje poza formularzem */
    getOverModel = async ({ cell }) => {
        let newLocalStorage = { ...this.state.localStorage }
        // const cellkey = Object.keys(cell)[0]
        const cellvalue = Object.values(cell)[0]
        newLocalStorage['attachto']['page'] = cellvalue.value

        this.updateLocalStorage(newLocalStorage)

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
        let populate  = await modelPopulate({model: this.state.localStorage[sublistkey].viewmodel})

        newLocalStorage = await listFuncs_loadList_v2({
            sublistkey,
            model: this.state.localStorage[sublistkey].viewmodel,
            myprops: this.props,
            mystate: this.state,
            poliglot: this.state.localStorage.poliglot,
            hideIDs: null,
            newLocalStorage,
            populate

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

        let populate  = await modelPopulate({model: this.state.localStorage[sublistkey].viewmodel})

        let newLocalStorage = await toggle_addToReferer({
            value,
            event,
            cell,
            sublistkey,
            tiedtoformkey,
            mystate: this.state,
            myprops: this.props,
            poliglot: this.state.localStorage.poliglot,
            populate

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


    async showTable({ submodel = null, sublistkey, tiedtoformkey }) {
        let newLocalStorage = { ...this.state.localStorage }

        let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage })

        newLocalStorage[sublistkey].viewmodel = submodel
        newLocalStorage[sublistkey].viewparams.size = 0

        let populate  = await modelPopulate({model: this.state.localStorage[sublistkey].viewmodel})

        newLocalStorage = await listFuncs_loadList_v2({
            sublistkey,
            model: newLocalStorage[sublistkey].viewmodel,
            myprops: this.props,
            mystate: this.state,
            poliglot: this.state.localStorage.poliglot,
            hideIDs: checkedIDs,
            newLocalStorage,
            populate

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
        trnsdetailproduct: state.trnsdetailproduct,
        slide: state.slide,
        mysite: state.mysite,
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(AddTrnsDetailProduct);