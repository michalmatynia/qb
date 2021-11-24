
export default async function rawStateFunction({ redux_current_mysite, dispatch, model }) {
    
   const state = {
        localStorage: {
            model: 'theme',
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
                            folder: redux_current_mysite._id + '/' + model + '/File',

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
                    primary_color_one: {
                        element: 'colorpicker',
                        category: '',
                        value: '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 0 }
                                },
                            },
                        },
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
                            name: "primary_color_one",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Primary Color One',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    primary_color_two: {
                        element: 'colorpicker',
                        category: '',
                        value: '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 0 }
                                },
                            },
                        },
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
                            name: "primary_color_two",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Primary Color Two',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    primary_color_three: {
                        element: 'colorpicker',
                        category: '',
                        value: '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 0 }
                                },
                            },
                        },
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
                            name: "primary_color_three",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Primary Color Three',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    primary_color_four: {
                        element: 'colorpicker',
                        category: '',
                        value: '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 0 }
                                },
                            },
                        },
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
                            name: "primary_color_four",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Primary Color Four',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    primary_color_five: {
                        element: 'colorpicker',
                        category: '',
                        value: '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 0 }
                                },
                            },
                        },
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
                            name: "primary_color_five",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Primary Color Five',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    primary_color_six: {
                        element: 'colorpicker',
                        category: '',
                        value: '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 0 }
                                },
                            },
                        },
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
                            name: "primary_color_six",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Primary Color Six',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    secondary_color_one: {
                        element: 'colorpicker',
                        category: '',
                        value: '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 0 }
                                },
                            },
                        },
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
                            name: "secondary_color_one",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Secondary Color One',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    HeaderBackgroundColor: {
                        element: 'colorpicker',
                        category: '',
                        value: '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 1 }
                                },
                            },
                        },
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
                            name: "header_backgroundcolor",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Header Background Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    HeaderFontColor: {
                        element: 'colorpicker',
                        category: '',
                        value:  '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 1 }
                                },
                            },
                        },
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
                            name: "header_fontcolor",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Header Font Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    BodyBackgroundColor: {
                        element: 'colorpicker',
                        category: '',
                        value:  '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 1 }
                                },
                            },
                        },
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
                            name: "body_backgroundcolor",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Body Background Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    BodyFontColor: {
                        element: 'colorpicker',
                        category: '',
                        value:  '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 1 }
                                },
                            },
                        },
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
                            name: "body_fontcolor",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Body Font Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    FooterBackgroundColor: {
                        element: 'colorpicker',
                        category: '',
                        value:  '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 1 }
                                },
                            },
                        },
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
                            name: "footer_backgroundcolor",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Footer Background Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    FooterFontColor: {
                        element: 'colorpicker',
                        category: '',
                        value:  '',
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    resetvalue: { r: 255, g: 255, b: 255, a: 1 }
                                },
                            },
                        },
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
                            name: "footer_fontcolor",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Footer Font Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    }
                }
            }

        }

    }

    return state
}


