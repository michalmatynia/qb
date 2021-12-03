export default function PriceSlider ({ mystore, toggleCartMsg }) {


    React.useEffect(() => {

        if (!isLoading) {
          if (
            !document
              .getElementById("sliderRegular")
              .classList.contains("noUi-target")
          ) {
    
            console.log('slider create');
    
            Slider.create(document.getElementById("sliderRegular"), {
              start: [priceRange[0], priceRange[1]],
              connect: true,
              range: { min: priceRange[0], max: priceRange[1] },
              step: 1,
            }).on("update", async function (values) {
    
              setPriceRange([Math.floor(values[0]), Math.round(values[1])])
    
            });
          }
        }
      }, [isLoading, priceRange]);







    <CardBody className={classes.cardBodyRefine}>
    <span
      className={cx(
        classes.pullLeft,
        classes.priceSlider
      )}
    >
      {Object.keys(currencyuser.rates)} {priceRange ? priceRange[0] : null}
    </span>
    <span
      className={cx(
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


}