import React, { useState} from 'react';

// BACK TO THE ROOTS
export default function SolidFC(props) {
    console.log('ree');
    const { Page } = props

    const [isloading, setIsLoading] = useState(false);


    React.useEffect(() => {


    }, [])
    return (
        !isloading ?  <Page  /> : null
    )


}