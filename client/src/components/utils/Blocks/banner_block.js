import React from 'react'
import Slider from 'react-slick';
import Banner from './banner';

const BannerBlock = (props) => {
    
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
}


const renderSlides = () => (
    props.list ?
        props.list.map((slide, i) => (
            <Banner
            key={i}
            {...slide}
             />
        ))
        : null
)

    return (
        <div className="featured_container">
            <Slider {...settings}>
                {renderSlides()}
            </Slider>

        </div>
    ); 
}

export default BannerBlock;


