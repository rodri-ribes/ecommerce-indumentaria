import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import style from './AfterPaying.module.scss';


//---- REACT ICONS

import { MdError } from 'react-icons/md'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { EMAIL } from '../../constants/constants';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { emptyCartUserAction, generateNotification } from '../../redux/features/data/dataUser.js'
const { REACT_APP_API } = process.env


export default function AfterPaying() {

    const [params] = useSearchParams()

    const [aprob, setAprob] = useState(false)

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let cookie = new Cookies()

    let collection_status = params.get("collection_status");
    let collection_id = params.get("collection_id");
    let payment_id = params.get("payment_id");
    let status = params.get("status");


    const validate = async () => {

        if (cookie.get("time") === "0000002315000" && window.location.pathname.includes("success") && collection_status !== "null" && collection_id !== "null" && payment_id !== "null" && status !== "null") {

            setAprob(true)

            let userr = JSON.parse(window.localStorage.getItem("user"))

            let { user, total, shippingWay, paymentMethod, status, products, date, chat } = cookie.get("buy",)

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

            setTimeout(() => {
                navigate('/')
                cookie.remove("time")
                cookie.remove("buy")
            }, 3000);
        } else {
            setTimeout(() => {
                navigate('/')

            }, 3000);
        }
    }

    useEffect(() => {
        validate()
    }, [])


    return (
        <div className={style.container}>
            {
                aprob ?
                    <h2 className={style.container__aprob}>COMPRA REALIZADA CON EXITO <BsFillCheckCircleFill /> </h2>
                    :
                    <div className={style.container__error}>
                        <h2 className={style.container__error__failure}>NO COMPLETASTE EL PAGO CORRECTAMENTE <MdError /> </h2>
                        <p>Si pensas que hay un error y pagaste el/los producto/s, adjunta el comprobante del pago y envialo al email {EMAIL}</p>
                    </div>
            }
        </div>
    )
}
