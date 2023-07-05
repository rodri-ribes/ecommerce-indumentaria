import React, { useEffect, useState } from 'react'
import style from './NavBar.module.scss';


//------ Imports
import { NAME_OF_THE_PAGE } from '../../constants/constants'
import { Search } from '../Search/Search';


//------ Components

import CartShopping from "../CartShopping/CartShopping";


//------ functions


//------ react icons
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineAppstoreAdd, AiOutlineShopping } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'
import { NavLink } from 'react-router-dom';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { getUserAction } from '../../redux/features/data/dataUser';
import { useDispatch } from 'react-redux';
import { RiLogoutBoxLine } from 'react-icons/ri';


//------ PROCESS .ENV


export default function NavBar({ user }) {

    let dispatch = useDispatch()



    const [showComponents, setShowComponents] = useState({
        mobile: false,
        cart: false,
        search: false
    })

    const changeClick = () => {
        setShowComponents(prev => ({
            ...prev,
            mobile: !prev.mobile
        }));
    }

    const logout = () => {
        window.localStorage.removeItem("user")
        dispatch(getUserAction("remove"))
    }

    return (
        <div className={style.container}>
            <div className={style.container__wrapper}>
                <div className={style.container__wrapper__logo}>
                    {
                        showComponents.search ?
                            <Search setShowComponents={setShowComponents} showComponents={showComponents} />
                            :
                            <div className={style.container__wrapper__logo__searchAndName}>
                                <svg onClick={() => {
                                    setShowComponents(prev => ({
                                        search: true,
                                        cart: false,
                                        mobile: false
                                    }))
                                }} className={style.container__wrapper__logo__searchAndName_svg} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                                <NavLink to="/" className={style.link}>{NAME_OF_THE_PAGE}</NavLink>
                            </div>
                    }
                </div>

                <div className={style.container__wrapper__search}>
                    <Search setShowComponents={setShowComponents} />
                </div>

                <div className={style.container__wrapper__menu} style={{ left: `${showComponents.mobile ? "0" : "-100%"}` }}>
                    {
                        user ?
                            <>
                                <div className={style.container__wrapper__menu__item}>
                                    <div className={style.container__wrapper__menu__item__user}>
                                        <AiOutlineUser />
                                        <p>{user?.firstname}</p>
                                        <IoIosArrowDown />
                                    </div>

                                    <div className={style.container__wrapper__menu__item__user__panel}>
                                        <div className={style.container__wrapper__menu__item__user__panel__group} onClick={() => changeClick()}>
                                            <AiOutlineUser />
                                            <NavLink to="/profile/settings" className={style.link}>PERFIL</NavLink>
                                        </div>
                                        {
                                            user?.rol === "admin" ?
                                                <>
                                                    <div className={style.container__wrapper__menu__item__user__panel__group} onClick={() => changeClick()}>
                                                        <AiOutlineAppstoreAdd />
                                                        <NavLink to="/dashboard/manage-dress" className={style.link}>PANEL DE ADMIN</NavLink>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className={style.container__wrapper__menu__item__user__panel__group} onClick={() => changeClick()}>
                                                        <MdOutlineFavoriteBorder />
                                                        <NavLink to="/profile/favorites" className={style.link}>FAVORITOS</NavLink>
                                                    </div>
                                                    <div className={style.container__wrapper__menu__item__user__panel__group} onClick={() => changeClick()}>
                                                        <AiOutlineShopping />
                                                        <NavLink to="/profile/shopping" className={style.link}>COMPRAS</NavLink>
                                                    </div>
                                                </>
                                        }
                                        <div className={style.container__wrapper__menu__item__user__panel__group} onClick={() => changeClick()}>
                                            <RiLogoutBoxLine />
                                            <p onClick={() => logout()}>Cerrar Sesión</p>
                                        </div>
                                    </div>
                                </div>

                            </>
                            :
                            <>
                                <div className={style.container__wrapper__menu__item} onClick={() => changeClick()}>
                                    <RiLogoutBoxLine />
                                    <NavLink to="/signin" className={style.link}>Iniciar Sesión</NavLink>
                                </div>
                                <div className={style.container__wrapper__menu__item} onClick={() => changeClick()}>
                                    <RiLogoutBoxLine />
                                    <NavLink to="/signup" className={style.link}>Registrarse</NavLink>
                                </div>
                            </>

                    }
                </div>

                <div className={style.container__wrapper__cartShopping}>
                    <div className={style.container__wrapper__cartShopping__length} id="svg_cart">
                        <AiOutlineShoppingCart onClick={() => {
                            setShowComponents(prev => ({
                                search: false,
                                mobile: false,
                                cart: true
                            }));
                        }} id="svg_cart" />
                        {
                            user?.cart?.length > 0 &&
                            <p id="svg_cart">{user?.cart?.length}</p>
                        }
                    </div>
                    <CartShopping clickCart={showComponents.cart} setShowComponents={setShowComponents} />
                </div>

                <div className={style.container__wrapper__iconMobile} onClick={() => {
                    setShowComponents(prev => ({
                        search: false,
                        mobile: !prev.mobile,
                        cart: false
                    }));
                }}>
                    {
                        showComponents.mobile ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                    }
                </div>
            </div>
        </div>
    )
}
