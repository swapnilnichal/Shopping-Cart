import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";


export const fetchProduct = createAsyncThunk("fetchProducts",async ()=>{
    const response = await fetch("https://fakestoreapi.com/products");
    return response.json();
})


const productSlice = createSlice({
    name: "products",
    initialState:{
       isLoading: false,
       data: null,
       isError: false,
       cart:[],
       totalQty: 0,
       totalPrice:0,
    },
    extraReducers: (builder)=>{
       builder.addCase(fetchProduct.pending,(state,action)=>{
            state.isLoading = true;
       });
       builder.addCase(fetchProduct.fulfilled , (state,action)=>{
           state.isLoading = false;
           state.data = action.payload;
       });
       builder.addCase(fetchProduct.rejected, (state,action)=>{
           console.log("error",action.payload);
           state.isError = true;
       });
    },
    reducers:{
        addToCart: (state,action)=>{
          let find = state.cart.findIndex((item)=> item.id === action.payload.id);
          if(find >= 0){
            state.cart[find].quantity += 1;
          }else{
            const newProduct = { ...action.payload, quantity: 1 };
            state.cart.push(newProduct);
          }
        },
        getCartTotal:(state)=>{
            let {totalQty,totalPrice} = state.cart.reduce(
                (cartTotal,cartItem)=>{
                   console.log("cartTotal",cartTotal);
                   console.log("cartItem",cartItem);
                   const {price,quantity} = cartItem;
                   const itemTotal = price * quantity;
                   cartTotal.totalPrice += itemTotal;
                   cartTotal.totalQty += quantity;
                   return cartTotal;
            },{
                totalPrice: 0,
                totalQty:0,
            });
            state.totalPrice = parseInt(totalPrice.toFixed(2));
            state.totalQty = totalQty ;
        },
        removeItem: (state,action)=>{
          state.cart = state.cart.filter((item)=> item.id !== action.payload);
        },
        increaseQty: (state,action)=>{
          state.cart = state.cart.map((item)=>{
            if(item.id === action.payload){
              return {...item,quantity:item.quantity+1};
            }
            return item;
          })
        },
        decreaseQty: (state,action)=>{
            state.cart = state.cart.map((item)=>{
                if(item.id === action.payload){
                  return {...item,quantity:item.quantity-1};
                }
                return item;
              })
        },
    },
});

export const {addToCart,getCartTotal,removeItem,increaseQty,decreaseQty} = productSlice.actions;
export default productSlice.reducer;