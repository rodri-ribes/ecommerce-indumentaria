import axios from "axios"
import { reviewProductAction } from '../../../redux/features/data/dataUser'

const { REACT_APP_API } = process.env

const getDate = () => {

    let date = new Date();

    let hoursText = `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()} - `

    let dateText = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${date.getMonth() + 1 < 10 ? "0" + parseInt(date.getMonth() + 1) : parseInt(date.getMonth())}/${date.getFullYear()}`

    return hoursText + dateText
}

export const alredyThink = (userState, product) => {

    let aux = false;

    product?.reviews?.forEach(e => {
        if (e?.user?._id === userState?._id) {
            aux = true;
        }
    });

    return aux;

}

export const userBuyProduct = (userState, product) => {

    let aux = false;

    userState?.shopping?.forEach(e => {
        if (e?._id?.includes(product?._id)) aux = true;

    })

    return aux;
}


export const createReview = async (product, review, rating, dispatch) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    let date = getDate();

    try {
        let resp = await axios.post(`${REACT_APP_API}/review/add`, {
            id_product: product.id_edit, review, rating, date
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
        console.log(resp.data)
        dispatch(reviewProductAction(resp.data.newReview, "add"))
    } catch (error) {
        console.log(error)
    }
}

export const deleteReview = async (id, product, dispatch) => {
    const user = JSON.parse(window.localStorage.getItem("user"))

    try {
        await axios.delete(`${REACT_APP_API}/review/delete/${id}/${product.id_edit}`, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(reviewProductAction({ id_review: id }, "delete"))

    } catch (error) {
        console.log(error)
    }
}

export const updateReview = async (id, review, dispatch) => {
    const user = JSON.parse(window.localStorage.getItem("user"))

    let date = getDate();

    try {
        let resp = await axios.patch(`${REACT_APP_API}/review/update`, {
            id, review, date
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(reviewProductAction({ id_review: id, aux: resp.data.aux }, "update"))

    } catch (error) {
        console.log(error)
    }
}




