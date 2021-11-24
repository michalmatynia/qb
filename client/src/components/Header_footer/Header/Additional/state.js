

const header_state = {
    page: [
        {
            name: 'Home',
            link_to: '/',
            public: true
        },
        // {
        //     name: 'Shop',
        //     link_to: '/shop',
        //     public: true
        // }
    ],
    user: [

        {
            name: 'My Account',
            link_to: '/admin/dashboard',
            public: false,
            layout: "/admin",
        },
        {
            name: 'Add Content',
            link_to: '/contentmanager/dashboard',
            public: false,
            layout: "/contentmanager",

        },
        // {
        //     name: 'Creator',
        //     link_to: '/creator',
        //     public: true
        // },
        {
            name: 'Webstore',
            link_to: '/store',
            public: true
        },
        {
            name: 'My Cart',
            link_to: '/user/cart',
            public: true
        },
        {
            name: 'Email',
            link_to: '/contact',
            public: true
        },
        {
            name: 'Log in',
            link_to: '/login_page',
            public: true
        },
        {
            name: 'Log out',
            link_to: '/user/logout',
            public: false
        },
    ],
    localStorage: {
        model: 'page',
        poliglot: true,
        viewparams: {
            limit: 100,
            skip: 0,
            size: 0,
            sortBy: 'position',
            sortOrder: 1,
        },
    }
}

export { header_state }
