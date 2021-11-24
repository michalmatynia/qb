import React, { Component } from 'react';
import { connect } from 'react-redux';

// Generic Functions 
import { partsFuncs_submitForm_Add_v2 } from '../../../../User/Admin/GenericFuncs/parts_funcs'
import { compoFuncs_Refresh_v2 } from '../../../../User/Admin/GenericFuncs/compo_funcs'
import { ShowMessages } from '../../../../User/Admin/GenericFuncs/errormsg_funcs'

import { listFuncs_loadList_v2 } from '../../GenericFuncs/list_funcs'

import { actionFuncs_isDefaultHandle } from '../../ActionFunctions/isdefaultHandle'
import { actionFuncs_convertArrayOfRefs, actionFuncs_populateArrayOfRefsForDb_v2 } from '../../ActionFunctions/handleArrayOfRefs'
import { actionFuncs_IDtoValue } from '../../ActionFunctions/transformValue'
import { actionFuncs_baseFindMany } from '../../ActionFunctions/baseFindMany'


import ListTable from '../../GenericCompos/list_table'

import GridContainer from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardBody.js";
import CardHeader from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardHeader.js";
import Button from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";
import FormCustomInput from '../../../../utils/Form/Funcs/FormCustomInput';

import FormElement from '../../../../utils/Form/Funcs/formContainer'
import { changesort_classicSort, changesort_sortInForm } from '../../EventFuncs/changesort_funcs'
import { toggle_addToReferer, toggle_boolSwitch_v1 } from '../../EventFuncs/toggle_funcs'
import { changpos_classicAdjust, changpos_informAdjust } from '../../EventFuncs/changepos_funcs'
import { loadmore_classicLoad } from '../../EventFuncs/loadmore_funcs'
import { remove_fromDatabase, remove_fromFormTable } from '../../EventFuncs/remove_funcs'
import { search_inDatabase } from '../../EventFuncs/search_funcs'
import { routing_gotoEdit } from '../../EventFuncs/routing_funcs'
import { messageCompleted, errorClosure, messageLoading } from '../../GenericFuncs/errormsg_funcs'


// Material-UI Icons
import {
    Edit,
    Close,
    Remove
} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

// Material-UI
import InputAdornment from "@material-ui/core/InputAdornment";
import {
    plg_clearProps,
    plg_findOne_QueMod
} from '../../../../utils/Plugs/cms_plugs';

class AddMysite extends Component {
   
    state = {
        localStorage: {
            model: 'mysite',
            resetok: true,
            poliglot: false,
            qhelpers: {
            },
            linguistic: {},
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
                            folder: this.props.mysite.CurrentMysite._id + '/Mysite/File',

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
                    email: {
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
                            type: 'email',
                            name: 'email_input',
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
                            label: 'Email',
                            helpertext: 'Enter text for Email',
                        },
                        validation: {
                            parse: true,
                            type: ['verifyemail'],
                            message: ''
                        },
                        valid: false,
                        touched: false,
                    },
                    address_fname: {
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
                            name: 'address_fname_input',
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
                            label: 'First Name',
                            helpertext: 'Enter text for First Name',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    address_lname: {
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
                            name: 'address_lname_input',
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
                            label: 'Last Name',
                            helpertext: 'Enter text for Last Name',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    address_street: {
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
                            name: 'address_street_input',
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
                            label: 'Street',
                            helpertext: 'Enter text for Street',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    address_zip: {
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
                            name: 'address_zip_input',
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
                            label: 'ZIP',
                            helpertext: 'Enter text for ZIP',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    address_city: {
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
                            name: 'address_city_input',
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
                            label: 'City',
                            helpertext: 'Enter text for City',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    address_country: {
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
                            name: 'address_country_input',
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
                    address_telephone: {
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
                            name: 'address_telephone_input',
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
                            label: 'Telephone',
                            helpertext: 'Enter text for Telephone',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    files_upload_default_size: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: true,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'files_upload_default_size',
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
                            label: 'Upload on Default Size',
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
                    files_upload_width: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '',
                        wrapcompos: {
                            griditem: {
                                xs: 4,
                                xm: 4,
                                md: 4,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        inputprops: {
                            type: 'number',
                            name: 'files_upload_width',
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
                                    valuetype: 'integer',
                                    resetvalue: '',
                                },
                            },

                        },
                        config: {
                            label: 'File Width',
                            helpertext: 'Enter upload file width',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    files_upload_height: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '',
                        wrapcompos: {
                            griditem: {
                                xs: 4,
                                xm: 4,
                                md: 4,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        inputprops: {
                            type: 'number',
                            name: 'files_upload_height',
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
                                    valuetype: 'integer',
                                    resetvalue: '',
                                },
                            },

                        },
                        config: {
                            label: 'File Height',
                            helpertext: 'Enter upload file height',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    files_usecloud: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: true,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'files_usecloud_switch',
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
                            label: 'Use Cloud For Upload (* not active)',
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
                    files_remove_from_cloud: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: true,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'files_usecloud_switch',
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
                            label: 'Remove from Cloud (* not active)',
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
                    estore: {
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
                            label: 'Estore (* not active)',
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
                                        postCreate: {
                                            justRun: {
                                                actionA: async ({ cell, added }) => {
                                                    await actionFuncs_isDefaultHandle({ cell, myprops: this.props, mystate: this.state, model: this.state.localStorage.model, added })
                                                    
                                                    if (added.payload.isdefault === true) {

                                                    let inQuery = {
                                                        isdefault: { "$eq": true }
                                                    }
                                                    await plg_findOne_QueMod({ myprops: this.props, mystate: this.state, model: this.state.localStorage.model, actionType: 'current', inQuery, populate: [{ path: 'default_language' }, { path: 'default_language', populate: { path: 'referenceID' } }] })
                                                }
                                                
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
                    translation_engine: {
                        element: 'select',
                        category: 'ct_sidebarselect',
                        value: '',
                        fillfields: {
                            value: {
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {


                                                    if (!fields) {
                                                        let result = await actionFuncs_baseFindMany({ cell, getlist, fields, model: 'transengine', myprops: this.props, mystate: this.state, inQuery: { name: { "$eq": this.props.mysite.CurrentMysite.translation_engine } }, distinct: 'name' })
                                                        return result[0]

                                                    } else {

                                                        const cellkey = Object.keys(cell)[0]
                                                        // const cellvalue = Object.values(cell)[0]

                                                        return fields[cellkey]
                                                    }
                                                },
                                            },
                                            // justRun :{ }
                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '',
                                },
                            },
                            options: {
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    if (!fields) {
                                                        return await actionFuncs_baseFindMany({ cell, getlist, fields, model: 'transengine', myprops: this.props, mystate: this.state, inQuery: { type: { "$eq": 'translator' } }, distinct: 'name' })
                                                    }
                                                },
                                            },
                                            // justRun :{ }
                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'config.options',
                                    valuetype: 'array',
                                    resetvalue: [],
                                },
                            }
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 8,
                                xm: 8,
                                md: 4,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        inputprops: {
                            type: 'text',
                            name: 'template_input',
                        },
                        configparams: {
                            showlabel: false,
                            showhelpertext: true,
                            showfield: true,
                        },
                        config: {
                            label: 'Translation Engine',
                            helpertext: 'Choose Engine',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: true
                        },
                        valid: true,
                        touched: false,
                        sublist: {
                            // Don't change the name of this sublist
                            // header: 'Add Components',
                            tableparams: {
                                renderHeader: false,
                                columns: [
                                    {
                                        keyname: 'languages',
                                        columntype: 'text',
                                        config: {
                                            label: 'Language',
                                        }
                                    },
                                ]
                            },
                            viewparams: {
                                limit: 5000,
                                skip: 0,
                                size: 0,
                                sortBy: 'position',
                                sortOrder: 1,
                            },
                        },
                        sublistValue: {
                            // these configs need to be remove from sublists
                            tableparams: {
                                columns: [
                                    {
                                        keyname: 'languages',
                                        columntype: 'text',
                                        config: {
                                            label: 'Language',
                                        }
                                    },
                                ]
                            }
                        },
                    },
                    conversion_engine: {
                        element: 'select',
                        category: 'ct_sidebarselect',
                        value: '',
                        fillfields: {
                            value: {
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    if (!fields) {
                                                        let result = await actionFuncs_baseFindMany({ cell, getlist, fields, model: 'transengine', myprops: this.props, mystate: this.state, inQuery: { name: { "$eq": this.props.mysite.CurrentMysite.conversion_engine } }, distinct: 'name' })
                                                        return result[0]
                                                    } else {

                                                        const cellkey = Object.keys(cell)[0]
                                                        // const cellvalue = Object.values(cell)[0]

                                                        return fields[cellkey]
                                                    }
                                                },
                                            },
                                            // justRun :{ }
                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '',
                                },
                            },
                            options: {
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    if (!fields) {
                                                        return await actionFuncs_baseFindMany({ cell, getlist, fields, model: 'transengine', myprops: this.props, mystate: this.state, inQuery: { type: { "$eq": 'currencyconverter' } }, distinct: 'name' })
                                                    }
                                                },
                                            },
                                            // justRun :{ }
                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'config.options',
                                    valuetype: 'array',
                                    resetvalue: [],
                                },
                            }
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 8,
                                xm: 8,
                                md: 4,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,

                        },
                        inputprops: {
                            type: 'text',
                            name: 'template_input',
                        },
                        configparams: {
                            showlabel: false,
                            showhelpertext: true,
                            showfield: true,
                        },
                        config: {
                            label: 'Translation Engine',
                            helpertext: 'Choose Engine',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: true
                        },
                        valid: true,
                        touched: false,
                        sublist: {
                            // Don't change the name of this sublist
                            // header: 'Add Components',
                            tableparams: {
                                renderHeader: false,
                                columns: [
                                    {
                                        keyname: 'languages',
                                        columntype: 'text',
                                        config: {
                                            label: 'Language',
                                        }
                                    },
                                ]
                            },
                            viewparams: {
                                limit: 5000,
                                skip: 0,
                                size: 0,
                                sortBy: 'position',
                                sortOrder: 1,
                            },
                        },
                        sublistValue: {
                            // these configs need to be remove from sublists
                            tableparams: {
                                columns: [
                                    {
                                        keyname: 'languages',
                                        columntype: 'text',
                                        config: {
                                            label: 'Language',
                                        }
                                    },
                                ]
                            }
                        },
                    },
                    default_language: {
                        element: 'select',
                        category: 'ct_sidebarselect',
                        value: '',
                        fillfields: {
                            value: {
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    getlist = await actionFuncs_baseFindMany({ cell, getlist, model: 'mysite', fields, myprops: this.props, mystate: this.state, inQuery: { isdefault: { "$eq": true } }, distinct: 'default_language', populate: [{ path: 'referenceID' }] })
                                                    return await actionFuncs_IDtoValue({ cell, getlist, model: 'language', fields, myprops: this.props, mystate: this.state, populate: [{ path: 'referenceID' }] })
                                                },
                                            },
                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'array',
                                    resetvalue: '',
                                },
                                submitconfig: {
                                    parentindex: 0,
                                    indicator: '_id'

                                }
                            },
                            options: {
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    return await actionFuncs_baseFindMany({ cell, getlist, model: 'language', fields, myprops: this.props, mystate: this.state, populate: [{ path: 'referenceID' }] })
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
                            griditem: {
                                xs: 8,
                                xm: 8,
                                md: 4,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,

                        },
                        inputprops: {
                            type: 'text',
                            name: 'template_input',
                        },
                        configparams: {
                            showlabel: false,
                            showhelpertext: true,
                            showfield: true,
                        },
                        config: {
                            label: 'Translation Engine',
                            helpertext: 'Choose Engine',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: true
                        },
                        valid: true,
                        touched: false,
                        sublist: {
                            // This is a sublist of Options
                            // Don't change the name of this sublist
                            // header: 'Add Components',
                            tableparams: {
                                renderHeader: false,
                                columns: [
                                    // {
                                    //     keyname: 'flags',
                                    //     columntype: 'image',
                                    //     configparams: {
                                    //     },
                                    //     config: {
                                    //         label: 'Image',
                                    //         leftpath: 'referenceID.flags',
                                    //         indicator: '0',
                                    //     },
                                    // },
                                    {
                                        keyname: 'languages',
                                        columntype: 'text',
                                        config: {
                                            leftpath: 'referenceID.languages.0',
                                            indicator: 'name',
                                            label: 'Language',
                                        }
                                    },
                                ]
                            },
                            viewparams: {
                                limit: 5000,
                                skip: 0,
                                size: 0,
                                sortBy: 'position',
                                sortOrder: 1,
                            },
                        },
                        sublistValue: {
                            // Don't change the name of this sublist
                            tableparams: {
                                columns: [
                                    // {
                                    //     keyname: 'flags',
                                    //     columntype: 'image',
                                    //     configparams: {
                                    //     },
                                    //     config: {
                                    //         label: 'Image',
                                    //         leftpath: '0.referenceID.flags',
                                    //         indicator: '0',
                                    //     },
                                    // },
                                    {
                                        keyname: 'languages',
                                        columntype: 'text',
                                        config: {
                                            parentindex: 0,
                                            leftpath: 'referenceID.languages.0',
                                            indicator: 'name',
                                            label: 'Language',
                                        }
                                    },
                                ]
                            }
                        },
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
                            // models: ['slide', 'product', 'view'],
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
                viewmodel: 'theme',
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
                        },
                        range: ['name'],
                        depth: [],
                        valid: false,
                        touched: false,
                    },
                },
            }
        }
    }

    
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.mysite.CurrentMysite !== prevProps.mysite.CurrentMysite) {
            let newLocalStorage
            if (
                prevProps.user.localeUser !== this.props.user.localeUser
            ) {
            let didmount_result = await compoFuncs_Refresh_v2({
                model: this.state.localStorage.model,
                myprops: this.props,
                mystate: this.state,
                poliglot: this.state.localStorage.poliglot,
                type: 'add'
            })

            let sublistkey = 'sublist'

            if (didmount_result) { newLocalStorage = { ...didmount_result.newLocalStorage } }
            else { newLocalStorage = { ...this.state.localStorage } }

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
        await plg_clearProps({ myprops: this.props, model: 'theme', actionType: 'list' })

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
        theme: state.theme,
        mysite: state.mysite,
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(AddMysite);