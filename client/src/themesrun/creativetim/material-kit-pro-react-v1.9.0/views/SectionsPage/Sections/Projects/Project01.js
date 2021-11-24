import React, { useCallback } from "react";
import { useSelector } from 'react-redux'
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import GridContainer from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import {parseBlockstyle} from "../../../../../../../theming/Funcs/blockstyleFunc";

import MyMenu from './Additional/MyMenu'
// import FCGridItem from './Additional/Project01FCGridItemReverse'
import ProcessAsWrapperBG from '../../../../../../../functions/HookFuncs/ProcessAsWrapperBG'
import FCGridItem from './Additional/Project01FCGridItemReverse'
import ImagePreviewModal from '../../../../../../../components/Modals/ShowImage/index.js'
import FuncRevealWrapper from '../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
  reveal_array_name,
  reveal_array_name_sub,
  reveal_array_description_sub,
  reveal_array_title_sub,
} from '../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'

// This is a style for the parent
import projectsStyle from "../../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/projectsStyle.js";
const useStyles = makeStyles(projectsStyle);

function LoopCategory({ value, parentStyle }) {
  const classes = useStyles();

  return value.referenceID.category.length > 0 ? value.referenceID.category.map((item) => {
    return <h6 key={item._id} className={classes.cardCategoryWhite} style={parentStyle}><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_title_sub}>{item.name}</FuncRevealWrapper></h6>
  }) : null
}

export function SectionProjectsProject01({ item, i }) {

  const [isCategoryArray, setCategoryArray] = React.useState([]);
  const [isSlides, setSlides] = React.useState(item.checked);
  const [isFilter, setIsFilter] = React.useState('all');
  const [isShowFullScreen, setShowFullScreen] = React.useState(false);
  const [isModalValue, setIsModalValue] = React.useState(null);

  const [isBrickStyle, setBrickStyle] = React.useState();

  const processStyle = useCallback(async (item) => {
    return await parseBlockstyle(item)
}, [])

  React.useEffect(()=>{

    processStyle({item}).then((result)=>{
      setBrickStyle(result)
    })
  }, [item, processStyle])

  const classes = useStyles();

  // console.log(isBrickStyle);
  const useDynoStyles = makeStyles(isBrickStyle ? isBrickStyle : null);
  const dynoclasses = useDynoStyles();

  /*   const [isLimit, setIsLimit] = React.useState(3);
    const [isSortOrder, setIsSortOrder] = React.useState(1);
    const [isSortBy, setIsSortBy] = React.useState('position'); */

  const isLimit = 12;
  const isSortOrder = 1;
  const isSortBy = 'position';

  // ============

  const loopChecked = useCallback(
    ({ item }) => {

      return isSlides.map((value, i) => {

        function isOdd(num) { return num % 2 }
        // let array_wide = [3, 7, 11, 15, 19, 23, 27, 31]

        let array_wide = []
        let dynamic_sm = i === 2 ? 12 : 6
        let dynamic_md = i === 2 ? 12 : 6
        let dynamic_lg = isOdd(i) && array_wide.includes(i) ? 12 : 4

        return <GridItem xs={12} sm={dynamic_sm} md={dynamic_md} lg={dynamic_lg} key={value.referenceID._id}>
          <FCGridItem
            item={item}
            value={value}
            i={i}
            key={value.referenceID._id}
            parentClass={classes.cardRotate}
            title={value.referenceID.title ? <h6 className={cx(classes.cardCategoryWhite, dynoclasses.title_sub_style)}><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_title_sub}>{value.referenceID.title}</FuncRevealWrapper></h6> 
            : <LoopCategory value={value} parentClass={cx(classes.cardCategoryWhite, dynoclasses.title_sub_style)} />}
            name={<a href="#pablo" onClick={e => e.preventDefault()}><h3 className={cx(classes.cardTitle, dynoclasses.name_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name_sub}>{value.referenceID.name}</FuncRevealWrapper></h3></a>}
            description={<p className={cx(classes.cardDescriptionWhite, dynoclasses.description_sub_style)} ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_description_sub}>{value.referenceID.description}</FuncRevealWrapper></p>}
            toggleModal={({ cb_toggle, value }) => {
              setShowFullScreen(cb_toggle)
              setIsModalValue(value)
            }}
          />
        </GridItem>
      })

    }, [classes.cardCategoryWhite, classes.cardDescriptionWhite, classes.cardRotate, classes.cardTitle, dynoclasses.description_sub_style, dynoclasses.name_sub_style, dynoclasses.title_sub_style, isSlides])

  // const switchCategory = useCallback(
  //   ({ value = null }) => {

  //     setIsFilter(value)
  //   },[])

  // ==================
  React.useEffect(() => {

    async function refineList() {

      let newViewingList = []

      newViewingList = item.checked.reduce((accum, currentValue, CurrentIndex) => {

        // Reduce on Price Range
        let cat_bool = true

        let cv_extracted_ids = currentValue.referenceID.category.map(item => item._id)

        if (!cv_extracted_ids.includes(isFilter._id)) {
          cat_bool = false
        }

        if (cat_bool) {
          accum = [...accum, currentValue]
        } else {
          accum = [...accum]
        }

        return accum

      }, []);


      // if (isSortOrder === 1) {
      //   newViewingList.sort(function (a, b) {
      //     return a[isSortBy] - b[isSortBy];
      //   });
      // } else {
      //   newViewingList.sort(function (a, b) {
      //     return b[isSortBy] - a[isSortBy];
      //   });
      // }
      newViewingList = newViewingList.slice(0, isLimit)

      setSlides(newViewingList)

    }

    if (item.checked.length > 0) {
      if (isFilter === 'all') {

        let newViewingList = item.checked.slice(0, isLimit)

        setSlides(newViewingList)

      } else {
        refineList()
      }
    }


  }, [isFilter, isLimit, isSortBy, isSortOrder, item.checked])

  React.useEffect(() => {

    async function extractTaxonomy() {

      // extract taxonomies from product array
      let category_taxo_array = []
      for (let eachslide of item.checked) {

        if (eachslide.referenceID.category.length > 0) {

          for (let catvalue of eachslide.referenceID.category) {

            category_taxo_array.push(catvalue)

          }
        }
      }

      category_taxo_array = category_taxo_array.filter((value, index, all) =>
        index === all.findIndex((t) => (
          t._id === value._id
        ))
      )

      category_taxo_array.sort(function (a, b) {
        return a.position - b.position;
      });

      setCategoryArray(category_taxo_array)

    }

    if (item.checked && item.checked.length > 0) {

      extractTaxonomy()
    }

  }, [item.checked])


  const WrapperOutputNext = useCallback(
    (props) => {

      if (item.blockstyle.length > 0 && item.blockstyle[0].referenceID.images.length > 0 && !item.css_wrap_card) {

        return <ProcessAsWrapperBG
          props={props}
          list={item.blockstyle[0].referenceID}
          parentClassName={classes.projects + " " + classes.wrapperasbg}
        />
      } else {
        return <div className={classes.projects + " " + classes.wrapperasbg}>{props.children}</div>
      }

    }, [classes.projects, classes.wrapperasbg, item.blockstyle, item.css_wrap_card])


  return (

    <WrapperOutputNext>
      <div className={dynoclasses.dynamiccontainer }>

      <div className={classes.container} style={{marginBottom: '80px'}}>
        <ImagePreviewModal
          isModalValue={isModalValue}
          isShowFullScreen={isShowFullScreen}
          toggleModal={(cb_toggle) => {
            setShowFullScreen(cb_toggle)
            setIsModalValue(cb_toggle)
          }}
        />
        <GridContainer>
          <GridItem
            xs={12}
            sm={12}
            md={12}
            className={cx(
              classes.mlAuto,
              classes.mrAuto,
              classes.textCenter
            )}
          ><div className={dynoclasses.name_outerdiv} style={{ marginTop: "80px" }}>
            <h2 className={cx(dynoclasses.name_style, classes.title) } ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_name}>{item.name}</FuncRevealWrapper></h2>
            </div>
            <MyMenu
              isCategoryArray={isCategoryArray}
              cbActionOnClick={({ value }) => {
                setIsFilter(value)
              }}
              isFilter={isFilter}
              item={item}
            />
            {/*           <div className={classes.tabSpace} /> */}
          </GridItem>
        </GridContainer>
        <GridContainer>

          {loopChecked({ isSlides, item })}

        </GridContainer>
      </div></div>
    </WrapperOutputNext>);

}


