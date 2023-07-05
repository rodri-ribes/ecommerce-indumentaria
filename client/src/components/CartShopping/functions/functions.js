import axios from 'axios'
import { deleteProductOfCartAction } from '../../../redux/features/data/dataUser'

//------ PROCESS .ENV

const { REACT_APP_API } = process.env


export const buyCart = (navigate, dispatch, deleteBuyNow, buyNow) => {

    //--- si el user se encuentra en /shopping y preciosa el btn comprar se tiene que resetear el state buyNow

    if (buyNow) {
        dispatch(deleteBuyNow())
    }
    navigate("/shopping")
}

export const deleteProduct = async (id, dispatch) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    try {

        await axios.patch(`${REACT_APP_API}/user/updatecart`, {
            product: id
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(deleteProductOfCartAction(id))

    } catch (error) {
        console.log(error)
    }
}