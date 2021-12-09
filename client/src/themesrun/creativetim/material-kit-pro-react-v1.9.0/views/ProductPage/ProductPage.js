import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'

import {
  plg_clearProps,
  plg_findOne_QueMod,
  plg_findMany,
} from '../../../../../components/utils/Plugs/cms_plugs';

import styled from 'styled-components';
import {
  useRouter,
} from "../../../../../hoc/Funcs/hook_funcs";

import {
  productFuncs_handleAddToCart
} from "../../../../../components/User/Admin/GenericFuncs/product_funcs_vh"
import {
  act_injectProp,
} from '../../../../../redux/actions/generic/generic_actions';

import CircularProgress from '@material-ui/core/CircularProgress';

// nodejs library that concatenates classes
import cx from "classnames";
// react component used to create nice image meadia player
import { useHistory, useLocation } from "react-router-dom";
import { ShowMessages } from '../../../../../components/Message/Generic/static_msg'

import Carousel from './Additional/Carousel';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
/* import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem"; */
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import LocalShipping from "@material-ui/icons/LocalShipping";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
/* import Favorite from "@material-ui/icons/Favorite";
 */// core components
// import HeaderLinks from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Header/HeaderLinks.js";
import Parallax from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/views/SectionsPage/Sections/Parallax/ParallaxTransform";

import GridContainer from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Button from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import AccordionFunc from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Accordion/AccordionFunc.js";
import InfoArea from "../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/InfoArea/InfoArea.js";

/* import Tooltip from "@material-ui/core/Tooltip";
 */import LoopSimilarProducts from "./Additional/SimilarProducts"

import productStyle from "../../assets/jss/material-kit-pro-react/views/productStyle";

const useStyles = makeStyles(productStyle);

const Wrapper = styled.div`
width: 100%;
// height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`;



function loopInfoArea({ redux_trnsdetailproduct }) {

  let iconArray = [LocalShipping, VerifiedUser]
  let colorArray = ["info", "success", "rose"]

  return redux_trnsdetailproduct.checked.length > 0 ? redux_trnsdetailproduct.checked.map((eachitem, index) => {

    return <GridItem md={4} sm={4} key={eachitem.referenceID._id}>
      <InfoArea
        key={eachitem.referenceID._id}
        title={eachitem.referenceID.name}
        description={eachitem.referenceID.description}
        icon={iconArray[index]}
        iconColor={colorArray[index]}
        vertical
      />
    </GridItem>
  }) : null

}
export default function ProductPage() {

  const dispatch = useDispatch()
  let reactrouter_history = useHistory()
  let reactrouter = useRouter()
  let reactrouter_location = useLocation()
  // let redux_module = useSelector(state => state[reactrouter.match.params.model])

  let redux_localeuser = useSelector(state => state.user.localeUser)
  let redux_currencyuser = useSelector(state => state.user.currencyUser)
  let redux_productdetail = useSelector(state => state.product.detail)
  let redux_trnsdetailproduct = useSelector(state => state.trnsdetailproduct.detail)
  let redux_current_mysite = useSelector(state => state.mysite.CurrentMysite)

  let redux_cart_user = useSelector(state => state.user.cartUser)
  let redux_overtheme_mysite = useSelector(state => state.mysite.OverthemeMysite)
  const [isTranslationPanel, setTranslationPanel] = useState(null);
  const [isSimilarProducts, setSimilarProducts] = useState(null);


  const [isLocalUser, setLocalUser] = React.useState();
  const [isPrevLocalUser, setPrevLocalUser] = React.useState();

  const [variantOneSelect, setVariantOneSelect] = React.useState(0);
  const [variantTwoSelect, setVariantTwoSelect] = React.useState(0);

  const [isPrevDetail, setPrevDetail] = React.useState();

  const [isPrevLocation, setPrevLocation] = React.useState();

  const [isImages, setImages] = useState([]);

  const [isloading, setIsLoading] = useState(true);

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [xPosition, setXPosition] = useState(0);

  const [showAddToCart, setShowAddToCart] = React.useState(false);
  const classes = useStyles({overtheme: redux_overtheme_mysite});

  /* Cleanup */
  React.useEffect(() => {

    if (reactrouter_history.location.pathname !== reactrouter_location.pathname || isLocalUser !== redux_localeuser) {

      setIsLoading(true)

      setPrevLocation(reactrouter_location)
      setPrevLocalUser(isLocalUser)
      setLocalUser(redux_localeuser)
      setPrevDetail(redux_productdetail)

      if (redux_productdetail && isLocalUser && redux_localeuser !== isLocalUser) {
        reactrouter_history.push(`/detail/product/${redux_productdetail._id}`)
      }

    }

  }, [isLocalUser, reactrouter_history, reactrouter_location, redux_localeuser, redux_productdetail])


  React.useEffect(() => {
    if ((isPrevLocation && (isPrevLocation.pathname !== reactrouter_location.pathname)) || isLocalUser === redux_localeuser) {

      return function cleanup() {

        console.log('cleanup');

        plg_clearProps({ dispatch, model: 'product', actionType: 'detail' })
        plg_clearProps({ dispatch, model: 'product', actionType: 'list' })

      };
    }

  }, [dispatch, isLocalUser, isPrevLocation, reactrouter_location.pathname, redux_localeuser])

  const grabRecalculatedValue = useCallback(async ({value}) => {

    let newValue = {...value}
    let inQuery = {}
    Object.assign(inQuery, {
      country: { "$eq": redux_current_mysite.default_language.referenceID.alpha2Code },
      language: { "$eq": redux_current_mysite.default_language.referenceID.languages[0].iso639_1 },
      lgbinder: { "$eq": value.lgbinder }
    });

    let root_product = await plg_findOne_QueMod({ model: 'product', dispatch, actionType: 'samestate', inQuery, populate: [{ path: 'category' }, { path: 'type' }] })

    let convertedPrice = root_product.payload.price / redux_currencyuser.deflgrates[redux_current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(redux_currencyuser.rates)[0][1]
    let decimalPrice = Math.round((convertedPrice + Number.EPSILON) * 100) / 100

    newValue.price = decimalPrice

    return newValue
  },[dispatch, redux_currencyuser, redux_current_mysite.default_language.referenceID.alpha2Code, redux_current_mysite.default_language.referenceID.currencies, redux_current_mysite.default_language.referenceID.languages])
  // EFFECT - /* find Product */

  const findProduct = useCallback(async () => {


    let inQuery = {}

    Object.assign(inQuery, {
      country: { "$eq": redux_localeuser.referenceID.alpha2Code },
      language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 }
    })


    if (isPrevLocalUser && isPrevDetail) {

      if (isPrevDetail.lgbinder !== '') {

        Object.assign(inQuery, {
          lgbinder: { "$eq": isPrevDetail.lgbinder },
        })
      } else {
        Object.assign(inQuery, {
          _id: { "$eq": isPrevDetail.id },
        })
      }

    } else {


      Object.assign(inQuery, {
        _id: { "$eq": reactrouter.match.params.id },
      })

    }

    // ========================

    let product = await plg_findOne_QueMod({ model: 'product', dispatch, actionType: 'detail', inQuery, populate: [{ path: 'category' }, { path: 'type' }, { path: 'variant_one_taxo' }, { path: 'variant_two_taxo' }] })

  



    if (product.payload) {

      if (redux_current_mysite.default_language.referenceID.alpha2Code !== redux_localeuser.referenceID.alpha2Code) {

        grabRecalculatedValue({ value: product.payload }).then((newValue) =>  {

        dispatch(act_injectProp({ dataToSubmit: newValue, model: 'product', actionType: 'detail' }))
        
        })
  
       } 

      setImages(product.payload.images.map((image) => { return image.secure_url }))

    } else {
      reactrouter_history.push('/store')

    }
    return { product }

  }, [dispatch, grabRecalculatedValue, isPrevDetail, isPrevLocalUser, reactrouter.match.params.id, reactrouter_history, redux_current_mysite.default_language.referenceID.alpha2Code, redux_localeuser.referenceID.alpha2Code, redux_localeuser.referenceID.languages])


  const loadPage = useCallback(async ({ found }) => {

    let inQuery = {}
    Object.assign(inQuery, {
      country: { "$eq": redux_localeuser.referenceID.alpha2Code },
      language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 },
      isdefault: true
    });
    let result_store = await plg_findOne_QueMod({
      model: 'trnsdetailproduct', dispatch, actionType: 'detail', inQuery, populate: [{
        path: 'checked', populate: {
          path: 'referenceID',
          model: 'Slide'
        }
      }]
    })

    let category_array_of_ids
    let type_array_of_ids

    inQuery = {}


    if (found.product.payload.category.length > 0) {
      category_array_of_ids = found.product.payload.category.map((item) => item._id)
      Object.assign(inQuery, { "$and": [{ category: { "$in": category_array_of_ids } }] })
    } else {
      Object.assign(inQuery, { category: { "$eq": [] } })

    }

    if (found.product.payload.type.length > 0) {
      type_array_of_ids = found.product.payload.type.map((item) => item._id)
      Object.assign(inQuery, { "$and": [{ type: { "$in": type_array_of_ids } }] })

    } else {
      Object.assign(inQuery, { type: { "$eq": [] } })

    }


    Object.assign(inQuery, {
      country: { "$eq": redux_localeuser.referenceID.alpha2Code },
      language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 },
      _id: { "$ne": found.product.payload._id },
    });


    let inLimit = 4
    let inSortBy = 'createdAt'
    let inSortOrder = -1
    // inSort inLimit

    let result_similar = await plg_findMany({ model: 'product', dispatch, actionType: 'samestate', inQuery, inLimit, inSortOrder, inSortBy, populate: [{ path: 'category' }, { path: 'type' }] })
    return { result_store: result_store.payload, result_similar: result_similar.payload }

  }, [dispatch, redux_localeuser])

  const PrepareView = useCallback(async () => {

    findProduct().then((found) => {

      if (found.product.payload) {

        loadPage({ found }).then((item) => {
          // setLocalUser(redux_localeuser)
          setTranslationPanel(item.result_store)
          setSimilarProducts(item.result_similar)

          setIsLoading(false)

        })
      }

    })

  }, [findProduct, loadPage])

  React.useEffect(() => {

    if (redux_productdetail === undefined && isloading) {

      if (reactrouter.match.params.id !== undefined) {

        PrepareView()
      }
    }

  }, [PrepareView, isloading, reactrouter.match.params.id, redux_productdetail])



  const images = isImages
  const handleClickPrev = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setXPosition(xPosition + width);
  };
  const handleClicknext = () => {
    if (index === images.length - 1) {
      setIndex(0);
      setXPosition(0);
    } else {
      setIndex(index + 1);
      setXPosition(xPosition - width);
    }
  };


  if (!isloading && redux_productdetail && redux_trnsdetailproduct && isLocalUser === redux_localeuser) {
    return (<div className={classes.productPage}>
      {showAddToCart ? <ShowMessages
        visible={showAddToCart}
        message={isTranslationPanel.addedtocart_msg}
        color='success'
        place='bl'

      /> : null}

      <Parallax
        item={isTranslationPanel}
        filter={isTranslationPanel.image_filter === 'transparent' ? null : isTranslationPanel.image_filter}
        className={classes.pageHeader}
      >
        <div className={classes.container}>
          <GridContainer className={classes.titleRow}>
            <GridItem md={12} className={classes.mlAuto}>
              <Button color="white" className={classes.floatLeft} onClick={() => {
                reactrouter_history.push('/store')
              }}>
                {redux_trnsdetailproduct.back_btn}
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={cx(classes.section)}>
        <div className={classes.container}>
          <div className={cx(classes.main, classes.mainRaised)}>
            <GridContainer>
              <GridItem md={6} sm={6}>
                <Wrapper className="App">
                  <Carousel
                    images={images}
                    setWidth={setWidth}
                    xPosition={xPosition}
                    handleClickPrev={handleClickPrev}
                    handleClicknext={handleClicknext}
                  />
                </Wrapper>
              </GridItem>
              <GridItem md={6} sm={6}>
                <h2 className={classes.title}>{redux_productdetail.name}</h2>
                <h3 className={cx(classes.mainPrice, classes.textMyprimary)} >{redux_productdetail.price}
                   {Object.keys(redux_currencyuser.rates)}</h3>
                <AccordionFunc
                  active={0}
                  activeColor="primary"
                  collapses={[
                    {
                      title: redux_trnsdetailproduct.description_one_nametag,
                      content: (
                        <p>{redux_productdetail.description}
                        </p>
                      )
                    },
                    redux_productdetail.description_two ? {
                      title: redux_trnsdetailproduct.description_two_nametag,
                      content: (
                        <p>{redux_productdetail.description_two}
                        </p>
                      )
                    } : {
                      title: redux_trnsdetailproduct.description_two_nametag,
                      content: null
                    },
                  ]}
                />
                <GridContainer className={classes.pickSize}>
                  {redux_productdetail.variant_one_toggle && redux_productdetail.variant_one_taxo.length > 0 ?
                    <GridItem md={6} sm={6}>
                      <label>{redux_productdetail.variant_one_name}</label>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <Select
                          MenuProps={{
                            className: classes.selectMenu
                          }}
                          classes={{
                            select: classes.select
                          }}
                          value={variantOneSelect}
                          onChange={event => setVariantOneSelect(event.target.value)}
                          inputProps={{
                            name: "variantOneSelect",
                            id: "variant-one-select"
                          }}
                        >{
                            redux_productdetail.variant_one_taxo.map((variantone, index) => {
                              return <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected
                                }}
                                value={index}
                                key={variantone._id}
                              >
                                {variantone.name}
                              </MenuItem>
                            })
                          }
                        </Select>
                      </FormControl>
                    </GridItem> : null}
                  {redux_productdetail.variant_two_toggle && redux_productdetail.variant_two_taxo.length > 0 ?
                    <GridItem md={6} sm={6}>
                      <label>{redux_productdetail.variant_two_name}</label>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <Select
                          MenuProps={{
                            className: classes.selectMenu
                          }}
                          classes={{
                            select: classes.select
                          }}
                          value={variantTwoSelect}
                          onChange={event => setVariantTwoSelect(event.target.value)}
                          inputProps={{
                            name: "variantTwoSelect",
                            id: "variant-two-select"
                          }}
                        >{
                            redux_productdetail.variant_two_taxo.map((varianttwo, index) => {
                              return <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected
                                }}
                                value={index}
                                key={varianttwo._id}
                              >
                                {varianttwo.name}
                              </MenuItem>
                            })
                          }
                        </Select>
                      </FormControl>
                    </GridItem> : null}
                </GridContainer>
                <GridContainer className={classes.pullRight}>
                  <Button
                    color="primary"
                    round
                    style={{
                      opacity: "0.9",
                    }}
                    onClick={async () => {
                      setShowAddToCart(true)
                      setTimeout(() => {
                        setShowAddToCart(false)

                      }, 1000)

                      await productFuncs_handleAddToCart({
                        value: redux_productdetail, variantOneSelect, variantTwoSelect, redux_cart_user, dispatch
                      })


                    }}
                  // className={classes.pullRight}
                  >{redux_trnsdetailproduct.buy_btn} &nbsp; <ShoppingCart />
                  </Button>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
          <div className={cx(classes.features, classes.textCenter)}>
            <GridContainer>
              {loopInfoArea({ redux_trnsdetailproduct })}
            </GridContainer>
          </div>
          <div className={classes.relatedProducts}>
            <h3 className={cx(classes.title, classes.textCenter)}>
              {redux_trnsdetailproduct.similar_product_nametag}
            </h3>
            <GridContainer>
              <LoopSimilarProducts
                isSimilarProducts={isSimilarProducts}
                cb_setLocalUser={(cb_boolean) => {
                  setLocalUser(cb_boolean)

                }}
                cb_setIsLoading={(cb_boolean) => {
                  setIsLoading(cb_boolean)

                }}
              />
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
    )
  } else {
    return (
      <div
        style={{
          //   backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundColor: '#E2E2E2',
          backgroundPosition: " center",
          paddingTop: '25%',
          position: 'fixed',
          left: '0px',
          top: '0px',
          width: '100%',
          height: '100%',
          // zIndex: '9999',
          textAlign: 'center',
        }}
      >
        <CircularProgress style={{ color: '#cccccc' }} thickness={7} />
      </div>
    )
  }

}