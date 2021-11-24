export async function modelPopulate({ model }) {

    let populate = null

    if (model === 'slide') {
        populate = [{ path: 'category' }]
    } else if (model === 'product') {
        populate = [{ path: 'category' }, { path: 'type' }]
    }
    return populate
}