import { css_display } from '../../../../../utils/Form/Fixed_categories/css_display'
import { css_textalign } from '../../../../../utils/Form/Fixed_categories/css_textalign'
import { css_fontfamily } from '../../../../../utils/Form/Fixed_categories/css_fontfamily'
import { animatecss_types } from '../../../../../utils/Form/Fixed_categories/animatecss_types'
/* import { reveal_types } from '../../../../../utils/Form/Fixed_categories/reveal_types' */
import { reveal_types_scrollanim } from '../../../../../utils/Form/Fixed_categories/reveal_types_scrollanim'
import { reveal_direction } from '../../../../../utils/Form/Fixed_categories/reveal_direction'

import { tim_colors } from '../../../../../utils/Form/Fixed_categories/tim_colors'

export default async function rawStateFunction({ redux_current_mysite, dispatch, model }) {

    const state = {
        localStorage: {
            resetok: true,
            poliglot: false,
            qhelpers: {
            },
            linguistic: {},
            attachto: {
                brick: [],
                // page:[]
            },
            attachtobinder: 'blockstyle',
            form: {
                formError: false,
                formSuccess: false,
                formdata: {
                    images: {
                        element: 'multiupload',
                        category: 'ct_regularmultiupload',
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
                    // Reveal Exo
                    reveal_exo: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_exo_select',
                            type: 'text',
                            id: 'reveal_exo',
                        },

                        config: {
                            label: 'Reveal Exo',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_exo: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_exo',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Exo - ( 1000 ) OR ScrollAnim is 2',
                            helpertext: 'Enter text for Reveal Duration Exo',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_exo: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_exo',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Exo - ( 0 ) - Fade ( 1000 ) OR ScrollAnim is 2',
                            helpertext: 'Enter text for Reveal Delay Exo',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_exo: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_exo_select',
                            type: 'text',
                            id: 'reveal_direction_one_exo',
                        },
                        config: {
                            label: 'Reveal Direction One Exo',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_exo: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_exo',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Exo',
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
                    reveal_cascade_exo: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_exo',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Exo',
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
                    reveal_animatecss_effect_exo: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_exo_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_exo',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Exo',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_exo: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_exo_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_exo',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Exo',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    // Margin Exo
                    margin_exo: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'margin_exo_input',
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
                            label: 'Margin Exo - top right bottom left / 0 0 0 0 / topbottom leftright',
                            helpertext: 'Enter text for Margin Exo',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    borderradius_exo: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'borderradius_exo',
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
                            label: 'Border Radius Exo ( 0px )',
                            helpertext: 'Enter numbers for Border Radius Exo',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    boxshadow_exo: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'files_upload_default_size',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Box Shadow Exo',
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
                    margin_outer: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'margin_outer_input',
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
                            label: 'Margin Outer - top right bottom left',
                            helpertext: 'Enter text for Margin Outer',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    padding_outer: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'padding_outer_input',
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
                            label: 'Padding Outer - top right bottom left',
                            helpertext: 'Enter text for Padding Outer',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    margin_inner: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'margin_inner_input',
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
                            label: 'Margin Inner - top right bottom left',
                            helpertext: 'Enter text for Margin Inner',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    padding_inner: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'padding_inner_input',
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
                            label: 'Padding Inner - top right bottom left',
                            helpertext: 'Enter text for Padding Inner',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    BackgroundOpacity: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: 1,
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
                            name: 'name_input',
                            autoComplete: 'On',
                            min: 0,
                            max: 1,
                            step: 0.1
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
                                    resetvalue: 1,
                                },
                            },
                        },
                        config: {
                            label: 'Opacity (0-1)',
                            helpertext: 'Enter text for Opacity',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    BackgroundColor_One: {
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
                            name: "backgroundcolor_one",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Background Color One',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    BackgroundColor_Two: {
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
                            name: "backgroundcolor_two",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Background Color Two',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    // Reveal Name
                    reveal_name: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_name_select',
                            type: 'text',
                            id: 'reveal_name',
                        },

                        config: {
                            label: 'Reveal Name',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_name: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_name',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Name - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Name',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_name: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_name',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Name - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Name',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_name: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_name_select',
                            type: 'text',
                            id: 'reveal_direction_one_name',
                        },
                        config: {
                            label: 'Reveal Direction One Name',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_name: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_name',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Name',
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
                    reveal_cascade_name: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_name',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Name',
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
                    reveal_animatecss_effect_name: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_name_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_name',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Name',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_name: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_name_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_name',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Name',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    // ========== Name Outerdiv
                    name_outerdiv_display: {
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
                                                    return css_display
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
                                    resetvalue: css_display[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'name_outerdiv_display_select',
                            type: 'text',
                            id: 'name_outerdiv_display',
                        },

                        config: {
                            label: 'CSS Display Name Outerdiv',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },

                    name_outerdiv_margin: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'name_outerdiv_margin',
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
                            label: 'Name Outerdiv Margin - top right bottom left',
                            helpertext: 'Enter numbers for Name Outerdiv Margin',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    name_outerdiv_padding: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'name_outerdiv_padding',
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
                            label: 'Name Outerdiv Padding - top right bottom left',
                            helpertext: 'Enter numbers for Name Outerdiv Padding',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    name_outerdiv_backgroundColor: {
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
                            name: "name_outerdiv_backgroundColor",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Name Outerdiv Background Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    // ========== Name H
                    name_h_fontfamily: {
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
                                                    return css_fontfamily
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
                                    resetvalue: css_fontfamily[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'name_h_fontfamily_select',
                            type: 'text',
                            id: 'name_h_fontfamily',
                        },

                        config: {
                            label: 'CSS FontFamily Name H',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    name_h_fontsize: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'name_h_fontsize',
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
                            label: 'Name H Fontsize ( 0px )',
                            helpertext: 'Enter numbers for Name H Fontsize',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    name_h_color: {
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
                            name: "name_font_color",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Name Font Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    name_h_display: {
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
                                                    return css_display
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
                                    resetvalue: css_display[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'name_h_display_select',
                            type: 'text',
                            id: 'name_h_display',
                        },

                        config: {
                            label: 'CSS Display Name H',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    name_h_margin: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'name_h_margin',
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
                            label: 'Name H Margin - top right bottom left',
                            helpertext: 'Enter numbers for Name H Margin',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    name_h_padding: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'name_h_padding',
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
                            label: 'Name H Padding - top right bottom left',
                            helpertext: 'Enter numbers for Name H Padding',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    name_h_textalign: {
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
                                                    return css_textalign
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
                                    resetvalue: css_textalign[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'name_h_textalign_select',
                            type: 'text',
                            id: 'name_h_textalign',
                        },

                        config: {
                            label: 'CSS TextAlign Name H',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    // Reveal Description
                    reveal_description: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_description_select',
                            type: 'text',
                            id: 'reveal_description',
                        },

                        config: {
                            label: 'Reveal Description',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_description: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_description',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Description - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Description',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_description: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_description',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Description - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Description',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_description: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_description_select',
                            type: 'text',
                            id: 'reveal_direction_one_description',
                        },
                        config: {
                            label: 'Reveal Direction One Description',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_description: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_description',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Description',
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
                    reveal_cascade_description: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_description',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Description',
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
                    reveal_animatecss_effect_description: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_description_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_description',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Description',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_description: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_description_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_description',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Description',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    // ============ Description Outerdiv
                    description_outerdiv_display: {
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
                                                    return css_display
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
                                    resetvalue: css_display[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'description_outerdiv_display_select',
                            type: 'text',
                            id: 'description_outerdiv_display',
                        },

                        config: {
                            label: 'CSS Display Description Outerdiv',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    description_outerdiv_margin: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'description_outerdiv_margin',
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
                            label: 'Description Outerdiv Margin - top right bottom left',
                            helpertext: 'Enter numbers for Description Outerdiv Margin',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    description_outerdiv_padding: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'description_outerdiv_padding',
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
                            label: 'Description Outerdiv Padding - top right bottom left',
                            helpertext: 'Enter numbers for Description Outerdiv Padding',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },

                    description_outerdiv_backgroundColor: {
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
                            name: "description_outerdiv_backgroundColor",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Description Outerdiv Background Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },

                    // =============== Description H
                    description_h_fontfamily: {
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
                                                    return css_fontfamily
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
                                    resetvalue: css_fontfamily[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'description_h_fontfamily_select',
                            type: 'text',
                            id: 'description_h_fontfamily',
                        },

                        config: {
                            label: 'CSS FontFamily Description Outerdiv',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    description_h_fontsize: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'description_h_fontsize',
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
                            label: 'Description H Fontsize ( 0px )',
                            helpertext: 'Enter numbers for Description H Fontsize',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    description_h_color: {
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
                            name: "description_font_color",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Description Font Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    description_h_textalign: {
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
                                                    return css_textalign
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
                                    resetvalue: css_textalign[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'description_h_textalign_select',
                            type: 'text',
                            id: 'description_h_textalign',
                        },

                        config: {
                            label: 'CSS TextAlign Description H',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    description_h_display: {
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
                                                    return css_display
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
                                    resetvalue: css_display[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'description_h_display_select',
                            type: 'text',
                            id: 'description_h_display',
                        },

                        config: {
                            label: 'CSS Display Description H',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },

                    description_h_margin: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'description_h_margin',
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
                            label: 'Description H Margin',
                            helpertext: 'Enter numbers for Description H Margin',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    description_h_padding: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'description_h_padding',
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
                            label: 'Description H Padding',
                            helpertext: 'Enter numbers for Description H Padding',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    // Reveal Title
                    reveal_title: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_title_select',
                            type: 'text',
                            id: 'reveal_title',
                        },

                        config: {
                            label: 'Reveal Title',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_title: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_title',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Title - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Title',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_title: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_title',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Title - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Title',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_title: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_title_select',
                            type: 'text',
                            id: 'reveal_direction_one_title',
                        },
                        config: {
                            label: 'Reveal Direction One Title',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_title: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_title',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Title',
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
                    reveal_cascade_title: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_title',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Title',
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
                    reveal_animatecss_effect_title: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_title_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_title',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Title',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_title: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_title_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_title',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Title',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                     // ========== Title Outerdiv
                     title_outerdiv_display: {
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
                                                    return css_display
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
                                    resetvalue: css_display[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'title_outerdiv_display_select',
                            type: 'text',
                            id: 'title_outerdiv_display',
                        },

                        config: {
                            label: 'CSS Display Title Outerdiv',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },

                    title_outerdiv_margin: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'title_outerdiv_margin',
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
                            label: 'Title Outerdiv Margin - top right bottom left',
                            helpertext: 'Enter numbers for Title Outerdiv Margin',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    title_outerdiv_padding: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'title_outerdiv_padding',
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
                            label: 'Title Outerdiv Padding - top right bottom left',
                            helpertext: 'Enter numbers for Title Outerdiv Padding',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    title_outerdiv_backgroundColor: {
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
                            name: "title_outerdiv_backgroundColor",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Title Outerdiv Background Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    // ============== TITLE H
                    title_h_fontfamily: {
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
                                                    return css_fontfamily
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
                                    resetvalue: css_fontfamily[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'title_h_fontfamily_select',
                            type: 'text',
                            id: 'title_h_fontfamily',
                        },

                        config: {
                            label: 'CSS FontFamily Title H',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    title_h_fontsize: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'title_h_fontsize',
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
                            label: 'Title H Fontsize ( 0px )',
                            helpertext: 'Enter numbers for Title H Fontsize',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    title_h_color: {
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
                            name: "title_font_color",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Title Font Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    title_h_textalign: {
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
                                                    return css_textalign
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
                                    resetvalue: css_textalign[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'title_h_textalign_select',
                            type: 'text',
                            id: 'title_h_textalign',
                        },

                        config: {
                            label: 'CSS TextAlign Title H',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    title_h_display: {
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
                                                    return css_display
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
                                    resetvalue: css_display[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'title_h_display_select',
                            type: 'text',
                            id: 'title_h_display',
                        },

                        config: {
                            label: 'CSS Display Title H',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },

                    title_h_margin: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'title_h_margin',
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
                            label: 'Title H Margin',
                            helpertext: 'Enter numbers for Title H Margin',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    title_h_padding: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'title_h_padding',
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
                            label: 'Title H Padding',
                            helpertext: 'Enter numbers for Title H Padding',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    // Reveal Btn Launch
                    reveal_btn_launch: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_btn_launch_select',
                            type: 'text',
                            id: 'reveal_btn_launch',
                        },

                        config: {
                            label: 'Reveal Btn Launch',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_btn_launch: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_btn_launch',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Btn Launch - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Btn Launch',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_btn_launch: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_btn_launch',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Btn Launch - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Btn Launch',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_btn_launch: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_btn_launch_select',
                            type: 'text',
                            id: 'reveal_direction_one_btn_launch',
                        },
                        config: {
                            label: 'Reveal Direction One Btn Launch',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_btn_launch: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_btn_launch',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Btn Launch',
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
                    reveal_cascade_btn_launch: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_btn_launch',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Btn Launch',
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
                    reveal_animatecss_effect_btn_launch: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_btn_launch_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_btn_launch',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Btn Launch',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_btn_launch: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_btn_launch_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_btn_launch',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Btn Launch',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    // ============ BTN Launch Outerdiv
                    btn_launch_outerdiv_display: {
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
                                                    return css_display
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
                                    resetvalue: css_display[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'btn_launch_outerdiv_display_select',
                            type: 'text',
                            id: 'btn_launch_outerdiv_display',
                        },

                        config: {
                            label: 'CSS Display Btn Launch Outerdiv',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    btn_launch_outerdiv_margin: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'btn_launch_outerdiv_margin',
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
                            label: 'Btn Launch Outerdiv Margin - top right bottom left',
                            helpertext: 'Enter numbers for Btn Launch Outerdiv Margin',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },



                    btn_launch_outerdiv_padding: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'btn_launch_outerdiv_padding',
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
                            label: 'Btn Launch Outerdiv Padding - top right bottom left',
                            helpertext: 'Enter numbers for Btn Launch Outerdiv Padding',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },

                    btn_launch_outerdiv_backgroundColor: {
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
                            name: "btn_launch_outerdiv_backgroundColor",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Btn Launch Outerdiv Background Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    // =============== BTN Launch INNER BUTTON
                    btn_launch_innerbtn_backgroundColor: {
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
                            name: "btn_launch_innerbtn_backgroundColor",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Btn Launch Inner Button Background Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    btn_launch_innerbtn_FontColor: {
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
                            name: "btn_launch_innerbtn_FontColor",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Btn Launch Inner Button Font Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    btn_launch_innerbtn_backgroundColor_hover: {
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
                            name: "btn_launch_innerbtn_backgroundColor_hover",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Btn Launch Inner Button Background Color Hover',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    btn_launch_innerbtn_FontColor_hover: {
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
                            name: "btn_launch_innerbtn_FontColor_hover",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Btn Launch Inner Button Font Color Hover',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    // =============== BTN Launch H
                    btn_launch_h_fontfamily: {
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
                                                    return css_fontfamily
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
                                    resetvalue: css_fontfamily[0],

                                },
                            },
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
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'btn_launch_h_fontfamily_select',
                            type: 'text',
                            id: 'btn_launch_h_fontfamily',
                        },

                        config: {
                            label: 'CSS FontFamily Btn Launch H',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    btn_launch_h_fontsize: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'btn_launch_h_fontsize',
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
                            label: 'Btn Launch H Fontsize',
                            helpertext: 'Enter numbers for Btn Launch H Fontsize',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    btn_launch_h_color: {
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
                            name: "btn_launch_font_color",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Btn Launch Font Color',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    btn_launch_h_textalign: {
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
                                                    return css_textalign
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
                                    resetvalue: css_textalign[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'btn_launch_h_textalign_select',
                            type: 'text',
                            id: 'btn_launch_h_textalign',
                        },

                        config: {
                            label: 'CSS TextAlign Btn Launch H',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    btn_launch_h_display: {
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
                                                    return css_display
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
                                    resetvalue: css_display[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'btn_launch_h_display_select',
                            type: 'text',
                            id: 'btn_launch_h_display',
                        },
                        config: {
                            label: 'CSS Display Btn Launch H',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },

                    btn_launch_h_margin: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'btn_launch_h_margin',
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
                            label: 'BTN Launch H Margin',
                            helpertext: 'Enter numbers for BTN Launch H Margin',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    btn_launch_h_padding: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'btn_launch_h_padding',
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
                            label: 'Btn Launch H Padding',
                            helpertext: 'Enter numbers for Btn Launch H Padding',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    // Reveal Image All
                    reveal_image_all: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_image_all_select',
                            type: 'text',
                            id: 'reveal_image_all',
                        },

                        config: {
                            label: 'Reveal Image All',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_image_all: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_image_all',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Image All - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Image All',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_image_all: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_image_all',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Image All - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Image All',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_image_all: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_image_all_select',
                            type: 'text',
                            id: 'reveal_direction_one_image_all',
                        },
                        config: {
                            label: 'Reveal Direction One Image All',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_image_all: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_image_all',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Image All',
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
                    reveal_cascade_image_all: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_image_all',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Image All',
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
                    reveal_animatecss_effect_image_all: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_image_all_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_image_all',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Image All',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_image_all: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_image_all_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_image_all',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Image All',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    image_all_webkit_animation: {
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
                            name: 'image_all_webkit_animation_input',
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
                            label: 'Image All Webkit Animation - ( Floatingy 15s ease-in-out infinite )',
                            helpertext: 'Enter CSS for Image All Webkit Animation',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    // Reveal Image One
                    reveal_image_one: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_image_one_select',
                            type: 'text',
                            id: 'reveal_exo',
                        },

                        config: {
                            label: 'Reveal Image One',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_image_one: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_image_one',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Image One -( default: 1000 ) - ScrollAnimation (default: 1)',
                            helpertext: 'Enter text for Reveal Duration Image One',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_image_one: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_image_one',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Image One - ( 0 / 1000 ms ) - ScrollAnimation (default: 1)',
                            helpertext: 'Enter text for Reveal Delay Image One',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_image_one: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_image_one_select',
                            type: 'text',
                            id: 'reveal_direction_one_image_one',
                        },
                        config: {
                            label: 'Reveal Direction One Image One',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_image_one: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_image_one',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Image One',
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
                    reveal_cascade_image_one: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_image_one',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Image One',
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
                    reveal_animatecss_effect_image_one: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_image_one_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_image_one',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Image One',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_image_one: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_image_one_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_image_one',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Image One',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    image_one_webkit_animation: {
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
                            name: 'image_one_webkit_animation_input',
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
                            label: 'Image One Webkit Animation - ( Floatingy 15s ease-in-out infinite )',
                            helpertext: 'Enter CSS for Image One Webkit Animation',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    // Reveal Image Two
                    reveal_image_two: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_image_two_select',
                            type: 'text',
                            id: 'reveal_image_two',
                        },

                        config: {
                            label: 'Reveal Image Two',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_image_two: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_image_two',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Image Two - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Image Two',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_image_two: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_image_two',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Image Two - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Image Two',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_image_two: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_image_two_select',
                            type: 'text',
                            id: 'reveal_direction_one_image_two',
                        },
                        config: {
                            label: 'Reveal Direction One Image Two',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_image_two: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_image_two',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Image Two',
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
                    reveal_cascade_image_two: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_image_two',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Image Two',
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
                    reveal_animatecss_effect_image_two: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_image_two_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_image_two',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Image Two',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_image_two: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_image_two_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_image_two',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Image Two',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    image_two_webkit_animation: {
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
                            name: 'image_two_webkit_animation_input',
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
                            label: 'Image Two Webkit Animation - ( Floatingy 15s ease-in-out infinite )',
                            helpertext: 'Enter CSS for Image Two Webkit Animation',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    // Reveal Image Three
                    reveal_image_three: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_image_three_select',
                            type: 'text',
                            id: 'reveal_image_three',
                        },

                        config: {
                            label: 'Reveal Image Three',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_image_three: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_image_three',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Image Three - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Image Three',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_image_three: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_image_three',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Image Three - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Image Three',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_image_three: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_image_three_select',
                            type: 'text',
                            id: 'reveal_direction_one_image_three',
                        },
                        config: {
                            label: 'Reveal Direction One Image Three',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_image_three: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_image_three',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Image Three',
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
                    reveal_cascade_image_three: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_image_three',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Image Three',
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
                    reveal_animatecss_effect_image_three: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_image_three_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_image_three',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Image Three',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_image_three: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_image_three_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_image_three',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Image Three',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    image_three_webkit_animation: {
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
                            name: 'image_three_webkit_animation_input',
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
                            label: 'Image Three Webkit Animation - ( Floatingy 15s ease-in-out infinite )',
                            helpertext: 'Enter CSS for Image Three Webkit Animation',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    // Reveal Image Four
                    reveal_image_four: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_image_four_select',
                            type: 'text',
                            id: 'reveal_image_four',
                        },

                        config: {
                            label: 'Reveal Image Four',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_image_four: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_image_four',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Image Four - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Image Four',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_image_four: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_image_four',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Image Four - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Image Four',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_image_four: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_image_four_select',
                            type: 'text',
                            id: 'reveal_direction_one_image_four',
                        },
                        config: {
                            label: 'Reveal Direction One Image Four',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_image_four: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_image_four',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Image Four',
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
                    reveal_cascade_image_four: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_image_four',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Image Four',
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
                    reveal_animatecss_effect_image_four: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_image_four_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_image_four',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Image Four',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_image_four: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_image_four_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_image_four',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Image Four',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    image_four_webkit_animation: {
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
                            name: 'image_four_webkit_animation_input',
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
                            label: 'Image Four Webkit Animation - ( Floatingy 15s ease-in-out infinite )',
                            helpertext: 'Enter CSS for Image Four Webkit Animation',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    // Reveal Image Five
                    reveal_image_five: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_image_five_select',
                            type: 'text',
                            id: 'reveal_exo',
                        },

                        config: {
                            label: 'Reveal Image Five',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_image_five: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_image_five',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Image Five - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Image Five',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_image_five: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_image_five',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Image Five - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Image Five',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_image_five: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_image_five_select',
                            type: 'text',
                            id: 'reveal_direction_one_image_five',
                        },
                        config: {
                            label: 'Reveal Direction One Image Five',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_image_five: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_image_five',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Image Five',
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
                    reveal_cascade_image_five: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_image_five',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Image Five',
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
                    reveal_animatecss_effect_image_five: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_image_five_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_image_five',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Image Five',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_image_five: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_image_five_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_image_five',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Image Five',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    image_five_webkit_animation: {
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
                            name: 'image_five_webkit_animation_input',
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
                            label: 'Image Five Webkit Animation - ( Floatingy 15s ease-in-out infinite )',
                            helpertext: 'Enter CSS for Image Five Webkit Animation',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    // Reveal Name Sub
                    reveal_name_sub: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_name_sub_select',
                            type: 'text',
                            id: 'reveal_name_sub',
                        },

                        config: {
                            label: 'Reveal Name Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_name_sub: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_name_sub',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Name Sub - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Name Sub',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_name_sub: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_name_sub',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Name Sub - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Name Sub',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_name_sub: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_name_sub_select',
                            type: 'text',
                            id: 'reveal_direction_one_name_sub',
                        },
                        config: {
                            label: 'Reveal Direction One Name Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_name_sub: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_name_sub',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Name Sub',
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
                    reveal_cascade_name_sub: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_name_sub',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Name Sub',
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
                    reveal_animatecss_effect_name_sub: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_name_sub_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_name_sub',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Name Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_name_sub: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_name_sub_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_name_sub',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Exo',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                     // Reveal Description Sub
                     reveal_description_sub: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_description_sub_select',
                            type: 'text',
                            id: 'reveal_description_sub',
                        },

                        config: {
                            label: 'Reveal Description Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_description_sub: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_description_sub',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Description Sub - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Description Sub',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_description_sub: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_description_sub',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Description Sub - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Description Sub',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_description_sub: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_description_sub_select',
                            type: 'text',
                            id: 'reveal_direction_one_description_sub',
                        },
                        config: {
                            label: 'Reveal Direction One Description Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_description_sub: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_exo',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Description Sub',
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
                    reveal_cascade_description_sub: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_exo',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Description Sub',
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
                    reveal_animatecss_effect_description_sub: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_description_sub_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_description_sub',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Description Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_description_sub: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_description_sub_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_description_sub',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Description Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                      // Reveal Title Sub
                      reveal_title_sub: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_title_sub_select',
                            type: 'text',
                            id: 'reveal_title_sub',
                        },

                        config: {
                            label: 'Reveal Title Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_title_sub: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_title_sub',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Title Sub - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Title Sub',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_title_sub: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_title_sub',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Title Sub - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Title Sub',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_title_sub: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_title_sub_select',
                            type: 'text',
                            id: 'reveal_direction_one_title_sub',
                        },
                        config: {
                            label: 'Reveal Direction One Title Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_title_sub: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_title_sub',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Title Sub',
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
                    reveal_cascade_title_sub: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_title_sub',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Title Sub',
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
                    reveal_animatecss_effect_title_sub: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_title_sub_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_title_sub',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Title Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_title_sub: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_title_sub_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_title_sub',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Title Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                       // Reveal Image All Sub
                       reveal_image_all_sub: {
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
                                                    return reveal_types_scrollanim
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
                                    resetvalue: reveal_types_scrollanim[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_image_all_sub_select',
                            type: 'text',
                            id: 'reveal_image_all_sub',
                        },

                        config: {
                            label: 'Reveal Image All Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_duration_image_all_sub: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_duration_image_all_sub',
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
                                    valuetype: 'integer',
                                    resetvalue: 1000,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Duration Image All Sub - ( 1000 )',
                            helpertext: 'Enter text for Reveal Duration Image All Sub',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_delay_image_all_sub: {
                        element: 'input',
                        category: 'ct_custominput',
                        value: '', // 0 0 20px 0 / top right bottom left / 0 auto
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
                            name: 'reveal_delay_image_all_sub',
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
                                    valuetype: 'integer',
                                    resetvalue: 0,
                                },
                            },

                        },
                        config: {
                            label: 'Reveal Delay Image All Sub - ( 0 )',
                            helpertext: 'Enter text for Reveal Delay Image All Sub',
                        },
                        validation: {
                            parse: true,
                            type: ['notempty']
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_direction_one_image_all_sub: {
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
                                                    return reveal_direction
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
                                    resetvalue: reveal_direction[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_direction_one_image_all_sub_select',
                            type: 'text',
                            id: 'reveal_direction_one_image_all_sub',
                        },
                        config: {
                            label: 'Reveal Direction One Image All Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_big_image_all_sub: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_big_exo',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Big Image All Sub',
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
                    reveal_cascade_image_all_sub: {
                        element: 'switch',
                        category: 'ct_customswitch',
                        value: false,
                        wrapcompos: {
                            griditem: {},
                        },
                        formcontrolprops: {},
                        inputprops: {
                            name: 'reveal_cascade_exo',
                        },
                        fillfields: {
                            value: {
                                toconfig: {
                                    setpath: 'value',
                                    valuetype: 'boolean',
                                    resetvalue: false,
                                },
                            },

                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Reveal Cascade Image All Sub',
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
                    reveal_animatecss_effect_image_all_sub: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effect_exo_select',
                            type: 'text',
                            id: 'reveal_animatecss_effect_exo',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Image All Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    reveal_animatecss_effectout_image_all_sub: {
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
                                                    return animatecss_types
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
                                    resetvalue: animatecss_types[0],

                                },
                            },
                        },
                        wrapcompos: {
                            griditem: {
                                xs: 6,
                                xm: 6,
                                md: 6,
                            },
                        },
                        formcontrolprops: {
                            fullWidth: true,
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        inputprops: {
                            name: 'reveal_animatecss_effectout_exo_select',
                            type: 'text',
                            id: 'reveal_animatecss_effectout_exo',
                        },

                        config: {
                            label: 'Reveal AnimateCSS Effect Out Image All Sub',
                            options: [],
                            autoComplete: true,
                        },
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                    },
                    image_all_sub_webkit_animation: {
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
                            name: 'image_all_sub_webkit_animation_input',
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
                            label: 'Image All Sub Webkit Animation - ( Floatingy 15s ease-in-out infinite )',
                            helpertext: 'Enter CSS for Image All Sub Webkit Animation',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: false,
                        touched: false,
                    },
                    // Name Font Color Subordinate
                    NameFontColorSubordinate: {
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
                            name: "name_font_color_subordinate",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Name Font Color Subordinate',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    TitleFontColorSubordinate: {
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
                            name: "title_font_color_subordinate",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Title Font Color Subordinate',
                        },
                        validation: {
                            parse: false,
                        },
                        valid: true,
                        touched: false,
                    },
                    DescriptionFontColorSubordinate: {
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
                            name: "description_font_color_subordinate",
                        },
                        configparams: {
                            showlabel: true,
                            showhelpertext: false,
                            showfield: true,
                        },
                        config: {
                            label: 'Description Font Color Subordinate',
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

    return state
}


