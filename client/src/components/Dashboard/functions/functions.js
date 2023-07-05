//para ir guardando en el state los inputs 

export const handleOnChange = (e, errorDetected, setErrorDetected, setDataInputs) => {


    //para quitar el error mientras que el user escribe por el input
    if (Object.keys(errorDetected).includes(e?.target.name)) {
        setErrorDetected(prev => ({
            ...prev,
            [e.target.name]: false
        }))
    }

    //para que el precio no sea negativo.

    if (e?.target.name === "price" && e.target.value <= 0) {
        return setDataInputs(prevState => ({
            ...prevState,
            [e.target.name]: 1
        }))
    } else if (e?.target?.name === "price" && (e.target.value.includes(".") || e.target.value.includes(","))) {
        console.log(e)
        return setErrorDetected(prev => ({
            ...prev,
            [e.target.name]: "Ingresa el precio sin puntos y comas"
        }))
    }

    //para ir guardando la info de los inputs
    setDataInputs(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
}


//para la carga del state de talle, color y stock

export const handleOnChangeSelectTalle = (e, errorDetected, setErrorDetected, setaddTalleAndStock) => {

    if (Object.keys(errorDetected).includes(e?.target.name)) {
        setErrorDetected(prev => ({
            ...prev,
            ["talleSelected"]: false
        }))
    }

    setaddTalleAndStock(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
}