import React, { useCallback } from "react";
// nodejs library that concatenates classes

// @material-ui/icons

export default function ProcessAsWrapperBG({ list, parentClassName, props, parentStyle }) {

    const [imagePreviewUrl, setImagePreviewUrl] = React.useState();
    const [isFileType, setIsFileType] = React.useState();

    React.useEffect(() => {

        async function processImage() {
            if (list.images[0].secure_url !== undefined) {

                // is Cloudinary
                setImagePreviewUrl(list.images[0].secure_url);
            } else {

                // is Blob
                let reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviewUrl(reader.result);
                };
                reader.readAsDataURL(list.images[0]);
            }
        }

        if (list && list.images.length > 0) {
            processImage()
        } else {
            setImagePreviewUrl(null);
        }

    }, [list])

    React.useEffect(() => {
        let parsedfiletype

        if (list && list.images.length > 0 && imagePreviewUrl) {

            if ('secure_url' in list.images[0]) {
                if (list.images[0].resource_type.includes('video')) { parsedfiletype = 'video' }
                else if (list.images[0].resource_type.includes('image')) { parsedfiletype = 'image' }
            } else {
                if (list.images[0].type.includes('video')) { parsedfiletype = 'video' }
                else if (list.images[0].type.includes('image')) { parsedfiletype = 'image' }
            }
        } else {
            parsedfiletype = 'image'
        }

        setIsFileType(parsedfiletype)
    }, [imagePreviewUrl, list])

    const MemoizedWrapper = useCallback(
        () => {

                if (isFileType === 'image' && imagePreviewUrl) {

                    return <div className={parentClassName}
                        style={{ ...parentStyle, backgroundImage: `url(${imagePreviewUrl})` }}
                    >
                        {props.children}
                    </div>
                } else if (isFileType === 'video' && imagePreviewUrl) {
                    return <div className={parentClassName} style={{...parentStyle}}

                    ><video autoPlay loop muted
                        style={{
                            position: 'absolute', // is used as Card video background
                            width: "100%",
                            height: "100%",
                            flex: "100%",
                            display: "flex",
                            objectFit: "cover", /* over-ride "object-fit: contain" only for webkit as it doesn't honour the ratio */
                        }}
                    >
                            <source src={imagePreviewUrl} type="video/mp4" />
                        </video>
                        {props.children}
                    </div>
                } else {
                    return props.children
                }

        },
        [imagePreviewUrl, isFileType, parentClassName, parentStyle, props.children],
    );

    return imagePreviewUrl ? <MemoizedWrapper /> : null

}
