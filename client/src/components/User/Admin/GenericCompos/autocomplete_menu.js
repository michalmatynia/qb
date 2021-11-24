import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormUIAutocomplete from '../../../utils/Form/Funcs/FormUIAutocomplete';
import { actionFuncs_baseFindMany } from '../../../User/Admin/ActionFunctions/baseFindMany'


// === Component Functions === 
import { compoFuncs_Refresh_v2 } from '../../../User/Admin/GenericFuncs/compo_funcs'

class AutocompleteMenu extends Component {

    state = {
        localStorage: {
            // model: 'language',
            // poliglot: true,
            resetok: true, // Defines if a value is changed after re-render
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
                                fromconfig: {
                                    onPopulateAction: {
                                        preFind: {
                                            affectValue: {
                                                actionA: async ({ cell, getlist, fields }) => {
                                                    return await actionFuncs_baseFindMany({ cell, getlist, model: this.props.state.localStorage.model, poliglot: this.props.state.localStorage.poliglot, fields, myprops: this.props, mystate: this.state, inQuery: this.props.state.localStorage.qhelpers.inQuery, populate: this.props.state.localStorage.qhelpers.populate })

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
                            name: 'custom_autocomplete',
                            type: 'text',
                            id: 'custom_autocomplete',
                            autoComplete: true,
                            getOptionSelected: (option, value) => {
                                if (option._id === value._id) {
                                    return true
                                }
                            }
                        },

                        config: {
                            label: this.props.state.localStorage.form.formdata.ticked.config.label,
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                }
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {

        /* Resetting Function */
        if (this.props.inject_value !== prevProps.inject_value) {

            let newLocalStorage = { ...this.state.localStorage }

            newLocalStorage.form.formdata.ticked.value = this.props.inject_value
            await this.updateLocalStorage(newLocalStorage)
        }

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

                if(didmount_result) {
                    newLocalStorage = {...didmount_result.newLocalStorage}
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

        if ('localeUser' in this.props.user) {

            let didmount_result = await compoFuncs_Refresh_v2({
                model: this.state.localStorage.model,
                myprops: this.props,
                mystate: this.state,
                poliglot: this.state.localStorage.poliglot,
                type: 'add'
            })

            let newLocalStorage = {...didmount_result.newLocalStorage}
            newLocalStorage.form.formdata.ticked.value = this.props.inject_value

            if (newLocalStorage) {
                await this.updateLocalStorage(newLocalStorage)
            }

        }

    }

    async componentWillUnmount() {
        // nie jestem pewien, jak cos usunac to ponizej
        // await plg_clearProps({ myprops: this.props, model: this.state.localStorage.model, actionType: 'locale' })

    }
    updateLocalStorage = (localStorage) => {
        this.setState({
            localStorage
        })
    }

    // ============= FORM FUNCTIONS
    onChange = async ({ event, value = null, cell = null }) => {
        await this.props.change({ cell })

        this.updateFormValues({ cell })

    }
    onClick = async ({ event, cell = null, index }) => {

        this.props.onclick({ event, cell, index })

        this.updateFormValues({ cell })

    }
    updateFormValues = async ({ cell }) => {

        let newLocalStorage = { ...this.state.localStorage }

        const cellkey = Object.keys(cell)[0]
        const cellvalue = Object.values(cell)[0]

        newLocalStorage['form']['formdata'][cellkey] = cellvalue
        this.updateLocalStorage(newLocalStorage)
    }
   

    render() {
        return (
            this.props.user.localeUser ? <div>
                {
                    <FormUIAutocomplete
                        formcell={this.state.localStorage.form.formdata.ticked}
                        formcellkey='ticked'
                        myprops={this.props}
                        mystate={this.state}
                        change={({ event, cell, value }) => this.onChange({
                            event,
                            cell,
                            value
                        })}
                        onclick={({ event, cell, value, index }) => this.onClick({
                            event,
                            cell,
                            index
                        })}
                    />
                }
            </div> : null

        )
    }
}

const mapStateToProps = (state) => {

    return {
        user: state.user,
        mysite: state.mysite,
        page: state.page,
        language: state.language,
        nation: state.nation,
        messages: state.messages
    }
}

export default connect(mapStateToProps)(AutocompleteMenu);