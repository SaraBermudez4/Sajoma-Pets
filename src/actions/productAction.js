import { LoadSearch } from "../helpers/loadHelp";
import { types } from "../types/types";

export const activeProduct = (id, product) => ({
    type: types.productActive,
    payload: {
        id,
        ...product
    }
});

export const startSearch = (search) => {
    return async (dispatch) => {
        const producto = await LoadSearch(search)
        // console.log(producto);
        dispatch(setSearch(producto))
        // dispatch(setSearch(search))
    }
}

export const setSearch = (products) => ({
    type: types.searchProduct,
    payload: products
});

export const starCleanSearch = () => {
    return async (dispatch) => {
        dispatch(cleanBusqueda());
    }
}

export const cleanBusqueda = () => ({
    type: types.cleanSearch
})