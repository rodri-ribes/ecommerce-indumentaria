import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import getDate from '../../functions/getDate';
import { addMsjTemp } from '../../redux/features/data/dataUser';
import style from './Chat.module.scss';
import submitMessage from './submitMessage';

const { REACT_APP_API } = process.env


export default function Chat({ messages, id, user, dispatch, access }) {


    const [newMessage, setNewMessage] = useState({
        usuario: access === "admin" ? "Admin" : user?.firstname,
        text: "",
        date: getDate("full"),
    });

    const [chat, setChat] = useState(messages)

    useEffect(() => {
        setChat(messages)
    }, [messages])

    return (
        <div className={style.container}>
            <div className={style.container__messages}>
                {chat.map(e => {
                    return (
                        <div className={style.container__messages__group}>
                            <div style={e?.usuario !== "Admin" ? { alignSelf: "flex-end", background: "#0084FF" } : { alignSelf: "flex-start", background: "#3E4042" }}>
                                <p className={style.container__messages__group_hour}>{e?.date}</p>
                                <p className={style.container__messages__group_text}>
                                    <b style={e?.usuario !== "Admin" ? { display: "none" } : { display: "flex" }}>{e?.usuario}: </b>
                                    {e?.text}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <form className={style.container__inputs}>
                <input type="text" value={newMessage.text} onChange={(e) => setNewMessage(prev => ({
                    ...prev,
                    text: e?.target?.value?.charAt(0).toUpperCase() + e?.target?.value?.slice(1)
                }))} />
                <button type='submit' onClick={(e) => {
                    submitMessage(e, id, newMessage, setNewMessage, setChat, dispatch, access)
                }}>Enviar</button>
            </form>
        </div>

    )
}
