import React, { Component } from 'react';
import { connect } from 'react-redux';

// Generic Functions
import { compoFuncs_Refresh_v2, compoFuncs_DidUpdate_Edit } from '../../GenericFuncs/compo_funcs'
import { imageFuncs_removeImagesHandler_v2 } from '../../GenericFuncs/image_funcs'
import { partsFuncs_saveForm_v1 } from '../../GenericFuncs/parts_funcs'
import { user_roles } from '../../../../utils/Form/Fixed_categories/user_roles'
import { messageCompleted, errorClosure, messageLoading } from '../../GenericFuncs/errormsg_funcs'

import { ShowMessages } from '../../GenericFuncs/errormsg_funcs'
import FormElement from '../../../../utils/Form/Funcs/formContainer'

// import { ob_keyfilter } from '../../../../utils/Funcs/basefuncs'
import {
    plg_clearProps,
} from '../../../../utils/Plugs/cms_plugs';

class EditUser extends Component {

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
                        value: 'password123',
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
                                    resetvalue: 'password123',
                                },
                            },

                        },
                        config: {
                            label: 'Password',
                            helpertext: 'Generic Password: password123',
                        },
                        validation: {
                            parse: true,
                            type: ['required']
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
            } else {
                newLocalStorage = { ...this.state.localStorage }
            }

            if (newLocalStorage) {

                await this.updateLocalStorage(newLocalStorage)
            }
        }
        }
    }
    async componentDidMount() {
        console.log(this.props);

        if ('localeUser' in this.props.user) {

            let didmount_result =  await compoFuncs_Refresh_v2({
                model: this.state.localStorage.model,
                myprops: this.props,
                mystate: this.state,
                rootid: this.props.match.params.id,
                poliglot: this.state.localStorage.poliglot,
                type: 'edit'
            })
            let newLocalStorage = { ...didmount_result.newLocalStorage }

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
        slide: state.slide,
        mysite: state.mysite,
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(EditUser);