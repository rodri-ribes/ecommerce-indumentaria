import React from 'react'
import style from './CarouselHome.module.scss'

//------ Imports

import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import img_discount from './img/discount.png';

//------ functions
import { loadCart } from '../../pages/ContentDetail/functions/functions';

//------ react icons

import { RiShoppingCartLine } from 'react-icons/ri'
import { BsBoxArrowUpRight } from 'react-icons/bs';



export default function CarouselHome({ products, userState, dispatch, navigate }) {

    const showProduct = (id_edit) => {
        navigate(`/dress/${id_edit}`)
    }

    return (
        <div className={style.container}>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1
                    },
                }}
                // autoplay={{ delay: 2000 }}
                autoplay={{ delay: 3000 }}
            >
                {
                    products?.map((e, i) => {

                        return (
                            <SwiperSlide key={i}>
                                <div className={style.container__product}>
                                    <div className={style.container__product__img}>
                                        <img src={e?.image} alt={e?.title} />
                                    </div>
                                    <div className={style.container__product__content}>
                                        <h1>{e?.title}</h1>
                                        <p>{e?.content}</p>
                                        <div className={style.container__product__content__buttons}>
                                            <button
                                                onClick={() => showProduct(e?.id_edit)}
                                            >Ver Mas <BsBoxArrowUpRight /> </button>
                                            <button onClick={() => loadCart(e, userState, dispatch, navigate)}>
                                                Agregar Al Carrito <RiShoppingCartLine />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={style.container__product__price}>
                                        <div className={style.container__product__price__offer}>
                                            <p style={e?.discount > 0 ? { textDecoration: 'line-through', fontSize: "1.5rem" } : { textDecoration: 'none', fontSize: "3rem" }}>$ {Intl.NumberFormat('de-DE').format(e?.price)}</p>
                                            {
                                                e?.oferta > 0 &&
                                                <div className={style.container__product__price__offer__discount}>
                                                    {
                                                        <b>- {e?.oferta}% OFF</b>
                                                    }
                                                    <img src={img_discount} />
                                                </div>
                                            }
                                        </div>
                                        {
                                            e?.oferta > 0 && <p>$ {Intl.NumberFormat('de-DE').format(e?.discount)}</p>
                                        }
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}


