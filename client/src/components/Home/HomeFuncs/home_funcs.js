import React from "react";


import { SectionHeadersHeader03 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Headers/Header03.js'
import { SectionFeaturesFeature02 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Features/Feature02.js'
import { SectionFeaturesFeature03 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Features/Feature03.js'
import { SectionFeaturesFeature05 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Features/Feature05.js'
import { SectionTeamsTeam03 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Teams/Team03.js'
import { SectionTeamsTeam05 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Teams/Team05.js'
import { SectionProjectsProject01 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Projects/Project01.js'
import { SectionProjectsProject02 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Projects/Project02.js'
import { SectionProjectsProject03 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Projects/Project03.js'
import { SectionTestimonialsTestimonial01 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Testimonials/Testimonial01.js'
import { SectionParallax01 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Parallax/Parallax01.js'
import { SectionComponents01 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/PresentationPage/Sections/Components/SectionComponents.js'
import { SectionContent01 } from '../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/PresentationPage/Sections/Content/SectionContet2'
import ProcessWrapper from './ProcessWrapper'

import ContactUsWrapper from '../../StaticBricks/Contact/ContactUsWrapper'

function WrapperOutputNext(props) {

    return <ProcessWrapper
    props={props}
    />
}


export function LoopItems({ item }) {

    return (
        <div>
            <WrapperOutputNext
                item={item}
            ><InputToComponent
            item={item} />
            </WrapperOutputNext>
        </div>
    )
}

function InputToComponent({  item, i }) {
    // const classes = useStyles();

    if (item.htmltype === 'CT_SectionHeader_03') {

        return <SectionHeadersHeader03
            item={item}
            i={i}
            key={i}
        />

    }
    else if (item.htmltype === 'CT_SectionFeatures_02') {
        return <SectionFeaturesFeature02
            item={item}
            i={i}
            key={i}
        />
    }
    else if (item.htmltype === 'CT_SectionFeatures_03') {
        return <SectionFeaturesFeature03
            item={item}
            i={i}
            key={i}
        />

    } else if (item.htmltype === 'CT_SectionFeatures_05') {

        /* Has own container class */
        return <SectionFeaturesFeature05
            item={item}
            i={i}
            key={i}
        />

    } else if (item.htmltype === 'CT_SectionTeams_03') {

        /* Has own container class */
        return <SectionTeamsTeam03
            item={item}
            i={i}
            key={i}
        />

    } else if (item.htmltype === 'CT_SectionTeams_05') {

        /* Has own container class */
        return <SectionTeamsTeam05
            item={item}
            i={i}
            key={i}
        />

    } else if (item.htmltype === 'CT_SectionProjects_01') {
        /* Has own container class */

        return <SectionProjectsProject01
            item={item}
            i={i}
            key={i}
        />

    } else if (item.htmltype === 'CT_SectionProjects_02') {
        /* Has own container class */

        return <SectionProjectsProject02
            item={item}
            i={i}
            key={i}
        />

    } else if (item.htmltype === 'CT_SectionProjects_03') {

        /* Has own container class */

        return <SectionProjectsProject03
            item={item}
            i={i}
            key={i}
        />

    } else if (item.htmltype === 'CT_SectionTestimonials_01') {

        /* Has own container class */

        return <SectionTestimonialsTestimonial01
            item={item}
            i={i}
            key={i}
        />

    } else if (item.htmltype === 'MM_SectionParallax_01') {

        return <SectionParallax01
            item={item}
            i={i}
            key={i}
        />

    } else if (item.htmltype === 'CT_SectionComponents_01') {

        return <SectionComponents01
            item={item}
            i={i}
            key={i}
        />

    } else if (item.htmltype === 'CT_SectionContent_01') {

        return <SectionContent01
            item={item}
            i={i}
            key={i}
        />

    } else if (item.htmltype === 'CT_ContactUs') {
        return <ContactUsWrapper
            list={item}
            i={i}
            key={i}
        />

    } else {
        return null
    }

}

