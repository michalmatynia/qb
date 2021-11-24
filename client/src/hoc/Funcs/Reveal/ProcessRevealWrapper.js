import React, { useCallback } from "react";

import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Rotate from 'react-reveal/Rotate';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';
import Roll from 'react-reveal/Roll';
import LightSpeed from 'react-reveal/LightSpeed';
import Reveal from 'react-reveal/Reveal';
import Jump from 'react-reveal/Jump';
import Flash from 'react-reveal/Flash';
import HeadShake from 'react-reveal/HeadShake';
import Jello from 'react-reveal/Jello';
import Pulse from 'react-reveal/Pulse';
import RubberBand from 'react-reveal/RubberBand';
import Shake from 'react-reveal/Shake';
import Spin from 'react-reveal/Spin';
import Swing from 'react-reveal/Swing';
import Tada from 'react-reveal/Tada';
import Wobble from 'react-reveal/Wobble';

import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

// nodejs library that concatenates classes

// @material-ui/icons

export default function RevealWrapper({ props }) {
    const [isRevealParams, setRevealParams] = React.useState();

    React.useEffect(() => {
        async function grabRevealParams() {
            let revealparams = {}
            /* Duration */
            if (props.item.blockstyle[0].referenceID[props.revealarray[1]]) {
                Object.assign(revealparams, { duration: props.item.blockstyle[0].referenceID[props.revealarray[1]] })
            }
            /* Delay */
            if (props.item.blockstyle[0].referenceID[props.revealarray[2]]) {
                Object.assign(revealparams, { delay: props.item.blockstyle[0].referenceID[props.revealarray[2]] })
            }

            /* Big */
            if (
                props.item.blockstyle[0].referenceID[props.revealarray[4]]
                && props.item.blockstyle[0].referenceID[props.revealarray[0]] !== 'ScrollAnimation'
            ) {
                Object.assign(revealparams, { big: props.item.blockstyle[0].referenceID[props.revealarray[4]] })
            }

            /* Cascade */

            if (
                props.item.blockstyle[0].referenceID[props.revealarray[5]]
                && props.item.blockstyle[0].referenceID[props.revealarray[0]] !== 'ScrollAnimation'
            ) {
                Object.assign(revealparams, { cascade: props.item.blockstyle[0].referenceID[props.revealarray[5]] })
            }

            /* Direction */

            let direction_one = props.item.blockstyle[0].referenceID[props.revealarray[3]]

            if (direction_one !== 'clear' && props.item.blockstyle[0].referenceID[props.revealarray[0]] !== 'ScrollAnimation') {
                if (props.item.blockstyle[0].referenceID[props.revealarray[3]] === 'left') {
                    Object.assign(revealparams, { left: true })
                } else if (props.item.blockstyle[0].referenceID[props.revealarray[3]] === 'right') {
                    Object.assign(revealparams, { right: true })

                } else if (props.item.blockstyle[0].referenceID[props.revealarray[3]] === 'top') {
                    Object.assign(revealparams, { top: true })

                } else if (props.item.blockstyle[0].referenceID[props.revealarray[3]] === 'bottom') {
                    Object.assign(revealparams, { bottom: true })

                }
            }

            if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'ScrollAnimation') {

                if (props.item.blockstyle[0].referenceID[props.revealarray[6]] !== 'none') {
                    Object.assign(revealparams, { animateIn: props.item.blockstyle[0].referenceID[props.revealarray[6]] })
                }

                if (props.item.blockstyle[0].referenceID[props.revealarray[7]] !== 'none') {
                    Object.assign(revealparams, { animateOut: props.item.blockstyle[0].referenceID[props.revealarray[7]] })
                }

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Reveal') {
                if (props.item.blockstyle[0].referenceID[props.revealarray[6]] !== 'none') {
                    Object.assign(revealparams, { effect: props.item.blockstyle[0].referenceID[props.revealarray[6]] })
                }

                if (props.item.blockstyle[0].referenceID[props.revealarray[7]] !== 'none') {
                    Object.assign(revealparams, { effectOut: props.item.blockstyle[0].referenceID[props.revealarray[7]] })
                }

            }

            setRevealParams(revealparams)
        }

        grabRevealParams()
    }, [props.item.blockstyle, props.revealarray])

    const RevealWrapper = useCallback(() => {


        if (isRevealParams) {
            if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Fade') {


                return <Fade
                    {...isRevealParams}
                >{props.children}</Fade>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Flip') {
                return <Flip
                    {...isRevealParams}
                >{props.children}</Flip>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Rotate') {
                return <Rotate
                    {...isRevealParams}
                >{props.children}</Rotate>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Zoom') {
                return <Zoom
                    {...isRevealParams}
                >{props.children}</Zoom>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Bounce') {
                return <Bounce
                    {...isRevealParams}
                >{props.children}</Bounce>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Slide') {
                return <Slide
                    {...isRevealParams}
                >{props.children}</Slide>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Roll') {
                return <Roll
                    {...isRevealParams}
                >{props.children}</Roll>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'LightSpeed') {
                return <LightSpeed
                    {...isRevealParams}
                >{props.children}</LightSpeed>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Reveal') {
                return <Reveal
                    {...isRevealParams}
                >{props.children}</Reveal>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Jump') {
                return <Jump
                    {...isRevealParams}
                >{props.children}</Jump>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Flash') {
                return <Flash
                    {...isRevealParams}
                >{props.children}</Flash>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'HeadShake') {
                return <HeadShake
                    {...isRevealParams}
                >{props.children}</HeadShake>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Jello') {
                return <Jello
                    {...isRevealParams}
                >{props.children}</Jello>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Pulse') {
                return <Pulse
                    {...isRevealParams}
                >{props.children}</Pulse>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'RubberBand') {
                return <RubberBand
                    {...isRevealParams}
                >{props.children}</RubberBand>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Shake') {
                return <Shake
                    {...isRevealParams}
                >{props.children}</Shake>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Spin') {
                return <Spin
                    {...isRevealParams}
                >{props.children}</Spin>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Swing') {
                return <Swing
                    {...isRevealParams}
                >{props.children}</Swing>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Tada') {
                return <Tada
                    {...isRevealParams}
                >{props.children}</Tada>

            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'Wobble') {
                return <Wobble
                    {...isRevealParams}
                >{props.children}</Wobble>
            } else if (props.item.blockstyle[0].referenceID[props.revealarray[0]] === 'ScrollAnimation') {

                return <ScrollAnimation
                    {...isRevealParams}
                >{props.children}</ScrollAnimation>

            }
        } else {
            return props.children

        }




    }, [isRevealParams, props])

    // eslint-disable-next-line no-useless-concat
    return <RevealWrapper>{props.children}</RevealWrapper>

}
