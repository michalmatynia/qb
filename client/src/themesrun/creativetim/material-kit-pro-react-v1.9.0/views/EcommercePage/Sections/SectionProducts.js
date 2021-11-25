import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  useRouter,
} from "../../../../../../hoc/Funcs/hook_funcs";
// nodejs library that concatenates classes
import classNames from "classnames";
// plugin that creates slider
import Slider from "nouislider";

import {
  productFuncs_handleAddToCart
} from "../../../../../../components/User/Admin/GenericFuncs/product_funcs_vh"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from '@material-ui/core/CircularProgress';

// @material-ui icons
// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

// core components
import AccordionFunc from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Accordion/AccordionFunc.js";

import GridContainer from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import Card from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardHeader.js";
import CardBody from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import CardFooter from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardFooter.js";
import Button from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";

import styles from "../../../../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/productStyle.js";
import { useSelector, useDispatch } from 'react-redux'
import {
  plg_findMany,
  // plg_findOne_QueMod,
  // plg_clearProps
} from '../../../../../../components/utils/Plugs/cms_plugs';

import {
  act_injectProp,
} from '../../../../../../redux/actions/generic/generic_actions';


import { actionFuncs_recalculatePrice_v2 } from '../../../../../../components/User/Admin/ActionFunctions/recalculatePrice'

const useStyles = makeStyles(styles);

export default function SectionProducts({ mystore, toggleCartMsg }) {
  let reactrouter = useRouter()
  let reactrouter_history = useHistory()
  let reactrouter_location = useLocation()

  const fc_state = {
    localStorage: {
      viewparams: {
        limit: 6,
        skip: 0,
        size: 0,
        sortBy: 'position',
        sortOrder: 1,
      },
    }
  }

  const [myFcState, setFcState] = React.useState(fc_state);

  let product_list = useSelector(state => state.product.list)
  const [viewingList, setViewingList] = React.useState([]);

  // let taxonomy_list = useSelector(state => state.taxonomy.list)
  // let reduxprops = useSelector(state => state)
  let localeuser = useSelector(state => state.user.localeUser)
  let currencyuser = useSelector(state => state.user.currencyUser)
  let redux_cart_user = useSelector(state => state.user.cartUser)
  let current_mysite = useSelector(state => state.mysite.CurrentMysite)
  const dispatch = useDispatch()

  const [categoryTaxo, setCategoryTaxo] = React.useState(null);
  const [typeTaxo, setTypeTaxo] = React.useState(null);
  const [checkedCategoryTaxo, setCheckedCategoryTaxo] = React.useState([]);
  const [checkedTypeTaxo, setCheckedTypeTaxo] = React.useState([]);
  const [showAddToCart, setShowAddToCart] = React.useState(false);

  const [priceRange, setPriceRange] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {

    if (current_mysite.default_language.referenceID._id !== localeuser.referenceID._id
      && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
    ) {

      setPriceRange(null)
      setCheckedCategoryTaxo([])
      setCheckedTypeTaxo([])
    }
    // return function cleanup() { plg_clearProps({ dispatch, model: 'product', actionType: 'list' }) };

  }, [currencyuser, current_mysite, dispatch, localeuser])

  React.useEffect(() => {

    async function loadProducts() {

      let inQuery = {}

      if (current_mysite.default_language.referenceID.alpha2Code !== localeuser.referenceID.alpha2Code
      ) {


        Object.assign(inQuery, {
          country: { "$eq": current_mysite.default_language.referenceID.alpha2Code },
          language: { "$eq": current_mysite.default_language.referenceID.languages[0].iso639_1 },
          visible: true,
        });

        let root_products = await plg_findMany({ model: 'product', dispatch, actionType: 'samestate', inQuery })

        let priceArray = root_products.payload.map(a => a.price)
        const price_min = Math.min(...priceArray)
        const price_max = Math.max(...priceArray)

        let converted_price_min = price_min / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
        let converted_price_max = price_max / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
        setPriceRange([Math.floor(converted_price_min), Math.round(converted_price_max)])

        let result = await actionFuncs_recalculatePrice_v2({ root_products, dispatch, current_mysite, currencyuser, localeuser })

        // ======= SET TAXONOMY ========
        let category_taxo_array = []
        for (let eachproduct of result.recalculated_list) {

          if (eachproduct.category.length > 0) {

            for (let catvalue of eachproduct.category) {

              let dupe = category_taxo_array.find(eachcato => eachcato._id === catvalue._id)

              if (!dupe) {
                category_taxo_array.push(catvalue)
              }

            }
          }
        }

        let type_taxo_array = []
        for (let eachproduct of result.recalculated_list) {

          if (eachproduct.type.length > 0) {

            for (let typevalue of eachproduct.type) {

              let dupe = type_taxo_array.find(eachcato => eachcato._id === typevalue._id)

              if (!dupe) {
                type_taxo_array.push(typevalue)
              }
            }
          }
        }

        setCategoryTaxo(category_taxo_array)
        setTypeTaxo(type_taxo_array)

        // ==========
        setViewingList(result.recalculated_list)
         dispatch(act_injectProp({ dataToSubmit: result.recalculated_list, model: 'product', actionType: 'list' }))

        // await plg_clearProps({ myprops: this.props, model: 'user', actionType: 'cart' })

      } else {

        Object.assign(inQuery, {
          country: { "$eq": localeuser.referenceID.alpha2Code },
          language: { "$eq": localeuser.referenceID.languages[0].iso639_1 },
          visible: true,
        });

        let result_products = await plg_findMany({ model: 'product', dispatch, actionType: 'list', inQuery, populate: [{ path: 'category' }, { path: 'type' }] })

        // Viewparams and limits have to be carried out on a SUM array of products

        let priceArray = result_products.payload.map(a => a.price)
        const price_min = Math.min(...priceArray)
        const price_max = Math.max(...priceArray)

        // ======= SET TAXONOMY ========

        let category_taxo_array = []
        for (let eachproduct of result_products.payload) {

          if (eachproduct.category.length > 0) {

            for (let catvalue of eachproduct.category) {

              let dupe = category_taxo_array.find(eachcato => eachcato._id === catvalue._id)

              if (!dupe) {
                category_taxo_array.push(catvalue)
              }

            }
          }
        }

        let type_taxo_array = []
        for (let eachproduct of result_products.payload) {

          if (eachproduct.type.length > 0) {

            for (let typevalue of eachproduct.type) {

              let dupe = type_taxo_array.find(eachcato => eachcato._id === typevalue._id)

              if (!dupe) {
                type_taxo_array.push(typevalue)
              }
            }
          }
        }

        setCategoryTaxo(category_taxo_array)
        setTypeTaxo(type_taxo_array)
        // ======
        setViewingList(result_products.payload)

        setPriceRange([Math.floor(price_min), Math.round(price_max)])

      }

    }

    // RUN FUNCTION
    if (!priceRange
      && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]

    ) {

      setIsLoading(true)
      loadProducts()
      setIsLoading(false)

    }
  }, [dispatch, currencyuser, localeuser, current_mysite, priceRange])


  React.useEffect(() => {

    async function refineProducts({ left_price, right_price }) {

      let newViewingList = []

      newViewingList = product_list.reduce((accum, currentValue, CurrentIndex) => {

        // Reduce on Price Range

        if (currentValue.price >= left_price && currentValue.price <= right_price) {

          let cat_bool = true
          let type_bool = true

          if (checkedCategoryTaxo.length > 0) {
            // cat_bool = false
            let cv_extracted_ids = currentValue.category.map(item => item._id)

            for (let eachCatValue of checkedCategoryTaxo) {

              if (!cv_extracted_ids.includes(eachCatValue._id)) {
                cat_bool = false
              }
            }
          }

          if (checkedTypeTaxo.length > 0) {
            // cat_bool = false
            let cv_extracted_ids = currentValue.type.map(item => item._id)

            for (let eachTypeValue of checkedTypeTaxo) {

              if (!cv_extracted_ids.includes(eachTypeValue._id)) {
                type_bool = false
              }
            }
          }

          if (cat_bool && type_bool) {
            accum = [...accum, currentValue]

          } else {
            accum = [...accum]
          }

        } else { accum = [...accum] }

        // Category Taxonomy

        return accum

      }, []);


      if (myFcState.localStorage.viewparams.sortOrder === 1) {
        newViewingList.sort(function (a, b) {
          return a[myFcState.localStorage.viewparams.sortBy] - b[myFcState.localStorage.viewparams.sortBy];
        });
      } else {
        newViewingList.sort(function (a, b) {
          return b[myFcState.localStorage.viewparams.sortBy] - a[myFcState.localStorage.viewparams.sortBy];
        });
      }
      newViewingList = newViewingList.slice(0, myFcState.localStorage.viewparams.limit)

      setViewingList(newViewingList)

    }

    if (document
      .getElementById("sliderRegular")
      .classList.contains("noUi-target")
      && priceRange
      && product_list
      && localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]

    ) {
      refineProducts({ left_price: priceRange[0], right_price: priceRange[1] })

    }
  }, [checkedCategoryTaxo, checkedTypeTaxo, currencyuser, current_mysite, localeuser, myFcState, priceRange, product_list])


  React.useEffect(() => {
    if (
      !document
        .getElementById("sliderRegular")
        .classList.contains("noUi-target")
      && priceRange
    ) {
      Slider.create(document.getElementById("sliderRegular"), {
        start: [priceRange[0], priceRange[1]],
        connect: true,
        range: { min: priceRange[0], max: priceRange[1] },
        step: 1,
      }).on("update", async function (values) {

        await setPriceRange([Math.floor(values[0]), Math.round(values[1])])

      });
    }

    // return function cleanup() { plg_clearProps({ dispatch, model: 'product', actionType: 'list' }) };
  }, [current_mysite, localeuser, priceRange, product_list]);

  // ================
  async function gotoProductDetail({ value }) {
    reactrouter_history.push(`/detail/product/${value._id}`)

  }
 


  function FCGridItem({ value, i }) {

    // <h6 className={classes.cardCategory}>{'price' in value.referenceID ? value.referenceID.price + ' ' + Object.keys(reduxprops.user.currencyUser.rates) : null} </h6>

    const classes = useStyles();

    let render = () => {
      return <GridItem md={4} sm={4}>
        <Card plain product >
          <CardHeader noShadow image className={classes.cardHoverScale}>
          <div  
              onClick={() => gotoProductDetail({ value })}
              >
              <img src={value.images.length > 0 ? value.images[0].secure_url : '/images/image_not_availble.png'} alt=".." />
            </div>
          </CardHeader>
          <CardBody plain>
            <a href="#pablo">
              <h4 className={classes.cardTitle}>{value.name}</h4>
            </a>
            <p className={classes.description}>
              {value.description}
            </p>
          </CardBody>
          <CardFooter plain className={classes.justifyContentBetween}>
            <div className={classes.priceContainer}>
              <span className={classes.price}> {Object.keys(currencyuser.rates)} {value.price}</span>
            </div>
            <Button
                      color="transparent"
                      style={{
                        opacity: "0.9",
                      }}
                      onClick={async () => {

                        toggleCartMsg({ visible: true })

          await productFuncs_handleAddToCart({
                          value, redux_cart_user, dispatch
                        })


                      }}
                    className={classes.pullRight}
                    > <ShoppingCart />
                    </Button>
                        <Button
              color="primary"
              size="sm"
              style={{
                opacity: "0.9",
              }}
              onClick={() => gotoProductDetail({ value })}
              className={classes.pullRight}
            >
              {mystore.view_btn}
            </Button>

            {/* <Tooltip
              id="tooltip-top"
              title="Saved to Wishlist"
              placement="left"
              classes={{ tooltip: classes.tooltip }}
            >
              <Button
                justIcon
                simple
                color="rose"
                // className={classes.pullRight}
              >
                <Favorite />
              </Button>
            </Tooltip> */}
          </CardFooter>
        </Card>
      </GridItem>

    }

    if (isLoading) {
      return (
        <div
          style={{
            //   backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            // backgroundColor: '#595959',
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
    } else if (!isLoading) {
      return render()
    }

  }
  // ================
  function loopProducts() {

    return viewingList.length > 0 ? viewingList.map((value, i) => {
      return <FCGridItem
        value={value}
        i={i}
        key={value._id}
      />
    }) : null

  }

  function FCTaxonomyListOne({ value, i, togglefunction, sumofchecked }) {

    const classes = useStyles();

    let render = () => {
      return <FormControlLabel
        control={
          <Checkbox
            // id={value._id}

            disableRipple
            tabIndex={-1}
            onClick={() => togglefunction()}
            checked={
              sumofchecked.find((chvalue) => chvalue._id === value._id) === value ? true : false
            }
            classes={{
              checked: classes.checked,
              root: classes.checkRoot,
            }}
          />
        }
        classes={{ label: classes.label }}
        label={value.name}
      />
    }
    if (isLoading) {
      return (
        <div
          style={{
            //   backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            // backgroundColor: '#595959',
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
    } else if (!isLoading) {
      return render()
    }
  }

  function loopColumnOne() {

    return categoryTaxo ? categoryTaxo.map((value, i) => {
      return <FCTaxonomyListOne
        value={value}
        i={i}
        key={value._id}
        togglefunction={() => handleToggleCategory({ value, i })}
        sumofchecked={checkedCategoryTaxo}
      />
    }) : null
  }


  function loopColumnTwo() {

    return typeTaxo ? typeTaxo.map((value, i) => {
      return <FCTaxonomyListOne
        value={value}
        i={i}
        key={value._id}
        togglefunction={() => handleToggleType({ value, i })}
        sumofchecked={checkedTypeTaxo}

      />
    }) : null
  }

  // const handleToggle = ({ value, i }) => {


  //   console.log(value);
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];
  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setChecked(newChecked);
  // };


  const handleLoadMore = () => {

    let newMyFcState = { ...myFcState }

    newMyFcState.localStorage.viewparams.limit = myFcState.localStorage.viewparams.limit + 6

    setFcState(newMyFcState)

  }
  const handleToggleCategory = ({ value, i }) => {

    const currentIndex = checkedCategoryTaxo.indexOf(value)
    const newChecked = [...checkedCategoryTaxo];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedCategoryTaxo(newChecked);
  };
  const handleToggleType = ({ value, i }) => {

    const currentIndex = checkedTypeTaxo.indexOf(value)
    const newChecked = [...checkedTypeTaxo];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedTypeTaxo(newChecked);
  };

  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <h2>{mystore.title}</h2>
        <GridContainer>
          <GridItem md={3} sm={3}>
            <Card plain>
              <CardBody className={classes.cardBodyRefine}>

                {/* Here should be a SEARCH FIELD */}
                {/* <h4 className={classes.cardTitle + " " + classes.textLeft}>
                  Refine
                  <Tooltip
                    id="tooltip-top"
                    title="Reset Filter"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      link
                      justIcon
                      size="sm"
                      className={classes.pullRight + " " + classes.refineButton}
                    >
                      <Cached />
                    </Button>
                  </Tooltip>
                  <Clearfix />
                </h4> */}
                <AccordionFunc
                  active={[0, 2]}
                  activeColor="primary"
                  collapses={[
                    {
                      title: mystore.pricerange_nametag,
                      content: (
                        <CardBody className={classes.cardBodyRefine}>
                          <span
                            className={classNames(
                              classes.pullLeft,
                              classes.priceSlider
                            )}
                          >
                            {Object.keys(currencyuser.rates)} {priceRange ? priceRange[0] : null}
                          </span>
                          <span
                            className={classNames(
                              classes.pullRight,
                              classes.priceSlider
                            )}
                          >
                            {Object.keys(currencyuser.rates)} {priceRange ? priceRange[1] : null}
                          </span>
                          <br />
                          <br />
                          <div id="sliderRegular" className="slider-gray" />
                        </CardBody>
                      ),
                    },
                    {
                      title: mystore.column_one_nametag,
                      content: (
                        <div className={classes.customExpandPanel}>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            {loopColumnOne()}
                          </div>
                        </div>
                      ),
                    },
                    {
                      title: mystore.column_two_nametag,
                      content: (
                        <div className={classes.customExpandPanel}>
                          <div
                            className={
                              classes.checkboxAndRadio +
                              " " +
                              classes.checkboxAndRadioHorizontal
                            }
                          >
                            {loopColumnTwo()}
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={9} sm={9}>
            <GridContainer>
              {loopProducts()}
            </GridContainer>
            <GridItem
              md={6}
              sm={6}
              className={classNames(classes.mlAuto, classes.mrAuto)}
            >
              {viewingList.length > 0 && viewingList.length >= myFcState.localStorage.viewparams.limit ? <Button
                color="primary"
                onClick={() => handleLoadMore()}
              >
                {mystore.loadmore_btn}
              </Button> : null}
            </GridItem>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
