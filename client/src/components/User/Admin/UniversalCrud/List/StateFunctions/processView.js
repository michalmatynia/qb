import {
    Search,
} from '@material-ui/icons';
import InputAdornment from "@material-ui/core/InputAdornment";

export async function processViewParams({
    reactrouter,
}) {

    let viewparams = {
        limit: 10,
        skip: 0,
        size: 10,
        sortBy: 'position',
        sortOrder: 1,
        search: {
            element: 'input',
            category: 'ct_custominput',
            value: '',
            wrapcompos: {
                griditem: {
                    xs: 12,
                    xm: 4,
                    md: 4,
                },
            },
            formcontrolprops: {
                fullWidth: true,
            },
            inputprops: {
                id: 'search',
                type: 'text',
                name: 'search_input',
                placeholder: 'Search...',
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
                /* When field Loses Focus */
                // onBlur: ({ event, cell, value }) => onSearch({
                //     event,
                //     // cell: { search: this.isViewparams.search },
                //     blur: true
                // })

            },
            configparams: {
                showlabel: false,
                showhelpertext: false

            },
            config: {
                label: 'Search',
                valuetype: 'string',
                helpertext: 'Enter text for Search',
                autocomplete: 'Off',
            },
            validation: {
                parse: false,
                // type: ['required']
            },
            range: ['name', 'description'],
            depth: [],
            valid: false,
            touched: false,

        },
    }

    if (reactrouter.match.params.model === 'visit') {
        viewparams.sortBy = 'createdAt'
    }

    if (
        reactrouter.match.params.model === 'mystore'
        || reactrouter.match.params.model === 'cart'
        || reactrouter.match.params.model === 'contact'
    ) {
        viewparams.search.range = ['name']
    }

    return viewparams
}
