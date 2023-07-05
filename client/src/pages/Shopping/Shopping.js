import React, { useEffect, useState } from 'react'
import style from './Shopping.module.scss'

//------ Imports

import { useDispatch, useSelector } from 'react-redux'

//------ Components

import Spinner from '../../components/Spinner/Spinner'
import CardProductShopping from '../../components/CardProductShopping/CardProductShopping'
import { calcTotal, isCartOrBuyNow, submitEfectivo, submitMercadoPago } from './functions/functions'


const Shopping = ({ user }) => {

    let dispatch = useDispatch()

    let buyNow = useSelector(state => state.dataUser.buyNow)



    // ------ state shipment

    const [shipment, setShipment] = useState(false)

    //----- logica para obtener los detalles de los productos del cart o buynow

    const [configProduct, setConfigProduct] = useState([])

    useEffect(() => {
        isCartOrBuyNow(user, setConfigProduct, buyNow)
        return () => isCartOrBuyNow(user, setConfigProduct, buyNow)
    }, [user])

    return (
        <div className={style.container}>
            <div className={style.container__content}>
                {
                    buyNow ?
                        <div className={style.container__buyNow}>
                            <CardProductShopping
                                id={buyNow.id_edit}
                                title={buyNow.title}
                                content={buyNow.content}
                                image={buyNow.image}
                                price={buyNow.price}
                                oferta={buyNow.oferta}
                                discount={buyNow.discount}
                                talleAndStock={buyNow.talleAndStock}
                                buyNow={{ talle: buyNow?.talle, color: buyNow?.color, cant: buyNow?.cant, price: buyNow.discount > 0 ? buyNow.discount : buyNow.price }}
                                configProduct={configProduct}
                                setConfigProduct={setConfigProduct}
                            />
                        </div>
                        :
                        user?.cart?.length > 0 ?
                            <div className={style.container__cart}>
                                {
                                    user?.cart?.map(e =>
                                        <CardProductShopping
                                            id={e.id_edit}
                                            title={e.title}
                                            content={e.content}
                                            image={e.image}
                                            price={e.price}
                                            oferta={e.oferta}
                                            discount={e.discount}
                                            talleAndStock={e.talleAndStock}
                                            buyNow={false}
                                            configProduct={configProduct}
                                            setConfigProduct={setConfigProduct}
                                        />
                                    )
                                }
                            </div>
                            : <Spinner />
                }
            </div>
            {
                buyNow || user?.cart?.length > 0 ?
                    <div className={style.container__button}>
                        <div className={style.container__button__content}>
                            <h3>TOTAL</h3>
                            <div className={style.container__button__content__data}>
                                {
                                    shipment === "yes_shipment" &&
                                    <p className={style.container__button__content__data_envio}>+ Envio = $ 1.500</p>
                                }
                                <p className={style.container__button__content__data_total}>= $ {Intl.NumberFormat('de-DE').format(shipment === "yes_shipment" ? 1500 + calcTotal(buyNow, user, configProduct) : calcTotal(buyNow, user, configProduct))}</p>
                            </div>
                        </div>
                        <hr />

                        <div className={style.container__button__shipment}>
                            <h4>Selecciona una opción</h4>
                            <div>
                                <input type="radio" name='shipment' value="no_shipment" onChange={(e) => setShipment(e.target.value)} />
                                <label>No quiero envio</label>
                            </div>
                            <div>
                                <input type="radio" name='shipment' value="yes_shipment" onChange={(e) => setShipment(e.target.value)} />
                                <label>Si quiero el envio, a mi domicilio {user?.domicilio?.direccion} {user?.domicilio?.localidad},  {user?.domicilio?.provincia}</label>
                            </div>
                        </div>

                        <div className={style.container__button__btn}>
                            <button disabled={!shipment} onClick={() => submitMercadoPago(buyNow, user, configProduct, shipment)} className={style.container__button__btn_mp}>
                                Mercado Pago
                            </button>
                            <button onClick={() => submitEfectivo(buyNow, user, configProduct, dispatch)} className={style.container__button__btn_mp}>
                                Efectivo
                            </button>
                        </div>
                    </div>
                    : <Spinner />
            }
        </div>
    )
}

export default Shopping