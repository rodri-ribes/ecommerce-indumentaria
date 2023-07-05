
//------ Imports

import axios from "axios"
import { deleteFile, uploadFile } from '../../../../firebase/config'
import Compressor from 'compressorjs';

//------ functions

import { detectErrorUser } from "./detectErrorUser"
import { generateNotification, updateUserAction } from "../../../../redux/features/data/dataUser"
import upperCase from "../../../../functions/upperCase"

//------ PROCESS .ENV

const { REACT_APP_API } = process.env

export const updateUser = async (setActiveEdit, data, dispatch, userState, setError) => {

    let { firstname, lastname, direccion, localidad, provincia, codigo_postal, email, whatsapp } = data

    let domicilio = {
        direccion,
        localidad: upperCase(localidad),
        provincia: upperCase(provincia),
        codigo_postal
    }

    let user = JSON.parse(window.localStorage.getItem("user"))

    //solo se hara el patch si hubo una modificacion

    if (
        firstname !== userState?.firstname ||
        lastname !== userState?.lastname ||
        direccion !== userState?.domicilio?.direccion ||
        localidad !== userState?.domicilio?.localidad ||
        provincia !== userState?.domicilio?.provincia ||
        codigo_postal !== userState?.domicilio?.codigo_postal ||
        email !== userState?.email ||
        whatsapp !== userState?.whatsapp
    ) {
        //validamos si hay errores

        let error = detectErrorUser(data)
        setError(error)

        if (Object.keys(error)?.length === 0) {
            setActiveEdit(false)
            try {
                let resp = await axios.patch(REACT_APP_API + '/user/update', {
                    firstname: upperCase(firstname),
                    lastname: upperCase(lastname),
                    domicilio,
                    codigo_postal,
                    email,
                    whatsapp
                }, {
                    headers: {
                        'x-access-token': user.token
                    }
                })
                dispatch(generateNotification({ title: resp.data.message, state: "aprob" }))
                dispatch(updateUserAction(resp.data.userUpdate))
            } catch (error) {
                dispatch(generateNotification({ title: error.message, state: "alert" }))
            }
        }
    }
}

export const updatePassword = async (password, dispatch, setActiveEditPassword) => {

    let user = JSON.parse(window.localStorage.getItem("user"))

    let { oldPassword, newPassword } = password

    try {
        let resp = await axios.patch(REACT_APP_API + '/user/updatepassword', {
            oldPassword, newPassword
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
        setActiveEditPassword(false)
        dispatch(generateNotification({ title: resp.data.message, state: "aprob" }))

    } catch (error) {
        dispatch(generateNotification({ title: error.response.data, state: "alert" }))
    }
}

export const updateImage = async (user, upload, dispatch, setUpload) => {

    setUpload(prev => ({ ...prev, show: false }))

    let userr = JSON.parse(window.localStorage.getItem("user"))

    //se borra la imagen anterior, si es que hay
    if (user?.imageName) {
        try {
            await deleteFile(user?.imageName)
        } catch (error) {
            console.log(error)
        }
    }

    new Compressor(upload.img, {
        quality: 0.6,

        async success(result) {

            let resp = await uploadFile(result)

            let image = resp[1]
            let imageName = resp[0]

            try {
                let resp = await axios.patch(REACT_APP_API + '/user/update', {
                    image, imageName
                }, {
                    headers: {
                        'x-access-token': userr.token
                    }
                })
                dispatch(updateUserAction(resp.data.userUpdate))
                dispatch(generateNotification({ title: resp.data.message, state: "aprob" }))
            } catch (error) {
                dispatch(generateNotification({ title: error.response.data, state: "alert" }))
            }
        },
        error(err) {
            console.log(err.message);
        },
    });
}