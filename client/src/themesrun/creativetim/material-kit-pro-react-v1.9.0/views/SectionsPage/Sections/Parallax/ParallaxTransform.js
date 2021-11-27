import React from "react";
// nodejs library that concatenates classes
import cx from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import styles from "../../../../assets/jss/material-kit-pro-react/components/parallaxStyle.js";

const useStyles = makeStyles(styles);
// =============Functional Component noCallback

export default function Parallax(props) {
  

  const [isFileType, setIsFileType] = React.useState();
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState();

  const { filter, className, children, style, small } = props;
  const classes = useStyles();
  const parallaxClasses = cx({
    [classes.parallax]: true,
    [classes[filter + "Color"]]: filter !== undefined,
    [classes.small]: small,
    [className]: className !== undefined,
  });

  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );

  React.useEffect(() => {

    async function processImage() {
        if (props.item.images[0].secure_url !== undefined) {

            // is Cloudinary
            setImagePreviewUrl(props.item.images[0].secure_url);
        } else {

            // is Blob
            let reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(props.item.images[0]);
        }
    }

    if (props.item && props.item.images.length > 0) {
        processImage()
    } else {
        setImagePreviewUrl(null);
    }

}, [props.item])

  React.useEffect(() => {
    let parsedfiletype

    if (props.item && props.item.images.length > 0) {

      if ('secure_url' in props.item.images[0]) {
        if (props.item.images[0].resource_type.includes('video')) { parsedfiletype = 'video' }
        else if (props.item.images[0].resource_type.includes('image')) { parsedfiletype = 'image' }
      } else {
        if (props.item.images[0].type.includes('video')) { parsedfiletype = 'video' }
        else if (props.item.images[0].type.includes('image')) { parsedfiletype = 'image' }
      }
    } else {
      parsedfiletype = 'image'
    }

    setIsFileType(parsedfiletype)
  }, [props.item])

  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };
  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });

  // ==== Normal Function 

function renderOutput() {

  let parallaximage = imagePreviewUrl  ? imagePreviewUrl : '/images/image_not_availble.png'

    if (isFileType === 'image' && imagePreviewUrl) {
        return <div
        className={parallaxClasses}
        style={{
          ...style,
          backgroundImage: "url(" + parallaximage + ")",
          transform: transform,
        }}
      > {children}
      </div> 
      } else if (isFileType === 'video' && imagePreviewUrl) {
        return <div
          className={parallaxClasses}
          style={{
            ...style,
            transform: transform,
          }}
        ><video autoPlay loop muted
            style={{
              position: 'absolute',
              height: "100%",
              width: "100%",
              flex: "100%",
              objectFit: "cover", /* over-ride "object-fit: contain" only for webkit as it doesn't honour the ratio */
            }}
          >
            <source src={parallaximage} type="video/mp4" />
          </video>
          {children}
        </div>
      } 

  }
return imagePreviewUrl ? renderOutput() : null

}

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.oneOf([
    "primary",
    "rose",
    "dark",
    "info",
    "success",
    "warning",
    "danger",
  ]),
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool,
};
