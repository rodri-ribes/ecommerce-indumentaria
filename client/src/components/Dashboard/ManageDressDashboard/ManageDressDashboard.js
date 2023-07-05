import React, { useEffect, useState } from 'react'
import style from './ManageDressDashboard.module.scss'

//------ Imports

import { useDispatch } from 'react-redux'

//------ Components

import Notification from '../../Notification/Notification';
import CardProductManage from './CardProductManage/CardProductManage'
import { Pagination } from '../../Pagination/Pagination'
import FilterPanel from './FilterPanel/FilterPanel.js';

//------ functions

import { filterTerm } from '../functions/filters'
import { getDressAction } from '../../../redux/features/data/dataUser'


//------ react icons

import { FiAlertCircle } from 'react-icons/fi'


const ManageDressDashboard = ({ dress }) => {

    let dispatch = useDispatch()

    useEffect(() => {
        if (!dress) dispatch(getDressAction())
    }, [])

    // ------ state de los filtros        

    const [stateFilters, setStateFilters] = useState({
        brand: "",
        category: "",
        search: "",
        minPrice: "",
        maxPrice: "",
    })

    // ------ logica del filtrado y paginado

    const [filtrado, setFiltrado] = useState([])
    const [pagina, setPagina] = useState(1)

    useEffect(() => {
        setFiltrado(dress)
    }, [dress])


    const porPagina = 10;

    const ceil = filtrado.length / porPagina;

    const maximo = Math.ceil(ceil)

    // ------ state para ocultar y mostrar los botones de general

    // const [showGeneral, setShowGeneral] = useState(false)

    return (
        <div className={style.container}>
            {/* <div className={style.container__general}>
                <h3>
                    General
                    {
                        showGeneral ?
                            <BsArrowDownShort onClick={() => setShowGeneral(false)} />
                            :
                            <BsArrowUpShort onClick={() => setShowGeneral(true)} />
                    }
                </h3>
                {
                    showGeneral &&
                    <div className={style.container__general__inputs}>
                        <div className={style.container__general__inputs_group}>
                            <button onClick={async () => {
                                const result = await CustomDialog(<IncreasePrice dispatch={dispatch} getDressAction={getDressAction} />, {
                                    title: 'Custom Dialog',
                                    showCloseIcon: true,
                                });
                            }}>Incrementar Precio  <BsCashCoin /></button>
                        </div>
                        <div className={style.container__general__inputs_group}>
                            <button>Ofertar Productos <AiFillEyeInvisible /></button>
                        </div>
                        <div className={style.container__general__inputs_group}>
                            <button>Ocultar Productos <AiFillEyeInvisible /></button>
                        </div>
                        <div className={style.container__general__inputs_group}>
                            <button>Eliminar Productos <AiFillDelete /></button>
                        </div>
                    </div>
                }
            </div> */}
            <FilterPanel stateFilters={stateFilters} setStateFilters={setStateFilters} />
            <div className={style.container__products}>

                {
                    dress?.length > 0 ?
                        filtrado.filter(filterTerm(stateFilters)).length > 0 ?
                            filtrado?.filter(filterTerm(stateFilters)).slice(
                                (pagina - 1) * porPagina,
                                (pagina - 1) * porPagina + porPagina
                            ).map((p, i) => {
                                return (

                                    <CardProductManage
                                        id={p.id_edit}
                                        title={p.title}
                                        price={p.price}
                                        content={p.content}
                                        img={p.image}
                                        show={p.show}
                                        discount={p.discount}
                                        oferta={p.oferta}
                                        key={p._id}
                                    />

                                )
                            })
                            :
                            <Notification icono={<FiAlertCircle />} text="NO HAY PRODUCTOS QUE COINCIDAN CON LOS FILTROS" />
                        :
                        <Notification icono={<FiAlertCircle />} text="NO HAY PRODUCTOS CARGADOS" />
                }
            </div>
            {
                filtrado.length > 10 &&
                <div>
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

export default ManageDressDashboard