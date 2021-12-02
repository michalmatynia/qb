import React, { useCallback } from "react";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import { parseBlockstyle } from "../../../../../../../theming/Funcs/blockstyleFunc";

import Button from "../../../../../material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import GridContainer from "../../../../../material-kit-pro-react-v1.9.0/components/Grid/GridContainer";
import GridItem from "../../../../../material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Parallax from "./ParallaxTransform";
import FCGridItem from './FCGridItem'
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
  reveal_array_name,
  reveal_array_description,
  reveal_array_btn_launch,
} from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'

import projectsStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.js";

const useStyles = makeStyles(projectsStyle);

export function SectionParallax01({ item, i }) {
  const [isBrickStyle, setBrickStyle] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const processStyle = useCallback(async (item) => {
    return await parseBlockstyle(item)
  }, [])

  React.useEffect(() => {
    if (item.blockstyle.length > 0) {
      processStyle({ item }).then((result) => {

        setBrickStyle(result)
        setIsLoading(false)

      })
    } else {
      setIsLoading(false)

    }

  }, [item, processStyle])

  const classes = useStyles();

  const useDynoStyles = makeStyles(isBrickStyle ? isBrickStyle : null);
  const dynoclasses = useDynoStyles();

  const loopChecked = useCallback(
    ({ item }) => {

      return <FCGridItem
        // parentClass={classes.card2}
        item={item}
        i={i}
        key={item._id}
        name={<div className={dynoclasses.name_outerdiv} ><h1 className={cx(classes.title, dynoclasses.name_style)}  ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name}>{item.name}</FuncRevealWrapper></h1></div>}

        btn_launch={<div className={dynoclasses.btn_launch_outerdiv}><Button
          // classCustomback={dynoclasses.btn_launch_outerdiv}
          item={item}
          color="primary"
          size="lg"
          href={item.btn_launch_link ? item.btn_launch_link : '/'} target="_blank" ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_btn_launch}>{item.btn_launch}</FuncRevealWrapper></Button></div>}
        description={<div className={dynoclasses.description_outerdiv}><h4 className={cx(
          dynoclasses.description_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_description}>{item.description}</FuncRevealWrapper></h4></div>
        }
      />
    }, [classes.title, dynoclasses.btn_launch_outerdiv, dynoclasses.description_outerdiv, dynoclasses.description_style, dynoclasses.name_outerdiv, dynoclasses.name_style, i])

  return (

    !isLoading ? <div className={dynoclasses.dynamiccontainer}>
      <Parallax
        item={item}
        filter={item.blockstyle.length === 0 || item.blockstyle[0].referenceID.image_filter === 'transparent' ? null : item.blockstyle[0].referenceID.image_filter}
      // small
      >
        <div className={classes.container} >
          <GridContainer>
            <GridItem
              xs={12}
              md={8}
              sm={8}
              className={cx(
                classes.mlAuto,
                classes.mrAuto,
                // classes.textCenter
              )}
            >
              {loopChecked({ item })}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    </div> : null
  );
}