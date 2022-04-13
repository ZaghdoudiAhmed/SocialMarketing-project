export const addToCart = async (item,dispatch) => {
    
    dispatch({type:"ADD_TO_CART", payload:{product:item}})
}
export const deleteFromCart = async (item,dispatch) => {
    
    dispatch({type:"REMOVE_FROM_CART", payload:{product:item}})
}
