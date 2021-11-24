import React, { Component } from 'react';
import { connect } from 'react-redux';

// Generic Functions
import { compoFuncs_Refresh_v2, compoFuncs_DidUpdate_Edit } from '../../../../User/Admin/GenericFuncs/compo_funcs'
import { imageFuncs_removeImagesHandler_v2 } from '../../../../User/Admin/GenericFuncs/image_funcs'
import { partsFuncs_saveForm_v1 } from '../../../../User/Admin/GenericFuncs/parts_funcs'
import { actionFuncs_handleArrayOfIds, actionFuncs_transformIdsToArray } from '../../ActionFunctions/handleArrayOfIds'
import { actionFuncs_recalculatePrice } from '../../ActionFunctions/recalculatePrice'
import { actionFuncs_baseFindMany } from '../../ActionFunctions/baseFindMany'
import { messageCompleted, errorClosure, messageLoading, ShowMessages } from '../../GenericFuncs/errormsg_funcs'
import { attachtoFuncs_populateEdit, attachtoFuncs_overModel_Edit_v2 } from '../../../../User/Admin/GenericFuncs/attachto_funcs'
import AutocompleteMenu from '../../GenericCompos/autocomplete_menu'

import FormElement from '../../../../utils/Form/Funcs/formContainer'

import InputAdornment from "@material-ui/core/InputAdornment";
import {
    plg_clearProps,
} from '../../../../utils/Plugs/cms_plugs';

class EditProduct extends Component {

    state = {
        localStorage: {
            model: 'product',
            resetok: true,
            poliglot: true,
            qhelpers: {
            },
            linguistic: {
                translate: ['name', 'description', 'description_two', 'variant_one_name', 'variant_two_name']
            },
            attachto: {
                brick: [],
                // page:[]
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
                            //  folder: this.props.mysite.CurrentMysite._id + '/Product/File', 
                            uploadparams: {
                                public_id: `${Date.now()}`,
                                resource_type: 'auto',
                                folder: this.props.mysite.CurrentMysite._id + '/Product/File',
                                width: 2000,
                                height: 3000,
                                crop: "fill"
                            }
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
                    description_two: {
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
                            label: 'Description Two',
                            helpertext: 'Enter text for Description Two',
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
                    price: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: 0,
                        fillfields: {
                            value: {
                                fromconfig: {
                                    model: 'product',
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
                            parse: true,
                            type: ['notempty']
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
                                                        return await actionFuncs_transformIdsToArray({ cell, getlist, fields, myprops: this.props, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
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

                                                /* populate options field */
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    return await actionFuncs_baseFindMany({ cell, getlist, model: 'taxonomy', fields, myprops: this.props, mystate: this.state, inQuery: { typetagmain: { "$in": { name: 'product.tag.1' } } }, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
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
                    type: {
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
                                                        return await actionFuncs_transformIdsToArray({ cell, getlist, fields, myprops: this.props, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
                                                    } else {
                                                        const cellvalue = Object.values(cell)[0]
                                                        return cellvalue.fillfields.value.toconfig.resetvalue

                                                    }
                                                },
                                            },
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
                                                    return await actionFuncs_baseFindMany({ cell, getlist, model: 'taxonomy', fields, myprops: this.props, mystate: this.state, inQuery: { typetagmain: { "$in": { name: 'product.type.1' } } }, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
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
                            name: 'type_autocomplete',
                            type: 'text',
                            id: 'type',
                            autoComplete: true,
                            getOptionSelected: (option, value) => {

                                if (option._id === value._id) {
                                    return true
                                }
                            }
                        },
                        config: {
                            label: 'Type',
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
                    variant_one_toggle: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: true,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'variant_one_switch',
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
                            label: 'Visible Variant One',
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
                    variant_one_name: {
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
                            name: 'variant_one_name_input',
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
                            label: 'Variant One Name',
                            helpertext: 'Enter text for Variant Name',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },

                    variant_one_taxo: {
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
                                                        return await actionFuncs_transformIdsToArray({ cell, getlist, fields, myprops: this.props, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
                                                    } else {
                                                        const cellvalue = Object.values(cell)[0]
                                                        return cellvalue.fillfields.value.toconfig.resetvalue

                                                    }
                                                },
                                            },
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
                                                    return await actionFuncs_baseFindMany({ cell, getlist, model: 'taxonomy', fields, myprops: this.props, mystate: this.state, inQuery: { typetagmain: { "$in": { name: 'product.variant.1' } } }, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
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
                            name: 'type_autocomplete',
                            type: 'text',
                            id: 'variant_one',
                            autoComplete: true,
                            getOptionSelected: (option, value) => {

                                if (option._id === value._id) {
                                    return true
                                }
                            }
                        },
                        config: {
                            label: 'Variant One',
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
                    variant_two_toggle: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: true,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'variant_one_switch',
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
                            label: 'Visible Variant Two',
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
                    variant_two_name: {
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
                            name: 'variant_two_name_input',
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
                            label: 'Variant Two Name',
                            helpertext: 'Enter text for Variant Two Name',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
 
                    variant_two_taxo: {
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
                                                        return await actionFuncs_transformIdsToArray({ cell, getlist, fields, myprops: this.props, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
                                                    } else {
                                                        const cellvalue = Object.values(cell)[0]
                                                        return cellvalue.fillfields.value.toconfig.resetvalue

                                                    }
                                                },
                                            },
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
                                                    return await actionFuncs_baseFindMany({ cell, getlist, model: 'taxonomy', fields, myprops: this.props, mystate: this.state, inQuery: { typetagmain: { "$in": { name: 'product.variant.2' } } }, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
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
                            name: 'type_autocomplete',
                            type: 'text',
                            id: 'variant_two',
                            autoComplete: true,
                            getOptionSelected: (option, value) => {

                                if (option._id === value._id) {
                                    return true
                                }
                            }
                        },
                        config: {
                            label: 'Variant Two',
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
                    shipping: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: true,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'shipping_switch',
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
                            label: 'Shipping',
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
                    available: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: true,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'available_switch',
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
                            label: 'Available',
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
                    sold: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: 0,
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
                            name: 'sold_input',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Sold',

                            helpertext: '',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
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
                    publish: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: true,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'publish_switch',
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
                            label: 'Publish',
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
                }
            }

        }

    }

    async componentDidUpdate(prevProps, prevState) {
        if ('localeUser' in this.props.user) {
            let newLocalStorage

            if (
                prevProps.user.localeUser !== this.props.user.localeUser
            ) {
                let didmount_result = await compoFuncs_DidUpdate_Edit({
                    model: this.state.localStorage.model,
                    myprops: this.props,
                    prevmyprops: prevProps,
                    mystate: this.state,
                    poliglot: this.state.localStorage.poliglot,
                    type: 'edit'
                })

                if (didmount_result) {
                    newLocalStorage = { ...didmount_result.newLocalStorage }
                    let found = { ...didmount_result.found.payload }

                    newLocalStorage = await attachtoFuncs_populateEdit({
                        model: 'brick',
                        myprops: this.props,
                        newLocalStorage,
                        found
                    })

                } else {
                    newLocalStorage = { ...this.state.localStorage }
                }

                if (newLocalStorage) {

                    newLocalStorage.form.formdata.price.inputprops.startAdornment =
                        <InputAdornment position="start">
                            {Object.keys(this.props.user.currencyUser.rates)}
                        </InputAdornment>

                    await this.updateLocalStorage(newLocalStorage)
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
                rootid: this.props.match.params.id,
                poliglot: this.state.localStorage.poliglot,
                type: 'edit'
            })
            let newLocalStorage = { ...didmount_result.newLocalStorage }
            let found = { ...didmount_result.found.payload }

            newLocalStorage = await attachtoFuncs_populateEdit({
                model: 'brick',
                myprops: this.props,
                newLocalStorage,
                found
            })

            if (newLocalStorage) {
                await this.updateLocalStorage(newLocalStorage)
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
    getOverModel = async ({ cell }) => {
        let newLocalStorage = { ...this.state.localStorage }
        // const cellkey = Object.keys(cell)[0]
        const cellvalue = Object.values(cell)[0]
        newLocalStorage['attachto']['brick'] = cellvalue.value

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
                model: 'brick',
                submodel: this.state.localStorage.model,
                myprops: this.props,
                mystate: this.state,
                newLocalStorage,
                updated,
                current,
                attacher_updated_arr: newLocalStorage.attachto.brick
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
                {this.props ? <AutocompleteMenu
                    change={({ cell }) => this.getOverModel({ cell })}
                    onclick={({ event, cell, index }) => {
                        const cellvalue = Object.values(cell)[0]
 
                        this.props.history.push('/admin/edit_brick/' + cellvalue.value[0]._id)
                    }}
                    state={{
                        localStorage: {
                            model: 'brick',
                            poliglot: true,
                            resetok: true,
                            qhelpers: {
                                populate: null,
                                inQuery: null,
                            },
                            form :{
                                formdata:{
                                    ticked:{
                                        config:{
                                            label: 'Add to Brick'
                                        }
                                    }
                                }
                            }
                        }
                    }}
                    inject_value={
                        this.state.localStorage.attachto.brick
                    }

                /> : null}
                {this.props ? <FormElement
                    formdata={this.state.localStorage.form.formdata}
                    model={this.state.localStorage.model}
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
                    save={({ event, translate }) => this.saveForm({
                        event,
                        translate,
                    })}
                /> : null}
            </div>
        );
    }
}
const mapStateToProps = (state) => {

    return {
        product: state.product,
        mysite: state.mysite,
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(EditProduct);