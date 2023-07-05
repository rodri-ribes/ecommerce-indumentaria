import { Alert } from 'react-st-modal';
import { upperWaist, lowerWaist, shoeSize } from './arraysOfSelect';

import upperCase from '../../../functions/upperCase.js'


// ------ logica del filtrado dependiendo la categoria

export const logicTalles = (categorySelected, setaddTalleAndStock, setDataInputs) => {
    if (
        categorySelected === "Campera" ||
        categorySelected === "Camperon" ||
        categorySelected === "Buzo" ||
        categorySelected === "Remera" ||
        categorySelected === "Chomba"
    ) {
        setaddTalleAndStock(prevState => ({
            ...prevState,
            ["showTalles"]: upperWaist
        }))
    } else if (
        categorySelected === "Jean" ||
        categorySelected === "Bermuda" ||
        categorySelected === "Jogging"
    ) {
        setaddTalleAndStock(prevState => ({
            ...prevState,
            ["showTalles"]: lowerWaist
        }))
    } else if (
        categorySelected === "Zapatilla"
    ) {
        setaddTalleAndStock(prevState => ({
            ...prevState,
            ["showTalles"]: shoeSize
        }))
    } else if (
        categorySelected === "Selecciona una Categoria"
    ) {
        setaddTalleAndStock(prevState => ({
            ...prevState,
            ["showTalles"]: []
        }))
    }
    setDataInputs(prevState => ({
        ...prevState,
        ["talleAndStock"]: []
    }))
}

// ------ funcion de boton para agregar los talles y el stock


export const addTalleAndStockFunction = async (e, listTalles, talleInput, colorInput, stockInput, setDataInputs, setaddTalleAndStock, aux = "talleAndStock") => {

    e.preventDefault()

    if (talleInput === "Talle" && colorInput === "" && stockInput <= 0) return await Alert('Selecciona un talle y ingresa el color y stock disponible', 'Error')
    else if (talleInput === "Talle") return await Alert('Selecciona un talle', 'Error')
    else if (colorInput === "") return await Alert('Ingresa el color', 'Error')
    else if (stockInput <= 0) return await Alert(`Ingresa el Stock del talle ${talleInput}`, 'Error')

    let obj = {
        talle: talleInput,
        listado: [
            { color: upperCase(colorInput), stock: parseInt(stockInput) }
        ]
    }

    let obj2 = {
        color: upperCase(colorInput),
        stock: parseInt(stockInput),
    }


    // -- si existe el talle, pushea

    let exist = listTalles.filter(t => t?.talle === talleInput)


    if (exist.length > 0) {

        let newArray = listTalles.filter(t => t?.talle !== talleInput);

        exist[0].listado.push(obj2)

        newArray.push(exist[0])
        setDataInputs(prevState => ({
            ...prevState,
            [aux]: newArray
        }))

    } else {

        let newArray = [...listTalles]

        newArray.push(obj)

        setDataInputs(prevState => ({
            ...prevState,
            [aux]: newArray
        }))
    }
    setaddTalleAndStock(prevState => ({
        ...prevState,
        ["stockTalle"]: 0,
        ["color"]: ""
    }))



}

// ------ funcion de eliminacion del talle y stock

export const deleteTalleAndStock = (talle, color, stock, setDataInputs, dataInputs, aux = "talleAndStock") => {

    setDataInputs(prevState => ({
        ...prevState,
        [aux]: dataInputs.filter(t => {
            if (t.color !== color && t.stock !== stock) {
                console.log(t.color, color)
                console.log(t.stock, stock)
                return t
            }
        })
    }))
}

// ------ logica para quitar las imagenes cargadas


export const deleteImages = (img, setDataInputs, dataInputs) => {

    setDataInputs(prevState => ({
        ...prevState,
        ["images"]: Object.values(dataInputs).filter(i => i.name !== img)
    }))
}