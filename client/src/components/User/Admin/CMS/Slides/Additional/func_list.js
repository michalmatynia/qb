import React, { Component } from 'react';


// Material-UI
import InputAdornment from "@material-ui/core/InputAdornment";
import {
    Edit,
    Search,
    Close,
    Remove
} from '@material-ui/icons';

export default async function rawStateFunction_Slide_List({ 
    // redux_current_mysite, 
    // dispatch, 
    // redux_localeuser, 
    // model,

    onRemoveItem
}) {


    const state = {
        localStorage: {
            // model: 'slide',
            attachto: {
                brick: [],
                // page:[]
            },
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
                            onClick: ({ event, value }) => onRemoveItem({
                                event,
                                value,
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
                            onClick: ({ event, value }) => onRemoveItem({
                                event,
                                value,
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
            // viewparams: {
            //     limit: 10,
            //     skip: 0,
            //     size: 0,
            //     sortBy: 'position',
            //     sortOrder: 1,
            //     search: {
            //         element: 'input',
            //         category: 'ct_custominput',
            //         value: '',
            //         wrapcompos: {
            //             griditem: {
            //                 xs: 12,
            //                 xm: 4,
            //                 md: 4,
            //             },
            //         },
            //         formcontrolprops: {
            //             fullWidth: true,
            //         },
            //         inputprops: {
            //             id: 'search',
            //             type: 'text',
            //             name: 'search_input',
            //             placeholder: 'Search...',
            //             startAdornment: (
            //                 <InputAdornment position="start">
            //                     <Search />
            //                 </InputAdornment>
            //             ),
            //             onBlur: (event) => this.onSearch({
            //                 event,
            //                 cell: { search: this.state.localStorage.viewparams.search },
            //                 blur: true
            //             })

            //         },
            //         configparams: {
            //             showlabel: false,
            //             showhelpertext: false

            //         },
            //         config: {
            //             label: 'Search',
            //             valuetype: 'string',
            //             helpertext: 'Enter text for Search',
            //             autocomplete: 'Off',
            //         },
            //         validation: {
            //             parse: false,
            //             // type: ['required']
            //         },
            //         range: ['name', 'description'],
            //         depth: [],
            //         valid: false,
            //         touched: false,

            //     },
            // },
            qhelpers: {
            },
            linguistic: {
                translate: ['name', 'description']
            },
        }
    }

    return state
}