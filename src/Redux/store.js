import {configureStore} from '@reduxjs/toolkit';
import productSlice from './Slice/product'

export const store = configureStore({
  reducer: {
     product: productSlice,
  },
})