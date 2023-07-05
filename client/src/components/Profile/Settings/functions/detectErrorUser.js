

export const detectErrorUser = (dataInputs) => {

    let error = {}

    //------ validaciones de los inputs de perfil

    if (dataInputs?.firstname?.length === 0) {
        error["firstname"] = "Ingresa tu Nombre"

    } else if (dataInputs?.firstname?.length < 3) {
        error["firstname"] = "Ingresa tu nombre verdadero"

    } else if (dataInputs?.firstname?.length > 15) {
        error["firstname"] = "El máximo de caracteres es de 15"

    }




    if (dataInputs?.lastname?.length === 0) {
        error["lastname"] = "Ingresa tu Apellido"

    } else if (dataInputs?.lastname?.length < 3) {
        error["lastname"] = "Ingresa tu Apellido verdadero"

    } else if (dataInputs?.lastname?.length > 15) {
        error["lastname"] = "El máximo de caracteres es de 15"
    }

    //------ validaciones del input brand


    if (dataInputs?.direccion?.length === 0) {
        error["direccion"] = "Ingresa tu dirección"

    } else if (dataInputs?.direccion?.length < 3) {
        error["direccion"] = "Ingresa tu dirección verdadera"

    } else if (dataInputs?.direccion?.length > 30) {
        error["direccion"] = "El máximo de caracteres es de 30"
    }

    if (dataInputs?.localidad?.length === 0) {
        error["localidad"] = "Ingresa tu localidad"

    } else if (dataInputs?.localidad?.length < 3) {
        error["localidad"] = "Ingresa tu localidad verdadera"

    } else if (dataInputs?.localidad?.length > 30) {
        error["localidad"] = "El máximo de caracteres es de 30"
    }

    if (dataInputs?.provincia?.length === 0) {
        error["provincia"] = "Ingresa tu provincia"

    } else if (dataInputs?.provincia?.length < 3) {
        error["provincia"] = "Ingresa tu provincia verdadera"

    } else if (dataInputs?.provincia?.length > 30) {
        error["provincia"] = "El máximo de caracteres es de 30"
    }


    if (dataInputs?.codigo_postal?.length === 0) {
        error["codigo_postal"] = "Ingresa tu Codigo Postal"

    } else if (dataInputs?.codigo_postal?.length < 3) {
        error["codigo_postal"] = "Ingresa tu Codigo Postal verdadero"

    } else if (dataInputs?.codigo_postal?.length > 5) {
        error["codigo_postal"] = "El máximo de caracteres es de 5"
    }


    if (dataInputs?.email?.length === 0) {
        error["email"] = "Ingresa tu Email"

    } else if (dataInputs?.email?.length < 3) {
        error["email"] = "Ingresa tu Email verdadero"

    } else if (dataInputs?.email?.length > 30) {
        error["email"] = "El máximo de caracteres es de 30"

    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(dataInputs.email)) {
        error["email"] = "Ingresa tu Email verdadero"
    }


    if (dataInputs?.whatsapp?.length === 0) {
        error["whatsapp"] = "Ingresa tu WhatsApp"

    } else if (dataInputs?.whatsapp?.length < 3) {
        error["whatsapp"] = "Ingresa tu WhatsApp verdadero"

    } else if (dataInputs?.whatsapp?.length > 15) {
        error["whatsapp"] = "El máximo de caracteres es de 15"
    }


    return error
}