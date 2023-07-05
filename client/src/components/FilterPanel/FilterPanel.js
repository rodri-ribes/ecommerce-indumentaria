import React, { useEffect, useState } from 'react'
import style from './FilterPanel.module.scss'

//------ functions

import handleOnChange from '../Dashboard/functions/handleOnChange'
import { listCategory, listBrand } from '../Dashboard/functions/arraysOfSelect'

const FilterPanel = ({ inputsFilter, setInputsFilter }) => {

    return (
        <div className={style.container}>
            <div className={style.container__group}>
                <label>Marca</label>
                <select name='brand' onChange={e => handleOnChange(e, setInputsFilter)} value={inputsFilter.brand}>
                    <option selected>Selecciona Marca</option>
                    {
                        listBrand.map((p, i) => <option key={i} value={p}>{p}</option>)
                    }
                </select>
            </div>
            <div className={style.container__group}>
                <label>Rango de Precio</label>
                <div className={style.container__group__rangeprice}>
                    <input type="number" name='minPrice' placeholder='Min' onChange={e => handleOnChange(e, setInputsFilter)} value={inputsFilter.minPrice} />
                    <input type="number" name='maxPrice' placeholder='Max' onChange={e => handleOnChange(e, setInputsFilter)} value={inputsFilter.maxPrice} />
                </div>
            </div>
            <div className={style.container__group}>
                <label>Categoria</label>
                <select name='category' onChange={e => handleOnChange(e, setInputsFilter)} value={inputsFilter.category}>
                    <option value={0} selected>Selecciona Categoria</option>
                    {
                        listCategory.map((p, i) => <option key={i} value={p}>{p}</option>)
                    }
                </select>
            </div>
            {/* {
                inputsFilter.showTalles.length > 0 &&
                <div className={style.container__group}>
                    <label>Talle</label>
                    <select name='talle' onChange={e => handleOnChange(e, setInputsFilter)} value={inputsFilter.talle}>
                        <option value={0} selected>Selecciona Talle</option>
                        {
                            inputsFilter.showTalles.map((p, i) => <option key={i} value={p}>{p}</option>)
                        }
                    </select>
                </div>
            } */}
            {/* <div className={style.container__group}>
                <label>Solo Ofertas</label>
                <div className={style.container__group__oferta}>
                    <input type="checkbox" name='oferta' onChange={e => handleOnChange(e, setInputsFilter)} value={inputsFilter.oferta} />
                    <p>Activar Filtro</p>
                </div>
            </div> */}

        </div>
    )
}

export default FilterPanel