import {
    resolvePath,
} from '../../../utils/Funcs/basefuncs'

export function runPattern({ column = null, item, indicator = null }) {

    let showthis = null
    let input = item

    if (!indicator && column.indicator !== undefined) {
        indicator = column.indicator
    } else if (!indicator) {
        indicator = null
    }


    if (column) {

        if ('leftpath' in column && 'rightpath' in column) {

            if (indicator) {
                showthis = resolvePath({ object: input, path: column.leftpath + '.' + [indicator] + '.' + column.rightpath })

            } else {
                showthis = resolvePath({ object: input, path: column.leftpath + '.' + column.rightpath })
            }
        } else if ('leftpath' in column) {

            if (indicator) {
                showthis = resolvePath({ object: input, path: column.leftpath + '.' + [indicator] })
            } else {
                showthis = resolvePath({ object: input, path: column.leftpath })
            }

            // LEFTPATH

        } else if ('rightpath' in column) {
            // RIGHT

            if (indicator) {
                showthis = resolvePath({ object: input, path: [indicator] + '.' + column.rightpath })
            } else {
                showthis = resolvePath({ object: input, path: column.rightpath })
            }
        } else {

            if (indicator || column.indicator !== undefined) {

                showthis = input[indicator]

            } else {
                showthis = input
            }

        }

    } else {

        if (indicator) {
            showthis = input[indicator]

        } else {
            showthis = input
        }

    }

    return showthis
}
