import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormCustomSelect from '../../../../../utils/Form/Funcs/FormCustomSelect';
import { actionFuncs_baseFindMany } from '../../../ActionFunctions/baseFindMany'

import {
    plg_findOne_QueMod,
    plg_clearProps,
} from '../../../../../utils/Plugs/cms_plugs';

import {
    act_injectProp,
  } from '../../../../../../redux/actions/generic/generic_actions';

// === Component Functions === 
import { compoFuncs_Refresh_v2,
    // compoFuncs_DidUpdate_List_v2 
} from '../../../GenericFuncs/compo_funcs'

class List_Language_Menu extends Component {

    state = {
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
                                                    return await actionFuncs_baseFindMany({ cell, getlist, model: 'language', fields, myprops: this.props, mystate: this.state, inQuery: { _id: { "$eq": this.props.user.localeUser._id } }, populate: [{ path: 'referenceID' }] })
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
                                                    return await actionFuncs_baseFindMany({ cell, getlist, model: 'language', fields, myprops: this.props, mystate: this.state, inQuery: { visible: { "$eq": true } }, populate: [{ path: 'referenceID' }] })
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
                                            indicator: 'name',
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

    async componentDidUpdate(prevProps, prevState) {
        if ('localeUser' in this.props.user && 'currencyUser' in this.props.user) {
            if (
                prevProps.user.localeUser !== this.props.user.localeUser
            ) {
                // let newLocalStorage = await compoFuncs_DidUpdate_List_v2({
                //     model: this.state.localStorage.model,
                //     myprops: this.props,
                //     mystate: this.state,
                //     poliglot: this.state.localStorage.poliglot,
                //     type: 'add'
                // })

                // // newLocalStorage['form']['formdata']['ticked'].value = [this.props.user.localeUser]


                // if (newLocalStorage) {
                //     await this.updateLocalStorage(newLocalStorage)
                // }
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

            if (newLocalStorage) {
                await this.updateLocalStorage(newLocalStorage)
            }

        }

    }

    async componentWillUnmount() { }
    updateLocalStorage = (localStorage) => {
        this.setState({
            localStorage
        })
    }

    // ============= FORM FUNCTIONS

    onChange = async ({ event, value = null, cell = null }) => {

        if (value._id !== this.props.user.localeUser._id) {
            await plg_clearProps({ myprops: this.props, model:'page', actionType: 'current_list' })
            // await plg_clearProps({ myprops: this.props, model:'page', actionType: 'current_detail' })

            let inQuery = { _id: { "$eq": value._id } }
            await plg_findOne_QueMod({ model: this.state.localStorage.model, myprops: this.props, actionType: 'locale', inQuery, populate: this.state.localStorage.qhelpers.populate })
            
            // ==================

            if (document.location.pathname === '/') {

                inQuery = {
                    country: { "$eq": this.props.user.localeUser.referenceID.alpha2Code },
                    language: { "$eq": this.props.user.localeUser.referenceID.languages[0].iso639_1 }
                }
                if (this.props.page.current_detail_page !== '' && this.props.page.current_detail_page.lgbinder !== '') {
                    Object.assign(inQuery, { lgbinder: { "$eq": this.props.page.current_detail_page.lgbinder } })
                } else {
                    Object.assign(inQuery, { isdefault: { "$eq": true } })

                }
                await plg_findOne_QueMod({ model: 'page', myprops:this.props, actionType: 'current_detail', inQuery })

            }

            // Clears the Cart on Language Change
            await this.props.dispatch(act_injectProp({ dataToSubmit: [], model: 'user', actionType: 'cart' }))

            // ==============
        }
    }

    render() {
        return (
             <div
            // style={{
            //     position: 'fixed',
            //     // left: '0px',
            //     // top: '0px',
            //     width: '10px',
            //     height: '10px',
            //     // zIndex: '9999',
            //     textAlign: 'center',
            // }}
            >
                {
                    <FormCustomSelect
                        formcell={this.state.localStorage.form.formdata.ticked}
                        formcellkey='ticked'
                        myprops={this.props}
                        mystate={this.state}
                        change={({ event, cell, value }) => this.onChange({
                            event,
                            cell,
                            value
                        })}
                    />
                }
            </div> 

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

export default connect(mapStateToProps)(List_Language_Menu);