import React, { useState } from 'react'
import style from './ReviewsBox.module.scss';
import { useDispatch } from 'react-redux';
import { alredyThink, createReview } from './functions/functions';
import SpinnerButton from '../SpinnerButton/SpinnerButton'

import Rating from '@mui/material/Rating';
import CardReview from './CardReview/CardReview';


export default function ReviewsBox({ userState, product }) {

    let dispatch = useDispatch()

    const [review, setReview] = useState("")
    const [send, setSend] = useState(false)
    const [rating, setRating] = useState(1)

    const reviewSubmit = () => {
        if (review.length > 0) {
            setSend(true)
            createReview(product, review, rating, dispatch)
            setReview("")
            setSend(false)
            setRating(1)
        }
    }


    return (
        <>
            {
                userState?.shopping?.includes(product?._id) ?
                    !alredyThink(userState, product) &&
                    <div className={style.container}>
                        <div className={style.container__box}>
                            <img src={userState?.image} alt="profile" />
                            <div className={style.container__box__content}>
                                <h3>{userState?.firstname}</h3>
                                <div className={style.container__box__content__rating}>
                                    <p>Califica el producto</p>
                                    <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                    />
                                </div>
                                <div className={style.container__box__content__inputs}>
                                    <textarea
                                        type="text"
                                        placeholder={`¿ Que te parecio ${product.title} ?`}
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                    />
                                    <button onClick={() => reviewSubmit(setSend, createReview, review, setReview, setRating)} disabled={send ? true : false}>{send ? <SpinnerButton /> : "Opinar"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
            {
                product?.reviews?.length > 0
                &&
                <h3>REVIEWS</h3>
            }
            <div className={style.container__reviews}>
                {
                    product?.reviews?.map(e => {
                        return (
                            <CardReview
                                id={e?._id}
                                user={e?.user}
                                review={e?.review}
                                date={e?.date}
                                userState={userState}
                                product={product}
                                rating={e?.rating}
                                key={e?._id}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}
