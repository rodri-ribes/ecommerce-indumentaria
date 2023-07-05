import React, { useEffect, useState } from 'react'
import style from './Search.module.scss';

//------ Imports
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Warning from '../Warning/Warning';
//------ react icons
import { RxCross2 } from 'react-icons/rx'


export const Search = ({ setShowComponents, showComponents }) => {

    let dress = useSelector(state => state.dataUser.dress)

    const [search, setSearch] = useState("")
    const [filtrar, setFiltrar] = useState([])

    useEffect(() => {
        setFiltrar(dress)
    }, [dress])

    const filterTerm = (search) => {
        return function (x) {
            return (
                x?.title?.toLowerCase()?.includes(search) || !search
            )
        }
    }


    return (
        <div className={style.container}>
            <div className={style.container__search}>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder='Buscar...' />
                {
                    (search.length > 0 || window.innerWidth < 968) &&
                    <div className={style.container__search__button}>
                        <RxCross2 onClick={() => {
                            setShowComponents(prev => ({
                                search: false,
                                cart: false,
                                mobile: false
                            }))
                            setSearch("")
                        }} />
                    </div>
                }
            </div>
            <div className={style.container__list} style={search?.length > 0 ? { display: "flex" } : { display: "none" }}>

                {
                    filtrar?.filter(filterTerm(search))?.length > 0 ?
                        filtrar?.filter(filterTerm(search))?.map((p, i) => {
                            return (
                                <>
                                    <Link to={`/dress/${p?.id_edit}`} onClick={() => setSearch("")} key={i} className={style.container__list__product}>
                                        <img src={p?.image[0]} />
                                        {
                                            p?.discount > 0 &&
                                            <div className={style.container__list__product__off}>
                                                <p>{p?.oferta}% OFF</p>
                                            </div>
                                        }
                                        <div className={style.container__list__product__data}>
                                            <h4>{p?.title}</h4>
                                            <p>{p?.content.slice(0, 100)} {p?.content.length > 150 && ". . ."}</p>

                                        </div>
                                    </Link>
                                    {filtrar?.filter(filterTerm(search))?.length !== i + 1 && <hr />}
                                </>
                            )
                        })
                        :
                        <h3>No se encontro resultados...</h3>
                }
            </div>
        </div>
    )
}
