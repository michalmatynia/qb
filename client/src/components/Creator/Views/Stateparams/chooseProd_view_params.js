import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';


const viewparams = {
    limit: 5,
    skip: 0,
    size: 0,
    sortBy: 'position',
    sortOrder: 1,
    search: {
        element: 'input',
        value: '',
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
                    {/* <SearchIcon className={classes.inputIconsColor} /> */}
                    <SearchIcon />
                </InputAdornment>
            ),
            onBlur: (event) => this.onSearch({
                event,
                cell: { search: this.state.localStorage.sublist.viewparams.search },
                blur: true
            })
        },
        configparams: {
            showlabel: false,
            showhelpertext: false,
            showfield: true,
        },
        config: {
            label: 'Search',
            valuetype: 'string',
            helpertext: 'Enter text for Search',
            autocomplete: 'Off',
        },
        validation: {
            parse: false,
            // type: ['required'],
            message: ''
        },
        range: ['name', 'description'],
        depth: [],
        valid: false,
        touched: false,
    },
}

export { viewparams }
