import React, { useEffect, useState } from 'react'
import style from './CardReview.module.scss'

import { RxCross1 } from 'react-icons/rx'
import { BsArrowReturnRight } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { deleteReview, updateReview } from '../functions/functions'
import { Rating } from '@mui/material'



export default function CardReview({ id, user, date, review, userState, product, rating }) {

    let dispatch = useDispatch()

    // ---- state para ocultar los btns

    const [showButtons, setShowButtons] = useState(user?._id === userState?._id || userState?.rol === "admin")

    useEffect(() => {
        setShowButtons(user?._id === userState?._id || userState?.rol === "admin")
    }, [user, userState])

    // ---- state para nuevo comentario

    const [newReview, setNewReview] = useState(review)
    const [showInput, setShowInput] = useState(false)

    return (
        <div className={style.container}>
            <img src={user?.image} alt="profile" />
            <div className={style.container__content}>
                <div className={style.container__content__section}>
                    <h3>{user?.firstname}</h3>

                    <div className={style.container__content__section__dateAndsvg}>
                        <p>{date}</p>
                        {
                            !showInput && showButtons &&
                            <AiOutlineEdit onClick={() => setShowInput(true)} />
                        }
                        {
                            showButtons &&
                            <RxCross1 onClick={() => deleteReview(id, product, dispatch)} />
                        }
                    </div>
                </div>
                <div className={style.container__content__rating}>
                    {
                        rating &&
                        <Rating name="read-only" value={rating} readOnly />
                    }
                </div>
                {
                    showInput ?
                        <div className={style.container__content__inputs}>
                            <input type="text" value={newReview} onChange={(e) => setNewReview(e.target.value)} />
                            <div className={style.container__content__inputs__button}>
                                <button onClick={() => {
                                    if (newReview.length > 0) {
                                        setShowInput(false)
                                        updateReview(id, newReview, dispatch)
                                    }
                                }}>Actualizar</button>
                                <button onClick={() => setShowInput(false)}>Cancelar</button>

                            </div>
                        </div>
                        :
                        <p>{review?.charAt(0).toUpperCase() + review?.slice(1)}</p>
                }
            </div>
        </div>

    )
}
