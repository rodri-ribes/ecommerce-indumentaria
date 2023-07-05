import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { generateNotification } from "./dataUser";

const { REACT_APP_API } = process.env

export const dataSlice = createSlice({
    name: "dataAdmin",
    initialState: {
        customers: false,
    },
    reducers: {
        addCustomers: (state, actions) => {
            state.customers = actions.payload
        },
        addUpdateCustomer: (state, actions) => {
            let arr = state.customers.filter(e => e._id !== actions.payload.id);
            arr.push(actions.payload.update);
            state.customers = arr;
        },
        deleteCustomer: (state, actions) => {
            state.customers = state.customers.filter(e => e._id !== actions.payload);
        },


    },
});


export const {
    addCustomers,
    addUpdateCustomer,
    deleteCustomer

} = dataSlice.actions;

export default dataSlice.reducer;


export const getCustomerAction = () => async (dispatch) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    try {
        let resp = await axios.get(`${REACT_APP_API}/customer/get`, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(addCustomers(resp.data))
    } catch (error) {
        console.log(error)
    }
}

export const AddUpdateCustomerAction = (status, id) => async (dispatch) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    try {
        let resp = await axios.patch(`${REACT_APP_API}/customer/addstatus`, {
            status, id
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(addUpdateCustomer({ id: id, update: resp.data.data }))
        dispatch(generateNotification({ title: resp.data.message, state: "aprob" }))
    } catch (error) {
        dispatch(generateNotification({ title: error?.response?.data, state: "alert" }))
    }

}


export const deleteCustomerAction = (id) => async (dispatch) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    try {
        let resp = await axios.delete(`${REACT_APP_API}/customer/delete/${id}`, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(deleteCustomer(id))
        dispatch(generateNotification({ title: resp.data.message, state: "aprob" }))
    } catch (error) {
        dispatch(generateNotification({ title: error?.response?.data, state: "alert" }))
    }
}


