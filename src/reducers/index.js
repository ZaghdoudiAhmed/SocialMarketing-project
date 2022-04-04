const initialState = {
    allproducts :[],
    cart: [],
  };

  
function rootReducer(state = initialState, action) {
    switch(action.type){
        case "LOAD_ALLPRODUCT" : return {
            ...state,
            allproducts:action.payload};
        case "INIT_CART" : return {...state,cart:JSON.parse(localStorage.getItem('shopping-cart'))}
        case "ADD_TO_CART" : 
        let exist = false;
        let mycart = state.cart; 
        console.log("hi ");
        mycart?.forEach((elm,i,arr)=>{
          if (elm.product._id == action.payload.product._id){
            
              exist = true;
              arr[i].quantity += 1   
          }
        })
       mycart = JSON.parse(JSON.stringify(mycart))
  
        if (exist){
        localStorage.setItem('shopping-cart',JSON.stringify(mycart));
        return {...state,cart:mycart}
      }
        else {
          localStorage.setItem('shopping-cart',JSON.stringify(mycart.concat([{product:action.payload.product,quantity:1}])))
          return {...state,cart:mycart.concat([{product:action.payload.product,quantity:1}])}
        }
        
      case "SET_QUANTITY" : let updatedCart = state.cart; 
      updatedCart.forEach((elm,i,arr)=>{
        if (elm.product._id === action.payload.id)
        arr[i].quantity = action.payload.quantity;
      })
       localStorage.setItem('shopping-cart',JSON.stringify(updatedCart))
         return {...state,cart:updatedCart};
      
      case "REMOVE_FROM_CART": 
   
      let filtredCart = state.cart.filter((elm)=>{
        return elm.product._id != action.payload.id
      }) 
      localStorage.setItem('shopping-cart',JSON.stringify(filtredCart))
      return {...state,cart:filtredCart}
      

      default : return state;
    }
}

export default rootReducer
