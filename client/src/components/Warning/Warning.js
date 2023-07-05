import React from 'react'
import style from './Warning.module.scss';

export default function Warning({ title, text }) {
    return (
        <div className={style.container}>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}
