import React, { useEffect, useState } from 'react'
import style from './CardProductManage.module.scss'

//------ Imports

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

//------ Components

import Carousel from '../../../Carousel/Carousel'

//------ functions

import { cancellAction, deleteDiscount, deleteProduct, discountProduct, handleShow, observadorDiscount, onPriceRise } from './functions/functions'
import { getDressAction } from '../../../../redux/features/data/dataUser'

//------ react icons

import { AiFillEyeInvisible, AiFillEye, AiOutlineEdit, AiFillDelete } from 'react-icons/ai'
import { GiCash } from 'react-icons/gi'
import { MdDiscount, MdCancel } from 'react-icons/md'
import { BsCheck2All } from 'react-icons/bs'


const CardProductManage = ({ id, img, title, content, price, show, discount, oferta }) => {

    const [inputOrPrice, setInputOrPrice] = useState(false)

    let dispatch = useDispatch()

    // ------ state de aumetar el precio

    const [newPrice, setNewPrice] = useState(price)

    // ------ states para crear oferta del producto

    const [showSelectDiscount, setShowSelectDiscount] = useState(false)
    const [discountPrice, setDiscountPrice] = useState(price - price * 0.05)
    const [selectDiscount, setSelectDiscout] = useState(5)


    useEffect(() => {
        setDiscountPrice(price - price * 0.05)
        return () => setDiscountPrice(price - price * 0.05)
    }, [price])

    // ------ logica para crear el listado de descuentos

    let listPorcentaje = []

    for (let i = 1; i < 20; i++) {
        listPorcentaje.push(i * 5)
    }

    return (
        <>
            <div className={style.container__product}>
                <div className={style.container__product_image}>
                    {
                        img.length > 1 ?
                            <Carousel data={img} />
                            :
                            <img src={img} alt={title} />
                    }
                </div>
                <div className={style.container__product_content}>
                    <div className={style.container__product_content_data}>
                        <h3>{title}</h3>
                        <h4>{content}</h4>

                        {
                            inputOrPrice ? <input type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} />
                                :
                                !showSelectDiscount &&
                                <div className={style.container__product_content_data_price}>
                                    <p>
                                        <b className={`${discount !== 0 && style.oferta}`}> $ {Intl.NumberFormat('de-DE').format(price)} </b>
                                    </p>
                                    <h4>{discount !== 0 && <> <b> {oferta} % OFF  </b> =  $ {Intl.NumberFormat('de-DE').format(discount)} </>}</h4>
                                </div>
                        }
                        {
                            showSelectDiscount &&
                            <div className={style.container__product_content_data_price_discount}>
                                <select value={selectDiscount} onChange={e => observadorDiscount(e, setSelectDiscout, setDiscountPrice, price)}>
                                    {listPorcentaje.map((p, i) => <option value={p} key={i}> {p}% OFF </option>)}
                                </select>
                                <p> = $ {Intl.NumberFormat('de-DE').format(Math.round(discountPrice))}</p>
                            </div>
                        }

                    </div>
                    <div className={style.container__product_content_buttons}>
                        {
                            !inputOrPrice && !showSelectDiscount &&
                            <Link to={`/dashboard/edit-dress/${id}`} className={style.container__product_content_buttons_btn}>Editar <AiOutlineEdit /> </Link>
                        }
                        {
                            !inputOrPrice && !showSelectDiscount &&
                            <button className={style.container__product_content_buttons_btn} onClick={() => deleteProduct(id, dispatch, getDressAction, title)}>Eliminar <AiFillDelete /></button>
                        }
                        {
                            !showSelectDiscount &&
                            <>
                                {
                                    inputOrPrice ?
                                        <button className={style.container__product_content_buttons_btn} onClick={() => onPriceRise(id, newPrice, dispatch, getDressAction, setInputOrPrice, price)}>Actualizar Precio <BsCheck2All /></button>
                                        :
                                        <button className={style.container__product_content_buttons_btn} onClick={() => setInputOrPrice(true)}>Editar Precio <GiCash /></button>
                                }
                            </>
                        }
                        {
                            !inputOrPrice &&
                            <>
                                {
                                    showSelectDiscount ?
                                        <button className={style.container__product_content_buttons_btn} onClick={() => discountProduct(id, setShowSelectDiscount, discountPrice, selectDiscount, dispatch, setInputOrPrice, getDressAction, price)}>Publicar Oferta <MdDiscount /></button>
                                        :
                                        discount > 0 ?
                                            <button className={style.container__product_content_buttons_btn} onClick={() => deleteDiscount(id, dispatch, getDressAction, setInputOrPrice)}>Eliminar Oferta <AiFillDelete /></button>
                                            :
                                            <button className={style.container__product_content_buttons_btn} onClick={() => {
                                                dispatch(getDressAction())
                                                setShowSelectDiscount(true)
                                            }}>Crear Oferta <MdDiscount /></button>
                                }
                            </>
                        }
                        {
                            (showSelectDiscount || inputOrPrice) &&
                            <button className={`${style.container__product_content_buttons_btn} ${style.errorButton}`} onClick={() => cancellAction(setInputOrPrice, setShowSelectDiscount)}>Cancelar <MdCancel /></button>
                        }
                    </div>
                </div>
                <div className={style.container__product_show}>
                    {
                        show ?
                            <AiFillEye onClick={() => handleShow(!show, id, dispatch, getDressAction)} />
                            :
                            <AiFillEyeInvisible onClick={() => handleShow(!show, id, dispatch, getDressAction)} />
                    }
                </div>
            </div>
        </>
    )
}

export default CardProductManage