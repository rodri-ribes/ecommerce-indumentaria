import React, { useEffect, useState } from 'react'
import style from './Settings.module.scss'

//------ Imports

import { useDispatch, useSelector } from 'react-redux';

//------ Components

import Spinner from '../../Spinner/Spinner';
import Reload from '../../Reload/Reload'

//------ react icons

import { AiOutlineEdit } from 'react-icons/ai'
import { ImCancelCircle, } from 'react-icons/im'
import { BsCheck2Circle, } from 'react-icons/bs'
import handleOnChange from '../../Dashboard/functions/handleOnChange';
import { updateImage, updatePassword, updateUser } from './functions/functions';
import { getUserAction } from '../../../redux/features/data/dataUser';
import { BiCommentError } from 'react-icons/bi';

const Settings = ({ user }) => {

    let dispatch = useDispatch()

    const [activeEdit, setActiveEdit] = useState(false)

    const [activeEditPassword, setActiveEditPassword] = useState(false)

    //state para los errores
    const [error, setError] = useState(false)

    const [data, setData] = useState({
        firstname: user?.firstname,
        lastname: user?.lastname,
        direccion: user?.domicilio?.direccion,
        localidad: user?.domicilio?.localidad,
        provincia: user?.domicilio?.provincia,
        codigo_postal: user?.domicilio?.codigo_postal,
        email: user?.email,
        whatsapp: user?.whatsapp,
    })

    useEffect(() => {
        setData({
            firstname: user?.firstname,
            lastname: user?.lastname,
            direccion: user?.domicilio?.direccion,
            localidad: user?.domicilio?.localidad,
            provincia: user?.domicilio?.provincia,
            codigo_postal: user?.domicilio?.codigo_postal,
            email: user?.email,
            whatsapp: user?.whatsapp,
        })
    }, [])



    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: ""
    })

    const [upload, setUpload] = useState({
        img: false,
        show: false
    })

    return (
        <div className={style.container}>
            <Reload action={getUserAction} />
            <div className={style.container__settings}>
                {
                    user ?
                        <>
                            <div className={style.container__edit}>
                                {
                                    !activeEdit &&
                                    <AiOutlineEdit onClick={() => setActiveEdit(true)} />
                                }
                            </div>
                            <div className={style.container__oneSection}>
                                <div className={style.container__oneSection__image}>
                                    {

                                        <img src={upload.img ? URL.createObjectURL(upload.img) : user?.image} alt={user.firstname} className={style.container__oneSection_img} />
                                    }
                                    <div className={style.container__oneSection__image__upload}>
                                        <input type="file" accept=".jpg, .png" onChange={e => {
                                            setUpload(prev => ({ ...prev, img: e.target.files[0], show: true }))
                                        }} />
                                        <AiOutlineEdit />
                                    </div>
                                </div>
                                <div className={style.container__oneSection__data}>
                                    {
                                        activeEdit ?
                                            <div className={style.container__oneSection__data__inputs}>
                                                <input
                                                    type="text"
                                                    value={data.firstname}
                                                    name="firstname"
                                                    onChange={((e) => handleOnChange(e, setData))}
                                                    minLength={3}
                                                    maxLength={15}

                                                />
                                                <input
                                                    type="text"
                                                    value={data.lastname}
                                                    name="lastname"
                                                    onChange={((e) => handleOnChange(e, setData))}
                                                    minLength={3}
                                                    maxLength={15}
                                                />
                                            </div>
                                            :
                                            <p className={style.container__oneSection__data_name}>{user.firstname} {user.lastname}</p>
                                    }
                                </div>
                            </div>
                            {
                                error?.firstname && activeEdit &&
                                <div className={style.message__error}>
                                    <p>{error?.firstname}</p>
                                    <BiCommentError />
                                </div>
                            }
                            {
                                error?.lastname && activeEdit &&
                                <div className={style.message__error}>
                                    <p>{error?.lastname} </p>
                                    <BiCommentError />
                                </div>
                            }
                            <div className={style.container__twoSection}>
                                <h3>Domicilio</h3>
                                <div className={style.container__twoSection__group}>
                                    <b>Dirección: </b>
                                    {
                                        activeEdit ?
                                            <input
                                                type="text"
                                                placeholder='Ej: 10 N 400'
                                                value={data.direccion}
                                                name="direccion"
                                                onChange={((e) => handleOnChange(e, setData))}
                                                minLength={3}
                                                maxLength={30}
                                            />
                                            :
                                            <p> {user?.domicilio?.direccion}</p>
                                    }
                                </div>
                                {
                                    error?.direccion && activeEdit &&
                                    <div className={style.message__error}>
                                        <p>{error?.direccion} </p>
                                        <BiCommentError />
                                    </div>
                                }
                                <div className={style.container__twoSection__group}>
                                    <b>Localidad: </b>
                                    {
                                        activeEdit ?
                                            <input
                                                type="text"
                                                value={data.localidad}
                                                name="localidad"
                                                onChange={((e) => handleOnChange(e, setData))}
                                                minLength={3}
                                                maxLength={30}
                                            />
                                            :
                                            <p>  {user?.domicilio?.localidad}</p>
                                    }
                                </div>
                                {
                                    error?.localidad && activeEdit &&
                                    <div className={style.message__error}>
                                        <p>{error?.localidad}</p>
                                        <BiCommentError />
                                    </div>
                                }
                                <div className={style.container__twoSection__group}>
                                    <b>Provincia: </b>
                                    {
                                        activeEdit ?
                                            <input
                                                type="text"
                                                value={data.provincia}
                                                name="provincia"
                                                onChange={((e) => handleOnChange(e, setData))}
                                                minLength={3}
                                                maxLength={30}
                                            />
                                            :
                                            <p>  {user?.domicilio?.provincia}</p>

                                    }
                                </div>
                                {
                                    error?.provincia && activeEdit &&
                                    <div className={style.message__error}>
                                        <p>{error?.provincia}</p>
                                        <BiCommentError />
                                    </div>
                                }
                                <div className={style.container__twoSection__group}>
                                    <b>Codigo Postal: </b>
                                    {
                                        activeEdit ?
                                            <input
                                                type="number"
                                                value={data.codigo_postal}
                                                name="codigo_postal"
                                                onChange={((e) => handleOnChange(e, setData))}
                                                minLength={3}
                                                maxLength={5}
                                            />
                                            :
                                            <p>  {user?.domicilio?.codigo_postal}</p>
                                    }
                                </div>
                                {
                                    error?.codigo_postal && activeEdit &&
                                    <div className={style.message__error}>
                                        <p>{error?.codigo_postal}</p>
                                        <BiCommentError />
                                    </div>
                                }
                            </div>
                            <div className={style.container__twoSection}>
                                <h3>Datos de Contacto</h3>
                                <div className={style.container__twoSection__group}>
                                    <b>Email: </b>
                                    {
                                        activeEdit ?
                                            <input
                                                type="email"
                                                value={data.email}
                                                name="email"
                                                onChange={((e) => handleOnChange(e, setData))}
                                                minLength={3}
                                                maxLength={30}
                                            />
                                            :
                                            <p> {user?.email}</p>
                                    }
                                </div>
                                {
                                    error?.email && activeEdit &&
                                    <div className={style.message__error}>
                                        <p>{error?.email}</p>
                                        <BiCommentError />
                                    </div>
                                }
                                <div className={style.container__twoSection__group}>
                                    <b>WhatsApp: </b>
                                    {
                                        activeEdit ?
                                            <input
                                                type="number"
                                                value={data.whatsapp}
                                                name="whatsapp"
                                                onChange={((e) => handleOnChange(e, setData))}
                                                minLength={3}
                                                maxLength={15}
                                            />
                                            :
                                            <p> {user?.whatsapp}</p>
                                    }
                                </div>
                                {
                                    error?.whatsapp && activeEdit &&
                                    <div className={style.message__error}>
                                        <p>{error?.whatsapp}</p>
                                        <BiCommentError />
                                    </div>
                                }
                            </div>
                            <div className={style.container__twoSection}>
                                <h3>Actualizar Contraseña</h3>
                                <div className={style.container__twoSection__group}>
                                    <b>Contraseña: </b>
                                    {
                                        activeEditPassword ?
                                            <div>
                                                <input
                                                    type="password"
                                                    value={password.oldPassword}
                                                    name="oldPassword"
                                                    placeholder='Contraseña Actual'
                                                    onChange={((e) => handleOnChange(e, setPassword))}
                                                    minLength={3}
                                                    maxLength={15}
                                                />
                                                <input
                                                    type="password"
                                                    placeholder='Nueva Contraseña'
                                                    value={password.newPassword}
                                                    name="newPassword"
                                                    onChange={((e) => handleOnChange(e, setPassword))}
                                                    minLength={3}
                                                    maxLength={15}
                                                />
                                            </div>
                                            :
                                            <p> ****** <AiOutlineEdit onClick={() => setActiveEditPassword(true)} /></p>
                                    }
                                </div>
                            </div>
                            <div className={style.container__buttons}>
                                {
                                    activeEdit &&
                                    <button onClick={() => updateUser(setActiveEdit, data, dispatch, user, setError)}>Actualizar Perfil <BsCheck2Circle /></button>
                                }
                                {
                                    activeEditPassword &&
                                    <button onClick={() => updatePassword(password, dispatch, setActiveEditPassword)}>Actualizar Contraseña <BsCheck2Circle /></button>
                                }
                                {
                                    upload.show &&
                                    <button onClick={() => updateImage(user, upload, dispatch, setUpload)}>Actualizar Foto <BsCheck2Circle /></button>
                                }
                                {
                                    (activeEdit || activeEditPassword || upload.show) &&
                                    <button
                                        onClick={() => {
                                            setActiveEdit(false)
                                            setActiveEditPassword(false)
                                            setUpload(prev => ({ ...prev, show: false }))
                                        }}
                                        className={style.container__buttons_cancel}
                                    >Cancelar <ImCancelCircle /></button>
                                }
                            </div>
                        </>
                        :
                        <Spinner />
                }
            </div>

        </div>
    )
}


export default Settings