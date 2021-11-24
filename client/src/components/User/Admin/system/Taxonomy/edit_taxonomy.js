import React, { Component } from 'react';
import { connect } from 'react-redux';

// Generic Functions
import { compoFuncs_Refresh_v2, compoFuncs_DidUpdate_Edit } from '../../../../User/Admin/GenericFuncs/compo_funcs'
import { imageFuncs_removeImagesHandler_v2 } from '../../../../User/Admin/GenericFuncs/image_funcs'
import { partsFuncs_saveForm_v1 } from '../../../../User/Admin/GenericFuncs/parts_funcs'
import { taxoFuncs_onChangeTaxoSync, taxoFuncs_onRemoveTaxoSync_v2 } from '../../../../User/Admin/GenericFuncs/taxo_funcs'
import { taxonomy_type } from '../../../../utils/Form/Fixed_categories/taxonomy_type'

import { actionFuncs_handleArrayOfIds } from '../../ActionFunctions/handleArrayOfIds'
import { actionFuncs_composeFilterfield, actionFuncs_composeFilterfieldOptions } from '../../ActionFunctions/filterfieldHandle'
import { actionFuncs_mirrorAdded } from '../../ActionFunctions/handleTaxonomy'
import { messageCompleted, errorClosure, messageLoading, ShowMessages } from '../../GenericFuncs/errormsg_funcs'

import FormElement from '../../../../utils/Form/Funcs/formContainer'

// import { ob_keyfilter } from '../../../../utils/Funcs/basefuncs'
import {
    plg_clearProps,
} from '../../../../utils/Plugs/cms_plugs';

class EditTaxonomy extends Component {

    state = {
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
                                                    return await actionFuncs_composeFilterfieldOptions({ cell, getlist, fields, myprops: this.props, mystate: this.state, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
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
                                                    return await actionFuncs_handleArrayOfIds({ cell, fields })
                                                },
                                            }
                                        },
                                        postCreate: {
                                            justRun: {
                                                actionA: async ({ cell, added, fields }) => {
                                                    await actionFuncs_mirrorAdded({ cell, added, fields, myprops: this.props, mystate: this.state, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
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
                                                    return await actionFuncs_composeFilterfield({ cell, getlist, fields, myprops: this.props, mystate: this.state, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
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
                                                    return await actionFuncs_composeFilterfieldOptions({ cell, getlist, fields, myprops: this.props, mystate: this.state, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
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
                                                    return await actionFuncs_handleArrayOfIds({ cell, fields })
                                                },
                                            }
                                        },
                                        postCreate: {
                                            justRun: {
                                                actionA: async ({ cell, added, fields }) => {
                                                    await actionFuncs_mirrorAdded({ cell, added, fields, myprops: this.props, mystate: this.state, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
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
                                                    return await actionFuncs_composeFilterfield({ cell, getlist, fields, myprops: this.props, mystate: this.state, populate: [{ path: 'tagparent' }, { path: 'tagchild' }] })
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

                if (didmount_result) { newLocalStorage = { ...didmount_result.newLocalStorage } } 
                else {  newLocalStorage = { ...this.state.localStorage } }

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
                rootid: this.props.match.params.id,
                poliglot: this.state.localStorage.poliglot,
                type: 'edit'

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

    onChange = async ({ event, cell }) => {

        if (event) {

            if (event.target.id !== undefined && (
                event.target.id.includes('tagparent')
                || event.target.id.includes('tagchild')
                || event.target.id.includes('filterparent')
                || event.target.id.includes('filterchild')
            )) {
                let newLocalStorage = await taxoFuncs_onChangeTaxoSync({ cell, model: this.state.localStorage.model, myprops: this.props, mystate: this.state })

                this.updateLocalStorage(newLocalStorage)
            } else {
                this.updateFormValues({ cell })
            }
        }
    }
    onRemove = async ({ event, cell, removed = null }) => {

        // Czy 'removed' jest potrzebny?

        if (event) {
            let newLocalStorage = await taxoFuncs_onRemoveTaxoSync_v2({
                cell,
                model: this.state.localStorage.model,
                mystate: this.state,
                myprops: this.props
            })

            this.updateLocalStorage(newLocalStorage)
        }
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
                    change={({ cell, event }) => this.onChange({ cell, event })}
                    remove={({ cell, event }) => this.onRemove({ cell, event })}
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
        taxonomy: state.taxonomy,
        mysite: state.mysite,
        user: state.user,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(EditTaxonomy);