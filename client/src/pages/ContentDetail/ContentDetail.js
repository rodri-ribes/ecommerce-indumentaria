import React, { useEffect, useState } from 'react'
import style from './ContentDetail.module.scss'

//------ Imports

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

//------ Components

import Spinner from '../../components/Spinner/Spinner'
import CommentBox from '../../components/CommentBox/CommentBox'
import CardComment from '../../components/CommentBox/CardComment/CardComment'
import ReviewsBox from '../../components/ReviewsBox/ReviewsBox'
import CardReview from '../../components/ReviewsBox/CardReview/CardReview'

//------ functions

import { addBuyNowAction, getProductAction } from '../../redux/features/data/dataUser'
import { buyNow, handleOnChange, loadCart } from './functions/functions'

//------ react icons

import { BsTruck } from 'react-icons/bs'


const ContentDetail = ({ userState, dress }) => {

    let { id } = useParams()
    let dispatch = useDispatch()
    let navigate = useNavigate()

    // const [data, setData] = useState(false)

    let data = useSelector(state => state.dataUser.contentDetail)

    // ------ state img

    const [showImage, setShowImage] = useState("")

    // ------ state para la seleccion de Talle

    const [configProduct, setConfigProduct] = useState({
        talle: "",
        color: "",
        cant: 1,
    })


    const saveGet = () => {
        if (dress?.find(e => e?.id_edit === id)?.comments?.length > 0 || dress?.find(e => e?.id_edit === id)?.reviews?.length > 0) {
            if (data?.id_edit !== id) dispatch(getProductAction(id, true))
        } else dispatch(getProductAction(id, false))
        setShowImage(data?.image)

    }

    useEffect(() => {
        saveGet()
    }, [dress, id, data])

    return (
        <div className={style.container}>
            {
                data ?
                    <>
                        <div className={style.container__product}>
                            <div className={style.container__product__content}>
                                <div className={style.container__product__content__image}>
                                    <div className={style.container__product__content__image__list}>
                                        {
                                            data?.image?.map((p, i) => <img src={p} alt={`image-${i}`} key={i} onClick={() => setShowImage(p)} />)
                                        }
                                    </div>
                                    <div className={style.container__product__content__image__img}>
                                        {
                                            showImage ?
                                                <img src={showImage} alt="BigImage" />
                                                : <Spinner />
                                        }
                                    </div>
                                </div>
                                <div className={style.container__product__content_content}>
                                    <h3>Descripción</h3>
                                    <p>{data?.content}</p>
                                </div>
                                <CommentBox userState={userState} product={data} />

                                <ReviewsBox userState={userState} product={data} />
                                <div className={style.container__reviews}>

                                </div>
                            </div>
                            <div className={style.container__product__panel}>
                                <div className={style.container__product__panel__group}>
                                    <p className={style.container__product__panel__group__sell}>Nuevo | {data?.sold} Vendidos</p>
                                </div>

                                <div className={style.container__product__panel__data}>
                                    <h2>{data?.title}</h2>

                                    <div className={style.container__product__panel__data__price}>
                                        <b style={data?.discount > 0 ? { textDecoration: "line-through" } : { textDecoration: "none" }}>
                                            $ {Intl.NumberFormat('de-DE').format(Math.round(data?.price))}
                                        </b>
                                        {
                                            data?.discount > 0 &&
                                            <>
                                                <p>{data?.oferta} % OFF </p>

                                                <b> = $ {Intl.NumberFormat('de-DE').format(Math.round(data?.discount))}</b>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className={style.container__product__panel__group}>
                                    <div className={style.container__product__panel__group__shipment}>
                                        <BsTruck /> <p>Llega gratis <b>El martes</b></p>
                                    </div>
                                </div>

                                <div className={style.container__product__panel__group}>
                                    <label>Talles Disponible: </label>
                                    <select value={configProduct?.talle} name="talle" onChange={(e) => handleOnChange(e, setConfigProduct, configProduct)}>
                                        <option value={false} selected>Selecciona Talle</option>
                                        {data?.talleAndStock?.map((p, i) => <option value={p.talle} key={i}>{p.talle.charAt(0).toUpperCase() + p.talle.slice(1)}</option>)}
                                    </select>
                                </div>
                                {
                                    configProduct.talle &&
                                    <div className={style.container__product__panel__group}>
                                        <label>Colores Disponible: </label>
                                        <select value={configProduct?.color} name="color" onChange={(e) => handleOnChange(e, setConfigProduct, configProduct)}>
                                            <option value={false} selected>Selecciona Color</option>
                                            {data?.talleAndStock.filter(e => e?.talle === configProduct?.talle)[0]?.listado?.map((p, i) => <option value={JSON.stringify(p)} key={i}>{p.color.charAt(0).toUpperCase() + p.color.slice(1)}</option>)}
                                        </select>
                                    </div>
                                }

                                {
                                    configProduct.color &&
                                    <div className={style.container__product__panel__group}>
                                        <div className={style.container__product__panel__group__selectCant}>
                                            <label>Cantidad: </label>
                                            <input type="number" value={configProduct?.cant} name="cant" onChange={e => {
                                                if (e.target.value > 0 && e.target.value <= JSON.parse(configProduct?.color)?.stock) handleOnChange(e, setConfigProduct, configProduct)
                                            }} />
                                            {
                                                <b style={{ color: "gray" }}>({configProduct?.color && JSON.parse(configProduct?.color)?.stock} Disponible)</b>
                                            }
                                        </div>
                                    </div>
                                }
                                <div className={style.container__product__panel__group}>
                                    <button onClick={() => buyNow(data, userState, configProduct, dispatch, navigate, addBuyNowAction)} className={`${style.comprarAhorra} ${style.button}`}>
                                        Comprar Ahora
                                    </button>
                                    <button onClick={() => loadCart(data, userState, dispatch, navigate)} className={`${style.agregarAlCarrito} ${style.button}`}>
                                        Agregar al Carrito
                                    </button>
                                </div>
                            </div>
                        </div>

                    </>
                    :
                    <Spinner />
            }
        </div>
    )
}

export default ContentDetail