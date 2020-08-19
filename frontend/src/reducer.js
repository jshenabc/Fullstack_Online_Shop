export const initialState = {
    basket: [],
    user: {id: "5f35afeaea4b72f505885952", name: "JIA SHEN"},
}

export const getCheckoutSubtotal = (basket) => 
basket?.reduce((sum,value) => {
    return (sum + value.unitPrice * value.orderQuantity)
}, 0);


export const getBasketCount = (basket) => 
basket?.reduce((sum,value) => {
    return (sum + value.orderQuantity)
}, 0);


function reducer(state, action) {
    console.log("prevState: ", state);
    console.log("action: ", action);
    switch(action.type) {
        case 'RECEIVE_BASKET':
            return { 
                ...state,
                basket: action.receiveBasket.data
            }
        case 'ADD_BASKET':
            let existingBasket = [...state.basket];
            let productToBeAdded = action.productToAdd;
            const index = state.basket.findIndex(
                (product) => product.id === productToBeAdded.id
            );
            
            if (index >= 0) {
                existingBasket[index].orderQuantity += 1;
                return { 
                    ...state,
                    basket: existingBasket,
                }
            }else{
                return { 
                    ...state,
                    basket: [...state.basket, action.productToAdd],
                }
            }
           
        case 'REMOVE_BASKET':
            //make a copy of basket state
            let updatedBasket = [...state.basket];
            //filter out by product id
            updatedBasket = updatedBasket.filter(product => product.id !== action.id)
            return { ...state,
                    basket: updatedBasket
            }
      
        default:
            return state;
    }
}

export default reducer;