import React from 'react'
import style from './CarouselRecommendations.module.scss'

import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import CardProduct from '../CardProduct/CardProduct';

export default function CarouselRecommendations({ dress }) {
  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        spaceBetween={300}
        slidesPerView={dress?.length >= 3 ? window.innerWidth < 969 ? 1 : 4 : dress?.length.length === 1 ? 1 : window.innerWidth < 969 ? 1 : 2}
        autoplay={{ delay: 2000 }}
      >
        {
          dress && dress?.map((p, i) => {
            return (
              <SwiperSlide key={i} className={style.container}>
                <CardProduct
                  id_edit={p?.id_edit}
                  title={p?.title}
                  id={p?._id}
                  image={p?.image}
                  price={p?.price}
                  discount={p?.discount}
                  oferta={p?.oferta}
                />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>


  )
}
