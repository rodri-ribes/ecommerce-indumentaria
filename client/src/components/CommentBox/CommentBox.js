import React, { useState } from 'react'
import style from './CommentBox.module.scss';

//------ Imports
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//------ Components

import SpinnerButton from '../SpinnerButton/SpinnerButton'


//------ functions
import { createComment } from './functions/functions';
import CardComment from './CardComment/CardComment';


export default function CommentBox({ userState, product }) {

    let dispatch = useDispatch()


    const [comment, setComment] = useState("")
    const [send, setSend] = useState(false)

    // ---- function of submit comment

    const submitComment = () => {
        if (comment.length > 0 && comment.length <= 100) {
            setSend(true)
            createComment(userState, product, comment, dispatch, setComment, setSend)
        }
    }


    return (
        <div className={style.container}>
            {
                userState ?
                    <div className={style.container__box}>
                        <img src={userState?.image} alt="profile" />
                        <div className={style.container__box__content}>
                            <h3>{userState?.firstname}</h3>
                            <div className={style.container__box__content__inputs}>
                                <textarea
                                    type="text"
                                    placeholder={`Escribe tu pregunta...`}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    maxLength={100}
                                    minLength={1}
                                />
                                <button onClick={() => submitComment()} disabled={send ? true : false}>{send ? <SpinnerButton /> : "Comentar"}</button>
                            </div>
                        </div>
                    </div>
                    :
                    <h2>Para dejar un comentario sobre {product?.title}, tenes que
                        <Link to={"/signin"} className={style.link}> Inciar Sesión </Link>
                        o
                        <Link to={"/signup"} className={style.link}> Registrarte </Link>
                    </h2>
            }
            <div className={style.container__comments}>
                {
                    product?.comments?.length > 0
                    &&
                    <h3>COMENTARIOS</h3>
                }
                <div className={style.container__comments__list}>
                    {
                        product?.comments?.map(e => {
                            return (
                                <CardComment
                                    id={e?._id}
                                    user={e?.user}
                                    comment={e?.comment}
                                    date={e?.date}
                                    userState={userState}
                                    product={product}
                                    respAdmin={e?.response}
                                    key={e?._id}

                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
