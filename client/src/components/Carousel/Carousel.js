import React from 'react'
import style from './carousel.module.scss'

import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function Carousel({ data }) {

  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 1
          },
        }}
        autoplay={{ delay: 2000 }}
      >
        {
          data && data?.map((l, i) => {
            return (
              <SwiperSlide key={i} className={style.container}>
                <img src={l} alt="Imagen" className={style.container_img} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>


  )
}
