export const handleOnChange = (e, setConfigProduct, id, configProduct, discount, price) => {

    if (e.target.name === "talle" && e.target.value === "false") {
        setConfigProduct(prev => ({
            ...prev,
            [id]: {
                talle: "",
                color: "",
                cant: 1,
                price: discount > 0 ? discount : price
            }
        }))
        // aca validamos si cambia el valor en el select del color, si lo cambia que se resetee la cantidad max y min
    } else if (e.target.name === "talle" && e.target.value !== configProduct[id]?.talle) {
        setConfigProduct(prev => ({
            ...prev,
            [id]: {
                talle: e.target.value,
                color: "",
                cant: 1,
                price: discount > 0 ? discount : price
            }
        }))
    } else if (e.target.name === "color" && e.target.value !== configProduct[id]?.color) {
        setConfigProduct(prev => ({
            ...prev,
            [id]: {
                talle: configProduct[id]?.talle,
                color: e.target.value,
                cant: 1,
                price: discount > 0 ? discount : price
            }
        }))
    } else if (e.target.name === "cant" && e.target.value !== configProduct[id]?.cant) {
        setConfigProduct(prev => ({
            ...prev,
            [id]: {
                talle: configProduct[id]?.talle,
                color: configProduct[id]?.color,
                cant: e.target.value,
                price: discount > 0 ? discount : price
            }
        }))
    }
}

// ------- logica para calcular el subtotal

export const calcSubTotal = (buyNow, discount, configProduct, id, price) => {
    if (buyNow) {
        return buyNow?.cant * buyNow.price
    } else {
        let thereIsDiscount = discount > 0 ? discount : parseFloat(price)
        return configProduct[id].cant * thereIsDiscount
    }
}