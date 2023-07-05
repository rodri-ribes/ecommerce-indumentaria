import { Alert, Confirm } from "react-st-modal"
import Cookies from "universal-cookie"
import axios from 'axios'

import { ADDRESS, SCHEDULE, SHIPMENT } from "../../../constants/constants"
import getDate from "../../../functions/getDate"

import { EMAIL } from '../../../constants/constants'
import { emptyCartUserAction, generateNotification } from "../../../redux/features/data/dataUser"


//------ PROCESS .ENV

const { REACT_APP_API } = process.env

export const isCartOrBuyNow = (user, setConfigProduct, buyNow) => {

    if (user) {
        user?.cart?.forEach(e => {
            setConfigProduct(prev => ({
                ...prev,
                [e?.id_edit]: {
                    talle: "",
                    color: "",
                    cant: 1,
                    price: e.discount > 0 ? e.discount : e.price
                }
            }))
        })

    } else if (buyNow) {
        setConfigProduct(prev => ({
            ...prev,
            [buyNow?.id_edit]: {
                talle: "",
                color: "",
                cant: 1,
                price: buyNow.discount > 0 ? buyNow.discount : buyNow.price
            }
        }))
    }
}

// ----- function que calcula el total

export const calcTotal = (buyNow, user, configProduct) => {
    let totalAux = 0;

    if (buyNow) {
        totalAux = buyNow?.discount > 0 ? Math.round(parseFloat(buyNow?.cant * buyNow?.discount)) : Math.round(parseFloat(buyNow?.cant * buyNow?.price))
        return totalAux
    } else {
        user?.cart?.map(e => {
            totalAux += parseInt(configProduct[e.id_edit]?.cant) > 1 ? parseInt(configProduct[e.id_edit]?.cant) * parseFloat(configProduct[e.id_edit]?.price) : parseFloat(configProduct[e.id_edit]?.price)
        })
        return totalAux
    }
}


// ----- submit Mercado Pago

let cookie = new Cookies()

export const submitMercadoPago = async (buyNow, user, configProduct, shipment) => {

    //arr que contendra los errores
    let permission = [];


    //arr para cargar todos los productos ahi y mandarlo a la api de mercado pago
    let cart = [];

    //arr para cargar todos los productos y mandarlo a la tabla de compras
    let cartDashboard = []

    //obj customer
    let customer = {};

    //se verifica si el usuario dio a "comprar ahora" o cargo el carrito
    if (buyNow) {



        cart.push({
            title: buyNow?.title,
            description: buyNow?.content,
            picture_url: buyNow?.image[0],
            category_id: buyNow?.category,
            id: buyNow?.id_edit,
            currency_id: "ARS",
            quantity: parseInt(buyNow?.cant),
            unit_price: shipment === "yes_shipment" ?
                //cuando estemos cargando el ultimo, le sumamos el envio
                buyNow?.discount > 0 ? Math.round(parseFloat(buyNow?.discount) + SHIPMENT) : Math.round(parseFloat(buyNow?.price) + SHIPMENT)
                :
                buyNow?.discount > 0 ? Math.round(parseFloat(buyNow?.discount)) : Math.round(parseFloat(buyNow?.price))
        })
        cartDashboard.push(
            {
                title: buyNow?.title,
                content: buyNow?.content,
                image: buyNow?.image[0],
                id_edit: buyNow?.id_edit,
                id: buyNow?._id,
                price: buyNow?.price,
                discount: buyNow?.discount,
                category: buyNow?.category,
                cant: buyNow?.cant,
                color: buyNow?.color,
                talle: buyNow?.talle,
            }
        )

        customer = {
            user: user._id,
            products: cartDashboard,
            paymentMethod: "Mercado Pago",
            shippingWay: shipment === "yes_shipment" ? "Envio" : "No Envio",
            date: getDate("full"),
            total: shipment === "yes_shipment" ?
                buyNow?.discount > 0 ? Math.round(parseFloat(buyNow?.discount) + SHIPMENT) : Math.round(parseFloat(buyNow?.price) + SHIPMENT)
                :
                buyNow?.discount > 0 ? Math.round(parseFloat(buyNow?.discount)) : Math.round(parseFloat(buyNow?.price)),
            chat: [
                {
                    usuario: "Admin",
                    text: `Hola ${user.firstname}, ¿Como Estas?, ${shipment === "yes_shipment" ? "te informaremos cuando hagamos el envio" : "Te esperamos en " + ADDRESS + ", nuestro Horario de atención es " + SCHEDULE}, Gracias por la compra!`
                }
            ],
            status: shipment === "yes_shipment" ? { text: "Preparando el pedido", style: false } : { text: "Esperando al Cliente", style: false },

        }

    } else {


        user?.cart?.forEach((e, i) => {

            //verificamos si hay errores
            if (configProduct[e.id_edit].color.length === 0 || configProduct[e.id_edit].talle.length === 0) {
                permission.push(`${e.title}`)
            } else {


                cart.push(
                    {
                        title: e.title,
                        description: e.content,
                        picture_url: e.image[0],
                        category_id: e.category,
                        id: e.id_edit,
                        currency_id: "ARS",
                        quantity: parseInt(configProduct[e.id_edit]?.cant),
                        unit_price: user.cart.length === i + 1 && shipment === "yes_shipment" ?
                            //cuando estemos cargando el ultimo, le sumamos el envio
                            e.discount > 0 ? Math.round(parseFloat(e.discount) + SHIPMENT) : Math.round(parseFloat(e.price) + SHIPMENT)
                            :
                            e.discount > 0 ? Math.round(parseFloat(e.discount)) : Math.round(parseFloat(e.price))
                    }
                )
                cartDashboard.push({
                    title: e.title,
                    content: e.content,
                    image: e.image[0],
                    id_edit: e.id_edit,
                    id: e._id,
                    price: e.price,
                    discount: e.discount,
                    category: e.category,
                    cant: configProduct[e.id_edit]?.cant,
                    color: JSON.parse(configProduct[e.id_edit]?.color)?.color,
                    talle: configProduct[e.id_edit]?.talle,
                })

                customer = {
                    user: user._id,
                    products: cartDashboard,
                    paymentMethod: "Mercado Pago",
                    shippingWay: shipment === "yes_shipment" ? "Envio" : "No Envio",
                    date: getDate("full"),
                    total: shipment === "yes_shipment" ? 1500 + calcTotal(buyNow, user, configProduct) : calcTotal(buyNow, user, configProduct),
                    chat: [
                        {
                            usuario: "Admin",
                            text: `Hola ${user.firstname}, ¿Como Estas?, ${shipment === "yes_shipment" ? "te informaremos cuando hagamos el envio" : "Te esperamos en " + ADDRESS + ", nuestro Horario de atención es " + SCHEDULE}, Gracias por la compra!`
                        }
                    ],
                    status: shipment === "yes_shipment" ? { text: "Preparando el pedido", style: false } : { text: "Esperando al Cliente", style: false },

                }


            }
        })
    }
    /**
     * si no hay ninguno error se carga en una cookie los productos,
     * y si la api de mercado pago nos devuelve okey se carga la compra, si hubo un error no se carga.
     */


    if (permission.length === 0) {

        await Alert(`Si pagas por Mercado Pago, una vez pagado, presiona donde dice "Volver al sitio", asi se acredita la compra, si no lo haces, tendras que mandar el comprobante al siguiente email: ${EMAIL}`, 'ATENCIÓN')

        cookie.set("buy", JSON.stringify(customer))
        cookie.set("time", "0000002315000")
        try {
            let resp = await axios.post(REACT_APP_API + '/payment', {
                cart
            })
            window.location.href = resp.data.init_point
        } catch (error) {
            console.log(error)
        }

    } else {
        return Alert(`Falta seleccionar talle y color de: ${permission.toString().replace(",", ", ")}`, "Error")
    }
}


export const submitEfectivo = async (buyNow, user, configProduct, dispatch) => {

    //arr que contendra los errores
    let permission = [];

    //arr para cargar todos los productos y mandarlo a la tabla de compras
    let cartDashboard = []

    //obj customer
    let customer = {};

    //se verifica si el usuario dio a "comprar ahora" o cargo el carrito
    if (buyNow) {

        cartDashboard.push(
            {
                title: buyNow?.title,
                content: buyNow?.content,
                image: buyNow?.image[0],
                id_edit: buyNow?.id_edit,
                id: buyNow?._id,
                price: buyNow?.price,
                discount: buyNow?.discount,
                category: buyNow?.category,
                cant: buyNow?.cant,
                color: buyNow?.color,
                talle: buyNow?.talle,
            }
        )

        customer = {
            user: user._id,
            products: cartDashboard,
            paymentMethod: "Efectivo",
            shippingWay: "No Envio",
            date: getDate("full"),
            total: buyNow?.discount > 0 ? Math.round(parseFloat(buyNow?.discount)) : Math.round(parseFloat(buyNow?.price)),
            chat: [
                {
                    usuario: "Admin",
                    text: `Hola ${user.firstname}, ¿Como Estas?, Te esperamos en ${ADDRESS}, nuestro Horario de atención es ${SCHEDULE}, Gracias por la compra!`
                }
            ],
            status: { text: "Esperando al Cliente", style: false },
        }

    } else {

        user?.cart?.forEach((e, i) => {

            //verificamos si hay errores
            if (configProduct[e.id_edit].color.length === 0 || configProduct[e.id_edit].talle.length === 0) {
                permission.push(`${e.title}`)
            } else {

                cartDashboard.push({
                    title: e.title,
                    content: e.content,
                    image: e.image[0],
                    id_edit: e.id_edit,
                    id: e._id,
                    price: e.price,
                    discount: e.discount,
                    category: e.category,
                    cant: configProduct[e.id_edit]?.cant,
                    color: JSON.parse(configProduct[e.id_edit]?.color)?.color,
                    talle: configProduct[e.id_edit]?.talle,
                })

                customer = {
                    user: user._id,
                    products: cartDashboard,
                    paymentMethod: "Efectivo",
                    shippingWay: "No Envio",
                    date: getDate("full"),
                    total: calcTotal(buyNow, user, configProduct),
                    chat: [
                        {
                            usuario: "Admin",
                            text: `Hola ${user.firstname}, ¿Como Estas?, Te esperamos en ${ADDRESS}, nuestro Horario de atención es ${SCHEDULE}, Gracias por la compra!`
                        }
                    ],
                    status: { text: "Esperando al Cliente", style: false },
                }


            }
        })
    }
    /**
     * si no hay ninguno error se carga en una cookie los productos,
     * y si la api de mercado pago nos devuelve okey se carga la compra, si hubo un error no se carga.
     */


    if (permission.length === 0) {


        if (await Confirm(`Si pagas con Efectivo, tendras que acercarte al local para retirar la comprar, te esperamos en ${ADDRESS} en el horario de ${SCHEDULE}, Muchas Gracias!`, 'ATENCIÓN')) {

            let { user, total, shippingWay, paymentMethod, status, products, date, chat } = customer;

            let userr = JSON.parse(window.localStorage.getItem("user"))


            try {
                let resp = await axios.post(REACT_APP_API + '/customer/add', {
                    user, total, shippingWay, paymentMethod, products, date, chat, status
                }, {
                    headers: {
                        'x-access-token': userr.token
                    }
                })
                dispatch(emptyCartUserAction())
                dispatch(generateNotification({ title: resp.data, state: "aprob" }))
            } catch (error) {
                dispatch(generateNotification({ title: "Se produjo un error", state: "alert" }))
            }
        }

    } else {
        return Alert(`Falta seleccionar talle y color de: ${permission.toString().replace(",", ", ")}`, "Error")
    }
}