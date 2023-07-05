import React, { useState } from 'react'
import style from './IncreasePrice.module.scss'

//------ Imports

import axios from 'axios'

//------ functions

import handleOnChange from '../../functions/handleOnChange'

//------ PROCESS .ENV

const { REACT_APP_API } = process.env


const IncreasePrice = ({ dispatch, getClothes }) => {

    let listPorcentaje = []

    for (let i = 1; i < 21; i++) {
        listPorcentaje.push(i * 5)
    }

    const [input, setInput] = useState({
        porcentaje: 0,
        numero: 0
    })

    const submitPrice = async (button) => {

        const user = JSON.parse(window.localStorage.getItem("user"))

        if (input.numero > 0 && button == "numero") {
            try {
                await axios.patch(`${REACT_APP_API}/product/updateall`, {
                    number: parseFloat(input.numero)
                }, {
                    headers: {
                        'x-access-token': user.token
                    }
                })
            } catch (error) {
                console.log(error)
            }
        } else if (input.porcentaje > 0 && button == "porcentaje") {
            try {
                await axios.patch(`${REACT_APP_API}/product/updateall`, {
                    number: parseFloat(input.porcentaje)
                }, {
                    headers: {
                        'x-access-token': user.token
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(getClothes())
    }



    return (
        <div className={style.container}>
            <div className={style.container__inputs}>
                <label>Incrementar por Porcentaje</label>
                <div className={style.container__inputs_group}>
                    <select name='porcentaje' onChange={e => handleOnChange(e, setInput)}>
                        {listPorcentaje.map((p, i) => <option key={i} value={`${0}.` + p}>{p} %</option>)}
                    </select>
                    <button onClick={() => submitPrice("porcentaje")}>Aplicar</button>
                </div>
                <label>Incrementar por Numero</label>
                <div className={style.container__inputs_group}>
                    <input type="number" name='numero' onChange={e => handleOnChange(e, setInput)} />
                    <button onClick={() => submitPrice("numero")}>Aplicar</button>
                </div>
            </div>
            <p>Se le aplicara a todos los productos</p>
        </div>
    )
}

export default IncreasePrice