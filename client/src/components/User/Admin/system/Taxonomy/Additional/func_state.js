import { actionFuncs_isDefaultHandle_vh1 } from '../../../ActionFunctions/isdefaultHandle_vh'
import { contact_html_type } from '../../../../../utils/Form/Fixed_categories/contact_html_template'
import { taxonomy_type } from '../../../../../utils/Form/Fixed_categories/taxonomy_type'
import { actionFuncs_composeFilterfield_vh1, actionFuncs_composeFilterfieldOptions_vh1 } from '../../../ActionFunctions/filterfieldHandle_vh'
import { actionFuncs_handleArrayOfIds_vh1} from '../../../ActionFunctions/handleArrayOfIds_vh'
import { actionFuncs_mirrorAdded_vh1 } from '../../../ActionFunctions/handleTaxonomy_vh'

export default async function rawStateFunction({ redux_current_mysite, reactrouter_match, dispatch, redux_localeuser, model }) {
    const state = {
        localStorage: {
            model: 'taxonomy',
            resetok: true,
            poliglot: true,
            qhelpers: {
                populate: [{ path: 'tagparent' }, { path: 'tagchild' }]
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
                            folder: this.props.mysite.CurrentMysite._id + '/Taxonomy/File',
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
                    typetagmain: {
                        element: 'autocomplete',
                        category: 'uim_autocompletetaxo',
                        value: [],
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'array',
                                    resetvalue: [],
                                },
                            },
                            options: {
                                toconfig: {
                                    setpath: 'config.options',
                                    valuetype: 'array',
                                    resetvalue: taxonomy_type,
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
                            name: 'typetagmain_autocomplete',
                            type: 'text',
                            id: 'typetagmain',
                            autoComplete: true,
                            getOptionSelected: (option, value) => {
                                if (option.name === value.name) {
                                    return true
                                }
                            }
                        },

                        config: {
                            label: 'Main Tag',
                            options: taxonomy_type,
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    tagparent: {
                        element: 'autocomplete',
                        category: 'uim_autocompleteandfilter',
                        value: [],
                        fillfields: {
                            options: {
                                fromconfig: {
                                    model: 'taxonomy',
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    return await actionFuncs_composeFilterfieldOptions_vh1({ cell, getlist, fields, dispatch, redux_localeuser, reactrouter_match, model, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
                                                },
                                            },
                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'config.options',
                                    valuetype: 'array',
                                    resetvalue: [],
                                },
                            },
                            filterfield_options: {
                                toconfig: {
                                    setpath: 'filterfield.config.options',
                                    valuetype: 'array',
                                    resetvalue: taxonomy_type,
                                },
                            },
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'array',
                                    resetvalue: [],
                                },
                                submitconfig: {
                                    // model: 'language',
                                    onSubmitAction: {
                                        preCreate: {
                                            affectValue: {
                                                actionA: async ({ cell, fields }) => {
                                                    return await actionFuncs_handleArrayOfIds_vh1({ cell, fields })
                                                },
                                            }
                                        },
                                        postCreate: {
                                            justRun: {
                                                actionA: async ({ cell, added, fields }) => {
                                                    await actionFuncs_mirrorAdded_vh1({ cell, added, fields, redux_current_mysite, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
                                                },
                                            }
                                        }
                                    }
                                }
                            },
                            filterfield_value: {
                                toconfig: {
                                    setpath: 'filterfield.value',
                                    valuetype: 'array',
                                    resetvalue: [],
                                },
                                fromconfig: {
                                    // model: 'taxonomy',
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    return await actionFuncs_composeFilterfield_vh1({ cell })
                                                },
                                            },
                                        }
                                    }
                                },
                            },
                        },
                        config: {
                            label: 'Tag Parent',
                            options: [],
                            autoComplete: true,
                        },
                        filterfield: {
                            value: [],
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
                                name: 'filterparent_input',
                                id: 'filterparent',
                                type: 'text',
                                autoComplete: true,
                                getOptionSelected: (option, value) => {
                                    if (option.name === value.name) {
                                        return true
                                    }
                                }
                            },
                            config: {
                                label: 'Filter Parent',
                                options: taxonomy_type,
                                indicator: 'typetagmain'
                            },
                            validation: {
                                required: false
                            },
                            valid: true,
                            touched: false,
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
                            name: 'tagparent_input',
                            type: 'text',
                            id: 'tagparent',
                            autoComplete: true,
                            getOptionSelected: (option, value) => {
                                if (option._id === value._id) {
                                    return true
                                }
                            }
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    tagchild: {
                        element: 'autocomplete',
                        category: 'uim_autocompleteandfilter',
                        value: [],
                        fillfields: {
                            options: {
                                fromconfig: {
                                    model: 'taxonomy',
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    return await actionFuncs_composeFilterfieldOptions_vh1({ cell, getlist, fields, dispatch, redux_localeuser, reactrouter_match, model, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
                                                },
                                            },
                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'config.options',
                                    valuetype: 'array',
                                    resetvalue: [],
                                },
                            },
                            filterfield_options: {
                                toconfig: {
                                    setpath: 'filterfield.config.options',
                                    valuetype: 'array',
                                    resetvalue: taxonomy_type,
                                },
                            },
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'array',
                                    resetvalue: [],
                                },
                                submitconfig: {
                                    // model: 'language',
                                    onSubmitAction: {
                                        preCreate: {
                                            affectValue: {
                                                actionA: async ({ cell, fields }) => {
                                                    return await actionFuncs_handleArrayOfIds_vh1({ cell, fields })
                                                },
                                            }
                                        },
                                        postCreate: {
                                            justRun: {
                                                actionA: async ({ cell, added, fields }) => {
                                                    await actionFuncs_mirrorAdded_vh1({ cell, added, fields, redux_current_mysite, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
                                                },
                                            }
                                        }
                                    }
                                }
                            },
                            filterfield_value: {
                                toconfig: {
                                    setpath: 'filterfield.value',
                                    valuetype: 'array',
                                    resetvalue: [],
                                },
                                fromconfig: {
                                    // model: 'taxonomy',
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    return await actionFuncs_composeFilterfield_vh1({ cell })
                                                },
                                            },
                                        }
                                    }
                                },
                            },
                        },
                        config: {
                            label: 'Tag Child',
                            options: [],
                            autoComplete: true,
                        },
                        filterfield: {
                            value: [],
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
                                name: 'filterchild_input',
                                id: 'filterchild',
                                type: 'text',
                                autoComplete: true,
                                getOptionSelected: (option, value) => {
                                    if (option.name === value.name) {
                                        return true
                                    }
                                }
                            },
                            config: {
                                label: 'Filter Child',
                                options: taxonomy_type,
                                indicator: 'typetagmain'
                            },
                            validation: {
                                required: false
                            },
                            valid: true,
                            touched: false,
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
                            name: 'tagchild_input',
                            type: 'text',
                            id: 'tagchild',
                            autoComplete: true,
                            getOptionSelected: (option, value) => {
                                if (option._id === value._id) {
                                    return true
                                }
                            }
                        },
                        validation: {
                            required: false
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


     return state
 }
 
 
 