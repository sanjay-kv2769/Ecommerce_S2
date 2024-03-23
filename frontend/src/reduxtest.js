import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { useDispatch } from 'react-redux';
// const dispatch = useDispatch();

const initialState = {
  data: [],
  status: 'idle',
};

export const getProducts = createAsyncThunk('products/get', async () => {
  //1stpar actiontype
  const data = await axios.get('https://fakestoreapi.com/products');
  // const data = await axios.get('https://jsonplaceholder.typicode.com/posts');
  // console.log(data);
  const result = data.data.slice(0, 20);
  // console.log(result);

  return result;
  // return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // fetchProducts(state, action) {
    //   state.data = action.payload;
    // },
  },
  //state update logic
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'idle';
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'error';
      });
  },
});

// export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;

// export function getProducts() {
//   return async function getProductsThunk(dispatch, getState) {
//     const data = await axios.get('https://fakestoreapi.com/products');

//     const result = data.data;
//     dispatch(fetchProducts(result));
//   };
// }
