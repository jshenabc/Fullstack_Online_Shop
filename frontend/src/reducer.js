export const initialState = {
    basket: [],
    user: null,
}

function reducer(state, action) {
    console.log(action);
    switch(action.type) {
        case 'ADD_BASKET':
            return { 
                ...state,
                basket: [...state.basket, action.productToAdd],
            }
            break;
        case 'REMOVE_BASKET':
            return { state }
            break;
        default:
            return state;
    }
}

export default reducer;