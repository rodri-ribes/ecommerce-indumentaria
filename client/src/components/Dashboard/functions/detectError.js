

export const detectError = (setErrorDetected, errorDetected, dataInputs, edit = false) => {

    let error = {}

    //------ validaciones del input title

    if (dataInputs?.title?.length === 0) {
        error["title"] = "Ingrese un titulo"

    } else if (dataInputs?.title?.length < 5) {
        error["title"] = "Ingresa un titulo atractivo"

    } else if (dataInputs?.title?.length > 70) {
        error["title"] = "El máximo de caracteres es de 70"


    }


    //------ validaciones del input content


    if (dataInputs?.content?.length === 0) {
        error["content"] = "Ingresa una descripción"

    } else if (dataInputs?.content?.length < 5) {
        error["content"] = "Ingresa una descripción mas atractiva"


    } else if (dataInputs?.content?.length > 300) {
        error["content"] = "El máximo de caracteres es de 300"


    }

    //------ validaciones del input brand


    if (dataInputs?.brand === "Selecciona una Marca") {
        error["brand"] = "Selecciona una marca"


    }

    if (dataInputs?.category === "Selecciona una Categoria") {
        error["category"] = "Selecciona una Categoria"

    }

    if (dataInputs?.price <= 0 && dataInputs?.price > 10000000) {
        error["price"] = "Ingresa un precio valido"
    }

    if (dataInputs?.images?.length === 0 && edit !== true) {
        error["images"] = "Ingresa al menos una imagen"


    }

    //Deteccion de erorr de talle y stock

    if (dataInputs?.talleAndStock?.length <= 0 && edit !== true) {
        error["talleSelected"] = "Ingresa un talle con su color y stock disponible"
    }

    return error
}