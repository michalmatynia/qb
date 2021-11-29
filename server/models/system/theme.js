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
    images: {
        type: Array,
        default: []
    },
    primary_color_one: {
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
    primary_color_two: {
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
    primary_color_three: {
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
    primary_color_four: {
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
    primary_color_five: {
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
    primary_color_six: {
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
    secondary_color_one: {
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
    HeaderBackgroundColor: {
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
    HeaderBackgroundColorScrollOn: {
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
    HeaderFontColor: {
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
    HeaderFontColorHover: {
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
    HeaderFontSize: {
        required: false,
        type: String,
    },
    HeaderFontType: {
        required: false,
        type: String,
    },
    BodyBackgroundColor: {
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
    BodyFontColor: {
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
    BodyFontSize: {
        required: false,
        type: String,
    },
    BodyFontType: {
        required: false,
        type: String,
    },
    FooterBackgroundColor: {
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
    FooterFontColor: {
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
    FooterFontSize: {
        required: false,
        type: String,
    },
    FooterFontType: {
        required: false,
        type: String,
    },

});

queryhelpers(Schema)

const Theme = mongoose.model('Theme', Schema);

module.exports = { Theme }