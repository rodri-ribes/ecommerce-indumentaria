import React from 'react';
import style from './FilterOfCustomers.module.scss';
import handleOnChange from '../../functions/handleOnChange';
import { listCategory, listBrand } from '../../functions/arraysOfSelect';

export default function FilterOfCustomers({ stateFilters, setStateFilters, optionsFilter }) {




    return (
        <div className={style.container__filters}>
            <h3>Filtros</h3>
            <div className={style.container__filters__inputs}>
                <div className={style.container__filters__inputs_group}>
                    <label>Clientes</label>
                    <select name='firstname' value={stateFilters.firstname} onChange={e => handleOnChange(e, setStateFilters)}>
                        <option selected>Selecciona Cliente</option>
                        {[... new Set(optionsFilter?.firstname?.reverse())]?.map((b, i) => <option value={b} key={i}>{b}</option>)}
                    </select>
                </div>
                <div className={style.container__filters__inputs_group}>
                    <label>Estado de Venta</label>
                    <select name='status' value={stateFilters.status} onChange={e => handleOnChange(e, setStateFilters)}>
                        <option selected>Selecciona Estado</option>
                        {[... new Set(optionsFilter?.status)]?.map((b, i) => <option value={b} key={i}>{b}</option>)}
                    </select>
                </div>
                <div className={style.container__filters__inputs_group}>
                    <label>Fecha de Venta</label>
                    <select name='date' value={stateFilters.date} onChange={e => handleOnChange(e, setStateFilters)}>
                        <option selected>Selecciona Fecha</option>
                        {[... new Set(optionsFilter?.date?.reverse())]?.map((b, i) => <option value={b} key={i}>{b}</option>)}
                    </select>
                </div>
                <div className={style.container__filters__inputs_group}>
                    <label>Rango de Venta</label>
                    <div className={style.container__filters__inputs_group__price}>
                        <input type="number" placeholder="Min" name='quantityFOProductsMin' value={stateFilters.quantityFOProductsMin} onChange={e => handleOnChange(e, setStateFilters)} />
                        <input type="number" placeholder="Max" name='quantityFOProductsMax' value={stateFilters.quantityFOProductsMax} onChange={e => handleOnChange(e, setStateFilters)} />
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
