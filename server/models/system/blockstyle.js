const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
        maxlength: 100
    },
    position: {
        required: true,
        type: Number,
        maxlength: 4
    },
    reveal_exo: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_exo: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_exo: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_exo: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_exo: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_exo: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_exo: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_exo: {
        required: false,
        type: String,
        maxlength: 100
    },
    margin_exo: {
        required: false,
        type: String,
        maxlength: 100
    },
    borderradius_exo: {
        required: false,
        type: String,
        maxlength: 100
    },
    boxshadow_exo: {
        required: false,
        type: Boolean,    
    },
    margin_outer: {
        required: false,
        type: String,
        maxlength: 100
    },
    padding_outer: {
        required: false,
        type: String,
        maxlength: 100
    },
    margin_inner: {
        required: false,
        type: String,
        maxlength: 100
    },
    padding_inner: {
        required: false,
        type: String,
        maxlength: 100
    },
    images: {
        type: Array,
        default: []
    },
    image_filter: {
        required: false,
        type: String,
        maxlength: 100
    },
    BackgroundOpacity: {
        required: false,
        type: Number,
    },
    BackgroundColor_One: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    BackgroundColor_Two: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    reveal_name: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_name: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_name: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_name: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_name: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_name: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_name: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_name: {
        required: false,
        type: String,
        maxlength: 100
    },
    name_outerdiv_display: {
        required: false,
        type: String,
    },
    name_outerdiv_padding: {
        required: false,
        type: String,
    },
    name_outerdiv_margin: {
        required: false,
        type: String,
    },
    name_outerdiv_backgroundColor: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    name_h_fontfamily: {
        required: false,
        type: String,
    },
    name_h_fontsize: {
        required: false,
        type: String,
    },
    name_h_color: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    name_h_display: {
        required: false,
        type: String,
    },
    name_h_margin: {
        required: false,
        type: String,
    },
    name_h_padding: {
        required: false,
        type: String,
    },
    name_h_textalign: {
        required: false,
        type: String,
    },
    reveal_description: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_description: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_description: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_description: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_description: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_description: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_description: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_description: {
        required: false,
        type: String,
        maxlength: 100
    },
    description_outerdiv_display: {
        required: false,
        type: String,
    },
    description_outerdiv_margin: {
        required: false,
        type: String,
    },
    description_outerdiv_padding: {
        required: false,
        type: String,
    },
    description_outerdiv_backgroundColor: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    }, 
    description_h_fontsize: {
        required: false,
        type: String,
    },
    description_h_fontfamily: {
        required: false,
        type: String,
    },
    description_h_color: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    description_h_display: {
        required: false,
        type: String,
    },
    description_h_margin: {
        required: false,
        type: String,
    },
    description_h_padding: {
        required: false,
        type: String,
    },
    description_h_textalign: {
        required: false,
        type: String,
    },
    reveal_title: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_title: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_title: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_title: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_title: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_title: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_title: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_title: {
        required: false,
        type: String,
        maxlength: 100
    },
    title_outerdiv_display: {
        required: false,
        type: String,
    },
    title_outerdiv_margin: {
        required: false,
        type: String,
    },
    title_outerdiv_padding: {
        required: false,
        type: String,
    },
    title_outerdiv_backgroundColor: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    }, 
    title_h_fontsize: {
        required: false,
        type: String,
    },
    title_h_fontfamily: {
        required: false,
        type: String,
    },
    title_h_color: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    title_h_display: {
        required: false,
        type: String,
    },
    title_h_margin: {
        required: false,
        type: String,
    },
    title_h_padding: {
        required: false,
        type: String,
    },
    title_h_textalign: {
        required: false,
        type: String,
    },
    reveal_btn_launch: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_btn_launch: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_btn_launch: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_btn_launch: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_btn_launch: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_btn_launch: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_btn_launch: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_btn_launch: {
        required: false,
        type: String,
        maxlength: 100
    },
    btn_launch_outerdiv_display: {
        required: false,
        type: String,
    },
    btn_launch_outerdiv_margin: {
        required: false,
        type: String,
    },
    btn_launch_outerdiv_padding: {
        required: false,
        type: String,
    },
    btn_launch_outerdiv_backgroundColor: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    btn_launch_innerbtn_backgroundColor: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    btn_launch_innerbtn_FontColor: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    }, 
    btn_launch_innerbtn_FontColor_hover: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    btn_launch_innerbtn_backgroundColor_hover: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    btn_launch_h_fontsize: {
        required: false,
        type: String,
    },
    btn_launch_h_fontfamily: {
        required: false,
        type: String,
    },
    btn_launch_h_color: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    btn_launch_h_display: {
        required: false,
        type: String,
    },
    btn_launch_h_margin: {
        required: false,
        type: String,
    },
    btn_launch_h_padding: {
        required: false,
        type: String,
    },
    btn_launch_h_textalign: {
        required: false,
        type: String,
    },
    reveal_image_all: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_image_all: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_image_all: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_image_all: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_image_all: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_image_all: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_image_all: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_image_all: {
        required: false,
        type: String,
        maxlength: 100
    },
    image_all_webkit_animation: {
        required: false,
        type: String,
    },
    reveal_image_one: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_image_one: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_image_one: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_image_one: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_image_one: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_image_one: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_image_one: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_image_one: {
        required: false,
        type: String,
        maxlength: 100
    },
    image_one_webkit_animation: {
        required: false,
        type: String,
    },
    reveal_image_two: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_image_two: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_image_two: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_image_two: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_image_two: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_image_two: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_image_two: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_image_two: {
        required: false,
        type: String,
        maxlength: 100
    },
    image_two_webkit_animation: {
        required: false,
        type: String,
    },
    reveal_image_three: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_image_three: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_image_three: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_image_three: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_image_three: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_image_three: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_image_three: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_image_three: {
        required: false,
        type: String,
        maxlength: 100
    },
    image_three_webkit_animation: {
        required: false,
        type: String,
    },
    reveal_image_four: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_image_four: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_image_four: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_image_four: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_image_four: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_image_four: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_image_four: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_image_four: {
        required: false,
        type: String,
        maxlength: 100
    },
    image_four_webkit_animation: {
        required: false,
        type: String,
    },
    reveal_image_five: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_image_five: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_image_five: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_image_five: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_image_five: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_image_five: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_image_five: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_image_five: {
        required: false,
        type: String,
        maxlength: 100
    },
    image_five_webkit_animation: {
        required: false,
        type: String,
    },
    reveal_name_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_name_sub: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_name_sub: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_name_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_name_sub: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_name_sub: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_name_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_name_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    NameFontColorSubordinate: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    reveal_description_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_description_sub: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_description_sub: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_description_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_description_sub: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_description_sub: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_description_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_description_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    DescriptionFontColorSubordinate: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    reveal_title_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_title_sub: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_title_sub: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_title_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_title_sub: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_title_sub: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_title_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_title_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    TitleFontColorSubordinate: {
        a: {
            required: false,
            type: Number,
        },
        b: {
            required: false,
            type: Number,
        },
        g: {
            required: false,
            type: Number,
        },
        r: {
            required: false,
            type: Number,
        }
    },
    reveal_image_all_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_duration_image_all_sub: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_delay_image_all_sub: {
        required: false,
        type: Number,
        maxlength: 100
    },
    reveal_direction_one_image_all_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_big_image_all_sub: {
        required: false,
        type: Boolean,   
    },
    reveal_cascade_image_all_sub: {
        required: false,
        type: Boolean,
    },
    reveal_animatecss_effect_image_all_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    reveal_animatecss_effectout_image_all_sub: {
        required: false,
        type: String,
        maxlength: 100
    },
    image_all_sub_webkit_animation: {
        required: false,
        type: String,
    },
});

queryhelpers(Schema)

const Blockstyle = mongoose.model('Blockstyle', Schema);

module.exports = { Blockstyle }