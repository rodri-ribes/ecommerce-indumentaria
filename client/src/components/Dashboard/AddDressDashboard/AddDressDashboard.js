import React, { useEffect, useState } from 'react'
import style from './AddDressDashboard.module.scss'

//------ Imports
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//------ Components

import Spinner from '../../Spinner/Spinner';

//------ functions

import { uploadFile } from '../../../firebase/config.js'
import { getDressAction } from '../../../redux/features/data/dataUser';
import { logicTalles, addTalleAndStockFunction, deleteTalleAndStock, deleteImages } from '../functions/logicOfTalleAndFilterCategory';
import { handleOnChange, handleOnChangeSelectTalle } from '../functions/functions';
import { submitAddDress } from './functions/submitAddDress';
import { listCategory, listBrand } from '../functions/arraysOfSelect';

//------ react icons

import { ImCross } from 'react-icons/im'
import { AiOutlineUpload, AiOutlineFolderAdd } from 'react-icons/ai'
import { BiCommentError } from 'react-icons/bi'

const AddDressDashboard = ({ dress }) => {

    let dispatch = useDispatch()
    let navigate = useNavigate()


    // ------ state de categoria

    let inputs = {
        title: "",
        content: "",
        brand: "Selecciona una Marca",
        category: "Selecciona una Categoria",
        price: 1,
        images: [],
        talleAndStock: []
    }

    const [dataInputs, setDataInputs] = useState(inputs)

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
                                        maxLength={70}
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
                                                dataInputs.talleAndStock?.map((t, i) => {
                                                    return (
                                                        <div key={i} className={style.container__form__section__group__ListTalleAndStock_group}>
                                                            <div className={style.container__form__section__group__ListTalleAndStock_group__talleAndCross}>
                                                                <p>Talle <b>{t?.talle}:</b></p>
                                                                <ImCross onClick={() => deleteTalleAndStock(t.talle, t.color, t.stock, setDataInputs, dataInputs.talleAndStock)} />
                                                            </div>
                                                            <ul>
                                                                {
                                                                    t.listado.map(e => <li>Color: {e.color.charAt(0).toUpperCase() + e.color.slice(1)} - Cantidad: {e.stock}</li>)
                                                                }
                                                            </ul>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className={style.container__form__section__group__containerTalles}>
                                            <form className={style.container__form__section__group__containerTalles__inputs}>
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
                                                <button type="submit" onClick={(e) => addTalleAndStockFunction(e, dataInputs.talleAndStock, addTalleAndStock.talleSelected, addTalleAndStock.color, addTalleAndStock.stockTalle, setDataInputs, setaddTalleAndStock)}>AGREGAR</button>
                                            </form>
                                        </div>
                                        {errorDetected?.talleSelected && <div className={style.container__form__section__group_error}><p>{errorDetected?.talleSelected}</p> <BiCommentError /></div>}
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
                        <button onClick={() => submitAddDress(setAddSuccess, dataInputs, setResponse, errorDetected, setErrorDetected, uploadFile, getDressAction, dispatch, setDataInputs, inputs, navigate)} className={style.buttonSubmit}>CARGAR PRODUCTO <AiOutlineFolderAdd /></button>
                    </>
            }
        </div>
    )
}

export default AddDressDashboard