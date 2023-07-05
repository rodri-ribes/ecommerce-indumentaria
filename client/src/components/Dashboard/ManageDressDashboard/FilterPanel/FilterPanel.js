import React from 'react';
import style from './FilterPanel.module.scss';
import handleOnChange from '../../functions/handleOnChange';
import { listCategory, listBrand } from '../../functions/arraysOfSelect';

export default function FilterPanel({ stateFilters, setStateFilters }) {

    return (
        <div className={style.container__filters}>
            <h3>Filtros</h3>
            <div className={style.container__filters__inputs}>
                <div className={style.container__filters__inputs_group}>
                    <label>Marca</label>
                    <select name='brand' value={stateFilters.brand} onChange={e => handleOnChange(e, setStateFilters)}>
                        <option selected>Marca</option>
                        {listBrand.map((b, i) => <option value={b} key={i}>{b}</option>)}
                    </select>
                </div>
                <div className={style.container__filters__inputs_group}>
                    <label>Categoria</label>
                    <select name='category' value={stateFilters.category} onChange={e => handleOnChange(e, setStateFilters)}>
                        <option selected>Categoria</option>
                        {listCategory.map((b, i) => <option value={b} key={i}>{b}</option>)}
                    </select>
                </div>
                <div className={style.container__filters__inputs_group}>
                    <label>Precio</label>
                    <div className={style.container__filters__inputs_group__price}>
                        <input type="number" placeholder="Min" name='minPrice' value={stateFilters.minPrice} onChange={e => handleOnChange(e, setStateFilters)} />
                        <input type="number" placeholder="Max" name='maxPrice' value={stateFilters.maxPrice} onChange={e => handleOnChange(e, setStateFilters)} />
                    </div>
                </div>
                <div className={style.container__filters__inputs_group}>
                    <label>Buscador</label>
                    <input type="text" name='search' value={stateFilters.search} onChange={e => handleOnChange(e, setStateFilters)} placeholder='Buscar...' />
                </div>
            </div>
        </div>
    )
}
