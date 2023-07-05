export const filterTerm = (stateFilters) => {

    let { brand, category, search, minPrice, maxPrice } = stateFilters

    return function (x) {
        return (
            (x?.brand?.includes(brand) || brand === "Marca") &&
            (x?.category?.includes(category) || category === "Categoria") &&
            (x?.title?.toLowerCase().includes(search) || search === "") &&
            (x?.price >= parseInt(minPrice) && x?.price <= parseInt(maxPrice) || parseInt(minPrice) === 0 || parseInt(maxPrice) === 0 || minPrice === "" || maxPrice === "") &&
            (x?.price >= parseInt(minPrice) || parseInt(minPrice) === 0 || minPrice === "") &&
            (x?.price <= parseInt(maxPrice) || parseInt(maxPrice) === 0 || maxPrice === "")
        )
    }
}

export const filterTerm2 = (stateFilters) => {

    let { brand, category, minPrice, maxPrice } = stateFilters

    return function (x) {
        return (
            (x?.brand?.includes(brand) || brand === "Selecciona Marca") &&
            (x?.category?.includes(category) || category === "Selecciona Categoria") &&
            (x?.price >= parseInt(minPrice) && x?.price <= parseInt(maxPrice) || parseInt(minPrice) === 0 || parseInt(maxPrice) === 0 || minPrice === "" || maxPrice === "") &&
            (x?.price >= parseInt(minPrice) || parseInt(minPrice) === 0 || minPrice === "") &&
            (x?.price <= parseInt(maxPrice) || parseInt(maxPrice) === 0 || maxPrice === "")
        )

        //falta hacer andar el filtro de talle
    }
}