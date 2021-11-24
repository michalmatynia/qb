import React, { Component } from 'react';
import { connect } from 'react-redux';

// Generic Functions 
import { partsFuncs_submitForm_Add_v2 } from '../../../../User/Admin/GenericFuncs/parts_funcs'
import { compoFuncs_Refresh_v2 } from '../../../../User/Admin/GenericFuncs/compo_funcs'
import { ShowMessages } from '../../../../User/Admin/GenericFuncs/errormsg_funcs'

import { actionFuncs_isDefaultHandle } from '../../ActionFunctions/isdefaultHandle'
import { tim_colors } from '../../../../utils/Form/Fixed_categories/tim_colors'

import FormElement from '../../../../utils/Form/Funcs/formContainer'
import { messageCompleted, errorClosure, messageLoading } from '../../GenericFuncs/errormsg_funcs'
// Material-UI Icons

import {
    plg_clearProps,
} from '../../../../utils/Plugs/cms_plugs';

class AddMystore extends Component {

    state = {
        localStorage: {
            model: 'mystore',
            resetok: true,
            poliglot: true,
            qhelpers: {
            },
            linguistic: {
                translate: [
                    'name',
                    'description',
                    'title',
                    'loadmore_btn',
                    'addedtocart_msg',
                    'pricerange_nametag',
                    'buy_btn',
                    'view_btn',
                    'column_one_nametag',
                    'column_two_nametag'
                ]
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
                            folder: this.props.mysite.CurrentMysite._id + '/Mystore/File',
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
                    title: {
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
                            label: 'Title',
                            helpertext: 'Enter text for Title',
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
                    view_btn: {
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
                            label: 'View Button',
                            helpertext: 'Enter text for View Button',
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
                            label: 'Added to Cart Message',
                            helpertext: 'Enter text for Added to Cart Message',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    pricerange_nametag: {
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
                            label: 'Price Range Name Tag',
                            helpertext: 'Enter text for Price Range Name Tag',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    loadmore_btn: {
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
                            label: 'Loadmore Button',
                            helpertext: 'Enter text for Loadmore Button',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    column_one_nametag: {
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
                            label: 'Column One Name Tag',
                            helpertext: 'Enter text for Column One Name Tag',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    column_two_nametag: {
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
                            label: 'Column Two Name Tag',
                            helpertext: 'Enter text for Column Two Name Tag',
                        },
                        validation: {
                            parse: false,
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
                                                    await actionFuncs_isDefaultHandle({ cell, myprops: this.props, mystate: this.state, model: this.state.localStorage.model, added, current })
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
                }
            },
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if ('localeUser' in this.props.user) {
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

                if (didmount_result) { newLocalStorage = { ...didmount_result.newLocalStorage } }
                else { newLocalStorage = { ...this.state.localStorage } }

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

            if (newLocalStorage) {
                this.updateLocalStorage(newLocalStorage)
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

        if (newLocalStorage) {
            this.updateLocalStorage(newLocalStorage)
            if (submit_result.formIsValid) {
                await messageCompleted({ myprops: this.props })
            } else {
                await errorClosure({ myprops: this.props })
            }
        }
    }

    render() {
        return (
            <div>
                <div>{<ShowMessages />}</div>
                {this.props ? <FormElement
                    formdata={this.state.localStorage.form.formdata}
                    model={this.state.localStorage.model}
                    mystate={this.state}
                    change={({ cell }) => this.updateFormValues({ cell })}
                    submit={({ event, translate }) => this.submitForm({ event, translate })}
                /> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        mystore: state.mystore,
        mysite: state.mysite,
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(AddMystore);