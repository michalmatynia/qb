import ProcessRevealWrapper from './ProcessRevealWrapper'

export default  function FuncRevealWrapper(props) {

    try {
        if (props.item.blockstyle.length > 0) {

            if(props.item.blockstyle[0].referenceID[props.revealarray[0]] !== 'None') {

                return  <ProcessRevealWrapper props={props} revealarray={props.revealarray} />
            } else {
                let error = 'error'
                throw error
            }

        } else {
            let error = 'error'
            throw error
        }
    } catch (err) {
        return props.children

    }

}
