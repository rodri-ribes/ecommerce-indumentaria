import React, { useState } from 'react'
import style from './SignIn.module.scss'

//------ Imports

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage, Form } from 'formik';

//------ Components

import Spinner from '../../components/Spinner/Spinner';

//------ functions

import { getUserAction } from '../../redux/features/data/dataUser';

//------ react icons


//------ PROCESS .ENV

const { REACT_APP_API } = process.env


export default function SignIn() {

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
                email: "",
                password: "",
            }}
            onSubmit={async (valores, { resetForm }) => {

                let data = {
                    email: valores.email,
                    password: valores.password,
                }

                try {
                    let resp = await axios.post(`${REACT_APP_API}/user/signin`, data)

                    window.localStorage.setItem("user", JSON.stringify(resp.data))

                    dispatch(getUserAction())

                    navigate('/')

                    resetForm()

                } catch (error) {
                    setMessage({
                        show: true,
                        message: error?.response?.data,
                        error: true
                    })

                    setTimeout(() => {
                        setMessage({
                            show: false,
                            message: "",
                            error: false
                        })
                    }, 2000);
                }

            }}
            validate={(valores) => {
                let errores = {};


                if (!valores.email) {
                    errores.email = "El Email es requerido"
                }
                if (!valores.password) {
                    errores.password = "La contraseña es requerida"
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

                        <button type='submit' className={style.Container__Button}>INCIAR SESIÓN</button>
                        {
                            message.show && <p className={`${style.message_error} ${style.message}`}>{message.message}</p>
                        }

                    </Form>
                </div>

            )
            }
        </Formik >
    )
}
