export async function runPostCreateActionsfromState({ formdata = null, added = null, current = null }) {

    for (let key in formdata) {

        for (let [fillkey, fillval] of Object.entries(formdata[key].fillfields)) {
            if (fillkey === 'value') {
                if (fillval.submitconfig) {
                    if ('onSubmitAction' in fillval.submitconfig) {
                        if ('postCreate' in fillval.submitconfig.onSubmitAction) {
                            if ('affectValue' in fillval.submitconfig.onSubmitAction.postCreate) {
                                added = await fillval.submitconfig.onSubmitAction.postCreate.affectValue.actionA({ cell: { [key]: formdata[key] }, added, current })
                            } else if ('justRun' in fillval.submitconfig.onSubmitAction.postCreate) {
                                await fillval.submitconfig.onSubmitAction.postCreate.justRun.actionA({ cell: { [key]: formdata[key] }, added, current })

                            }
                        }
                    }
                }
            }
        }
    }

    return added

}