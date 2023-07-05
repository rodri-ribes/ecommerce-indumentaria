import axios from "axios"
import getDate from "../../../functions/getDate"
import { commentProductAction, generateNotification, getProductAction } from '../../../redux/features/data/dataUser'

const { REACT_APP_API } = process.env


export const createComment = async (userState, product, comment, dispatch, setComment, setSend) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    let date = getDate("full");

    try {

        let resp = await axios.post(`${REACT_APP_API}/comment/add`, {
            user: userState._id, id_product: product.id_edit, comment, date
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
        setComment("")
        dispatch(generateNotification({ title: resp.data.message, state: "aprob" }))
        dispatch(commentProductAction(resp.data.newComment, "add"))
        setSend(false)
    } catch (error) {
        dispatch(generateNotification({ title: error.response.data, state: "alert" }))
    }
}

export const deleteComment = async (id, product, dispatch) => {
    const user = JSON.parse(window.localStorage.getItem("user"))

    try {
        await axios.delete(`${REACT_APP_API}/comment/delete/${id}/${product.id_edit}`, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(commentProductAction({ id_comment: id }, "delete"))
        // dispatch(getProductAction(product.id_edit))

    } catch (error) {
        console.log(error)
    }
}

export const updateComment = async (id, comment, dispatch) => {
    const user = JSON.parse(window.localStorage.getItem("user"))

    let date = getDate();

    try {
        let resp = await axios.patch(`${REACT_APP_API}/comment/update`, {
            id, comment, date
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(generateNotification({ title: resp.data.message, state: "aprob" }))
        dispatch(commentProductAction({ id_comment: id, aux: resp.data.aux }, "update"))
    } catch (error) {
        dispatch(generateNotification({ title: error.response.message, state: "alert" }))

    }
}


export const responseComment = async (id, comment, product, firstname, dispatch) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    let date = getDate();

    try {
        let resp = await axios.patch(`${REACT_APP_API}/comment/response`, {
            id, comment, date, firstname
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(commentProductAction({ id_comment: id, aux: resp.data.updateComment }, "update"))

    } catch (error) {
        console.log(error)
    }
}

export const deleteResponse = async (id, product, dispatch) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    try {
        await axios.delete(`${REACT_APP_API}/comment/response/delete/${id}`, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(commentProductAction({ id_comment: id }, "delete_response"))

    } catch (error) {
        console.log(error)
    }
}


