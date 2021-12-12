import React, { useState} from 'react';

// BACK TO THE ROOTS
export default function SolidFC(props) {
    const { Page } = props

    const [isloading, setIsLoading] = useState(true);


    React.useEffect(() => {


    }, [])
    return (
        !isloading ?  <Page  /> : null
    )


}