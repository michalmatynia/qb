import { actionFuncs_isDefaultHandle_vh1 } from '../../../ActionFunctions/isdefaultHandle_vh'
import { tim_colors } from '../../../../../utils/Form/Fixed_categories/tim_colors'
import { actionFuncs_populateArrayOfRefsForDb_vh2, actionFuncs_convertArrayOfRefs_vh1 } from '../../../ActionFunctions/handleArrayOfRefs_vh'
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import Edit from '@material-ui/icons/Edit';
import InputAdornment from "@material-ui/core/InputAdornment";

export default async function rawStateFunction({ redux_current_mysite, dispatch, redux_localeuser, model }) {
    
    const state = {
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
                            uploadparams: {
                                public_id: `${Date.now()}`,
                                resource_type: 'auto',
                                folder: redux_current_mysite._id  + '/' + model + '/File',
                                width: 1500,
                                height: 1000,
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
                                                    await actionFuncs_isDefaultHandle_vh1({ cell, myprops: this.props, mystate: this.state, model: this.state.localStorage.model, added, current })
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
                                                        return await actionFuncs_populateArrayOfRefsForDb_vh2({ cell, getlist, fields, dispatch, populate: [{ path: 'referenceID' }] })

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
                                                    return await actionFuncs_convertArrayOfRefs_vh1({ cell })
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
                        sublist: {

                            // Don't change the name of this sublist
                            header: 'Add Components',
                            tiedtoelementkey: 'sublist',
                            tableparams: {
                                // renderHeader: true,
                                columns: [
                                    {
                                        keyname: '',
                                        columntype: 'iconbutton',
                                        configparams: {
                                        },
                                        icon: DeleteIcon,
                                        // actions: {
                                        //     onClick: ({ event, value, cell }) => this.onRemoveItemInForm({
                                        //         event,
                                        //         value,
                                        //         cell
                                        //     })
                                        // },
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
                                        // actions: {
                                        //     onClick: ({ event, value, cell }) => this.onGotoLink({
                                        //         event,
                                        //         value,
                                        //         cell
                                        //     }),
                                        // },
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
                                        // onBlur: (event) => this.onSearch({
                                        //     event,
                                        //     cell: { search: this.state.localStorage.form.formdata.checked.sublist.viewparams.search },
                                        //     blur: true
                                        // })
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
                    },
                    // checked: {
                    //     element: 'table',
                    //     category: 'uim_table',
                    //     value: [],
                    //     fillfields: {
                    //         value: {
                    //             fromconfig: {
                    //                 onPopulateAction: {
                    //                     preFind: {
                    //                         affectValue: {
                    //                             actionA: async ({ cell, getlist, fields }) => {

                    //                                 if (!fields && !getlist) {
                    //                                     return []
                    //                                 } else {
                    //                                     return await actionFuncs_populateArrayOfRefsForDb_vh2({ cell, getlist, fields, dispatch, populate: [{ path: 'referenceID' }] })

                    //                                 }

                    //                             },
                    //                         },
                    //                         // justRun :{ }
                    //                     }
                    //                 }
                    //             },
                    //             toconfig: {
                    //                 setpath: 'value',
                    //                 valuetype: 'arrayofrefs',
                    //                 leftpath: 'referenceID',
                    //                 resetvalue: [],

                    //             },
                    //             submitconfig: {
                    //                 onSubmitAction: {
                    //                     preCreate: {
                    //                         affectValue: {
                    //                             actionA: async ({ cell }) => {
                    //                                 return await actionFuncs_convertArrayOfRefs_vh1({ cell })
                    //                             },
                    //                         },
                    //                         // justRun :{ }
                    //                     },
                    //                     // postCreate: { }
                    //                 }
                    //             }
                    //         },
                    //     },
                    //     config: {
                    //         label: 'Checked',
                    //         options: [],
                    //     },
                    //     validation: {
                    //         parse: false,
                    //     },
                    //     wrapcompos: {
                    //         griditem: {
                    //             xs: 12,
                    //             xm: 12,
                    //             md: 12,
                    //         },
                    //     },
                    //     formcontrolprops: {},
                    //     inputprops: {
                    //         name: 'checked_list',
                    //         type: 'text',
                    //     },
                    //     configparams: {
                    //         showlabel: false,
                    //         showhelpertext: false,
                    //         showfield: true,
                    //     },
                    //     valid: true,
                    //     touched: false,
                    // },
                },
            },
        }
    }
 
     return state
 }
 
 
 