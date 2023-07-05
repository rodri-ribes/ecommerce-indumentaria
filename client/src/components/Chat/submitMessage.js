import axios from "axios"
import { AddUpdateCustomerAction } from "../../redux/features/data/dataAdmin"
import { addUpdateChatAction } from "../../redux/features/data/dataUser"

const { REACT_APP_API } = process.env


export default async function submitMessage(e, id, msj, setNewMessage, setChat, dispatch, access) {

    e.preventDefault()

    let user = JSON.parse(window.localStorage.getItem("user"))

    setChat(messages => [...messages, msj])

    try {
        let resp = await axios.post(`${REACT_APP_API}/customer/addmessage`, {
            msj, id
        }, {
            headers: {
                'x-access-token': user.token
            }
        })

        if (access !== "admin") {
            //hacemos aparecer el mensaje en el state user of redux
            dispatch(addUpdateChatAction({ id: id, update: resp.data }))
        } else {
            dispatch(AddUpdateCustomerAction({ id: id, update: resp.data }))
        }

        //vaciamos el input
        setNewMessage(prev => ({
            ...prev,
            text: ""
        }))

    } catch (error) {
        console.log(error)
    }
}