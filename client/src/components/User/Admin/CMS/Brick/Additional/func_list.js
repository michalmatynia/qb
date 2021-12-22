import {
    Edit,
    Search,
    Close,
    Remove
} from '@material-ui/icons';

export default async function rawStateFunction_Brick_List({
    onRemoveItem,
    onGotoLink,

}) {
    const state = {
        localStorage: {
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
                            onClick: ({ event, value, cell, sublistkey, reactrouter_history, redux_userdata, model }) => onGotoLink({
                                event,
                                value,
                                cell,
                                sublistkey,
                                reactrouter_history,
                                redux_userdata,
                                model
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
                            onClick: ({ event, value, viewparams, redux_localeuser, model }) => onRemoveItem({
                                event,
                                value,
                                viewparams,
                                redux_localeuser,
                                model,
                                removeall: false,
                                state,
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
                            onClick: ({ event, value, viewparams, redux_localeuser, model }) => onRemoveItem({
                                event,
                                value,
                                viewparams,
                                redux_localeuser,
                                model,
                                removeall: true,
                                state,

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
            qhelpers: {
            },
            linguistic: {
                translate: ['name', 'description']
            },
        }
    }
    // const ccc = {
    //     localStorage: {
    //         // model: 'product',
    //         poliglot: true,
    //         attachtobinder: 'checked',
    //         tableparams: {
    //             renderHeader: true,
    //             columns: [
    //                 {
    //                     keyname: 'images',
    //                     columntype: 'image',
    //                     configparams: {
    //                     },
    //                     config: {
    //                         label: 'Image',
    //                         leftpath: 'images',
    //                         indicator: '0',
    //                         rightpath: 'url',
    //                         valuetype: 'string',
    //                     },
    //                 },
    //                 {
    //                     keyname: 'position',
    //                     columntype: 'text',
    //                     config: {
    //                         valuetype: 'string',
    //                         indicator: 'position',
    //                         label: 'Position'
    //                     }
    //                 },
    //                 {
    //                     keyname: 'name',
    //                     columntype: 'text',
    //                     config: {
    //                         valuetype: 'string',
    //                         indicator: 'name',
    //                         label: 'Name',
    //                     }
    //                 },
    //                 {
    //                     keyname: 'price',
    //                     columntype: 'text',
    //                     config: {
    //                         label: 'Price ' + Object.keys(redux_currencyuser.rates),
    //                         valuetype: 'string',
    //                         indicator: 'price',
    //                     }
    //                 },
    //                 {
    //                     keyname: 'visible',
    //                     columntype: 'switch',
    //                     configparams: {},
    //                     inputprops: {
    //                         id: 'visible'
    //                     },
    //                     config: {
    //                         label: 'Visible',
    //                         indicator: 'visible',
    //                         valuetype: 'boolean',
    //                     },
    //                 },
    //                 {
    //                     keyname: '',
    //                     columntype: 'adjust',
    //                     inputprops: {
    //                     },
    //                     config: {
    //                         label: 'Up/Down',
    //                     },
    //                 },
    //                 {
    //                     keyname: '',
    //                     columntype: 'iconbutton',
    //                     configparams: {
    //                     },
    //                     icon: Edit,
    //                     actions: {
    //                         onClick: ({ event, value, cell, sublistkey, reactrouter_history, redux_userdata, model }) => onGotoLink({
    //                             event,
    //                             value,
    //                             cell,
    //                             sublistkey,
    //                             reactrouter_history,
    //                             redux_userdata, 
    //                             model
    //                         }),
    //                     },
    //                     inputprops: {
    //                         id: 'generic',
    //                         type: 'text',
    //                         name: 'generic_button',
    //                         color: 'primary'
    //                     },
    //                     config: {
    //                         label: 'Edit',
    //                     },
    //                 },
    //                 {
    //                     keyname: '',
    //                     columntype: 'iconbutton',
    //                     configparams: {
    //                     },
    //                     icon: Close,
    //                     actions: {
    //                         onClick: ({ event, value, viewparams, redux_localeuser, model }) => onRemoveItem({
    //                             event,
    //                             value,
    //                             viewparams,
    //                             redux_localeuser,
    //                             model,
    //                             removeall: false,
    //                             state,
    //                         }),
    //                     },
    //                     inputprops: {
    //                         id: 'generic',
    //                         type: 'text',
    //                         name: 'generic_button',
    //                         color: 'inherit'
    //                     },
    //                     config: {
    //                         label: 'Remove',
    //                     },
    //                 },
    //                 {
    //                     keyname: '',
    //                     columntype: 'iconbutton',
    //                     configparams: {
    //                     },
    //                     icon: Remove,
    //                     actions: {
    //                         onClick: ({ event, value, viewparams, redux_localeuser, model }) => onRemoveItem({
    //                             event,
    //                             value,
    //                             viewparams,
    //                             redux_localeuser,
    //                             model,
    //                             removeall: true,
    //                             state,

    //                         }),
    //                     },
    //                     inputprops: {
    //                         id: 'generic',
    //                         type: 'text',
    //                         name: 'generic_button',
    //                         color: 'secondary'
    //                     },
    //                     config: {
    //                         label: 'Remove All',
    //                     },
    //                 },
    //             ]
    //         },
    //         qhelpers: {
    //         },
    //         linguistic: {
    //             translate: ['name', 'description']
    //         },
    //     }
    // }

    return state
}