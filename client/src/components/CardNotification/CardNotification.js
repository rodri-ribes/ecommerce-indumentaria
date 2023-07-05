import React from 'react'
import style from './CardNotification.module.scss'

import { IoIosAlert } from 'react-icons/io'
import { BsFillCheckCircleFill } from 'react-icons/bs'

export default function CardNotification({ title, state }) {

    let date = new Date()

    return (
        <div className={style.container}>
            <div className={style.container__data}>
                <p>{date.getHours()}:{date.getMinutes() < 10 ? 0 + date.getMinutes() : date.getMinutes()}</p>
                <h3>{title}</h3>
            </div>
            {
                state === "alert" ?
                    <IoIosAlert style={{ color: "red" }} />
                    :
                    <BsFillCheckCircleFill style={{ color: "green" }} />
            }
        </div>
    )
}
