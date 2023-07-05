import React, { useState } from 'react'
import style from './SignUp.module.scss'

//------ Imports

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage, Form } from 'formik';

//------ Components

import Spinner from '../../components/Spinner/Spinner';

//------ functions

import upperCase from '../../functions/upperCase.js'
import { getUserAction } from '../../redux/features/data/dataUser';

//------ PROCESS .ENV

const { REACT_APP_API } = process.env

export default function SignUp() {

    const navigate = useNavigate()

    const [message, setMessage] = useState({
        show: false,
        message: "",
        error: false
    })

    let dispatch = useDispatch()

    return (
        <Formik
            initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                whatsapp: ""
            }}
            onSubmit={async (valores, { resetForm }) => {
                let data = {
                    firstname: upperCase(valores.firstname),
                    lastname: upperCase(valores.lastname),
                    email: valores.email,
                    password: valores.password,
                    whatsapp: valores.whatsapp,
                    image: `https://i2.wp.com/cdn.auth0.com/avatars/${valores?.firstname?.charAt(0)}.png?ssl=1`
                }

                try {
                    setMessage({
                        show: false,
                        message: "",
                        error: false
                    })

                    let resp = await axios.post(`${REACT_APP_API}/user/signup`, data)

                    window.localStorage.setItem("user", JSON.stringify(resp.data))

                    dispatch(getUserAction())

                    setMessage({
                        show: true,
                        message: "Successfully Registered",
                        error: false
                    })

                    setTimeout(() => {
                        setMessage({
                            show: false,
                            message: "",
                            error: false
                        })
                        navigate('/')
                    }, 2000);

                    resetForm()

                } catch (error) {
                    setMessage({
                        show: true,
                        message: error.response.data,
                        error: true
                    })

                    setTimeout(() => {
                        setMessage({
                            show: false,
                            message: "",
                            error: false
                        })
                    }, 3000);
                }

            }}
            validate={(valores) => {
                let errores = {};

                if (!valores.firstname) {
                    errores.firstname = "First name is required"
                } else if (/^[a-zA-ZÀ-ÿ\s]{1,3}$/.test(valores.firstname)) {
                    errores.firstname = "Enter a minimum of 4 characters, they can only be letters and spaces"
                }

                if (!valores.lastname) {
                    errores.lastname = "Last name is required"
                } else if (/^[a-zA-ZÀ-ÿ\s]{1,3}$/.test(valores.lastname)) {
                    errores.lastname = "Enter a minimum of 4 characters, they can only be letters and spaces"
                }

                if (!valores.email) {
                    errores.email = "Email is required"
                } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
                    errores.email = "Enter a valid email"
                }
                if (!valores.password) {
                    errores.password = "Password is required"
                } else if (/^.{1,5}$/.test(valores.password)) {
                    errores.password = "Enter a minimum of 6 characters"
                }
                if (!valores.whatsapp) {
                    errores.whatsapp = "whatsapp is required"
                } else if (/^\d{1,9}$/.test(valores.whatsapp)) {
                    errores.whatsapp = "Enter a valid whatsapp"
                }
                return errores;
            }}
        >
            {({ errors }) => (
                <div className={style.containerForm}>
                    <img src="./img/mateek_panel.jpg" />
                    <Form className={style.Container}>
                        <div className={style.Container__Div}>
                            <Field className={style.Container__Div_Input}
                                type="text"
                                id="firstname"
                                name="firstname"
                                placeholder="Nombre"
                            />
                            <ErrorMessage name='firstname' component={() => (<div className={style.Container__Div_Error}><p>{errors.firstname}</p></div>)} />
                        </div>
                        <div className={style.Container__Div}>
                            <Field className={style.Container__Div_Input}
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Apellido"
                            />
                            <ErrorMessage name='lastname' component={() => (<div className={style.Container__Div_Error}><p>{errors.lastname}</p></div>)} />
                        </div>
                        <div className={style.Container__Div}>
                            <Field className={style.Container__Div_Input}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                            />
                            <ErrorMessage name='email' component={() => (<div className={style.Container__Div_Error}><p>{errors.email}</p></div>)} />
                        </div>
                        <div className={style.Container__Div}>
                            <Field className={style.Container__Div_Input}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                            />
                            <ErrorMessage name='password' component={() => (<div className={style.Container__Div_Error}><p>{errors.password}</p></div>)} />
                        </div>
                        <div className={style.Container__Div}>
                            <Field className={style.Container__Div_Input}
                                type="number"
                                id="whatsapp"
                                name="whatsapp"
                                placeholder="WhatsApp"
                            />
                            <ErrorMessage name='whatsapp' component={() => (<div className={style.Container__Div_Error}><p>{errors.whatsapp}</p></div>)} />
                        </div>
                        <button type='submit' className={style.Container__Button}>CREAR CUENTA</button>
                        {
                            message.show && <p className={`${style.message_error} ${style.message}`}>{message.message.email} <br /> {message.message.username} </p>
                        }

                    </Form>
                </div>

            )
            }
        </Formik >
    )
}
