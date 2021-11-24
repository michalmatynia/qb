import React, { Component } from 'react';
import { connect } from 'react-redux';

// Generic Functions
import { compoFuncs_Refresh_v2, compoFuncs_DidUpdate_Edit } from '../../../../User/Admin/GenericFuncs/compo_funcs'

import { listFuncs_loadList_v2 } from '../../../../User/Admin/GenericFuncs/list_funcs'

import { imageFuncs_removeImagesHandler_v2 } from '../../../../User/Admin/GenericFuncs/image_funcs'
import { partsFuncs_saveForm_v1 } from '../../../../User/Admin/GenericFuncs/parts_funcs'

import { ShowMessages } from '../../../../User/Admin/GenericFuncs/errormsg_funcs'
import FormElement from '../../../../utils/Form/Funcs/formContainer'

import ListTable from '../../GenericCompos/list_table'

import GridContainer from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/Card.js";
import CardBody from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardBody.js";
import CardHeader from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/Card/CardHeader.js";
import Button from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";
import FormCustomInput from '../../../../utils/Form/Funcs/FormCustomInput';
import { html_type } from '../../../../utils/Form/Fixed_categories/html_template'
import { actionFuncs_convertArrayOfRefs, actionFuncs_populateArrayOfRefsForDb_v2 } from '../../ActionFunctions/handleArrayOfRefs'
import { attachtoFuncs_populateEdit, attachtoFuncs_overModel_Edit_v2 } from '../../../../User/Admin/GenericFuncs/attachto_funcs'

import { changesort_classicSort, changesort_sortInForm } from '../../EventFuncs/changesort_funcs'
import { toggle_addToReferer, toggle_boolSwitch_v1 } from '../../EventFuncs/toggle_funcs'
import { changpos_classicAdjust, changpos_informAdjust } from '../../EventFuncs/changepos_funcs'
import { loadmore_classicLoad } from '../../EventFuncs/loadmore_funcs'
import { remove_fromDatabase, remove_fromFormTable } from '../../EventFuncs/remove_funcs'
import { search_inDatabase } from '../../EventFuncs/search_funcs'
import { pre_processCheckedIDs } from '../../EventFuncs/CommonFuncs/pre_funcs'
import { routing_gotoEdit } from '../../EventFuncs/routing_funcs'

import AutocompleteMenu from '../../GenericCompos/autocomplete_menu'

import { grabFormdataShowPreview_v1 } from '../../../../utils/Form/formActions.js'
// import CircularProgrees from '@material-ui/core/CircularProgress';
import { messageCompleted, errorClosure, messageLoading } from '../../GenericFuncs/errormsg_funcs'

// Material-UI Icons
// Material-UI
import InputAdornment from "@material-ui/core/InputAdornment";
import {
    Edit,
    Close,
    Remove
} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';

import {
    plg_clearProps
} from '../../../../utils/Plugs/cms_plugs';

class EditBrick extends Component {

    state = {
        localStorage: {
            model: 'brick',
            resetok: true,
            poliglot: true,
            qhelpers: {
                // populate: [{
                //     path: 'blockstyle', populate: {
                //       path: 'referenceID',
                //       model: 'Blockstyle'
                //     }
                //   }],
            },
            linguistic: {
                translate: ['name', 'description', 'title', 'btn_launch']
            },

            attachto: {
                // brick: [],
                page: []
            },
            form: {
                formError: false,
                formSuccess: false,
                formdata: {
                    images: {
                        element: 'multiupload',
                        category: 'ct_regularmultiupload',
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
                            label: 'Video',
                             folder: this.props.mysite.CurrentMysite._id + '/Brick/File', 
                            uploadparams: {
                                public_id: `${Date.now()}`,
                                resource_type: 'auto',
                                folder: this.props.mysite.CurrentMysite._id + '/Brick/File',
                                width: 1500,
                                height: 1000,
                                crop: "fill"
                            }
                        },
                        inputprops: {
                            type: 'file',
                            name: 'video_upload',
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
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '',
                                },
                            },

                        },
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
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '',
                                },
                            },

                        },
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
                        config: {
                            label: 'Description',
                            helpertext: 'Enter text for description',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    title: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '',
                                },
                            },

                        },
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
                            name: 'title_input',
                            autoComplete: 'On'
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Title',
                            helpertext: 'Enter text for title',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    btn_launch: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '',
                                },
                            },

                        },
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
                            name: 'btn_launch_input',
                            autoComplete: 'On'
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Button Launch',
                            helpertext: 'Enter text for Button Launch',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    btn_launch_link: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '',
                                },
                            },

                        },
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
                            name: 'btn_launch_link_input',
                            autoComplete: 'On'
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Button Launch Link',
                            helpertext: 'Enter text for Button Launch Link',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    htmltype: {
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
                                                    return html_type
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
                                    resetvalue: html_type[0],

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
                            name: 'htmltype_select',
                            type: 'text',
                            id: 'htmltype',
                        },

                        config: {
                            label: 'Main Tag',
                            options: [],
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
                    blockstyle: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: [],
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
                            name: 'blockstyle_input',
                        },
                        configparams: {
                            showlabel: false,
                            showhelpertext: false,
                            showfield: false,

                        },
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
                            label: 'Blockstyle',
                            helpertext: 'Enter text for Blockstyle',
                        },
                        validation: {
                            // parse: true,
                            // type: ['required']
                        },
                        valid: true,
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
                    css_wrap_card: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'css_main_switch',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'in CSS Card',
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
                    css_wrap_container: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'css_wrap_container',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'in CSS Container',
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
                    css_wrap_mainraised: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'css_wrap_mainraised',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'in CSS Main Raised',
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
                }
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
                models: ['slide', 'product', 'view'],
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {

        if ('localeUser' in this.props.user) {
            let newLocalStorage

            if (
                prevProps.user.localeUser !== this.props.user.localeUser
            ) {

                let sublistkey = 'sublist'
                let tiedtoformkey = 'checked'

                let didmount_result = await compoFuncs_DidUpdate_Edit({
                    model: this.state.localStorage.model,
                    myprops: this.props,
                    prevmyprops: prevProps,
                    mystate: this.state,
                    poliglot: this.state.localStorage.poliglot,
                    sublistkey,
                    tiedtoformkey,
                    type: 'edit'
                })

                if (didmount_result) {
                    newLocalStorage = { ...didmount_result.newLocalStorage }
                    let found = { ...didmount_result.found.payload }

                    newLocalStorage = await attachtoFuncs_populateEdit({
                        model: 'page',
                        myprops: this.props,
                        newLocalStorage,
                        found
                    })

                } else {
                    newLocalStorage = { ...this.state.localStorage }
                }

                if (newLocalStorage && (!this.props[this.state.localStorage.sublist.viewmodel].list
                    || this.props.user.localeUser !== prevProps.user.localeUser)
                ) {
                    let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage })

                    let populate = await this.modelPopulate({ model: this.state.localStorage[sublistkey].viewmodel })

                    newLocalStorage = await listFuncs_loadList_v2({
                        model: this.state.localStorage[sublistkey].viewmodel,
                        myprops: this.props,
                        mystate: this.state,
                        poliglot: this.state.localStorage.poliglot,
                        hideIDs: checkedIDs,
                        sublistkey,
                        newLocalStorage,
                        populate
                    })

                }

                if (newLocalStorage) {
                    await this.updateLocalStorage(newLocalStorage)
                }
            }
        }
    }
    async componentDidMount() {
        if ('localeUser' in this.props.user) {


            let sublistkey = 'sublist'
            let tiedtoformkey = 'checked'

            let didmount_result = await compoFuncs_Refresh_v2({
                model: this.state.localStorage.model,
                myprops: this.props,
                mystate: this.state,
                rootid: this.props.match.params.id,
                poliglot: this.state.localStorage.poliglot,
                type: 'edit'
            })

            let newLocalStorage = { ...didmount_result.newLocalStorage }
            let found = { ...didmount_result.found.payload }

            newLocalStorage = await attachtoFuncs_populateEdit({
                model: 'page',
                myprops: this.props,
                newLocalStorage,
                found
            })

            let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage })

            let populate = await this.modelPopulate({ model: this.state.localStorage[sublistkey].viewmodel })

            newLocalStorage = await listFuncs_loadList_v2({
                sublistkey,
                model: this.state.localStorage[sublistkey].viewmodel,
                myprops: this.props,
                mystate: this.state,
                poliglot: this.state.localStorage.poliglot,
                hideIDs: checkedIDs,
                newLocalStorage,
                populate
            })

            if (newLocalStorage) {
                await this.updateLocalStorage(newLocalStorage)
            }
        }
    }
    async componentWillUnmount() {
        await plg_clearProps({ myprops: this.props, model: this.state.localStorage.model, actionType: 'list' })
        await plg_clearProps({ myprops: this.props, model: this.state.localStorage.model, actionType: 'detail' })

        await plg_clearProps({ myprops: this.props, model: 'slide', actionType: 'list' })
        await plg_clearProps({ myprops: this.props, model: 'product', actionType: 'list' })
    }

    modelPopulate = async ({ model }) => {

        let populate = null

        if (model === 'slide') {
            populate = [{ path: 'category' }]
        } else if (model === 'product') {
            populate = [{ path: 'category' }, { path: 'type' }]
        }
        return populate
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
    // =============== FORM ACTIONS

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

        let populate = await this.modelPopulate({ model: this.state.localStorage[sublistkey].viewmodel })

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

    renderButtonGroup({ mystate = null, sublistkey = null, tiedtoformkey = null }) {

        function renderButton({ mystate, showTable }) {
            let button
            let parent = []

            for (const [index, value] of mystate.localStorage[sublistkey].models.entries()) {
                button = <Button color="primary" key={index} onClick={() => showTable({ submodel: value })}>{value}</Button>
                parent.push(button)
            }

            return parent
        }

        return renderButton({ mystate, sublistkey, tiedtoformkey, showTable: ({ submodel }) => this.showTable({ submodel, sublistkey, tiedtoformkey }) })
    }

    async showTable({ submodel = null, sublistkey, tiedtoformkey }) {
        let newLocalStorage = { ...this.state.localStorage }

        let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage })

        newLocalStorage[sublistkey].viewmodel = submodel
        newLocalStorage[sublistkey].viewparams.size = 0

        let populate = await this.modelPopulate({ model: this.state.localStorage[sublistkey].viewmodel })

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

    saveForm = async ({ translate = null, event = null }) => {
        await messageLoading({ myprops: this.props })

        let save_result = await partsFuncs_saveForm_v1({
            event,
            translate,
            poliglot: this.state.localStorage.poliglot,
            mystate: this.state,
            myprops: this.props,
            model: this.state.localStorage.model,
        })

        if (save_result.updated) {

            let newLocalStorage = { ...this.state.localStorage }

            let updated = { ...save_result.updated }
            let current = { ...save_result.current }

            newLocalStorage = await attachtoFuncs_overModel_Edit_v2({
                translate,
                model: 'page',
                submodel: this.state.localStorage.model,
                myprops: this.props,
                mystate: this.state,
                newLocalStorage,
                updated,
                current,
                attacher_updated_arr: newLocalStorage.attachto.page
            })

            if (newLocalStorage) {
                this.updateLocalStorage(newLocalStorage)

                if (save_result.formIsValid) {
                    await messageCompleted({ myprops: this.props })
                } else {
                    await errorClosure({ myprops: this.props })
                }
            }
        }
    }

    render() {
        return (
            <div>
                <div>{<ShowMessages />}</div>
                {grabFormdataShowPreview_v1({ mystate: this.state })}
                {this.props ? <AutocompleteMenu
                    change={({ cell }) => this.getOverModel({ cell })}
                    onclick={({ event, cell, index }) => {
                        const cellvalue = Object.values(cell)[0]
 
                        this.props.history.push('/admin/edit_page/' + cellvalue.value[0]._id)
                    }}

                    state={{
                        localStorage: {
                            model: 'page',
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
                                            label: 'Add to Page'
                                        }
                                    }
                                }
                            }
                        }
                    }}
                    inject_value={
                        this.state.localStorage.attachto.page
                    }

                /> : null}
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
                    save={({ event, translate }) => this.saveForm({
                        event,
                        translate,
                    })}
                />}
                <GridContainer>
                    <GridItem xs={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                {this.renderButtonGroup({
                                    mystate: this.state,
                                    sublistkey: 'sublist',
                                    tiedtoformkey: 'checked'
                                })}
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
        brick: state.brick,
        slide: state.slide,
        product: state.product,
        view: state.view,
        mysite: state.mysite,
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(EditBrick);