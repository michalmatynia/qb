import React, { Component } from 'react';
import { connect } from 'react-redux';

// Generic Functions 
import { partsFuncs_submitForm_Add_v2 } from '../../GenericFuncs/parts_funcs'
import { compoFuncs_Refresh_v2 } from '../../GenericFuncs/compo_funcs'
import { ShowMessages } from '../../GenericFuncs/errormsg_funcs'

import FormElement from '../../../../utils/Form/Funcs/formContainer'
import { user_roles } from '../../../../utils/Form/Fixed_categories/user_roles'
import { messageCompleted, errorClosure, messageLoading } from '../../../../User/Admin/GenericFuncs/errormsg_funcs'

import {
    plg_clearProps
} from '../../../../utils/Plugs/cms_plugs';

class AddUser extends Component {
    state = {
        localStorage: {
            model: 'user',
            resetok: true,
            poliglot: false,
            qhelpers: {
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
                            folder: this.props.mysite.CurrentMysite._id + '/User/File',

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
                    lastname: {
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
                            name: 'lastname_input',
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
                            label: 'Lastname',
                            helpertext: 'Enter text for Lastname',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    email: {
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
                            name: 'email_input',
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
                            label: 'Email',
                            helpertext: 'Enter text for Email',
                        },
                        validation: {
                            parse: true,
                            type: ['verifyemail']
                        },
                        valid: false,
                        touched: false,
                    },
                    password: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '123',
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
                            name: 'password_input',
                            disabled: true
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,

                        },
                        fillfields: {
                            value: {
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    // const cellkey = Object.keys(cell)[0]
                                                    const cellvalue = Object.values(cell)[0]

                                                    if (fields) {
                                                        
                                                        return '***'

                                                    } else {

                                                        return cellvalue.fillfields.value.toconfig.resetvalue

                                                    }
                                                },
                                            },
                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'string',
                                    resetvalue: '123',
                                },
                            },

                        },
                        config: {
                            label: 'Password',
                            // helpertext: 'Generic Password: password123',
                        },
                        validation: {
                            parse: false,
                            // type: ['required']
                        },
                        valid: false,
                        touched: false,
                    },
                    role: {
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
                                                    return user_roles
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
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {

                                                actionA: async ({ cell, getlist, fields }) => {
                                                    const cellkey = Object.keys(cell)[0]
                                                    const cellvalue = Object.values(cell)[0]
                                                    if (fields) {
                                                        
                                                        let foundIndex = user_roles.findIndex((item, index) => {
                                                            return index === fields[cellkey]
                                                        })

                                                        return user_roles[foundIndex]

                                                    } else {

                                                        return cellvalue.fillfields.value.toconfig.resetvalue

                                                    }
                                                },
                                            },
                                        }
                                    }
                                },
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'integer',
                                    resetvalue: user_roles[0],

                                },
                                submitconfig: {
                                    // model: 'language',
                                    onSubmitAction: {
                                        preCreate: {
                                            affectValue: {
                                                actionA: async ({ cell, fields }) => {
                                                    // const cellkey = Object.keys(cell)[0]
                                                    const cellvalue = Object.values(cell)[0]

                                                    return user_roles.findIndex((item) => {
                                                        return item === cellvalue.value
                                                    })
                                                },
                                            }

                                        }
                                    }
                                }
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
                            name: 'role_select',
                            type: 'text',
                            id: 'role',
                        },

                        config: {
                            label: 'Role',
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
                let didmount_result = await compoFuncs_Refresh_v2({
                model: this.state.localStorage.model,
                myprops: this.props,
                mystate: this.state,
                prevmyprops: prevProps,
                prevmystate: prevState,
                poliglot: this.state.localStorage.poliglot,
                type: 'add'
            })

            
            if (didmount_result) {
                newLocalStorage = { ...didmount_result.newLocalStorage }
            } else {
                newLocalStorage = { ...this.state.localStorage }
            }

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
            mystate: this.state ,
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
        slide: state.slide,
        mysite: state.mysite,
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(AddUser);