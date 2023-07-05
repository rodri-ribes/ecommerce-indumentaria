import React from 'react'
import style from './Notification.module.scss';

const Notification = ({ icono, text }) => {
    return (
        <div className={style.container}>
            {icono}
            <p>{text}</p>
        </div>
    )
}

export default Notification;