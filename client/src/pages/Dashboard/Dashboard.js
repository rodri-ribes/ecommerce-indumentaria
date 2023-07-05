import React from 'react'
import style from './Dashboard.module.scss'

//------ Imports

import { NavLink, Outlet } from 'react-router-dom'

//------ react icons

import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { MdManageSearch } from 'react-icons/md'
import { FaCashRegister, FaUsers } from 'react-icons/fa'

const Dashboard = () => {

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
                <NavLink to="/dashboard/manage-dress" className={style.container__panel_group} style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                }>
                    <MdManageSearch />
                    <p className={style.container__panel_group_link}>ADMINISTRAR ROPA</p>
                </NavLink>
                <NavLink to="/dashboard/add-dress" className={`${style.container__panel_group}`} style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                }>
                    <AiOutlineAppstoreAdd />
                    <p className={style.container__panel_group_link}>AGREGAR ROPA</p>
                </NavLink>
                <NavLink to="/dashboard/customers" className={style.container__panel_group} style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                }>
                    <FaUsers />
                    <p className={style.container__panel_group_link}>CLIENTES</p>
                </NavLink>
                <NavLink to="/dashboard/cash-register" className={style.container__panel_group} style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                }>
                    <FaCashRegister />
                    <p className={style.container__panel_group_link}>CAJA</p>
                </NavLink>
            </div>
            <div className={style.container__outlet}>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard