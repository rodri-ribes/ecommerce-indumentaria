import React, { useState } from 'react'
import style from './CardCustomer.module.scss';

import { ImCross } from 'react-icons/im';
import { FaArrowCircleDown, FaArrowCircleUp, FaTruckLoading } from 'react-icons/fa';
import { BsChatLeft } from 'react-icons/bs';
import { FaRegCheckCircle } from 'react-icons/fa';

import { Confirm, CustomDialog } from 'react-st-modal';
import Chat from '../../../Chat/Chat';
import { MdLockClock, MdOutlineCancelScheduleSend } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AddUpdateCustomerAction, deleteCustomerAction } from '../../../../redux/features/data/dataAdmin';

export default function CardCustomer({ user, products, chat, date, paymentMethod, shippingWay, total, status, id, one }) {

    let dispatch = useDispatch()


    const [spinnerButton, setSpinnerButton] = useState({
        sent: false,
        postpone: false,
        cancel: false,
    })

    const [postpone, setPostpone] = useState(false)

    const updateSent = (e, stateStyle, stateCustomer) => {

        setSpinnerButton(prev => ({ ...prev, [e.target.name]: true }))

        dispatch(AddUpdateCustomerAction({ style: stateStyle, text: stateCustomer }, id))

    }




    return (
        <div className={style.container} style={one ? { boxShadow: "0px 0px 10px whitesmoke" } : { boxShadow: "none" }}>
            <div className={style.container__dateAndDelete}>
                <p>{date}</p>
                <ImCross onClick={async () => {
                    if (await Confirm('¿ Estas seguro/a de borrar esta venta ?', "Atención")) {
                        dispatch(deleteCustomerAction(id))
                    }
                }} />
            </div>
            <div className={style.container__datos}>
                <div className={style.container__datos__user}>
                    <h2>Cliente</h2>
                    <h4>{user?.firstname} {user?.lastname}</h4>
                    <p className={style.container__datos__user_information}>Informacion: </p>
                    <p>Direccion: <b>{user?.domicilio?.direccion}</b></p>
                    <p>Localidad: <b>{user?.domicilio?.localidad}</b></p>
                    <p>Provincia: <b>{user?.domicilio?.provincia}</b></p>
                    <p>Codigo Postal: <b>{user?.domicilio?.codigo_postal}</b></p>

                    <div className={style.container__datos__user__chat}>
                        <button
                            onClick={async () => {
                                await CustomDialog(<Chat messages={chat} id={id} dispatch={dispatch} access="admin" />)
                            }}
                        >Chat con {user?.firstname} <BsChatLeft /> </button>
                    </div>
                </div>
                <div className={style.container__datos__products}>
                    <h2>Producto{products?.length > 1 && "s"}</h2>
                    <div className={style.container__datos__products__list}>
                        {
                            products?.map(e => {
                                return (
                                    <div className={style.container__datos__products__card} key={e._id}>
                                        <img src={e.image} alt='campera' />
                                        <div className={style.container__datos__products__card__datos}>
                                            <p>{e?.title}</p>
                                            <b>$ {Intl.NumberFormat('de-DE').format(e?.price)}</b>
                                            <p className={style.container__datos__products__card__datos_pedido}>Talle: {e?.talle} | Color: {e?.color} | Cantidad: {e?.cant}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={style.container__datos__products__total}>
                        <p>Total: <b>$ {Intl.NumberFormat('de-DE').format(total)}</b> (En {paymentMethod})</p>
                    </div>
                </div>
                <div className={style.container__datos__state}>
                    <h2>Estado de la compra</h2>
                    <p>Estado: <b style={status?.style === true ? { color: "green" } : { color: "#999999" }}>{status?.text}{status.text === "Entregado" ? "." : "..."}</b></p>
                    <div className={style.container__datos__state__buttons}>
                        <div className={style.container__datos__state__sent}>
                        </div>


                        <div className={style.container__datos__state__sent}>
                            <p>Avisa al cliente el estado del producto</p>
                            <button
                                name='sent'
                                onClick={(e) => updateSent(e, true, "Enviado")}
                                disabled={spinnerButton.sent || status?.text === "Enviado"}
                            >
                                Enviado <FaTruckLoading />
                            </button>
                            <button
                                name='delivered'
                                onClick={(e) => updateSent(e, true, "Entregado")}
                                disabled={spinnerButton.delivered || status?.text === "Entregado"}
                            >
                                Entregado <FaRegCheckCircle />
                            </button>
                            {
                                postpone === false &&
                                <button onClick={() => setPostpone(true)} disabled={status?.text?.includes("El envio se va a posponer")}>
                                    Posponer el envio <MdLockClock />
                                </button>
                            }
                            {
                                postpone &&
                                <div className={style.container__datos__state__sent__postpone}>
                                    <select value={postpone} onChange={(e) => setPostpone(e.target.value)}>
                                        <option selected value={"false"}>Selecciona</option>
                                        {
                                            [1, 2, 3, 4, 5, 6, 7].map((d, i) => {
                                                return (
                                                    <option key={i} value={d}>{d} Dia{d > 1 && "s"}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <button
                                        name='postpone'
                                        onClick={(e) => {
                                            updateSent(e, false, `El envio se va a posponer por ${postpone} Dia${postpone > 1 ? "s" : ""}`)
                                            setPostpone(false)
                                        }}
                                        disabled={postpone === "false" || postpone === true || spinnerButton.postpone}
                                    >
                                        Enviar <MdOutlineCancelScheduleSend />
                                    </button>
                                </div>
                            }
                        </div>
                        <div className={style.container__datos__state__sent}>
                            <p>Si tuviste algun problema con el producto</p>
                            <button
                                name='cancel'
                                onClick={(e) => updateSent(e, false, "Venta Cancelada, se devolvera el dinero")}
                                disabled={spinnerButton.cancel || status?.text === "Venta Cancelada, se devolvera el dinero"}
                            >
                                Cancelar Venta <MdOutlineCancelScheduleSend />
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div >
    )
}
