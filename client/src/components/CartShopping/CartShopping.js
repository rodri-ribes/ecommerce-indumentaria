import React from 'react'
import style from './CartShopping.module.scss'

//------ Imports

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

//------ components

import Warning from '../Warning/Warning'

//------ functions

import { deleteBuyNowAction } from '../../redux/features/data/dataUser'
import { buyCart, deleteProduct } from './functions/functions'

//------ react icons

import { ImCross } from 'react-icons/im'


const CartShopping = ({ clickCart, setShowComponents }) => {

    let user = useSelector(state => state.dataUser.user)

    let buyNow = useSelector(state => state.dataUser.buyNow)

    let dispatch = useDispatch()

    let navigate = useNavigate()


    //------ CLOSE CARTSHOPPING

    document.addEventListener("click", function (e) {

        if (clickCart === true && e.target.nodeName !== "svg" && e.target.nodeName !== "P" && e.target.nodeName !== "path" && e.target.id !== "container__cart") {
            setShowComponents(prev => ({
                ...prev,
                cart: false
            }))
        }
    })

    return (
        <div className={style.container} id="container__cart" style={clickCart ? { display: "flex" } : { display: "none" }}>
            <div className={style.container__list} id="container__cart">
                {
                    user ?
                        user?.cart?.length > 0 ?
                            user?.cart?.map((p, i) => {
                                return (
                                    <>
                                        <div className={style.container__product} key={i}>
                                            <img src={p?.image} alt={p?.title} />
                                            <div className={style.container__product__content}>
                                                <h3>{p?.title}</h3>
                                                <div className={style.container__product__content__price}>
                                                    <p style={p?.discount > 0 ? { textDecoration: "line-through" } : null} className={style.container__product__content__price_price}>$ {Intl.NumberFormat('de-DE').format(Math.round(p?.price))}</p>
                                                    {
                                                        p?.discount > 0 &&
                                                        <>
                                                            <p className={style.container__product__content__price_oferta}>{p?.oferta}% OFF</p>
                                                        </>
                                                    }
                                                </div>
                                                {
                                                    p?.discount > 0 &&
                                                    <p className={style.container__product__content__price_price}>= $ {Intl.NumberFormat('de-DE').format(Math.round(p?.discount))}</p>
                                                }
                                            </div>
                                            <ImCross onClick={() => deleteProduct(p?._id, dispatch)} />
                                        </div>
                                        {user?.cart?.length !== i + 1 && <hr />}
                                    </>
                                )
                            })
                            :
                            <Warning title={"¡ Agregá productos al carrito !"} text="Aprovechá los descuentos que hay..." />
                        :
                        <Warning title={"¡ Inicia Sesión y Agrega los mejores productos !"} text="Aprovechá los descuentos que hay..." />

                }
            </div>
            {
                user?.cart?.length > 0 &&
                <button onClick={() => buyCart(navigate, dispatch, deleteBuyNowAction, buyNow)} className={style.container_button}>Comprar</button>
            }
        </div>
    )
}

export default CartShopping