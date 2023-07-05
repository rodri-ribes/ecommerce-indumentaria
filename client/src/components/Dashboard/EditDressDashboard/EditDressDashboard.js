import React, { useEffect, useState } from 'react'
import style from './EditDressDashboard.module.scss'

//------ Imports

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//------ Components

import Spinner from '../../Spinner/Spinner';

//------ functions

import { logicTalles, addTalleAndStockFunction, deleteTalleAndStock, deleteImages } from '../functions/logicOfTalleAndFilterCategory';
import { listCategory, listBrand } from '../functions/arraysOfSelect';
import { detectError } from '../functions/detectError'
import { getDressAction } from '../../../redux/features/data/dataUser';
import { deleteFile, uploadFile } from '../../../firebase/config.js'
import { handleOnChange, handleOnChangeSelectTalle } from '../functions/functions'
import { loadInputs, submitEditDress } from './functions/functions';

//------ react icons

import { ImCross } from 'react-icons/im'
import { AiOutlineUpload } from 'react-icons/ai'
import { BiCommentError } from 'react-icons/bi'



const EditDressDashboard = ({ dress }) => {

    let dispatch = useDispatch()

    let { id } = useParams()

    let navigate = useNavigate()

    // ------ state de inputs

    const [dataInputs, setDataInputs] = useState(false)

    // ------ carga de inputs

    useEffect(() => {
        loadInputs(dress, setDataInputs, id)
        return () => loadInputs(dress, setDataInputs, id)
    }, [id])


    // ------ state para aparecer msj de errores

    const [errorDetected, setErrorDetected] = useState({})

    // ------ state para guardar la carga del talle con su color y stock

    const [addTalleAndStock, setaddTalleAndStock] = useState({
        showTalles: [],
        talleSelected: "Talle",
        stockTalle: 0,
        color: ""
    })

    // ------ response axios

    const [response, setResponse] = useState({
        error: false,
        resp: "",
        show: false
    })

    // ------ state para que aparezca el spinner 

    const [addSuccess, setAddSuccess] = useState(false)

    // ------ useEffect escuchando la categoria seleccionada para el filtrado

    useEffect(() => {
        logicTalles(dataInputs.category, setaddTalleAndStock, setDataInputs)

        return () => {
            logicTalles(dataInputs.category, setaddTalleAndStock, setDataInputs)
        }
    }, [dataInputs.category])


    return (
        <div className={style.container}>
            {
                addSuccess ?
                    <Spinner />
                    :
                    <>
                        <div className={style.container__form}>
                            <div className={style.container__form__section}>
                                <div className={style.container__form__section__group}>
                                    <label>Titulo</label>
                                    <input className={style.container__form__section__group_input}
                                        type="text"
                                        id="title"
                                        name="title"
                                        onChange={e => handleOnChange(e, errorDetected, setErrorDetected, setDataInputs)}
                                        value={dataInputs.title}
                                        maxLength={150}

                                    />
                                    {errorDetected?.title && <div className={style.container__form__section__group_error}><p>{errorDetected?.title}</p> <BiCommentError /></div>}
                                </div>
                                <div className={style.container__form__section__group}>
                                    <label>Descripción</label>
                                    <textarea className={`${style.container__form__section__group_input} ${style.container__form__section__group_textarea}`}
                                        type="text"
                                        id="content"
                                        name="content"
                                        onChange={e => handleOnChange(e, errorDetected, setErrorDetected, setDataInputs)}
                                        value={dataInputs.content}
                                        maxLength={300}

                                    />
                                    {errorDetected?.content && <div className={style.container__form__section__group_error}><p>{errorDetected?.content}</p> <BiCommentError /></div>}
                                </div>

                                <div className={style.container__form__section__group}>
                                    <label>Marca</label>
                                    <select className={style.container__form__section__group_input}
                                        defaultValue={dataInputs.brand}
                                        onChange={e => handleOnChange(e, errorDetected, setErrorDetected, setDataInputs)}
                                        name="brand"
                                    >
                                        <option selected>Selecciona una Marca</option>
                                        {listBrand.map((t, i) => <option key={i} value={t}>{t}</option>)}
                                    </select>
                                    {errorDetected?.brand && <div className={style.container__form__section__group_error}><p>{errorDetected?.brand}</p> <BiCommentError /></div>}
                                </div>
                                <div className={style.container__form__section__group}>
                                    <label>Categoria</label>
                                    <select
                                        className={style.container__form__section__group_input}
                                        defaultValue={dataInputs.category}
                                        onChange={e => handleOnChange(e, errorDetected, setErrorDetected, setDataInputs)}
                                        name="category"
                                    >
                                        <option selected>Selecciona una Categoria</option>
                                        {listCategory.map((t, i) => <option key={i} value={t}>{t}</option>)}
                                    </select>
                                    {errorDetected?.category && <div className={style.container__form__section__group_error}><p>{errorDetected?.category}</p> <BiCommentError /></div>}
                                </div>
                            </div>
                            <div className={style.container__form__section}>

                                {
                                    dataInputs.category !== "Selecciona una Categoria" &&
                                    <div className={style.container__form__section__group}>
                                        <label>Talle y Stock</label>
                                        <div className={style.container__form__section__group__ListTalleAndStock}>
                                            {

                                                dataInputs?.talles?.map((t, i) => {
                                                    return (
                                                        <div key={i} className={style.container__form__section__group__ListTalleAndStock_group}>
                                                            <div className={style.container__form__section__group__ListTalleAndStock_group__talleAndCross}>
                                                                <p>Talle <b>{t?.talle}:</b></p>
                                                                <ImCross onClick={() => deleteTalleAndStock(t.talle, t.color, t.stock, setDataInputs, dataInputs.talleAndStock)} />
                                                            </div>
                                                            <ul>
                                                                {
                                                                    t.listado.map(e => <li>Color: {e.color} - Cantidad: {e.stock}</li>)
                                                                }
                                                            </ul>
                                                        </div>
                                                    )
                                                })

                                            }
                                        </div>
                                        <div className={style.container__form__section__group__containerTalles}>
                                            <div className={style.container__form__section__group__containerTalles__inputs}>
                                                <select
                                                    className={style.container__form__section__group_input}
                                                    onChange={e => handleOnChangeSelectTalle(e, errorDetected, setErrorDetected, setaddTalleAndStock)}
                                                    name="talleSelected"
                                                    defaultValue={addTalleAndStock.talleSelected}
                                                >
                                                    <option selected>Talle</option>
                                                    {addTalleAndStock.showTalles.map((t, i) => <option key={i} value={t}>{t}</option>)}
                                                </select>
                                                <input
                                                    type="text"
                                                    className={style.container__form__section__group_input}
                                                    onChange={e => handleOnChangeSelectTalle(e, errorDetected, setErrorDetected, setaddTalleAndStock)}
                                                    maxLength={20}
                                                    value={addTalleAndStock.color}
                                                    placeholder="Color"
                                                    name='color'
                                                />
                                                <input
                                                    type="number"
                                                    className={style.container__form__section__group_input}
                                                    onChange={e => handleOnChangeSelectTalle(e, errorDetected, setErrorDetected, setaddTalleAndStock)}
                                                    maxLength={10}
                                                    value={addTalleAndStock.stockTalle}
                                                    placeholder="stockTalle"
                                                    name='stockTalle'
                                                />
                                            </div>
                                            <button type="button" onClick={(e) => addTalleAndStockFunction(e, dataInputs.talles, addTalleAndStock.talleSelected, addTalleAndStock.color, addTalleAndStock.stockTalle, setDataInputs, setaddTalleAndStock, "talles")
                                            }>AGREGAR</button>
                                        </div>
                                        {errorDetected?.talleAndStock && <div className={style.container__form__section__group_error}><p>{errorDetected?.talleAndStock}</p> <BiCommentError /></div>}
                                    </div>
                                }
                                <div className={style.container__form__section__group}>
                                    <label>Precio</label>
                                    <input className={style.container__form__section__group_input}
                                        type="number"
                                        id="price"
                                        name="price"
                                        onChange={e => handleOnChange(e, errorDetected, setErrorDetected, setDataInputs)}
                                        value={dataInputs.price}
                                        maxLength={10}
                                    />
                                    {errorDetected?.price && <div className={style.container__form__section__group_error}><p>{errorDetected?.price}</p> <BiCommentError /></div>}
                                </div>
                                <div className={style.container__form__section__group}>
                                    <p className={style.container__form__section__group_alert}>* Si subis nuevas imagenes, se borraran las anteriores.</p>
                                    <div className={`${style.container__form__section__group__btnImage} ${dataInputs.images?.length > 0 ? style.container__form__section__group__image_loaded : null}`}>
                                        <AiOutlineUpload />
                                        <p>{dataInputs.images?.length > 0 ? "IMAGENES CARGADAS" : "CARGA IMAGENES"}</p>
                                        <input type="file" accept='.png, .jpg' multiple name="images" onChange={e => {
                                            setDataInputs(prevState => ({
                                                ...prevState,
                                                [e.target.name]: e.target.files
                                            }))
                                            if (Object.keys(errorDetected).includes(e?.target.name)) {
                                                setErrorDetected(prev => ({
                                                    ...prev,
                                                    [e.target.name]: ""
                                                }))
                                            }
                                        }} />
                                    </div>
                                    <br />
                                    <div className={style.container__form__section__group__uploadImages}>
                                        {
                                            dataInputs.images?.length > 0 &&
                                            Object.values(dataInputs.images)?.map((o, i) => {
                                                return (
                                                    <div className={style.container__form__section__group__uploadImages_group} key={i}>
                                                        <p>{o?.name}</p>
                                                        <ImCross onClick={() => deleteImages(o?.name, setDataInputs, dataInputs.images)} />
                                                    </div>
                                                )
                                            })}
                                    </div>
                                    {errorDetected?.images && <div className={style.container__form__section__group_error}><p>{errorDetected?.images}</p> <BiCommentError /></div>}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => submitEditDress(id, detectError, dataInputs, setAddSuccess, deleteFile, uploadFile, setResponse, dispatch, getDressAction, navigate, setErrorDetected)} className={style.buttonSubmit}>ACTUALIZAR PRODUCTO</button>
                    </>
            }
        </div>
    )
}

export default EditDressDashboard