import React from 'react'
import style from './Profile.module.scss'

//------ Imports

import { NavLink, Outlet } from 'react-router-dom'

//------ react icons

import { MdFavorite } from 'react-icons/md';
import { FaShoppingBag } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';


const Profile = () => {

    const activeStyle = {
        backgroundColor: "#00b074",
        color: "white",
        fontWeight: "600",
        borderRadius: "2px",
        boxShadow: "0 0 5px #00b074",
    }

    return (
        <div className={style.container}>
            <div className={style.container__panel}>
                <NavLink to="/profile/settings" className={style.container__panel_group} style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                }>
                    <CgProfile />
                    <p className={style.container__panel_group_link}>PERFIL</p>
                </NavLink>
                <NavLink to="/profile/favorites" className={style.container__panel_group} style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                }>
                    <MdFavorite />
                    <p className={style.container__panel_group_link}>FAVORITOS</p>
                </NavLink>
                <NavLink to="/profile/shopping" className={style.container__panel_group} style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                }>
                    <FaShoppingBag />
                    <p className={style.container__panel_group_link}>COMPRAS</p>
                </NavLink>

            </div>
            <div className={style.container__outlet}>
                <Outlet />
            </div>
        </div>
    )
}

export default Profile