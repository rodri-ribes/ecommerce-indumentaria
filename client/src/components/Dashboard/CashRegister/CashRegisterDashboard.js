import React, { useEffect, useState } from 'react'
import style from './CashRegisterDashboard.module.scss';

import { useSelector } from 'react-redux';
import Warning from '../../Warning/Warning'
import { BsClockHistory } from 'react-icons/bs';
import { FaTruckLoading } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FcMoneyTransfer } from 'react-icons/fc';
import { COMMISSION } from '../../../constants/constants';



export default function CashRegisterDashboard() {

    let customers = useSelector(state => state.dataAdmin.customers)

    const [filtro, setFiltro] = useState([])
    const [commission, setCommission] = useState({
        show: false,
        value: 0
    })

    let date = [];

    useEffect(() => {
        if (customers?.length > 0) {
            setFiltro(customers)
            if (COMMISSION > 0) {
                let commi = 0
                customers.forEach(e => {
                    if (!e.status?.text?.includes("Venta Cancelada")) {
                        commi += COMMISSION;
                    }
                });
                setCommission(prev => ({
                    ...prev,
                    value: commi,
                    show: true
                }))
            }
        }
    }, [])


    const calcTotal = () => {
        if (customers?.length > 0) {
            let total = 0;

            customers.forEach(e => {
                if (!e.status?.text?.includes("Venta Cancelada"))
                    total += e.total;
            });

            return total;
        }
    }


    return (
        <div className={style.container}>
            {
                filtro.length > 0 ?
                    <>
                        <div className={style.container__register}>
                            {
                                filtro?.map((e, i) => {

                                    let okey = false

                                    if (!date.includes(e?.date?.split(" - ")[1])) {
                                        date.push(e?.date?.split(" - ")[1])
                                        okey = true;
                                    } else if (i === 0) {
                                        okey = true
                                    }

                                    return (
                                        <div className={style.container__register__card} key={i}>
                                            {
                                                okey &&
                                                <p className={style.container__register__card_date}>{e?.date?.split(" - ")[1]}</p>
                                            }
                                            <div className={style.container__register__card__info}>
                                                <div className={style.container__register__card__info__left}>
                                                    <h3>Venta N°{i + 1}</h3>
                                                    <p>{e?.user.firstname + " " + e?.user?.lastname}</p>
                                                </div>
                                                <div className={style.container__register__card__info__right}>
                                                    {
                                                        e.status.text.includes("Enviado") &&
                                                        <p style={{ color: "green" }}>+ $ {Intl.NumberFormat('de-DE').format(e?.total)} <FaTruckLoading /></p>
                                                    }
                                                    {
                                                        e.status.text.includes("Entregado") &&
                                                        <p style={{ color: "green" }}>+ $ {Intl.NumberFormat('de-DE').format(e?.total)} <AiOutlineCheckCircle /></p>
                                                    }
                                                    {
                                                        e.status.text.includes("Venta Cancelada") &&
                                                        <p style={{ color: "red" }}>- $ {Intl.NumberFormat('de-DE').format(e?.total)} <MdOutlineCancel /></p>
                                                    }
                                                    {
                                                        e.status.text.includes("El envio se va a posponer") &&
                                                        <p style={{ color: "green" }}>+ $ {Intl.NumberFormat('de-DE').format(e?.total)} <BsClockHistory /></p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={style.container__total}>
                            <h3>CAJA: </h3>
                            <div className={style.container__total__cash}>
                                <p>{commission.show && "Sub Total: "}$ {Intl.NumberFormat('de-DE').format(calcTotal())}</p>
                                {
                                    commission.show &&
                                    <div className={style.container__total__cash__commission}>
                                        <p>Comision: - $ {Intl.NumberFormat('de-DE').format(commission.value)}</p>
                                        <p>Total: $ {Intl.NumberFormat('de-DE').format(calcTotal() - commission.value)}</p>
                                        <button>Retirar Dinero <FcMoneyTransfer /> </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                    : <Warning title={"Aca se mostrara el total que hay en caja"} text={"TIP: Aumenta las ventas con publicidad"} />
            }
        </div>
    )
}
