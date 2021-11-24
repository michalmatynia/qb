exports.queryhelpers = (schema) => {

    schema.query.populate_loop = function (populate) {
        let cb
        if (populate) {
            populate.map((item, index) => {

                if (index === 0) {
                    cb = this.populate(item)
                }
                else {
                    cb = cb.populate(item)
                }
            }
            )
        } else {
            cb = this
        }

        return cb

    };
}