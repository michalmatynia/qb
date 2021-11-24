import React, { useCallback } from "react";
// nodejs library that concatenates classes


export default function ProcessImage({ list }) {

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

        if (list.images.length > 0) {
            processImage()
        } else {
            setImagePreviewUrl(null);
        }

    }, [list.images])

    React.useEffect(() => {
        let parsedfiletype

        if (list.images.length > 0 && imagePreviewUrl) {

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
    }, [imagePreviewUrl, list.images])



    const MemoizedWrapper = useCallback(
        (props) => {


            if (isFileType === 'image') {

                return <img onClick={()=>{console.log('rr');}} src={imagePreviewUrl ? imagePreviewUrl : '/images/image_not_availble.png'} alt="..." />

            } else if (isFileType === 'video') {
                return <video autoPlay loop muted
                     >
                        <source src={imagePreviewUrl ? imagePreviewUrl : null} type="video/mp4" />
                    </video>
            } else {
                return null
            }
        },
        [imagePreviewUrl, isFileType],
    );




    return <MemoizedWrapper/>

}
