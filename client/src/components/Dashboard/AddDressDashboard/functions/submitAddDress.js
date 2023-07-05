import axios from "axios";
import { idGenerator } from '../../../../constants/idGenerator'
import { addProductAction, generateNotification } from "../../../../redux/features/data/dataUser";
import { detectError } from "../../functions/detectError";
// import Compressor from 'compressorjs';

import upperCase from '../../../../functions/upperCase.js'

//------ PROCESS .ENV

const { REACT_APP_API } = process.env

export const submitAddDress = async (setAddSuccess, dataInputs, setResponse, errorDetected, setErrorDetected, uploadFile, getDress, dispatch, setDataInputs, inputs, navigate) => {

    let error = detectError(setErrorDetected, errorDetected, dataInputs)

    setErrorDetected(error)

    if (Object.keys(error).length === 0) {

        setAddSuccess(true)

        // -- Logica de subida de las imagenes

        var imagen;
        var image = [];
        var imageName = [];

        for (const objImage of Object.values(dataInputs.images)) {

            imagen = await uploadFile(objImage)
            image.push(imagen[1])
            imageName.push(imagen[0])
        }

        const user = JSON.parse(window.localStorage.getItem("user"))

        try {
            let resp = await axios.post(`${REACT_APP_API}/product/add`, {
                id_edit: idGenerator(),
                title: upperCase(dataInputs.title),
                content: upperCase(dataInputs.content),
                price: dataInputs.price,
                category: dataInputs.category,
                brand: dataInputs.brand,
                talleAndStock: dataInputs.talleAndStock,
                image,
                imageName
            }, {
                headers: {
                    'x-access-token': user.token
                }
            })
            dispatch(addProductAction(resp.data.data))
            dispatch(generateNotification({ title: resp.data.message, state: "aprob" }))
        } catch (error) {
            dispatch(generateNotification({ title: error.message, state: "alert" }))
        }

        setTimeout(() => {
            setAddSuccess(false)
            setDataInputs(inputs)
            navigate('/dashboard/manage-dress')
        }, 3000);
    } else {
        // setErrorDetected({ ...detectError() })
    }
}