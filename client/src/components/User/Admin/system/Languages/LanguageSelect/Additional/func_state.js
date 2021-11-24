import { actionFuncs_baseFindMany_vh2 } from '../../../../ActionFunctions/baseFindMany_vh'

export async function rawStateFunction({ redux_localeuser, dispatch }) {
    const state = {
        localStorage: {
            model: 'language',
            poliglot: false,
            resetok: false,
            qhelpers: {
                populate: [{ path: 'referenceID' }]
            },
            linguistic: {
                translate: ['name', 'description']
            },
            form: {
                formError: false,
                formSuccess: false,
                formdata: {
                    ticked: {
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
                                                    return await actionFuncs_baseFindMany_vh2({
                                                        cell, getlist, model: 'language', fields,
                                                        poliglot: state.localStorage.poliglot,
                                                        isLocalStorage: state.localStorage,
                                                        redux_localeuser,
                                                        dispatch,
                                                        inQuery: { _id: { "$eq": redux_localeuser._id } }, populate: [{ path: 'referenceID' }]
                                                    })
                                                },
                                            },
                                        }
                                    },
                                },
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'array',
                                    resetvalue: '',
                                },
                            },
                            options: {
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    return await actionFuncs_baseFindMany_vh2({
                                                        cell, getlist, model: 'language', fields,
                                                        poliglot: state.localStorage.poliglot,
                                                        isLocalStorage: state.localStorage,
                                                        redux_localeuser,
                                                        dispatch,
                                                        inQuery: { visible: { "$eq": true } }, populate: [{ path: 'referenceID' }]
                                                    })
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
                                xs: 12,
                                xm: 12,
                                md: 12,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        buttonprops: {
                            round: false,
                            fullWidth: true,
                            style: {
                                marginBottom: "0",
                                // simple: true,

                            },
                            color: "transparent"
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'language_autocomplete',
                            type: 'text',
                            autoComplete: 'On',

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
                            // these configs need to be remove from sublists
                            tableparams: {
                                columns: [
                                    // {
                                    //     keyname: 'flag',
                                    //     columntype: 'image',
                                    //     configparams: {
                                    //     },
                                    //     config: {
                                    //         parentindex: 0,
                                    //         label: 'Image',
                                    //         leftpath: 'referenceID',
                                    //         indicator: 'flag',
                                    //     },
                                    // },
                                    {
                                        keyname: 'languages',
                                        columntype: 'text',
                                        config: {
                                            parentindex: 0,
                                            leftpath: 'referenceID.languages.0',
                                            indicator: 'iso639_1',
                                            label: 'Language',
                                        }
                                    },
                                ]
                            }
                        },
                    },
                }
            },
            viewparams: {
                limit: 5,
                skip: 0,
                size: 0,
                sortBy: 'position',
                sortOrder: 1,

            },
        }
    }
    return state
}


