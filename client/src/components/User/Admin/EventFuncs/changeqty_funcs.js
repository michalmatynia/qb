export async function changeqty_qtyInForm({ event, cell = null, value = null, mystate = null, direction = null, myprops = null, poliglot = null }) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {
        let cellkey = null
        let cellvalue = null

        if (cell) {
            // This is where parts of state are Evaluated

            cellkey = Object.keys(cell)[0]
            cellvalue = Object.values(cell)[0]

            newLocalStorage.form.formdata[cellkey] = cellvalue
        }

        let oldChecked = [...cellvalue.value]

        let currentIndex = oldChecked.indexOf(value)

        if (newLocalStorage.form.formdata[cellkey].value[currentIndex].quantity + direction <= 0) {
            newLocalStorage.form.formdata[cellkey].value[currentIndex].quantity = 0
          } else {
            newLocalStorage.form.formdata[cellkey].value[currentIndex].quantity = newLocalStorage.form.formdata[cellkey].value[currentIndex].quantity + direction
      
          }
    }

    return newLocalStorage

}