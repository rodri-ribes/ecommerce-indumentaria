import axios from "axios"

//------ PROCESS .ENV
const { REACT_APP_API } = process.env

export const loadInputs = (dress, setDataInputs, id) => {

    let dressAux = dress.filter(p => p?.id_edit === id)
    setDataInputs({
        title: dressAux[0]?.title,
        content: dressAux[0]?.content,
        brand: dressAux[0]?.brand,
        category: dressAux[0]?.category,
        price: dressAux[0]?.price,
        images: [],
        imageName: [...dressAux[0]?.imageName],
        talles: dressAux[0]?.talleAndStock?.length > 0 ? [...dressAux[0]?.talleAndStock] : []
    })

}

export const submitEditDress = async (id, detectError, dataInputs, setAddSuccess, deleteFile, uploadFile, setResponse, dispatch, getDress, navigate, setErrorDetected) => {

    if (Object.keys(detectError(dataInputs, true)).length <= 0) {

        setAddSuccess(true)

        if (dataInputs.images.length > 0) {

            // -- Logica de borrado de las imagenes anteriores

            for (const name of dataInputs?.imageName) {
                await deleteFile(name)
            }

            var imagen;
            var image = [];
            var imageName = [];

            // -- Logica de subida de las imagenes

            for (const objImage of Object.values(dataInputs.images)) {

                imagen = await uploadFile(objImage)
                image.push(imagen[1])
                imageName.push(imagen[0])
            }
        }

        const user = JSON.parse(window.localStorage.getItem("user"))

        let titleUpper = dataInputs.title.charAt(0).toUpperCase() + dataInputs.title.slice(1)
        let contentUpper = dataInputs.content.charAt(0).toUpperCase() + dataInputs.content.slice(1)

        try {
            let resp = await axios.patch(`${REACT_APP_API}/product/update`, {
                id_edit: id, title: titleUpper, content: contentUpper, price: dataInputs.price, category: dataInputs.category, brand: dataInputs.brand, talleAndStock: dataInputs.talles, image, imageName
            }, {
                headers: {
                    'x-access-token': user.token
                }
            })

            setResponse({
                error: false,
                resp: resp.data,
                show: true
            })

        } catch (error) {

            setResponse({
                error: true,
                resp: error.message,
                show: true
            })
        }

        setTimeout(() => {
            setResponse({
                error: false,
                resp: "",
                show: false
            })

            dispatch(getDress())
            navigate("/dashboard/manage-dress")
            setAddSuccess(false)
        }, 3000);
    } else {
        setErrorDetected(detectError())
    }
}

