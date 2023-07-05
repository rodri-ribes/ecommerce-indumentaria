import axios from "axios"
import { Alert } from "react-st-modal"
import { updateUserAction } from "../../../redux/features/data/dataUser"

//------ PROCESS .ENV
const { REACT_APP_API } = process.env

export const handleOnChange = (e, setConfigProduct, configProduct) => {

    if (e.target.name === "talle" && e.target.value === "false") {
        setConfigProduct({
            talle: "",
            color: "",
            cant: 1,
        })
    } else if (e.target.name === "color" && e.target.value !== configProduct.color) {
        setConfigProduct(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
            cant: 1
        }))
    } else {
        setConfigProduct(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
}

// ------ logica para cargar en el carrito

export const loadCart = async (data, userState, dispatch, navigate) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    if (userState) {

        //para que no se vuelva agregar el mismo producto de nuevo
        let dressFilter = userState?.cart?.find(e => e.id_edit === data.id_edit)

        if (!dressFilter) {

            try {
                let resp = await axios.patch(`${REACT_APP_API}/user/updatecart`, {
                    product: data._id
                }, {
                    headers: {
                        'x-access-token': user.token
                    }
                })
                dispatch(updateUserAction(resp.data))
                navigate(`/addtocart/${data.id_edit}`)
            } catch (error) {
                console.log(error)
            }
        }

    } else {
        await Alert("Necesitas una cuenta para agregar productos al carrito", "Error")
        navigate(`/signup`)
    }
}

// ------ logica para "comprar ahora"


export const buyNow = (data, userState, configProduct, dispatch, navigate, addBuyNow) => {

    if (userState) {
        if (configProduct.talle !== "false" && configProduct.color.length !== 0) {

            let buyProduct = { ...data };
            buyProduct["talle"] = configProduct.talle
            buyProduct["color"] = JSON.parse(configProduct.color)?.color
            buyProduct["cant"] = configProduct.cant

            dispatch(addBuyNow(buyProduct))
            navigate("/shopping")
        } else {
            Alert("Selecciona el talle, color y la cantidad deseada.", "Error")
        }
    } else {
        Alert("Necesitas una cuenta para comprar.", "Error")
        navigate("/signup")
    }
}