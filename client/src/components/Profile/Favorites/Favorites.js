import React, { useEffect, useState } from 'react'
import style from './Favorites.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { favoriteProductAction, getProductAction, getUserAction } from '../../../redux/features/data/dataUser';
import { Pagination } from '../../Pagination/Pagination';

import { ImCross } from 'react-icons/im';

import Reload from '../../Reload/Reload'
import Warning from '../../Warning/Warning';

export default function Favorites({ user }) {

    let navigate = useNavigate()
    let dispatch = useDispatch()

    const showProduct = (id_edit) => {
        dispatch(getProductAction(id_edit))
        navigate(`/dress/${id_edit}`)
    }

    //logic of pagination

    const [filtrado, setFiltrado] = useState([])
    const [pagina, setPagina] = useState(1)

    useEffect(() => {
        setFiltrado([...user?.favorites])
    }, [user])

    const porPagina = 10;

    const ceil = filtrado.length / porPagina;

    const maximo = Math.ceil(ceil)

    return (
        <div className={style.container}>
            <Reload action={getUserAction} />
            {
                filtrado.length > 0 ?
                    filtrado?.slice(
                        (pagina - 1) * porPagina,
                        (pagina - 1) * porPagina + porPagina
                    ).map(e => {
                        return (
                            <div className={style.container__product}>
                                <ImCross onClick={() => dispatch(favoriteProductAction(e?._id))} />
                                <div className={style.container__product__data}>
                                    <img src={e?.image} />
                                    <div className={style.container__product__data__title}>
                                        <h3 onClick={() => showProduct(e?.id_edit)}>{e?.title}</h3>
                                        <p>{e?.content?.slice(0, 150)} ...</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <Warning title={"¡ Agrega productos a Favoritos !"} text={"Agrega productos que quieras ver mas tarde..."} />
            }

            {
                filtrado.length > 10 &&
                <div className={style.container__pagination}>
                    <Pagination
                        pagina={pagina}
                        setPagina={setPagina}
                        maximo={maximo}
                    />
                </div>
            }
        </div>
    )
}
