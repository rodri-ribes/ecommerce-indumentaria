import React, { useState } from 'react'
import style from './CardShopping.module.scss';

//------ Imports

import { CustomDialog } from 'react-st-modal';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//------ Components

import Chat from '../../../Chat/Chat';

//------ functions

import { AddUpdateCustomerUserAction, getProductAction } from '../../../../redux/features/data/dataUser'

//------ react icons
import { BsChatLeft, BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import { BsMailbox } from 'react-icons/bs'


export default function CardShopping({ date, products, shippingWay, user, total, paymentMethod, shoppingLength, chat, id, status }) {

    let navigate = useNavigate()
    let dispatch = useDispatch()

    //states to hide elements
    const [show, setShow] = useState({
        products: 2,
        enlarge: false,
        status: false
    })

    const showProduct = (id_edit) => {
        navigate(`/dress/${id_edit}`)
    }

    return (
        <div className={style.container__customer}>
            <div className={style.container__customer__date}>
                <p>{date}</p>
                <button
                    onClick={async () => {
                        // dispatch(getShoppingList())
                        await CustomDialog(<Chat messages={chat} id={id} user={user} dispatch={dispatch} access="user" />)
                    }}
                >
                    Chat <BsChatLeft />
                </button>
            </div>
            <div className={style.container__customer__enlarge}>
                <h3>Compra N° {shoppingLength}</h3>
                {
                    show.enlarge ?
                        <BsFillArrowUpCircleFill onClick={() => setShow(prev => ({ ...prev, enlarge: false }))} />
                        :
                        <BsFillArrowDownCircleFill onClick={() => setShow(prev => ({ ...prev, enlarge: true }))} />
                }
            </div>
            <div className={style.container__customer__status}>
                <b style={shippingWay === "No Envio" ? { width: "100%" } : { width: "60%" }}>Estado:  <p style={status?.style === true ? { color: "green" } : { color: "#999999" }}>{status.text}{status.text === "Entregado" ? "." : "..."}</p> </b>
                {
                    shippingWay !== "No Envio" &&
                    <button
                        onClick={() => dispatch(AddUpdateCustomerUserAction({ style: true, text: "Entregado" }, id))}
                        disabled={status?.text !== "Enviado"}>
                        {products?.length > 1 ? "Llegaron los Productos" : "Llego el Producto"} <BsMailbox />
                    </button>
                }
            </div>
            {
                show.enlarge &&

                <>
                    <div className={style.container__customer__products}>
                        <h3>Producto{products?.length > 1 && "s"} Comprado{products?.length > 1 && "s"}</h3>
                        {
                            products?.slice(0, show.products).map(p => {
                                return (
                                    <div className={style.container__customer__products__product}>
                                        <img src={p.image} />
                                        <div className={style.container__customer__products__product__data}>
                                            <h3 onClick={() => showProduct(p.id_edit)}>{p.title}</h3>
                                            <p>{p.content.slice(0, 150)} ...</p>
                                            <div className={style.container__customer__products__product__data__selection}>
                                                <div className={style.container__customer__products__product__data__selection__group}>
                                                    <b>Talle: </b> <p>{p?.talle}</p>
                                                </div>
                                                <div className={style.container__customer__products__product__data__selection__group}>
                                                    <b>Color: </b> <p>{p?.color}</p>
                                                </div>
                                                <div className={style.container__customer__products__product__data__selection__group}>
                                                    <b>Cantidad: </b> <p>{p?.cant}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            products.length > 2 &&
                            <div className={style.container__customer__products__readMore}>
                                {
                                    show.products === 2 ?
                                        <>
                                            <p>Ver mas Productos  </p> <BsFillArrowDownCircleFill onClick={() => setShow(prev => ({ ...prev, products: products.length }))} />
                                        </>
                                        :
                                        <>
                                            <p>Ver menos Productos  </p> <BsFillArrowUpCircleFill onClick={() => setShow(prev => ({ ...prev, products: 2 }))} />
                                        </>
                                }
                            </div>

                        }
                        <div className={style.container__customer__products__total}>
                            <h2>Total: $ {Intl.NumberFormat('de-DE').format(total)}</h2>
                            <p>{paymentMethod}</p>
                        </div>
                    </div>
                    <div className={style.container__customer__content}>
                        <div className={style.container__customer__content__shipment}>
                            {
                                shippingWay === "Envio" ?
                                    <>
                                        <h3>{products.length > 1 ? "Los Productos se enviaran" : "El Producto se enviara"}  al siguiente domicilio: </h3>
                                        <div className={style.container__customer__content__shipment__home}>
                                            <div className={style.container__customer__content__shipment__home__group}>
                                                <b>Dirección: </b>
                                                <p>{user?.domicilio?.direccion}</p>
                                            </div>
                                            <div className={style.container__customer__content__shipment__home__group}>
                                                <b>Localidad: </b>
                                                <p>{user?.domicilio?.localidad}</p>
                                            </div>
                                            <div className={style.container__customer__content__shipment__home__group}>
                                                <b>Provincia: </b>
                                                <p>{user?.domicilio?.provincia}</p>
                                            </div>
                                            <div className={style.container__customer__content__shipment__home__group}>
                                                <b>Codigo Postal: </b>
                                                <p>{user?.domicilio?.codigo_postal}</p>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
