import React, { useCallback } from "react";
// nodejs library that concatenates classes

// @material-ui/icons

export default function ProcessSingleImage({image, i, alt='...', parentClassName,  parentStyle }) {

    // console.log(this.props);
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState();
    const [isFileType, setIsFileType] = React.useState();

    React.useEffect(() => {

        async function processImage() {
            if (image.secure_url !== undefined) {

                // is Cloudinary
                setImagePreviewUrl(image.secure_url);
            } else {

                // is Blob
                let reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviewUrl(reader.result);
                };
                reader.readAsDataURL(image);
            }
        }

            processImage()


    }, [image])

    React.useEffect(() => {
        let parsedfiletype

        if ( image) {

            if ('secure_url' in image) {
                if (image.resource_type.includes('video')) { parsedfiletype = 'video' }
                else if (image.resource_type.includes('image')) { parsedfiletype = 'image' }
            } else {
                if (image.type.includes('video')) { parsedfiletype = 'video' }
                else if (image.type.includes('image')) { parsedfiletype = 'image' }
            }
        } else {
            parsedfiletype = 'image'
        }

        setIsFileType(parsedfiletype)
    }, [image])

    const MemoizedWrapper = useCallback(
        () => {

                if (isFileType === 'image' && imagePreviewUrl) {
                    return <img className={parentClassName} key={i}
                    style={{...parentStyle} } src={imagePreviewUrl ? imagePreviewUrl : '/images/image_not_availble.png'} alt={alt} />

                } else if (isFileType === 'video' && imagePreviewUrl) {
                    return <video className={parentClassName} alt={alt} key={i} autoPlay loop muted playsInline
                        style={{
                            ...parentStyle,
                        }}
                    >
                            <source src={imagePreviewUrl} key={i} type="video/mp4" />
                        </video>
                } 

        },
        [alt, i, imagePreviewUrl, isFileType, parentClassName, parentStyle],
    );

    return imagePreviewUrl ? <MemoizedWrapper /> : null

}
