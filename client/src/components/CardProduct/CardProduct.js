import React from 'react'
import style from './CardProduct.module.scss'

//------ Imports

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

//------ Components


//------ functions

import { favoriteProductAction, getProductAction } from '../../redux/features/data/dataUser';

//------ react icons

import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';


const CardProduct = ({ id_edit, id, title, image, price, discount, oferta }) => {

    let userState = useSelector(state => state.dataUser.user)

    let dispatch = useDispatch()

    let navigate = useNavigate()

    const showProduct = () => {
        // dispatch(getProductAction(id_edit))
        navigate(`/dress/${id_edit}`)
    }



    return (
        <div className={style.container} >
            <div className={style.container__image}>
                {
                    discount > 0 &&
                    <div className={style.container__image__off}>
                        <p>{oferta}% OFF</p>
                    </div>
                }
                <div className={style.container__image__svg}>
                    {
                        userState?.favorites?.filter(e => e?._id === id).length > 0 ?
                            <MdOutlineFavorite onClick={() => dispatch(favoriteProductAction(id))} />
                            :
                            <MdOutlineFavoriteBorder onClick={() => dispatch(favoriteProductAction(id))} />
                    }
                </div>
                {
                    // image.length > 1 ?
                    //     <Carousel data={image} />
                    //     :
                    <img src={image} alt={title} onClick={() => showProduct()} />
                }
            </div>
            <div className={style.container__content}>
                <div className={style.container__content__price}>
                    <b style={discount > 0 ? { textDecoration: "line-through", fontSize: ".8rem" } : { textDecoration: "none" }}>
                        $ {Intl.NumberFormat('de-DE').format(price)}
                    </b>
                    {discount > 0 && <p>$ {Intl.NumberFormat('de-DE').format(discount)} </p>}
                </div>
                <p className={style.container__content_title} onClick={() => showProduct()}>{title?.slice(0, 25)} {title?.length > 25 && "..."}</p>
            </div>
        </div>
    )
}

export default CardProduct