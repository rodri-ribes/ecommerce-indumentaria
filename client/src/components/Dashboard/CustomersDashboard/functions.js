import axios from "axios"
import { AddUpdateCustomerAction } from "../../../redux/features/data/dataAdmin"
import { generateNotification } from "../../../redux/features/data/dataUser"

const { REACT_APP_API } = process.env

export const addStatusFunction = async (status, id, dispatch) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    try {
        let resp = await axios.patch(`${REACT_APP_API}/customer/addstatus`, {
            status, id
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(AddUpdateCustomerAction({ id: id, update: resp.data.data }))
        dispatch(generateNotification({ title: resp.data.message, state: "aprob" }))
    } catch (error) {
        dispatch(generateNotification({ title: error?.response?.data, state: "alert" }))
    }
}


export const deleteCustomerFunction = async (id, dispatch) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    try {
        let resp = await axios.patch(`${REACT_APP_API}/customer/addstatus`, {
            id
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(AddUpdateCustomerAction({ id: id, update: resp.data.data }))
        dispatch(generateNotification({ title: resp.data.message, state: "aprob" }))
    } catch (error) {
        dispatch(generateNotification({ title: error?.response?.data, state: "alert" }))
    }
}