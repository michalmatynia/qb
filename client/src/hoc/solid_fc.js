import React, { useState} from 'react';
import { useRouter } from "../hoc/Funcs/hook_funcs";

// BACK TO THE ROOTS
export default function SolidFC(props) {
    let reactrouter = useRouter()

    const { Page } = props

    const [isloading, setIsLoading] = useState(false);


    React.useEffect(() => {


    }, [])
    return (
        !isloading ?  <Page  {...reactrouter} /> : null
    )


}