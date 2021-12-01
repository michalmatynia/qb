export async function parseBlockstyle({ item = null }) {

    if (item.blockstyle) {

        if (item.blockstyle.length > 0) {
            if (item.blockstyle[0].referenceID) {

                let blockstyle = {
                    cardwrapper: {},
                    blockwrapper: {},
                    dynamiccontainer: {},
                    name_outerdiv: {},
                    name_style: {},
                    description_outerdiv: {},
                    description_style: {},
                    title_outerdiv: {},
                    title_style: {},
                    btn_launch_outerdiv: {},
                    btn_launch_style: {},
                    name_sub_style: {},
                    description_sub_style: {},
                    title_sub_style: {},
                    image_all_style: {},
                    image_one_style: {},
                    image_two_style: {},
                    image_three_style: {},
                    image_four_style: {},
                    image_five_style: {},
                    image_all_sub_style: {},
                }

                /* Card Wrapper */
                if (item.blockstyle[0].referenceID.margin_exo) {
                    Object.assign(blockstyle.cardwrapper, { margin: item.blockstyle[0].referenceID.margin_exo })
                }
                if (item.blockstyle[0].referenceID.borderradius_exo > 0) {
                    Object.assign(blockstyle.cardwrapper, { borderRadius: item.blockstyle[0].referenceID.borderradius_exo })
                }
                if (item.blockstyle[0].referenceID.name_boxshadow_exo) {
                    Object.assign(blockstyle.cardwrapper, { boxShadow: item.blockstyle[0].referenceID.name_boxshadow_exo })
                }

                /* Dynamic Container */

                if (item.blockstyle[0].referenceID.margin_inner) {
                    Object.assign(blockstyle.dynamiccontainer, { margin: item.blockstyle[0].referenceID.margin_inner })
                }
                if (item.blockstyle[0].referenceID.padding_inner) {
                    Object.assign(blockstyle.dynamiccontainer, { padding: item.blockstyle[0].referenceID.padding_inner })
                }
                /* Name Outerdiv */

                if (item.blockstyle[0].referenceID.name_outerdiv_display !== 'disabled') {
                    Object.assign(blockstyle.name_outerdiv, { display: item.blockstyle[0].referenceID.name_outerdiv_display })
                }
                if (item.blockstyle[0].referenceID.name_outerdiv_margin) {
                    Object.assign(blockstyle.name_outerdiv, { margin: item.blockstyle[0].referenceID.name_outerdiv_margin })
                }
                if (item.blockstyle[0].referenceID.name_outerdiv_padding) {
                    Object.assign(blockstyle.name_outerdiv, { padding: item.blockstyle[0].referenceID.name_outerdiv_padding })
                }
                if (item.blockstyle[0].referenceID.name_outerdiv_backgroundColor.a > 0) {
                    Object.assign(blockstyle.name_outerdiv, { backgroundColor: `rgba(${item.blockstyle[0].referenceID.name_outerdiv_backgroundColor.r}, ${item.blockstyle[0].referenceID.name_outerdiv_backgroundColor.g}, ${item.blockstyle[0].referenceID.name_outerdiv_backgroundColor.b}, ${item.blockstyle[0].referenceID.name_outerdiv_backgroundColor.a})` })
                }
                if (item.blockstyle[0].referenceID.name_h_textalign !== 'disabled') {
                    Object.assign(blockstyle.name_outerdiv, { textAlign: item.blockstyle[0].referenceID.name_h_textalign })
                }
                /* Name H */
                if (item.blockstyle[0].referenceID.name_h_color.a > 0) {
                    Object.assign(blockstyle.name_style, { color: `rgba(${item.blockstyle[0].referenceID.name_h_color.r}, ${item.blockstyle[0].referenceID.name_h_color.g}, ${item.blockstyle[0].referenceID.name_h_color.b}, ${item.blockstyle[0].referenceID.name_h_color.a})` })
                }
                if (item.blockstyle[0].referenceID.name_h_display !== 'disabled') {
                    Object.assign(blockstyle.name_style, { display: item.blockstyle[0].referenceID.name_h_display })
                }
                if (item.blockstyle[0].referenceID.name_h_fontsize) {
                    Object.assign(blockstyle.name_style, { fontSize: item.blockstyle[0].referenceID.name_h_fontsize })
                }
                if (item.blockstyle[0].referenceID.name_h_fontfamily !== 'disabled') {
                    Object.assign(blockstyle.name_style, { fontFamily: item.blockstyle[0].referenceID.name_h_fontfamily })
                }
                if (item.blockstyle[0].referenceID.name_h_margin) {
                    Object.assign(blockstyle.name_style, { margin: item.blockstyle[0].referenceID.name_h_margin })
                }
                if (item.blockstyle[0].referenceID.name_h_padding) {
                    Object.assign(blockstyle.name_style, { padding: item.blockstyle[0].referenceID.name_h_padding })
                }

                /* Description Outerdiv */

                if (item.blockstyle[0].referenceID.description_outerdiv_display !== 'disabled') {
                    Object.assign(blockstyle.description_outerdiv, { display: item.blockstyle[0].referenceID.description_outerdiv_display })
                }
                if (item.blockstyle[0].referenceID.description_outerdiv_margin) {
                    Object.assign(blockstyle.description_outerdiv, { margin: item.blockstyle[0].referenceID.description_outerdiv_margin })
                }
                if (item.blockstyle[0].referenceID.description_outerdiv_padding) {
                    Object.assign(blockstyle.description_outerdiv, { padding: item.blockstyle[0].referenceID.description_outerdiv_padding })
                }
                if (item.blockstyle[0].referenceID.description_outerdiv_backgroundColor.a > 0) {
                    Object.assign(blockstyle.description_outerdiv, { backgroundColor: `rgba(${item.blockstyle[0].referenceID.description_outerdiv_backgroundColor.r}, ${item.blockstyle[0].referenceID.description_outerdiv_backgroundColor.g}, ${item.blockstyle[0].referenceID.description_outerdiv_backgroundColor.b}, ${item.blockstyle[0].referenceID.description_outerdiv_backgroundColor.a})` })
                }
                if (item.blockstyle[0].referenceID.description_h_textalign !== 'disabled') {
                    Object.assign(blockstyle.description_outerdiv, { textAlign: item.blockstyle[0].referenceID.description_h_textalign })
                }
                // /* Description Style*/

                if (item.blockstyle[0].referenceID.description_h_color.a > 0) {
                    Object.assign(blockstyle.description_style, { color: `rgba(${item.blockstyle[0].referenceID.description_h_color.r}, ${item.blockstyle[0].referenceID.description_h_color.g}, ${item.blockstyle[0].referenceID.description_h_color.b}, ${item.blockstyle[0].referenceID.description_h_color.a})` })
                }
                if (item.blockstyle[0].referenceID.description_h_display !== 'disabled') {
                    Object.assign(blockstyle.description_style, { display: item.blockstyle[0].referenceID.description_h_display })
                }
                if (item.blockstyle[0].referenceID.description_h_fontsize) {
                    Object.assign(blockstyle.description_style, { fontSize: item.blockstyle[0].referenceID.description_h_fontsize })
                }
                if (item.blockstyle[0].referenceID.description_h_fontfamily !== 'disabled') {
                    Object.assign(blockstyle.description_style, { fontFamily: item.blockstyle[0].referenceID.description_h_fontfamily })
                }
                if (item.blockstyle[0].referenceID.description_h_margin) {
                    Object.assign(blockstyle.description_style, { margin: item.blockstyle[0].referenceID.description_h_margin })
                }
                if (item.blockstyle[0].referenceID.description_h_padding) {
                    Object.assign(blockstyle.description_style, { padding: item.blockstyle[0].referenceID.description_h_padding })
                }

                // /* Title Outerdiv*/

                if (item.blockstyle[0].referenceID.title_outerdiv_display !== 'disabled') {
                    Object.assign(blockstyle.title_outerdiv, { display: item.blockstyle[0].referenceID.title_outerdiv_display })
                }
                if (item.blockstyle[0].referenceID.title_outerdiv_margin) {
                    Object.assign(blockstyle.title_outerdiv, { margin: item.blockstyle[0].referenceID.title_outerdiv_margin })
                }
                if (item.blockstyle[0].referenceID.title_outerdiv_padding) {
                    Object.assign(blockstyle.title_outerdiv, { padding: item.blockstyle[0].referenceID.title_outerdiv_padding })
                }
                if (item.blockstyle[0].referenceID.title_outerdiv_backgroundColor.a > 0) {
                    Object.assign(blockstyle.title_outerdiv, { backgroundColor: `rgba(${item.blockstyle[0].referenceID.title_outerdiv_backgroundColor.r}, ${item.blockstyle[0].referenceID.title_outerdiv_backgroundColor.g}, ${item.blockstyle[0].referenceID.title_outerdiv_backgroundColor.b}, ${item.blockstyle[0].referenceID.title_outerdiv_backgroundColor.a})` })
                }
                if (item.blockstyle[0].referenceID.title_h_textalign !== 'disabled') {
                    Object.assign(blockstyle.title_outerdiv, { textAlign: item.blockstyle[0].referenceID.title_h_textalign })
                }

                /* Title Style */
                if (item.blockstyle[0].referenceID.title_h_color.a > 0) {
                    Object.assign(blockstyle.title_style, { color: `rgba(${item.blockstyle[0].referenceID.title_h_color.r}, ${item.blockstyle[0].referenceID.title_h_color.g}, ${item.blockstyle[0].referenceID.title_h_color.b}, ${item.blockstyle[0].referenceID.title_h_color.a})` })
                }
                if (item.blockstyle[0].referenceID.title_h_display !== 'disabled') {
                    Object.assign(blockstyle.title_style, { display: item.blockstyle[0].referenceID.title_h_display })
                }
                if (item.blockstyle[0].referenceID.title_h_fontsize) {
                    Object.assign(blockstyle.title_style, { fontSize: item.blockstyle[0].referenceID.title_h_fontsize })
                }
                if (item.blockstyle[0].referenceID.title_h_fontfamily !== 'disabled') {
                    Object.assign(blockstyle.title_style, { fontFamily: item.blockstyle[0].referenceID.title_h_fontfamily })
                }
                if (item.blockstyle[0].referenceID.title_h_margin) {
                    Object.assign(blockstyle.title_style, { margin: item.blockstyle[0].referenceID.title_h_margin })
                }
                if (item.blockstyle[0].referenceID.title_h_padding) {
                    Object.assign(blockstyle.title_style, { padding: item.blockstyle[0].referenceID.title_h_padding })
                }

                /* Btn Launch Outerdiv */
                if (item.blockstyle[0].referenceID.btn_launch_outerdiv_display !== 'disabled') {
                    Object.assign(blockstyle.btn_launch_outerdiv, { display: item.blockstyle[0].referenceID.btn_launch_outerdiv_display })
                }
                if (item.blockstyle[0].referenceID.btn_launch_outerdiv_margin) {
                    Object.assign(blockstyle.btn_launch_outerdiv, { margin: item.blockstyle[0].referenceID.btn_launch_outerdiv_margin })
                }
                if (item.blockstyle[0].referenceID.btn_launch_outerdiv_padding) {
                    Object.assign(blockstyle.btn_launch_outerdiv, { padding: item.blockstyle[0].referenceID.btn_launch_outerdiv_padding })
                }
                if (item.blockstyle[0].referenceID.btn_launch_outerdiv_backgroundColor.a > 0) {
                    Object.assign(blockstyle.btn_launch_outerdiv, { 
                        backgroundColor: `rgba(${item.blockstyle[0].referenceID.btn_launch_outerdiv_backgroundColor.r}, ${item.blockstyle[0].referenceID.btn_launch_outerdiv_backgroundColor.g}, ${item.blockstyle[0].referenceID.btn_launch_outerdiv_backgroundColor.b}, ${item.blockstyle[0].referenceID.btn_launch_outerdiv_backgroundColor.a})`,
                        "&:hover,&:focus": {
                            // boxShadow: ({ overtheme }) =>
                            // overtheme ? 
                            // "0 14px 6px -12px rgba(" + hexToRgb(overtheme.secondaryColorHex[0])  + ", 0.42)" 
                            // + "0 4px 23px 0 rgba(" + hexToRgb(blackColor)  + ", 0.12)" 
                            // + "0 8px 10px -5px rgba(" + hexToRgb(overtheme.secondaryColorHex[0])  + ", 0.2)" 
                            // : "0 4px 23px 0px rgba(" + hexToRgb(blackColor)  + ", 0.42)" 
                            // + "0 4px 23px 0px rgba(" + hexToRgb(blackColor)  + ", 0.12)"
                            // + "0 4px 23px 0px rgba(" + hexToRgb(blackColor)  + ", 0.2)",
                            // color: "rgba(" + hexToRgb(blackColor) + ",.87)",
                            color: "red",

                            // backgroundColor: grayColor[19],
                          },
                    
                    })
                }
                if (item.blockstyle[0].referenceID.btn_launch_h_textalign !== 'disabled') {
                    Object.assign(blockstyle.btn_launch_outerdiv, { textAlign: item.blockstyle[0].referenceID.btn_launch_h_textalign })
                }

                // /* Btn Launch Style */
                if (item.blockstyle[0].referenceID.btn_launch_h_color.a > 0) {
                    Object.assign(blockstyle.btn_launch_style, { color: `rgba(${item.blockstyle[0].referenceID.btn_launch_h_color.r}, ${item.blockstyle[0].referenceID.btn_launch_h_color.g}, ${item.blockstyle[0].referenceID.btn_launch_h_color.b}, ${item.blockstyle[0].referenceID.btn_launch_h_color.a})` })
                }
                if (item.blockstyle[0].referenceID.btn_launch_h_display !== 'disabled') {
                    Object.assign(blockstyle.btn_launch_style, { display: item.blockstyle[0].referenceID.btn_launch_h_display })
                }
                if (item.blockstyle[0].referenceID.btn_launch_h_fontsize) {
                    Object.assign(blockstyle.btn_launch_style, { fontSize: item.blockstyle[0].referenceID.btn_launch_h_fontsize })
                }
                if (item.blockstyle[0].referenceID.btn_launch_h_fontfamily !== 'disabled') {
                    Object.assign(blockstyle.btn_launch_style, { fontFamily: item.blockstyle[0].referenceID.btn_launch_h_fontfamily })
                }
                if (item.blockstyle[0].referenceID.btn_launch_h_margin) {
                    Object.assign(blockstyle.btn_launch_style, { margin: item.blockstyle[0].referenceID.btn_launch_h_margin })
                }
                if (item.blockstyle[0].referenceID.btn_launch_h_padding) {
                    Object.assign(blockstyle.btn_launch_style, { padding: item.blockstyle[0].referenceID.btn_launch_h_padding })
                }

                // /* Name Sub Style */
                if (item.blockstyle[0].referenceID.NameFontColorSubordinate.a > 0) {
                    Object.assign(blockstyle.name_sub_style, { color: `rgba(${item.blockstyle[0].referenceID.NameFontColorSubordinate.r}, ${item.blockstyle[0].referenceID.NameFontColorSubordinate.g}, ${item.blockstyle[0].referenceID.NameFontColorSubordinate.b}, ${item.blockstyle[0].referenceID.NameFontColorSubordinate.a})` })
                }

                /* Description Sub Style */

                if (item.blockstyle[0].referenceID.DescriptionFontColorSubordinate.a > 0) {
                    Object.assign(blockstyle.description_sub_style, { color: `rgba(${item.blockstyle[0].referenceID.DescriptionFontColorSubordinate.r}, ${item.blockstyle[0].referenceID.DescriptionFontColorSubordinate.g}, ${item.blockstyle[0].referenceID.DescriptionFontColorSubordinate.b}, ${item.blockstyle[0].referenceID.DescriptionFontColorSubordinate.a})` })
                }
                /* Title Sub Style */

                if (item.blockstyle[0].referenceID.TitleFontColorSubordinate.a > 0) {
                    Object.assign(blockstyle.title_sub_style, { color: `rgba(${item.blockstyle[0].referenceID.TitleFontColorSubordinate.r}, ${item.blockstyle[0].referenceID.TitleFontColorSubordinate.g}, ${item.blockstyle[0].referenceID.TitleFontColorSubordinate.b}, ${item.blockstyle[0].referenceID.TitleFontColorSubordinate.a})` })
                }

                // /* Blockwrapper */

                if (item.blockstyle[0].referenceID.BackgroundColor_One.a > 0) {
                    Object.assign(blockstyle.blockwrapper, { background: `linear-gradient(180deg, rgba(${item.blockstyle[0].referenceID.BackgroundColor_One.r}, ${item.blockstyle[0].referenceID.BackgroundColor_One.g}, ${item.blockstyle[0].referenceID.BackgroundColor_One.b}, ${item.blockstyle[0].referenceID.BackgroundColor_One.a}) 20%,  rgba(${item.blockstyle[0].referenceID.BackgroundColor_Two.r}, ${item.blockstyle[0].referenceID.BackgroundColor_Two.g}, ${item.blockstyle[0].referenceID.BackgroundColor_Two.b}, ${item.blockstyle[0].referenceID.BackgroundColor_Two.a}) 70%)` })
                }
                if (item.blockstyle[0].referenceID.BackgroundOpacity < 1) {
                    Object.assign(blockstyle.blockwrapper, { opacity: item.blockstyle[0].referenceID.BackgroundOpacity })
                }

                if (item.blockstyle[0].referenceID.margin_outer) {
                    Object.assign(blockstyle.blockwrapper, { margin: item.blockstyle[0].referenceID.margin_outer })
                }

                if (item.blockstyle[0].referenceID.padding_outer) {
                    Object.assign(blockstyle.blockwrapper, { padding: item.blockstyle[0].referenceID.padding_outer })
                }
                /* Image */

                if (item.blockstyle[0].referenceID.image_all_webkit_animation) {
                    Object.assign(blockstyle.image_all_style, { WebkitAnimation: item.blockstyle[0].referenceID.image_all_webkit_animation })
                }
                if (item.blockstyle[0].referenceID.image_one_webkit_animation) {
                    Object.assign(blockstyle.image_one_style, { WebkitAnimation: item.blockstyle[0].referenceID.image_one_webkit_animation })
                }
                if (item.blockstyle[0].referenceID.image_two_webkit_animation) {
                    Object.assign(blockstyle.image_two_style, { WebkitAnimation: item.blockstyle[0].referenceID.image_two_webkit_animation })
                }
                if (item.blockstyle[0].referenceID.image_three_webkit_animation) {
                    Object.assign(blockstyle.image_three_style, { WebkitAnimation: item.blockstyle[0].referenceID.image_three_webkit_animation })
                }
                if (item.blockstyle[0].referenceID.image_four_webkit_animation) {
                    Object.assign(blockstyle.image_four_style, { WebkitAnimation: item.blockstyle[0].referenceID.image_four_webkit_animation })
                }
                if (item.blockstyle[0].referenceID.image_five_webkit_animation) {
                    Object.assign(blockstyle.image_five_style, { WebkitAnimation: item.blockstyle[0].referenceID.image_five_webkit_animation })
                }
                if (item.blockstyle[0].referenceID.image_all_sub_webkit_animation) {
                    Object.assign(blockstyle.image_all_sub_style, { WebkitAnimation: item.blockstyle[0].referenceID.image_all_sub_webkit_animation })
                }

                return blockstyle
            } else {
                return null

            }
        } else {
            return null

        }

    } else {
        return null
    }
}