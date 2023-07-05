import React, { useEffect, useState } from 'react'
import style from './CardComment.module.scss'

import { RxCross1 } from 'react-icons/rx'
import { BsArrowReturnRight } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { deleteComment, deleteResponse, responseComment, updateComment } from '../functions/functions';
import { useDispatch } from 'react-redux';

export default function CardComment({ id, user, date, comment, userState, product, respAdmin }) {

    let dispatch = useDispatch()

    // ---- state para ocultar los btns

    const [showButtons, setShowButtons] = useState(user?._id === userState?._id || userState?.rol === "admin")

    useEffect(() => {
        setShowButtons(user?._id === userState?._id || userState?.rol === "admin")
    }, [user?._id, userState])

    // ---- state para nuevo comentario
    const [newComment, setNewComment] = useState(comment)
    const [showInput, setShowInput] = useState(false)

    // ---- state para responder al user

    const [showResponse, setShowResponse] = useState(false)
    const [response, setResponse] = useState("")

    // ---- state para editar la respuesta del admin

    const [editResponse, setEditResponse] = useState(respAdmin?.comment ? respAdmin?.comment : "")
    const [showEditResponse, setShowEditResponse] = useState(false)


    // ---- function of new comment

    const submitNewComment = () => {
        if (newComment.length > 0 && newComment.length <= 100) {
            setShowInput(false)
            updateComment(id, newComment, dispatch)
        }
    }

    // ---- function of response admin

    const submitResponse = () => {
        if (response.length > 0 && response.length <= 100) {
            setShowResponse(false);
            responseComment(id, response, product, userState?.firstname, dispatch)
        }
    }

    // ---- function of edit response

    const submitNewResponse = () => {
        if (editResponse.length > 0 && editResponse.length <= 100) {
            setShowEditResponse(false);
            responseComment(id, editResponse, product, userState?.firstname, dispatch)
        }
    }

    return (
        <div className={style.container}>
            {/* <img src={`https://i2.wp.com/cdn.auth0.com/avatars/${firstname?.toLowerCase()?.charAt(0)}.png?ssl=1`} alt="profile" /> */}
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
                            <RxCross1 onClick={() => deleteComment(id, product, dispatch)} />
                        }
                    </div>
                </div>
                {
                    showInput ?
                        <div className={style.container__content__inputs}>
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                maxLength={100}
                                minLength={1}
                            />
                            <div className={style.container__content__inputs__button}>
                                <button onClick={() => submitNewComment()}>Actualizar</button>
                                <button onClick={() => setShowInput(false)}>Cancelar</button>
                            </div>
                        </div>
                        :
                        <p>{comment?.charAt(0).toUpperCase() + comment?.slice(1)}</p>
                }

                <div className={style.container__content__response}>
                    {
                        userState.rol === "admin" && !respAdmin && !showResponse && !showInput &&
                        <p className={style.container__content__response_show} onClick={() => setShowResponse(true)}>Responder</p>
                    }
                    {
                        respAdmin &&
                        <div className={style.container__content__response__nickAndButtons}>
                            <p className={style.container__content__response__nickAndButtons_nickAdmin}>
                                <BsArrowReturnRight /> {respAdmin?.firstname}  <b>Admin</b>
                            </p>
                            <div>
                                <p>{respAdmin?.date}</p>
                                {
                                    <AiOutlineEdit onClick={() => setShowEditResponse(true)} />
                                }
                                {
                                    <RxCross1 onClick={() => deleteResponse(id, product, dispatch)} />
                                }
                            </div>
                        </div>
                    }
                    {
                        showResponse ?
                            <div className={style.container__content__response__inputs}>
                                <input
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                    type={"text"}
                                    placeholder={`Escribe una respuesta para ${user?.firstname}`}
                                    maxLength={100}
                                    minLength={1}
                                />
                                <div className={style.container__content__response__inputs__button}>
                                    <button onClick={() => submitResponse()}>Responder</button>
                                    <button onClick={() => setShowResponse(false)}>Cancelar</button>
                                </div>
                            </div>
                            :

                            showEditResponse ?
                                <div className={style.container__content__response__inputs}>
                                    <input
                                        value={editResponse}
                                        onChange={(e) => setEditResponse(e.target.value)}
                                        type={"text"}
                                        placeholder={`${respAdmin?.comment ? respAdmin?.comment : ""}`}
                                        maxLength={100}
                                        minLength={1}
                                    />
                                    <div className={style.container__content__response__inputs__button}>

                                        <button onClick={() => submitNewResponse()}>Actualizar</button>
                                        <button onClick={() => setShowEditResponse(false)}>Cancelar</button>
                                    </div>
                                </div>
                                :
                                <p className={style.container__content__response_response}>{respAdmin?.comment}</p>

                    }
                </div>
            </div>
        </div>

    )
}
