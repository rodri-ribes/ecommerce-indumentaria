import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const { REACT_APP_API } = process.env


export const dataSlice = createSlice({
    name: "dataUser",
    initialState: {
        //----- state for data of user
        user: false,
        //----- state for user purchases
        shoppingList: false,
        //----- state for products (dress)
        dress: [],
        //----- state for content detail
        contentDetail: false,
        //----- state for 'buy now'
        buyNow: false,
        //----- state for notifications
        notification: false,
        //----- state for reload
        reload: true
    },
    reducers: {

        //--- reducers of user
        addUser: (state, actions) => {
            state.user = actions.payload
        },
        emptyCart: (state, actions) => {
            state.user.cart = actions.payload;
        },
        addShoppingList: (state, actions) => {
            state.shoppingList = actions.payload
        },
        addUpdateChat: (state, actions) => {
            let arr = state.shoppingList.filter(e => e._id !== actions.payload.id)
            arr.push(actions.payload.update)
            state.shoppingList = arr
        },
        buyNow: (state, actions) => {
            state.buyNow = actions.payload
        },
        //--- load Products
        addDress: (state, actions) => {
            state.dress = actions.payload
        },
        //--- add product
        addProductDress: (state, actions) => {
            state.dress.push(actions.payload)
        },
        //--- extended producer information
        addContentDetail: (state, actions) => {
            state.contentDetail = state.dress.find(p => p.id_edit === actions.payload)
        },
        addContentDetailAux: (state, actions) => {
            state.contentDetail = actions.payload
        },
        addNotification: (state, actions) => {
            state.notification = actions.payload
        },
        addTimeReload: (state, actions) => {
            state.reload = actions.payload
        },
        updateCustomer: (state, actions) => {
            let arr = state.shoppingList.filter(e => e._id !== actions.payload.id)
            arr.push(actions.payload.update)
            state.shoppingList = arr;
        },

        //----- reducers of comment

        addComment: (state, actions) => {
            state.contentDetail.comments.push(actions.payload)
        },
        updateComment: (state, actions) => {
            let arr = state.contentDetail.comments.filter(f => f?._id !== actions.payload.id_comment)
            arr.push(actions.payload.aux)
            state.contentDetail.comments = arr
        },
        deleteComment: (state, actions) => {
            state.contentDetail.comments = state.contentDetail.comments.filter(f => f?._id !== actions.payload.id_comment)
        },
        deleteResponse: (state, actions) => {
            let obj = state.contentDetail.comments.find(f => f?._id === actions.payload.id_comment)
            let arr = state.contentDetail.comments.filter(f => f?._id !== actions.payload.id_comment)
            obj.response = false;
            arr.push(obj)
            state.contentDetail.comments = [...arr]
        },

        //----- reducers of review

        addReview: (state, actions) => {
            state.contentDetail.reviews.push(actions.payload)
        },
        updateReview: (state, actions) => {
            let arr = state.contentDetail.reviews.filter(f => f?._id !== actions.payload.id_review)
            arr.push(actions.payload.aux)
            state.contentDetail.reviews = arr
        },
        deleteReview: (state, actions) => {
            state.contentDetail.reviews = state.contentDetail.reviews.filter(f => f?._id !== actions.payload.id_review)
        },

        //----- reducers of shopping cart
        deleteProductCart: (state, actions) => {
            state.user.cart = state.user.cart.filter(e => e._id !== actions.payload)
        },


    },
});


export const {
    addUser,
    emptyCart,
    addDress,
    addProductDress,
    addContentDetail,
    addContentDetailAux,
    addShoppingList,
    addUpdateChat,
    buyNow,
    addNotification,
    addTimeReload,
    updateCustomer,

    //----- reducers of comment
    addComment,
    updateComment,
    deleteComment,
    deleteResponse,

    //----- reducers of review
    addReview,
    updateReview,
    deleteReview,

    //----- reducers of comment
    deleteProductCart,

} = dataSlice.actions;

export default dataSlice.reducer;




// ------ ACTIONS OF USER

/**
 * Esta funcion sirve para obtener los datos del usuario
 * si ingresas algo por parametro borrar el state user
 * @param {} remove 
 * @returns 
 */


export const getUserAction = (remove) => async (dispatch) => {

    if (remove) {
        dispatch(addUser(null))
    } else {
        const user = JSON.parse(window.localStorage.getItem("user"))
        if (user) {
            try {
                const resp = await axios.get(`${REACT_APP_API}/user/getuser/${user._id}`, {
                    headers: {
                        'x-access-token': user.token
                    }
                })
                dispatch(addUser(resp.data))
            } catch (error) {
                console.log(error)
            }
        }
    }
}

/**
 * la funcionalidad es actualizar el state con lo que devuelve al hacer patch o post a user
 * @param {object user} data 
 * @returns 
 */

export const updateUserAction = (data) => async (dispatch) => {

    dispatch(addUser(data))

}

export const emptyCartUserAction = () => async (dispatch) => {

    dispatch(emptyCart([]))

}

// ------ ACTIONS OF SHOPPING CART


export const deleteProductOfCartAction = (id) => async (dispatch) => {

    dispatch(deleteProductCart(id))

}




// ------ ACTIONS OF PRODUCTS

/**
 * Esta funcion sirve para obtener los productos
 * @returns 
 */

export const getDressAction = () => async (dispatch) => {
    const data = await axios.get(`${REACT_APP_API}/product/getall`)
    dispatch(addDress(data.data))
}


export const addProductAction = (product) => async (dispatch) => {
    dispatch(addProductDress(product))
}


/**
 * Esta funcion sirve para obtener el producto, y mostrarlo en el content detail
 * @param {id del producto} id 
 * @returns 
 */

export const getProductAction = (id, get) => async (dispatch) => {

    if (get) {
        let resp = await axios.get(`${REACT_APP_API}/product/getone/${id}`)
        dispatch(addContentDetailAux(resp.data))
    } else {
        dispatch(addContentDetail(id))
    }
}


export const commentProductAction = (obj, peticion) => async (dispatch) => {
    if (peticion === "update") {
        dispatch(updateComment(obj))
    } else if (peticion === "add") {
        dispatch(addComment(obj))
    } else if (peticion === "delete") {
        dispatch(deleteComment(obj))
    } else if (peticion === "delete_response") {
        dispatch(deleteResponse(obj))
    }
}

export const reviewProductAction = (obj, peticion) => async (dispatch) => {
    if (peticion === "update") {
        dispatch(updateReview(obj))
    } else if (peticion === "add") {
        dispatch(addReview(obj))
    } else if (peticion === "delete") {
        dispatch(deleteReview(obj))
    }
}

/**
 * Esta funcion sirve para cargar un favorito y con la misma lo eliminamos
 * por parametro pasamos el id del producto
 * @param {} favorite 
 * @returns 
 */


export const favoriteProductAction = (favorite) => async (dispatch) => {

    const user = JSON.parse(window.localStorage.getItem("user"))
    try {
        let resp = await axios.patch(`${REACT_APP_API}/user/update`, {
            favorite
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(addUser(resp.data.userFav))
        dispatch(generateNotification({ title: resp.data.message, state: "aprob" }))
    } catch (error) {
        console.log(error)
    }
    // dispatch(getUser(false))
}


/**
 * Esta funcion sirve para la funcion de "Comprar Ahora",
 *  guardamos el producto que desea comprar el usuario
 * 
 * @param {} product 
 * @returns 
 */

export const addBuyNowAction = (product) => async (dispatch) => {
    dispatch(buyNow(product))
}

/**
 * Esta funcion sirve para la funcion de "Comprar Ahora",
 *  borramos el state buynow para cancelar "Comprar Ahora"
 * @returns 
 */

export const deleteBuyNowAction = () => async (dispatch) => {
    dispatch(buyNow(false))
}

/**
 * Esta funcion sirve para listar todas las compras echas por el usaurio
 * @returns 
 */

export const getShoppingListAction = () => async (dispatch) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    try {
        let resp = await axios.get(`${REACT_APP_API}/customer/getuser/${user._id}`, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(addShoppingList(resp.data))
    } catch (error) {
        console.log(error)
    }

}

/**
 * este action sirve para actualizar el estado de una compra de parte del usuario.
 * recibe el status que es un objecto {style: (true o false, cambia el color), text: (el mensaje)} ,
 * y recibe el id de la compra.
 * @param {*} status 
 * @param {*} id 
 * @returns 
 */

export const AddUpdateCustomerUserAction = (status, id) => async (dispatch) => {

    const user = JSON.parse(window.localStorage.getItem("user"))

    try {
        let resp = await axios.patch(`${REACT_APP_API}/customer/addstatus`, {
            status, id
        }, {
            headers: {
                'x-access-token': user.token
            }
        })
        dispatch(updateCustomer({ id: id, update: resp.data.data }))
        dispatch(generateNotification({ title: "Entrega Confirmada", state: "aprob" }))
    } catch (error) {
        dispatch(generateNotification({ title: error?.response?.data, state: "alert" }))
    }

}

/**
 * este action sirve para agregar un mensaje nuevo en la compra
 * @param {*} obj 
 * @returns 
 */

export const addUpdateChatAction = (obj) => async (dispatch) => {

    dispatch(addUpdateChat(obj))

}


/**
 * Esta funcion sirve para mostrar un notificacion del lado izquierdo por 5 segundos.
 * Se recibe un objeto, { title: "texto", state: "aprob" / "alert" }
 * @param {} message 
 * @returns 
 */

export const generateNotification = (message) => async (dispatch) => {
    dispatch(addNotification(message))

    setTimeout(() => {
        dispatch(addNotification(false))
    }, 5000);
}

/**
 * este action sirve para limitar los reload de la pagina, para no hacer muchas peticiones get.
 * @param {*} valor 
 * @returns 
 */

export const timeReload = (valor) => async (dispatch) => {

    dispatch(addTimeReload(valor))

    //desp de dos minutos puede hacer un get
    // setTimeout(() => {
    //     dispatch(addTimeReload(true))
    // }, 120000);
    setTimeout(() => {
        dispatch(addTimeReload(true))
    }, 1);
}




