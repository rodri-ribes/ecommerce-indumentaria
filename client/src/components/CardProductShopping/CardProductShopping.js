import React from 'react'
import style from './CardProductShopping.module.scss'
import { calcSubTotal, handleOnChange } from './functions/functions'


const CardProductShopping = ({ id, title, content, price, oferta, discount, talleAndStock, image, buyNow, configProduct, setConfigProduct }) => {

    // ------- logica de seleccion de talle, color y stock






    return (
        <div className={style.container__product}>
            <img src={image} />
            <div className={style.container__product__content}>
                <h3>{title}</h3>
                <p>{content?.slice(0, 100)} ...</p>
                {
                    <div className={style.container__product__content__selectores}>
                        {
                            buyNow ?
                                <>
                                    <div className={style.container__product__content__selectores__group}>
                                        <p>Talle Seleccionado: <b>{buyNow?.talle.charAt(0).toUpperCase() + buyNow?.talle.slice(1)}</b></p>
                                    </div>
                                    <div className={style.container__product__content__selectores__group}>
                                        <p>Color Seleccionado: <b>{buyNow?.color.charAt(0).toUpperCase() + buyNow?.color.slice(1)}</b></p>
                                    </div>
                                    <div className={style.container__product__content__selectores__group}>
                                        <p>Cantidad Seleccionada: <b>{buyNow?.cant}</b></p>
                                    </div>
                                    {
                                        buyNow?.cant > 1 &&
                                        <div className={style.container__product__content__selectores__subTotal}>
                                            <p>SubTotal: <b>$ {Intl.NumberFormat('de-DE').format(Math.round(calcSubTotal(buyNow, discount, configProduct, id, price)))}</b></p>
                                        </div>
                                    }
                                </>
                                :
                                <>
                                    <div className={style.container__product__content__selectores__group}>
                                        <label>Selecciona Talle</label>
                                        <select onChange={e => handleOnChange(e, setConfigProduct, id, configProduct, discount, price)} name="talle" value={configProduct[id]?.talle}>
                                            <option value={false} selected>Selecciona Talle</option>
                                            {talleAndStock?.map(p => <option value={p.talle}>{p.talle.charAt(0).toUpperCase() + p.talle.slice(1)} </option>)}
                                        </select>
                                    </div>
                                    {
                                        configProduct[id]?.talle &&
                                        <div className={style.container__product__content__selectores__group}>
                                            <label>Selecciona Color</label>
                                            <select onChange={e => handleOnChange(e, setConfigProduct, id, configProduct, discount, price)} name="color" value={configProduct[id]?.color}>
                                                <option value={false} selected>Selecciona Color</option>
                                                {talleAndStock?.find(e => e.talle === configProduct[id]?.talle)?.listado?.map((p, i) => <option value={JSON.stringify(p)} key={i}>{p?.color?.charAt(0)?.toUpperCase() + p?.color?.slice(1)}</option>)}
                                            </select>
                                        </div>
                                    }
                                    {
                                        configProduct[id]?.color &&
                                        <div className={style.container__product__content__selectores__group}>
                                            <label>Selecciona Cantidad</label>
                                            <div className={style.container__product__content__selectores__group__cant}>
                                                <input type="number" value={configProduct[id]?.cant} name="cant" onChange={e => {
                                                    if (e.target.value > 0 && e.target.value <= JSON.parse(configProduct[id]?.color)?.stock) handleOnChange(e, setConfigProduct, id, configProduct, discount, price)
                                                }} />
                                                {
                                                    <b style={{ color: "gray" }}>({configProduct[id]?.color && JSON.parse(configProduct[id]?.color)?.stock} Disponible)</b>
                                                }
                                            </div>
                                        </div>
                                    }
                                    {
                                        configProduct[id]?.cant > 1 &&
                                        <div style={!buyNow ? { marginTop: "1rem" } : null} className={style.container__product__content__selectores__subTotal}>

                                            <p>SubTotal: <b>$ {Intl.NumberFormat('de-DE').format(Math.round(calcSubTotal(buyNow, discount, configProduct, id, price)))}</b></p>
                                        </div>
                                    }
                                </>
                        }
                    </div>
                }
            </div>
            <div className={style.container__product__price}>
                {
                    discount > 0 &&
                    <div className={style.container__product__price__oferta}>
                        <p style={discount > 0 ? { textDecoration: "line-through" } : null} className={style.container__product__price__oferta_price}>$ {Intl.NumberFormat('de-DE').format(Math.round(price))}</p>
                        <p className={style.container__product__price__oferta_oferta}>- {oferta}% OFF</p>
                    </div>
                }
                <p className={style.container__product__price_price}>$ {discount > 0 ? Intl.NumberFormat('de-DE').format(Math.round(discount)) : Intl.NumberFormat('de-DE').format(Math.round(price))}</p>

            </div>
        </div>
    )
}

export default CardProductShopping