import React from 'react'
import style from './Reload.module.scss';

import { TfiReload } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import { timeReload } from '../../redux/features/data/dataUser';

export default function Reload({ action }) {

    let dispatch = useDispatch()
    let reload = useSelector(state => state.dataUser.reload)

    const submit = () => {
        if (reload) {
            dispatch(action())
            dispatch(timeReload(false))
        }
    }

    return (
        <div className={style.container}>
            <button onClick={() => submit()}><TfiReload /></button>
        </div>
    )
}
