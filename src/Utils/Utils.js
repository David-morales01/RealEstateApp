export function validateParameter(param) {
    if (!param) return []

    param = param.split(',')
    let temp = []

    for (let x = 0; x <= param.length - 1; x++) {
        temp.push(parseInt(param[x]))
    }
    return temp;
}

export function decodeFilter(filters) {
    let filterTemp = `${import.meta.env.VITE_REACT_APP_CLIENT_HOST}/?`

    for (let value in filters) {
        if (filters[value]) {
            filterTemp = filterTemp + `${value}=${filters[value]}&`
        }
    } 
    return filterTemp;
}

/*
utils para limpiar images

 */