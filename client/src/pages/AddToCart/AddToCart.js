import React, { useEffect, useState } from 'react'
import style from './AddToCart.module.scss'

import { useNavigate, useParams } from 'react-router-dom';
import CarouselRecommendations from '../../components/CarouselRecommendations/CarouselRecommendations';
import { useDispatch } from 'react-redux';
import { getDressAction } from '../../redux/features/data/dataUser';
import Spinner from '../../components/Spinner/Spinner'

export default function AddToCart({ userState, dress }) {

    let { id } = useParams();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const [product, setProduct] = useState(false)

    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (!dress) dispatch(getDressAction())
        else setProduct(dress.find(e => e.id_edit === id))

        if (product) {
            let aux = 0;

            userState?.cart?.forEach(e => {
                aux += e?.discount > 0 ? e?.discount : e?.price
            });

            setTotal(aux)
        }

    }, [dress, userState, product])

    return (
        <>
            {
                userState && dress?.length > 0 ?
                    <div className={style.container}>
                        <div className={style.container__data}>
                            <div className={style.container__data__product}>
                                <img src={product?.image} />
                                <div className={style.container__data__product__content}>
                                    <h3>Agregaste a tu carrito</h3>
                                    <p>{product?.title}</p>
                                </div>
                            </div>
                            <div className={style.container__data__info}>
                                <div className={style.container__data__info__content}>
                                    <p>{userState?.cart?.length} productos en tu carrito: </p>
                                    <b>$ {Intl.NumberFormat('de-DE').format(total)}</b>
                                </div>
                                <div className={style.container__data__info__imgs}>
                                    {
                                        userState?.cart?.map((e, i) => {
                                            if (i < 2) {
                                                return (
                                                    <img
                                                        src={e?.image}
                                                        alt={e?.title}
                                                        title={e?.title}
                                                        key={i}
                                                        style={{
                                                            right: `${i === 1 ? "100px" : "125px"}`
                                                        }}
                                                    />
                                                )
                                            } else if (i === 2) {
                                                return (
                                                    <p style={{
                                                        right: `${i === 2 && "75px"}`
                                                    }}>+{parseInt(userState?.cart?.length) - 2}</p>
                                                )
                                            }
                                        })
                                    }
                                </div>
                                <div className={style.container__data__buttons}>
                                    <button
                                        onClick={() => navigate("/shopping")}
                                    >Comprar Carrito</button>
                                </div>
                            </div>
                        </div>
                        <h3>Recomendaciones</h3>
                        <div className={style.container__recommendations}>
                            <CarouselRecommendations dress={dress} />
                        </div>
                    </div>
                    :
                    <Spinner />
            }
        </>
    )
}
