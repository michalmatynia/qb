import { actionFuncs_baseFindMany_vh2 } from '../../../ActionFunctions/baseFindMany_vh'
import { actionFuncs_handleArrayOfIds_vh1, actionFuncs_transformIdsToArray_vh1 } from '../../../ActionFunctions/handleArrayOfIds_vh'



export default async function rawStateFunction({ redux_current_mysite, dispatch, redux_localeuser, model }) {
    
    const state = {
        
    }
    // const ccc = {
    //     localStorage: {
    //         model: 'slide',
    //         resetok: true,
    //         poliglot: true,
    //         qhelpers: {
    //             populate: [{ path: 'category' }]
    //         },
    //         linguistic: {
    //             translate: ['name', 'description', 'btn_execute', 'title']
    //         },
    //         attachto: {
    //             brick: [],
    //             // page:[]
    //         },
    //         attachtobinder: 'checked',
    //         form: {
    //             formError: false,
    //             formSuccess: false,
    //             formdata: {
    //                 images: {
    //                     element: 'multiupload',
    //                     category: 'ct_regularmultiupload',
    //                     value: [],
    //                     configparams: {
    //                         showlabel: true,
    //                         showhelpertext: false,
    //                         showfield: true,
    //                     },
    //                     fillfields: {
    //                         value: {
    //                             // fromconfig: {
    //                             // },
    //                             toconfig: {
    //                                 setpath: 'value',
    //                                 valuetype: 'array',
    //                                 resetvalue: [],
    //                             },
    //                         },

    //                     },
    //                     config: {
    //                         label: 'Video',
    //                         uploadparams: {
    //                             public_id: `${Date.now()}`,
    //                             resource_type: 'auto',
    //                             folder: redux_current_mysite._id  + '/' + model + '/File',
    //                             width: 1500,
    //                             height: 1000,
    //                             crop: "fill"
    //                         }

    //                     },
    //                     inputprops: {
    //                         type: 'file',
    //                         name: 'images_upload',
    //                     },
    //                     validation: {
    //                         parse: false
    //                     },
    //                     valid: true,
    //                     touched: false,
    //                 },
    //                 name: {
    //                     element: 'input',
    //                     category: 'ct_custominput',
    //                     value: '',
    //                     wrapcompos: {
    //                         griditem: {
    //                             xs: 12,
    //                             xm: 12,
    //                             md: 12,
    //                         },
    //                     },
    //                     formcontrolprops: {
    //                         fullWidth: true,
    //                     },
    //                     inputprops: {
    //                         type: 'text',
    //                         name: 'name_input',
    //                         autoComplete: 'On'
    //                     },
    //                     configparams: {
    //                         showlabel: true,
    //                         showhelpertext: false,
    //                         showfield: true,

    //                     },
    //                     fillfields: {
    //                         value: {
    //                             toconfig: {
    //                                 setpath: 'value',
    //                                 valuetype: 'string',
    //                                 resetvalue: '',
    //                             },
    //                         },

    //                     },
    //                     config: {
    //                         label: 'Name',
    //                         helpertext: 'Enter text for Name',
    //                     },
    //                     validation: {
    //                         parse: true,
    //                         type: ['required']
    //                     },
    //                     valid: false,
    //                     touched: false,
    //                 },
    //                 title: {
    //                     element: 'input',
    //                     category: 'ct_custominput',
    //                     value: '',
    //                     wrapcompos: {
    //                         griditem: {
    //                             xs: 12,
    //                             xm: 12,
    //                             md: 12,
    //                         },
    //                     },
    //                     formcontrolprops: {
    //                         fullWidth: true,
    //                     },
    //                     inputprops: {
    //                         type: 'text',
    //                         name: 'title_input',
    //                         autoComplete: 'On'
    //                     },
    //                     configparams: {
    //                         showlabel: true,
    //                         showhelpertext: false,
    //                         showfield: true,

    //                     },
    //                     fillfields: {
    //                         value: {
    //                             toconfig: {
    //                                 setpath: 'value',
    //                                 valuetype: 'string',
    //                                 resetvalue: '',
    //                             },
    //                         },

    //                     },
    //                     config: {
    //                         label: 'Title',
    //                         helpertext: 'Enter text for Title',
    //                     },
    //                     validation: {
    //                         parse: false,
    //                     },
    //                     valid: false,
    //                     touched: false,
    //                 },
    //                 description: {
    //                     element: 'input',
    //                     category: 'ct_custominput',
    //                     value: '',
    //                     wrapcompos: {
    //                         griditem: {
    //                             xs: 12,
    //                             xm: 12,
    //                             md: 12,
    //                         },
    //                     },
    //                     formcontrolprops: {
    //                         fullWidth: true,
    //                     },
    //                     inputprops: {
    //                         type: 'text',
    //                         name: 'description_input',
    //                         autoComplete: 'On',
    //                         multiline: true,
    //                         rows: 5,
    //                     },
    //                     configparams: {
    //                         showlabel: true,
    //                         showhelpertext: false,
    //                         showfield: true,

    //                     },
    //                     fillfields: {
    //                         value: {
    //                             toconfig: {
    //                                 setpath: 'value',
    //                                 valuetype: 'string',
    //                                 resetvalue: '',
    //                             },
    //                         },
    //                     },
    //                     config: {
    //                         label: 'Description',
    //                         helpertext: 'Enter text for Description',
    //                     },
    //                     validation: {
    //                         parse: false
    //                     },
    //                     valid: true,
    //                     touched: false,
    //                 },
    //                 btn_execute: {
    //                     element: 'input',
    //                     category: 'ct_custominput',
    //                     value: '',
    //                     wrapcompos: {
    //                         griditem: {
    //                             xs: 12,
    //                             xm: 12,
    //                             md: 12,
    //                         },
    //                     },
    //                     formcontrolprops: {
    //                         fullWidth: true,
    //                     },
    //                     inputprops: {
    //                         type: 'text',
    //                         name: 'btn_execute_input',
    //                         autoComplete: 'On'
    //                     },
    //                     configparams: {
    //                         showlabel: true,
    //                         showhelpertext: false,
    //                         showfield: true,

    //                     },
    //                     fillfields: {
    //                         value: {
    //                             toconfig: {
    //                                 setpath: 'value',
    //                                 valuetype: 'string',
    //                                 resetvalue: '',
    //                             },
    //                         },

    //                     },
    //                     config: {
    //                         label: 'Button Execute',
    //                         helpertext: 'Enter text for Button Execute',
    //                     },
    //                     validation: {
    //                         parse: false,
    //                     },
    //                     valid: true,
    //                     touched: false,
    //                 },
    //                 category: {
    //                     element: 'autocomplete',
    //                     category: 'uim_autocompletetaxo',
    //                     value: [],
    //                     fillfields: {
    //                         value: {
    //                             fromconfig: {
    //                                 model: 'taxonomy',
    //                                 onPopulateAction: {
    //                                     preFind: {
    //                                         affectValue: {
    //                                             actionA: async ({ cell, getlist, fields }) => {
    //                                                 if (fields) {
    //                                                     return await actionFuncs_transformIdsToArray_vh1({ cell, getlist, fields, dispatch, populate: [{ path: 'tagparent' }, { path: 'tagchild' }]  })
    //                                                 } else {

    //                                                     // const cellkey = Object.keys(cell)[0]
    //                                                     const cellvalue = Object.values(cell)[0]

    //                                                     return cellvalue.fillfields.value.toconfig.resetvalue

    //                                                 }
    //                                             },
    //                                         },
    //                                         // justRun :{ }
    //                                     }
    //                                 }
    //                             },
    //                             toconfig: {
    //                                 setpath: 'value',
    //                                 valuetype: 'array',
    //                                 resetvalue: [],
    //                             },
    //                             submitconfig: {
    //                                 // model: 'language',
    //                                 onSubmitAction: {
    //                                     // preCreate: {

    //                                     // },
    //                                     preCreate: {
    //                                         affectValue: {
    //                                             actionA: async ({ cell, fields }) => {
    //                                                 return await actionFuncs_handleArrayOfIds_vh1({ cell, fields })
    //                                             },
    //                                         }

    //                                     }
    //                                 }
    //                             }
    //                         },
    //                         options: {
    //                             fromconfig: {
    //                                 onPopulateAction: {
    //                                     preFind: {
    //                                         affectValue: {
    //                                             actionA: async ({ cell, getlist, fields }) => {
    //                                                 return await actionFuncs_baseFindMany_vh2({
    //                                                     cell, 
    //                                                     getlist, 
    //                                                     model: 'taxonomy', 
    //                                                     fields,
    //                                                     poliglot: state.localStorage.poliglot,
    //                                                     isLocalStorage: state.localStorage,
    //                                                     redux_localeuser,
    //                                                     dispatch,
    //                                                     inQuery: { typetagmain: { "$in": { name: 'slide.tag.1' } } }, populate: [{ path: 'tagparent' }, { path: 'tagchild' }]
    //                                                 })
    //                                             },

                              
    //                                         },
    //                                     }
    //                                 },
    //                             },
    //                             toconfig: {
    //                                 setpath: 'config.options',
    //                                 valuetype: 'array',
    //                                 resetvalue: [],
    //                             },
    //                         }
    //                     },
    //                     wrapcompos: {
    //                         griditem: {},
    //                     },
    //                     formcontrolprops: {
    //                     },
    //                     configparams: {
    //                         showlabel: true,
    //                         showhelpertext: false,
    //                         showfield: true,
    //                     },
    //                     inputprops: {
    //                         name: 'category_autocomplete',
    //                         type: 'text',
    //                         id: 'category',
    //                         autoComplete: true,
    //                         getOptionSelected: (option, value) => {

    //                             if (option._id === value._id) {
    //                                 return true
    //                             }
    //                         }
    //                     },

    //                     config: {
    //                         label: 'Category',
    //                         options: [],
    //                         resetvalue: [],
    //                         valuetype: 'array',
    //                         autoComplete: true,
    //                     },
    //                     validation: {
    //                         required: false
    //                     },
    //                     valid: true,
    //                     touched: false,
    //                 },
    //                 position: {
    //                     element: 'select',
    //                     category: 'ct_customselect',
    //                     value: '',
    //                     wrapcompos: {
    //                         griditem: {
    //                             xs: 4,
    //                             xm: 4,
    //                             md: 2,
    //                         },
    //                     },
    //                     formcontrolprops: {
    //                         fullWidth: true,

    //                     },
    //                     inputprops: {
    //                         type: 'number',
    //                         name: "position_input",
    //                     },
    //                     configparams: {
    //                         showlabel: true,
    //                         showhelpertext: false,
    //                         showfield: true,
    //                     },
    //                     fillfields: {
    //                         value: {
    //                             toconfig: {
    //                                 setpath: 'value',
    //                                 valuetype: 'integer',
    //                             },
    //                         },
    //                     },
    //                     config: {
    //                         label: 'Position',
    //                         options: [],
    //                     },
    //                     validation: {
    //                         parse: false,
    //                     },
    //                     valid: true,
    //                     touched: false,
    //                 },
    //                 language: {
    //                     element: 'input',
    //                     category: 'ct_custominput',
    //                     value: '',
    //                     wrapcompos: {
    //                         griditem: {
    //                             xs: 12,
    //                             xm: 12,
    //                             md: 12,
    //                         },
    //                     },
    //                     formcontrolprops: {
    //                         fullWidth: true,
    //                     },
    //                     inputprops: {
    //                         type: 'hidden',
    //                         name: 'language_input',
    //                     },
    //                     configparams: {
    //                         showlabel: false,
    //                         showhelpertext: false,
    //                         showfield: false,

    //                     },
    //                     fillfields: {
    //                         value: {
    //                             toconfig: {
    //                                 setpath: 'value',
    //                                 valuetype: 'string',
    //                                 resetvalue: '',
    //                             },
    //                         },

    //                     },
    //                     config: {
    //                         label: 'Description',
    //                         helpertext: 'Enter text for Description',
    //                     },
    //                     validation: {
    //                         parse: true,
    //                         type: ['required']
    //                     },
    //                     valid: false,
    //                     touched: false,
    //                 },
    //                 country: {
    //                     element: 'input',
    //                     category: 'ct_custominput',
    //                     value: '',
    //                     wrapcompos: {
    //                         griditem: {
    //                             xs: 12,
    //                             xm: 12,
    //                             md: 12,
    //                         },
    //                     },
    //                     formcontrolprops: {
    //                         fullWidth: true,
    //                     },
    //                     inputprops: {
    //                         type: 'hidden',
    //                         name: 'name_input',
    //                     },
    //                     configparams: {
    //                         showlabel: false,
    //                         showhelpertext: false,
    //                         showfield: false,

    //                     },
    //                     fillfields: {
    //                         value: {
    //                             toconfig: {
    //                                 setpath: 'value',
    //                                 valuetype: 'string',
    //                                 resetvalue: '',
    //                             },
    //                         },

    //                     },
    //                     config: {
    //                         label: 'Country',
    //                         helpertext: 'Enter text for Country',
    //                     },
    //                     validation: {
    //                         parse: true,
    //                         type: ['required']
    //                     },
    //                     valid: false,
    //                     touched: false,
    //                 },
    //                 lgbinder: {
    //                     element: 'input',
    //                     category: 'ct_custominput',
    //                     value: '',
    //                     wrapcompos: {
    //                         griditem: {
    //                             xs: 12,
    //                             xm: 12,
    //                             md: 12,
    //                         },
    //                     },
    //                     formcontrolprops: {
    //                         fullWidth: true,
    //                     },
    //                     inputprops: {
    //                         type: 'hidden',
    //                         name: 'name_input',
    //                     },
    //                     configparams: {
    //                         showlabel: false,
    //                         showhelpertext: false,
    //                         showfield: false,
    //                     },
    //                     fillfields: {
    //                         value: {
    //                             toconfig: {
    //                                 setpath: 'value',
    //                                 valuetype: 'string',
    //                                 resetvalue: '',
    //                             },
    //                         },

    //                     },
    //                     config: {
    //                         label: 'Lgbinder',
    //                         helpertext: 'Enter text for Lgbinder',
    //                     },
    //                     validation: {
    //                         parse: true,
    //                         type: ['required']
    //                     },
    //                     valid: false,
    //                     touched: false,
    //                 },
    //                 visible: {
    //                     element: 'switch',
    //                     category: 'ct_customswitch',
    //                     value: true,
    //                     wrapcompos: {
    //                         griditem: {},
    //                     },
    //                     formcontrolprops: {},
    //                     inputprops: {
    //                         name: 'visible_switch',
    //                     },
    //                     fillfields: {
    //                         value: {
    //                             toconfig: {
    //                                 setpath: 'value',
    //                                 valuetype: 'boolean',
    //                                 resetvalue: true,
    //                             },
    //                         },

    //                     },
    //                     configparams: {
    //                         showlabel: true,
    //                         showhelpertext: false,
    //                         showfield: true,
    //                     },
    //                     config: {
    //                         label: 'Visible',
    //                         options: [
    //                             { key: true, value: 'yes' },
    //                             { key: false, value: 'no' },
    //                         ]
    //                     },
    //                     validation: {
    //                         parse: false,
    //                     },
    //                     valid: true,
    //                     touched: false,
    //                 }
    //             }
    //         }
    //     }
    // }
 
     return state
 }
 
 
 