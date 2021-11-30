export default async function processOverTheme({ currentmysite = null }) {
    let parentstyle = {
        body: {}
    }
   
    if (currentmysite.checked.length > 0 ) {
        Object.assign(parentstyle.body, { backgroundColor: `rgba(${currentmysite.checked[0].referenceID.BodyBackgroundColor.r}, ${currentmysite.checked[0].referenceID.BodyBackgroundColor.g}, ${currentmysite.checked[0].referenceID.BodyBackgroundColor.b}, ${currentmysite.checked[0].referenceID.BodyBackgroundColor.a})`, })
        Object.assign(parentstyle.body, { color: `rgba(${currentmysite.checked[0].referenceID.BodyFontColor.r}, ${currentmysite.checked[0].referenceID.BodyFontColor.g}, ${currentmysite.checked[0].referenceID.BodyFontColor.b}, ${currentmysite.checked[0].referenceID.BodyFontColor.a})`})

        if (currentmysite.checked[0].referenceID.images.length > 0) {
            Object.assign(parentstyle.body, { background: `url(${currentmysite.checked[0].referenceID.images[0].secure_url}) center`})

        }

    }
    return parentstyle

}