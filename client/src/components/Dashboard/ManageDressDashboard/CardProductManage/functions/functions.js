import axios from "axios"
import { Alert, Confirm } from "react-st-modal"

//------ PROCESS .ENV

const { REACT_APP_API } = process.env


// ------ logica de ocultar producto

export const handleShow = async (show, id_edit, dispatch, getDress) => {
    const user = JSON.parse(window.localStorage.getItem("user"))
    try {
        await axios.patch(`${REACT_APP_API}/product/update`, {
            id_edit, show
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
    } catch (error) {
        console.log(error)
    }
    dispatch(getDress())
}

// ------ logica del borrado del producto
export const deleteProduct = async (id_edit, dispatch, getDress, name) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    if (await Confirm(`¿ Estas seguro de eliminar ${name} ?`, "Eliminar")) {
        try {
            await axios.delete(`${REACT_APP_API}/product/remove/${id_edit}`, {
                headers: {
                    'x-access-token': user.token
                }
            })
        } catch (error) {
            console.log(error)
        }
        dispatch(getDress())
    }
}

// ------ logica para aumentar el precio

export const onPriceRise = async (id_edit, newPrice, dispatch, getDress, setInputOrPrice, price) => {

    if (newPrice.length > 0 && /[1-1000000]/g.test(newPrice)) {

        if (parseFloat(newPrice) !== parseFloat(price)) {

            const user = JSON.parse(window.localStorage.getItem("user"))

            try {
                await axios.patch(`${REACT_APP_API}/product/update`, {
                    id_edit, price: newPrice
                }, {
                    headers: {
                        'x-access-token': user.token
                    }
                })
            } catch (error) {
                console.log(error)
            }
            dispatch(getDress())
            setInputOrPrice(false)

        } else {
            setInputOrPrice(false)
        }
    } else {
        setInputOrPrice(false)

        await Alert("Ingresa un Precio Valido", "Error")
    }
}

// ------ logica para la seleccion del descuento

export const observadorDiscount = (e, setSelectDiscout, setDiscountPrice, price) => {

    let aux = 0
    aux = parseFloat(e.target.value) * (1 / 100)
    setSelectDiscout(e.target.value)
    setDiscountPrice(price - price * aux)
}

// ------ logica para hacer el descuento

export const discountProduct = async (id_edit, setShowSelectDiscount, discountPrice, selectDiscount, dispatch, setInputOrPrice, getDress, price) => {

    setShowSelectDiscount(false)

    if (parseFloat(discountPrice) !== price && parseInt(selectDiscount) !== 0) {

        const user = JSON.parse(window.localStorage.getItem("user"))

        try {
            await axios.patch(`${REACT_APP_API}/product/updatediscount`, {
                id_edit, discount: discountPrice, oferta: selectDiscount
            }, {
                headers: {
                    'x-access-token': user.token
                }
            })
        } catch (error) {
            console.log(error)
        }
        dispatch(getDress())
        setInputOrPrice(false)

    } else {
        await Alert("Ingresa un descuento valido", "Error")
    }
}

// ------ logica para borrar el descuento

export const deleteDiscount = async (id_edit, dispatch, getDress, setInputOrPrice) => {
    const user = JSON.parse(window.localStorage.getItem("user"))

    try {
        await axios.patch(`${REACT_APP_API}/product/updatediscount`, {
            id_edit, discount: 0, oferta: 0
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
    } catch (error) {
        console.log(error)
    }
    dispatch(getDress())
    setInputOrPrice(false)
}

// ------ logica para cancelar accion

export const cancellAction = (setInputOrPrice, setShowSelectDiscount) => {
    setInputOrPrice(false)
    setShowSelectDiscount(false)

}