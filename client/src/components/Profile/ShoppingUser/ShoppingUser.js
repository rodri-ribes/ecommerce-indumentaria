import React, { useEffect, useState } from 'react'

//------ Imports

import { useDispatch, useSelector } from 'react-redux';
import style from './ShoppingUser.module.scss';

//------ Components

import Reload from '../../Reload/Reload';
import CardShopping from './CardShopping/CardShopping';
import { Pagination } from '../../Pagination/Pagination';
import Warning from '../../Warning/Warning.js'

//------ functions

import { getShoppingListAction } from '../../../redux/features/data/dataUser';



export default function ShoppingUser({ user }) {

    // const [shopping, setShopping] = useState(false)

    let shopping = useSelector(state => state.dataUser.shoppingList)

    let dispatch = useDispatch()

    useEffect(() => {
        if (!shopping) dispatch(getShoppingListAction())
    }, [dispatch])

    //logic of pagination

    const [filtrado, setFiltrado] = useState([])
    const [pagina, setPagina] = useState(1)

    const porPagina = 10;

    const ceil = filtrado.length / porPagina;

    const maximo = Math.ceil(ceil)

    return (
        <div className={style.container}>
            <Reload action={getShoppingListAction} />
            {
                shopping.length > 0 ?
                    shopping?.slice(
                        (pagina - 1) * porPagina,
                        (pagina - 1) * porPagina + porPagina
                    ).reverse().map((e, i) => {
                        return (
                            <CardShopping
                                date={e?.date}
                                products={e?.products}
                                shippingWay={e?.shippingWay}
                                user={e?.user}
                                total={e?.total}
                                paymentMethod={e?.paymentMethod}
                                shoppingLength={shopping?.length - i}
                                chat={e?.chat}
                                id={e?._id}
                                key={e?._id}
                                status={e?.status}
                            />
                        )
                    })
                    :
                    <Warning title={"¡ Los productos que compres, apareceran acá !"} text={"Elegí el producto que mas te guste, y Compralo hoy mismo."} />
            }
            {
                filtrado?.length > 10 &&
                <div className={style.container__pagination}>
                    <Pagination
                        pagina={pagina}
                        setPagina={setPagina}
                        maximo={maximo}
                    />
                </div>
            }
        </div>
    )
}
