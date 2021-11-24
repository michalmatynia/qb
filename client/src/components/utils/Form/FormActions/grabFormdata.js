import { runPattern } from '../../../User/Admin/GenericCompos/format_table'
import {
    plg_uploadFile_Cloudinary_v2,
} from '../../../utils/Plugs/cms_plugs'

export async function grabFormdata_v2({ formdata = null, myprops = null, dispatch = null, current = null }) {

    let dataToSubmit = {};

    for (let key in formdata) {

        for (let [fillkey, fillval] of Object.entries(formdata[key].fillfields)) {

            if (fillkey === 'value') {

                if (formdata[key].inputprops.type === 'file' && formdata[key].value.length > 0) {

                    for (let eachfile of formdata[key].value) {

                        if (eachfile.secure_url === undefined) {
                            let fileFormData = new FormData();

                            fileFormData.append("file", eachfile);

                            /* When form goes from Add Form */

                            if (formdata[key].config.uploadparams) {
                                fileFormData.append("folder", formdata[key].config.uploadparams.folder);
                                fileFormData.append("height", formdata[key].config.uploadparams.height);
                                fileFormData.append("width", formdata[key].config.uploadparams.width);
                                fileFormData.append("crop", formdata[key].config.uploadparams.crop);
                            }

                            let uploaddefaultsize = myprops.mysite.CurrentMysite.files_upload_default_size
                            let uploadsizeheight = myprops.mysite.CurrentMysite.files_upload_height
                            let uploadsizewidth = myprops.mysite.CurrentMysite.files_upload_width

                            let uploadedCloud = await plg_uploadFile_Cloudinary_v2({
                                dispatch,
                                folder: formdata[key].config.folder,
                                actionType: 'samestate',
                                myprops,
                                fileFormData,
                                uploaddefaultsize,
                                uploadsizeheight,
                                uploadsizewidth
                            })

                            formdata[key].value.push(uploadedCloud.payload)
                            formdata[key].value = formdata[key].value.filter((el) => {
                                return el !== eachfile
                            });
                        }
                    }

                    dataToSubmit[key] = formdata[key].value;

                } else if (fillval.submitconfig) {
                    let finalResult
                    if ('parentindex' in fillval.submitconfig) {
                        finalResult = formdata[key].value[fillval.submitconfig.parentindex]
                    } else {
                        finalResult = formdata[key].value
                    }

                    dataToSubmit[key] = runPattern({ column: fillval.submitconfig, item: finalResult })

                    if ('onSubmitAction' in fillval.submitconfig) {
                        if ('preCreate' in fillval.submitconfig.onSubmitAction) {
                            if ('affectValue' in fillval.submitconfig.onSubmitAction.preCreate) {
                                dataToSubmit[key] = await fillval.submitconfig.onSubmitAction.preCreate.affectValue.actionA({ cell: { [key]: formdata[key] }, current })
                            } else if ('justRun' in fillval.submitconfig.onSubmitAction.preCreate) {
                                await fillval.submitconfig.onSubmitAction.preCreate.justRun.actionA({ cell: { [key]: formdata[key] }, current })
                            } else if ('customReturn' in fillval.submitconfig.onSubmitAction.preCreate) {
                                dataToSubmit = await fillval.submitconfig.onSubmitAction.preCreate.customReturn.actionA({ cell: { [key]: formdata[key] }, current })
                            }
                        }
                    }

                } else {
                    dataToSubmit[key] = formdata[key].value;
                }
            }
        }

    }
    return dataToSubmit;
}

