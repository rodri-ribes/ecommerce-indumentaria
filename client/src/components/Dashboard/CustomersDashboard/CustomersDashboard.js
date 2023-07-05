import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerAction } from '../../../redux/features/data/dataAdmin';
import CardCustomer from './CardCustomer/CardCustomer';
import style from './CustomersDashboard.module.scss';
import FilterOfCustomers from './FilterOfCustomers/FilterOfCustomers';

import Spinner from '../../Spinner/Spinner.js';

import Warning from '../../Warning/Warning.js'

export default function CustomersDashboard() {

    const [filtro, setFiltro] = useState(false);

    const [optionsFilter, setOptionsFilter] = useState({
        firstname: [],
        date: [],
        status: [],
    })

    let customers = useSelector(state => state.dataAdmin.customers)
    let dispatch = useDispatch();

    useEffect(() => {
        if (!customers) dispatch(getCustomerAction())
        else {
            setFiltro(customers)
            // if (optionsFilter.firstname.length < 1) {
            customers.forEach(e => {
                setOptionsFilter(prev => (
                    {
                        ...prev,
                        firstname: [...prev.firstname, e?.user?.firstname + " " + e?.user?.lastname]
                    }
                ))
                setOptionsFilter(prev => (
                    {
                        ...prev,
                        date: [...prev.date, e?.date?.split(" - ")[1]]
                    }
                ))
                setOptionsFilter(prev => (
                    {
                        ...prev,
                        status: [...prev.status, e?.status?.text]
                    }
                ))
            });
            // }
            filtro && console.log(filtro)
        }

    }, [customers])


    const [stateFilterCustomers, setstateFilterCustomers] = useState({
        firstname: "Selecciona Cliente",
        status: "",
        date: "Selecciona Fecha",
        quantityFOProductsMin: "",
        quantityFOProductsMax: "",
        search: "",
    })

    const filterTermCustomer = (stateFilterCustomers) => {

        let { firstname, date, quantityFOProductsMin, quantityFOProductsMax, status, search } = stateFilterCustomers

        return function (x) {
            let name = x?.user?.firstname.toLowerCase() + " " + x?.user?.lastname?.toLowerCase();
            return (
                (name?.includes(firstname?.toLowerCase()) || firstname === "Selecciona Cliente") &&
                (x?.date?.split(" - ")[1]?.includes(date) || date === "Selecciona Fecha") &&
                (x?.status.text?.toLowerCase()?.includes(status?.toLowerCase()) || status === "Selecciona Estado") &&
                (name?.includes(search?.toLowerCase()) || search?.toLowerCase() === "") &&
                (x?.total >= parseInt(quantityFOProductsMin) && x?.total <= parseInt(quantityFOProductsMax) || parseInt(quantityFOProductsMin) === 0 || parseInt(quantityFOProductsMax) === 0 || quantityFOProductsMin === "" || quantityFOProductsMax === "") &&
                (x?.total >= parseInt(quantityFOProductsMin) || parseInt(quantityFOProductsMin) === 0 || quantityFOProductsMin === "") &&
                (x?.total <= parseInt(quantityFOProductsMax) || parseInt(quantityFOProductsMax) === 0 || quantityFOProductsMax === "")
            )
        }
    }


    return (
        <div className={style.container}>
            {
                filtro?.length > 1 &&
                <FilterOfCustomers stateFilters={stateFilterCustomers} setStateFilters={setstateFilterCustomers} optionsFilter={optionsFilter} />
            }
            <div className={style.container__customers}>
                {
                    customers?.length > 0 ?

                        filtro?.length > 0 ?
                            filtro?.filter(filterTermCustomer(stateFilterCustomers)).map(c => {
                                return (
                                    <CardCustomer
                                        id={c?._id}
                                        user={c?.user}
                                        products={c?.products}
                                        chat={c?.chat}
                                        date={c?.date}
                                        paymentMethod={c?.paymentMethod}
                                        shippingWay={c?.shippingWay}
                                        total={c?.total}
                                        status={c?.status}
                                        key={c?._id}
                                        one={filtro.filter(filterTermCustomer(stateFilterCustomers)).length === 1 && customers.length > 1}
                                    />
                                )
                            })
                            :
                            <Warning title="¡ Incrementa las ventas con anuncios !" text="Aca aparecera el listado de clientes." />
                        :
                        <Spinner />
                }
            </div>
        </div>
    )
}
