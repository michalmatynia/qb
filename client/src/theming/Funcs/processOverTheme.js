export default async function processOverTheme({ currentmysite = null }) {
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    let overtheme = {

    }

   
    /* Primary Color */

    let primary_color_array = [
        currentmysite.checked[0].referenceID.primary_color_one,
        currentmysite.checked[0].referenceID.primary_color_two,
        currentmysite.checked[0].referenceID.primary_color_three,
        currentmysite.checked[0].referenceID.primary_color_four,
        currentmysite.checked[0].referenceID.primary_color_five,
        currentmysite.checked[0].referenceID.primary_color_six

    ]
    let primary_color_hex_array = [
        rgbToHex(currentmysite.checked[0].referenceID.primary_color_one.r, currentmysite.checked[0].referenceID.primary_color_one.g, currentmysite.checked[0].referenceID.primary_color_one.b),
        rgbToHex(currentmysite.checked[0].referenceID.primary_color_two.r, currentmysite.checked[0].referenceID.primary_color_two.g, currentmysite.checked[0].referenceID.primary_color_two.b),
        rgbToHex(currentmysite.checked[0].referenceID.primary_color_three.r, currentmysite.checked[0].referenceID.primary_color_three.g, currentmysite.checked[0].referenceID.primary_color_three.b),
        rgbToHex(currentmysite.checked[0].referenceID.primary_color_four.r, currentmysite.checked[0].referenceID.primary_color_four.g, currentmysite.checked[0].referenceID.primary_color_four.b),
        rgbToHex(currentmysite.checked[0].referenceID.primary_color_five.r, currentmysite.checked[0].referenceID.primary_color_five.g, currentmysite.checked[0].referenceID.primary_color_five.b),
        rgbToHex(currentmysite.checked[0].referenceID.primary_color_six.r, currentmysite.checked[0].referenceID.primary_color_six.g, currentmysite.checked[0].referenceID.primary_color_six.b),

    ]

    let secondary_color_array = [
        currentmysite.checked[0].referenceID.secondary_color_one,
    ]
    let secondary_color_hex_array = [
        rgbToHex(currentmysite.checked[0].referenceID.secondary_color_one.r, currentmysite.checked[0].referenceID.secondary_color_one.g, currentmysite.checked[0].referenceID.secondary_color_one.b),
    ]
    
    if (currentmysite.checked.length > 0) {
        Object.assign(overtheme, { primaryColor: primary_color_array, })
        Object.assign(overtheme, { primaryColorHex: primary_color_hex_array})
        Object.assign(overtheme, { secondaryColor: secondary_color_array, })
        Object.assign(overtheme, { secondaryColorHex: secondary_color_hex_array})
        Object.assign(overtheme, { body: secondary_color_hex_array})

    }

    return overtheme

}